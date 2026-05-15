import { Link } from "react-router-dom";

export default function NavbarHomepage() {
  return (
    <nav className="flex items-center justify-between p-4 border-b-[1.5px]">
      <div className='text-xl font-black flex items-center'>
        <h1 className='relative text-[#C6EF8C] z-10 before:content-[""] before:absolute before:inset-0 before:bg-black before:-z-10 before:-rotate-z-3 p-1'>POLL</h1>
        <p>&nbsp;CAST</p>
      </div>
      <ul className="flex text-sm items-center gap-10 font-semibold">
        <li><Link to="/" className="relative before:content-[''] before:w-0 before:h-0 before:absolute before:inset-0 before:bg-black before:top-5 hover:before:w-full hover:before:h-0.5 before:transition-all before:duration-300">HOME</Link></li>
        <li className="hidden sm:block"><Link to="#" className="relative before:content-[''] before:w-0 before:h-0 before:absolute before:inset-0 before:bg-black before:top-5 hover:before:w-full hover:before:h-0.5 before:transition-all before:duration-300">ABOUT</Link></li>
        <li className="hidden sm:block"><Link to="#" className="relative before:content-[''] before:w-0 before:h-0 before:absolute before:inset-0 before:bg-black before:top-5 hover:before:w-full hover:before:h-0.5 before:transition-all before:duration-300">CONTACT</Link></li>
        <li><Link to="/sign-in" className="relative before:content-[''] before:w-0 before:h-0 before:absolute before:inset-0 before:bg-black before:top-5 hover:before:w-full hover:before:h-0.5 before:transition-all before:duration-300">LOGIN</Link></li>
        <li><Link to="/sign-up" className={`bg-[#C6EF8C] px-4 py-2 rounded-fullbg-[#C6EF8C] border border-black rounded-full hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5  shadow-none transition-all duration-500`}>SIGN UP FREE</Link></li>
      </ul>
    </nav>
  )
}
