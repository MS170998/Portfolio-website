import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, Suspense, useEffect, useRef, useState } from "react";
import spacemanScene from "../assets/3d/spaceman.glb";

function Astronaut({ motionEnabled }) {
  const group = useRef();
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions.Idle || Object.values(actions)[0];
    if (action) {
      action.play();
      action.paused = !motionEnabled;
    }
    return () => action?.stop();
  }, [actions, motionEnabled]);
  useFrame((state, delta) => {
    if (!group.current || !motionEnabled) return;
    const t = state.clock.elapsedTime;
    const fall = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    const smoothing = 1 - Math.exp(-3 * Math.min(delta, 0.1));
    group.current.rotation.y +=
      (2.2 + state.pointer.x * 0.16 - group.current.rotation.y) * smoothing;
    group.current.rotation.x +=
      (state.pointer.y * 0.1 - fall * 0.3 - group.current.rotation.x) *
      smoothing;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.045 - fall * 0.22;
    group.current.position.y = -0.5 + Math.sin(t * 0.65) * 0.08 - fall * 0.6;
  });
  return (
    <group
      ref={group}
      position={[0, -0.5, 0]}
      scale={1.55}
      rotation={[0, 2.2, -0.08]}
    >
      <primitive object={scene} />
    </group>
  );
}
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="scene-fallback">
        <span>✳</span>
        <p>A little curiosity goes a long way.</p>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function SpacemanCanvas({ motionEnabled = true }) {
  const container = useRef();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} className="astronaut-canvas">
      <SceneBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          frameloop={visible && motionEnabled ? "always" : "demand"}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <hemisphereLight
            color="#b1e1ff"
            groundColor="#203548"
            intensity={0.8}
          />
          <Suspense fallback={null}>
            <Astronaut motionEnabled={motionEnabled} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
