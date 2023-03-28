// 3D Rendering tools
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three'
// IK utils
import { MathUtils, QuaternionO, Range, Solve3D, V3, V3O } from 'inverse-kinematics'
import { Base } from './3D-components/Base'
import { JointTransforms } from './3D-components/JointTransforms'
import { Logger } from './3D-components/Logger'
import { Target } from './3D-components/Target'
import { useAnimationFrame } from './3D-components/useAnimationFrame'

import  { useRef, useState, useEffect} from 'react'

export default function InverseKinematics() {
    const ref = useRef<Mesh<BoxGeometry, MeshNormalMaterial>>()
    const refToInverseKinematics = useRef(null);

    const [target, setTarget] = useState([0, 0, 0] as V3)
    const [transforms, setTransforms] = useState<Solve3D.JointTransform[]>()
    const pi = 3.14159
    const baseConstraint = {yaw:{min: 0, max: 2*pi}, pitch:{min: 0, max: 0}, roll:{min: 0, max: 0}} //in the stimulation, the base and the shoulder are the same joint
    const shoulderConstraint = {yaw:{min: 0, max: 0}, pitch:{min: 0, max: pi}, roll:{min: 0, max: 0}}
    const elbowConstraint = {yaw:{min: 0, max: 0}, pitch:{min: 0, max: 0}, roll:{min: -pi/2, max: pi/2}}
    const [links, setLinks] = useState([
        { position: [0, 0, 0], rotation: QuaternionO.zeroRotation(), constraints: baseConstraint },
        { position: [0,0, 0.25], rotation: QuaternionO.zeroRotation(), contraints: elbowConstraint},  
        { position: [0, 0, 1.5], rotation: QuaternionO.zeroRotation(), constraints: shoulderConstraint },
        { position: [0, 0, 1], rotation: QuaternionO.zeroRotation() },
        // { position: [0, 0, 1], rotation: QuaternionO.zeroRotation() },
    ] as Solve3D.Link[])
    const base: Solve3D.JointTransform = {
      position: [0, 0, 0],
      rotation: QuaternionO.zeroRotation(),
    }

    // useEffect(()=>{
    //   const element = refToInverseKinematics.current;
    // },[target])
    // console.log(refToInverseKinematics.current)
    //without ref code:
    // let element2 = document.querySelector("inverse-kin")
    //   let rect = element.getBoundingClientRect();
    //   console.log(rect.x);
    //   console.log(rect.y);
    useAnimationFrame(60, () => {
        const knownRangeOfMovement = links.length * 1 //originally 4
    
        function learningRate(errorDistance: number): number {
          const relativeDistanceToTarget = MathUtils.clamp(errorDistance / knownRangeOfMovement, 0, 1)
          const cutoff = 0.5
    
          if (relativeDistanceToTarget > cutoff) {
            return 10e-3
          }
    
          // result is between 0 and 1
          const remainingDistance = relativeDistanceToTarget / 0.02
          const minimumLearningRate = 10e-4
    
          return (minimumLearningRate + remainingDistance * 10e-4) / knownRangeOfMovement
        }
    
        const result = Solve3D.solve(links, base, target, {
          method: 'FABRIK',
          learningRate,
          acceptedError: 0,
        }).links
    
        links.forEach((_, index) => {
          links[index] = result[index]!
        })
      })
    
    return (
        <div ref={refToInverseKinematics} className="inverse-kin">
          <Canvas
            linear
          >
            <OrbitControls />
            <group>
              <Base base={base} links={links} />
              <JointTransforms links={links} base={base} setTransforms={setTransforms} />
              <Target 
              position={target} 
              setPosition={setTarget} 
                // width={refToInverseKinematics.current.clientWidth} 
                // height={refToInverseKinematics.current.clientHeight}
              />
              
              
              
            </group>
          </Canvas>
          <Logger target={target} links={links} base={base}/>
        </div>
      )
}