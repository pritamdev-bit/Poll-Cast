import type { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: string;
  iconBgColor?: string;
}

export function MetricCard({
  icon,
  label,
  value,
  change,
  iconBgColor = "bg-chart-1",
}: MetricCardProps) {
  return (
    <div className="border-2 border-primary rounded-2xl p-6 bg-white/60">
      <div className="flex items-start gap-4">
        <div className={`${iconBgColor} p-3 rounded-lg text-white`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <p className="text-3xl font-bold text-primary mt-1">{value}</p>
          {change && (
            <p className="text-xs text-muted-foreground mt-2">{change}</p>
          )}
        </div>
      </div>
    </div>
  );
}
