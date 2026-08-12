import * as Sentry from "@sentry/nextjs";

export const captureError = (message: string, data?: any) => {
  console.log("%s", message, data);
  Sentry.captureMessage(message, (scope) =>
    scope.addBreadcrumb({
      type: "error",
      category: "error",
      level: "error",
      data: data,
    }),
  );
};

export const customCaptureException = (message: string, exception?: any) => {
  console.log("%s", message, exception);
  Sentry.captureException(exception, (scope) =>
    scope.addBreadcrumb({
      type: "error",
      category: "error",
      level: "error",
      data: exception,
      message,
    }),
  );
};
