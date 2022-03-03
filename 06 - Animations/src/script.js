import './style.css'
import * as THREE from 'three'

/*
NOTES:

- requestAnimationFrame: Call the function provided on the next available frame.
  The same function will be called on each new frame.

- 

*/

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// =======================
// Animations
// =======================

// Get initial time stamp
let previousTime = Date.now();

// Function to call on each "tick" or "frame"
// NOTE: Could also be called "gameLoop" or something similar
const tick = () => {

    // Get time delta
    const currentTime = Date.now();
    const deltaTime = currentTime - previousTime;
    
    // Update the previous time stamp
    // (After calculating the time delta)
    previousTime = currentTime;

    // Update the cube rotation
    // (We adapt the cube transform using the time delta. That way the animation feel is not
    //  dependent on the current framerate)
    mesh.rotation.x += 0.001 * deltaTime;

    // Render the modified scene
    renderer.render(scene, camera)

    // Recursively call the "tick" after executing the tick script
    window.requestAnimationFrame(tick);
}

// Initial tick call
tick();