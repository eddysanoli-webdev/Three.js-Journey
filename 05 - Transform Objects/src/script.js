import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// =====================================
/*
========================
POSISTION TRANSFORMS 
========================

Directions
    - Cube moves up/down: mesh.position.y = 1;
    - Cube moves left/right: mesh.position.x = 2;
    - Cube moves front/back: mesh.position.z = 3;

    NOTE: This may change depending on camera position and many other factors
    NOTE: The units are arbitrary

Transformations have to be applied before doing "renderer.render()"

Transformations can be applied in any order (position, scale, rotation)

*/

// Update coordinates individually
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;

// Update all positions at once (X, Y, Z)
mesh.position.set(0.7, -0.6, 1);

// Distance from the scene origin to the mesh origin
console.log("Vector Length: ", mesh.position.length());

// Distance between an object and an arbitrary point
console.log("Distance to Point: ", mesh.position.distanceTo(new THREE.Vector3(0, 1, 2)));

// Normalize the mesh position (Set it to 1)
// mesh.position.normalize();

// Axes helper (better visualize X, Y and Z axes)
//  - X: Red
//  - Y: Green
//  - Z: Blue
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/*
========================
SCALE TRANSFORMS 
========================
*/

// Scaling
mesh.scale.x = 2;                   // Single scaling
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);        // Simultaneous scaling

/*
========================
ROTATION TRANSFORMS 
========================

NOTE: Rotation axes rotate with the object (local axes)
*/

// Establish the order in which the rotations are applied
mesh.rotation.reorder('YXZ');

// Single rotations (in radians)
mesh.rotation.y = Math.PI * 0.25;
mesh.rotation.x = Math.PI * 0.25;

// Add the red cube to the scene
// (Needs to be at the end for the previous changes to take effect)
scene.add(mesh);

/*
========================
GROUP MULTIPLE OBJECTS
========================
*/

// Create the group
const group = new THREE.Group();
scene.add(group);

// Add three cubes to group
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.set(0, 0, -1);
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00})
);
cube2.position.set(2, 0, -1);
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff})
);
cube3.position.set(-2, 0, -1);
group.add(cube3);

// Transform the entire group
group.position.set(0, 1, 0);
group.rotation.set(0, Math.PI * 0.25, 0);
group.scale.x = 0.5;

// =====================================

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3);
scene.add(camera)

// =====================================
/*
========================
DISTANCE TO CAMERA
========================
*/

// Distance between object and the camera
console.log("Distance to camera: ", mesh.position.distanceTo(camera.position));

/*
========================
LOOK AT SOMETHING
========================
*/

// Look at the origin
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Look at the cube
//camera.lookAt(mesh.position);


// =====================================


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)