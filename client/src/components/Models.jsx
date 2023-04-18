import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Model = ({ isMobile, name }) => {
  const sample = useGLTF("./scene.glb");
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={sample.scene}
        scale={isMobile ? 0.7 : 2.1}
        //position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        position-y={0}
        rotation-y={0}
        //    rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ModelCanvas = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ position: "absolute" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
          enableZoom={false}
        />
        <Model name={props.name} isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ModelCanvas;
