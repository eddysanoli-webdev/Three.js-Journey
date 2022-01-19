// Call Three.js through "THREE" object
console.log(THREE);


/*
==========================
SCENE:
    - Set where objects, models and lights are put
    - Similar to a container
    - At some point you have to render your scene
*/
const scene = new THREE.Scene();


/*
==========================
OBJECTS:
    Example Objects
        - Primitive geometries
        - Imported models
        - Particles
        - Lights

    Mesh is necessary to create an object. A mesh consists of both geometry (shape) and a 
    material (how it looks: texture and color).

*/

// Red cube (1 unit x 1 unit x 1 unit)
// Note: Use const for better memory management
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red"});
const mesh = new THREE.Mesh(geometry, material);

// Add mesh to the scene
scene.add(mesh);


/*
==========================
CAMERA:
    - Serves as a point of view when doing a render
    - Can have multiple cameras and switch between them
    - Different types
    - Simplest camera (most similar to a real camera): PerspectiveCamera

    First argument of the camera: FOV
        - Recommended values: 45 or 55 maximum

    First argument of the camera: Aspect ratio
        - Width of the camera / Height of the camera
*/

// Size of the camera
const sizes = {
    width: 800,
    height: 600
};

// Create the camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Add camera to scene
scene.add(camera);

// NOTE: By default all elements centered at the origin. The camera has to move backwards
// by "transforming" its original position.

// Three.js coordinates
// - +Z : Towards the camera
// - -Z : Away from the camera
camera.position.z = 3;

/*
==========================
RENDERER:
    - Render the scene from the camera point of view
    - Result is drawn into a canvas tag (Element where you can draw stuff)
    - Three.js uses WebGL to draw on said canvas

*/

// Create a renderer on the canvas element using the DOM
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".webgl")
});

// Resize the renderer (for a bigger canvas)
renderer.setSize(sizes.width, sizes.height);

// Render the scene
// - Arguments: Scene, camera
renderer.render(scene, camera);
