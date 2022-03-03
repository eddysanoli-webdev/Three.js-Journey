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
// CAMERA

// Create a perspective camera
//  - Arg 1: Field of view (Recommended: 45 - 75. Larger sizes distort the scene)
//  - Arg 2: Aspect ratio (Aspect ratio for the camera view / render dimensions )
//  - Arg 3: Near (Objects closer than this value are not rendered. Recommended: 0.1)
//  - Arg 4: Far (Object farther than this value are not rendered. Recommended: 100)
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);

// Create an orthographic camera
//  - Arg 1: Left (How far can the camera see to the left)
//  - Arg 2: Right (How far can the camera see to the right)
//  - Arg 3: Top (How far can the camera see upwards)
//  - Arg 4: Bottom (How far can the camera see downwards)
//  - Arg 5: Near
//  - Arg 6: Far
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);

// NOTE: This line will generate a flattened cube. This is because we are doing a square
// render, but the canvas is rectangular, so the scene is being flattened to fit the canvas.
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);

// Move the position
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2

// Focus the camera on the cube
camera.lookAt(mesh.position)
scene.add(camera)

// =======================

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//  =======================
// ANIMATION

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// =======================