import * as THREE from 'three'
import { Car } from './car.js'

let scene
let camera
let renderer
let light
let directionalLight

let car
let plane

function init(){
	console.log("Init started")
	//Create the scene
	scene = new THREE.Scene()

	//Adjust the aspect ratio for the device and create the camera
	let aspectRatio = window.innerWidth / window.innerHeight
	camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000)

	//Move camera "to us"
	camera.position.z = 50
	//Move camera up
	camera.position.y = 50
	//Make camera look in the center
	camera.lookAt(0,0,0)

	//Simple light to see something
	directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 )
	scene.add(directionalLight)

	light = new THREE.AmbientLight(0x445566, 2)
	scene.add(light)

	//Creating the car
	car = new Car(scene)

	//TEST plane
	let geometry = new THREE.PlaneGeometry( 100, 50 );
	let material = new THREE.MeshStandardMaterial( {color: 0x111111, side: THREE.DoubleSide} );
	plane = new THREE.Mesh( geometry, material );
	plane.rotation.set(Math.PI/2, 0, 0)
	scene.add(plane);
	

	//Renderer
	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)

	document.body.appendChild(renderer.domElement)
}

function animate(){
	requestAnimationFrame(animate)
	renderer.render( scene, camera )

	car.animate()
}

init()
animate()