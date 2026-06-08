import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    // Premium reveal animation for footer items
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[#0a0a0a] text-gray-300 py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
          
          {/* Brand Column */}
          <div className="footer-animate">
            <h2 className="text-2xl font-serif text-white mb-6 tracking-wide">IVORI COFFEE</h2>
            <p className="text-sm font-light leading-relaxed text-gray-500">
              Crafting experiences through exceptional beans and timeless atmosphere. Since 2026.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="footer-animate">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Menu', 'Our Story', 'Locations', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-light hover:text-[#c49a45] transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="footer-animate">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white mb-8">Support</h4>
            <ul className="space-y-4">
              {['Contact', 'FAQ', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-light hover:text-[#c49a45] transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-animate">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white mb-8">Newsletter</h4>
            <p className="text-xs text-gray-500 mb-6">Receive curated updates on exclusive roasts.</p>
            <div className="flex border-b border-gray-700">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent py-2 text-sm focus:outline-none w-full placeholder:text-gray-700 text-white"
              />
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-[#c49a45] transition-colors">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 footer-animate">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-6 md:mb-0">
            © 2026 Ivori Coffee All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            {['Instagram', 'Twitter', 'Facebook'].map((social) => (
              <a key={social} href="#" className="text-[10px] uppercase tracking-[0.1em] text-gray-500 hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;