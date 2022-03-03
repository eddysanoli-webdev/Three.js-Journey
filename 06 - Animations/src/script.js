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

// Setup animation using GSAP
// (NOTE: GSAP has its own "tick" function, so no need to include it inside there)
// - Arg 1: Thing to animate
// - Arg 2: Object
//      - Duration: Duration of the animation
//      - Delay: Time before the animation starts
//      - Property: Value for the property of the "thing to animate" that you want to change
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Function to call on each "tick" or "frame"
// NOTE: Could also be called "gameLoop" or something similar
const tick = () => {

    // Render the modified scene
    renderer.render(scene, camera)

    // Recursively call the "tick" after executing the tick script
    window.requestAnimationFrame(tick);
}

// Initial tick call
tick();