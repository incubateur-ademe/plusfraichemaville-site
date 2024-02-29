import * as Sentry from "@sentry/nextjs";

export const captureError = (message: string, data?: any) => {
  console.log(message, data);
  Sentry.captureMessage(message, (scope) =>
    scope.addBreadcrumb({
      type: "error",
      category: "error",
      level: "error",
      data: data,
    }),
  );
};
