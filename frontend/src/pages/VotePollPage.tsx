import { useState, useEffect } from "react"
import { Upload } from "lucide-react"
import NavbarDashboard from "../components/NavbarDashboard"
import { useParams } from "react-router-dom"
import { getToken } from "@clerk/react"
import usePollSocket from "../lib/usePollSocket"

const recentPolls = [
  { title: "REMOTE VS IN-OFFICE", time: "Completed 2 hours ago" },
  { title: "FAVORITE DESIGN TOOL?", time: "Completed 5 hours ago" },
  { title: "DARK MODE OR LIGHT MODE?", time: "Completed yesterday" },
]

interface options {
  id: number;
  text: string;
  vote: number;
}

export default function VotePollPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [votes, setVotes] = useState(0)
  const [elapsed, setElapsed] = useState({ minutes: 0, seconds: 0 })
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 48 })
  const [options, setOptions] = useState<options[]>([]);
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [isVoting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [status, setStatus] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  usePollSocket(id as string, setOptions, setVotes, setStatus);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${backendUrl}/polls/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const { poll, existingVote } = await response.json();
        existingVote ? setVoted(true) : setVoted(false);
        const remaining = (poll.startTime + (poll.validity * 60000)) - Date.now();
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(() => {
          if (remaining < 0) {
            return { minutes: 0, seconds: 0 };
          }
          return { minutes, seconds };
        });
        console.log(poll, existingVote);
        setVotes(poll.votes);
        setTitle(poll.title);
        setOptions(poll.options);
        setStatus(poll.status);
        
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchPoll();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => {
        const newSeconds = prev.seconds + 1
        if (newSeconds >= 60) {
          return { minutes: prev.minutes + 1, seconds: 0 }
        }
        return { ...prev, seconds: newSeconds }
      })
      
      setTimeLeft((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          return prev
        }
        const newSeconds = prev.seconds - 1
        if (newSeconds < 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return { ...prev, seconds: newSeconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleVote = async () => {
    try {
      setVoting(true);
      setVoted(true);
      const token = await getToken();
      const response = await fetch(`${backendUrl}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ poll_id: id, vote: selectedOption }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) setVoted(false);
    } catch (error) {
      console.error(error);
    } finally {
      setVoting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F3EC]">
      {/* Header */}
        <NavbarDashboard />

      {/* Main Content */}
      <main className="px-6 py-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Poll Card */}
          <div className="flex-1 relative">
            {/* Live Now Badge */}
            <div className="absolute -top-3 left-8 z-10">
              <div className="bg-[#E85A8F] text-white px-4 py-1.5 text-xs font-bold tracking-wider rounded-sm transform -rotate-3 shadow-sm">
                {status === "Live" && "Live Now" || status === "Draft" && "Draft" || status === "Closed" && "Closed"}
              </div>
            </div>

            <div className="bg-white rounded-3xl border-2 border-[#1a1a1a] p-8 pt-5 relative">
              <p className="text-[#1a1a1a] italic font-serif text-lg mb-2">Question of the day</p>
              <h1 className="text-[#1a1a1a] font-black text-2xl md:text-3xl lg:text-4xl leading-tight mb-8 tracking-tight">
                {title} {voted && <span className="text-[#A8E06C]">Already Voted</span>}
              </h1>

              {/* Poll Options */}
              <div className="space-y-4 mb-8">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`w-full relative flex items-center justify-between border-2 border-[#1a1a1a] rounded-full overflow-hidden transition-all ${
                      selectedOption === option.id ? "ring-2 ring-[#A8E06C] ring-offset-2" : ""
                    }`}
                  >
                    <div className="flex-1 h-14">
                      <div
                        className={`absolute inset-y-0 left-0 ${status === "Closed" ? "bg-[#c53f3f]" : "bg-[#C5E898]"} bg-[#C5E898] transition-all duration-500`}
                        style={{ width: `${option.vote / votes * 100}%` }}
                      />
                      <span className="absolute inset-y-0 left-4 flex items-center font-bold text-sm md:text-base text-[#1a1a1a] z-10">
                        {option.text}
                      </span>
                    </div>
                    <span className="px-6 font-bold text-lg text-[#1a1a1a] z-10">{option.vote / votes * 100}%</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button 
                    onClick={handleVote}
                    disabled={voted} className={`bg-[#1a1a1a] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#333] transition-colors ${isVoting ? "opacity-50 cursor-not-allowed" : ""}`}>
                  { voted ? "Already Voted" : "Submit Vote" }
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Upload className="w-5 h-5" />
                </button>
              </div>

              {/* Victory Hand Emoji */}
              <div className="absolute bottom-6 right-6">
                <div className="w-16 h-16 bg-[#A8E06C] rounded-full flex items-center justify-center text-3xl shadow-lg">
                  ✌️
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Session Status */}
            <div className="bg-white rounded-2xl border-2 border-[#1a1a1a] p-4">
              <h2 className="font-bold text-sm tracking-wider mb-4 text-[#1a1a1a]">SESSION STATUS</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="border-2 border-[#1a1a1a] rounded-xl p-2 text-center">
                  <div className="text-2xl font-black text-[#1a1a1a]">{votes.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 tracking-wider mt-1">VOTES</div>
                </div>
                <div className="border-2 border-[#1a1a1a] rounded-xl p-2 text-center">
                  <div className="text-2xl font-black text-[#1a1a1a]">
                    {String(elapsed.minutes).padStart(2, "0")}:{String(elapsed.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500 tracking-wider mt-1">ELAPSED</div>
                </div>
                <div className="col-span-2 border-2 border-[#1a1a1a] rounded-xl p-2 text-center bg-[#FFF9E6]">
                  <div className="text-2xl font-black text-[#1a1a1a]">
                    {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500 tracking-wider mt-1">TIME LEFT</div>
                </div>
              </div>
            </div>

            {/* Recent Polls */}
            <div className="bg-white rounded-2xl border-2 border-[#1a1a1a] p-4">
              <h2 className="font-bold text-sm tracking-wider mb-4 text-[#1a1a1a]">RECENT POLLS (Coming Soon. Only for preview)</h2>
              <div className="space-y-4">
                {recentPolls.map((poll, index) => (
                  <div key={index} className="cursor-pointer hover:opacity-70 transition-opacity">
                    <h3 className="font-bold text-sm text-[#1a1a1a]">{poll.title}</h3>
                    <p className="text-xs text-gray-500 italic">{poll.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 border-2 border-[#1a1a1a] rounded-full py-3 font-bold text-sm hover:bg-gray-100 transition-colors text-[#1a1a1a]">
                VIEW ARCHIVE
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
