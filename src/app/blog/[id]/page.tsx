"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import Png from "@/assets/Png";
import Svg from "@/assets/Svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/component/home/Footer";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

interface RelatedBlog {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  imageUrl: string;
  category?: { title: string };
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  imageUrl: string;
  category?: { title: string };
}

const Page = () => {
  // const posts = [
  //   {
  //     id: 1,
  //     category: "Education",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog,
  //   },
  //   {
  //     id: 2,
  //     category: "Development",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog2,
  //   },
  //   {
  //     id: 3,
  //     category: "Marketing",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog3,
  //   },
  //   {
  //     id: 4,
  //     category: "Marketing",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog4,
  //   },
  // ];

  const router = useRouter();
  const { id } = useParams();
  const mainRef = useRef<HTMLDivElement>(null);
  const joyLogoRef = useRef<HTMLImageElement>(null);
  const gameImgSecRef = useRef<HTMLDivElement>(null);
  const gamepadIconRef = useRef<HTMLImageElement>(null);
  const heroConRef = useRef<HTMLDivElement>(null);
  const playrollContentRef = useRef<HTMLDivElement>(null);
  const dNoneMainRef = useRef<HTMLDivElement>(null);
  // const introVideoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const apiBase = React.useMemo(() => API_BASE, []);

  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [relatedBlogData, setRelatedBlogData] = useState<RelatedBlog[]>([]); // ← Fixed: Array
  const [loading, setLoading] = useState(true);

  const handlePreOrderClick = () => {
    router.push("/pre-book");
  };

  // GSAP + Scroll Effects (unchanged)
  useEffect(() => {
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

      if (dNoneMainRef.current) {
        gsap.set(dNoneMainRef.current, { visibility: "hidden", opacity: 0 });
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

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
    }, mainRef);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchBlog = async () => {
    if (!id || !apiBase) return;

    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs/${id}`);

      if (!res.ok) throw new Error("Blog not found");

      const result = await res.json();
      console.log("API Response:", result);

      if (result.blog) {
        setBlogData(result.blog);
        setRelatedBlogData(result.relatedBlogs || []); // ← Always array
      }
    } catch (err) {
      console.error("Failed to fetch blog:", err);
      setBlogData(null);
      setRelatedBlogData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id, apiBase]);

  const getImageUrl = (path?: string) => {
    if (!path) return Png.blog;
    return path.startsWith("http") ? path : `${apiBase}${path}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  //unused so commented out
  // const goToBlogDetail = (blog: Blog) => {
  //   router.push(`/blog/${blog._id}`);
  // };

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
            <div className="blog-container">
              <div className="blog-details-main">
                {loading ? (
                  <div className="text-center py-20" style={{ color: "white" }}>
                    Loading blog...
                  </div>
                ) : !blogData ? (
                  <div className="text-center py-20 text-white">
                    Blog not found
                  </div>
                ) : (
                  <>
                    <div className="blog-desc-content">
                      <h4 className="blog-head-details-title">
                        {blogData.title}
                      </h4>
                      <div className="blog-hero-banner">
                        <Image
                          src={getImageUrl(blogData.imageUrl)}
                          width={1200}
                          height={600}
                          className="blog-banner rounded-xl object-cover"
                          alt={blogData.title}
                        />
                      </div>

                      <div
                        className="desc-blog-content prose prose-invert max-w-none mt-10"
                        dangerouslySetInnerHTML={{
                          __html: blogData.description,
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Related Articles – Now Works Perfectly */}
                {relatedBlogData.length > 0 && (
                  <div className="recently-grid-contain">
                    <h6>Related Articles</h6>
                    <div className="card-grid">
                      {relatedBlogData.length > 0 ? (
                        relatedBlogData.map((blog) => (
                          <div
                            key={blog._id}
                            className="blog-card cursor-pointer"
                            onClick={() => router.push(`/blog/${blog._id}`)}
                          >
                            <Image
                              src={getImageUrl(blog.imageUrl)}
                              alt={blog.title}
                              width={400}
                              height={300}
                              className="img-blog-list object-cover"
                            />
                            <div className="card-content">
                              <div>
                                <p className="card-date">
                                  {formatDate(blog.publishedAt)}
                                </p>
                                <h3 className="card-title">{blog.title}</h3>
                              </div>
                              <button
                                className="card-arrow"
                                onClick={() => router.push(`/blog/${blog._id}`)}
                              >
                                <Image
                                  src={Png.arrow}
                                  alt="arrow-icon"
                                  className="arrow-icons"
                                />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center col-span-3">
                          No related articles found
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

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
