"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Png from "@/assets/Png";
import { useRouter } from "next/navigation";

const CustomPagination = styled(Pagination)({
  "& .MuiPagination-ul": {
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  "& .MuiPaginationItem-root": {
    color: "#fff",
    fontSize: "16px",
    fontWeight: 500,
    background: "transparent",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    transition: "all 0.3s ease",
  },
  "& .MuiPaginationItem-root:hover": {
    color: "#EDFFAD",
    background: "rgba(255,255,255,0.08)",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: "#EDFFAD",
    color: "#000",
    fontWeight: 600,
  },
  "& .MuiPaginationItem-ellipsis": { color: "#fff" },
  "& .MuiPaginationItem-previousNext": { color: "#fff" },
  "& .MuiPaginationItem-previousNext:hover": { color: "#EDFFAD" },
});

interface Category {
  _id: string;
  title: string;
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  category: Category;
  imageUrl: string;
}

interface BlogsResponse {
  status: boolean;
  message: string;
  blogs: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

export default function BlogTabList() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  // Fetch Categories (from your separate API)
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/blog-categories`);
      if (res.ok) {
        const cats: Category[] = await res.json();
        const catTitles = cats.map((c) => c.title);
        setCategories(["All", ...catTitles]);
      }
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchBlogs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
      });

      if (search.trim()) params.append("search", search.trim());
      if (activeCategory !== "All") {
        const catRes = await fetch(`${API_BASE}/api/blog-categories`);
        const allCats: Category[] = await catRes.json();
        const selectedCat = allCats.find((c) => c.title === activeCategory);
        if (selectedCat) params.append("category", selectedCat._id);
      }

      const res = await fetch(`${API_BASE}/api/blogs/get-bloglist-for-user?${params}`);
      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data: BlogsResponse = await res.json();

      if (data.status) {
        setBlogs(data.blogs);
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
        });
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE, search, activeCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, activeCategory, fetchBlogs]);

  const handlePageChange = (_: unknown, page: number) => {
    fetchBlogs(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear().toString().slice(-2)}`;
  };

  const getImageUrl = (path: string) => {
    if (!path) return Png.blog;
    return path.startsWith("http") ? path : `${API_BASE}${path}`;
  };

  const goToBlogDetail = (blog: Blog) => {
    router.push(`/blog/${blog._id}`);
  };

  return (
    <div className="blog-listtab-main">
      <div className="blog-container">
        {/* Tabs + Search */}
        <div className="blog-header">
          <div className="blog-tabs-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-button ${activeCategory === cat ? "active" : ""}`}
                onClick={(e) => {
                  setActiveCategory(cat);
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="SEARCH"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-white text-xl">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-white text-xl">No blogs found</div>
        ) : (
          <>
            <div className="card-grid">
              {blogs.map((blog) => (
                <div key={blog._id} className="blog-card">
                  <Image
                    src={getImageUrl(blog.imageUrl)}
                    alt={blog.title}
                    width={400}
                    height={300}
                    className="img-blog-list object-cover"
                  />
                  <div className="card-content">
                    <div>
                      <p className="card-date">{formatDate(blog.publishedAt)}</p>
                      <h3 className="card-title">{blog.title}</h3>
                    </div>
                    <button className="card-arrow" onClick={() => goToBlogDetail(blog)}>
                      <Image src={Png.arrow} alt="arrow" className="arrow-icons" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* YOUR ORIGINAL PAGINATION */}
            {pagination.totalPages > 1 && (
              <div className="pagination-common">
                <Stack spacing={2} className="pagination-stack-main">
                  <CustomPagination
                    count={pagination.totalPages}
                    page={pagination.currentPage}
                    onChange={handlePageChange}
                    siblingCount={1}
                    boundaryCount={1}
                    showFirstButton
                    showLastButton
                    shape="rounded"
                  />
                </Stack>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}