import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
const App = () => {
const[quote , setQuote] = useState('')
const [author, setAuthor] = useState('')  
const [loading, isLoading] = useState(false)

const fetchQuote = async () => {
  isLoading(true);
  try{
    const fetch= await axios.get('https://api.quotable.io/random')
   setQuote(fetch.data.content);
   setAuthor(fetch.data.author);
  }catch(error){
    console.log(error);
  }
  isLoading(false);
};


useEffect(()=>{
  fetchQuote()
}, [])

  return (
    <section className='text-center p-4 bg-grey-500 flex justify-center items-center text-white '>
      <h1>Random Quote Generator </h1>
  <textarea name="randomquote"
   className='w-1/2 h-32 p-2 text-black rounded-lg' 
   value={`${quote}\n- ${author}`} readOnly>{loading ? 'loading...' : '{quote}\n- {author}'}
</textarea>
<button
className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
onClick={() => fetchQuote()}
>
  search quote
</button>
<button
className='border-none rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'
onClick={() => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, '_blank');
}
}
>
  tweet quote
</button>
    </section>
  )
}

export default App