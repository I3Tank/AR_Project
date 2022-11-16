import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js'

class sports_car {

    constructor(scene) {
        this.sports_car
        this.direction = 0
        this.steering = 0
        this.speed = 0

        this.front_right_wheel
        this.front_left_wheel
        this.back_left_wheel
        this.back_right_wheel

        this.dx = 0
        this.dz = 0

        this.scene = scene
        console.log("sportscar has been created..")


        animate()
        {
            if (this.sports_car) {
                console.log(this.speed)

                if (this.steering == 1) {
                    this.front_left_wheel.rotation.y = -Math.PI / 8
                    this.front_right_wheel.rotation.y = Math.PI / 8
                } else if (this.steering == -1) {
                    this.front_left_wheel.rotation.y = Math.PI / 8
                    this.front_right_wheel.rotation.y = -Math.PI / 8
                } else if (this.steering == 0) {
                    this.front_left_wheel.rotation.y = 0
                    this.front_right_wheel.rotation.y = 0
                }

                this.front_left_wheel.rotation.z += this.speed*0.5
                this.front_right_wheel.rotation.z += this.speed*0.5
                this.back_left_wheel.rotation.z += this.speed*0.5
                this.back_right_wheel.rotation.z += this.speed*0.5


                //this.buggy.position.x+=this.speed*0.01
                this.direction -= this.steering * 0.01

                this.dx = Math.sin(this.direction) * this.speed * 0.1
                this.dz = Math.cos(this.direction) * this.speed * 0.1

                this.sports_car.position.x += this.dx
                this.sports_car.position.z += this.dz

                //console.log(this.direction, this.steering)

                this.sports_car.rotation.y = (this.direction - Math.PI / 2)
            }
        }

        loadModel()
        {
            const loader = new GLTFLoader()
            loader.load('./assets/3D/sports_car.glb', (gltf) => {
                console.log("gltf loaded", gltf.scene)


                gltf.scene.scale.x = 0.01
                gltf.scene.scale.y = 0.01
                gltf.scene.scale.z = 0.01
                this.scene.add(gltf.scene)

                this.sports_car = gltf.scene

                this.sports_car.traverse((child) => {
                    console.log("child", child)

                    if (child.name == "front_left_wheel") {
                        this.front_left_wheel = child
                    } else if (child.name == "front_right_wheel") {
                        this.front_right_wheel = child
                    } else if (child.name == "back_left_wheel") {
                        this.back_left_wheel = child
                    } else if (child.name == "back_right_wheel") {
                        this.back_right_wheel = child
                    }
                })


            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            }, function (error) {
                console.log('An error happened');
            })
        }


    }
}

export { sports_car }

