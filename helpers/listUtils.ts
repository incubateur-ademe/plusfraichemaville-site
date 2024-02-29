export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function upsert<T extends { id: string | number }>(array: T[], element: T) {
  console.log("array", array)
  const index = array.findIndex((_element) => _element.id === element.id);
  if (index > -1) {
    array[index] = element;
  } else {
    array.push(element);
  }
  console.log("array", array)
  return array;
}
