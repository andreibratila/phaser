const bgNames = [
  "explo-landSand1",
  "explo-landCrater1",
  "explo-landCrater2",
  "explo-landCrater3",
  "explo-landCrater4",
  "explo-landCrater5",
  "explo-landCrater6",
  "explo-landCrater7",
  "explo-landCrater9",
];
export const randomBackgroundName = () => {
  const randomIndex = Math.floor(Math.random() * bgNames.length);

  return bgNames[randomIndex];
};
