import { linkApi } from "./services/api"
import { useState } from "react"
import { VscGithub } from "react-icons/vsc";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

//vite acutally has to have type written out here compared to next js   
import type { LinkHistory } from './types/LinkHistory'

export default function App() {
  const [url, setURl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [history, setHistory] = useState<LinkHistory[]>([])
  //added a way to copy the shortened licks by just clicking a copy button
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    //so after 2 seconds the use state is set back to false so it should just show Copied! then go bak to Copy
    setTimeout(() => setCopiedIndex(null), 2000)
  }
  const handleShortening = async () => {
    const data = await linkApi.makeShortURL(url)
    const newLink = { 
      shortUrl: data.shortUrl, 
      originalUrl: url 
    }

    
    //make a copy of history array flatten it and add it to new link
    setHistory([newLink, ...history])
    setShortUrl(data.shortUrl)
  }
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`p-7 rounded-lg shadow-lg border w-full max-w-md ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white/70 border-gray-400'}`}>
        <h1 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' :'text-black'} mb-6`}>URL Shortener</h1>
        <label className={`block ${darkMode ? 'text-white' :'text-black'} text-sm mb-1 mx-auto block w-[85%]`}>Long URL</label>
        <input 
          type="text" 
          placeholder="Paste your URL here"
          value={url}
          onChange={(event) => setURl(event.target.value)}
          className={`w-[85%] mx-auto block text-black border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 mb-2`}
        />
        <button 
          onClick={handleShortening}
          className="w-[80%] mx-auto block bg-orange-600 hover:bg-gray-400 hover:text-gray-700 text-white font-semibold py-2 rounded mb-4"
        >
          Shorten URL
        </button>
        {shortUrl && (
          <div 
          className={`w-[80%] mx-auto block p-3 rounded mt-2 border text-sm font-bold ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>shortened url:</p>
            <a href={shortUrl} className="text-orange-500 font-semibold break-all text-sm">{shortUrl}</a>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className={`text-center text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Recent Shortened Links
            </h2>
            <div className="flex flex-col gap-2">
              {history.map((link, index) => (
                <div key={index} className={`p-3 rounded-xl border text-sm font-bold ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <p className={`truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{link.originalUrl}</p>
                  <a href={link.shortUrl} className="text-blue-500 break-all">{link.shortUrl}</a>
                  <button
                    onClick={() => copyToClipboard(link.shortUrl, index)}
                    className="text-gray-400 hover:text-gray-600 text-xs ml-2"
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
              ))}
            </div>
          </div>
        )}
      </div>
      <a 
        href="https://github.com/zgh-code/URL-Shortner" 
        target="_blank"
        className="fixed bottom-6 right-6 text-gray-400 hover:text-gray-700"
      >
        <VscGithub size={36} />
      </a>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 left-6 text-gray-400 hover:text-gray-700"
      >
        {/*bascially if dark mode shwo the sun icon otherwise the moon icon */}
        {darkMode ? <FaRegSun size={36} /> : <FaRegMoon size={36} />}
      </button> 
    </div>
  )
}