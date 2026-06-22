import fs from "node:fs";
import path from "node:path";
import matter from "@11ty/gray-matter";
import { Agent, CredentialSession, RichText } from "@atproto/api";
import removeMd from "remove-markdown";
import { createRestAPIClient } from "masto/adapters/index.js";

const files = process.argv.slice(2);

/**
 * @type {?Agent}
 */
let blueskyAgent = null;

/**
 * @type {?import("masto/mastodon/rest/client.js").Client}
 */
let mastodonClient = null;

/**
 * @param {string} content
 * @param {Blob[]} images
 * @param {Date} postDate
 */
async function publishBluesky(content, images, postDate) {
  if (!blueskyAgent) {
    const account = {
      identifier: process.env.BLUESKY_IDENTIFIER ?? "",
      password: process.env.BLUESKY_PASSWORD ?? "",
    };

    const session = new CredentialSession(new URL("https://bsky.social"));
    await session.login(account);

    blueskyAgent = new Agent(session);
  }

  const rt = new RichText({
    text: removeMd(content).trim(),
  });

  await rt.detectFacets(blueskyAgent);

  /**
   * @type {import("@atproto/api").$Typed<import("@atproto/api").AppBskyEmbedImages.Main>|undefined}
   */
  let embed = undefined;
  if (images.length > 0) {
    /**
     * @type {Array<import("@atproto/api").$Typed<import("@atproto/api").AppBskyEmbedImages.Image>>}
     */
    const uploadedImages = [];
    for (const image of images) {
      const uploadedImage = await blueskyAgent.uploadBlob(image);
      uploadedImages.push({
        $type: "app.bsky.embed.images#image",
        image: uploadedImage.data.blob,
        alt: "",
      });
    }

    embed = {
      $type: "app.bsky.embed.images",
      images: uploadedImages,
    };
  }

  await blueskyAgent.post({
    $type: "app.bsky.feed.post",
    text: rt.text,
    facets: rt.facets,
    createdAt: postDate.toISOString(),
    embed,
  });
}

/**
 * @param {string} content
 * @param {Blob[]} images
 */
async function publishMastodon(content, images) {
  if (!mastodonClient) {
    mastodonClient = createRestAPIClient({
      url: process.env.MASTODON_URL ?? "",
      accessToken: process.env.MASTODON_ACCESS_TOKEN ?? "",
    });
  }

  const attachmentIds = [];
  for (const image of images) {
    const attachment = await mastodonClient.v2.media.create({
      file: image,
    });

    attachmentIds.push(attachment.id);
  }

  await mastodonClient.v1.statuses.create({
    status: removeMd(content, {}).trim(),
    mediaIds: attachmentIds,
  });
}

for (const file of files) {
  const rawContent = fs.readFileSync(file, "utf-8");
  const { content, data } = matter(rawContent);

  if (content.trim() === "") {
    console.log(`File ${file} is empty`);
    continue;
  }

  const postDate = data.date ? new Date(data.date) : null;

  if (!postDate) {
    console.log(`File ${file} does not have a valid date`);
    continue;
  }

  let images = [];
  if (data.images) {
    images = data.images.map(
      /** @param {string} imagePath */ (imagePath) => {
        const fullImagePath = path.join(path.dirname(file), imagePath);
        const imageBuffer = fs.readFileSync(fullImagePath);
        return new Blob([imageBuffer]);
      },
    );
  }

  if (!(data.social_posse?.skip_bluesky ?? false)) {
    await publishBluesky(content.trim(), images, postDate);
  }

  if (!(data.social_posse?.skip_mastodon ?? false)) {
    await publishMastodon(content.trim(), images);
  }
}
