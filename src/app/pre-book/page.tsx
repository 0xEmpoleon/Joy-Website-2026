"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
// import GamigConsole from "@/component/home/GamigConsole";
// import Partners from "@/component/home/Partners";
// import JoyGenesis from "@/component/home/JoyGenesis";
// import Specifications from "@/component/home/Specifications";
// import Faq from "@/component/home/Faq";
// import AboutUs from "@/component/home/AboutUs";
import Image from "next/image";
import Png from "@/assets/Png";
import Svg from "@/assets/Svg";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/component/home/Footer";
import PreBookWishlist from "@/component/preBook/PreBookWishlist";
// import KeyBenefits from "@/component/preBook/KeyBenefits";
// import PrebookProcessor from "@/component/preBook/PrebookProcessor";
import PreBookFooter from "@/component/preBook/PreBookFooter";
// import CopyRightFooter from "@/component/preBook/CopyRightFooter";
import GenSpecification from "@/component/home/GenSpecification";
import Presale from "@/component/preBook/Presale";
import JoyImg from "@/component/preBook/JoyImg";
import DetailSlider from "@/component/preBook/DetailSlider";
import { trackPageView } from "@/utils/analytics";

gsap.registerPlugin(ScrollTrigger);

interface HeroData {
  _id: string;
  title1: string;
  title2: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ProductLiveData {
  _id: string;
  productLiveStatus: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const HomePage = () => {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const joyLogoRef = useRef<HTMLImageElement>(null);
  const gameImgSecRef = useRef<HTMLDivElement>(null);
  const gamepadIconRef = useRef<HTMLImageElement>(null);
  const heroConRef = useRef<HTMLDivElement>(null);
  const playrollContentRef = useRef<HTMLDivElement>(null);
  const dNoneMainRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const downArrowRef = useRef<HTMLImageElement>(null);
  const videoTextSecRef = useRef<HTMLDivElement>(null);

  // Video text animation refs
  const videoTitleOneRef = useRef<HTMLHeadingElement>(null);
  const videoTitleTwoRef = useRef<HTMLHeadingElement>(null);
  const videoTitleThreeRef = useRef<HTMLHeadingElement>(null);
  const videoTitleFourRef = useRef<HTMLHeadingElement>(null);
  const videoTitleFiveRef = useRef<HTMLHeadingElement>(null);

  const videoSubTitleOneRef = useRef<HTMLParagraphElement>(null);
  const videoSubTitleTwoRef = useRef<HTMLParagraphElement>(null);
  const videoSubTitleThreeRef = useRef<HTMLParagraphElement>(null);
  const videoSubTitleFourRef = useRef<HTMLParagraphElement>(null);
  const videoSubTitleFiveRef = useRef<HTMLParagraphElement>(null);

  const stepProgressRef = useRef<HTMLDivElement>(null);
  const renderjoyVideoRef = useRef<HTMLVideoElement>(null);
  const prebookWishlistRef = useRef<HTMLDivElement>(null);

  // Text animation refs - Top texts
  // const textAnimOneRef = useRef<HTMLHeadingElement>(null);
  // const textAnimTwoRef = useRef<HTMLHeadingElement>(null);
  // const textAnimThreeRef = useRef<HTMLHeadingElement>(null);
  // const textAnimFourRef = useRef<HTMLHeadingElement>(null);
  // const textAnimFiveRef = useRef<HTMLHeadingElement>(null);

  // Text animation refs - Bottom texts
  // const textAnimOneBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimTwoBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimThreeBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimFourBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimFiveBottomRef = useRef<HTMLHeadingElement>(null);

  const handlePreOrderClick = () => {
    if (prebookWishlistRef.current) {
      prebookWishlistRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  useEffect(() => {
    // Track page view for /pre-book page
    trackPageView("/pre-book", "Pre-book Page");
  }, []);

  useEffect(() => {
    // Header visibility on scroll
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY >= 300) {
          headerRef.current.classList.add("visible");
        } else {
          headerRef.current.classList.remove("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    const ctx = gsap.context(() => {
      // Ensure all refs are available before proceeding
      if (
        !mainRef.current ||
        !joyLogoRef.current ||
        !gameImgSecRef.current ||
        !gamepadIconRef.current ||
        !heroConRef.current ||
        !playrollContentRef.current
      ) {
        return;
      }

      // Initially hide all sections and video
      // gsap.set(introVideoRef.current, { display: "none", opacity: 0 });
      if (dNoneMainRef.current) {
        gsap.set(dNoneMainRef, { visibility: "hidden", opacity: 0 });
      }

      // Hide main-components section permanently
      if (mainRef.current) {
        gsap.set(mainRef.current, {
          display: "none",
          visibility: "hidden",
          opacity: 0,
        });
      }

      // Initially hide all video title texts
      // gsap.set([
      //   videoTitleOneRef.current,
      //   videoTitleTwoRef.current,
      //   videoTitleThreeRef.current,
      //   videoTitleFourRef.current,
      //   videoTitleFiveRef.current
      // ], { display: "none" });

      // Create timeline for the entire scroll sequence
      gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: false,
          anticipatePin: 1,
        },
      });
      // 0. Text Animation Sequence - Show each text one by one

      // Text-anim-one: Show (left to right)
      // ScrollTrigger.create({
      //   trigger: mainRef.current,
      //   start: "top top",
      //   end: "5% top",
      //   onEnter: () => {
      //     if (textAnimOneRef.current) {
      //       gsap.killTweensOf(textAnimOneRef.current);
      //       gsap.set(textAnimOneRef.current, { visibility: "visible", x: -100 });
      //       gsap.to(textAnimOneRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         ease: "power2.out",
      //         overwrite: true
      //       });
      //     }
      //   },
      //   onLeaveBack: () => {
      //     if (textAnimOneRef.current) {
      //       gsap.killTweensOf(textAnimOneRef.current);
      //       gsap.to(textAnimOneRef.current, {
      //         opacity: 0,
      //         x: -100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //   }
      // });

      // Hide text-anim-one and show text-anim-two (right to left)
      // ScrollTrigger.create({
      //   trigger: mainRef.current,
      //   start: "10% top",
      //   onEnter: () => {
      //     if (textAnimOneRef.current) {
      //       gsap.killTweensOf(textAnimOneRef.current);
      //       gsap.to(textAnimOneRef.current, {
      //         opacity: 0,
      //         x: -100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimTwoRef.current) {
      //       gsap.killTweensOf(textAnimTwoRef.current);
      //       gsap.set(textAnimTwoRef.current, { visibility: "visible", x: 100 });
      //       gsap.to(textAnimTwoRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //   },
      //   onLeaveBack: () => {
      //     if (textAnimOneRef.current) {
      //       gsap.killTweensOf(textAnimOneRef.current);
      //       gsap.to(textAnimOneRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimTwoRef.current) {
      //       gsap.killTweensOf(textAnimTwoRef.current);
      //       gsap.to(textAnimTwoRef.current, {
      //         opacity: 0,
      //         x: 100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //   }
      // });

      // Hide text-anim-two and show text-anim-three (left to right)
      // ScrollTrigger.create({
      //   trigger: mainRef.current,
      //   start: "20% top",
      //   onEnter: () => {
      //     if (textAnimTwoRef.current) {
      //       gsap.killTweensOf(textAnimTwoRef.current);
      //       gsap.to(textAnimTwoRef.current, {
      //         opacity: 0,
      //         x: 100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimThreeRef.current) {
      //       gsap.killTweensOf(textAnimThreeRef.current);
      //       gsap.set(textAnimThreeRef.current, { visibility: "visible", x: -100 });
      //       gsap.to(textAnimThreeRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //   },
      //   onLeaveBack: () => {
      //     if (textAnimTwoRef.current) {
      //       gsap.killTweensOf(textAnimTwoRef.current);
      //       gsap.to(textAnimTwoRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimThreeRef.current) {
      //       gsap.killTweensOf(textAnimThreeRef.current);
      //       gsap.to(textAnimThreeRef.current, {
      //         opacity: 0,
      //         x: -100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //   }
      // });

      // Hide text-anim-three and show text-anim-four (right to left)
      // ScrollTrigger.create({
      //   trigger: mainRef.current,
      //   start: "30% top",
      //   onEnter: () => {
      //     if (textAnimThreeRef.current) {
      //       gsap.killTweensOf(textAnimThreeRef.current);
      //       gsap.to(textAnimThreeRef.current, {
      //         opacity: 0,
      //         x: -100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimFourRef.current) {
      //       gsap.killTweensOf(textAnimFourRef.current);
      //       gsap.set(textAnimFourRef.current, { visibility: "visible", x: 100 });
      //       gsap.to(textAnimFourRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //   },
      //   onLeaveBack: () => {
      //     if (textAnimThreeRef.current) {
      //       gsap.killTweensOf(textAnimThreeRef.current);
      //       gsap.to(textAnimThreeRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimFourRef.current) {
      //       gsap.killTweensOf(textAnimFourRef.current);
      //       gsap.to(textAnimFourRef.current, {
      //         opacity: 0,
      //         x: 100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //   }
      // });

      // Hide text-anim-four and show text-anim-five (left to right)
      // ScrollTrigger.create({
      //   trigger: mainRef.current,
      //   start: "40% top",
      //   onEnter: () => {
      //     if (textAnimFourRef.current) {
      //       gsap.killTweensOf(textAnimFourRef.current);
      //       gsap.to(textAnimFourRef.current, {
      //         opacity: 0,
      //         x: 100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimFiveRef.current) {
      //       gsap.killTweensOf(textAnimFiveRef.current);
      //       gsap.set(textAnimFiveRef.current, { visibility: "visible", x: -100 });
      //       gsap.to(textAnimFiveRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //   },
      //   onLeaveBack: () => {
      //     if (textAnimFourRef.current) {
      //       gsap.killTweensOf(textAnimFourRef.current);
      //       gsap.to(textAnimFourRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //     if (textAnimFiveRef.current) {
      //       gsap.killTweensOf(textAnimFiveRef.current);
      //       gsap.to(textAnimFiveRef.current, {
      //         opacity: 0,
      //         x: -100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //   }
      // });

      // Hide text-anim-five
      // ScrollTrigger.create({
      //   trigger: mainRef.current,
      //   start: "50% top",
      //   onEnter: () => {
      //     if (textAnimFiveRef.current) {
      //       gsap.killTweensOf(textAnimFiveRef.current);
      //       gsap.to(textAnimFiveRef.current, {
      //         opacity: 0,
      //         x: -100,
      //         duration: 0.5,
      //         overwrite: true
      //       });
      //     }
      //   },
      //   onLeaveBack: () => {
      //     if (textAnimFiveRef.current) {
      //       gsap.killTweensOf(textAnimFiveRef.current);
      //       gsap.to(textAnimFiveRef.current, {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         overwrite: true
      //       });
      //     }
      //   }
      // });
      // 1. Initial Joy Logo scaling (already working)
      gsap.to(joyLogoRef.current, {
        scale: 24,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });

      // 2. Show game-img-sec-main after joy logo scaling
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "20% top",
        end: "80% top",
        onEnter: () => {
          if (!gameImgSecRef.current) return;
          gsap.set(gameImgSecRef.current, { display: "flex" });
        },
        onLeaveBack: () => {
          if (!gameImgSecRef.current) return;
          gsap.set(gameImgSecRef.current, { display: "none" });
        },
      });

      // 3. Gamepad icon animation sequence
      const gamepadTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "25% top",
          end: "70% top",
          scrub: 1,
        },
      });

      // Gamepad comes up from bottom and stops in center
      gamepadTl
        .fromTo(
          gamepadIconRef.current,
          {
            y: "100vh",
            scale: 0.5,
            rotation: 0,
          },
          {
            y: "0vh",
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        )
        // Tilt animation
        .to(gamepadIconRef.current, {
          rotation: 15,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(gamepadIconRef.current, {
          rotation: -10,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(gamepadIconRef.current, {
          rotation: 0,
          duration: 0.2,
          ease: "power2.inOut",
        });

      // 4. Show hero-con section after gamepad settles
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "45% top",
        end: "75% top",
        onEnter: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "flex" });
          gsap.fromTo(
            heroConRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        },
        onLeaveBack: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "none" });
        },
      });

      // 5. Hide hero-con section after gamepad animation completes
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "75% top",
        onEnter: () => {
          if (!heroConRef.current) return;
          gsap.to(heroConRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (heroConRef.current) {
                gsap.set(heroConRef.current, { display: "none" });
              }
            },
          });
        },
        onLeaveBack: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "flex", opacity: 1 });
        },
      });

      // 6. Scale gamepad to fullscreen
      const fullscreenTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "70% top",
          end: "90% top",
          scrub: 1,
        },
      });

      fullscreenTl.to(gamepadIconRef.current, {
        scale: 4,
        ease: "power2.inOut",
      });

      // 7. Hide game section and show video with all sections
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "85% top",
        onEnter: () => {
          console.log(
            "ScrollTrigger activated - hiding game section, showing video and sections"
          );

          // Create a master timeline for smooth sequential animations
          const masterTimeline = gsap.timeline();

          //  // Show the video
          if (introVideoRef.current) {
            gsap.to(introVideoRef.current, {
              opacity: 1,
              display: "flex",
              // duration: 0.5,
            });
            if (introVideoRef.current) {
              const video = introVideoRef.current.querySelector(
                "video"
              ) as HTMLVideoElement;
              if (video) {
                console.log(":Innnn 209");
                // video.currentTime = 0;
                // video
                //   .play()
                //   .catch((err) => console.log("Video failed to play:", err));
              }
            }
          }

          // Step 1: Hide game section and playroll content simultaneously
          masterTimeline.to(
            [
              gameImgSecRef.current,
              playrollContentRef.current,
              mainRef.current,
            ],
            {
              opacity: 0,
              duration: 0.1,
              ease: "power2.out",
              onComplete: () => {
                // Hide elements after fade
                if (gameImgSecRef.current)
                  gsap.set(gameImgSecRef.current, {
                    visibility: "hidden",
                    opacity: 0,
                  });
                if (playrollContentRef.current)
                  gsap.set(playrollContentRef.current, {
                    visibility: "hidden",
                    opacity: 0,
                  });
                if (mainRef.current)
                  gsap.set(mainRef.current, {
                    visibility: "hidden",
                    opacity: 0,
                    height: 0,
                  });
              },
            }
          );

          // Step 2: Show intro video immediately after hiding
          // .call(() => {
          //   console.log("Setting up intro video and container");

          //   // Make sure the main container is visible
          //   if (dNoneMainRef.current) {
          //     console.log("Innnnn 215")
          //     dNoneMainRef.current.style.display = "block";
          //     dNoneMainRef.current.style.opacity = "1";
          //     dNoneMainRef.current.style.visibility = "visible";
          //   }
          //      console.log("Innnnn 222")
          //   if (introVideoRef.current) {
          //     console.log("Innnnn 222")
          //     introVideoRef.current.style.display = "flex";
          //     introVideoRef.current.style.opacity = "1";
          //     introVideoRef.current.style.visibility = "visible";
          //     console.log("Video container set to display: flex");

          //     // Start video playback with multiple attempts
          //     const video = introVideoRef.current.querySelector('video') as HTMLVideoElement;
          //     if (video) {
          //       console.log("Attempting to play video...");

          //       // Reset video to beginning
          //       video.currentTime = 0;

          //       // Ensure video is loaded
          //       video.load();

          //       // Multiple play attempts
          //       const playVideo = async () => {
          //         try {
          //           // First attempt: direct play
          //           await video.play();
          //           console.log("Video started playing successfully");
          //         } catch (error) {
          //           console.log("First play attempt failed:", error);

          //           // Second attempt: after a short delay
          //           setTimeout(async () => {
          //             try {
          //               await video.play();
          //               console.log("Video started playing on second attempt");
          //             } catch (secondError) {
          //               console.log("Second play attempt failed:", secondError);

          //               // Third attempt: user interaction fallback
          //               const playOnInteraction = () => {
          //                 video.play().then(() => {
          //                   console.log("Video started playing after user interaction");
          //                   document.removeEventListener('click', playOnInteraction);
          //                   document.removeEventListener('touchstart', playOnInteraction);
          //                 }).catch(e => console.log("Play after interaction failed:", e));
          //               };

          //               document.addEventListener('click', playOnInteraction);
          //               document.addEventListener('touchstart', playOnInteraction);

          //               console.log("Video will play after user interaction");
          //             }
          //           }, 500);
          //         }
          //       };

          //       playVideo();
          //     }
          //   }
          // })

          // Step 3: Show all sections simultaneously
          // .call(() => {
          //   console.log("Showing all sections");
          //   if (dNoneMainRef.current) {
          //     const dNoneSections = dNoneMainRef.current.querySelectorAll('.d-none-main');
          //     console.log("Found sections to show:", dNoneSections.length);

          //     // Show all sections immediately with direct DOM manipulation
          //     dNoneSections.forEach((section, index) => {
          //       console.log(`Showing section ${index + 1}:`, section.className);
          //       const element = section as HTMLElement;
          //       element.style.display = "block";
          //       element.style.opacity = "1";
          //       element.style.visibility = "visible";
          //       element.style.transform = "none";
          //       console.log(`Section ${index + 1} display set to:`, element.style.display);
          //     });
          //   }
          // });
        },

        onLeaveBack: () => {
          console.log(
            "Reversing: showing game section, hiding video and sections"
          );

          if (dNoneMainRef.current) {
            gsap.set(dNoneMainRef, { visibility: "hidden", opacity: 0 });
          }

          // Commented out to keep main-components hidden
          // if (mainRef.current)
          //   gsap.set(mainRef.current, {
          //     display: "block",
          //     opacity: 1,
          //     visibility: "visible",
          //   });

          // Show game section and playroll content
          // Commented out to keep main-components hidden
          // if (gameImgSecRef.current && playrollContentRef.current) {
          //   gsap.set(gameImgSecRef.current, {
          //     display: "flex",
          //     opacity: 1,
          //     visibility: "visible",
          //   });
          //   gsap.set(playrollContentRef.current, {
          //     display: "block",
          //     opacity: 1,
          //     visibility: "visible",
          //   });
          // }

          // // Hide video
          // if (introVideoRef.current) {
          //   introVideoRef.current.style.display = "none";
          //   introVideoRef.current.style.opacity = "0";
          //   const video = introVideoRef.current.querySelector('video');
          //   if (video) video.pause();
          // }

          // Hide all sections
        },
      });

      // Scroll instruction fade out (existing)
      const scrollInstruction = document.getElementById("scrollInstruction");
      if (scrollInstruction) {
        gsap.to(scrollInstruction, {
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top+=50 top",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Right line pin (existing)
      const rightLine = document.querySelector(".rightline-main");
      if (rightLine) {
        gsap.to(rightLine, {
          scrollTrigger: {
            trigger: rightLine,
            start: "top bottom",
            end: "+=500",
            pin: true,
            pinSpacing: false,
          },
        });
      }
      // // Hero Text Section Animation - Stay at bottom and hide after animations
      // const heroTextSec = document.querySelector(".hero-text-sec");
      // if (heroTextSec) {
      //   // Initially hide
      //   gsap.set(heroTextSec, { opacity: 0 });

      //   // Show at bottom and keep pinned during animations
      //   ScrollTrigger.create({
      //     trigger: mainRef.current,
      //     start: "top top",
      //     end: "60% top", // Keep visible until all 5 animations complete
      //     onEnter: () => {
      //       // Fade in the section
      //       gsap.to(heroTextSec, {
      //         opacity: 1,
      //         duration: 0.8,
      //         ease: "power2.out",
      //       });
      //     },
      //     onLeave: () => {
      //       // Hide after all animations complete
      //       gsap.to(heroTextSec, {
      //         opacity: 0,
      //         duration: 0.5,
      //         ease: "power2.in",
      //       });
      //     },
      //     onEnterBack: () => {
      //       // Show again when scrolling back
      //       gsap.to(heroTextSec, {
      //         opacity: 1,
      //         duration: 0.5,
      //         ease: "power2.out",
      //       });
      //     },
      //     onLeaveBack: () => {
      //       // Hide when scrolling back past start
      //       gsap.to(heroTextSec, {
      //         opacity: 0,
      //         duration: 0.5,
      //       });
      //     },
      //   });
      // }

      // // Animate each progress item with line width and text animations
      // for (let i = 1; i <= 5; i++) {
      //   const progItem = document.querySelector(`.sc-2-prog_item-${i}`);
      //   const lineTop = progItem?.querySelector(".sc-2-line_top-2");
      //   const progText = progItem?.querySelector(".sc-2-prog_text");
      //   const wrapper = document.querySelector(`.sc-2-h_wrapper${i === 1 ? '' : '-' + i}`);

      //   if (progItem && lineTop && progText && wrapper) {
      //     // Initially set line width to 0 and hide wrapper (no y transform)
      //     gsap.set(lineTop, { width: "0%" });
      //     gsap.set(wrapper, { opacity: 0 });

      //     // Calculate scroll positions for each item
      //     const startPercent = 10 + (i - 1) * 10; // 10%, 20%, 30%, 40%, 50%
      //     const endPercent = startPercent + 10;

      //     // Animate line width
      //     gsap.to(lineTop, {
      //       width: "100%",
      //       scrollTrigger: {
      //         trigger: mainRef.current,
      //         start: `${startPercent}% top`,
      //         end: `${endPercent}% top`,
      //         scrub: 1,
      //         onUpdate: (self) => {
      //           // Update text opacity based on line progress
      //           if (progText) {
      //             const newOpacity = 0.5 + (self.progress * 0.5);
      //             gsap.set(progText, { opacity: newOpacity });
      //           }
      //         },
      //       },
      //     });

      //     // Show wrapper text when line starts growing (only fade, no movement)
      //     ScrollTrigger.create({
      //       trigger: mainRef.current,
      //       start: `${startPercent}% top`,
      //       onEnter: () => {
      //         // Hide previous wrapper if exists
      //         if (i > 1) {
      //           const prevWrapper = document.querySelector(`.sc-2-h_wrapper${i === 2 ? '' : '-' + (i - 1)}`);
      //           if (prevWrapper) {
      //             gsap.to(prevWrapper, {
      //               opacity: 0,
      //               duration: 0.3,
      //             });
      //           }
      //         }
      //         // Show current wrapper
      //         gsap.to(wrapper, {
      //           opacity: 1,
      //           duration: 0.5,
      //           ease: "power2.out",
      //         });
      //       },
      //       onLeaveBack: () => {
      //         // Hide current wrapper
      //         gsap.to(wrapper, {
      //           opacity: 0,
      //           duration: 0.3,
      //         });
      //         // Show previous wrapper if exists
      //         if (i > 1) {
      //           const prevWrapper = document.querySelector(`.sc-2-h_wrapper${i === 2 ? '' : '-' + (i - 1)}`);
      //           if (prevWrapper) {
      //             gsap.to(prevWrapper, {
      //               opacity: 1,
      //               duration: 0.5,
      //             });
      //           }
      //         }
      //       },
      //     });
      //   }
      // }

      // Video text transitions on scroll
      const videoTitleRefs = [
        videoTitleOneRef,
        videoTitleTwoRef,
        videoTitleThreeRef,
        videoTitleFourRef,
        videoTitleFiveRef,
      ];

      const videoSubTitleRefs = [
        videoSubTitleOneRef,
        videoSubTitleTwoRef,
        videoSubTitleThreeRef,
        videoSubTitleFourRef,
        videoSubTitleFiveRef,
      ];

      // Set initial states for all video titles and subtitles
      if (videoTitleOneRef.current) {
        gsap.set(videoTitleOneRef.current, { display: "block", opacity: 1 });
      }
      if (videoSubTitleOneRef.current) {
        gsap.set(videoSubTitleOneRef.current, { display: "flex", opacity: 1 });
      }
      if (videoTitleTwoRef.current) {
        gsap.set(videoTitleTwoRef.current, { display: "none", opacity: 0 });
      }
      if (videoSubTitleTwoRef.current) {
        gsap.set(videoSubTitleTwoRef.current, { display: "none", opacity: 0 });
      }
      if (videoTitleThreeRef.current) {
        gsap.set(videoTitleThreeRef.current, { display: "none", opacity: 0 });
      }
      if (videoSubTitleThreeRef.current) {
        gsap.set(videoSubTitleThreeRef.current, {
          display: "none",
          opacity: 0,
        });
      }
      if (videoTitleFourRef.current) {
        gsap.set(videoTitleFourRef.current, { display: "none", opacity: 0 });
      }
      if (videoSubTitleFourRef.current) {
        gsap.set(videoSubTitleFourRef.current, { display: "none", opacity: 0 });
      }
      if (videoTitleFiveRef.current) {
        gsap.set(videoTitleFiveRef.current, { display: "none", opacity: 0 });
      }
      if (videoSubTitleFiveRef.current) {
        gsap.set(videoSubTitleFiveRef.current, { display: "none", opacity: 0 });
      }
      if (stepProgressRef.current) {
        gsap.set(stepProgressRef.current, { width: "0%" });
      }
      if (videoTextSecRef.current) {
        gsap.set(videoTextSecRef.current, { opacity: 0, visibility: "hidden" });
      }
      // Pause video so it can be controlled by scroll and ensure metadata is loaded
      if (renderjoyVideoRef.current) {
        const video = renderjoyVideoRef.current;
        video.pause();

        if (video.readyState < 1) {
          video.load();
        }
      }

      // Get actual video duration
      const getVideoDuration = () => {
        if (
          renderjoyVideoRef.current &&
          renderjoyVideoRef.current.duration &&
          !isNaN(renderjoyVideoRef.current.duration)
        ) {
          return renderjoyVideoRef.current.duration;
        }
        return 20; // Fallback duration
      };

      const videoDuration = getVideoDuration();
      console.log("Video Duration:", videoDuration);

      // Define video timestamps for each text transition (in seconds)
      // Distribute text changes evenly across video duration
      const videoTimestamps = {
        text1: 0, // Start - Text 1 visible
        text2: 4, // At 4s - Text 2 appears
        text3: 8, // At 8s - Text 3 appears
        text4: 12, // At 12s - Text 4 appears
        text5: 16, // At 16s - Text 5 appears
        end: 20, // Assumed video duration (adjust if needed)
      };

      console.log("Video Timestamps:", videoTimestamps);
      console.log("Intro Video Ref:", introVideoRef.current);
      console.log("Renderjoy Video Ref:", renderjoyVideoRef.current);

      // Create timeline for text transitions with scrub
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: introVideoRef.current,
          start: "top top",
          end: "+=1200vh",
          pin: true,
          scrub: 3,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Scrub video based on scroll progress
            if (renderjoyVideoRef.current) {
              const video = renderjoyVideoRef.current;
              if (video.duration) {
                video.currentTime = self.progress * video.duration;
              }
            }
          },
        },
      });

      // Calculate timeline positions based on video timestamps
      const getTimelinePosition = (timestamp: number) => {
        return timestamp / videoTimestamps.end;
      };

      // Show video-text-sec at the start
      textTimeline.to(
        videoTextSecRef.current,
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.1,
        },
        0
      );

      // Initial progress bar
      const pos1 = getTimelinePosition(videoTimestamps.text1);
      textTimeline.to(
        stepProgressRef.current,
        { width: "20%", duration: 0.1 },
        pos1 + 0.05
      );

      // Text 1 → Text 2 (at 3s / 20% of video)
      const pos2 = getTimelinePosition(videoTimestamps.text2);
      textTimeline
        .to(
          videoTitleRefs[0]?.current,
          { opacity: 0, duration: 0.02 },
          pos2 - 0.02
        )
        .to(
          videoSubTitleRefs[0]?.current,
          { opacity: 0, duration: 0.02 },
          pos2 - 0.02
        )
        .set(videoTitleRefs[0]?.current, { display: "none" }, pos2)
        .set(videoSubTitleRefs[0]?.current, { display: "none" }, pos2)
        .set(videoTitleRefs[1]?.current, { display: "block" }, pos2)
        .set(videoSubTitleRefs[1]?.current, { display: "flex" }, pos2)
        .to(videoTitleRefs[1]?.current, { opacity: 1, duration: 0.02 }, pos2)
        .to(videoSubTitleRefs[1]?.current, { opacity: 1, duration: 0.02 }, pos2)
        .to(stepProgressRef.current, { width: "40%", duration: 0.05 }, pos2);

      // Text 2 → Text 3 (at 6s / 40% of video)
      const pos3 = getTimelinePosition(videoTimestamps.text3);
      textTimeline
        .to(
          videoTitleRefs[1]?.current,
          { opacity: 0, duration: 0.02 },
          pos3 - 0.02
        )
        .to(
          videoSubTitleRefs[1]?.current,
          { opacity: 0, duration: 0.02 },
          pos3 - 0.02
        )
        .set(videoTitleRefs[1]?.current, { display: "none" }, pos3)
        .set(videoSubTitleRefs[1]?.current, { display: "none" }, pos3)
        .set(videoTitleRefs[2]?.current, { display: "block" }, pos3)
        .set(videoSubTitleRefs[2]?.current, { display: "flex" }, pos3)
        .to(videoTitleRefs[2]?.current, { opacity: 1, duration: 0.02 }, pos3)
        .to(videoSubTitleRefs[2]?.current, { opacity: 1, duration: 0.02 }, pos3)
        .to(stepProgressRef.current, { width: "60%", duration: 0.05 }, pos3);

      // Text 3 → Text 4 (at 9s / 60% of video)
      const pos4 = getTimelinePosition(videoTimestamps.text4);
      textTimeline
        .to(
          videoTitleRefs[2]?.current,
          { opacity: 0, duration: 0.02 },
          pos4 - 0.02
        )
        .to(
          videoSubTitleRefs[2]?.current,
          { opacity: 0, duration: 0.02 },
          pos4 - 0.02
        )
        .set(videoTitleRefs[2]?.current, { display: "none" }, pos4)
        .set(videoSubTitleRefs[2]?.current, { display: "none" }, pos4)
        .set(videoTitleRefs[3]?.current, { display: "block" }, pos4)
        .set(videoSubTitleRefs[3]?.current, { display: "flex" }, pos4)
        .to(videoTitleRefs[3]?.current, { opacity: 1, duration: 0.02 }, pos4)
        .to(videoSubTitleRefs[3]?.current, { opacity: 1, duration: 0.02 }, pos4)
        .to(stepProgressRef.current, { width: "80%", duration: 0.05 }, pos4);

      // Text 4 → Text 5 (at 12s / 80% of video)
      const pos5 = getTimelinePosition(videoTimestamps.text5);
      textTimeline
        .to(
          videoTitleRefs[3]?.current,
          { opacity: 0, duration: 0.02 },
          pos5 - 0.02
        )
        .to(
          videoSubTitleRefs[3]?.current,
          { opacity: 0, duration: 0.02 },
          pos5 - 0.02
        )
        .set(videoTitleRefs[3]?.current, { display: "none" }, pos5)
        .set(videoSubTitleRefs[3]?.current, { display: "none" }, pos5)
        .set(videoTitleRefs[4]?.current, { display: "block" }, pos5)
        .set(videoSubTitleRefs[4]?.current, { display: "flex" }, pos5)
        .to(videoTitleRefs[4]?.current, { opacity: 1, duration: 0.02 }, pos5)
        .to(videoSubTitleRefs[4]?.current, { opacity: 1, duration: 0.02 }, pos5)
        .to(stepProgressRef.current, { width: "100%", duration: 0.05 }, pos5);

      // Hide video-text-sec after last text animation completes (at 95% of timeline)
      textTimeline.to(
        videoTextSecRef.current,
        {
          opacity: 0,
          visibility: "hidden",
          duration: 0.1,
        },
        0.95
      );

      console.log("Text Timeline created:", textTimeline);
      console.log("ScrollTrigger instance:", textTimeline.scrollTrigger);

      // Refresh ScrollTrigger after setup
      // ScrollTrigger.refresh();
    }, mainRef);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Separate useEffect for down arrow bounce animation
  useEffect(() => {
    if (!downArrowRef.current) return;

    const animation = gsap.to(downArrowRef.current, {
      y: 15,
      duration: 0.8,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  const [heroData, setHeroData] = useState<HeroData | null>(null);
  // const [loading, setLoading] = useState(true);
  const [productLiveData, setProductLiveData] =
    useState<ProductLiveData | null>(null);
  // const [loadingProduct, setLoadingProduct] = useState(true);

  const getHeroTitle = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/hero-section`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HeroData[] = await response.json();
      console.log("API Response:", data);

      if (Array.isArray(data) && data.length > 0) {
        setHeroData(data[0]); // ✅ store a single object
      }
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      // setLoading(false);
    }
  };

  const getProductLiveStatus = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/product-live`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ProductLiveData = await response.json();
      console.log("API Response:", data);
      setProductLiveData(data);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      // setLoadingProduct(false);
    }
  };

  useEffect(() => {
    getProductLiveStatus();
    getHeroTitle();
  }, []);

  return (
    <>
      {/* <Image
        className="right-line"
        src={Svg.RightArrowLine}
      
        alt="rightline"
      /> */}
      <div className="header-main pre-book-header" ref={headerRef}>
        <div className="logo-sec">
          <Image
            className="header-logo"
            src={Svg.logo}
            width={62}
            height={48}
            alt="JOY Shape"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <button className="main-btn pre_order_click" onClick={handlePreOrderClick}>
          PRE ORDER NOW
        </button>
      </div>
      <div
        className="main-components"
        ref={mainRef}
        style={{ display: "none" }}
      >
        {/* <h1 ref={textAnimOneRef} className="hero-left-title-one text-left  text-anim-one">Discover on-chain games built for the future <br /> <span>Web3-Ready</span> </h1>
        <h1 ref={textAnimTwoRef} className="hero-left-title-one  text-anim-two">Play your favourite Steam & Epic titles <br /> <span>Multi-Library Gaming</span></h1>
        <h1 ref={textAnimThreeRef} className="hero-left-title-one text-left  text-anim-three">One click social logins <br /> <span>Seamless onboarding</span> </h1>
        <h1 ref={textAnimFourRef} className="hero-left-title-one  text-anim-four">Level up, unlock perks, and showcase your achievements. <br /> <span>Engage & Earn</span></h1>
        <h1 ref={textAnimFiveRef} className="hero-left-title-one text-left  text-anim-five">A built-in hardware wallet that keeps assets safe. <br /> <span>Secure by Design</span></h1> */}
        {/* <h1 ref={textAnimOneBottomRef} className="hero-left-title-one text-left text-bottom text-anim-one">Web3-Ready</h1>
        <h1 ref={textAnimTwoBottomRef} className="hero-left-title-one text-bottom text-anim-two">Multi-Library Gaming</h1>
        <h1 ref={textAnimThreeBottomRef} className="hero-left-title-one text-left text-bottom text-anim-three">Seamless onboarding</h1>
        <h1 ref={textAnimFourBottomRef} className="hero-left-title-one text-bottom text-anim-four">Engage & Earn</h1>
        <h1 ref={textAnimFiveBottomRef} className="hero-left-title-one text-left text-bottom text-anim-five">Secure by Design</h1> */}

        {/* <div className="hero-text-sec">
          <div className="sc-2-h_mask">
            <div className="sc-2-h_wrapper">
              <div className="sc-2-heading">
                Discover on-chain games <br /> built for the future
              </div>
            </div>
            <div className="sc-2-h_wrapper-2">
              <div className="sc-2-heading">
                Play your favourite <br /> Steam & Epic titles
              </div>
            </div>
            <div className="sc-2-h_wrapper-3">
              <div className="sc-2-heading">
                One click social <br /> logins
              </div>
            </div>
            <div className="sc-2-h_wrapper-4">
              <div className="sc-2-heading">
                Level up, unlock perks, and <br /> showcase your achievements.
              </div>
            </div>
            <div className="sc-2-h_wrapper-5">
              <div className="sc-2-heading">
                A built-in hardware wallet <br /> that keeps assets safe.
              </div>
            </div>
          </div>
          <div className="sc-2-progress_wrapper">
            <div className="sc-2-prog_item-1">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
                Web3-Ready
              </div>
            </div>
            <div className="sc-2-prog_item-2">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
                Multi-Library <br /> Gaming
              </div>
            </div>
            <div className="sc-2-prog_item-3">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
                Seamless <br /> onboarding
              </div>
            </div>
            <div className="sc-2-prog_item-4">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
                Engage & Earn
              </div>
            </div>
            <div className="sc-2-prog_item-5">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
                Secure by <br /> Design
              </div>
            </div>
          </div>
        </div> */}
        {/* Game image section */}
        <div className="game-img-sec-main" ref={gameImgSecRef}>
          <div className="game-img-sec-inner">
            <div className="canva-sec">
              <Image
                ref={gamepadIconRef}
                src={Png.PreBookGamePad}
                width={1209.21}
                height={680.18}
                className="gamepad-icon"
                alt="gamepad"
              />
            </div>
          </div>
        </div>

        {/* Preroll content that will be hidden */}
        <div id="preroll" ref={playrollContentRef}>
          <div className="playroll-content">
            <div id="joy" className="joy-main">
              <Image
                ref={joyLogoRef}
                id="joy-logo"
                className="joy-logo"
                src={Png.joylogo}
                alt="JOY Shape"
              />
            </div>
          </div>
          <div id="scrollInstruction" className="scrollInstruction">
            <Image
              ref={downArrowRef}
              className="downarrow"
              src={Png.DownArrow}
              alt="downarrow"
            />
            <div className="scroll-text">Scroll</div>
          </div>
          <div className="hero-con" ref={heroConRef}>
            <h1 className="web-3-text">{heroData?.title1 || ""}</h1>
            <p className="common-text">{heroData?.title2 || ""}</p>
          </div>
        </div>
      </div>

      {/* Spacer div to create proper document height for scroll */}
      {/* <div style={{ height: '100vh', pointerEvents: 'none' }}></div> */}

      {/* Video and all sections below */}
      <div
        className="after-preroll-main bg-presale pre-book-preroll"
        ref={dNoneMainRef}
      >
        <div className="intro-video" ref={introVideoRef}>
          <video
            // ref={renderjoyVideoRef}
            src="/renderjoy.mp4"
            muted
                     controls={false}
            autoPlay
            loop
            playsInline
            preload="auto"
            className="renderjoy-video"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            webkit-playsinline
          >
            Your browser does not support the video tag.
          </video>
          <div className="video-text-sec" ref={videoTextSecRef}>
            <div className="video-title-sec">
              <h3
                ref={videoTitleOneRef}
                className="video-title-text videoTitleOne"
              >
                Discover on-chain games <br /> built for the future
              </h3>
              <h3
                ref={videoTitleTwoRef}
                className="video-title-text videoTitleTwo"
              >
                Play your favourite <br /> Steam & Epic titles
              </h3>
              <h3
                ref={videoTitleThreeRef}
                className="video-title-text videoTitleThree"
              >
                One click social logins
              </h3>
              <h3
                ref={videoTitleFourRef}
                className="video-title-text videoTitleFour"
              >
                Level up, unlock perks, and <br /> showcase your achievements
              </h3>
              <h3
                ref={videoTitleFiveRef}
                className="video-title-text videoTitleFive"
              >
                A built-in hardware wallet <br /> that keeps assets safe
              </h3>
            </div>
            <div className="step-progress-sec" ref={stepProgressRef}></div>
            <div className="video-sub-title-sec">
              <p
                ref={videoSubTitleOneRef}
                className="video-title-sub-text videoSubTitleOne"
              >
                <svg
                  width="52"
                  height="41"
                  viewBox="0 0 52 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.5443 23.7926C36.2295 23.7926 36.7849 24.348 36.7849 25.0332V27.5146C36.7849 28.1998 36.2295 28.7552 35.5443 28.7552C34.8591 28.7552 34.3036 28.1998 34.3036 27.5146V25.0332C34.3036 24.348 34.8591 23.7926 35.5443 23.7926Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.8231 33.5694C49.0713 33.4774 49.3424 33.4262 49.6238 33.4262H49.6289C50.9233 33.4262 51.9721 34.475 51.9721 35.7694C51.9721 37.0638 50.9233 38.1126 49.6289 38.1126C49.0892 38.1126 48.5929 37.9284 48.1964 37.6214C47.5646 38.7572 46.5823 39.6781 45.403 39.9953C42.4126 40.796 24.9692 40.5785 24.9692 40.5785C23.2911 40.5785 21.7435 40.0106 20.5054 39.0539C18.8427 39.0181 17.162 38.4042 15.709 37.1149C14.771 36.3291 14.0946 35.3147 13.4288 34.3161L13.3454 34.191C12.977 33.6436 12.5549 33.1295 12.0561 32.6946C10.6364 31.4565 8.88157 30.8707 7.12674 30.8784C7.1137 30.8392 7.10148 30.7993 7.08915 30.759C7.07975 30.7283 7.07017 30.697 7.06023 30.666C7.00395 30.4742 7.00651 30.3054 7.05767 30.1084C7.13185 29.827 7.24441 29.561 7.3851 29.3077C8.50553 29.2105 9.65922 29.3282 10.7848 29.6914C12.2582 30.1468 13.6242 30.996 14.7139 32.1292C14.9467 32.3797 15.1763 32.6545 15.4043 32.9274C15.6374 33.2065 15.8689 33.4836 16.1004 33.7306C16.6146 34.2601 17.2183 34.7257 17.8655 35.1145C17.6915 34.4775 17.5969 33.8073 17.5969 33.1141V29.3179C10.309 28.4405 4.66076 22.2347 4.66076 14.7114C4.66076 6.58701 11.2478 0 19.3722 0C26.9696 0 33.2241 5.76075 34.0017 13.1535C38.5814 14.7772 41.7815 17.5953 44.0171 20.7718C43.0763 21.1644 42.4152 22.093 42.4152 23.1761C42.4152 24.6143 43.5811 25.7802 45.0193 25.7802C45.582 25.7802 46.103 25.6017 46.5288 25.2983C47.8133 28.2752 48.4792 31.2315 48.8231 33.5694ZM17.8246 5.04194C13.852 5.45635 10.6825 8.46976 9.9279 12.2634H12.729C13.6806 12.2634 14.4531 13.0359 14.4531 13.9875V21.9303C15.8856 22.713 17.5484 23.1198 19.2981 23.0174L19.8046 22.007C21.5875 18.459 24.3554 15.5019 27.7755 13.4887C27.4788 8.3751 22.9766 4.50475 17.8246 5.0445V5.04194ZM39.5502 26.5604C39.5502 30.5868 36.2862 33.8508 32.2598 33.8508C28.2333 33.8508 24.9693 30.5868 24.9693 26.5604C24.9693 22.5339 28.2333 19.2699 32.2598 19.2699C36.2862 19.2699 39.5502 22.5339 39.5502 26.5604Z"
                    fill="white"
                  />
                  <path
                    d="M45.8494 24.0355C45.8811 24.0355 45.9123 24.0334 45.9428 24.0294C46.2936 23.9836 46.5644 23.6831 46.5644 23.3192V22.1323C46.5644 21.7367 46.2443 21.416 45.8494 21.416C45.4546 21.416 45.1345 21.7367 45.1345 22.1323V23.3192C45.1345 23.7148 45.4546 24.0355 45.8494 24.0355Z"
                    fill="white"
                  />
                  <path
                    d="M36.7875 13.2165C38.5101 13.9897 41.0445 15.4598 42.9089 17.9678C42.9089 17.9678 46.1014 14.9621 45.5386 10.4164C45.0423 6.38749 42.185 3.06969 38.2481 2.08483C36.3662 1.6118 32.5235 1.82325 30.1774 3.38433C30.2141 3.41426 31.9776 4.8619 33.3424 7.44396H35.0634C36.015 7.44396 36.7875 8.2165 36.7875 9.1681V13.2165Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4L6.63314 29.3998V29.3973L6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4C6.20263 29.4742 5.7835 29.5816 5.37458 29.7196C5.37458 29.7247 5.37202 29.7298 5.36946 29.7324C5.36435 29.7477 5.35856 29.7632 5.35281 29.7785C5.34706 29.7938 5.34131 29.8092 5.33621 29.8245C5.31318 29.8987 5.29272 29.9728 5.27737 30.047C5.24412 30.198 5.23644 30.2798 5.23389 30.4512C5.23389 30.5279 5.23389 30.6047 5.24156 30.6814C5.24156 30.6836 5.24244 30.6923 5.24346 30.7025C5.24492 30.7169 5.24667 30.7343 5.24667 30.7403C5.25179 30.7786 5.25946 30.8196 5.26714 30.8579C5.28249 30.9321 5.30039 31.0089 5.32342 31.0805C5.32342 31.0831 5.32341 31.0856 5.32597 31.0882C5.70457 30.9986 6.08828 30.9347 6.47454 30.9014C6.45152 30.8375 6.43106 30.771 6.41571 30.707C6.35687 30.4486 6.37989 30.1903 6.4464 29.9345C6.49221 29.7513 6.55827 29.5756 6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M4.65513 29.9935C4.58152 30.4173 4.60471 30.846 4.72723 31.2621C4.46886 31.3465 4.2105 31.4437 3.95981 31.5563C3.81912 31.2007 3.78586 30.7965 3.82935 30.4052C4.0978 30.2543 4.37135 30.1163 4.65513 29.9935Z"
                    fill="white"
                  />
                  <path
                    d="M0.00255662 34.8766C0.00255662 34.8766 0.00255742 34.9636 0.0792995 34.9994C0.127903 35.0225 0.186739 34.9994 0.212319 34.9559C1.0002 33.5695 2.12063 32.5207 3.39711 31.8326C3.26153 31.5102 3.19246 31.1623 3.17967 30.8093C1.7625 31.7788 0.626725 33.1704 0 34.8792L0.00255662 34.8766Z"
                    fill="white"
                  />
                </svg>
                Web3-Ready
              </p>
              <p
                ref={videoSubTitleTwoRef}
                className="video-title-sub-text videoSubTitleTwo"
              >
                <svg
                  width="52"
                  height="41"
                  viewBox="0 0 52 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.5443 23.7926C36.2295 23.7926 36.7849 24.348 36.7849 25.0332V27.5146C36.7849 28.1998 36.2295 28.7552 35.5443 28.7552C34.8591 28.7552 34.3036 28.1998 34.3036 27.5146V25.0332C34.3036 24.348 34.8591 23.7926 35.5443 23.7926Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.8231 33.5694C49.0713 33.4774 49.3424 33.4262 49.6238 33.4262H49.6289C50.9233 33.4262 51.9721 34.475 51.9721 35.7694C51.9721 37.0638 50.9233 38.1126 49.6289 38.1126C49.0892 38.1126 48.5929 37.9284 48.1964 37.6214C47.5646 38.7572 46.5823 39.6781 45.403 39.9953C42.4126 40.796 24.9692 40.5785 24.9692 40.5785C23.2911 40.5785 21.7435 40.0106 20.5054 39.0539C18.8427 39.0181 17.162 38.4042 15.709 37.1149C14.771 36.3291 14.0946 35.3147 13.4288 34.3161L13.3454 34.191C12.977 33.6436 12.5549 33.1295 12.0561 32.6946C10.6364 31.4565 8.88157 30.8707 7.12674 30.8784C7.1137 30.8392 7.10148 30.7993 7.08915 30.759C7.07975 30.7283 7.07017 30.697 7.06023 30.666C7.00395 30.4742 7.00651 30.3054 7.05767 30.1084C7.13185 29.827 7.24441 29.561 7.3851 29.3077C8.50553 29.2105 9.65922 29.3282 10.7848 29.6914C12.2582 30.1468 13.6242 30.996 14.7139 32.1292C14.9467 32.3797 15.1763 32.6545 15.4043 32.9274C15.6374 33.2065 15.8689 33.4836 16.1004 33.7306C16.6146 34.2601 17.2183 34.7257 17.8655 35.1145C17.6915 34.4775 17.5969 33.8073 17.5969 33.1141V29.3179C10.309 28.4405 4.66076 22.2347 4.66076 14.7114C4.66076 6.58701 11.2478 0 19.3722 0C26.9696 0 33.2241 5.76075 34.0017 13.1535C38.5814 14.7772 41.7815 17.5953 44.0171 20.7718C43.0763 21.1644 42.4152 22.093 42.4152 23.1761C42.4152 24.6143 43.5811 25.7802 45.0193 25.7802C45.582 25.7802 46.103 25.6017 46.5288 25.2983C47.8133 28.2752 48.4792 31.2315 48.8231 33.5694ZM17.8246 5.04194C13.852 5.45635 10.6825 8.46976 9.9279 12.2634H12.729C13.6806 12.2634 14.4531 13.0359 14.4531 13.9875V21.9303C15.8856 22.713 17.5484 23.1198 19.2981 23.0174L19.8046 22.007C21.5875 18.459 24.3554 15.5019 27.7755 13.4887C27.4788 8.3751 22.9766 4.50475 17.8246 5.0445V5.04194ZM39.5502 26.5604C39.5502 30.5868 36.2862 33.8508 32.2598 33.8508C28.2333 33.8508 24.9693 30.5868 24.9693 26.5604C24.9693 22.5339 28.2333 19.2699 32.2598 19.2699C36.2862 19.2699 39.5502 22.5339 39.5502 26.5604Z"
                    fill="white"
                  />
                  <path
                    d="M45.8494 24.0355C45.8811 24.0355 45.9123 24.0334 45.9428 24.0294C46.2936 23.9836 46.5644 23.6831 46.5644 23.3192V22.1323C46.5644 21.7367 46.2443 21.416 45.8494 21.416C45.4546 21.416 45.1345 21.7367 45.1345 22.1323V23.3192C45.1345 23.7148 45.4546 24.0355 45.8494 24.0355Z"
                    fill="white"
                  />
                  <path
                    d="M36.7875 13.2165C38.5101 13.9897 41.0445 15.4598 42.9089 17.9678C42.9089 17.9678 46.1014 14.9621 45.5386 10.4164C45.0423 6.38749 42.185 3.06969 38.2481 2.08483C36.3662 1.6118 32.5235 1.82325 30.1774 3.38433C30.2141 3.41426 31.9776 4.8619 33.3424 7.44396H35.0634C36.015 7.44396 36.7875 8.2165 36.7875 9.1681V13.2165Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4L6.63314 29.3998V29.3973L6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4C6.20263 29.4742 5.7835 29.5816 5.37458 29.7196C5.37458 29.7247 5.37202 29.7298 5.36946 29.7324C5.36435 29.7477 5.35856 29.7632 5.35281 29.7785C5.34706 29.7938 5.34131 29.8092 5.33621 29.8245C5.31318 29.8987 5.29272 29.9728 5.27737 30.047C5.24412 30.198 5.23644 30.2798 5.23389 30.4512C5.23389 30.5279 5.23389 30.6047 5.24156 30.6814C5.24156 30.6836 5.24244 30.6923 5.24346 30.7025C5.24492 30.7169 5.24667 30.7343 5.24667 30.7403C5.25179 30.7786 5.25946 30.8196 5.26714 30.8579C5.28249 30.9321 5.30039 31.0089 5.32342 31.0805C5.32342 31.0831 5.32341 31.0856 5.32597 31.0882C5.70457 30.9986 6.08828 30.9347 6.47454 30.9014C6.45152 30.8375 6.43106 30.771 6.41571 30.707C6.35687 30.4486 6.37989 30.1903 6.4464 29.9345C6.49221 29.7513 6.55827 29.5756 6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M4.65513 29.9935C4.58152 30.4173 4.60471 30.846 4.72723 31.2621C4.46886 31.3465 4.2105 31.4437 3.95981 31.5563C3.81912 31.2007 3.78586 30.7965 3.82935 30.4052C4.0978 30.2543 4.37135 30.1163 4.65513 29.9935Z"
                    fill="white"
                  />
                  <path
                    d="M0.00255662 34.8766C0.00255662 34.8766 0.00255742 34.9636 0.0792995 34.9994C0.127903 35.0225 0.186739 34.9994 0.212319 34.9559C1.0002 33.5695 2.12063 32.5207 3.39711 31.8326C3.26153 31.5102 3.19246 31.1623 3.17967 30.8093C1.7625 31.7788 0.626725 33.1704 0 34.8792L0.00255662 34.8766Z"
                    fill="white"
                  />
                </svg>
                Multi-Library Gaming
              </p>
              <p
                ref={videoSubTitleThreeRef}
                className="video-title-sub-text videoSubTitleThree"
              >
                <svg
                  width="52"
                  height="41"
                  viewBox="0 0 52 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.5443 23.7926C36.2295 23.7926 36.7849 24.348 36.7849 25.0332V27.5146C36.7849 28.1998 36.2295 28.7552 35.5443 28.7552C34.8591 28.7552 34.3036 28.1998 34.3036 27.5146V25.0332C34.3036 24.348 34.8591 23.7926 35.5443 23.7926Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.8231 33.5694C49.0713 33.4774 49.3424 33.4262 49.6238 33.4262H49.6289C50.9233 33.4262 51.9721 34.475 51.9721 35.7694C51.9721 37.0638 50.9233 38.1126 49.6289 38.1126C49.0892 38.1126 48.5929 37.9284 48.1964 37.6214C47.5646 38.7572 46.5823 39.6781 45.403 39.9953C42.4126 40.796 24.9692 40.5785 24.9692 40.5785C23.2911 40.5785 21.7435 40.0106 20.5054 39.0539C18.8427 39.0181 17.162 38.4042 15.709 37.1149C14.771 36.3291 14.0946 35.3147 13.4288 34.3161L13.3454 34.191C12.977 33.6436 12.5549 33.1295 12.0561 32.6946C10.6364 31.4565 8.88157 30.8707 7.12674 30.8784C7.1137 30.8392 7.10148 30.7993 7.08915 30.759C7.07975 30.7283 7.07017 30.697 7.06023 30.666C7.00395 30.4742 7.00651 30.3054 7.05767 30.1084C7.13185 29.827 7.24441 29.561 7.3851 29.3077C8.50553 29.2105 9.65922 29.3282 10.7848 29.6914C12.2582 30.1468 13.6242 30.996 14.7139 32.1292C14.9467 32.3797 15.1763 32.6545 15.4043 32.9274C15.6374 33.2065 15.8689 33.4836 16.1004 33.7306C16.6146 34.2601 17.2183 34.7257 17.8655 35.1145C17.6915 34.4775 17.5969 33.8073 17.5969 33.1141V29.3179C10.309 28.4405 4.66076 22.2347 4.66076 14.7114C4.66076 6.58701 11.2478 0 19.3722 0C26.9696 0 33.2241 5.76075 34.0017 13.1535C38.5814 14.7772 41.7815 17.5953 44.0171 20.7718C43.0763 21.1644 42.4152 22.093 42.4152 23.1761C42.4152 24.6143 43.5811 25.7802 45.0193 25.7802C45.582 25.7802 46.103 25.6017 46.5288 25.2983C47.8133 28.2752 48.4792 31.2315 48.8231 33.5694ZM17.8246 5.04194C13.852 5.45635 10.6825 8.46976 9.9279 12.2634H12.729C13.6806 12.2634 14.4531 13.0359 14.4531 13.9875V21.9303C15.8856 22.713 17.5484 23.1198 19.2981 23.0174L19.8046 22.007C21.5875 18.459 24.3554 15.5019 27.7755 13.4887C27.4788 8.3751 22.9766 4.50475 17.8246 5.0445V5.04194ZM39.5502 26.5604C39.5502 30.5868 36.2862 33.8508 32.2598 33.8508C28.2333 33.8508 24.9693 30.5868 24.9693 26.5604C24.9693 22.5339 28.2333 19.2699 32.2598 19.2699C36.2862 19.2699 39.5502 22.5339 39.5502 26.5604Z"
                    fill="white"
                  />
                  <path
                    d="M45.8494 24.0355C45.8811 24.0355 45.9123 24.0334 45.9428 24.0294C46.2936 23.9836 46.5644 23.6831 46.5644 23.3192V22.1323C46.5644 21.7367 46.2443 21.416 45.8494 21.416C45.4546 21.416 45.1345 21.7367 45.1345 22.1323V23.3192C45.1345 23.7148 45.4546 24.0355 45.8494 24.0355Z"
                    fill="white"
                  />
                  <path
                    d="M36.7875 13.2165C38.5101 13.9897 41.0445 15.4598 42.9089 17.9678C42.9089 17.9678 46.1014 14.9621 45.5386 10.4164C45.0423 6.38749 42.185 3.06969 38.2481 2.08483C36.3662 1.6118 32.5235 1.82325 30.1774 3.38433C30.2141 3.41426 31.9776 4.8619 33.3424 7.44396H35.0634C36.015 7.44396 36.7875 8.2165 36.7875 9.1681V13.2165Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4L6.63314 29.3998V29.3973L6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4C6.20263 29.4742 5.7835 29.5816 5.37458 29.7196C5.37458 29.7247 5.37202 29.7298 5.36946 29.7324C5.36435 29.7477 5.35856 29.7632 5.35281 29.7785C5.34706 29.7938 5.34131 29.8092 5.33621 29.8245C5.31318 29.8987 5.29272 29.9728 5.27737 30.047C5.24412 30.198 5.23644 30.2798 5.23389 30.4512C5.23389 30.5279 5.23389 30.6047 5.24156 30.6814C5.24156 30.6836 5.24244 30.6923 5.24346 30.7025C5.24492 30.7169 5.24667 30.7343 5.24667 30.7403C5.25179 30.7786 5.25946 30.8196 5.26714 30.8579C5.28249 30.9321 5.30039 31.0089 5.32342 31.0805C5.32342 31.0831 5.32341 31.0856 5.32597 31.0882C5.70457 30.9986 6.08828 30.9347 6.47454 30.9014C6.45152 30.8375 6.43106 30.771 6.41571 30.707C6.35687 30.4486 6.37989 30.1903 6.4464 29.9345C6.49221 29.7513 6.55827 29.5756 6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M4.65513 29.9935C4.58152 30.4173 4.60471 30.846 4.72723 31.2621C4.46886 31.3465 4.2105 31.4437 3.95981 31.5563C3.81912 31.2007 3.78586 30.7965 3.82935 30.4052C4.0978 30.2543 4.37135 30.1163 4.65513 29.9935Z"
                    fill="white"
                  />
                  <path
                    d="M0.00255662 34.8766C0.00255662 34.8766 0.00255742 34.9636 0.0792995 34.9994C0.127903 35.0225 0.186739 34.9994 0.212319 34.9559C1.0002 33.5695 2.12063 32.5207 3.39711 31.8326C3.26153 31.5102 3.19246 31.1623 3.17967 30.8093C1.7625 31.7788 0.626725 33.1704 0 34.8792L0.00255662 34.8766Z"
                    fill="white"
                  />
                </svg>
                Seamless onboarding
              </p>
              <p
                ref={videoSubTitleFourRef}
                className="video-title-sub-text videoSubTitleFour"
              >
                <svg
                  width="52"
                  height="41"
                  viewBox="0 0 52 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.5443 23.7926C36.2295 23.7926 36.7849 24.348 36.7849 25.0332V27.5146C36.7849 28.1998 36.2295 28.7552 35.5443 28.7552C34.8591 28.7552 34.3036 28.1998 34.3036 27.5146V25.0332C34.3036 24.348 34.8591 23.7926 35.5443 23.7926Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.8231 33.5694C49.0713 33.4774 49.3424 33.4262 49.6238 33.4262H49.6289C50.9233 33.4262 51.9721 34.475 51.9721 35.7694C51.9721 37.0638 50.9233 38.1126 49.6289 38.1126C49.0892 38.1126 48.5929 37.9284 48.1964 37.6214C47.5646 38.7572 46.5823 39.6781 45.403 39.9953C42.4126 40.796 24.9692 40.5785 24.9692 40.5785C23.2911 40.5785 21.7435 40.0106 20.5054 39.0539C18.8427 39.0181 17.162 38.4042 15.709 37.1149C14.771 36.3291 14.0946 35.3147 13.4288 34.3161L13.3454 34.191C12.977 33.6436 12.5549 33.1295 12.0561 32.6946C10.6364 31.4565 8.88157 30.8707 7.12674 30.8784C7.1137 30.8392 7.10148 30.7993 7.08915 30.759C7.07975 30.7283 7.07017 30.697 7.06023 30.666C7.00395 30.4742 7.00651 30.3054 7.05767 30.1084C7.13185 29.827 7.24441 29.561 7.3851 29.3077C8.50553 29.2105 9.65922 29.3282 10.7848 29.6914C12.2582 30.1468 13.6242 30.996 14.7139 32.1292C14.9467 32.3797 15.1763 32.6545 15.4043 32.9274C15.6374 33.2065 15.8689 33.4836 16.1004 33.7306C16.6146 34.2601 17.2183 34.7257 17.8655 35.1145C17.6915 34.4775 17.5969 33.8073 17.5969 33.1141V29.3179C10.309 28.4405 4.66076 22.2347 4.66076 14.7114C4.66076 6.58701 11.2478 0 19.3722 0C26.9696 0 33.2241 5.76075 34.0017 13.1535C38.5814 14.7772 41.7815 17.5953 44.0171 20.7718C43.0763 21.1644 42.4152 22.093 42.4152 23.1761C42.4152 24.6143 43.5811 25.7802 45.0193 25.7802C45.582 25.7802 46.103 25.6017 46.5288 25.2983C47.8133 28.2752 48.4792 31.2315 48.8231 33.5694ZM17.8246 5.04194C13.852 5.45635 10.6825 8.46976 9.9279 12.2634H12.729C13.6806 12.2634 14.4531 13.0359 14.4531 13.9875V21.9303C15.8856 22.713 17.5484 23.1198 19.2981 23.0174L19.8046 22.007C21.5875 18.459 24.3554 15.5019 27.7755 13.4887C27.4788 8.3751 22.9766 4.50475 17.8246 5.0445V5.04194ZM39.5502 26.5604C39.5502 30.5868 36.2862 33.8508 32.2598 33.8508C28.2333 33.8508 24.9693 30.5868 24.9693 26.5604C24.9693 22.5339 28.2333 19.2699 32.2598 19.2699C36.2862 19.2699 39.5502 22.5339 39.5502 26.5604Z"
                    fill="white"
                  />
                  <path
                    d="M45.8494 24.0355C45.8811 24.0355 45.9123 24.0334 45.9428 24.0294C46.2936 23.9836 46.5644 23.6831 46.5644 23.3192V22.1323C46.5644 21.7367 46.2443 21.416 45.8494 21.416C45.4546 21.416 45.1345 21.7367 45.1345 22.1323V23.3192C45.1345 23.7148 45.4546 24.0355 45.8494 24.0355Z"
                    fill="white"
                  />
                  <path
                    d="M36.7875 13.2165C38.5101 13.9897 41.0445 15.4598 42.9089 17.9678C42.9089 17.9678 46.1014 14.9621 45.5386 10.4164C45.0423 6.38749 42.185 3.06969 38.2481 2.08483C36.3662 1.6118 32.5235 1.82325 30.1774 3.38433C30.2141 3.41426 31.9776 4.8619 33.3424 7.44396H35.0634C36.015 7.44396 36.7875 8.2165 36.7875 9.1681V13.2165Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4L6.63314 29.3998V29.3973L6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4C6.20263 29.4742 5.7835 29.5816 5.37458 29.7196C5.37458 29.7247 5.37202 29.7298 5.36946 29.7324C5.36435 29.7477 5.35856 29.7632 5.35281 29.7785C5.34706 29.7938 5.34131 29.8092 5.33621 29.8245C5.31318 29.8987 5.29272 29.9728 5.27737 30.047C5.24412 30.198 5.23644 30.2798 5.23389 30.4512C5.23389 30.5279 5.23389 30.6047 5.24156 30.6814C5.24156 30.6836 5.24244 30.6923 5.24346 30.7025C5.24492 30.7169 5.24667 30.7343 5.24667 30.7403C5.25179 30.7786 5.25946 30.8196 5.26714 30.8579C5.28249 30.9321 5.30039 31.0089 5.32342 31.0805C5.32342 31.0831 5.32341 31.0856 5.32597 31.0882C5.70457 30.9986 6.08828 30.9347 6.47454 30.9014C6.45152 30.8375 6.43106 30.771 6.41571 30.707C6.35687 30.4486 6.37989 30.1903 6.4464 29.9345C6.49221 29.7513 6.55827 29.5756 6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M4.65513 29.9935C4.58152 30.4173 4.60471 30.846 4.72723 31.2621C4.46886 31.3465 4.2105 31.4437 3.95981 31.5563C3.81912 31.2007 3.78586 30.7965 3.82935 30.4052C4.0978 30.2543 4.37135 30.1163 4.65513 29.9935Z"
                    fill="white"
                  />
                  <path
                    d="M0.00255662 34.8766C0.00255662 34.8766 0.00255742 34.9636 0.0792995 34.9994C0.127903 35.0225 0.186739 34.9994 0.212319 34.9559C1.0002 33.5695 2.12063 32.5207 3.39711 31.8326C3.26153 31.5102 3.19246 31.1623 3.17967 30.8093C1.7625 31.7788 0.626725 33.1704 0 34.8792L0.00255662 34.8766Z"
                    fill="white"
                  />
                </svg>
                Engage & Earn
              </p>
              <p
                ref={videoSubTitleFiveRef}
                className="video-title-sub-text videoSubTitleFive"
              >
                <svg
                  width="52"
                  height="41"
                  viewBox="0 0 52 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.5443 23.7926C36.2295 23.7926 36.7849 24.348 36.7849 25.0332V27.5146C36.7849 28.1998 36.2295 28.7552 35.5443 28.7552C34.8591 28.7552 34.3036 28.1998 34.3036 27.5146V25.0332C34.3036 24.348 34.8591 23.7926 35.5443 23.7926Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.8231 33.5694C49.0713 33.4774 49.3424 33.4262 49.6238 33.4262H49.6289C50.9233 33.4262 51.9721 34.475 51.9721 35.7694C51.9721 37.0638 50.9233 38.1126 49.6289 38.1126C49.0892 38.1126 48.5929 37.9284 48.1964 37.6214C47.5646 38.7572 46.5823 39.6781 45.403 39.9953C42.4126 40.796 24.9692 40.5785 24.9692 40.5785C23.2911 40.5785 21.7435 40.0106 20.5054 39.0539C18.8427 39.0181 17.162 38.4042 15.709 37.1149C14.771 36.3291 14.0946 35.3147 13.4288 34.3161L13.3454 34.191C12.977 33.6436 12.5549 33.1295 12.0561 32.6946C10.6364 31.4565 8.88157 30.8707 7.12674 30.8784C7.1137 30.8392 7.10148 30.7993 7.08915 30.759C7.07975 30.7283 7.07017 30.697 7.06023 30.666C7.00395 30.4742 7.00651 30.3054 7.05767 30.1084C7.13185 29.827 7.24441 29.561 7.3851 29.3077C8.50553 29.2105 9.65922 29.3282 10.7848 29.6914C12.2582 30.1468 13.6242 30.996 14.7139 32.1292C14.9467 32.3797 15.1763 32.6545 15.4043 32.9274C15.6374 33.2065 15.8689 33.4836 16.1004 33.7306C16.6146 34.2601 17.2183 34.7257 17.8655 35.1145C17.6915 34.4775 17.5969 33.8073 17.5969 33.1141V29.3179C10.309 28.4405 4.66076 22.2347 4.66076 14.7114C4.66076 6.58701 11.2478 0 19.3722 0C26.9696 0 33.2241 5.76075 34.0017 13.1535C38.5814 14.7772 41.7815 17.5953 44.0171 20.7718C43.0763 21.1644 42.4152 22.093 42.4152 23.1761C42.4152 24.6143 43.5811 25.7802 45.0193 25.7802C45.582 25.7802 46.103 25.6017 46.5288 25.2983C47.8133 28.2752 48.4792 31.2315 48.8231 33.5694ZM17.8246 5.04194C13.852 5.45635 10.6825 8.46976 9.9279 12.2634H12.729C13.6806 12.2634 14.4531 13.0359 14.4531 13.9875V21.9303C15.8856 22.713 17.5484 23.1198 19.2981 23.0174L19.8046 22.007C21.5875 18.459 24.3554 15.5019 27.7755 13.4887C27.4788 8.3751 22.9766 4.50475 17.8246 5.0445V5.04194ZM39.5502 26.5604C39.5502 30.5868 36.2862 33.8508 32.2598 33.8508C28.2333 33.8508 24.9693 30.5868 24.9693 26.5604C24.9693 22.5339 28.2333 19.2699 32.2598 19.2699C36.2862 19.2699 39.5502 22.5339 39.5502 26.5604Z"
                    fill="white"
                  />
                  <path
                    d="M45.8494 24.0355C45.8811 24.0355 45.9123 24.0334 45.9428 24.0294C46.2936 23.9836 46.5644 23.6831 46.5644 23.3192V22.1323C46.5644 21.7367 46.2443 21.416 45.8494 21.416C45.4546 21.416 45.1345 21.7367 45.1345 22.1323V23.3192C45.1345 23.7148 45.4546 24.0355 45.8494 24.0355Z"
                    fill="white"
                  />
                  <path
                    d="M36.7875 13.2165C38.5101 13.9897 41.0445 15.4598 42.9089 17.9678C42.9089 17.9678 46.1014 14.9621 45.5386 10.4164C45.0423 6.38749 42.185 3.06969 38.2481 2.08483C36.3662 1.6118 32.5235 1.82325 30.1774 3.38433C30.2141 3.41426 31.9776 4.8619 33.3424 7.44396H35.0634C36.015 7.44396 36.7875 8.2165 36.7875 9.1681V13.2165Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4L6.63314 29.3998V29.3973L6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M6.63198 29.4C6.20263 29.4742 5.7835 29.5816 5.37458 29.7196C5.37458 29.7247 5.37202 29.7298 5.36946 29.7324C5.36435 29.7477 5.35856 29.7632 5.35281 29.7785C5.34706 29.7938 5.34131 29.8092 5.33621 29.8245C5.31318 29.8987 5.29272 29.9728 5.27737 30.047C5.24412 30.198 5.23644 30.2798 5.23389 30.4512C5.23389 30.5279 5.23389 30.6047 5.24156 30.6814C5.24156 30.6836 5.24244 30.6923 5.24346 30.7025C5.24492 30.7169 5.24667 30.7343 5.24667 30.7403C5.25179 30.7786 5.25946 30.8196 5.26714 30.8579C5.28249 30.9321 5.30039 31.0089 5.32342 31.0805C5.32342 31.0831 5.32341 31.0856 5.32597 31.0882C5.70457 30.9986 6.08828 30.9347 6.47454 30.9014C6.45152 30.8375 6.43106 30.771 6.41571 30.707C6.35687 30.4486 6.37989 30.1903 6.4464 29.9345C6.49221 29.7513 6.55827 29.5756 6.63198 29.4Z"
                    fill="white"
                  />
                  <path
                    d="M4.65513 29.9935C4.58152 30.4173 4.60471 30.846 4.72723 31.2621C4.46886 31.3465 4.2105 31.4437 3.95981 31.5563C3.81912 31.2007 3.78586 30.7965 3.82935 30.4052C4.0978 30.2543 4.37135 30.1163 4.65513 29.9935Z"
                    fill="white"
                  />
                  <path
                    d="M0.00255662 34.8766C0.00255662 34.8766 0.00255742 34.9636 0.0792995 34.9994C0.127903 35.0225 0.186739 34.9994 0.212319 34.9559C1.0002 33.5695 2.12063 32.5207 3.39711 31.8326C3.26153 31.5102 3.19246 31.1623 3.17967 30.8093C1.7625 31.7788 0.626725 33.1704 0 34.8792L0.00255662 34.8766Z"
                    fill="white"
                  />
                </svg>
                Secure by Design
              </p>
            </div>
          </div>
        </div>
        <div className="light-bg specification-bg-img">
          {/* <div className="benefits-details">
            <KeyBenefits />
          </div> */}
          {productLiveData?.productLiveStatus === false && (
            <div className="prebook-wishlist-details" ref={prebookWishlistRef}>
              <PreBookWishlist />
            </div>
          )}
          {productLiveData?.productLiveStatus === true && (
            <div className="detail-sider-sec" ref={prebookWishlistRef}>
              <DetailSlider />
            </div>
          )}
        </div>
        <div className="presale-main-sec">
          <Presale />
        </div>
        <div className="dark-bg pre-book-dark first-in-line-bg ">
          <div className="prebook-processors">
            {/* <PrebookProcessor /> */}
            <GenSpecification />
          </div>
          {productLiveData?.productLiveStatus === false && <PreBookFooter />}
        </div>
        <div className="joy-img-main-sec">
          <JoyImg />
        </div>
        {/* {productLiveData?.productLiveStatus === true && ( */}
          <div className="pre-book-main-footer">
            <Footer />
          </div>
        {/* )} */}
        {/* <CopyRightFooter /> */}
      </div>
    </>
  );
};

export default HomePage;
