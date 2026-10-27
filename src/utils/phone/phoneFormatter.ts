import { PHONE_MAP } from "@/constants";

import applyPattern from "./applyPattern";

const phoneFormatter = (value?: string | null | undefined) => {
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

  return pattern ? applyPattern(convertedValue, pattern) : convertedValue;
};

export default phoneFormatter;
