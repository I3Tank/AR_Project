import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'
import { Checkpoint } from './checkpoint.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

class SimpleTrack{
	constructor(scene, physicsWorld){
		this.scene = scene
		this.physicsWorld = physicsWorld

		this.track

		//checkpoint information
		this.c1
		this.c2
		this.c1Position = new THREE.Vector3(0, 0, -15)
		this.c2Position = new THREE.Vector3(0, 0, 15)

		//border information
		this.b1Position = new THREE.Vector3()
		this.b1Size =new THREE.Vector3()

		this.loadModel()
		this.createCheckpoints()
		this.createBorders()
	}

	loadModel(){
		const loader = new GLTFLoader()
		loader.load('./assets/3d/simple_track.glb',(gltf)=>{
			console.log("gltf loaded",gltf.scene)

			this.scene.add(gltf.scene)
			
			this.track = gltf.scene
			

		},function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},function ( error ) {
			console.log( 'An error happened' );
		})
	}
	createCheckpoints(){
		this.c1 = new Checkpoint(this.scene, this.physicsWorld, this.c1Position)
		this.c2 = new Checkpoint(this.scene, this.physicsWorld, this.c2Position)
	}
	createBorders(){
		//Up Down Outer
		this.createBorder(new CANNON.Vec3(0,0,-23), new CANNON.Vec3(50,2,1))
		this.createBorder(new CANNON.Vec3(0,0,25), new CANNON.Vec3(50,2,1))
		//Left Right Outer
		this.createBorder(new CANNON.Vec3(48,0,0), new CANNON.Vec3(1,2,25))
		this.createBorder(new CANNON.Vec3(-48,0,0), new CANNON.Vec3(1,2,25))

		//Up Down Inner
		this.createBorder(new CANNON.Vec3(0,0,-8), new CANNON.Vec3(32,2,1))
		this.createBorder(new CANNON.Vec3(0,0,8), new CANNON.Vec3(32,2,1))
		//Left Right Inner
		this.createBorder(new CANNON.Vec3(31,0,0), new CANNON.Vec3(1,2,9))
		this.createBorder(new CANNON.Vec3(-31,0,0), new CANNON.Vec3(1,2,9))
	}
	createBorder(position, size){
		this.position = position
		this.size = size
		let b1 = new CANNON.Body({
			type: CANNON.Body.STATIC,
			shape: new CANNON.Box(this.size)
		})
		this.physicsWorld.addBody(b1)
		b1.position.set(this.position.x, this.position.y, this.position.z)
	}
}

export { SimpleTrack }