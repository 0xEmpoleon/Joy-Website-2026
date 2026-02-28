"use client";

import React, { useEffect } from 'react';
import GenesisHeader from '../genesis/GenesisHeader';
import GenesisHero from '../genesis/GenesisHero';
import CommunitySaleSection from '../genesis/CommunitySaleSection';
import HardwareSpecGrid from '../genesis/HardwareSpecGrid';
import VerbatimSections from '../genesis/VerbatimSections';
import ScrollingPartners from '../genesis/ScrollingPartners';
import Footer from '../home/Footer';
import '../../assets/style/genesis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GenesisLandingPage = () => {
  useEffect(() => {
    // Add blue glow logic or GSAP reveal animations here if needed
    const ctx = gsap.context(() => {
      // Reveal widgets on scroll
      gsap.from(".genesis-widget", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".genesis-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="genesis-body">
      <GenesisHeader />
      <main className="genesis-main">
        <GenesisHero />
        <ScrollingPartners />
        <CommunitySaleSection />
        <HardwareSpecGrid />
        <VerbatimSections />
      </main>
      <Footer />

      <style jsx global>{`
        /* Global overrides for Genesis page */
        html, body {
          background-color: var(--genesis-bg) !important;
        }
        
        /* Electric Blue Edge Glows */
        .genesis-body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 30vw;
          height: 100vh;
          background: radial-gradient(circle at -20% 50%, rgba(39, 114, 237, 0.15), transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .genesis-body::after {
          content: '';
          position: fixed;
          top: 0;
          right: 0;
          width: 30vw;
          height: 100vh;
          background: radial-gradient(circle at 120% 50%, rgba(237, 255, 173, 0.1), transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .genesis-main {
          position: relative;
          z-index: 2;
        }

        /* Override Footer colors for Genesis theme */
        footer {
          background: var(--genesis-bg) !important;
          border-top: 1px solid var(--genesis-border) !important;
        }
        footer p, footer a, footer h3 {
          color: var(--genesis-text-secondary) !important;
        }
        footer a:hover {
          color: var(--genesis-accent) !important;
        }
      `}</style>
    </div>
  );
};

export default GenesisLandingPage;
