import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'

class Buggy{

	constructor(scene){
		this.buggy
		this.direction= 0
		this.steering=0
		this.speed=0
		
		this.frontWheelLeft
		this.frontWheelRight
		this.rearWheelLeft
		this.rearWheelRight
		
		this.dx=0
		this.dz=0
	
		this.scene = scene
		console.log("buggy has been created..")

	
		document.addEventListener('keydown', (event) => {
			let key = event.key
			console.log("keyDown",event.key)
			
			if((key=='w')||(key=='ArrowUp')){
				//W
				this.speed=1
			}else if((key=='a')||(key=='ArrowLeft')){
				//A
				this.steering=-1
			}else if((key=='s')||(key=='ArrowDown')){
				this.speed=-1				
				//S
			}else if((key=='d')||(key=='ArrowRight')){
				//D
				this.steering=1
			}
		})

		document.addEventListener('keyup', (event) => {
			let key = event.key
			console.log("keyUp",event.key)
			
			if((key=='w')||(key=='ArrowUp')){
				//W
				this.speed=0
			}else if((key=='a')||(key=='ArrowLeft')){
				//A
				this.steering=0
			}else if((key=='s')||(key=='ArrowDown')){
				this.speed=0			
				//S
			}else if((key=='d')||(key=='ArrowRight')){
				//D
				this.steering=0
			}
		})
		this.loadModel()
	}
	
	animate(){
		if(this.buggy){
			console.log(this.speed)

			if(this.steering == 1){
				this.frontWheelLeft.rotation.y = - Math.PI / 8
				this.frontWheelRight.rotation.y = Math.PI / 8
			}else if(this.steering == -1){
				this.frontWheelLeft.rotation.y = Math.PI / 8
				this.frontWheelRight.rotation.y = - Math.PI / 8
			}else if(this.steering == 0){
				this.frontWheelLeft.rotation.y = 0
				this.frontWheelRight.rotation.y = 0
			}
			
			this.frontWheelLeft.rotation.z += this.speed*0.05
			this.frontWheelRight.rotation.z += this.speed*0.05
			this.rearWheelLeft.rotation.z += this.speed*0.05
			this.rearWheelRight.rotation.z += this.speed*0.05
			
			//this.buggy.position.x+=this.speed*0.01
			this.direction-=this.steering*0.05
		
			this.dx = Math.sin(this.direction) * this.speed *0.1
			this.dz = Math.cos(this.direction) * this.speed *0.1
			
			this.buggy.position.x += this.dx
			this.buggy.position.z += this.dz
			
			//console.log(this.direction, this.steering)
			
			this.buggy.rotation.y = (this.direction - Math.PI/2 )			
		}
	}
	
	loadModel(){
		const loader = new GLTFLoader()
		loader.load('./assets/3d/buggy.glb',(gltf)=>{
			console.log("gltf loaded",gltf.scene)
			
			
			gltf.scene.scale.x = 0.01
			gltf.scene.scale.y = 0.01
			gltf.scene.scale.z = 0.01
			this.scene.add(gltf.scene)
			
			this.buggy = gltf.scene

			this.buggy.traverse( ( child ) => {
				console.log("child", child)
				
				if(child.name == "Front_wheel"){
					this.frontWheelLeft = child
				}else if(child.name == "Front_wheel001"){
					this.frontWheelRight = child				
				}else if(child.name == "Rear_wheel"){
					this.rearWheelLeft = child
				}else if(child.name == "Rear_wheel001"){
					this.rearWheelRight = child
				}
			})

				
		},function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},function ( error ) {
			console.log( 'An error happened' );
		})
	}
	
	setSpeed(){}
	driveForward(){}
	

}

export { Buggy }


/*
Buggy
--speed
--size
--setSpeed
--driveForward
--loadModel
*/