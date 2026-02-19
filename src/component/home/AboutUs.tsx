"use client";

import Png from "@/assets/Png";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContentSection {
  _id: string;
  section: string;
  title: string;
  content: string;
}

function AboutUs() {
  const [aboutUsContent, setAboutUsContent] = useState<ContentSection | null>(null);
  const [whatIsJoyContent, setWhatIsJoyContent] = useState<ContentSection | null>(null);
  const [loading, setLoading] = useState(true);
  const aboutUsImgRef = useRef<HTMLImageElement>(null);
  const aboutInnerMainRef = useRef<HTMLDivElement>(null);
  const whatJoyMainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        // Fetch both content sections
        const [aboutUsRes, whatIsJoyRes] = await Promise.all([
          fetch(`${apiUrl}/api/content/about-us`),
          fetch(`${apiUrl}/api/content/what-is-joy`)
        ]);

        if (aboutUsRes.ok) {
          const aboutUsData = await aboutUsRes.json();
          setAboutUsContent(aboutUsData);
        }

        if (whatIsJoyRes.ok) {
          const whatIsJoyData = await whatIsJoyRes.json();
          setWhatIsJoyContent(whatIsJoyData);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !aboutUsImgRef.current || !aboutInnerMainRef.current || !whatJoyMainRef.current) return;

    const ctx = gsap.context(() => {
      // Animate aboutus-img from right to left
      gsap.fromTo(
        aboutUsImgRef.current,
        {
          x: 300,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate about-inner-main from left
      gsap.fromTo(
        aboutInnerMainRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate what-joy-main from left with delay
      gsap.fromTo(
        whatJoyMainRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [loading]);

  // Split content by paragraphs (split by double newlines or single newlines)
  const renderContent = (content: string) => {
    const paragraphs = content.split(/\n+/).filter(p => p.trim());
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="common-text">
        {paragraph}
      </p>
    ));
  };

  return (
    <>
      <div className="aboutus-section">
        <div className="aboutus-inner-sec" ref={containerRef}>
          <div className="aboutus-inner-left">
            <div className="about-inner-main" ref={aboutInnerMainRef}>
              <div className="main-title-sec">
                <p className="main-title">
                  {aboutUsContent?.title || '// ABOUT US'}
                </p>
              </div>
              {loading ? (
                <p className="common-text">Loading...</p>
              ) : aboutUsContent ? (
                renderContent(aboutUsContent.content)
              ) : (
                <>
                  <p className="common-text">
                    With a combined 30+ years in semiconductor design & manufacturing,
                    from 32nm to 7nm chips, the Joy Team have extensive experience in
                    developing hardware and operating within Web3. The team previously
                    worked on PS4/5 and Xbox One gaming consoles and have run
                    successful crypto hardware manufacturing companies.
                  </p>
                  <p className="common-text">
                    Joy Studios is our native gaming IP house and our team directly
                    support the full Berachain suite of games alongside the wider Web3
                    Gaming economy. We never stop gaming; we get gamers.
                  </p>
                </>
              )}
            </div>
            <div className="what-joy-main" ref={whatJoyMainRef}>
              <div className="main-title-sec">
                <p className="main-title">
                  {whatIsJoyContent?.title || '//What Is Joy'}
                </p>
              </div>
              {loading ? (
                <p className="common-text">Loading...</p>
              ) : whatIsJoyContent ? (
                renderContent(whatIsJoyContent.content)
              ) : (
                <>
                  <p className="common-text">
                    Joy Gen 1 is the first Web3 gaming console capable of playing your beloved AAA or indie games, with camera and hardware wallet embedded. Optimised for the future of gaming, discover the greatest of Web3, participate in Joy&apos;s tokenised gamification system, and have a stake in the gaming communities you live and breathe.
                  </p>
                  <p className="common-text">
                    Native to web3, tailored for Berachain🐻⛓️.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="aboutus-inner-right">
            <Image
              ref={aboutUsImgRef}
              src={Png.aboutusImg}
              className="aboutus-img"
              alt="console"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
