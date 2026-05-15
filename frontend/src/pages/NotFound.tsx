import { useEffect } from 'react'

export default function NotFound() {
    useEffect(() => {
        document.title = "404: Not Found";
    }, [])

  return (
    <div className='flex items-center justify-center h-screen w-screen bg-lime-500'>
      <h1 className={`sm:text-8xl text-6xl font-black text-white text-center`}>404: Not Found</h1>
    </div>
  )
}
