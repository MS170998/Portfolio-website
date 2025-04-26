import { useAnimations, useGLTF, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import spacemanScene from "../assets/3d/spaceman.glb";
import CanvasLoader from "./Loader";

// Floating particles component to enhance space atmosphere
const SpaceParticles = () => {
  const particlesRef = useRef();
  // Reduced particle count for better performance
  const count = 100;
  
  // Use useMemo to prevent recreating the particles on every render
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    return [positions, sizes];
  }, []);
  
  // Optimize animation with a lower update frequency
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    // Slow down rotation for better performance
    particlesRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          itemSize={3} 
          array={positions} 
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          itemSize={1}
          array={sizes}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        sizeAttenuation={true} 
        color="#ffffff" 
        transparent 
        opacity={0.6}
      />
    </points>
  );
};

// Use memo to prevent unnecessary re-renders
const Spaceman = ({ scale, position, mouseX, mouseY }) => {
  const spacemanRef = useRef();
  // Optimize 3D model loading with suspense and preload
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, spacemanRef);
  
  // Track velocity for more natural movement
  const velocityRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  
  useEffect(() => {
    actions["Idle"].play();
  }, [actions]);

  // Optimize frame updates with RAF throttling
  useFrame((state, delta) => {
    if (!spacemanRef.current) return;
    
    // Physics constants
    const springStrength = 2; // Reduced for smoother movement
    const damping = 0.92; // Increased for less oscillation
    const maxVelocity = 0.15; // Reduced max speed
    
    // Target positions based on mouse
    const targetRotY = 2.2 + mouseX * 0.15;
    const targetRotX = mouseY * 0.08;
    const targetPosX = position[0] + mouseX * 0.1;
    const targetPosY = position[1] + mouseY * 0.08;
    
    // Calculate spring forces (only if movement is significant)
    let forceRotY = Math.abs(targetRotY - spacemanRef.current.rotation.y) > 0.001 
      ? (targetRotY - spacemanRef.current.rotation.y) * springStrength : 0;
    let forceRotX = Math.abs(targetRotX - spacemanRef.current.rotation.x) > 0.001 
      ? (targetRotX - spacemanRef.current.rotation.x) * springStrength : 0;
    let forcePosX = Math.abs(targetPosX - spacemanRef.current.position.x) > 0.001 
      ? (targetPosX - spacemanRef.current.position.x) * springStrength : 0;
    let forcePosY = Math.abs(targetPosY - spacemanRef.current.position.y) > 0.001 
      ? (targetPosY - spacemanRef.current.position.y) * springStrength : 0;
    
    // Update velocities with forces and apply damping
    velocityRef.current.rotY = (velocityRef.current.rotY + forceRotY * delta) * damping;
    velocityRef.current.rotX = (velocityRef.current.rotX + forceRotX * delta) * damping;
    velocityRef.current.x = (velocityRef.current.x + forcePosX * delta) * damping;
    velocityRef.current.y = (velocityRef.current.y + forcePosY * delta) * damping;
    
    // Limit maximum velocity
    velocityRef.current.rotY = Math.max(Math.min(velocityRef.current.rotY, maxVelocity), -maxVelocity);
    velocityRef.current.rotX = Math.max(Math.min(velocityRef.current.rotX, maxVelocity), -maxVelocity);
    velocityRef.current.x = Math.max(Math.min(velocityRef.current.x, maxVelocity), -maxVelocity);
    velocityRef.current.y = Math.max(Math.min(velocityRef.current.y, maxVelocity), -maxVelocity);
    
    // Apply velocities to spaceman
    spacemanRef.current.rotation.y += velocityRef.current.rotY;
    spacemanRef.current.rotation.x += velocityRef.current.rotX;
    spacemanRef.current.position.x += velocityRef.current.x;
    spacemanRef.current.position.y += velocityRef.current.y;
    
    // Add subtle floating motion (reduced frequency)
    spacemanRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.001;
    spacemanRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.01;
  });

  return (
    <mesh ref={spacemanRef} position={position} scale={scale} rotation={[0, 2.2, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};

const SpacemanCanvas = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -0.7, 0]);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef();
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Throttle scroll events for better performance
    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;
      
      scrollTimeoutRef.current = setTimeout(() => {
        if (!scrollContainer.current) return;
        
        const scrollTop = scrollContainer.current.scrollTop;
        const rotationXValue = scrollTop * -0.0006;
        const rotationYValue = scrollTop * -0.00075;
        setRotationX(rotationXValue);
        setRotationY(rotationYValue);
        
        scrollTimeoutRef.current = null;
      }, 16); // ~60fps
    };

    // Optimize mouse move events with throttling
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized values between -1 and 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Store target values
      targetMouseRef.current = { x, y };
    };
    
    // Animation frame for smooth mouse interpolation
    const smoothMouseMovement = () => {
      // Slower interpolation for better performance
      setMouseX(prev => prev + (targetMouseRef.current.x - prev) * 0.03);
      setMouseY(prev => prev + (targetMouseRef.current.y - prev) * 0.03);
      
      frameRef.current = requestAnimationFrame(smoothMouseMovement);
    };
    
    frameRef.current = requestAnimationFrame(smoothMouseMovement);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale([1, 1, 1]);
        setPosition([0.2, -0.1, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([1.33, 1.33, 1.33]);
        setPosition([0.2, -0.3, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([1.5, 1.5, 1.5]);
        setPosition([0.2, -0.4, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([1.66, 1.66, 1.66]);
        setPosition([0.2, -0.5, 0]);
      } else {
        setScale([2, 2, 2]);
        setPosition([0.2, -0.7, 0]);
      }
    };

    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [scrollContainer]);

  // Lower pixel ratio for better performance
  const pixelRatio = Math.min(window.devicePixelRatio, 2);

  return (
    <Canvas 
      className={`w-full h-screen bg-transparent z-10 space-canvas`} 
      camera={{ near: 0.1, far: 1000 }}
      dpr={pixelRatio}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <fog attach="fog" args={["#011825", 5, 30]} />
        
        {/* Main directional light (sun) */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
        />
        
        {/* Ambient light for overall scene brightness */}
        <ambientLight intensity={0.3} />
        
        {/* Blue rim light for atmosphere */}
        <pointLight 
          position={[-10, 0, -10]} 
          color="#0077ff" 
          intensity={1} 
        />
        
        {/* Reduce number of lights for better performance */}
        <hemisphereLight 
          skyColor="#b1e1ff" 
          groundColor="#000033" 
          intensity={0.8} 
        />
        
        {/* Optimize stars with lower count */}
        <Stars 
          radius={100} 
          depth={50} 
          count={2500} 
          factor={4} 
          saturation={0} 
          fade
          speed={0.3}
        />
        
        <SpaceParticles />

        <Spaceman 
          rotationX={rotationX} 
          rotationY={rotationY} 
          scale={scale} 
          position={position}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </Suspense>
    </Canvas>
  );
};

// Preload the 3D model to prevent lag when scrolling
useGLTF.preload(spacemanScene);

export default SpacemanCanvas;
