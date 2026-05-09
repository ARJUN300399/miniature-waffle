import { useMemo } from 'react';
import { Color, Quaternion, Vector3 } from 'three';

type TubeProps = {
  end: [number, number, number];
  radius?: number;
  start: [number, number, number];
};

const frameMaterial = {
  color: new Color('#d7e2dc'),
  metalness: 0.68,
  roughness: 0.24,
};

function Tube({ end, radius = 0.035, start }: TubeProps) {
  const transform = useMemo(() => {
    const from = new Vector3(...start);
    const to = new Vector3(...end);
    const direction = to.clone().sub(from);
    const midpoint = from.clone().add(to).multiplyScalar(0.5);
    const quaternion = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      direction.clone().normalize(),
    );

    return {
      length: direction.length(),
      midpoint,
      quaternion,
    };
  }, [end, start]);

  return (
    <mesh castShadow position={transform.midpoint} quaternion={transform.quaternion}>
      <cylinderGeometry args={[radius, radius, transform.length, 18]} />
      <meshStandardMaterial {...frameMaterial} />
    </mesh>
  );
}

function Wheel({ z }: { z: number }) {
  return (
    <group position={[0, 0.38, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.12, 48]} />
        <meshStandardMaterial color="#111515" metalness={0.18} roughness={0.62} />
      </mesh>
      <mesh castShadow>
        <cylinderGeometry args={[0.29, 0.29, 0.13, 48]} />
        <meshStandardMaterial color="#c8d3ce" metalness={0.72} roughness={0.22} />
      </mesh>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.18, 32]} />
        <meshStandardMaterial color="#2a3433" metalness={0.75} roughness={0.2} />
      </mesh>
    </group>
  );
}

function RiderProxy() {
  return (
    <group position={[0, 1.12, -0.08]}>
      <mesh castShadow position={[0, 0.14, 0]} rotation={[0.22, 0, 0]}>
        <capsuleGeometry args={[0.17, 0.48, 8, 18]} />
        <meshStandardMaterial color="#29312f" metalness={0.08} roughness={0.56} />
      </mesh>
      <mesh castShadow position={[0, 0.56, -0.04]}>
        <sphereGeometry args={[0.16, 32, 18]} />
        <meshStandardMaterial color="#cfa584" roughness={0.45} />
      </mesh>
      <Tube start={[-0.12, 0.18, -0.12]} end={[-0.32, -0.12, -0.55]} radius={0.045} />
      <Tube start={[0.12, 0.18, -0.12]} end={[0.32, -0.12, -0.55]} radius={0.045} />
      <Tube start={[-0.12, 0.2, 0.12]} end={[-0.22, -0.16, 0.48]} radius={0.045} />
      <Tube start={[0.12, 0.2, 0.12]} end={[0.22, -0.16, 0.48]} radius={0.045} />
    </group>
  );
}

export function BikeModel() {
  return (
    <group>
      <Wheel z={-0.78} />
      <Wheel z={0.78} />

      <Tube start={[0, 0.38, -0.78]} end={[0, 0.78, -0.1]} />
      <Tube start={[0, 0.38, 0.78]} end={[0, 0.78, -0.1]} />
      <Tube start={[0, 0.38, -0.78]} end={[0, 0.72, 0.58]} />
      <Tube start={[0, 0.72, 0.58]} end={[0, 0.78, -0.1]} />
      <Tube start={[0, 0.72, 0.58]} end={[0, 0.38, 0.78]} />
      <Tube start={[0, 0.78, -0.1]} end={[0, 1.02, -0.38]} radius={0.04} />
      <Tube start={[0, 0.38, -0.78]} end={[0, 1, -0.86]} radius={0.032} />
      <Tube start={[-0.28, 1.04, -0.9]} end={[0.28, 1.04, -0.9]} radius={0.032} />

      <mesh castShadow position={[0, 0.89, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.46, 18]} />
        <meshStandardMaterial color="#171b1b" metalness={0.3} roughness={0.45} />
      </mesh>

      <RiderProxy />
    </group>
  );
}
