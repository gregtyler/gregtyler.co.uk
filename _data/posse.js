import fs from "node:fs";
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
 * @param {Date} postDate
 */
async function publishBluesky(content, postDate) {
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

  await blueskyAgent.post({
    $type: "app.bsky.feed.post",
    text: rt.text,
    facets: rt.facets,
    createdAt: postDate.toISOString(),
  });
}

/**
 * @param {string} content
 */
async function publishMastodon(content) {
  if (!mastodonClient) {
    mastodonClient = createRestAPIClient({
      url: process.env.MASTODON_URL ?? "",
      accessToken: process.env.MASTODON_ACCESS_TOKEN ?? "",
    });
  }

  await mastodonClient.v1.statuses.create({
    status: removeMd(content, {}).trim(),
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

  if (!(data.social_posse?.skip_bluesky ?? false)) {
    await publishBluesky(content.trim(), postDate);
  }

  if (!(data.social_posse?.skip_mastodon ?? false)) {
    await publishMastodon(content.trim());
  }
}
