//import '/style.css'
 
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextureLoader } from 'three'
const scene = new THREE.Scene()
const canvasObject = document.querySelector('#case-2')

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)


const renderer = new THREE.WebGLRenderer({
  canvas: canvasObject,
  antialias: true
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.set(0,0,25)

//create world
const geometry = new THREE.SphereGeometry( 10, 60,60 );
			const material = new THREE.MeshStandardMaterial( { 
        map: new TextureLoader()
        .load('/world.png'),
        wireframe:false
      } );
			const world = new THREE.Mesh( geometry, material );
			scene.add( world );
      world.rotateY(-2)

      const geometry2 = new THREE.SphereGeometry(0.1,24,24)
      const material2 = new THREE.MeshStandardMaterial({color: 0xff0000})
			const world2 = new THREE.Mesh( geometry2, material2 );
			scene.add( world2 );

      const geometry3 = new THREE.SphereGeometry(0.1,24,24)
      const material3 = new THREE.MeshStandardMaterial({color: 0xff0000})
			const world3 = new THREE.Mesh( geometry3, material3 );
			scene.add( world3 );

      const geometry4 = new THREE.SphereGeometry(0.1,24,24)
      const material4 = new THREE.MeshStandardMaterial({color: 0xff0000})
			const world4 = new THREE.Mesh( geometry4, material4 );
			scene.add( world4 );

      const geometry5 = new THREE.SphereGeometry(0.1,24,24)
      const material5 = new THREE.MeshStandardMaterial({color: 0xff0000})
			const world5 = new THREE.Mesh( geometry5, material5 );
			scene.add( world5 );
      
//iss Space
const loader = new GLTFLoader();

loader.load( '/2378_ISS_stationary.glb', (gltf) => {
  const iss3D = gltf.scene
  world2.add(iss3D)
  //iss3D.scale.set(0.00003767,0.00003767,0.00003767)
  iss3D.scale.set(0.02,0.02,0.02)
  iss3D.position.setX(-11.5179)
  loader.iss3D = iss3D
})

//Uydular
const spaceShip = new GLTFLoader();
spaceShip.load( '/spaceship.glb', (gltf) => {
  const iss3D = gltf.scene
  world4.add(iss3D)
  iss3D.scale.set(0.02,0.02,0.02)
  iss3D.position.setX(-10.5179)
  spaceShip.iss3D = iss3D
})
world4.rotateX(0.1)
world4.rotateY(1.3)


const spaceShip1 = new GLTFLoader();
spaceShip1.load( '/spaceship.glb', (gltf) => {
  const iss3D = gltf.scene
  world5.add(iss3D)
  iss3D.scale.set(0.02,0.02,0.02)
  iss3D.position.setX(-10.5179)
  spaceShip1.iss3D = iss3D
})
world5.rotateX(-0.1)
world5.rotateY(1.4)

const obstacle_geometry = new THREE.TetrahedronGeometry(0.15,2)
const obstacle_material = new THREE.MeshStandardMaterial({color: 0xff0000})
const obstacle = new THREE.Mesh( obstacle_geometry, obstacle_material );
obstacle.position.setX(-10.5179)
world3.add(obstacle)
world3.rotateY(1.9)



window.addEventListener('keydown', (e)=>{
  if(e.key == 'k' || e.key == 'K'){
    console.log();
  }
})


//Light
const ambientLight = new THREE.AmbientLight(0xffffff)
      scene.add( ambientLight )

function addStars(){
  const geometry = new THREE.SphereGeometry(0.03,24,24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}
Array(800).fill().forEach(addStars)

//mouse
const controls = new OrbitControls(camera, renderer.domElement)



//Sıfır noktasını bulmak
world2.rotateY(1.3)

//getLocate()
function animate() {
  controls.update()
  renderer.render( scene, camera )
  world.rotateY(0.000034722)
  world2.rotateY(0.0000179408)
  requestAnimationFrame(animate)

}
animate()





