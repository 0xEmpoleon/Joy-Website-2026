import Png from "@/assets/Png";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KeyBenefits = () => {
  const keybenefitsGridRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !keybenefitsGridRef.current ||
      !leftContentRef.current ||
      !rightContentRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Animate left content from left
      gsap.fromTo(
        leftContentRef.current,
        {
          x: -150,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: keybenefitsGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate right content from right
      gsap.fromTo(
        rightContentRef.current,
        {
          x: 150,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: keybenefitsGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);
  return (
    <>
      <div className="keybenefits-bg-main">
        <div className="keybenefits-container">
          <div className="max-keybenefits-details">
            <div className="keybenefits-grid" ref={keybenefitsGridRef}>
              <div className="keybenefits-left-content" ref={leftContentRef}>
                <div className="keybenefits-step-details">
                  <Image
                    src={Png.Keybenefits}
                    width={100}
                    height={45}
                    alt="Keybenefits"
                    className="key-benefits-logo"
                  />
                  <div className="buy-now-details">
                    <p className="buy-now-title">BUY NOW!!</p>
                    <div className="buy-batch-list">
                      <div className="timeline">
                        <div className="step active">
                            <span>
                          Presale (Batch 1) <br /> - Live
                          </span>
                        </div>
                        <div className="step">
                          Presale (Batch 2) <br /> - Coming Soon
                        </div>
                        <div className="step">
                          Public Sale <br />- Coming Soon
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="keybenefits-right-content" ref={rightContentRef}>
                <div className="keyfeature-main-content">
                  <p className="keybenefits-heading">Key Benefits</p>
                  <p className="keybenefits-desc">
                    A little smoke before the flames. A little console before
                    the fame.
                  </p>

                  <div className="perks-details">
                    <p className="perks-title"> Pre-sale perks:</p>
                    <ul className="perks-list">
                      <li className="perks-listitem">
                        Referral rewards for the community
                      </li>
                      <li className="perks-listitem">
                        Special discounts for exclusive launch partners
                      </li>
                      <li className="perks-listitem">Custom Skin Devices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyBenefits;
