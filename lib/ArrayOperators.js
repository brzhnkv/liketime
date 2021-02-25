export const add = (array, setArray, newItem) => {
  setArray([...array, newItem]);
};

export const remove = (array, setArray, itemToRemove) => {
  const newArray = array.filter((t) => t !== itemToRemove);
  setArray(newArray);
};

export const update = (array, setArray, index, newItem) => {
  const newArray = [...array];
  newArray[index] = newItem;
  setArray(newArray);
};
