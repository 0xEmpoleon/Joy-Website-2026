"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Png from "@/assets/Png";
// import Svg from "@/assets/Svg";
// import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Feature {
  title: string;
  images: string[];
}
interface ProductFeatures {
  mainImage: string;
  featureSections: Feature[];
  description: string;
}

const GenSpecification = () => {
  // const router = useRouter();
  const [data, setData] = useState<ProductFeatures | null>(null);
  const [loading, setLoading] = useState(true);
  const specIconRef = useRef<HTMLImageElement>(null);
  const gridBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/product-features`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Error loading specs:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!specIconRef.current) return;

    const ctx = gsap.context(() => {
      // Create a tilt animation that repeats
      gsap.to(specIconRef.current, {
        rotation: 5,
        duration: 1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [data]);

  useEffect(() => {
    if (!gridBoxRef.current) return;

    const ctx = gsap.context(() => {
      const specBgElements = gridBoxRef.current?.querySelectorAll('.specification-bg');

      if (specBgElements) {
        gsap.fromTo(
          specBgElements,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridBoxRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [data]);
  // unused so commented
  // const handlePreOrderClick = () => {
  //     router.push("/pre-book");
  // };

  if (loading) {
    return (
      <div className="specification-sec">
        <div className="specification-container text-center py-20">
          Loading specifications...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="specification-sec">
        <div className="specification-container text-center py-20 text-red-500">
          No product data available.
        </div>
      </div>
    );
  }

  const getImageUrl = (url?: string) => {
    if (!url) return Png.specefication;
    if (url.startsWith("http")) return url;
    const base = API_BASE.replace(/\/$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
  };

  const mainImgUrl = getImageUrl((data as any).mainImage || (data as any).mainImg);

  return (
    <div className="specification-sec">
      <div className="position-relative">
        <div className="specification-container">
          <div className="main-title-sec">
            <div className="specification-grid-main">
              <div className="left-specification-content">
                <Image
                  // ref={specIconRef}
                  src={mainImgUrl}
                  width={741}
                  height={318}
                  className="specefication-icon"
                  alt="Product"
                  unoptimized={!!data.mainImage}
                />
              </div>

              <div className="right-specification-content">
                <div className="specification-grid-box"
                // ref={gridBoxRef}
                >
                  {data.featureSections
                    .filter((s) => s.title.trim())
                    .map((section, idx) => (
                      <div key={idx} className="specification-bg">
                        <div className="specification-heading">
                          <p className="specification-title">{section.title}</p>
                        </div>

                        <div className="end-spce-icon">
                          {section.images.length > 0 ? (
                            section.images.map((imgUrl, i) => (
                              <Image
                                key={i}
                                src={getImageUrl(imgUrl)}
                                width={32}
                                height={32}
                                className="small-spec-icon"
                                alt={section.title}
                                unoptimized
                              />
                            ))
                          ) : (
                            <div className="cus-dot" />
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                <p className="specification-perorder" dangerouslySetInnerHTML={{ __html: data.description }}>
                </p>

                {/* <div className="main-btn-sec spec-text-center">
                  <button className="main-btn" onClick={handlePreOrderClick}>
                     Pre Order Now
                    <Image
                      src={Svg.rightwhite}
                      width={18}
                      height={18}
                      className="right-white-arrow"
                      alt="arrow"
                    />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenSpecification;
