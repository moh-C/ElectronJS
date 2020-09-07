module.exports = [
  {
    label: "MainMenu",
    submenu: [
      { label: "main 1" },
      { label: "main 2" },
      {
        label: "main 3",
        submenu: [{ label: "main1 sub1" }, { label: "main1 sub2" }],
      },
      { label: "main 4" },
    ],
  },
  {
    label: "Edit",
    submenu: [
      { role: "copy" },
      { role: "paste" },
      { role: "redo" },
      { role: "undo" },
    ],
  },

  {
    label: "MainMenu2",
    submenu: [
      { label: "Object", click: () => alert("object") },
      { label: "main2 2" },
      { label: "main2 3" },
      { label: "main2 4" },
    ],
  },
];
