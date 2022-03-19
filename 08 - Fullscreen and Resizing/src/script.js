import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// ==================
// SIZES

// Dont use the a fixed size. We change it to the size of the viewport
// (Viewport: Portion of the screen where the actual website is seen)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// When you resize the window, the canvas will not change accordingly,
// showing the white background. We listen for the resizing to fix the issue.
window.addEventListener('resize', () => {
    
    // Update the sizes object
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update the camera aspect ratio
    camera.aspect = sizes.width / sizes.height;

    // Tell Three.js to update the projection matrix
    camera.updateProjectionMatrix();

    // Set the size of the canvas element
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min( window.devicePixelRatio, 2 ));
})

// Handle fullscreen
window.addEventListener('dblclick', () => {

    // Use prefixed versions (webkit..) to make the
    // fullscreen work on safari, edge, and many other browsers
    const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement

    // Make the canvas request going into fullscreen
    if (!fullscreenElement) {

        // If browser supports "requestFullscreen"
        // Else use prefixed versions
        if (canvas.requestFullscreen) canvas.requestFullscreen();
        else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
    }
    // Remove the fullscreen from the website
    else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }

})

// ===================
// CAMERA

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// ==================
// CONTROLS

// Disable the orbit controls by writing: controls.enabled = false
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ==================
// RENDERER

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Pixel Ratio: 
//  - How many pysical pixels you have on the screen for each pixel on the software side. 
//  - For example, if you have a pixel ratio of 2, each physical pixel on the screen is 
//    subdivided into a 2x2 grid. Each element in the grid is a new software pixel. 
//  - The higher the pixel ratio, the higher the GPU requirements are
//  - For some reason mobile devices have the highest pixel ratio (almost 5 on some), and
//    its really not that necessary (2 is a good sweetspot).
//  - We change this, as this will generate a more precise render of the object, removing
//    (or reducing) elements like aliasing or unnecesary blur.
//  - On mobile devices we will limit the pixel ratio to 2.
//  - Make sure to adjust the pixel ratio on a resize, to cover cases like a user changing
//    from a main monitor to a secondary one.
renderer.setPixelRatio(Math.min( window.devicePixelRatio, 2 ));

// =======================

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()