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



export const customCaptureException = (message: string, exception?: any) => {
  console.log(message, exception);
  Sentry.captureException(exception, (scope) =>
    scope.addBreadcrumb({
      type: "error",
      category: "error",
      level: "error",
      data: exception,
    }),
  );
};
