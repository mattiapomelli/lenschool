const title = "Lenschool";
const description = "Learn with your frens";
const url = "https://lenschool.vercel.app/";

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
