const title = "Lenschool";
const description =
  "A social learning platform to make online education more fun, collaborative and efficient.";
const url = "https://lenschool.vercel.app/";
const image = "https://lenschool.vercel.app/og-image.png";

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
    images: [
      {
        url: image,
        alt: "Lenschool - The place to learn with your frens",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
