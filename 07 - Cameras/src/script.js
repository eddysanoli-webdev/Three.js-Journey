import './style.css'
import * as THREE from 'three'

/*
========================
NOTES

Types of camera
    - Array camera: Render the scene from multiple cameras on specific areas of the render.
      Use: Render multiple points of view in a multiplayer game for example.
    - Stereo camera: Render the scene through two cameras that mimic the eyes to create
      a parallax effect. Use with devices like a VR headset, carboard or red and blue
      glasses.
    - Cube camera: Does 6 renders (top, bottom, right, left, back and front) around a 
      point. Can render the surroundings for things like an environment map, reflection or 
      shadow map.
    - Orthographic camera: Renders the object without perspective.
    - Perspective camera: Camera with perspective

Dont use extreme values for the "near" and "far" arguments of the camera, you will create
a bug called "Z-fighting". When two faces are very near each other, the renderer wont be 
able to figure out which one is in front of the other and they will just flicker

========================
*/

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// =======================
// CURSOR

// Variable for storing the position of the cursor
const cursor = {
    x: 0,
    y: 0
}

// Listen for the mouse position
window.addEventListener('mousemove', (event) => {
    
    // Normalize the cursor cursor to go from -0.5 to 0.5
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;

})


// =======================
// CAMERA

// Create a perspective camera
//  - Arg 1: Field of view (Recommended: 45 - 75. Larger sizes distort the scene)
//  - Arg 2: Aspect ratio (Aspect ratio for the camera view / render dimensions )
//  - Arg 3: Near (Objects closer than this value are not rendered. Recommended: 0.1)
//  - Arg 4: Far (Object farther than this value are not rendered. Recommended: 100)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

// Move the position
camera.position.z = 3;

// Focus the camera on the cube
camera.lookAt(mesh.position)
scene.add(camera)

// =======================
// RENDERER

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//  =======================
// ANIMATION

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update the camera position with the cursor coordinates
    // (Invert the Y coordinates because the cursor coordinates start at 0 at the top)
    camera.position.x = 5 * cursor.x;
    camera.position.y = 5 * -cursor.y;
    camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// =======================