import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'
import { gameManager } from './main.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'


class Checkpoint{
	constructor(scene, physicsWorld, checkpointPosition, id){
		this.scene = scene
		this.physicsWorld = physicsWorld
		this.id = id

		this.checkpointPosition = checkpointPosition
		this.checkpoint
		this.hitbox

		this.loadModel(this.checkpointPosition)
	}

	loadModel(checkpointPosition){
		const loader = new GLTFLoader()
		loader.load('./assets/3D/checkpoint.glb',(gltf)=>{
			console.log("gltf loaded",gltf.scene)

			this.scene.add(gltf.scene)
			
			this.checkpoint = gltf.scene
			
			this.hitbox = new CANNON.Body({
				mass: 5,
				isTrigger: true,
				type: CANNON.Body.STATIC,
				shape: new CANNON.Box(new CANNON.Vec3(1, 10, 6))
			})
			//Add a trigger
			this.hitbox.addEventListener('collide', (event) => {
        		gameManager.increaseLapCounter(this.id)
        	})
			this.checkpoint.position.set(this.checkpointPosition.x, this.checkpointPosition.y, this.checkpointPosition.z)
			this.hitbox.position.set(this.checkpoint.position.x, this.checkpoint.position.y, this.checkpoint.position.z)
			//console.log("PH: ", this.physicsWorld)
			this.physicsWorld.addBody(this.hitbox)
			//console.log("hitboxCheck: ", this.hitbox)
			
		},function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},function ( error ) {
			console.log( 'An error happened' );
		})
	}
}

export { Checkpoint }