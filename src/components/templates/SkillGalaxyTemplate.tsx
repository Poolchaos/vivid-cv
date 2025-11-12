import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { useResumeStore } from '../../store/resumeStore';
import { useRef } from 'react';
import { Group } from 'three';

function SkillOrb({
  position,
  skill,
  size,
  index,
}: {
  position: [number, number, number];
  skill: string;
  size: number;
  index: number;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2 + index;
      groupRef.current.position.x =
        position[0] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
      groupRef.current.position.z =
        position[2] + Math.cos(state.clock.elapsedTime * 0.5 + index) * 0.3;
    }
  });

  const colorMap: Record<string, string> = {
    expert: '#10b981',
    advanced: '#3b82f6',
    intermediate: '#f59e0b',
    beginner: '#64748b',
  };

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[size, 16, 16]}>
        <meshStandardMaterial
          color={colorMap[skill] || '#3b82f6'}
          emissive={colorMap[skill] || '#3b82f6'}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>

      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
      >
        {skill}
      </Text>
    </group>
  );
}

function SkillGalaxy() {
  const { skills, personalInfo } = useResumeStore();

  const sizeMap: Record<string, number> = {
    expert: 0.35,
    advanced: 0.28,
    intermediate: 0.22,
    beginner: 0.18,
  };

  const positionSkills = () => {
    return skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const radius = 2 + (index % 3) * 0.8;
      const height = Math.sin(angle * 2) * 1.5;

      return {
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        skill: skill.name,
        level: skill.level,
        size: sizeMap[skill.level] || 0.2,
      };
    });
  };

  const skillPositions = positionSkills();

  return (
    <group>
      {/* Center name sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <Text
        position={[0, 0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {personalInfo.fullName || 'Skills Galaxy'}
      </Text>

      {/* Skill orbs */}
      {skillPositions.map((item, index) => (
        <SkillOrb
          key={index}
          position={item.position}
          skill={item.skill}
          size={item.size}
          index={index}
        />
      ))}
    </group>
  );
}

export default function SkillGalaxyTemplate() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #0a0a1a, #000000)' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#10b981" />
        <SkillGalaxy />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          minDistance={5}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}
