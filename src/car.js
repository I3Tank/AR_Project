import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Vector3 } from 'three'
import { Quaternion } from 'cannon-es'
import { isPaused } from './main.js'

class Car{
	constructor(scene, physicsWorld){
		this.scene = scene
		this.physicsWorld = physicsWorld

		//Parts of the car
		this.car
		this.body
		this.hitbox
		//Offset of the box
		this.offset = 1.5
		this.modelOffset = -1.5

		//Stats of the car
		this.speed = 0.1
		this.steerSpeed = 0.05
		this.maxVelocity = 10

		//-1 = backwards | 1 = forward
		this.speedFactor = 0
		//-1 = left | 1 = right
		this.steerFactor = 0
		this.direction = 0
		this.dx=0
		this.dz=0
		this.rotated = false

		//Animation
		this.front_right_wheel
        this.front_left_wheel
        this.back_left_wheel
        this.back_right_wheel

		this.loadModel()
		this.setupControls()
	}
	loadModel(){
		const loader = new GLTFLoader()
		//return new Promise((resolve, reject) => {
		//	loader.loadAsync('./assets/3d/block_car.glb', (gltf)=> resolve(gltf), null, reject)
		//})
		console.log("loading model")
		loader.load('./assets/3d/sports_car.glb',(gltf)=>{
			this.scene.add(gltf.scene)
			
			this.car = gltf.scene

			this.car.traverse( (child) => {
				if(child.name === "body"){
					this.body = child
				}
				if(child.name == "front_right_wheel"){
					this.front_right_wheel = child
				}
				if(child.name == "front_left_wheel"){
					this.front_left_wheel = child
				}
				if(child.name == "back_right_wheel"){
					this.back_right_wheel = child
				}
				if(child.name == "back_left_wheel"){
					this.back_left_wheel = child
				}
			})

			console.log("Loaded: ", this.car)
			//Create the hitbox of the car
			this.hitbox = new CANNON.Body({
				mass: .1,
				//type: CANNON.Body.STATIC,
				shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
			})
			//To add friction and limit the max speed
			this.hitbox.linearDamping = 0.9;

			this.hitbox.position.set(this.body.position.x, this.body.position.y + 1, this.body.position.z + 20)
			this.physicsWorld.addBody(this.hitbox)
			console.log("hitbox: ", this.hitbox)
			
		},function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			
		},function ( error ) {
			console.log( 'An error happened' );
		})
	}
	animate(){
		//need to check if the model is loaded yet
		if(this.car){
			if(isPaused == false) {
				if(!this.rotated){
					this.direction = Math.PI/2
					this.rotated = true
				}
				if (this.steerFactor == 1) {
					this.front_left_wheel.rotation.y = -Math.PI / 8
					this.front_right_wheel.rotation.y = -Math.PI / 8
				} else if (this.steerFactor == -1) {
					this.front_left_wheel.rotation.y = Math.PI / 8
					this.front_right_wheel.rotation.y = Math.PI / 8
				} else if (this.steerFactor == 0) {
					this.front_left_wheel.rotation.y = 0
					this.front_right_wheel.rotation.y = 0
				}

				this.front_left_wheel.rotation.x -= this.speedFactor * 0.05
				this.front_right_wheel.rotation.x -= this.speedFactor * 0.05
				this.back_left_wheel.rotation.x -= this.speedFactor * 0.05
				this.back_right_wheel.rotation.x -= this.speedFactor * 0.05
				//calculate the direction
				this.direction -= this.steerFactor * this.steerSpeed
				//Math :)
				this.dx = Math.sin(this.direction) * this.speedFactor * this.speed
				this.dz = Math.cos(this.direction) * this.speedFactor * this.speed

				//Turn the car
				//TODO Set the car rotation depending on hitbox rotation
				this.hitbox.quaternion.setFromEuler(0, (this.direction - Math.PI), 0)
				this.car.rotation.set(0, (this.direction - Math.PI), 0)

				//Update the postion of the hitbox
				let direction = new CANNON.Vec3(this.dx, 0, this.dz)
				let force = direction.scale(50)
				this.hitbox.applyForce(force)
				this.hitbox.position.set(this.hitbox.position.x, this.offset, this.hitbox.position.z)
			
				this.car.position.set(this.hitbox.position.x, this.hitbox.position.y + this.modelOffset, this.hitbox.position.z)
			}
		}
	}
	setupControls(){
		document.addEventListener('keydown', (event) => {
			let key = event.key
			//console.log("keyDown: ", key)
			if((key == 'w')||(key == 'ArrowUp')){
				//W
				this.speedFactor = 1
			}if((key == 'a')||(key == 'ArrowLeft')){
				//A
				this.steerFactor = -1
			}else if((key == 's')||(key == 'ArrowDown')){
				//S
				this.speedFactor = -1
			}else if((key == 'd')||(key == 'ArrowRight')){
				//D
				this.steerFactor = 1
			}
		})
		document.addEventListener('keyup', (event) => {
			let key = event.key
			//console.log("keyUp",event.key)
			
			if((key=='w')||(key=='ArrowUp')){
				//W
				this.speedFactor=0
			}else if((key=='a')||(key=='ArrowLeft')){
				//A
				this.steerFactor=0
			}else if((key=='s')||(key=='ArrowDown')){
				this.speedFactor=0			
				//S
			}else if((key=='d')||(key=='ArrowRight')){
				//D
				this.steerFactor=0
			}
		})

	}
}

export { Car }