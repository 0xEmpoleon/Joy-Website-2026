import Png from '@/assets/Png'
import Image from 'next/image'
import React from 'react'

const BlogHeroDetails = () => {
  return (
    <>
    
    <div className="blog-update-details">
        <div className="blog-container">
            <div className="blog-head-details">
                <h4 className='blog-heading'>Blog & Update</h4>
                <p className='blog-desc'>Stay up to date with the latest news and updates from Upstream.</p>
            </div>
            <div className="blog-hero-banner">
                <Image src={Png.blogdetails} className='blog-banner' alt="banner-img" />
            </div>
        </div>
    </div>
    
    </>
  )
}

export default BlogHeroDetails