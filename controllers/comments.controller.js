export const getAllComments = (req, res) => {
  const comments = [
    { id: "uu5", content: "drole" },
    { id: "uu6", content: "pas aimé" },
  ];

  return res.send(comments);
};
