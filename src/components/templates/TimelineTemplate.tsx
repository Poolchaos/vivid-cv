import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { useResumeStore } from '../../store/resumeStore';
import { useRef } from 'react';
import { Group } from 'three';

function TimelineNode({
  position,
  label,
  detail,
  date,
  index,
}: {
  position: [number, number, number];
  label: string;
  detail: string;
  date: string;
  index: number;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + index) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Node sphere */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>

      {/* Label */}
      <Text
        position={[0.5, 0.3, 0]}
        fontSize={0.15}
        color="white"
        anchorX="left"
        anchorY="middle"
        maxWidth={2}
      >
        {label}
      </Text>

      {/* Detail */}
      <Text
        position={[0.5, 0, 0]}
        fontSize={0.1}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        maxWidth={2}
      >
        {detail}
      </Text>

      {/* Date */}
      <Text
        position={[0.5, -0.2, 0]}
        fontSize={0.08}
        color="#64748b"
        anchorX="left"
        anchorY="middle"
        maxWidth={2}
      >
        {date}
      </Text>
    </group>
  );
}

function Timeline() {
  const { experience, education, personalInfo } = useResumeStore();

  const timelineItems = [
    ...experience.map((exp) => ({
      type: 'experience',
      label: exp.position,
      detail: exp.company,
      date: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
    })),
    ...education.map((edu) => ({
      type: 'education',
      label: edu.degree,
      detail: edu.institution,
      date: `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`,
    })),
  ].slice(0, 8);

  const spacing = 1.2;
  const linePoints = timelineItems.map((_, i) => [0, i * -spacing, 0]);

  return (
    <group position={[0, (timelineItems.length * spacing) / 2, 0]}>
      {/* Title */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {personalInfo.fullName || 'Career Timeline'}
      </Text>

      {/* Timeline line */}
      {linePoints.length > 1 && (
        <Line
          points={linePoints as [number, number, number][]}
          color="#475569"
          lineWidth={2}
        />
      )}

      {/* Timeline nodes */}
      {timelineItems.map((item, index) => (
        <TimelineNode
          key={index}
          position={[0, index * -spacing, 0]}
          label={item.label}
          detail={item.detail}
          date={item.date}
          index={index}
        />
      ))}
    </group>
  );
}

export default function TimelineTemplate() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 0, 5], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #0f172a, #020617)' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />
        <Timeline />
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}
