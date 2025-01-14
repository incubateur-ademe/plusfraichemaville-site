import { Children, PropsWithChildren, ReactNode, isValidElement } from "react";

const Conditional = ({ children }: PropsWithChildren) => {
  let matchChild: ReactNode = null;
  let defaultCondition: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (!matchChild && child.type === Case) {
      const { condition } = child.props as { condition: boolean };
      const conditionResult = Boolean(condition);

      if (conditionResult) {
        matchChild = child;
      }
    } else if (!defaultCondition && child.type === Default) {
      defaultCondition = child;
    }
  });

  return matchChild ?? defaultCondition ?? null;
};

const Case = ({ children }: { condition: boolean } & PropsWithChildren) => {
  return children;
};

const Default = ({ children }: PropsWithChildren) => {
  return children;
};

export { Conditional, Case, Default };
