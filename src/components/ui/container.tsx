import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type PropsType<C extends React.ElementType> =
  React.ComponentPropsWithoutRef<C> & {
    as?: C;
    children: ReactNode;
  };

const Container = <C extends React.ElementType = "div">({
  children,
  className = "",
  as,
  ...props
}: PropsType<C>) => {
  const Element = as || "div";
  return (
    <Element
      {...props}
      className={cn("max-w-7xl mx-auto p-4 xs:p-6 md:p-8", className)}
    >
      {children}
    </Element>
  );
};

export default Container;
