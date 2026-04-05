import { cn } from "@/lib/utils";

type LayoutContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
};

const SIZE_CLASS_MAP: Record<NonNullable<LayoutContainerProps["size"]>, string> = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-3xl",
};

export function LayoutContainer({
  children,
  className,
  size = "default",
}: LayoutContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5", SIZE_CLASS_MAP[size], className)}>
      {children}
    </div>
  );
}
