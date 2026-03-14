import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

export default function AboutOrb() {
  const meshRef = useRef()
  const outerRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2
      meshRef.current.rotation.y = t * 0.3
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -t * 0.15
      outerRef.current.rotation.z = t * 0.1
    }
  })

  return (
    <group>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#7b61ff"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive="#7b61ff"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Outer ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.9, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#7b61ff"
          emissive="#7b61ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Floating dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00e5ff' : '#7b61ff'}
              emissive={i % 2 === 0 ? '#00e5ff' : '#7b61ff'}
              emissiveIntensity={2}
            />
          </mesh>
        )
      })}

      {/* Glow lights */}
      <pointLight color="#00e5ff" intensity={2} distance={5} position={[2, 2, 2]} />
      <pointLight color="#7b61ff" intensity={1.5} distance={4} position={[-2, -2, 1]} />
    </group>
  )
}
