export const getPictureURL = (profile: ProfileFragment) => {
  let picture = "/lens.jpeg";
  if (profile.picture) {
    if (profile.picture.original && profile.picture.original.url) {
      if (profile.picture.original.url.startsWith("ipfs://")) {
        const result = profile.picture.original.url.substring(
          7,
          profile.picture.original.url.length,
        );
        picture = `https://lens.infura-ipfs.io/ipfs/${result}`;
      } else {
        picture = profile.picture.original.url;
      }
    } else if (profile.picture.uri) {
      picture = profile.picture.uri;
    }
  }

  return picture;
};
