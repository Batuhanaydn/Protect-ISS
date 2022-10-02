//import '/style.css'
 
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextureLoader } from 'three'
const scene = new THREE.Scene()
const canvasObject = document.querySelector('#bg')

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
camera.position.set(0,0,90)

//create world
const geometry = new THREE.SphereGeometry( 10, 60,60 );
			const material = new THREE.MeshStandardMaterial( { 
        map: new TextureLoader()
        .load('/world.png'),
        wireframe:false
      } );
			const world = new THREE.Mesh( geometry, material );
			scene.add( world );

      const geometry2 = new THREE.SphereGeometry(0.1,24,24)
      const material2 = new THREE.MeshStandardMaterial({color: 0xff0000})
			const world2 = new THREE.Mesh( geometry2, material2 );
			scene.add( world2 );
      
//iss Space
// function  ( gltf )
const loader = new GLTFLoader();

loader.load( '/2378_ISS_stationary.glb', (gltf) => {
  const iss3D = gltf.scene
  world2.add(iss3D)
  //iss3D.scale.set(0.00003767,0.00003767,0.00003767)
  iss3D.scale.set(0.02,0.02,0.02)
  iss3D.position.setX(-11.5179)
  loader.iss3D = iss3D
})


window.addEventListener('keydown', (e)=>{
  if(e.key == 'k' || e.key == 'K'){
    console.log();
  }
})


//Alternatif
// setTimeout(() => {
//   console.log(loader.iss3D);  
// }, 3000);

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
//Helpers
//var axis = new THREE.AxesHelper(1);
//    scene.add(axis);


//Sıfır noktasını bulmak
world2.rotateY(59.85)

//getLocate()
function animate() {
  controls.update()
  renderer.render( scene, camera )
  world.rotateY(0.000034722)
  world2.rotateY(0.0000179408)
  requestAnimationFrame(animate)

}
animate()




async function fetchRealLocate(){
  let url = 'https://api.wheretheiss.at/v1/satellites/25544'
  try{
    let result = await fetch(url)
    let iss = await result.json()

    let latitude = (62.8-iss['latitude'])
    let longitude =(iss['longitude'])*-1

    return [latitude, longitude]
  }catch(error){
    console.log("Hata Aldık");
  }
}



const ui = document.getElementById('body')
async function getLocate(){
  try{
    let value = await fetchRealLocate()
    console.log();
    console.log(value[0])
    console.log(value[1])
    world2.rotateY(value[0])
    world2.rotateZ(value[1])
    ui.innerHTML += `
    <div class="data">
    <div class="ui-item">${value[0]}</div>
    <div class="ui-item">${value[1]}</div>
    </div>
    `
    
  }catch(e){
    console.log(e)
  }
}

getLocate()




