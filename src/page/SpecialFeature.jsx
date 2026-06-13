import React, { useRef, useState, useLayoutEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SpecialFeature.css';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Preload the 3D model
const GLB_URL = 'https://res.cloudinary.com/didqmq9xz/image/upload/v1780954664/Untitled_pbyeba.glb';
useGLTF.preload(GLB_URL);

// Coffee Cup Component
const CoffeeCup = React.forwardRef(({ onLoadComplete, onHover, onHoverOut }, ref) => {
  const { scene } = useGLTF(GLB_URL);

  useLayoutEffect(() => {
    if (scene) {
      onLoadComplete();
    }
  }, [scene, onLoadComplete]);

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
      <primitive 
        ref={ref} 
        object={scene} 
        scale={[14.4, 14.4, 14.4]} 
        position={[0, -1.2, 0]} 
        // 3D Model Hover Detection - Only active for mouse to fix mobile scrolling
        onPointerOver={(e) => {
          e.stopPropagation();
          if (e.pointerType === 'mouse') {
            onHover();
            document.body.style.cursor = 'grab';
          }
        }}
        onPointerOut={(e) => {
          if (e.pointerType === 'mouse') {
            onHoverOut();
            document.body.style.cursor = 'auto';
          }
        }}
      />
    </Float>
  );
});

export default function SpecialFeature() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Model hover state

  // Refs
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const controlsRef = useRef(null);
  
  const introRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const text6Ref = useRef(null); // Final Text

  useLayoutEffect(() => {
    if (!isLoaded || !modelRef.current || !cameraRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // OPTIMIZED MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Reduced to 600% for 6 items to make scrolling smoother and faster
          scrub: 1,      // Scrub 1 provides a very smooth, lag-free response
          pin: true,
          anticipatePin: 1
        },
      });

      const allTexts = [
        text1Ref.current, text2Ref.current, text3Ref.current, 
        text4Ref.current, text5Ref.current, text6Ref.current
      ];

      // Initial Setup
      gsap.set(allTexts, { opacity: 0, y: 40 });
      gsap.set(introRef.current, { opacity: 1, y: 0 });
      cameraRef.current.position.set(0, 0, 6.5);

      // 1. Fade out Intro instantly
      tl.to(introRef.current, { opacity: 0, y: -40, duration: 0.5, ease: "power1.inOut" }, 0);

      // --- CONTINUOUS BACKGROUND ANIMATION (ZOOM & CAMERA) ---
      // These run smoothly across the entire timeline (duration 6 to match 6 texts)
      tl.to(modelRef.current.scale, { x: 34, y: 34, z: 34, ease: "none", duration: 6 }, 0);
      tl.to(cameraRef.current.position, { y: 6.8, z: 2.8, ease: "none", duration: 6 }, 0);
      
      const cameraTarget = { y: 0 };
      tl.to(cameraTarget, {
        y: 1.2,
        ease: "none",
        duration: 6,
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.target.set(0, cameraTarget.y, 0);
            controlsRef.current.update();
          }
        }
      }, 0);

      // --- NO-DELAY TEXT & ROTATION SEQUENCE ---
      const rotateStep = Math.PI * 0.7; 

      allTexts.forEach((text, index) => {
        // Calculate exact start time for each sequence to eliminate delays
        const startTime = index * 1; 

        // Smooth Rotation
        tl.to(modelRef.current.rotation, { y: rotateStep * (index + 1), ease: "power2.inOut", duration: 1 }, startTime);

        // Text Fades In
        tl.to(text, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, startTime + 0.2);

        // Text Fades Out (Except for the final text block which is index 5)
        if (index < 5) {
          tl.to(text, { opacity: 0, y: -30, duration: 0.3, ease: "power2.in" }, startTime + 0.8);
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section className="special-feature" ref={containerRef}>
      {/* Intro */}
      <div className="sf-intro" ref={introRef}>
        <span className="sf-label">SPECIAL FEATURE</span>
        <h2 className="sf-heading">Experience Every Detail of Premium Coffee</h2>
        <p className="sf-desc">
          Discover the craftsmanship behind every cup. Scroll to explore the aroma, texture, and richness of Ivori Coffee through an immersive 3D experience.
        </p>
      </div>

      {/* 5 Floating Texts Sequence */}
      <div className="sf-text-block right" ref={text1Ref}>
        <h3>Premium Roasted Beans</h3>
        <p>Carefully selected beans roasted to perfection.</p>
      </div>
      <div className="sf-text-block left" ref={text2Ref}>
        <h3>Ethically Sourced</h3>
        <p>Harvested from sustainable, high-altitude farms for the purest quality.</p>
      </div>
      <div className="sf-text-block right" ref={text3Ref}>
        <h3>Rich Aroma</h3>
        <p>An unforgettable fragrance crafted for true coffee lovers.</p>
      </div>
      <div className="sf-text-block left" ref={text4Ref}>
        <h3>Precision Brewing</h3>
        <p>Engineered to extract the perfect tasting notes, every single time.</p>
      </div>
      <div className="sf-text-block right" ref={text5Ref}>
        <h3>Exceptional Taste</h3>
        <p>Balanced flavor with smooth texture and deep character.</p>
      </div>

      {/* Final Text (Center) */}
      <div className="sf-text-block center final" ref={text6Ref}>
        <h3>Crafted for the Perfect Moment</h3>
        <p>Every sip of Ivori Coffee is designed to deliver warmth, comfort, and an unforgettable premium experience.</p>
      </div>

      {/* 3D Canvas Layer */}
      <div className="sf-canvas-container">
        <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault ref={cameraRef} />
          
          {/* Active only on hover for smooth scrolling anywhere else */}
          <OrbitControls 
            ref={controlsRef} 
            enabled={isHovered} 
            enablePan={false}
            enableZoom={true}
          />

          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F5E6D3" />
            <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#D4A574" />
            <Environment preset="city" />

            <CoffeeCup
              ref={modelRef}
              onLoadComplete={() => setIsLoaded(true)}
              onHover={() => setIsHovered(true)}
              onHoverOut={() => setIsHovered(false)}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
