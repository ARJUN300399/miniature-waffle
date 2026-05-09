import { CuboidCollider, RigidBody } from '@react-three/rapier';

import { worldConfig } from '@/features/experience/config/experience.config';

const laneMarkerPositions = Array.from({ length: 32 }, (_, index) => index * -4 + 58);

export function World() {
  return (
    <group>
      <RigidBody colliders={false} type="fixed">
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[worldConfig.groundSize, worldConfig.groundSize]} />
          <meshStandardMaterial color="#384641" metalness={0.05} roughness={0.82} />
        </mesh>
        <CuboidCollider args={[worldConfig.groundSize / 2, 0.08, worldConfig.groundSize / 2]} />
      </RigidBody>

      <mesh receiveShadow position={[0, 0.012, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[worldConfig.roadWidth, worldConfig.roadLength]} />
        <meshStandardMaterial color="#242a2a" metalness={0.08} roughness={0.58} />
      </mesh>

      {laneMarkerPositions.map((z) => (
        <mesh key={z} position={[0, 0.018, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.16, 1.4]} />
          <meshStandardMaterial color="#d9dfd4" roughness={0.42} />
        </mesh>
      ))}

      <mesh
        receiveShadow
        position={[-worldConfig.roadWidth / 2 - 0.08, 0.02, -6]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.08, worldConfig.roadLength]} />
        <meshStandardMaterial color="#e6c863" roughness={0.4} />
      </mesh>
      <mesh
        receiveShadow
        position={[worldConfig.roadWidth / 2 + 0.08, 0.02, -6]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.08, worldConfig.roadLength]} />
        <meshStandardMaterial color="#e6c863" roughness={0.4} />
      </mesh>
    </group>
  );
}
