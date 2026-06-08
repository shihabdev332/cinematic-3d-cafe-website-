import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin for animations
gsap.registerPlugin(ScrollTrigger);

// First 3D Model Component - Coffee Cup
const CoffeeCupModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1780954664/Untitled_pbyeba.glb');
  return <primitive object={scene} scale={18} position={[0, -1.2, 0]} />;
};

// Second 3D Model Component - Small Cafe Shop
const CafeShopModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1780959682/Untitled_oqnwi7.glb');
  // Reduced scale drastically for maximum zoom out effect
  return <primitive object={scene} scale={0.05} position={[0, -2, 0]} />; 
};

const SpecialFeature = () => {
  const mainSectionRef = useRef(null);
  const textHeaderRef = useRef(null);
  const cardElementsRef = useRef([]);

  useEffect(() => {
    // Media Query for mobile optimization check
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;

    const animationContext = gsap.context(() => {
      // Animate the top header text
      gsap.fromTo(
        textHeaderRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainSectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate both 3D model cards
      gsap.fromTo(
        cardElementsRef.current,
        { opacity: 0, y: isMobileDevice ? 30 : 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainSectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, mainSectionRef);

    return () => animationContext.revert(); // Cleanup animations on unmount
  }, []);

  // Helper function to dynamically collect card references
  const registerCardRef = (elementNode) => {
    if (elementNode && !cardElementsRef.current.includes(elementNode)) {
      cardElementsRef.current.push(elementNode);
    }
  };

  return (
    <section
      ref={mainSectionRef}
      className="w-full min-h-screen bg-[#111111] text-white flex flex-col items-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden"
    >
      {/* Top Header Content Section */}
      <div ref={textHeaderRef} className="w-full max-w-3xl text-center mb-16 cursor-default">
        <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
          Two Worlds Collide
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-normal leading-tight tracking-wide mb-6">
          The Art of Brewing & <br />
          <span className="italic font-light text-neutral-300">Our Cozy Sanctuary</span>
        </h2>
        <p className="text-neutral-400 font-light leading-relaxed mx-auto max-w-xl text-sm md:text-base">
          Discover the perfect cup meticulously crafted in our signature environment. 
          Use your mouse or touch to rotate and zoom into our interactive views.
        </p>
      </div>

      {/* Grid Container for 3D Models */}
      <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-12 justify-center items-stretch cursor-grab active:cursor-grabbing">
        
        {/* Left Side - Coffee Cup Card */}
        <div
          ref={registerCardRef}
          className="w-full md:w-1/2 aspect-square md:h-[60vh] relative bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 will-change-transform"
        >
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.5, 3.5], fov: 45 }} performance={{ min: 0.5 }}>
            <Suspense fallback={null}>
              <Environment preset="sunset" />
              <CoffeeCupModel />
              {/* Zoom configuration for the small coffee cup */}
              <OrbitControls enableZoom={true} minDistance={2} maxDistance={6} autoRotate autoRotateSpeed={1.5} />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest text-neutral-400 pointer-events-none uppercase select-none">
            Signature Blend
          </div>
        </div>

        {/* Right Side - Small Cafe Shop Card */}
        <div
          ref={registerCardRef}
          className="w-full md:w-1/2 aspect-square md:h-[60vh] relative bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 will-change-transform"
        >
          {/* Extremely pushed back camera position for massive zoom out */}
          <Canvas dpr={[1, 1.5]} camera={{ position: [60, 40, 60], fov: 50 }} performance={{ min: 0.5 }}>
            <Suspense fallback={null}>
              {/* Custom Warm Lighting setup */}
              <ambientLight intensity={0.5} />
              <directionalLight position={[40, 50, 40]} intensity={1.5} color="#ffedd5" /> 
              <pointLight position={[-20, 20, 20]} color="#a855f7" intensity={2} distance={100} /> 
              <pointLight position={[20, 10, -20]} color="#f59e0b" intensity={2} distance={100} /> 
              
              <CafeShopModel />
              {/* Huge zoom limits allowed for the extreme zoomed out model */}
              <OrbitControls enableZoom={true} minDistance={10} maxDistance={200} autoRotate autoRotateSpeed={1.2} />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest text-neutral-400 pointer-events-none uppercase select-none">
            Our Sanctuary
          </div>
        </div>

      </div>
    </section>
  );
};

// Preloading models to avoid rendering delays
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1780954664/Untitled_pbyeba.glb');
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1780959682/Untitled_oqnwi7.glb');

export default SpecialFeature;