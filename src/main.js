import * as THREE from 'three'
import { Buggy } from './buggy.js'

let scene
let camera
let renderer
let light
let directionalLight

let cube
let cubeGeometry
let cubeMaterial

let buggy

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

let ispointerDown = false;

let materialParameters = {
	color: 0x00ff00
}

function init(){

	console.log("hello world")
	scene = new THREE.Scene()

	let aspectRatio = window.innerWidth / window.innerHeight
	camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000)

	directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 )
	scene.add(directionalLight)

	light = new THREE.AmbientLight(0x445566, 2)
	scene.add(light)

	cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
	cubeMaterial = new THREE.MeshBasicMaterial(materialParameters)
	cube = new THREE.Mesh(cubeGeometry,cubeMaterial)

	scene.add(cube)
	
	buggy = new Buggy(scene)
	
	console.log(cube.parent)
		
	const axesHelper = new THREE.AxesHelper( 2 )
	scene.add( axesHelper )


	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)

	document.body.appendChild(renderer.domElement)
	camera.position.z = 5
	
	
	let button1 = document.getElementById("button1")
	let button2 = document.getElementById("button2")

	button1.addEventListener('click', onButton1)	
	button2.addEventListener('click', onButton2)	
	
	window.addEventListener( 'pointermove', onPointerMove );
	window.addEventListener( 'pointerdown', onPointerDown );
	window.addEventListener('resize', onWindowResize)
	
	/*
	window.addEventListener('resize', function(){
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	})*/
}

function onButton1(){
	console.log("button1")
}

function onButton2(){
	console.log("button2")
}

function onPointerDown( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	ispointerDown = true;
}

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onWindowResize(){
	//console.log(window.innerWidth, window.innerHeight)	
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	
	
	let button1 = document.getElementById("button1")
	let button2 = document.getElementById("button2")		
	let ui = document.getElementById("ui")

	if(window.innerWidth < 500){
		ui.style.backgroundColor = "#660066"
		button1.style.width = 40+"px"
	}else{
		ui.style.backgroundColor = "#fff"
		button1.style.width = 200+"px"
	}
	
	
	button1.style.left = 5+"px"
	button1.style.top = 5+"px"
	
	button2.style.left = 10 + button1.clientWidth + "px"
	button2.style.top = 5+"px"
}


function animate(){
	requestAnimationFrame(animate)
	renderer.render( scene, camera )
	
	if(ispointerDown){
		rayCast()
		ispointerDown = false;
	}

	camera.position.x  += 0.01
	
	cube.rotation.z += 0.1
	
	//cube.scale.x += 0.01
	//cube.scale.y += 0.01
	//cube.scale.z += 0.01
	
	camera.lookAt(cube.position)
	
	buggy.animate()

}
function rayCast(){

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {
		if(intersects[i].object.name.startsWith("Front_wheel")){
			console.log("Touchie touchie")
		}
		intersects[ i ].object.material.color.set( 0xff0000 );
	}
}



init()
onWindowResize()
animate()