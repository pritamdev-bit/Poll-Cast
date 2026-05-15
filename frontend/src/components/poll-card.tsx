interface PollCardProps {
  badgeIcon: string;
  badgeColor: string;
  badgeText: string;
  category: string;
  question: string;
  votes: number;
  timeLeft: string;
  leadingPercent: number;
  leadingColor?: string;
}

export function PollCard({
  badgeIcon,
  badgeColor,
  category,
  question,
  votes,
  timeLeft,
  leadingPercent,
  leadingColor = "bg-chart-2",
}: PollCardProps) {
  return (
    <div className="flex items-center gap-6 p-6 border-b border-black/30 last:border-b-0">
      <div className={`${badgeColor} p-4 rounded-lg text-xl`}>
        {badgeIcon}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-muted-foreground uppercase">
          {category}
        </p>
        <p className="text-lg font-bold text-primary mt-1 text-balance">
          {question}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {votes.toLocaleString()} votes · {timeLeft}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className={`${leadingColor} text-primary font-bold rounded-xl px-4 py-2 text-center min-w-20`}>
          {leadingPercent}%
          <p className="text-xs font-normal">leading</p>
        </div>
      </div>
    </div>
  );
}
