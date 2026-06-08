import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroSectionRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroBtnRef = useRef(null);
  const contentSectionRef = useRef(null);
  const contentLeftRef = useRef(null);
  const contentRightRef = useRef(null);

  useEffect(() => {
    // 1. Initial entry sequence for hero elements (Runs once on load)
    const tl = gsap.timeline();
    
    tl.fromTo(heroHeadingRef.current,
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 60, opacity: 0 },
      { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }
    ).fromTo(heroBtnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    );

    // 2. Scroll triggers for content section only (Removed hero text fade/hiding on scroll)
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        // Content reveal left side
        gsap.fromTo(contentLeftRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            }
          }
        );

        // Content reveal right side
        gsap.fromTo(contentRightRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            }
          }
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div ref={heroSectionRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://res.cloudinary.com/didqmq9xz/video/upload/v1780605989/fbc4b857-bf3aca17_cwq3cn.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 pointer-events-none"></div>

        <div className="absolute inset-0 z-20 flex items-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pointer-events-none">
          <div className="pointer-events-auto relative z-30 max-w-4xl">
            <h1 
              ref={heroHeadingRef} 
              className="text-white text-4xl md:text-5xl lg:text-7xl font-normal tracking-wide mb-8 leading-tight drop-shadow-2xl"
            >
              Elevated Everyday Dining
            </h1>
            <div ref={heroBtnRef}>
              <a 
                href="#" 
                className="text-white text-xs md:text-sm tracking-[0.2em] uppercase font-bold border-b-2 border-white pb-1.5 hover:text-gray-300 hover:border-gray-300 transition-colors inline-block drop-shadow-md"
              >
                RESERVE NOW
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NEW CONTENT SECTION */}
      <div 
        ref={contentSectionRef} 
        className="w-full bg-white text-black py-24 lg:py-36 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Large Text */}
          <div ref={contentLeftRef} className="md:col-span-5">
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-light tracking-wide text-gray-900 leading-[1.15]">
              Craveable dishes.<br />
              Vibrant spaces.<br />
              Warm hospitality.
            </h2>
          </div>

          {/* Right Description Text */}
          <div ref={contentRightRef} className="md:col-span-7 pt-2 lg:pt-4 md:pl-6">
            <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed max-w-2xl">
              Our vibe is upbeat and stylish, fueled by energetic music, magnetic people, and spaces that feel as good as they look. Our chef-driven menu delivers bold, refined dishes with something for every craving. Fresh yet familiar, it's easy to love and easy to come back to.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Hero;