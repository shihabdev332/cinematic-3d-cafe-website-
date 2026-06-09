import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, useProgress, Float, OrbitControls, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin for scroll animations
gsap.registerPlugin(ScrollTrigger);

// Ultra Premium Loading Screen
const PremiumCanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-[#030303]/95 backdrop-blur-xl px-10 py-6 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
        <div className="relative mb-4">
          <span className="text-amber-500 font-serif text-2xl italic tracking-wider">
            Crafting Perfection
          </span>
        </div>
        <div className="w-48 h-[1px] bg-neutral-800 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-neutral-500 font-mono text-[10px] tracking-[0.4em] uppercase mt-4">
          Loading {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
};

// 3D Models
const CoffeeBagModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036356/Untitled_ruvhpu.glb');
  return <primitive object={scene} />;
};

const CoffeeMachineModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036723/Untitled_zicwzi.glb');
  return <primitive object={scene} />;
};

const CoffeeCupModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1780954664/Untitled_pbyeba.glb');
  return <primitive object={scene} />;
};

const CafeShopModel = () => {
  const { scene } = useGLTF('https://res.cloudinary.com/didqmq9xz/image/upload/v1780959682/Untitled_oqnwi7.glb');
  return <primitive object={scene} />;
};

// Advanced Model Animator for Seamless Transitions
const ModelAnimator = ({ children, modelIndex, activeSectionIndex, targetScale, basePosition }) => {
  const modelGroupRef = useRef(null);

  useEffect(() => {
    if (!modelGroupRef.current) return;

    let ctx = gsap.context(() => {
      if (modelIndex === activeSectionIndex) {
        // Animate In: Smooth floating entrance with slight rotation
        gsap.to(modelGroupRef.current.position, {
          y: basePosition[1],
          duration: 2,
          ease: 'power4.out',
        });
        gsap.to(modelGroupRef.current.scale, {
          x: targetScale,
          y: targetScale,
          z: targetScale,
          duration: 2.5,
          ease: 'elastic.out(1, 0.7)', // Premium subtle bounce
        });
        gsap.to(modelGroupRef.current.rotation, {
          y: 0,
          duration: 2,
          ease: 'power3.out',
        });
      } else if (modelIndex < activeSectionIndex) {
        // Animate Out Upwards
        gsap.to(modelGroupRef.current.position, {
          y: basePosition[1] + 8,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        gsap.to(modelGroupRef.current.scale, {
          x: 0, y: 0, z: 0,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        gsap.to(modelGroupRef.current.rotation, {
          y: Math.PI / 4,
          duration: 1.5,
        });
      } else {
        // Animate Out Downwards
        gsap.to(modelGroupRef.current.position, {
          y: basePosition[1] - 8,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        gsap.to(modelGroupRef.current.scale, {
          x: 0, y: 0, z: 0,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        gsap.to(modelGroupRef.current.rotation, {
          y: -Math.PI / 4,
          duration: 1.5,
        });
      }
    });

    return () => ctx.revert();
  }, [activeSectionIndex, modelIndex, targetScale, basePosition]);

  return (
    <group ref={modelGroupRef} position={[basePosition[0], basePosition[1] - 8, basePosition[2]]} scale={0}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
        {children}
      </Float>
    </group>
  );
};

// Master Scene Manager
const SceneManager = ({ activeSectionIndex }) => {
  const sceneGroupRef = useRef(null);

  useFrame((state) => {
    if (sceneGroupRef.current) {
      sceneGroupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Suspense fallback={<PremiumCanvasLoader />}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={3} color="#fde68a" castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={1} color="#a855f7" />
      
      <group ref={sceneGroupRef}>
        <ModelAnimator modelIndex={0} activeSectionIndex={activeSectionIndex} targetScale={0.2} basePosition={[0, -0.8, 0]}>
          <CoffeeBagModel />
        </ModelAnimator>

        <ModelAnimator modelIndex={1} activeSectionIndex={activeSectionIndex} targetScale={1.45} basePosition={[0, -1.2, 0]}>
          <CoffeeMachineModel />
        </ModelAnimator>

        <ModelAnimator modelIndex={2} activeSectionIndex={activeSectionIndex} targetScale={16.5} basePosition={[0, -1.2, 0]}>
          <CoffeeCupModel />
        </ModelAnimator>

        <ModelAnimator modelIndex={3} activeSectionIndex={activeSectionIndex} targetScale={0.005} basePosition={[0, -1.8, 0]}>
          <pointLight position={[-20, 20, 20]} color="#c084fc" intensity={5} distance={150} /> 
          <pointLight position={[20, 10, -20]} color="#fbbf24" intensity={5} distance={150} />
          <CafeShopModel />
        </ModelAnimator>
      </group>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />

      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.6}
        rotateSpeed={0.6}
        minDistance={2}
        maxDistance={15}
        makeDefault
      />
    </Suspense>
  );
};

export default function PremiumCoffeeJourney() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const mainContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const storySections = gsap.utils.toArray('.story-section');
      
      storySections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSectionIndex(index),
          onEnterBack: () => setActiveSectionIndex(index),
        });

        // Premium Text Reveal Animation
        const title = section.querySelector('.anim-title');
        const subtitle = section.querySelector('.anim-subtitle');
        const desc = section.querySelector('.anim-desc');
        const line = section.querySelector('.anim-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(line, { width: 0 }, { width: '3rem', duration: 0.8, ease: 'power3.out' })
          .fromTo(title, { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' }, '-=0.4')
          .fromTo(subtitle, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  const storyContentData = [
    {
      title: "The Origin",
      subtitle: "Hand-selected from the finest elevations.",
      desc: "Our story begins with the bean. We source exclusively from sustainable farms, ensuring every bag holds the promise of perfection."
    },
    {
      title: "The Alchemy",
      subtitle: "Precision engineering meets artisanal passion.",
      desc: "Extracting the soul of the bean requires absolute control. Our machines are calibrated to pull the perfect espresso, drop by drop."
    },
    {
      title: "The Ritual",
      subtitle: "Your daily moment of clarity.",
      desc: "A cup designed to awaken the senses. Rich crema, bold aromas, and a temperature that holds the warmth of our dedication."
    },
    {
      title: "The Sanctuary",
      subtitle: "A space crafted for connection.",
      desc: "Experience the final destination. Our cafe is more than a room; it's a carefully curated environment where every sip feels like home."
    }
  ];

  return (
    <section 
      ref={mainContainerRef} 
      className="relative w-full bg-[#030303] text-white selection:bg-amber-500/30 font-sans z-10"
    >
      <div className="flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto">
        
        {/* Scrollable Text Content */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col pt-10 lg:pt-0">
          {storyContentData.map((data, index) => (
            <div 
              key={index} 
              className="story-section w-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-24 py-20"
            >
              <div className="text-content w-full max-w-lg group relative">
                {/* Glowing Background Blur Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Glassmorphism Card */}
                <div className="relative bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 p-8 sm:p-12 rounded-[2rem] border border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
                  
                  {/* Subtle noise texture overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="anim-line h-[2px] bg-gradient-to-r from-amber-500 to-amber-200"></div>
                    <span className="text-amber-500/90 text-xs sm:text-sm font-bold tracking-[0.4em] uppercase">
                      Chapter 0{index + 1}
                    </span>
                  </div>
                  
                  <h2 className="anim-title text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    {data.title}
                  </h2>
                  
                  <h3 className="anim-subtitle text-lg sm:text-xl lg:text-2xl italic font-light text-amber-500/80 mb-6">
                    {data.subtitle}
                  </h3>
                  
                  <p className="anim-desc text-neutral-400 font-light leading-relaxed text-sm sm:text-base">
                    {data.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky 3D Canvas Area */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 z-0 bg-[#030303] overflow-hidden rounded-b-[3rem] lg:rounded-none">
          <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 1.5, 7], fov: 40 }}>
              <SceneManager activeSectionIndex={activeSectionIndex} />
            </Canvas>
            
            {/* Ambient vignette and gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_110%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent pointer-events-none hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none lg:hidden" />
          </div>
        </div>

      </div>
    </section>
  );
}

// Preload models for instant display
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036356/Untitled_ruvhpu.glb');
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1781036723/Untitled_zicwzi.glb');
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1780954664/Untitled_pbyeba.glb');
useGLTF.preload('https://res.cloudinary.com/didqmq9xz/image/upload/v1780959682/Untitled_oqnwi7.glb');
