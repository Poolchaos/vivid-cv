'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';
import { useResumeStore } from '../../store/resumeStore';

function ResumeCard() {
  const { personalInfo, experience, education, skills } = useResumeStore();

  return (
    <group>
      {/* Front card - Personal Info */}
      <RoundedBox
        args={[4, 5.5, 0.1]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#3b82f6" />
      </RoundedBox>

      <Text
        position={[0, 2, 0.1]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {personalInfo.fullName || 'Your Name'}
      </Text>

      <Text
        position={[0, 1.4, 0.1]}
        fontSize={0.2}
        color="#e0e7ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {personalInfo.title || 'Professional Title'}
      </Text>

      <Text
        position={[0, 0.8, 0.1]}
        fontSize={0.15}
        color="#e0e7ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {personalInfo.email || 'email@example.com'}
      </Text>

      <Text
        position={[0, 0.5, 0.1]}
        fontSize={0.15}
        color="#e0e7ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {personalInfo.phone || 'Phone Number'}
      </Text>

      {/* Summary section */}
      <Text
        position={[0, -0.2, 0.1]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        lineHeight={1.5}
      >
        {personalInfo.summary
          ? personalInfo.summary.length > 200
            ? personalInfo.summary.substring(0, 200) + '...'
            : personalInfo.summary
          : 'Professional summary goes here...'}
      </Text>

      {/* Stats at bottom */}
      <group position={[-1.2, -2.2, 0.1]}>
        <Text fontSize={0.25} color="white" anchorX="center">
          {experience.length}
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#e0e7ff"
          anchorX="center"
        >
          Experience
        </Text>
      </group>

      <group position={[0, -2.2, 0.1]}>
        <Text fontSize={0.25} color="white" anchorX="center">
          {education.length}
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#e0e7ff"
          anchorX="center"
        >
          Education
        </Text>
      </group>

      <group position={[1.2, -2.2, 0.1]}>
        <Text fontSize={0.25} color="white" anchorX="center">
          {skills.length}
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#e0e7ff"
          anchorX="center"
        >
          Skills
        </Text>
      </group>
    </group>
  );
}

export default function CardFlipTemplate() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #1e293b, #0f172a)' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <ResumeCard />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
