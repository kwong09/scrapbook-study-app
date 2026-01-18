"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Draggable from "react-draggable";

export default function Home() {
  const nodeRef = useRef(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [quote, setQuote] = useState("To infinity and beyond");

  async function getQuote() {
    const quote = await fetch("https://api.api-ninjas.com/v2/randomquotes?", {
      headers: {
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
      },
    });

    const data = await quote.json();
    setQuote(data[0].quote);
    console.log(data);
  }

  return (
    <div className="react-draggable min-h-screen bg-stone-200 font-sans">
      <main className="flex min-h-150 w-full max-w-3xl items-center py-32 px-16 bg-white sm:items-start justify-center flex-col">
        <h1 className="text-4xl font-bold text-sky-300">Table of Contents</h1>
        
        <div className="flex min-h-80 w-full bg-sky-200 my-5 justify-evenly items-center flex-wrap">
          <div onClick={() => {setQuoteOpen(!quoteOpen); if(!quoteOpen) {getQuote();}}} 
          className="h-25 w-25 m-5 bg-white hover:bg-sky-50 hover:cursor-pointer"></div>
          <div onClick={() => {setMusicOpen(!musicOpen);}} 
          className="h-25 w-25 m-5 bg-white hover:bg-sky-50 hover:cursor-pointer"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
        </div>
      </main>

      {quoteOpen && (
        <Draggable nodeRef={nodeRef}>
          <div ref={nodeRef} className="bg-white paper-bg shadow-md h-100% w-75 rounded absolute left-10 top-10">
            <p className="text-xl text-sky-300 p-5 leading-6.5">{quote}</p>
          </div>
        </Draggable>
      )}

      {musicOpen && (
        <Draggable nodeRef={nodeRef}>
          <div ref={nodeRef} className="bg-white shadow-md h-100 w-75 rounded absolute left-20 top-20">
          </div>
        </Draggable>
      )}
      
      
    </div>

  );
}
