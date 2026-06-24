import { linkApi } from "./services/api"
import { useState } from "react"
import { VscGithub } from "react-icons/vsc";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

export default function App() {
  const [url, setURl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const handleShortening = async () => {
    const data = await linkApi.makeShortURL(url)
    
    setShortUrl(data.shortUrl)
  }
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`p-7 rounded-lg shadow-lg border w-full max-w-md ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white/70 border-gray-400'}`}>
        <h1 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' :'text-black'} mb-6`}>URL Shortener</h1>
        <label className={`block ${darkMode ? 'text-white' :'text-black'} text-sm mb-1`}>Long URL</label>
        <input 
          type="text" 
          placeholder="Paste your URL here"
          value={url}
          onChange={(event) => setURl(event.target.value)}
          className={`w-full text-black border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4`}
        />
        <button 
          onClick={handleShortening}
          className="w-full bg-blue-600 hover:bg-gray-400 hover:text-gray-700 text-white font-semibold py-2 rounded"
        >
          Shorten URL
        </button>
        {shortUrl && (
          <div className="mt-4 p-3 bg-gray-50 rounded border">
            <p className="text-sm text-gray-600 mb-1">Your shortened url:</p>
            <a href={shortUrl} className="text-blue-500 break-all text-sm">{shortUrl}</a>
          </div>
        )}
      </div>
      <a 
        href="https://github.com/zgh-code/URL-Shortner" 
        target="_blank"
        className="fixed bottom-4 right-4 text-gray-400 hover:text-gray-700"
      >
        <VscGithub size={24} />
      </a>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 left-4 text-gray-400 hover:text-gray-700"
      >
        {/*bascially if dark mode shwo the sun icon otherwise the moon icon */}
        {darkMode ? <FaRegSun size={24} /> : <FaRegMoon size={24} />}
      </button>
    </div>
  )
}