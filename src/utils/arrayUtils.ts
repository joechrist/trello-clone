/**
 * Define an Item type
 */
type Item = {
  id: string;
};

/**
 * Generic function that find the array index of the target list
 * function that will accept any array object that has a field id: string
 * We use a type variable TItem that extends Item. That means that we constrained
   our generic to have the fields that are defined on the Item type, in this case the id
   field.
 */
export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item: TItem) => item.id === id);
};

/**
 * Move any kind of items inside the array, so we have type variable Titem
 */
export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
  //  We store the item in the item constant.
  const item = array[from];

  // insert item back to the new position
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};

/**
 * Remove the item from its original position
 * Generate a new array with the portion before the index that we get using the slice
 * method, and the portion after the index using the slice method with index + 1.
 */
export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
  // Generate a new array with the portion before the index that we get using the slice   // method, and the portion after the index using the slice method with index + 1.
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

/**
 * Insert item back to the new position
 * Generate a new array from two slices of the original array.
 */
export function insertItemAtIndex<TItem>(
  array: TItem[],
  item: TItem,
  index: number
) {
  // generate a new array from two slices of the original array.
  return [...array.slice(0, index), item, ...array.slice(index)];
}
