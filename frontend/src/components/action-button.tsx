import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
}

export function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button className="w-full flex items-center justify-between gap-4 p-4 hover:bg-muted/50 transition-colors group cursor-pointer">
      <div className="flex items-center gap-4">
        <span className="text-lg text-primary">{icon}</span>
        <span className="text-sm font-semibold text-primary">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  );
}
