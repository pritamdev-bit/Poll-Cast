import { useState } from "react"
import { ArrowLeft, Check, ChevronDown, Clock, Eye, GripVertical,
        LayoutGrid, Lightbulb, List, Plus, Send, Trash2, Users, Vote, } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import NavbarDashboard from "../components/NavbarDashboard"
import { Link, useNavigate } from "react-router-dom"
import { getToken, useUser } from "@clerk/react"
import LoadingPage from "../components/Loaderpage"

type PollType = "multiple" | "yesno" | "rating" | "open"

interface AnswerOption {
    id: string
    text: string,
    vote: number
}

export default function CreatePollPage() {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    const [question, setQuestion] = useState("")
    const [pollType, setPollType] = useState<PollType>("multiple")
    const [options, setOptions] = useState<AnswerOption[]>([
        { id: "1", text: "Option 1", vote: 0 },
        { id: "2", text: "Option 2", vote: 0 },
    ])
    const [duration, setDuration] = useState(15);
    const [whoCanVote, setWhoCanVote] = useState("Signed in users")
    const [multipleVotes, setMultipleVotes] = useState("No")
    const [resultVisibility, setResultVisibility] = useState("Live results")
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const addOption = () => {
        if (options.length < 4) {
            setOptions([...options, { id: String(options.length + 1), text: `Option ${options.length + 1}`, vote: 0 }])
        }
    }

    const removeOption = (id: string) => {
        if (options.length > 2) {
            setOptions(options.filter((opt) => opt.id !== id))
        }
    }

    const updateOption = (id: string, text: string) => {
        setOptions(options.map((opt) => (opt.id === id ? { ...opt, text } : opt)))
    }

    const pollTypes = [
        { id: "multiple" as const, icon: List, label: "Multiple choice", desc: "Single or multiple answers" },
        // { id: "yesno" as const, icon: ThumbsUp, label: "Yes / No", desc: "Simple yes or no" },
        // { id: "rating" as const, icon: Star, label: "Rating", desc: "Rate on a scale" },
        // { id: "open" as const, icon: MessageSquare, label: "Open ended", desc: "Text responses" },
    ]

    if (!isLoaded) return <LoadingPage />;
    if (!isSignedIn) {
        navigate("/sign-in");
        return null;
    };

    const handleCreatePoll = async () => {
        // Handle poll creation logic here
        const token = await getToken();
        const response = await fetch(`${backendUrl}/create-poll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: question,
                options,
                validity:duration,
            })
        })

        const id = await response.json();
        console.log(id);
        navigate(`/poll/${id}`);
    }

        return (
            <div className="min-h-screen bg-stone-100">
                {/* Header */}
                <NavbarDashboard />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Link */}
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-stone-900 mb-2">Create a new poll</h1>
                        <p className="text-stone-600">Build your question and customize how people can respond.</p>
                    </div>

                    <div className="flex gap-6">
                        {/* Main Form */}
                        <div className="flex-1">
                            <Card className="bg-white p-6 rounded-xl">

                                {/* Section 1: Question */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-7 h-7 bg-lime-400 rounded-full flex items-center justify-center text-sm font-semibold text-black">
                                            1
                                        </div>
                                        <h2 className="text-lg font-semibold text-stone-900">Question</h2>
                                    </div>

                                    {/* Poll Question */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-sm font-medium text-stone-700">Poll question</label>
                                            <span className="text-sm text-stone-500">{question.length} / 200</span>
                                        </div>
                                        <Textarea
                                            placeholder="Type your question here..."
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value.slice(0, 200))}
                                            className="min-h-[80px] resize-none border-stone-200 focus:border-lime-400 focus:ring-lime-400"
                                        />
                                    </div>

                                    {/* Poll Type */}
                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-stone-700 mb-3 block">Poll type</label>
                                        <div className="grid grid-cols-4 gap-3">
                                            {pollTypes.map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setPollType(type.id)}
                                                    className={`relative flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${pollType === type.id
                                                            ? "border-lime-400 bg-lime-50"
                                                            : "border-stone-200 hover:border-stone-300 bg-white"
                                                        }`}
                                                >
                                                    {pollType === type.id && (
                                                        <div className="absolute top-2 right-2 w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-black" />
                                                        </div>
                                                    )}
                                                    <div
                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.id === "multiple"
                                                                ? "bg-lime-100"
                                                                : type.id === "yesno"
                                                                    ? "bg-yellow-100"
                                                                    : type.id === "rating"
                                                                        ? "bg-green-100"
                                                                        : "bg-blue-100"
                                                            }`}
                                                    >
                                                        <type.icon
                                                            className={`w-5 h-5 ${type.id === "multiple"
                                                                    ? "text-lime-600"
                                                                    : type.id === "yesno"
                                                                        ? "text-yellow-600"
                                                                        : type.id === "rating"
                                                                            ? "text-green-600"
                                                                            : "text-blue-600"
                                                                }`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm text-stone-900">{type.label}</div>
                                                        <div className="text-xs text-stone-500">{type.desc}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Answer Options */}
                                    {pollType === "multiple" && (
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="text-sm font-medium text-stone-700">Answer options</label>
                                                <span className="text-sm text-stone-500">{options.length} / 4 options</span>
                                            </div>
                                            <div className="space-y-3">
                                                {options.map((option, index) => (
                                                    <div key={option.id} className="flex items-center gap-3">
                                                        <GripVertical className="w-5 h-5 text-stone-400 cursor-grab" />
                                                        <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center text-sm font-medium text-stone-600">
                                                            {index + 1}
                                                        </div>
                                                        <Input
                                                            value={option.text}
                                                            onChange={(e) => updateOption(option.id, e.target.value)}
                                                            className="flex-1 border-stone-200 focus:border-lime-400 focus:ring-lime-400"
                                                        />
                                                        <button
                                                            onClick={() => removeOption(option.id)}
                                                            className="p-2 text-stone-400 hover:text-stone-600"
                                                            disabled={options.length <= 2}
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button
                                                variant="outline"
                                                onClick={addOption}
                                                disabled={options.length >= 10}
                                                className="mt-4 border-stone-300"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add option
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Section 2: Settings */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-7 h-7 bg-stone-200 rounded-full flex items-center justify-center text-sm font-semibold text-stone-600">
                                            2
                                        </div>
                                        <h2 className="text-lg font-semibold text-stone-900">Settings</h2>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {/* Poll Duration */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors w-full text-left">
                                                    <Clock className="w-5 h-5 text-stone-400" />
                                                    <div className="flex-1">
                                                        <div className="text-xs text-stone-500">Poll duration (min)</div>
                                                        <div className="text-sm font-medium text-stone-900">{duration}</div>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4 text-stone-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {[5, 10, 15, 20, 25, 30].map((d) => (
                                                    <DropdownMenuItem key={d} onClick={() => setDuration(d)}>
                                                        {d}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* Who Can Vote */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button disabled className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors w-full text-left">
                                                    <Users className="w-5 h-5 text-stone-400" />
                                                    <div className="flex-1">
                                                        <div className="text-xs text-stone-500">Who can vote</div>
                                                        <div className="text-sm font-medium text-stone-900">{whoCanVote}</div>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4 text-stone-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {["Signed in users"].map((opt) => (
                                                    <DropdownMenuItem key={opt} onClick={() => setWhoCanVote(opt)}>
                                                        {opt}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* Multiple Votes */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors w-full text-left">
                                                    <Vote className="w-5 h-5 text-stone-400" />
                                                    <div className="flex-1">
                                                        <div className="text-xs text-stone-500">Allow multiple votes</div>
                                                        <div className="text-sm font-medium text-stone-900">{multipleVotes}</div>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4 text-stone-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {["No"].map((opt) => (
                                                    <DropdownMenuItem key={opt} onClick={() => setMultipleVotes(opt)}>
                                                        {opt}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* Result Visibility */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors w-full text-left">
                                                    <Eye className="w-5 h-5 text-stone-400" />
                                                    <div className="flex-1">
                                                        <div className="text-xs text-stone-500">Result visibility</div>
                                                        <div className="text-sm font-medium text-stone-900">{resultVisibility}</div>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4 text-stone-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {["Live results"].map((opt) => (
                                                    <DropdownMenuItem key={opt} onClick={() => setResultVisibility(opt)}>
                                                        {opt}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-6 border-t border-stone-200">
                                    <Button variant="outline" className="border-stone-300">
                                        SAVE AS DRAFT
                                    </Button>
                                    <div className="flex items-center gap-3">
                                        <Button variant="outline" className="border-stone-300">
                                            <Eye className="w-4 h-4 mr-2" />
                                            PREVIEW
                                        </Button>
                                        <Button
                                            onClick={handleCreatePoll}
                                            className="bg-lime-400 hover:bg-lime-500 text-black font-medium">
                                            <Send className="w-4 h-4 mr-2" />
                                            PUBLISH POLL
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="w-80 flex-shrink-0 space-y-6">
                            {/* Live Preview */}
                            <Card className="bg-white p-6 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-stone-900">Live preview</h3>
                                    <span className="bg-lime-400 text-black text-xs font-medium px-2 py-1 rounded">PREVIEW</span>
                                </div>
                                <div className="border border-stone-200 rounded-lg p-4">
                                    <div className="text-xs text-stone-500 italic mb-2">Question of the day</div>
                                    <div className="font-medium text-stone-900 mb-4">
                                        {question || "Your poll question will appear here?"}
                                    </div>
                                    <div className="space-y-3">
                                        {options.slice(0, 2).map((opt) => (
                                            <div key={opt.id} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full border-2 border-stone-300" />
                                                <span className="text-sm text-stone-700">{opt.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-stone-500 mt-4">Preview is for illustration only.</p>
                            </Card>

                            {/* Poll Tips */}
                            <Card className="bg-white p-6 rounded-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                                    <h3 className="font-semibold text-stone-900">Poll tips</h3>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Keep your question clear and specific",
                                        "Use concise answer options",
                                        "Avoid leading or biased language",
                                        "Test your poll before publishing",
                                    ].map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-sm text-stone-600">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            {/* Need Inspiration */}
                            <Card className="bg-white p-6 rounded-xl">
                                <h3 className="font-semibold text-stone-900 mb-2">Need inspiration?</h3>
                                <p className="text-sm text-stone-600 mb-4">Start with a template</p>
                                <button className="flex items-center justify-between w-full p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <LayoutGrid className="w-5 h-5 text-stone-500" />
                                        <span className="font-medium text-[12px] text-stone-900">BROWSE TEMPLATES (Coming Soon)</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-stone-400 -rotate-90" />
                                </button>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        )
}
