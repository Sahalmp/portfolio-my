import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingEnvelope() {
  const group = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.5) * 0.5
      group.current.rotation.x = Math.sin(t * 0.3) * 0.1
      group.current.position.y = Math.sin(t * 0.8) * 0.15
    }
  })

  return (
    <group ref={group} scale={[1.3, 1.3, 1.3]}>
      {/* Envelope body */}
      <mesh>
        <boxGeometry args={[2, 1.3, 0.08]} />
        <meshStandardMaterial color="#111122" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Left diagonal crease */}
      <mesh position={[-0.55, 0, 0.045]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} />
      </mesh>

      {/* Right diagonal crease */}
      <mesh position={[0.55, 0, 0.045]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} />
      </mesh>

      {/* Envelope outline glow */}
      <mesh>
        <boxGeometry args={[2.02, 1.32, 0.09]} />
        <meshStandardMaterial
          color="#7b61ff"
          emissive="#7b61ff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* @ symbol ring */}
      <mesh position={[0, -0.1, 0.05]}>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshStandardMaterial color="#7b61ff" emissive="#7b61ff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, -0.1, 0.05]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#111122" />
      </mesh>

      {/* Floating particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <FloatingParticle
          key={i}
          offset={(i / 5) * Math.PI * 2}
          radius={1.5}
          color={i % 2 === 0 ? '#00e5ff' : '#7b61ff'}
        />
      ))}

      {/* Lights */}
      <pointLight color="#00e5ff" intensity={1.5} distance={4} position={[0, 0, 2]} />
      <pointLight color="#7b61ff" intensity={1} distance={3} position={[2, 1, 1]} />
    </group>
  )
}

function FloatingParticle({ offset, radius, color }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + offset
    if (ref.current) {
      ref.current.position.x = Math.cos(t * 0.6) * radius
      ref.current.position.y = Math.sin(t * 0.4) * 0.6
      ref.current.position.z = Math.sin(t * 0.6) * 0.5
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}
