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
  const [todoOpen, setTodoOpen] = useState(false);

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
    <div style={{"--bg-img": "url('/imgs/papercrumpled.jpg')"} as React.CSSProperties}
    className="fixed inset-0 edu-sa-hand-regular react-draggable max-h-screen bg-img overflow-hidden">
      <motion.div whileHover={{y: -10}} className="m-auto mt-150 relative z-50">
        <motion.main  animate={{ y: contentOpen ? -575 : 0}} onClick={() => {setContentOpen(!contentOpen)}} 
        style={{"--bg-img": "url('/imgs/brownpaper.jpg')"} as React.CSSProperties}
        className="bg-img shadow-lg m-auto flex min-h-150 w-full max-w-3xl items-center py-32 px-16 justify-center flex-col hover:cursor-pointer">
          
          <h1 className="text-4xl text-center font-bold text-white">table of contents</h1>
          
          <div className="flex min-h-80 w-full my-5 justify-evenly items-center flex-wrap">
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

            <div onClick={() => {setTodoOpen(!todoOpen)}}
            className="h-25 w-25 m-5 bg-white"></div>

            <div className="h-25 w-25 m-5 bg-white"></div>
            <div className="h-25 w-25 m-5 bg-white"></div>
            <div className="h-25 w-25 m-5 bg-white"></div>
          </div>
        </motion.main>
      </motion.div>

      {quoteOpen && (
        <Draggable bounds="parent" nodeRef={nodeRef}>
          <div ref={nodeRef} style={{"--bg-img": "url('/imgs/paperpattern.png')"} as React.CSSProperties}
          className="bg-img paper-bgite  shadow-lg h-100% w-75 rounded absolute left-10 top-10 grab">
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
          className="flex bg-[#d9a782] font-mono shadow-lg h-40 w-75 rounded absolute left-20 top-20 grab z-0 items-center justify-center flex-col">
            <div className="bg-white p-6 rounded text-gray-600 flex items-center justify-center flex-col">
              <p className="text-4xl">{time}</p>
              <a target="_blank" className="text-xs italic text-[#d9a782] hover:underline" href="https://time.now">World Time API by Time.Now</a>
            </div>
          </div>
        </Draggable>
      )}

      {todoOpen && (
        <Draggable bounds="parent" nodeRef={nodeRef}>
          <div ref={nodeRef} style={{"--bg-img": "url('/imgs/brownpaper.jpg')"} as React.CSSProperties}
          className="bg-img shadow-lg h-100 w-75 rounded absolute left-20 top-20 grab z-0 p-5">
            <h1 className="text-center text-2xl text-white font-bold">To-Do List</h1>
            <div className="grid grid-cols-[max-content_1fr] gap-2 mt-2">
              <input type="checkbox" className="w-5 border-white"></input>
              <input type="text" className="border bg-white rounded-xl border-white p-1 h-full resize-y text-gray-600"></input>
              <input type="checkbox" className="w-5"></input>
              <input type="text" className="order bg-white rounded-xl border-white p-1 h-full resize-y text-gray-600"></input>
              <input type="checkbox" className="w-5"></input>
              <input type="text" className="order bg-white rounded-xl border-white p-1 h-full resize-y text-gray-600"></input>
              <input type="checkbox" className="w-5"></input>
              <input type="text" className="order bg-white rounded-xl border-white p-1 h-full resize-y text-gray-600"></input>
              <input type="checkbox" className="w-5"></input>
              <input type="text" className="order bg-white rounded-xl border-white p-1 h-full resize-y text-gray-600"></input>
              <input type="checkbox" className="w-5"></input>
              <input type="text" className="order bg-white rounded-xl border-white p-1 h-full resize-y text-gray-600"></input>
              <input type="checkbox" className="w-5"></input>
              <input type="text" className="order bg-white rounded-xl border-white p-1 h-full resize-y text-gray-600"></input>
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
