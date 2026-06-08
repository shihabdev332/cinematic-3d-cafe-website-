import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import gsap from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  // Logo URL provided
  const logoUrl = "https://res.cloudinary.com/didqmq9xz/image/upload/v1780860817/b513a063-1f67-4444-8ed8-6b807c3f886e_cw8ssq.png";

  useEffect(() => {
    // 1. Navbar entry animation
    gsap.fromTo(navRef.current,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    );
  }, []);

  useEffect(() => {
    // 2. Mobile drawer slide animation based on state
    if (isMobileMenuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power4.out' });
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* HEADER SECTION */}
      <header className="fixed w-full top-0 z-[100] bg-[#1a1a1a]" ref={navRef}>
        <div className="bg-[#fcd34d] text-black text-center text-[10px] md:text-xs font-bold py-2.5 tracking-[0.2em] uppercase px-4">
          GET EXCLUSIVE UPDATES: <a href="#" className="underline font-bold border-black pb-[1px]">LET'S TEXT</a>
        </div>

        <nav className="flex justify-between items-center px-6 md:px-12 py-5 lg:py-6 text-white border-b border-white/5">
          {/* Logo container instead of plain text */}
          <div className="cursor-pointer">
            <img 
              src={logoUrl} 
              alt="Cactus Club Cafe Logo" 
              className="h-8 md:h-12 lg:h-20 w-auto object-cover brightness-100"
            />
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-[11px] tracking-[0.15em] uppercase font-semibold">
            <a href="#" className="hover:text-gray-400 transition-colors">Menus</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Locations</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Gift Cards</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Careers</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Private Dining</a>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button className="border border-white/70 px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-white hover:text-black transition-all duration-300">
              RESERVATIONS
            </button>
            <button className="border border-white/70 px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-white hover:text-black transition-all duration-300">
              ORDER NOW
            </button>
          </div>

          <div className="lg:hidden cursor-pointer text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <FiMenu size={28} />
          </div>
        </nav>
      </header>

      {/* MOBILE MENU DRAWER */}
      <div 
        ref={menuRef}
        className="fixed inset-y-0 right-0 w-full md:w-[380px] bg-[#1a1a1a] flex flex-col pt-24 pb-12 px-10 transform translate-x-full z-[110] border-l border-white/10"
      >
        <div className="absolute top-8 right-8 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
          <FiX size={32} className="text-white hover:text-gray-400 transition-colors" />
        </div>
        
        <div className="flex flex-col space-y-6 text-center text-sm font-light tracking-[0.2em] uppercase text-white mt-10">
          <a href="#" className="hover:text-gray-400 transition-colors">MENUS</a>
          <a href="#" className="hover:text-gray-400 transition-colors">LOCATIONS</a>
          <a href="#" className="hover:text-gray-400 transition-colors">GIFT CARDS</a>
          <a href="#" className="hover:text-gray-400 transition-colors">CAREERS</a>
          <a href="#" className="hover:text-gray-400 transition-colors">PRIVATE DINING</a>
        </div>

        <div className="flex flex-col space-y-4 w-full mt-auto mb-10">
          <button className="border border-white/50 text-white py-4 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all">
            RESERVATIONS
          </button>
          <button className="border border-white/50 text-white py-4 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all">
            ORDER NOW
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;