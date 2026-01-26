export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function upsert<T>(array: T[], element: T, idKey = "id" as keyof T) {
  const index = array.findIndex((_element) => _element[idKey] === element[idKey]);
  if (index > -1) {
    array[index] = element;
  } else {
    array.push(element);
  }
  return array;
}

export function isEmpty(listToCheck?: any): boolean {
  return !Array.isArray(listToCheck) || !listToCheck.length;
}
