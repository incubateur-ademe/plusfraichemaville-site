export class AbortedWarning extends Error {
  public name = "AbortedWarning";
}

export const abortablePromise = async <T>(promise: Promise<T>, signal: AbortSignal): Promise<T> => {
  if (signal.aborted) return Promise.reject(new AbortedWarning("Aborted early"));
  console.log(await promise);

  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      signal.addEventListener("abort", () => {
        reject(new AbortedWarning("Aborted"));
      });
    }),
  ]);
};
