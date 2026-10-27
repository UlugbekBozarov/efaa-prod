export interface PhoneData {
  translationKey: string;
  flag: string;
  pattern: string;
}

export const PHONE_MAP: Map<string, PhoneData> = new Map([
  [
    "+998",
    {
      translationKey: "Uzbekistan",
      flag: "uzbekistan",
      pattern: "#### ## ### ## ##",
    },
  ],
  [
    "+996",
    {
      translationKey: "Kyrgyzstan",
      flag: "kyrgyzstan",
      pattern: "#### ### ### ###",
    },
  ],
  [
    "+995",
    { translationKey: "Georgia", flag: "georgia", pattern: "#### ### ### ###" },
  ],
  [
    "+994",
    {
      translationKey: "Azerbaijan",
      flag: "azerbaijan",
      pattern: "#### ## ### ## ##",
    },
  ],
  [
    "+993",
    {
      translationKey: "Turkmenistan",
      flag: "turkmenistan",
      pattern: "#### # ### ####",
    },
  ],
  [
    "+992",
    {
      translationKey: "Tajikistan",
      flag: "tajikistan",
      pattern: "#### ## ### ## ##",
    },
  ],
  [
    "+971",
    {
      translationKey: "United Arab Emirates",
      flag: "united_arab_emirates",
      pattern: "#### # ### ####",
    },
  ],
  [
    "+970",
    {
      translationKey: "Palestine",
      flag: "palestine",
      pattern: "#### ## ### ####",
    },
  ],
  [
    "+966",
    {
      translationKey: "Saudi Arabia",
      flag: "saudi_arabia",
      pattern: "#### # ### ####",
    },
  ],
  [
    "+964",
    { translationKey: "Iraq", flag: "iraq", pattern: "#### ### ### ####" },
  ],
  [
    "+963",
    { translationKey: "Syria", flag: "syria", pattern: "#### ## #######" },
  ],
  [
    "+962",
    { translationKey: "Jordan", flag: "jordan", pattern: "#### # ### ####" },
  ],
  [
    "+961",
    { translationKey: "Lebanon", flag: "lebanon", pattern: "#### # ### ###" },
  ],
  [
    "+960",
    { translationKey: "Maldives", flag: "maldives", pattern: "#### ### ####" },
  ],
  [
    "+389",
    {
      translationKey: "North Macedonia",
      flag: "north_macedonia",
      pattern: "#### ## ### ###",
    },
  ],
  [
    "+382",
    {
      translationKey: "Montenegro",
      flag: "montenegro",
      pattern: "#### ## ### ###",
    },
  ],
  [
    "+381",
    { translationKey: "Serbia", flag: "serbia", pattern: "#### ## ### ####" },
  ],
  [
    "+380",
    {
      translationKey: "Ukraine",
      flag: "ukraine",
      pattern: "#### ## ### ## ##",
    },
  ],
  [
    "+375",
    {
      translationKey: "Belarus",
      flag: "belarus",
      pattern: "#### ## ### ## ##",
    },
  ],
  [
    "+373",
    { translationKey: "Moldova", flag: "moldova", pattern: "#### ## ### ###" },
  ],
  [
    "+218",
    { translationKey: "Libya", flag: "libya", pattern: "#### ## ### ###" },
  ],
  [
    "+216",
    { translationKey: "Tunisia", flag: "tunisia", pattern: "#### ## ### ###" },
  ],
  [
    "+213",
    { translationKey: "Algeria", flag: "algeria", pattern: "#### ## ### ####" },
  ],
  [
    "+212",
    { translationKey: "Morocco", flag: "morocco", pattern: "#### # ### ####" },
  ],
  [
    "+211",
    {
      translationKey: "South Sudan",
      flag: "south_sudan",
      pattern: "#### ## ### ####",
    },
  ],
  [
    "+20",
    { translationKey: "Egypt", flag: "egypt", pattern: "#### ## #######" },
  ],
  [
    "+98",
    { translationKey: "Iran", flag: "iran", pattern: "#### ### ### ####" },
  ],
  [
    "+96",
    {
      translationKey: "Middle East",
      flag: "generic_middle_east",
      pattern: "#### X XXXXXX",
    },
  ],
  [
    "+90",
    { translationKey: "Turkey", flag: "turkey", pattern: "#### ### ### ## ##" },
  ],
  [
    "+48",
    { translationKey: "Poland", flag: "poland", pattern: "#### ### ### ###" },
  ],
  [
    "+40",
    { translationKey: "Romania", flag: "romania", pattern: "#### ### ### ###" },
  ],
  [
    "+7",
    {
      translationKey: "Russia",
      flag: "russian_federation",
      pattern: "#### ### ### ####",
    },
  ],
]);
