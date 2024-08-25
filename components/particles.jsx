"use client"

import Script from "next/script"

export const Particle = () => {
  return (
    <>
      <div id="particles-js" className="absolute top-0 left-0 w-full h-full z-10"></div>
      <Script src="/particles.js" onReady={()=>{window.particlesJS.load('particles-js', '/particles.json')}} />
    </>
  )
}
