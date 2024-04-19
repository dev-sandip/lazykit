/**
 * Removes falsy values
 * Also removes empty objects and arrays if strict is true
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to compact.
 * @param {boolean} [strict=false] - If true, also removes empty objects and arrays.
 * @returns {T[]} - The compacted array.
 */
const compact = <T>(array: T[], strict: boolean = false): T[] => {
  let truthy = array.filter((item) => {
    // remove all falsy values and excluded values
    return Boolean(item);
  });

  if (strict) {
    // remove all empty objects
    truthy = truthy.filter((item) => {
      if (typeof item === "object" && !(item instanceof Array)) {
        return Object.keys(item as object).length > 0;
      }
      return true;
    });
    // remove all empty arrays
    truthy = truthy.filter((item) => {
      if (Array.isArray(item)) {
        return (item as []).length > 0;
      }
      return true;
    });
  }
  return truthy;
};

export default compact;
