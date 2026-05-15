// import { useUser, useClerk } from '@clerk/clerk-react'
import { useUser } from '@clerk/react'
import { Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingPage from '../components/Loaderpage'
import NavbarDashboard from '../components/NavbarDashboard'
import {
    BarChart3,
    Users,
    Eye,
    Clock,
    Plus,
    Grid,
    TrendingUp,
    ChevronRight,
    MoreVertical,
    FileText,
} from "lucide-react";
import { Button } from '../components/ui/button'
import { ActionButton } from '../components/action-button'
// import { ActivityItem } from '../components/activity-item'
import { PollCard } from '../components/poll-card'
import { MetricCard } from '../components/metric-card'

export default function Dashboard() {
    const { user, isLoaded, isSignedIn } = useUser()
    // const { signOut } = useClerk()
    const navigate = useNavigate()

    if (!isLoaded) {
        return <LoadingPage />
    }

    if (!isSignedIn) {
        navigate('/sign-in')
        return null
    }

    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="bg-background min-h-screen">
                <NavbarDashboard />

                <main className="mx-auto max-w-7xl px-6 py-8">
                    {/* Welcome Section */}
                    <div className="flex items-start justify-between gap-8 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-primary mb-2"> Welcome back!</h1>
                            <h2 className="text-2xl font-semibold text-foreground mb-4"><img src={user?.imageUrl} alt="user avatar" className="inline w-12 h-12 rounded-full" />&nbsp;{user?.firstName || user?.primaryEmailAddress?.emailAddress}</h2>
                            <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your polls.</p>
                        </div>
                        <Button className="bg-lime-500 text-primary hover:bg-lime-500/70 font-bold rounded-full px-6 whitespace-nowrap">
                            + CREATE NEW POLL
                        </Button>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <MetricCard
                            icon={<BarChart3 size={20} />}
                            label="Total Polls"
                            value="24"
                            change="+4 this week"
                            iconBgColor="bg-[#e877a3]"
                        />
                        <MetricCard
                            icon={<Users size={20} />}
                            label="Total Votes"
                            value="8,462"
                            change="+12% this week"
                            iconBgColor="bg-[#b4d94e]"
                        />
                        <MetricCard
                            icon={<Eye size={20} />}
                            label="Active Now"
                            value="3"
                            change="Live polls"
                            iconBgColor="bg-[#ffd166]"
                        />
                        <MetricCard
                            icon={<Clock size={20} />}
                            label="Avg. Response Time"
                            value="00:04:12"
                            change="+8% this week"
                            iconBgColor="bg-[#c8b8d8]"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Polls */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Live Polls Section */}
                            <div className="border-2 border-primary rounded-2xl p-6 bg-white/60">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-primary">LIVE POLLS</h2>
                                    <Button variant="outline" className="border-primary text-primary hover:bg-muted">
                                        VIEW ALL
                                    </Button>
                                </div>

                                <div className="border border-black/30 rounded-lg">
                                    <PollCard
                                        badgeIcon="Live"
                                        badgeColor="bg-[#e877a3]"
                                        badgeText="LIVE"
                                        category="Question of the day"
                                        question="SHOULD WE MAKE 4-DAY WORK WEEKS THE STANDARD?"
                                        votes={1284}
                                        timeLeft="04:12 left"
                                        leadingPercent={68}
                                        leadingColor="bg-lime-600"
                                    />
                                    <PollCard
                                        badgeIcon="Live"
                                        badgeColor="bg-[#e877a3]"
                                        badgeText="LIVE"
                                        category="Product Feedback"
                                        question="WHAT FEATURE SHOULD WE BUILD NEXT?"
                                        votes={842}
                                        timeLeft="01:45 left"
                                        leadingPercent={52}
                                        leadingColor="bg-lime-600"
                                    />
                                    <PollCard
                                        badgeIcon="Live"
                                        badgeColor="bg-[#e877a3]"
                                        badgeText="LIVE"
                                        category="Team Check-in"
                                        question="HOW ARE YOU FEELING ABOUT REMOTE WORK?"
                                        votes={532}
                                        timeLeft="03:30 left"
                                        leadingPercent={41}
                                        leadingColor="bg-lime-600"
                                    />
                                </div>
                            </div>

                            {/* Draft Polls Section */}
                            <div className="border-2 border-primary rounded-2xl p-6 bg-white/60">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-primary">DRAFT POLLS</h2>
                                    <Button variant="outline" className="border-primary text-primary hover:bg-muted">
                                        VIEW ALL
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-300 p-2 rounded text-primary">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary">Office Snacks Survey</p>
                                            <p className="text-xs text-muted-foreground">Created 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm text-muted-foreground">12 questions</p>
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold">
                                            CONTINUE EDITING
                                        </Button>
                                        <button className="text-muted-foreground hover:text-primary">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Recent Activity */}
                            <div className="border-2 border-primary rounded-2xl p-6 bg-card">
                                <h3 className="text-lg font-bold text-primary mb-6">RECENT ACTIVITY</h3>
                                <p className="text-lg mb-2 text-gray-600">Feature: Coming Soon</p>

                                {/* <div className="space-y-4 mb-6">
                                    <ActivityItem
                                        icon={<BarChart3 size={16} />}
                                        iconBgColor="bg-chart-2"
                                        title="1,284 new votes on"
                                        description='"4-Day Work Week"'
                                        timeAgo="2 minutes ago"
                                    />
                                    <ActivityItem
                                        icon={<Eye size={16} />}
                                        iconBgColor="bg-chart-3"
                                        title="Poll &quot;Design Tools&quot; completed"
                                        description=""
                                        timeAgo="15 minutes ago"
                                    />
                                    <ActivityItem
                                        icon={<Users size={16} />}
                                        iconBgColor="bg-chart-4"
                                        title="New poll created:"
                                        description='"Team Check-in"'
                                        timeAgo="1 hour ago"
                                    />
                                </div> */}

                                <button className="w-full flex items-center justify-between text-primary hover:opacity-75 font-semibold text-sm group">
                                    VIEW ALL ACTIVITY
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="border-2 border-primary rounded-2xl p-6 bg-white/60">
                                <h3 className="text-lg font-bold text-primary mb-4">QUICK ACTIONS</h3>

                                <div className="-mx-6 -mb-6">
                                    <Link to="/create-poll">
                                        <ActionButton
                                            icon={<Plus size={18} />}
                                            label="Create new poll"
                                        />
                                    </Link>
                                    <Link to="#">
                                        <ActionButton
                                            icon={<Grid size={18} />}
                                            label="Browse templates (Coming Soon)"
                                        />
                                    </Link>
                                    <Link to="#">
                                        <ActionButton
                                            icon={<TrendingUp size={18} />}
                                            label="View analytics"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Suspense>
    )
}