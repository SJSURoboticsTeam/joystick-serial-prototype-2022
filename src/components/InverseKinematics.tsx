// 3D Rendering tools
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from "three"
import { BoxGeometry, Mesh, MeshNormalMaterial, Quaternion } from 'three'
// IK utils
import { MathUtils, QuaternionO, Range, Solve3D, V3, V3O } from 'inverse-kinematics'
import { Base } from './3D-components/Base'
import { JointTransforms } from './3D-components/JointTransforms'
import { Logger } from './3D-components/Logger'
import { Target } from './3D-components/Target'
import { useAnimationFrame } from './3D-components/useAnimationFrame'

import  { useRef, useState, useEffect} from 'react'
import { randFloat, randInt } from 'three/src/math/MathUtils'
import AxisHelper from './3D-components/AxisHelper'

export default function InverseKinematics() {
    const ref = useRef<Mesh<BoxGeometry, MeshNormalMaterial>>()
    const refToInverseKinematics = useRef(null);

    // const [target, setTarget] = useState([0.6091613387061174, 0.020408187480864926, -0.9999254846613541] as V3)
    // const [target, setTarget] = useState([.5, .5, -0.5] as V3)
    const [target, setTarget] = useState([1, 1.1, 0] as V3)
    const [transforms, setTransforms] = useState<Solve3D.JointTransform[]>()

    const degToRad = (degrees : number) => {
      return degrees*Math.PI/180
    }

    const radToDeg = (rads : number) => {
      return rads*180/Math.PI
    }

    const quatToEuler = (q : Quaternion) => {
      const sinrCosp = 2 * (q.w*q.x + q.y*q.z)
      const cosrCosp = 1 - 2 * (q.x*q.x + q.y*q.y)
      const roll = Math.atan2(sinrCosp, cosrCosp)

      const sinp = Math.sqrt(1 + 2* (q.w * q.y - q.x*q.z))
      const cosp = Math.sqrt(1 - 2* (q.w * q.y - q.x*q.z))
      const pitch = 2 * Math.atan2(sinp, cosp) - Math.PI/2

      const sinyCosp = 2 * (q.w*q.z + q.y*q.x)
      const cosyCosp = 1 - 2 * (q.y*q.y + q.z*q.z)
      const yaw = Math.atan2(sinyCosp, cosyCosp)

      return [roll, pitch, yaw]
    }

    const anglesFromWorldQs = (q1 : Quaternion, q2: Quaternion) => {
      const relativeWorldQ = new Quaternion().multiplyQuaternions(q2.conjugate(), q1)
      const euler = quatToEuler(relativeWorldQ)
      return euler.map(e => radToDeg(e))
    }

    const motorAngles = (joints : Solve3D.JointTransform[]) => {
      // Extract quaternions
      // const baseQ = new Quaternion().fromArray(joints[0].rotation)
      const rotundaQ =  new Quaternion().fromArray(joints[1].rotation)
      const shoulderQ = new Quaternion().fromArray(joints[2].rotation)
      const elbowQ = new Quaternion().fromArray(joints[3].rotation)
      
      // Rotunda
      const rotundaEuler = quatToEuler(rotundaQ)
      const rotundaAngle = radToDeg(rotundaEuler[0]) + radToDeg(rotundaEuler[1]) // Rotation about y has range [-90,90], rotation about x is either 0 or 180

      // Shoulder
      const shoulderAngles = anglesFromWorldQs(shoulderQ, rotundaQ)
      const shoulderAngle = shoulderAngles[2]

      // Elbow
      const elbowAngles = anglesFromWorldQs(elbowQ, shoulderQ)
      const elbowAngle = elbowAngles[2]

      return [rotundaAngle, shoulderAngle, elbowAngle]
    }
    
    const rotundaConstraint = {yaw:degToRad(360), pitch:0, roll:{min: 0, max: 0}} //in the stimulation, the base and the shoulder are the same joint
    const shoulderConstraint = {yaw:{min: 0, max: 0}, pitch:{min: 0, max: 0}, roll:{min:degToRad(-90),max:degToRad(10)}}
    const elbowConstraint = {yaw:{min: 0, max: 0}, pitch:{min: 0, max: 0}, roll:{min: degToRad(-170), max: degToRad(10)}}

    const [links, setLinks] = useState([
        { position: [0, .1, 0], rotation: QuaternionO.zeroRotation(), constraints: rotundaConstraint },
        { position: [0, 1, 0], rotation: QuaternionO.zeroRotation(), constraints: shoulderConstraint },  
        { position: [0, 1, 0], rotation: QuaternionO.zeroRotation(), constraints: elbowConstraint },
        // { position: [0, 1, 0], rotation: QuaternionO.zeroRotation(), constraints: wristPitchConstraint},
        // { position: [0, 0, 1], rotation: QuaternionO.zeroRotation(), constraints: wristRollConstraint},
    ] as Solve3D.Link[])

    const base: Solve3D.JointTransform = {
      position: [0, 0, 0],
      rotation: QuaternionO.zeroRotation(),
    }

    useEffect(() => {
      if(!transforms) {return}
      console.log(motorAngles(transforms))
    }, [transforms])

    // Set a random target near the arm
    // useEffect( () => {
    //   const timeout = setInterval(()=>{setTarget(V3O.fromArray([randFloat(-3,3),randFloat(0,3),randFloat(-3,3)]))}, 5000)
    //   return () => {
    //     clearTimeout(timeout);
    //   };
    // },[])

    useAnimationFrame(60, () => {
        const knownRangeOfMovement = 2.1 //originally 4
    
        // function learningRate(errorDistance: number): number {
        //   const relativeDistanceToTarget = MathUtils.clamp(errorDistance / knownRangeOfMovement, 0, 1)
        //   const cutoff = 0.5
    
        //   if (relativeDistanceToTarget > cutoff) {
        //     return 10e-3
        //   }
    
        //   // result is between 0 and 1
        //   const remainingDistance = relativeDistanceToTarget / 0.02
        //   const minimumLearningRate = 10e-4
    
        //   return (minimumLearningRate + remainingDistance * 10e-4) / knownRangeOfMovement
        // }
    
        const result = Solve3D.solve(links, base, target, {
          method: 'CCD',
          learningRate: 0.6,
          acceptedError: 0.0001,
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
            <AxisHelper />
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