import * as THREE from "three"

export default function AxisHelper(){
    return(
        <group>
              <primitive object={new THREE.AxesHelper(1)} />
                
                <mesh> 
                    <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
                    <meshBasicMaterial attach="material" color="lightblue" />
                </mesh>
        </group>
       
    )
}