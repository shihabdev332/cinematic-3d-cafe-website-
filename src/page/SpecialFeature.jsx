import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin for animations
gsap.registerPlugin(ScrollTrigger);

// Loading Indicator Component
const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <span className="text-amber-500 font-mono text-sm tracking-widest whitespace-nowrap">
          LOADING... {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
};

// 1. First Model - Coffee Bag
const CoffeeBagModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036356/Untitled_ruvhpu.glb');
  return <primitive object={scene} scale={0.25} position={[0, -1, 0]} />;
};

// 2. Second Model - Coffee Machine
const CoffeeMachineModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036723/Untitled_zicwzi.glb');
  return <primitive object={scene} scale={1.5} position={[0, -1.2, 0]} />;
};

// 3. Third Model - Coffee Cup
const CoffeeCupModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1780954664/Untitled_pbyeba.glb');
  return <primitive object={scene} scale={18} position={[0, -1.2, 0]} />;
};

// 4. Fourth Model - Small Cafe Shop
const CafeShopModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1780959682/Untitled_oqnwi7.glb');
  return <primitive object={scene} scale={0.05} position={[0, -2, 0]} />; 
};

const SpecialFeature = () => {
  const mainSectionRef = useRef(null);
  const textHeaderRef = useRef(null);
  const cardElementsRef = useRef([]);

  useEffect(() => {
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

      // Animate all 4 3D model cards in a staggered grid
      gsap.fromTo(
        cardElementsRef.current,
        { opacity: 0, y: isMobileDevice ? 30 : 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainSectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, mainSectionRef);

    return () => animationContext.revert(); 
  }, []);

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
      <div ref={textHeaderRef} className="w-full max-w-3xl text-center mb-16 cursor-default">
        <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
          The Complete Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-normal leading-tight tracking-wide mb-6">
          From the Soil to <br />
          <span className="italic font-light text-neutral-300">Our Cozy Sanctuary</span>
        </h2>
        <p className="text-neutral-400 font-light leading-relaxed mx-auto max-w-xl text-sm md:text-base">
          Discover the perfect cup meticulously crafted in our signature environment. 
          Use your mouse or touch to rotate and zoom into our interactive views.
        </p>
      </div>

      {/* Changed to a CSS Grid to easily accommodate 4 cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-center items-stretch cursor-grab active:cursor-grabbing">
        
        {/* Card 1 - Coffee Bag */}
        <div
          ref={registerCardRef}
          className="w-full aspect-square md:h-[50vh] relative bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 will-change-transform"
        >
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.5, 4], fov: 45 }} performance={{ min: 0.5 }}>
            <Suspense fallback={<CanvasLoader />}>
              <Environment preset="city" />
              <CoffeeBagModel />
              <OrbitControls enableZoom={true} minDistance={2} maxDistance={6} autoRotate autoRotateSpeed={1.5} />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest text-neutral-400 pointer-events-none uppercase select-none">
            01. The Origin
          </div>
        </div>

        {/* Card 2 - Coffee Machine */}
        <div
          ref={registerCardRef}
          className="w-full aspect-square md:h-[50vh] relative bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 will-change-transform"
        >
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2, 5], fov: 45 }} performance={{ min: 0.5 }}>
            <Suspense fallback={<CanvasLoader />}>
              <Environment preset="city" />
              <CoffeeMachineModel />
              <OrbitControls enableZoom={true} minDistance={2} maxDistance={8} autoRotate autoRotateSpeed={1.5} />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest text-neutral-400 pointer-events-none uppercase select-none">
            02. The Alchemy
          </div>
        </div>

        {/* Card 3 - Coffee Cup */}
        <div
          ref={registerCardRef}
          className="w-full aspect-square md:h-[50vh] relative bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 will-change-transform"
        >
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.5, 3.5], fov: 45 }} performance={{ min: 0.5 }}>
            <Suspense fallback={<CanvasLoader />}>
              <Environment preset="sunset" />
              <CoffeeCupModel />
              <OrbitControls enableZoom={true} minDistance={2} maxDistance={6} autoRotate autoRotateSpeed={1.5} />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest text-neutral-400 pointer-events-none uppercase select-none">
            03. The Ritual
          </div>
        </div>

        {/* Card 4 - Small Cafe Shop */}
        <div
          ref={registerCardRef}
          className="w-full aspect-square md:h-[50vh] relative bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 will-change-transform"
        >
          <Canvas dpr={[1, 1.5]} camera={{ position: [60, 40, 60], fov: 50 }} performance={{ min: 0.5 }}>
            <Suspense fallback={<CanvasLoader />}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[40, 50, 40]} intensity={1.5} color="#ffedd5" /> 
              <pointLight position={[-20, 20, 20]} color="#a855f7" intensity={2} distance={100} /> 
              <pointLight position={[20, 10, -20]} color="#f59e0b" intensity={2} distance={100} /> 
              
              <CafeShopModel />
              <OrbitControls enableZoom={true} minDistance={10} maxDistance={200} autoRotate autoRotateSpeed={1.2} />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest text-neutral-400 pointer-events-none uppercase select-none">
            04. Our Sanctuary
          </div>
        </div>

      </div>
    </section>
  );
};

// Preloading models immediately to prevent pop-in
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036356/Untitled_ruvhpu.glb');
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036723/Untitled_zicwzi.glb');
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1780954664/Untitled_pbyeba.glb');
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1780959682/Untitled_oqnwi7.glb');

export default SpecialFeature;
