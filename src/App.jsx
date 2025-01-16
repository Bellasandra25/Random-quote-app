import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
const[quote , setQuote] = useState('')
const [author, setAuthor] = useState('')  
const [loading, setLoading] = useState(false)

const fetchQuote = async () => {
  setLoading(true);
  const url = 'https://random-quote-generator2.p.rapidapi.com/randomQuote';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5f40af5de3msh9c849a448e82a13p1db9adjsnd85c5a9d8295',
		'x-rapidapi-host': 'random-quote-generator2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
  setQuote(JSON.parse(result)[0].Quote);
  setAuthor(JSON.parse(result)[0].Author);
} catch (error) {
	console.error(error);
}finally{
  setLoading(false)
}
}

useEffect(()=>{
  fetchQuote()
}, [])

  return (
    <section className='text-center p-4 bg-grey-500 flex flex-col justify-center items-center text-white '>
      <h1>Random Quote Generator </h1>
      {loading ? (
          <div
            className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"
          ></div>
        ) : (
  <textarea name="randomquote"
   className='w-1/2 h-32 p-2 text-black rounded-lg border' 
   value={`${quote}\n- ${author}`} readOnly>
</textarea>
)}
   <div className='mt-4 space-x-4'>
   <button
className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
onClick={() => fetchQuote()}
>
  search quote
</button>
<button
className='border-none rounded-lg bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4'
onClick={() => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - ${author}`)}`;
  window.open(tweetUrl, '_blank');
}
}
disabled={!quote || !author}
>
  tweet quote
</button>
   </div>
    </section>
  )
}



export default App