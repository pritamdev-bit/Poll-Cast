import { PollCard } from './PollCard'
import { useUser } from '@clerk/react'

const polls = [
  {
    id: 1,
    title: 'Should we make 4-day work weeks the standard?',
    status: 'Live',
    statusColor: 'bg-green-500',
    createdAt: 'May 12, 2024',
    author: 'Alex Smith',
    icon: 'chart',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    votes: 1284,
    engagement: 72.4,
    avgTime: '04:12',
    action: 'View Results',
  },
  {
    id: 2,
    title: "What's your favorite design tool?",
    status: 'Live',
    statusColor: 'bg-green-500',
    createdAt: 'May 10, 2024',
    author: 'Alex Smith',
    icon: 'chart',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    votes: 856,
    engagement: 68.1,
    avgTime: '03:45',
    action: 'View Results',
  },
  {
    id: 3,
    title: 'How was our team offsite experience?',
    status: 'Closed',
    statusColor: 'bg-red-400',
    createdAt: 'May 6, 2024',
    author: 'Alex Smith',
    icon: 'closed',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    votes: 642,
    engagement: 61.3,
    avgTime: '02:38',
    action: 'View Results',
  },
  {
    id: 4,
    title: 'New feature feedback',
    status: 'Draft',
    statusColor: 'bg-gray-400',
    createdAt: 'May 11, 2024',
    author: 'Alex Smith',
    icon: 'file',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    action: 'Continue Editing',
  },
]

export function PollList({ active }: { active: string }) {
  const { user } = useUser();
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        {user?.imageUrl && <img src={user.imageUrl} alt="User Avatar" className="w-12 h-12 rounded-full" />}
        <h1 className="text-4xl font-semibold text-foreground">Hi, {user?.firstName || user?.primaryEmailAddress?.emailAddress}</h1>
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-4">All Polls</h2>
      {active === "Live" && <span className="text-xs text-muted-foreground">Live Polls</span>}

      {/* Search and Filters : Todo*/}

      {/* Poll Cards */}
      <div className="space-y-3">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <span>Showing 1 to 6 of 24 polls</span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-accent transition-colors">
            ←
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded-lg bg-foreground text-background font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-accent transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-accent transition-colors">
            3
          </button>
          <span className="px-2">...</span>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-accent transition-colors">
            4
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-accent transition-colors">
            →
          </button>
        </div>
      </div>
    </div>
  )
}
