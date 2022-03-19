import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ==================
// Canvas
const canvas = document.querySelector('canvas.webgl')

// ==================
// Scene
const scene = new THREE.Scene()

// ==================
// Object

// Geometry: Composed of vertices (point coordinates in 3D space) and faces
// (triangles that join those vertices to create a surface). Can be used to create
// meshes and particles (one particle per vertice).

// Possible geometries.
// NOTE: All of them inherit from the base geometry class or BufferGeometry.
// - BoxGeometry: Box
// - PlaneGeometry: Plane or surface
// - CircleGeometry: Circle plane
// - ConeGeometry: Cone
// - CylinderGeometry: Cylinder}
// - RingGeometry: Plane ring
// - TorusGeometry: Donut
// - TorusKnotGeometry: Donuts tied together
// - TetrahedronGeometry: Two piramids going bottom to bottom
// - SphereGeometry: 3D circle
// - ShapeGeometry: Create a plane using a spline
// - TubeGeometry: Tube that follows a path
// - ExtrudeGeometry: Extrude a geometry from a path
// - LatheGeometry: You provide a path and a geometry is created by doing 1 revolution of the path
// - TextGeometry: 3D text

// Create array for random triangles
// 50 triangles, each one with 3 vertices, and each vertex with three coordinates (X,Y,Z)
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);

// Fill the array
for (let i = 0; i < count * 3 * 3; i++) {

    // Center the triangles by generating values between -0.5 and 0.5
    positionsArray[i] = Math.random() - 0.5;
}

// Generate the geometry
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionsAttribute);

// Indexes: When you have a complex geometry, some triangles share common vertices. 
// Instead of specifying the same vertex multiple times (one time for each triangle),
// you can use indexes to say "Both triangle 1 and 2 use vertex 2", effectively reducing
// the amount of information needed to represent the same geometry. Its harder though.

// Box parameters:
// - width: Size on the X axis
// - height: Size on the y axis
// - depth: Size on the z axis
// - widthSegments: Subdivisions on the x axis (eg. 2 = 2 face subdivisions per face or 8 triangles per face)
// - heightSegments: Subdivisions on the y axis
// - depthSegments: Subdivisions on the z axis
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// ==================
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ==================
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// ==================
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ==================
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ==================
// Animate
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