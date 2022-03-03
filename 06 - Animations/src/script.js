import './style.css'
import * as THREE from 'three'

// Green Sock library
import gsap from 'gsap'

/*
NOTES:

- requestAnimationFrame: Call the function provided on the next available frame.
  The same function will be called on each new frame.

- Install green sock to use tweens, timelines, etc: npm install --save gsap@3.5.1
    --save: Adds GSAP to the package.json dependencies
    @3.5.1: Specify a version to make sure its always compatible.

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

// Get the clock function from Three.js to add timing functionalities
const clock = new THREE.Clock();

// Function to call on each "tick" or "frame"
// NOTE: Could also be called "gameLoop" or something similar
const tick = () => {

    // Time delta from last frame
    // NOTE: Measured in seconds. Starts at zero at each site reload.
    const elapsedTime = clock.getElapsedTime();

    // =========================
    // Update the cube:
    // (We adapt the cube transform using the elapsed time. That way the animation feel is not
    //  dependent on the current framerate. NOTE: Its important to note that the elapsed time
    //  increases over time, so we dont have to "add" to the rotation of the cube, we have to
    //  simply make it equal to it.)

    // - Half a revolution per second (pi rad)    
    mesh.rotation.x = elapsedTime * Math.PI * 1/6;

    // - Up and down bob
    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);

    // - Focus on the cube
    camera.lookAt(mesh.position);

    // =========================

    // Render the modified scene
    renderer.render(scene, camera)

    // Recursively call the "tick" after executing the tick script
    window.requestAnimationFrame(tick);
}

// Initial tick call
tick();