import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

function Orb({ position, label, color, speed, radius }) {
  const meshRef = useRef()
  const groupRef = useRef()

  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if (groupRef.current) {
      if (hovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(2.5, 2.5, 2.5), 0.1)
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        groupRef.current.position.x = position[0] + Math.sin(t + position[0]) * radius
        groupRef.current.position.y = position[1] + Math.cos(t * 0.7 + position[1]) * radius * 0.6
      }
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.03 : 0.01
      meshRef.current.rotation.x += hovered ? 0.015 : 0.005
    }
  })

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          wireframe={false}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[0.235, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Label */}
      <Billboard>
        <Text
          position={[0, -0.38, 0]}
          fontSize={0.12}
          color={color}
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {label}
        </Text>
      </Billboard>

      {/* Point light for glow */}
      <pointLight color={color} intensity={0.3} distance={1.5} />
    </group>
  )
}

const orbData = [
  { label: 'Flutter', color: '#00e5ff', position: [-2.5, 1.2, 0], speed: 0.4, radius: 0.3 },
  { label: 'Dart', color: '#7b61ff', position: [2.8, 0.5, -0.5], speed: 0.35, radius: 0.25 },
  { label: 'BLoC', color: '#00e5ff', position: [-1.8, -1.5, 0.2], speed: 0.5, radius: 0.2 },
  { label: 'Firebase', color: '#ff6b35', position: [1.5, 1.8, -0.3], speed: 0.3, radius: 0.35 },
  { label: 'Node.js', color: '#68a063', position: [2.2, -1.2, 0.1], speed: 0.45, radius: 0.28 },
  { label: 'AWS', color: '#ff9500', position: [-2.8, 0.2, -0.4], speed: 0.38, radius: 0.22 },
  { label: 'Fastlane', color: '#7b61ff', position: [0.5, -2, 0], speed: 0.42, radius: 0.3 },
  { label: 'WebSockets', color: '#00e5ff', position: [-0.5, 2.2, -0.2], speed: 0.33, radius: 0.26 },
  { label: 'Supabase', color: '#3ecf8e', position: [3.2, 0, 0.3], speed: 0.48, radius: 0.2 },
  { label: 'MongoDB', color: '#47a248', position: [-3.0, -0.8, 0], speed: 0.36, radius: 0.24 },
]

export default function FloatingOrbs() {
  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#00e5ff" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#7b61ff" />
      {orbData.map((orb, i) => (
        <Orb key={i} {...orb} />
      ))}
    </group>
  )
}
