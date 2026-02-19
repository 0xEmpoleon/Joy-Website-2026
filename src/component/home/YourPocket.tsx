"use client"
import React, { useEffect } from 'react'
import Png from '@/assets/Png'
import Image from 'next/image'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function YourPocket() {
      useEffect(() => {
      // Hide text initially
      gsap.set(".web-3-text, .common-text", { opacity: 0, y: 50 });

      // Pin section
      ScrollTrigger.create({
        trigger: ".you-pocket-main",
        start: "top top",
        end: "+=3000", // scrolling distance
        pin: ".you-pocket-con",
        scrub: true,
      });

      // Tilt gamepad
      gsap.to(".gamepad-icon", {
        rotateX: 25,
        rotateY: 25,
        scrollTrigger: {
          trigger: ".you-pocket-main",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade in text
      gsap.to(".web-3-text, .common-text", {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".you-pocket-main",
          start: "top center", // when half scrolled
          toggleActions: "play none none reverse",
        },
      });
    }, []);

  return (
    <>
      <div className="you-pocket-main">
      <div className="you-pocket-con">
        <div className="game-img-sec-main">
          <Image
            src={Png.gamePad}
            width={1000}
            height={400}
            className="gamepad-icon"
            alt="gamepad"
          />
        </div>
        <h1 className="web-3-text">Web 3 in Your Pocket</h1>
        <p className="common-text">Discover. Play. Earn</p>
      </div>
    </div>
    </>
  )
}

export default YourPocket