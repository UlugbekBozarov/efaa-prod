function applyPattern(numbers: string, pattern: string): string {
  let result = "";
  let numberIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === "#" || char === "X") {
      if (numberIndex < numbers.length) {
        result += numbers[numberIndex++];
      } else {
        break;
      }
    } else {
      result += char;
    }
  }

  return result.trim();
}

export default applyPattern;
