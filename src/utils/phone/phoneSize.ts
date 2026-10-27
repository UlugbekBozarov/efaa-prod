import { PHONE_MAP } from "@/constants/phone/Phone";

const phoneSize = (value?: string | null | undefined) => {
  if (!value) return undefined;

  const convertedValue = value?.startsWith("+") ? `${value}` : `+${value}`;

  const matchedKey = Array.from(PHONE_MAP.keys()).reduce<string | null>(
    (longest, key) => {
      if (
        convertedValue.startsWith(key) &&
        (!longest || key.length > longest.length)
      ) {
        return key;
      }
      return longest;
    },
    null
  );

  const pattern = matchedKey ? PHONE_MAP.get(matchedKey)?.pattern : null;

  return pattern ? pattern.replace(/ /g, "").length : null;
};

export default phoneSize;
