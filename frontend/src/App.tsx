import { linkApi } from "./services/api"
import { useState } from "react"

export default function App() {
  const [url, setURl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleShortening = async () => {
    const data = await linkApi.makeShortURL(url)
    setShortUrl(data.shortUrl)
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white/70 p-7 rounded-lg shadow-lg border border-gray-400 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6">URL Shortener</h1>
        <label className="block text-black text-sm mb-1">Long URL</label>
        <input 
          type="text" 
          placeholder="Paste your URL here"
          value={url}
          onChange={(event) => setURl(event.target.value)}
          className="w-full text-black border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
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
    </div>
  )
}