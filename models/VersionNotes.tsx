type VersionNotes = {
  version: string;
  date: string;
  notes: string[];
};

const versionNotes: VersionNotes[] = [
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
