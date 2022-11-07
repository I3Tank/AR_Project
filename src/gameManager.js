import { SimpleTrack } from './simple_track.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

class GameManager{
	constructor(scene, physicsWorld){
		this.scene = scene
		this.physicsWorld = physicsWorld
		this.lap
		this.maxLap = 3
		this.checkpoint
		this.lastId = 0

		this.setupNewGame()
	}
	setupNewGame(){
		console.log("New Game started!")
		this.lap = 0

		//Create a track
		let simpleTrack = new SimpleTrack(this.scene, this.physicsWorld)
		
	}
	finishGame(){
		console.log("Finished!")
	}
	increaseLapCounter(id){
		if(this.lastId != id){
			this.lap++
			console.log(this.lap)
			this.lastId = id
		}
		
	}
	animate(){
		//this.checkpoint.animate()
	}

}

export { GameManager }