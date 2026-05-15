import { useClerk } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarDashboard() {
    const navigate = useNavigate();
    const { signOut } = useClerk();
    return (
        <nav className="flex items-center justify-between p-4 border-b-[1.5px]">
            <div
                onClick={() => navigate("/dashboard")}
                className='text-xl font-black flex items-center cursor-pointer'>
                <h1 className='relative text-[#C6EF8C] z-10 before:content-[""] before:absolute before:inset-0 before:bg-black before:-z-10 before:-rotate-z-3 p-1'>POLL</h1>
                <p>&nbsp;CAST</p>
            </div>
            <ul className="flex text-sm items-center gap-10 font-semibold">
                <li className="hidden sm:block"><Link to="/dashboard" className="relative before:content-[''] before:w-0 before:h-0 before:absolute before:inset-0 before:bg-black before:top-5 hover:before:w-full hover:before:h-0.5 before:transition-all before:duration-300">DASHBOARD</Link></li>
                <li><Link to="/polls" className="relative before:content-[''] before:w-0 before:h-0 before:absolute before:inset-0 before:bg-black before:top-5 hover:before:w-full hover:before:h-0.5 before:transition-all before:duration-300">POLLS</Link></li>
                <li className="hidden sm:block"><Link to="/analytics" className="relative before:content-[''] before:w-0 before:h-0 before:absolute before:inset-0 before:bg-black before:top-5 hover:before:w-full hover:before:h-0.5 before:transition-all before:duration-300">ANALYTICS</Link></li>
            </ul>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate("/create-poll")}
                    className="bg-[#EA99B2] hidden sm:block px-4 py-2 rounded-fullbg-[#C6EF8C] border border-black rounded-full hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5  shadow-none transition-all duration-500 cursor-pointer">
                    CREATE NEW POLL
                </button>
                <button
                    onClick={() => signOut({ redirectUrl: '/sign-in' }) }
                    className="bg-red-500 px-4 py-2 rounded-fullbg-[#C6EF8C] border border-black rounded-full hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5  shadow-none transition-all duration-500 cursor-pointer"
                >
                    LOG OUT
                </button>
            </div>
        </nav>
    )
}