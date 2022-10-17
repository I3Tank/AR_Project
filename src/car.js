import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Vector3 } from 'three'
import { Quaternion } from 'cannon-es'

class Car{
	constructor(scene, physicsWorld){
		this.scene = scene
		this.physicsWorld = physicsWorld

		//Parts of the car
		this.car
		this.body
		this.hitbox
		this.offset = 1

		//Stats of the car
		this.speed = 0.1
		this.steerSpeed = 0.02

		//-1 = backwards | 1 = forward
		this.speedFactor = 0
		//-1 = left | 1 = right
		this.steerFactor = 0
		this.direction = 0
		this.dx=0
		this.dz=0

		this.loadModel()
		this.setupControls()
	}
	loadModel(){
		const loader = new GLTFLoader()
		//return new Promise((resolve, reject) => {
		//	loader.loadAsync('./assets/3d/block_car.glb', (gltf)=> resolve(gltf), null, reject)
		//})
		loader.load('./assets/3d/block_car.glb',(gltf)=>{
			this.scene.add(gltf.scene)
			
			this.car = gltf.scene

			this.car.traverse( (child) => {
				if(child.name = "body"){
					this.body = child
				}
			})

			console.log("Loaded: ", this.car)

			// this.hitbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
			// this.hitbox.setFromObject(this.body)
			// console.log("Hitbox: ", this.hitbox)
			//Create the hitbox of the car
			this.hitbox = new CANNON.Body({
				mass: 5,
				//type: CANNON.Body.STATIC,
				shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
			})
			console.log("this.body.position:", this.body.position)
		
			this.hitbox.position.set(this.body.position.x, this.body.position.y + 1, this.body.position.z)
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
			
			//calculate the direction
			this.direction -= this.steerFactor * this.steerSpeed
			//Math :)
			this.dx = Math.sin(this.direction) * this.speedFactor * this.speed
			this.dz = Math.cos(this.direction) * this.speedFactor * this.speed
			//Move the car
			//this.car.position.x += this.dx
			//this.car.position.z += this.dz
			// //Turn the car
			// this.car.rotation.y = (this.direction - Math.PI)

			//Update the postion of the hitbox
			//console.log(this.dx * 10)
			this.hitbox.velocity.x = this.dx * 100
			this.hitbox.velocity.z = this.dz * 100
			this.car.position.set(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.position.z)
			//let quat = new Quaternion(this.hitbox.quaternion.x, this.hitbox.quaternion.y, this.hitbox.quaternion.z, this.hitbox.quaternion.w)
			//var rotation = new THREE.Euler().setFromQuaternion( quat, 'XYZ' );
			//console.log(rotation)
			//this.car.rotation.setFromQuaternion(rotation)
			//console.log(this.car.rotation)
			//this.hitbox.position = this.car.position
			//this.hitbox.position.set(this.car.position.x, this.car.position.y + this.offset, this.car.position.z)
			//this.hitbox.quaternion.setFromEuler(this.car.rotation.x, this.car.rotation.y, this.car.rotation.z)
			//console.log(this.hitbox.position)

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