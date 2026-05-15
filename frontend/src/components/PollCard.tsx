import {
  BarChart3,
  FileText,
  MoreVertical,
  CircleCheckBig
} from 'lucide-react'

type TagVariant = 'default' | 'outline' | 'warning'

interface Tag {
  label: string
  variant: TagVariant
}

interface Poll {
  id: number
  title: string
  status: string
  statusColor: string
  createdAt: string
  author: string
  icon: string
  iconBg: string
  iconColor: string
  votes?: number
  engagement?: number
  avgTime?: string
  action: string
  isDraft?: boolean
}

const iconMap: Record<string, React.ElementType> = {
  chart: BarChart3,
  file: FileText,
  closed: CircleCheckBig,
}

export function PollCard({ poll }: { poll: Poll }) {
  const IconComponent = iconMap[poll.icon] || FileText

  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${poll.iconBg}`}
        >
          <IconComponent className={`w-6 h-6 ${poll.iconColor}`} />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${poll.statusColor}`}
            />
            <span className="text-xs text-muted-foreground">{poll.status}</span>
          </div>
          <h3 className="font-semibold text-foreground mb-1">{poll.title}</h3>
          <p className="text-xs text-muted-foreground">
            
            {poll.author && ` · by ${poll.author}`}
          </p>
        </div>
      </div>

      {/* Stats & Action */}
      <div className="flex items-center gap-8">
        {poll.votes !== undefined && (
          <>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">
                {poll.votes.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Votes</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">
                {poll.engagement}%
              </p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{poll.avgTime}</p>
              <p className="text-xs text-muted-foreground">Avg. time</p>
            </div>
          </>
        )}

        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            poll.action === 'Continue Editing'
              ? 'border border-border text-foreground hover:bg-accent'
              : 'border border-lime-500 text-lime-600 hover:bg-lime-50'
          }`}
        >
          {poll.action}
        </button>
      </div>
    </div>
  )
}
