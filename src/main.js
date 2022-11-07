import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'

import { Car } from './car.js'
import { Checkpoint } from './checkpoint.js'
import { SimpleTrack } from './simple_track.js'
import { GameManager } from './gameManager.js'

let scene
let camera
let renderer
let light
let directionalLight

let gameManager
let car
let plane

let physicsWorld
let cannonDebugger

let isPaused = false

async function init(){
	console.log("Init started")
	//Create the scene
	scene = new THREE.Scene()
	//scene1 = new THREE.Scene()


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

	//Axishelper
	let axesHelper = new THREE.AxesHelper(8)
	axesHelper.position.y += 0.1
	scene.add(axesHelper)

	
	//Physics
	physicsWorld = new CANNON.World({
		gravity: new CANNON.Vec3(0, -9.81, 0),
	})

	let groundPlane = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	})

	let sphereBody = new CANNON.Body({
		mass: 0.01,
		shape: new CANNON.Sphere(1)
	})
	sphereBody.position.set(0, 7, 5)
	sphereBody.linearDamping = 0.9;
	physicsWorld.addBody(sphereBody)

	let obstacle = new CANNON.Body({
		mass: 500,
		//type: CANNON.Body.STATIC,
		shape: new CANNON.Box(new CANNON.Vec3(1, 5, 2))
	})
	//obstacle.position.set(0,5,10)
	//physicsWorld.addBody(obstacle)

	groundPlane.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
	physicsWorld.addBody(groundPlane)

	cannonDebugger = new CannonDebugger(scene, physicsWorld,{
		color: 0xff0000,
	})
	
	//
	gameManager = new GameManager(scene, physicsWorld)

	//Creating the car
	car = new Car(scene, physicsWorld)


	//Create a checkpoint
	//let checkpoint = new Checkpoint(scene, physicsWorld)

	
	//TEST plane
	// let geometry = new THREE.PlaneGeometry( 100, 50 );
	// let material = new THREE.MeshStandardMaterial( {color: 0x111111, side: THREE.DoubleSide} );
	// plane = new THREE.Mesh( geometry, material );
	// plane.rotation.set(Math.PI/2, 0, 0)
	// scene.add(plane);



	let throttle = document.getElementById("throttle")
	let brake = document.getElementById("brake")

	throttle.addEventListener('click', onThrottle)
	brake.addEventListener("click", onBrake)

	let arrowLeft = document.getElementById("arrowLeft")
	let arrowRight = document.getElementById("arrowRight")

	arrowLeft.addEventListener('click', onArrowLeft)
	arrowRight.addEventListener("click", onArrowRight)

	//scene.add(throttle)

	//scene.add(brake)






	//Renderer
	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)

	document.body.appendChild(renderer.domElement)
}

function animate(){

	
	requestAnimationFrame(animate)
	renderer.render( scene, camera )
	physicsWorld.fixedStep()
	cannonDebugger.update()
	camera.lookAt(car.car.position)
	
	car.animate()
	
}

function onPause() {
	/*document.addEventListener('keydown', (event) => {
	console.log("HALLOO")
	let key = event.key
	if ((key == "w") || (key == "Esc")) {
		console.log("ESCAAAPE")

	}
	})*/
}


function onThrottle() {
	console.log("GAS")
	isPaused = true

	/*if (car.speedFactor == 0) {
		car.speedFactor = 1
	} 
	else {
		car.speedFactor = 0
	}*/

}

function onBrake() {
	//if (isPaused == false) {
		console.log("BREMSE")
		if (car.speedFactor == 0) {
			car.speedFactor = -1
		}
		else {
			car.speedFactor = 0
		}
	//}


}

function onArrowLeft() {
	console.log("LINKS")
	if (car.steerFactor == 0) {
		car.steerFactor = -1
	}
	else {
		car.steerFactor = 0
	}
}

function onArrowRight() {
	console.log("RECHTS")
	if (car.steerFactor == 0) {
		car.steerFactor = 1
	}
	else {
		car.steerFactor = 0
	}
}


init()
animate()

export{ gameManager }