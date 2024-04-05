type VersionNotes = {
  version: string;
  date: string;
  notes: string[];
};

const versionNotes: VersionNotes[] = [
  {
    version: "3.0.0",
    date: "April 5, 2024",
    notes: [
      "Updated food vendor menus to display side dishes and size options.",
      "Added the ability for users to submit a picture of the daily menu at various food vendor locations. These pictures are used to crowd-source information about the daily menu for other users to see.",
      "Added the ability for users to 'like' menu items so others can see which food items are well liked by the community.",
      "Added an optional account system. Upon entering a valid UVic email, you will receive a sign-in code in your inbox to enter in the app. You can still use the app without an account, but must sign in with a valid UVic email to like menu items. This allows us to verify that 'like' ratings come from real UVic students.",
      "Added a 'Welcome Tour' feature which will guide new users through the app's key features.",
      "Added this 'What's New' section which will show the latest new features every time there is a new update.",
      "Added outlines to UVic buildings on the map that contain food vendors.",
      "Various UI and usability improvements.",
    ],
  },
  {
    version: "2.2.0",
    date: "March 25, 2024",
    notes: [
      "Added the ability to filter searches by building and currently open food vendors.",
      "Updated food vendor data and hours of operation.",
    ],
  },
  {
    version: "2.1.0",
    date: "March 19, 2024",
    notes: [
      "Added ability to filter food searches with dietary restriction buttons.",
    ],
  },
  {
    version: "2.0.0",
    date: "March 9, 2024",
    notes: ["Various UI and usability improvements."],
  },
  {
    version: "1.0.0",
    date: "March 1, 2024",
    notes: ["Initial alpha release."],
  },
];

export { versionNotes, VersionNotes };
