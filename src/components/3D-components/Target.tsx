import { useThree } from '@react-three/fiber'
import { V3, V3O } from 'inverse-kinematics'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

export const Target = ({ position, zindex, setPosition}: { position: V3; zindex: number; setPosition: (position: V3) => void}) => {
// export function Target(props){

  const { camera } = useThree()

  function getDimensions(){ // works but is there a React way to do this
    const element = document.querySelector(".inverse-kin");
    const height = element.clientHeight;    
    const width = element.clientWidth;
    const topDiff = element.getBoundingClientRect().y;
    const leftDiff = element.getBoundingClientRect().x;
    const dimensions = [width, height, topDiff, leftDiff];
    return dimensions;
  } 

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      //check if click occured in the component
      if(document.querySelector(".inverse-kin").contains(event.target as Node))
      {
        const vec = new Vector3()
        const clickPosition = new Vector3()
        vec.set(((event.clientX -getDimensions()[3]) / getDimensions()[0]) * 2 - 1, -((event.clientY-getDimensions()[2]) /getDimensions()[1]) * 2 + 1, 0.5) //accurately places xy coordinates of target
        vec.unproject(camera)
        vec.sub(camera.position).normalize()
        const distance = -camera.position.z / vec.z
        console.log(distance)
        clickPosition.copy(camera.position).add(vec.multiplyScalar(distance))
        // console.log(typeof(zvec.z))
        let zvec = new Vector3().fromArray([0,0,zindex])
        setPosition(V3O.fromVector3(clickPosition.add(zvec)))

      }
    }
    window.addEventListener('contextmenu', onClick)
    return () => {
      window.removeEventListener('contextmenu', onClick)
    }
  }, [zindex])
 
  return (
    <mesh position={new Vector3().fromArray([...position])}>
      <boxBufferGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color={'black'} />
    </mesh>
  )
}