import { useUser } from "@clerk/react"
import NavbarDashboard from "../components/NavbarDashboard"
import { PollList } from "../components/PollList"
import { Sidebar } from "../components/Sidebar"
import LoadingPage from "../components/Loaderpage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PollsPage() {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    const [active, setActive] = useState("All Polls");

    if (!isLoaded) {
        return <LoadingPage />;
    }

    if (!isSignedIn) {
        navigate("/sign-in");
        return null;
    }
    return (
        <nav>
            <NavbarDashboard />
            <div className="flex min-h-screen bg-white font-sans">
                <Sidebar active={active} setActive={setActive} />
                <main className="flex-1 p-8 bg-gray-50">
                    <PollList active={active} />
                </main>
            </div>
        </nav>
    )
}

export default PollsPage
