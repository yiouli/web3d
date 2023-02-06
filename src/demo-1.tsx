import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Button, TextField } from '@mui/material';

function Demo1() {
  // preserve the webGL objects throughout the state changes (camera, renderer & scene)
  // only update the objects in the scene and restart animation loop with the newer version of object & animation
  const _camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  _camera.position.z = 1;
  const _renderer = new THREE.WebGLRenderer( { antialias: true } );
  _renderer.setSize(window.innerWidth, window.innerHeight);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderer = useRef(_renderer);
  const camera = useRef(_camera);
  const scene = useRef(new THREE.Scene());
  const [size, setSize] = useState<number>(1);
  const [rotateSpd, setRotateSpd] = useState<number>(1);

  useEffect(() => {
    containerRef.current!.appendChild(renderer.current.domElement); 
  }, []);

  function render() {
    renderer.current.setAnimationLoop(null);
    scene.current.clear();
    const geometry = new THREE.BoxGeometry(size/10, size/10, size/10 );
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.current.add(mesh);
    console.log('loaded new scene');

    function animation(time: number) {
      mesh.rotation.x = time / 2000 * rotateSpd;
      mesh.rotation.y = time / 2000 * rotateSpd;
      renderer.current.render(scene.current, camera.current);
    }
    renderer.current.setAnimationLoop(animation);
  }
  
  useEffect(render, [size, rotateSpd]);

  return <Box>
    <TextField type='number' label='size' value={size} onChange={e => {
      const val = parseInt(e.target.value);
      if (!isNaN(val)) setSize(val);
    }} />
    <TextField type='number' label='rotate speed' value={rotateSpd} onChange={e => {
      const val = parseInt(e.target.value);
      if (!isNaN(val)) setRotateSpd(val);
    }} />
    <Button onClick={e => {
      renderer.current.setAnimationLoop(null); 
    }}>Stop Animation</Button>
    <Button onClick={e => render() }>Restart Animation</Button>
    <div ref={containerRef} />;
  </Box>
}

export default Demo1;
