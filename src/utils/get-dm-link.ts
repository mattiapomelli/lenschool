import { Profile } from "@lens-protocol/react-web";

const PREFIX = "lens.dev/dm";

const buildConversationId = (profileA: string, profileB: string) => {
  const numberA = parseInt(profileA.substring(2), 16);
  const numberB = parseInt(profileB.substring(2), 16);
  return numberA < numberB
    ? `${PREFIX}/${profileA}-${profileB}`
    : `${PREFIX}/${profileB}-${profileA}`;
};

export const buildConversationKey = (
  peerAddress: string,
  conversationId: string,
): string => `${peerAddress.toLowerCase()}/${conversationId}`;

export const getDMLink = (profileA: Profile, profileB: Profile) => {
  const conversationId = buildConversationId(profileA.id, profileB.id);
  const conversationKey = buildConversationKey(
    profileB.ownedBy,
    conversationId,
  );

  return `https://testnet.lenster.xyz/messages/${conversationKey}`;
};
