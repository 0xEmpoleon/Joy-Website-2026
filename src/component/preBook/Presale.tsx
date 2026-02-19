"use client";
import React, { useEffect, useRef, useState } from "react";

export interface PreSale {
  _id: string;
  title1: string;
  text1: string;
  text2: string;
  text3: string;
  comingsoonText: string;
  title2: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

function Presale() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tubeHeights, setTubeHeights] = useState([30, 0, 0]);
  const [activeBorder, setActiveBorder] = useState(0);

  const [preSaleData, setPreSaleData] = useState<PreSale | null>(null);
  // const [loading, setLoading] = useState(true);

  const getPreSaleData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/pre-sale`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PreSale[] = await response.json();
      // console.log("API Response:", data[0]);

      setPreSaleData(data[0]);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getPreSaleData();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;

      const wrapper = wrapperRef.current;
      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScroll = wrapper.offsetHeight - windowHeight;
      const scrolled = Math.min(totalScroll, Math.max(0, -rect.top));

      const progress = scrolled / totalScroll; // 0 → 1

      // Tube animation (70% of scroll)
      const tubeProgress = Math.min(1, progress / 0.7);
      const t1 = Math.min(1, tubeProgress * 3);
      const t2 = Math.max(0, Math.min(1, tubeProgress * 3 - 1));
      const t3 = Math.max(0, Math.min(1, tubeProgress * 3 - 2));

      setTubeHeights([30 + t1 * 70, t2 * 100, t3 * 100]);

      // Border animation (last 30% of scroll)
      if (progress > 0.7) {
        const borderP = (progress - 0.7) / 0.3;
        const borderIndex = Math.min(3, Math.ceil(borderP * 3));
        setActiveBorder(borderIndex);
      } else {
        setActiveBorder(0);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="presale-scroll-wrapper" ref={wrapperRef}>
        <div className="presale-main-sec">
          <div className="presale-container" ref={containerRef}>
            <div className="presale-inner-sec">
              {/* <p className="small-title-text">PRESALE 1</p>
               */}
              <p className="small-title-text">{preSaleData?.title1}</p>

              <div className="presale-grid-sec">
                {/* {[
                  "Referral Rewards",
                  "Custom Skin Devices",
                  "Partner Discounts",
                ].map((title, idx) => ( */}

                {[
                  { title: preSaleData?.text1 || "Referral Rewards" },
                  { title: preSaleData?.text2 || "Custom Skin Devices" },
                  { title: preSaleData?.text3 || "Partner Discounts" },
                ].map((title, idx) => (
                  <div className="presale-bg" key={idx}>
                    <div className="specification-heading">
                      <p className="specification-title">{title.title}</p>
                    </div>
                    <div className="end-spce-icon">
                      <div className="cus-dot" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Section */}
            <div className="coming-soon-section">
              <div className="coming-soon-br-sec cus-center">
                <div
                  className={`coming-soon-br gradient-border soon-br-one cus-center ${
                    activeBorder >= 1 ? "border-blink" : ""
                  }`}
                >
                  <div
                    className={`coming-soon-br gradient-border soon-br-two cus-center ${
                      activeBorder >= 2 ? "border-blink" : ""
                    }`}
                  >
                    <div
                      className={`coming-soon-br gradient-border soon-br-three ${
                        activeBorder >= 3 ? "border-blink" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              <p className="coming-soon-text">
                {preSaleData?.comingsoonText || "Coming soon:"}
              </p>

              <div className="presale-timeline-wrapper">
                <div className="presale-timeline">
                  {/* Tube 1 */}
                  <div className="timeline-tube timeline-tube-one active">
                    <div className="tube-outer">
                      <div className="tube-inner">
                        <div
                          className="tube-fill"
                          style={{ height: `${tubeHeights[0]}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <p className="timeline-text">{preSaleData?.title2}</p>
                  </div>

                  {/* Tube 2 */}
                  <div className="timeline-tube timeline-tube-two">
                    <div className="tube-outer">
                      <div className="tube-inner">
                        <div
                          className="tube-fill"
                          style={{ height: `${tubeHeights[1]}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <p className="timeline-text">{preSaleData?.description}</p>
                  </div>

                  {/* Tube 3 */}
                  <div className="timeline-tube timeline-tube-three">
                    <div className="tube-outer">
                      <div className="tube-inner">
                        <div
                          className="tube-fill"
                          style={{ height: `${tubeHeights[2]}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Presale;
