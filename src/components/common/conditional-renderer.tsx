import { Children, PropsWithChildren, ReactNode, isValidElement } from "react";

const Conditional = ({ children }: PropsWithChildren) => {
  let matchChild: ReactNode = null;
  let defaultCondition: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (!matchChild && child.type === Case) {
      // TODO See how to fix properly this warning
      // @ts-ignore
      const { condition } = child.props;
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
