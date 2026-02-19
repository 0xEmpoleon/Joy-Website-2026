"use client"

import Png from '@/assets/Png'
import Svg from '@/assets/Svg'
import Image from 'next/image'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  useEffect(() => {
    const joyLogo = document.getElementById("joy-logo")
    const scrollInstruction = document.getElementById("scrollInstruction")

    // 🔹 Fade out scroll instruction
    gsap.to(scrollInstruction, {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: "#main",
        start: "top+=50 top", // after 50px
        toggleActions: "play none none reverse",
      },
    })

    // 🔹 Smooth Joy scaling with scroll (optimized for iOS)
    gsap.to(joyLogo, {
      scale: 24, // 1 → 60x growth
      ease: "none",
      force3D: true, // Force GPU acceleration
      transformOrigin: "center center",
      scrollTrigger: {
        trigger: "#main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Add slight smoothing (0.5-2 recommended for iOS)
        invalidateOnRefresh: true,
      },
    })

    gsap.to(".rightline-main", {
  scrollTrigger: {
    trigger: ".rightline-main",
    start: "top bottom",
    end: "+=500", // stick distance
    pin: true,
    pinSpacing: false
  }
});
  }, [])

  return (
    <div id="main" className="main-components">

      <div id="preroll" className="playroll-content">
        <div id="joy" className="joy-main">
          <Image
            id="joy-logo"
            className="joy-logo"
            src={Png.joylogo}
            alt="JOY Shape"
          />
        </div>

        <div className="rightline-main">
          <Image src={Svg.RightArrowLine} className='rightline-icon' alt="rightline" />
          </div>

        <div id="scrollInstruction" className="scrolldown-main">
          <Image src={Png.DownArrow} className="scroll-down" alt="down" />
          <div className="scroll-text">Scroll</div>
        </div>
        
      </div>
    </div>
  )
}

export default HeroSection
