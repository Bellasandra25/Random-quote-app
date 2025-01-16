import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
const[quote , setQuote] = useState('')
const [author, setAuthor] = useState('')  
const [loading, setLoading] = useState(false)

const fetchQuote = async () => {
  setLoading(true);
  try{
    const fetch= await axios.get('https://type.fit/api/quotes'
  )
   console.log("Axios response", fetch)
    setTimeout(() => {
      setQuote(res.data.content);
      setAuthor(res.data.author); 
      setLoading(false); 
    }, 1000);
   console.log(" fetched the quote")
  }catch(error){
    console.log(error);
    console.log('Axios error', error);
    if(error.response){
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

    }else if(error.request){
      console.log("No response" ,error.request);
  }
  else{
    console.log("Error", error.message);
  }
    setQuote('An error occured');
  setLoading(false);
};


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
   value={loading ? 'loading...' :`${quote}\n- ${author}`} readOnly>
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
className='border-none rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'
onClick={() => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, '_blank');
}
}disabled = {!quote|| !author}
>
  tweet quote
</button>
   </div>
    </section>
  )
}
}
export default App