"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, RoundedBox, Line } from "@react-three/drei"
import * as THREE from "three"

interface AnimationProps {
  scrollProgress: number
}

function DonutChart({ scrollProgress }: AnimationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const prevScrollRef = useRef(scrollProgress)

  const segmentData = [
    { value: 15, color: "#5eead4" },
    { value: 12, color: "#2dd4bf" },
    { value: 14, color: "#14b8a6" },
    { value: 10, color: "#0d9488" },
    { value: 13, color: "#0f766e" },
    { value: 12, color: "#115e59" },
    { value: 14, color: "#134e4a" },
    { value: 10, color: "#1e3a3a" },
  ]

  // Calculate start angles
  let currentAngle = 0
  const segments = segmentData.map((seg) => {
    const startAngle = currentAngle
    currentAngle += (seg.value / 100) * Math.PI * 2
    return { ...seg, startAngle, thetaLength: (seg.value / 100) * Math.PI * 2 }
  })

  useFrame(() => {
    if (groupRef.current) {
      const scrollDelta = scrollProgress - prevScrollRef.current
      groupRef.current.rotation.z += scrollDelta * 15 // Multiply for more noticeable rotation

      // Add slight tilt based on scroll position for 3D depth
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.3
      groupRef.current.rotation.y = Math.cos(scrollProgress * Math.PI * 0.5) * 0.2

      prevScrollRef.current = scrollProgress
    }
  })

  return (
    <group ref={groupRef}>
      {segments.map((seg, i) => (
        <mesh key={i} position={[0, 0, i * 0.02]}>
          <ringGeometry args={[0.5, 1.1, 32, 1, seg.startAngle, seg.thetaLength]} />
          <meshStandardMaterial color={seg.color} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Inner glow ring */}
      <mesh position={[0, 0, 0.2]}>
        <ringGeometry args={[0.45, 0.55, 32]} />
        <meshStandardMaterial color="#5eead4" emissive="#5eead4" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
      <Text
        position={[0, 0, 0.25]}
        fontSize={0.25}
        color="#5eead4"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        PM
      </Text>
    </group>
  )
}

function NetworkAnimation({ scrollProgress }: AnimationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<(THREE.Mesh | null)[]>([])
  const prevScrollRef = useRef(scrollProgress)

  const nodePositions: [number, number, number][] = [
    [0, 0, 0],
    [1.2, 0.8, 0.3],
    [-1.2, 0.6, -0.2],
    [0.8, -1, 0.1],
    [-0.8, -0.8, -0.3],
    [0, 1.2, 0.2],
    [1.0, -0.3, -0.4],
    [-0.5, -1.2, 0.4],
  ]

  const connections: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 5],
    [2, 5],
    [3, 4],
    [6, 3],
    [7, 4],
    [1, 6],
  ]

  useFrame((state) => {
    if (groupRef.current) {
      const scrollDelta = scrollProgress - prevScrollRef.current
      groupRef.current.rotation.y += scrollDelta * 8
      groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5 - Math.PI * 0.25

      prevScrollRef.current = scrollProgress
    }

    nodesRef.current.forEach((node, i) => {
      if (node) {
        const baseScale = i === 0 ? 1.2 : 0.8
        const scrollScale = 1 + Math.sin(scrollProgress * Math.PI * 2 + i * 0.5) * 0.3
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1
        node.scale.setScalar(baseScale * scrollScale * pulseScale)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {connections.map(([start, end], i) => (
        <Line
          key={`line-${i}`}
          points={[nodePositions[start], nodePositions[end]]}
          color="#5eead4"
          lineWidth={1.5}
          transparent
          opacity={0.4 + scrollProgress * 0.3}
        />
      ))}
      {nodePositions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => {
            nodesRef.current[i] = el
          }}
        >
          <sphereGeometry args={[i === 0 ? 0.18 : 0.1, 16, 16]} />
          <meshStandardMaterial
            color={i === 0 ? "#5eead4" : "#2dd4bf"}
            emissive={i === 0 ? "#5eead4" : "#2dd4bf"}
            emissiveIntensity={0.4 + scrollProgress * 0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

function CodeAnimation({ scrollProgress }: AnimationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<(THREE.Mesh | null)[]>([])
  const prevScrollRef = useRef(scrollProgress)

  const codeLines = [
    { width: 1.5, y: 0.8, color: "#5eead4", indent: 0 },
    { width: 1.2, y: 0.5, color: "#2dd4bf", indent: 0.2 },
    { width: 0.8, y: 0.2, color: "#14b8a6", indent: 0.4 },
    { width: 1.0, y: -0.1, color: "#2dd4bf", indent: 0.4 },
    { width: 0.6, y: -0.4, color: "#5eead4", indent: 0.2 },
    { width: 1.3, y: -0.7, color: "#0d9488", indent: 0 },
    { width: 0.9, y: -1.0, color: "#14b8a6", indent: 0.3 },
  ]

  useFrame(() => {
    if (groupRef.current) {
      const scrollDelta = scrollProgress - prevScrollRef.current
      groupRef.current.rotation.y += scrollDelta * 5
      groupRef.current.rotation.x = (scrollProgress - 0.5) * 0.4
      groupRef.current.position.z = Math.sin(scrollProgress * Math.PI) * 0.3

      prevScrollRef.current = scrollProgress
    }

    linesRef.current.forEach((line, i) => {
      if (line) {
        // Lines expand as you scroll down, contract as you scroll up
        const lineProgress = Math.max(0, Math.min(1, (scrollProgress * codeLines.length - i) / 1.5))
        const scaleX = 0.1 + lineProgress * 0.9
        line.scale.set(scaleX, 1, 1)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Terminal window */}
      <RoundedBox args={[2.8, 2.8, 0.1]} radius={0.12} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#0a0a0f" />
      </RoundedBox>
      {/* Terminal header */}
      <RoundedBox args={[2.8, 0.3, 0.05]} radius={0.05} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#1a1a2e" />
      </RoundedBox>
      {/* Window buttons */}
      {[-1.15, -1.0, -0.85].map((x, i) => (
        <mesh key={i} position={[x, 1.25, 0.05]}>
          <circleGeometry args={[0.05, 16]} />
          <meshStandardMaterial color={["#ff5f56", "#ffbd2e", "#27ca40"][i]} />
        </mesh>
      ))}
      {/* Code lines */}
      {codeLines.map((line, i) => (
        <mesh
          key={i}
          position={[-1.1 + line.indent + line.width * 0.5, line.y, 0.02]}
          ref={(el) => {
            linesRef.current[i] = el
          }}
        >
          <planeGeometry args={[line.width, 0.12]} />
          <meshStandardMaterial color={line.color} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Cursor */}
      <mesh position={[-1.1 + 0.3 + codeLines[6].width * scrollProgress, -1.0, 0.03]}>
        <planeGeometry args={[0.08, 0.15]} />
        <meshStandardMaterial color="#5eead4" emissive="#5eead4" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function BookAnimation({ scrollProgress }: AnimationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pagesRef = useRef<(THREE.Mesh | null)[]>([])
  const capRef = useRef<THREE.Group>(null)
  const prevScrollRef = useRef(scrollProgress)

  useFrame((state) => {
    if (groupRef.current) {
      const scrollDelta = scrollProgress - prevScrollRef.current
      groupRef.current.rotation.y += scrollDelta * 6
      groupRef.current.rotation.x = (scrollProgress - 0.5) * 0.5
      groupRef.current.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.1

      prevScrollRef.current = scrollProgress
    }

    pagesRef.current.forEach((page, i) => {
      if (page) {
        const pageProgress = Math.max(0, Math.min(1, (scrollProgress * 5 - i) / 1.5))
        page.rotation.y = pageProgress * Math.PI * 0.6
        page.position.x = -0.5 + pageProgress * 0.3
      }
    })

    if (capRef.current) {
      capRef.current.position.y = 1.3 + Math.sin(scrollProgress * Math.PI * 2) * 0.3
      capRef.current.rotation.y = scrollProgress * Math.PI * 2
      capRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Book cover */}
      <RoundedBox args={[1.6, 2.0, 0.2]} radius={0.03} position={[0, 0, -0.15]}>
        <meshStandardMaterial color="#1a1a2e" />
      </RoundedBox>
      {/* Book spine */}
      <RoundedBox args={[0.2, 2.0, 0.2]} radius={0.03} position={[-0.8, 0, 0]}>
        <meshStandardMaterial color="#5eead4" />
      </RoundedBox>
      {/* Pages */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[-0.5, 0, 0.05 + i * 0.025]}
          ref={(el) => {
            pagesRef.current[i] = el
          }}
        >
          <planeGeometry args={[1.2, 1.8]} />
          <meshStandardMaterial color="#f8f8f8" side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Graduation cap */}
      <group ref={capRef} position={[0.4, 1.3, 0.3]}>
        <mesh>
          <boxGeometry args={[0.7, 0.06, 0.7]} />
          <meshStandardMaterial color="#5eead4" />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.22, 0.25, 6]} />
          <meshStandardMaterial color="#2dd4bf" />
        </mesh>
        {/* Tassel */}
        <mesh position={[0.25, 0.03, 0.25]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>
    </group>
  )
}

interface JourneySceneProps {
  animationType: string
  scrollProgress: number
}

export function JourneyScene({ animationType, scrollProgress }: JourneySceneProps) {
  const renderAnimation = () => {
    switch (animationType) {
      case "donut":
        return <DonutChart scrollProgress={scrollProgress} />
      case "network":
        return <NetworkAnimation scrollProgress={scrollProgress} />
      case "code":
        return <CodeAnimation scrollProgress={scrollProgress} />
      case "book":
        return <BookAnimation scrollProgress={scrollProgress} />
      default:
        return <DonutChart scrollProgress={scrollProgress} />
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#5eead4" />
      <spotLight position={[0, 5, 5]} intensity={0.5} color="#2dd4bf" angle={0.5} />
      {renderAnimation()}
    </Canvas>
  )
}
