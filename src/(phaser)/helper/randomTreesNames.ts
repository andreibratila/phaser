const treesNames = [
  "explo-tree1",
  "explo-tree2",
  "explo-tree3",
  "explo-brush1",
  "explo-brush2",
  "explo-brush3",
];
export const randomTreesNames = () => {
  const randomIndex = Math.floor(Math.random() * treesNames.length);

  return treesNames[randomIndex];
};
