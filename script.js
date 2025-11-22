import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/PointerLockControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x222222, 1);
scene.add(light);

// Floor
const floorGeometry = new THREE.PlaneGeometry(200, 200);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x3366ff });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Controls (FIXED ✅)
const controls = new PointerLockControls(camera, renderer.domElement);

// Click to lock
renderer.domElement.addEventListener('click', () => {
  controls.lock();
});

// UI hide/show
controls.addEventListener('lock', () => {
  document.getElementById('ui').style.display = 'none';
});

controls.addEventListener('unlock', () => {
  document.getElementById('ui').style.display = 'block';
});

// Movement
const speed = 0.1;
const keys = {};

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function updateMovement() {
  if (!controls.isLocked) return;

  if (keys['KeyW']) controls.moveForward(speed);
  if (keys['KeyS']) controls.moveForward(-speed);
  if (keys['KeyA']) controls.moveRight(-speed);
  if (keys['KeyD']) controls.moveRight(speed);
}

// Start position
camera.position.set(0, 1.7, 5);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loop
function animate() {
  requestAnimationFrame(animate);
  updateMovement();
  renderer.render(scene, camera);
}

animate();
