import {
  LayoutGrid,
  Radio,
  FileText,
  Archive,
} from 'lucide-react'
import { useState } from 'react';

const navItems = [
  { icon: LayoutGrid, label: 'All Polls', active: true },
  { icon: Radio, label: 'Live Now', count: 3 },
  { icon: FileText, label: 'Drafts', count: 4 },
  { icon: Archive, label: 'Closed' },
]

export function Sidebar({ active, setActive }: { active: string, setActive: any }) {
  // const [active, setActive] = useState("All Polls");
  return (
    <aside className="w-56 border-r border-border bg-sidebar p-4 flex flex-col">
      <nav className="space-y-1">
        <button
          onClick={() => setActive("All Polls")}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${active === "All Polls"
              ? 'bg-lime-100 text-lime-800 font-medium'
              : 'text-foreground hover:bg-accent'
            }`}
        >
          <span className="flex items-center gap-3">
            <LayoutGrid className="w-4 h-4" />
            All Polls
          </span>
        </button>
        <button
          onClick={() => setActive("Live")}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${active === "Live"
              ? 'bg-lime-100 text-lime-800 font-medium'
              : 'text-foreground hover:bg-accent'
            }`}
        >
          <span className="flex items-center gap-3">
            <Radio className="w-4 h-4" />
            Live Now
          </span>
        </button>
        <button
          onClick={() => setActive("Drafts")}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${active === "Drafts"
              ? 'bg-lime-100 text-lime-800 font-medium'
              : 'text-foreground hover:bg-accent'
            }`}
        >
          <span className="flex items-center gap-3">
            <FileText className="w-4 h-4" />
            Drafts
          </span>
        </button>
        <button
          onClick={() => setActive("Closed")}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${active === "Closed"
              ? 'bg-lime-100 text-lime-800 font-medium'
              : 'text-foreground hover:bg-accent'
            }`}
        >
          <span className="flex items-center gap-3">
            <Archive className="w-4 h-4" />
            Closed
          </span>
        </button>

      </nav>
    </aside>
  )
}
