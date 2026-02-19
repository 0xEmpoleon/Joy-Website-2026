"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
// import Png from "@/assets/Png";
import Svg from "@/assets/Svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/component/home/Footer";
import BlogHeroDetails from "@/component/blog/BlogHeroDetails";
import BlogTabList from "@/component/blog/BlogTabList";

gsap.registerPlugin(ScrollTrigger);

// interface HeroData {
//     _id: string;
//     title1: string;
//     title2: string;
//     createdAt?: string;
//     updatedAt?: string;
//     __v?: number;
// }

const Page = () => {
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

    const handlePreOrderClick = () => {
        router.push('/pre-book');
    };

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
                                video
                                    .play()
                                    .catch((err) => console.log("Video failed to play:", err));
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
                },

                onLeaveBack: () => {
                    console.log(
                        "Reversing: showing game section, hiding video and sections"
                    );

                    if (dNoneMainRef.current) {
                        gsap.set(dNoneMainRef, { visibility: "hidden", opacity: 0 });
                    }

                    if (mainRef.current)
                        gsap.set(mainRef.current, {
                            display: "block",
                            opacity: 1,
                            visibility: "visible",
                        });

                    // Show game section and playroll content
                    if (gameImgSecRef.current && playrollContentRef.current) {
                        gsap.set(gameImgSecRef.current, {
                            display: "flex",
                            opacity: 1,
                            visibility: "visible",
                        });
                        gsap.set(playrollContentRef.current, {
                            display: "block",
                            opacity: 1,
                            visibility: "visible",
                        });
                    }
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
        }, mainRef);

        return () => {
            ctx.revert();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // const [heroData, setHeroData] = useState<HeroData | null>(null);
    // const [loading, setLoading] = useState(true);

    // const getHeroTitle = async () => {
    //     try {
    //         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    //         const response = await fetch(`${apiUrl}/api/hero-section`);

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data: HeroData[] = await response.json();
    //         console.log("API Response:", data);

    //         if (Array.isArray(data) && data.length > 0) {
    //             setHeroData(data[0]); // ✅ store a single object
    //         }
    //     } catch (err) {
    //         console.error("Error fetching content:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     getHeroTitle();
    // }, []);

    return (
        <>

            <div className="dark-blog-bg">
                <Image
                    className="right-line"
                    src={Svg.RightArrowLine}
                    alt="rightline"
                />
                <div className="header-main common-header-mt-none" ref={headerRef}>
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
                    <button className="main-btn" onClick={handlePreOrderClick}>
                        PRE ORDER NOW
                    </button>
                </div>


                <div className="top-header-common-space">
                    <div className="list-dark-bg">

                        <BlogHeroDetails />

                        <BlogTabList />

                        <div className="footer-bgblog">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
