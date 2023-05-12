const title = "My App";
const description = "This is my awesome app";
const url = "https://beta.cryvia.xyz/";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title,
  description,
  canonical: url,
  openGraph: {
    type: "website",
    locale: "en_IE",
    site_name: "My App",
    title,
    description,
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
