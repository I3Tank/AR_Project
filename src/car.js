import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'

class Car{
	constructor(scene){
		this.scene = scene

		//Parts of the car
		this.car
		this.body

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
		loader.load('./assets/3d/block_car.glb',(gltf)=>{
			console.log("gltf loaded",gltf.scene)

			this.scene.add(gltf.scene)
			
			this.car = gltf.scene

			this.car.traverse( (child) => {
				if(child.name = "body"){
					this.body = child
				}
			})

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
			this.car.position.x += this.dx
			this.car.position.z += this.dz
			//Turn the car
			this.car.rotation.y = (this.direction - Math.PI)
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