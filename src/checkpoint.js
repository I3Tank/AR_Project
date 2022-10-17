import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

class Checkpoint{
	constructor(scene, physicsWorld){
		this.scene = scene
		this.physicsWorld = physicsWorld

		this.checkpoint
		this.hitbox

		this.loadModel()
	}

	loadModel(){
		const loader = new GLTFLoader()
		loader.load('./assets/3d/checkpoint.glb',(gltf)=>{
			console.log("gltf loaded",gltf.scene)

			this.scene.add(gltf.scene)
			
			this.checkpoint = gltf.scene

			this.hitbox = new CANNON.Body({
				mass: 5,
				type: CANNON.Body.STATIC,
				shape: new CANNON.Box(new CANNON.Vec3(3, 6, 1))
			})
			this.hitbox.position.set(this.checkpoint.position.x, this.checkpoint.position.y, this.checkpoint.position.z)
			this.physicsWorld.addBody(this.hitbox)
			console.log("hitboxCheck: ", this.hitbox)

		},function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},function ( error ) {
			console.log( 'An error happened' );
		})
	}
}

export { Checkpoint }