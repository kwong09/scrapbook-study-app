"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import Draggable from "react-draggable";

export default function Home() {
  const nodeRef = useRef(null);
  const timeRef = useRef(null);
  const stickerRef1 = useRef(null);
  const stickerRef2 = useRef(null);
  const stickerRef3 = useRef(null);
  const stickerRef4 = useRef(null);
  
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quote, setQuote] = useState("To infinity and beyond");
  const [musicOpen, setMusicOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState("0:00");
  const [stickersOpen, setStickersOpen] = useState(false);

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

  async function getTime() {
    fetch('https://time.now/developer/api/ip')
    .then(response => response.json())
    .then(data => {
      const time = data.datetime;
      const timeObject = new Date(time);
      const regularTime = timeObject.toLocaleTimeString();
      setTime(regularTime);
      //console.log('Current time:', data.datetime);
      //console.log('Timezone:', data.timezone);
    });
  }

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, []);
  

  return (
    <div className="fixed inset-0 edu-sa-hand-regular react-draggable max-h-screen bg-[#9e5d37] paper-crumpled-bg overflow-hidden">
      <motion.div whileHover={{y: -10}} className="m-auto mt-150 relative z-50">
        <motion.main  animate={{ y: contentOpen ? -575 : 0}} onClick={() => {setContentOpen(!contentOpen)}} 
        className="paper-bg shadow-lg m-auto flex min-h-150 w-full max-w-3xl items-center py-32 px-16 sm:items-start justify-center flex-col hover:cursor-pointer">
          
          <h1 className="text-4xl font-bold text-gray-500">table of contents</h1>
          
          <div className="flex min-h-80 w-full bg-sky-200 my-5 justify-evenly items-center flex-wrap">
            <div onClick={() => {setQuoteOpen(!quoteOpen); if(!quoteOpen) {getQuote();}}} 
            style={{"--icon-img": "url('/imgs/textbubble.png')"} as React.CSSProperties}
            className="icon h-25 w-25 m-5 hover:cursor-pointer"></div>

            <div onClick={() => {setMusicOpen(!musicOpen);}} 
            className="h-25 w-25 m-5 bg-white hover:bg-sky-50 hover:cursor-pointer"></div>

            <div onClick={() => {setTimeOpen(!timeOpen);}}  
            style={{"--icon-img": "url('/imgs/clock.png')"} as React.CSSProperties}
            className="icon h-25 w-25 m-5 hover:cursor-pointer"></div>

            <div onClick={() => {setStickersOpen(!stickersOpen);}}
            className="h-25 w-25 m-5 bg-white"></div>
            <div className="h-25 w-25 m-5 bg-white"></div>
            <div className="h-25 w-25 m-5 bg-white"></div>
            <div className="h-25 w-25 m-5 bg-white"></div>
            <div className="h-25 w-25 m-5 bg-white"></div>
          </div>
        </motion.main>
      </motion.div>

      {quoteOpen && (
        <Draggable bounds="parent" nodeRef={nodeRef}>
          <div ref={nodeRef} className="bg-white paper-bg shadow-lg h-100% w-75 rounded absolute left-10 top-10 grab">
            <p className="text-xl text-gray-500 p-5 leading-6.5">{quote}</p>
          </div>
        </Draggable>
      )}

      {musicOpen && (
        <Draggable bounds="parent" nodeRef={nodeRef}>
          <div ref={nodeRef} className="bg-white shadow-lg h-100 w-75 rounded absolute left-20 top-20 grab z-0">
          </div>
        </Draggable>
      )}

      {timeOpen && (
        <Draggable bounds="parent" nodeRef={timeRef}>
          <div ref={timeRef}
          className="flex bg-sky-200 font-mono shadow-lg h-40 w-75 rounded absolute left-20 top-20 grab z-0 items-center justify-center flex-col">
            <div className="bg-white p-6 rounded text-gray-400 flex items-center justify-center flex-col">
              <p className="text-4xl">{time}</p>
              <a target="_blank" className="text-xs italic text-sky-300 hover:underline" href="https://time.now">World Time API by Time.Now</a>
            </div>
          </div>
        </Draggable>
      )}

      {stickersOpen && <>(
        <Draggable bounds="parent" nodeRef={stickerRef1}>
          <div ref={stickerRef1} style={{"--sticker-img": "url('/imgs/sticker1.png')"} as React.CSSProperties} 
          className="sticker h-25 w-25 absolute left-10 top-25 grab z-0">
          </div>
        </Draggable>
      
        <Draggable bounds="parent" nodeRef={stickerRef2}>
          <div ref={stickerRef2} style={{"--sticker-img": "url('/imgs/sticker2.png')"} as React.CSSProperties} 
          className="sticker h-25 w-25 absolute left-15 top-100 grab z-0">
          </div>
        </Draggable>

        <Draggable bounds="parent" nodeRef={stickerRef3}>
          <div ref={stickerRef3} style={{"--sticker-img": "url('/imgs/sticker3.png')"} as React.CSSProperties} 
          className="sticker h-25 w-25 absolute right-10 top-25 grab z-0">
          </div>
        </Draggable>
      
        <Draggable bounds="parent" nodeRef={stickerRef4}>
          <div ref={stickerRef4} style={{"--sticker-img": "url('/imgs/sticker4.png')"} as React.CSSProperties} 
          className="sticker h-25 w-25 absolute right-15 top-100 grab z-0">
          </div>
        </Draggable>
      )</>}
      
      
    </div>

  );
}
