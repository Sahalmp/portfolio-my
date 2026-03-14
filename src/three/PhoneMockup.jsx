import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Screen() {
  return (
    <mesh position={[0, 0, 0.061]}>
      <planeGeometry args={[0.72, 1.42]} />
      <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.5} />
    </mesh>
  )
}

function AppContent() {
  return (
    <group position={[0, 0, 0.065]}>
      {/* Status bar */}
      <mesh position={[0, 0.62, 0]}>
        <planeGeometry args={[0.68, 0.06]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* App header */}
      <mesh position={[0, 0.5, 0]}>
        <planeGeometry args={[0.68, 0.12]} />
        <meshStandardMaterial color="#00e5ff" opacity={0.15} transparent />
      </mesh>

      {/* Content blocks */}
      {[0.32, 0.15, -0.02, -0.18, -0.35].map((y, i) => (
        <mesh key={i} position={[i % 2 === 0 ? -0.12 : 0.1, y, 0]}>
          <planeGeometry args={[i % 2 === 0 ? 0.42 : 0.24, 0.09]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#00e5ff' : i % 3 === 1 ? '#7b61ff' : '#ffffff'}
            opacity={0.12}
            transparent
          />
        </mesh>
      ))}

      {/* Bottom nav bar */}
      <mesh position={[0, -0.58, 0]}>
        <planeGeometry args={[0.68, 0.1]} />
        <meshStandardMaterial color="#111111" opacity={0.9} transparent />
      </mesh>

      {[-0.22, 0, 0.22].map((x, i) => (
        <mesh key={i} position={[x, -0.58, 0.001]}>
          <circleGeometry args={[0.022, 16]} />
          <meshStandardMaterial
            color={i === 1 ? '#00e5ff' : '#ffffff'}
            opacity={i === 1 ? 0.9 : 0.3}
            transparent
          />
        </mesh>
      ))}
    </group>
  )
}

export default function PhoneMockup() {
  const group = useRef()
  const innerGlow = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.5) * 0.4
      group.current.rotation.x = Math.sin(t * 0.3) * 0.1
      group.current.position.y = Math.sin(t * 0.8) * 0.15
    }
  })

  return (
    <group ref={group} scale={[1.2, 1.2, 1.2]}>
      {/* Phone body */}
      <RoundedBox args={[0.9, 1.8, 0.1]} radius={0.1} smoothness={8}>
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Screen */}
      <Screen />
      <AppContent />

      {/* Camera notch */}
      <mesh position={[0, 0.81, 0.062]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Side buttons */}
      <mesh position={[0.47, 0.3, 0]}>
        <boxGeometry args={[0.04, 0.15, 0.08]} />
        <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.47, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, 0.08]} />
        <meshStandardMaterial color="#222244" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glow effect */}
      <pointLight
        ref={innerGlow}
        position={[0, 0, 0.5]}
        intensity={1.5}
        distance={3}
        color="#00e5ff"
      />

      {/* Floating geometric accents */}
      <FloatingAccent position={[-1.2, 0.8, -0.5]} color="#00e5ff" />
      <FloatingAccent position={[1.0, -0.6, -0.3]} color="#7b61ff" />
      <FloatingAccent position={[1.4, 0.5, -0.8]} color="#00e5ff" />
    </group>
  )
}

function FloatingAccent({ position, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.x = t * 0.5
      ref.current.rotation.z = t * 0.3
      ref.current.position.y = position[1] + Math.sin(t * 0.7 + position[0]) * 0.15
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.12, 0]} />
      <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}
