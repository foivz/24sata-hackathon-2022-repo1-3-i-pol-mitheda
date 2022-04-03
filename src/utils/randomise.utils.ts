export const randomNum = (min = 0, max = 100): number => {
  let difference = max - min;

  let rand = Math.random();

  rand = Math.floor(rand * difference);

  rand = rand + min;

  return rand;
};

export const randomFloat = (min: number, max: number) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

export const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
