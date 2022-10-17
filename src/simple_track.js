import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'

class SimpleTrack{
	constructor(scene){
		this.scene = scene

		this.track

		this.loadModel()
	}

	loadModel(){
		const loader = new GLTFLoader()
		loader.load('./assets/3d/simple_track.glb',(gltf)=>{
			console.log("gltf loaded",gltf.scene)

			this.scene.add(gltf.scene)


			
			this.track = gltf.scene
			this.track.scale.x *= 10
			this.track.scale.y *= 10
			this.track.scale.z *= 10

		},function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},function ( error ) {
			console.log( 'An error happened' );
		})
	}
}

export { SimpleTrack }