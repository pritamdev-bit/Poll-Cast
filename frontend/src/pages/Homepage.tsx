import { Link, useNavigate } from "react-router-dom";
import NavbarHomepage from "../components/NavbarHomepage";
import FooterHomepage from "../components/FooterHomepage";
import { useUser } from "@clerk/react";
import LoadingPage from "../components/Loaderpage";


export default function Homepage() {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    
    if (!isLoaded) {
        return <LoadingPage />;
    }

    if (isSignedIn) {
        navigate("/dashboard");
        return null;
    }

    return (
        <div className="w-full">
            <NavbarHomepage />
            <div className="home-box">
                <div className="hero-section sm:mx-auto mx-0 mt-5 lg:mt-0 flex lg:items-center items-start lg:justify-between sm:w-[82%] w-full justify-center h-[80vh] lg:flex-row lg:gap-0 gap-5 flex-col lg:p-0 p-4">
                    <div className="left-hero">
                        <div className="flex items-center gap-2 border rounded-full w-fit px-4 py-2 text-xs bg-white/60">
                            <span className="w-2 h-2 bg-[#aedf6b] rounded-full"></span>
                            <span className="font-bold">REAL-TIME POLLING, MADE SIMPLE</span>
                        </div>
                        <h1 className="text-5xl font-bold leading-15">Ask questions.<br />Get <span className="relative z-10 before:content-[''] before:absolute before:top-2 py-0.5 px-1 before:inset-0 before:h-[80%] before:bg-[#C6EF8C] before:-z-10 before:-rotate-z-3">real</span> answers.</h1>
                        <p className="mt-4 text-md text-[#1A1A1A]/60 font-semibold">Create live polls in seconds and engage your<br /> audience with real-time results.</p>
                        <div className="flex items-center gap-4 mt-8">
                            <Link to="/sign-up" className={`bg-[#C6EF8C] font-semibold text-sm px-6 py-2 rounded-fullbg-[#C6EF8C] border-[1.5px] border-black rounded-full hover:shadow-[3px_3px_0px_0px_#000] shadow-none transition-all duration-500`}>SIGN UP FREE</Link>
                            <Link to="#" className={`bg-white/60 font-semibold text-sm px-6 py-2 rounded-fullbg-[#C6EF8C] border-[1.5px] border-black rounded-full hover:shadow-[3px_3px_0px_0px_#000] shadow-none transition-all duration-500`}>LEARN MORE</Link>
                        </div>
                    </div>
                    <div className="right-hero border-[1.5px] rounded-xl p-3">
                        <div className="flex items-center justify-between pb-2 px-2">
                            <div className='text-xs font-black flex items-center'>
                                <h1 className='relative text-[#C6EF8C] z-10 before:content-[""] before:absolute before:inset-0 before:bg-black before:-z-10 before:-rotate-z-3 p-1'>POLL</h1>
                                <p>&nbsp;CAST</p>
                            </div>
                            <button className="flex items-center gap-1 bg-[#EA99B2] py-1 px-2 rounded-full border">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone-icon lucide-megaphone"><path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" /><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" /><path d="M8 6v8" /></svg>
                                <span className="text-xs font-semibold">LIVE</span>
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <div className="tab-left border-[1.5px] bg-white/60 p-4 sm:text-sm text-[12px] rounded-md">
                                <p className="text-xs italic text-[#1A1A1A]/60 font-semibold">Question of the day</p>
                                <h2 className="text-xl sm:text-3xl font-bold mb-4">SHOULD WE MAKE 4-DAY<br /> WORK WEEKS THE<br /> STANDARD?</h2>
                                <div 
                                className="w-full flex items-center justify-between border rounded-2xl p-2 mb-2 relative after:content-[''] after:absolute after:inset-0 after:bg-[#7acc08] after:-z-10 after:rounded-2xl after:w-[68%]"><span>ABSOLUTELY, SIGN ME UP</span> <span>68%</span></div>
                                <div className="w-full flex items-center justify-between border rounded-2xl p-2 mb-2 relative after:content-[''] after:absolute after:inset-0 after:bg-[#7acc08] after:-z-10 after:rounded-2xl after:w-[22%]"><span>NO, 5 DAYS IS PERFECT</span> <span>22%</span></div>
                                <div className="w-full flex items-center justify-between border rounded-2xl p-2 relative after:content-[''] after:absolute after:inset-0 after:bg-[#7acc08] after:-z-10 after:rounded-2xl after:w-[10%]"><span>DEDEPENDS ON THE INDUSTRY</span> <span>10%</span></div>
                            </div>
                            <div className="tab-right text-xs">
                                <div className="live-results border rounded-md p-2">
                                    <div className="flex items-center font-bold justify-between pb-2">
                                        <p>LIVE RESULTS</p>
                                        <span className="w-2 h-2 bg-[#aedf6b] rounded-full"></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold">
                                        <div className="py-2 px-6 border rounded-md text-center bg-white/60">
                                            1,284<br />VOTES
                                        </div>
                                        <div className="py-2 px-6 border rounded-md text-center bg-white/60">
                                            04:12<br />ELAPSED
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-activity text-[10px] font-bold p-2 border rounded-md mt-4 bg-white/60">
                                    <p>RECENT ACTIVITY</p>
                                    <div className="flex items-center gap-2 py-2 border-b-[0.5px] border-black/10">
                                        <div className="icon w-fit bg-[#C6EF8C] p-2 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-column-icon lucide-chart-no-axes-column"><path d="M5 21v-6"/><path d="M12 21V3"/><path d="M19 21V9"/></svg>
                                        </div>
                                            <p className="text-[#1A1A1A]/60 text-[8px] font-semibold">1,284 mew votes<br />"4-Day Work Week"<br /><span className="font-normal">2 minutes ago</span></p>
                                    </div>
                                    <div className="flex items-center gap-2 py-2 border-b-[0.5px] border-black/10">
                                        <div className="icon w-fit bg-[#FDDF64] p-2 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                        </div>
                                            <p className="text-[#1A1A1A]/60 text-[8px] font-semibold">Poll "Design Tools"<br />completed<br /><span className="font-normal">15 minutes ago</span></p>
                                    </div>
                                    <div className="flex items-center gap-2 py-2 border-b-[0.5px] border-black/10">
                                        <div className="icon w-fit bg-[#CBACF1] p-2 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
                                        </div>
                                            <p className="text-[#1A1A1A]/60 text-[8px] font-semibold">1,284 mew votes<br />"4-Day Work Week"<br /><span className="font-normal">2 minutes ago</span></p>
                                    </div>
                                    <div className="all-activity flex items-center justify-between pt-2">
                                        <p className="font-bold">VIEW ALL ACTIVITY</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="features flex items-center lg:justify-center p-4 w-full mt-4 sm:mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 border px-4 py-2 rounded-md flex-wrap sm:w-[82vw] w-full">
                    <div className="feature-1 flex items-center gap-4 lg:border-r border-b lg:border-b-0 px-4 py-2">
                        <div className="icon border-[1.5px] rounded-md p-2 bg-[#EA99B2]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                        </div>
                        <div className="text">
                            <p className="font-bold">Live Results</p>
                            <p className="text-xs text-[#1A1A1A]/60 font-bold">See votes roll in real-time and<br /> engage your audience.</p>
                        </div>
                    </div>
                    <div className="feature-2 flex items-center gap-4 lg:border-r border-b lg:border-b-0 px-4 py-2">
                        <div className="icon border-[1.5px] rounded-md p-2 bg-[#C6EF8C]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
                        </div>
                        <div className="text">
                            <p className="font-bold">Easy to Use</p>
                            <p className="text-xs text-[#1A1A1A]/60 font-bold">Create polls in seconds. No<br />tech skills needed.</p>
                        </div>
                    </div>
                    <div className="feature-3 flex items-center gap-4 lg:border-r border-b lg:border-b-0 px-4 py-2">
                        <div className="icon border-[1.5px] rounded-md p-2 bg-[#FDDF64]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette-icon lucide-palette"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                        </div>
                        <div className="text">
                            <p className="font-bold">Custom & Beautiful</p>
                            <p className="text-xs text-[#1A1A1A]/60 font-bold">Choose from templates or<br />create your own.</p>
                        </div>
                    </div>
                    <div className="feature-4 flex items-center gap-4 px-4 py-2 border-b lg:border-b-0">
                        <div className="icon border-[1.5px] rounded-md p-2 bg-[#CBACF1]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-column-icon lucide-chart-no-axes-column"><path d="M5 21v-6"/><path d="M12 21V3"/><path d="M19 21V9"/></svg>
                        </div>
                        <div className="text">
                            <p className="font-bold">Powerful Insights</p>
                            <p className="text-xs text-[#1A1A1A]/60 font-bold">Export results and make<br />data-driven decisions.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <FooterHomepage />
        </div>
    )
}
