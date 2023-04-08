import { useThree } from '@react-three/fiber'
import { V3, V3O } from 'inverse-kinematics'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

export const Target = ({ position, setPosition}: { position: V3; setPosition: (position: V3) => void}) => {
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
      const vec = new Vector3()
      const clickPosition = new Vector3()
      
      vec.set(((event.clientX -getDimensions()[3]) / getDimensions()[0]) * 2 - 1, -((event.clientY-getDimensions()[2]) /getDimensions()[1]) * 2 + 1, 0.5) //accurately places xy coordinates of target
      vec.unproject(camera)
      vec.sub(camera.position).normalize()
      const distance = -camera.position.z / vec.z
      clickPosition.copy(camera.position).add(vec.multiplyScalar(distance))
      setPosition(V3O.fromVector3(clickPosition))
    }
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])
 
  return (
    <mesh position={[...position]}>
      <boxBufferGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color={'hotpink'} />
    </mesh>
  )
}