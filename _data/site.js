const isDev = process.env.ELEVENTY_ENV === "development";

const baseUrl = isDev ? `localhost:8080` : `https://www.gregtyler.co.uk/`;

const site = {
  title: "Your site title",
  description: "Your site description",
  baseUrl,
};

export default site;
