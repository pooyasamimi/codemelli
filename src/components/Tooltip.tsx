import { type ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  return (
    <div className="relative block group">
      {children}

      <div className="absolute bg-muted-foreground dark:bg-background text-muted dark:text-white py-2 px-3 rounded-md text-sm z-10 top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {content}
        <div className="absolute w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-background top-[-8px] left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default Tooltip;
