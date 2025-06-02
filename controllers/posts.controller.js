export const getAllPosts = (req, res) => {
  const posts = [
    { id: "uu5", content: "abc" },
    { id: "uu6", content: "def" },
  ];

  return res.send(posts);
};
