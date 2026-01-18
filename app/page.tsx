import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-200 font-sans">
      <main className="flex min-h-150 w-full max-w-3xl items-center py-32 px-16 bg-white sm:items-start justify-center flex-col">
        <h1 className="text-4xl font-bold text-sky-300">Table of Contents</h1>
        <div className="flex min-h-80 w-full bg-sky-200 my-5 justify-evenly items-center flex-wrap">
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
          <div className="h-25 w-25 m-5 bg-white"></div>
        </div>
      </main>
    </div>
  );
}
