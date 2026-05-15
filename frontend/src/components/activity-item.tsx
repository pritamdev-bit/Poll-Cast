import type { ReactNode } from "react";

interface ActivityItemProps {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  timeAgo: string;
}

export function ActivityItem({
  icon,
  iconBgColor,
  title,
  description,
  timeAgo,
}: ActivityItemProps) {
  return (
    <div className="flex gap-4 pb-4 border-b border-border last:border-b-0">
      <div className={`${iconBgColor} p-3 rounded-lg text-white text-lg shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-primary">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <p className="text-xs text-muted-foreground mt-2">{timeAgo}</p>
      </div>
    </div>
  );
}
