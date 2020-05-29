
import React, { Component } from "react";
import * as THREE from "../../node_modules/three/build/three.module";
// import { DragControls } from '../../node_modules/three/examples/jsm/controls/DragControls.js';
import { DeviceOrientationControls } from '../../node_modules/three/examples/jsm/controls/DeviceOrientationControls.js';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../../node_modules/three/examples/jsm/loaders/MTLLoader.js';
import Swipe from 'swipejs';
import ceinture from '../3D/ceinture.obj';
import chapelet from '../3D/chapelet.obj';
import corps from '../3D/corps.obj';
import cou from '../3D/cou.obj';
import mains from '../3D/mains.obj';
import mainsMtl from '../3D/mains.mtl';
import pieds from '../3D/pieds.obj';
import piedsMtl from '../3D/pieds.mtl';
import visage from '../3D/visage.obj';
import visageMtl from '../3D/visage.mtl';
import visage2 from '../3D/visage2.obj';
import visage2Mtl from '../3D/visage2.mtl';
import voile from '../3D/voile.obj';

class Pimp extends Component {
  componentDidMount() {
      console.log('prout')

    
// Variables
let camera,
scene,
renderer,
controls_skull_scene,
color_selected = [],
controls_camera,
clock,
canvas,
virgin_scene,
place_it = false,
delta,
virgin_object_group,
virgin_object_ceinture,
virgin_object_chapelet,
virgin_object_corps,
virgin_object_cou,
virgin_object_voile,
virgin_object_mains,
virgin_object_pieds,
virgin_object_visage,
virgin_object_one,
virgin_object_fbx,
all_object_list = [],
intersects,
objects_dragable = [],
controls_object_dragable,
topRectHauteur,
click_on_visage = 0;

const mixers = [];
const mixersScream = [];
let troisDimension = false;

let distance = 0;

let orientationDevice;

// custom global variables
let targetList = [];
    
let mouse = {
    x: 0,
    y: 0
};

// Element du DOM
let launch = document.querySelector(".launch"),
content = document.getElementById('content'),
cadre = document.getElementById('cadre'),
oeuvre = document.getElementById('oeuvre'),
cible = document.getElementById('cible'),
bottomRect = document.getElementById('bottomRect'),
topRect = document.getElementById('topRect'),
leftRect = document.getElementById('leftRect'),
rightRect = document.getElementById('rightRect'),
slider = document.getElementById('slider'),
deviceBtn = document.getElementById("deviceBtn"),
deviceOrientation = document.getElementById("deviceOrientation"),
loadingPage = document.getElementById("loadingPage"),
lookAround = document.getElementById('lookAround'),
validate_button = document.getElementById('validate'),
buttontarget = document.getElementById('buttontarget'),
edit = document.getElementById('edit'),
swipeClass = document.querySelector('.swipe'),
interaction = document.getElementById('interaction'),
colorInterface = document.getElementById('colorInterface');

    //// Device Orientation 
    if ( window.DeviceOrientationEvent === undefined || typeof window.DeviceOrientationEvent.requestPermission !== 'function' ) {
        launch.addEventListener('touchstart', ()=>{

            all_object_list.forEach(element =>{
                var cameraDirection = new THREE.Vector3();
                camera.getWorldDirection(cameraDirection);
                element.lookAt(cameraDirection);
            })
        
            troisDimension = true;        
            canvas = document.querySelector('canvas');
            canvas.addEventListener('touchstart', onDocumentMouseDown, false);
            slider.style.zIndex = '18';
            launch.style.transition= " 2s";
            launch.style.opacity="0";
            launch.style.zIndex="0";
        });
    } else {
        deviceBtn.addEventListener( 'click', () => {
            bottomRect.removeChild( deviceOrientation );
        
            troisDimension = true;
            canvas = document.querySelector('canvas');
            canvas.addEventListener('touchstart', onDocumentMouseDown, false);
            slider.style.zIndex = '18';
            launch.style.transition= " 2s";
            launch.style.opacity="0";
            launch.style.zIndex="0";
            
            // Connection pour les controls au gyroscope
            controls_skull_scene.connect();
            controls_camera.connect();

            setTimeout(()=>{
                all_object_list.forEach(element =>{
                    var cameraDirection = new THREE.Vector3();
                    camera.getWorldDirection(cameraDirection);
                    element.lookAt(cameraDirection);
                })
            }, 500)
        });
    }

    // === THREE.JS CODE START ===
    scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 50000);
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setClearColor( 0x000000, 0 );
		renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        clock = new THREE.Clock();
        const rootElement = document.getElementById("customshoes");
        renderer.setSize( rootElement.clientWidth, rootElement.clientHeight );
        rootElement.appendChild( renderer.domElement );

        // Creation et naming des groupes
                virgin_scene = new THREE.Group();
                virgin_object_ceinture = new THREE.Group();
                virgin_object_chapelet = new THREE.Group();
                virgin_object_corps = new THREE.Group();
                virgin_object_cou = new THREE.Group();
                virgin_object_voile = new THREE.Group();
                virgin_object_mains = new THREE.Group();
                virgin_object_pieds = new THREE.Group();
                virgin_object_visage = new THREE.Group();
                virgin_object_one = new THREE.Group();
                virgin_scene.name = "virgin_scene_group";
                virgin_object_ceinture.name = "virgin_object_ceinture_group";
                virgin_object_corps.name = "virgin_object_corps_group";
                virgin_object_cou.name = "virgin_object_cou_group";
                virgin_object_voile.name = "virgin_object_voile_group";
                virgin_object_mains.name = "virgin_object_mains_group";
                virgin_object_pieds.name = 'virgin_object_pieds_group';
                virgin_object_visage.name = 'virgin_object_visage';
                virgin_scene.add( virgin_object_ceinture );
                virgin_scene.add( virgin_object_chapelet );
                virgin_scene.add( virgin_object_corps );
                virgin_scene.add( virgin_object_cou );
                virgin_scene.add( virgin_object_voile );
                virgin_scene.add( virgin_object_mains );
                virgin_scene.add( virgin_object_pieds );
                virgin_scene.add( virgin_object_visage );
                scene.add( virgin_scene );
        
                camera.position.set( 0, 0, 0 );
                virgin_scene.position.set( 0,0,800 );
                virgin_scene.scale.set( 1.5,1.5,1.5 );
                camera.lookAt( virgin_scene.position );
                virgin_scene.lookAt( camera.position );

///////////////// Controls
        controls_skull_scene = new DeviceOrientationControls( virgin_scene );
        controls_camera = new DeviceOrientationControls(camera);


// texture, loader et Manager
let manager = new THREE.LoadingManager();
manager.onProgress = function(item, loaded, total) {
};

let onProgress = function(xhr) {
    if ( xhr.lengthComputable ) {
        let percentComplete = xhr.loaded / xhr.total * 100;
    }
};    
let onError = function(xhr) {};    
let loader = new THREE.ImageLoader(manager);

// Lights
let light_one = new THREE.PointLight( 0xffffff, 50, 4000, 75 );
light_one.scale.set(1,1,1);
light_one.position.set( 0, 300, 550);
scene.add(light_one);
        
let light_two = new THREE.PointLight( 0xffffff, 50, 4000, 75 );
light_two.scale.set(1,1,1);
light_two.position.set( 0, 0, 550);
scene.add(light_two);
    
let light_three = new THREE.PointLight( 0xffffff, 50, 4000, 75 );
light_three.scale.set(1,1,1);
light_three.position.set( 0, -300, 600);
scene.add(light_three);


// Import de la 3D pour chaque part
    
    // ceinture
    let loader_ceinture = new OBJLoader(manager);
    loader_ceinture.load(ceinture, function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.color = {r: getRandomInt(0,255)/255, g: getRandomInt(0,255)/255, b: getRandomInt(0,255)/255};
                child.name = "ceinture";
                child.selected = false;
                targetList.push(child);
                all_object_list.push(child);
            }
        });
        object.scale.set(30,30,30);
        object.position.set(0, 0, 0);
        virgin_object_ceinture.add( object );

    }, onProgress, onError);
    
    // chapelet
    let loader_chapelet = new OBJLoader(manager);
    loader_chapelet.load(chapelet, function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.color = {r: getRandomInt(0,255)/255, g: getRandomInt(0,255)/255, b: getRandomInt(0,255)/255};
                child.name = "chapelet";
                child.selected = false;
                targetList.push(child);
                all_object_list.push(child);
            }
        });
        object.scale.set(30,30,30);
        object.position.set(0, 0, 0);
        virgin_object_chapelet.add( object );

    }, onProgress, onError);
    
    // corps
    let loader_corps = new OBJLoader(manager);
    loader_corps.load(corps, function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.color = {r: 0, g: 0, b: 0};
                child.name = "corps";
                child.selected = true;
                targetList.push(child);
                all_object_list.push(child);
            }
        });
        object.scale.set(30,30,30);
        object.position.set(0, 0, 0);
        virgin_object_corps.add( object );

    }, onProgress, onError);
    
    // cou
    let loader_cou = new OBJLoader(manager);
    loader_cou.load(cou, function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.color = {r: getRandomInt(0,255)/255, g: getRandomInt(0,255)/255, b: getRandomInt(0,255)/255};
                child.name = "cou";
                child.selected = false;
                targetList.push(child);
                all_object_list.push(child);
            }
        });
        object.scale.set(30,30,30);
        object.position.set(0, 0, 0);
        virgin_object_cou.add( object );

    }, onProgress, onError);
    
    // mains
    let loader_mains = new OBJLoader( manager );
    let mtl_mains = new MTLLoader( manager );
    
    mtl_mains
    .setPath( '3D/' )
    .load( '../3D/mains.mtl', function ( materials ) {
        materials.preload();
        loader_mains
            .setMaterials( materials )
            .setPath( '3D/' )
            .load( mains, function ( object ) {
                    object.traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            child.material.color = {r: 1, g: 1, b: 1};
                            child.name = "mains";
                            child.selected = false;
                            targetList.push(child);
                            all_object_list.push(child);
                        }
                    });
                    object.scale.set(30,30,30);
                    object.position.set(0, 0, 0);
                    virgin_object_mains.add( object );
            },onProgress, onError );
    } );
    
    // pieds
    let loader_pieds = new OBJLoader( manager );
    let mtl_pieds = new MTLLoader( manager );
    
    mtl_pieds
    .setPath( '3D/' )
    .load( piedsMtl, function ( materials ) {
        materials.preload();
        loader_pieds
            .setMaterials( materials )
            .setPath( '3D/' )
            .load( pieds, function ( object ) {
                    object.traverse(function( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color = {r: 1, g: 1, b: 1};
                            child.name = "pieds";
                            child.selected = false;
                            targetList.push(child);
                            all_object_list.push(child);
                        }
                    });
                    object.scale.set(30,30,30);
                    object.position.set(0, 0, 0);
                    virgin_object_pieds.add( object );
            },onProgress, onError );
    } );
    
    // visage
    let loader_visage = new OBJLoader( manager );
    let mtl_visage = new MTLLoader( manager );
    
    mtl_visage
    .setPath( '3D/' )
    .load( visageMtl, function ( materials ) {
        materials.preload();
        loader_visage
            .setMaterials( materials )
            .setPath( '3D/' )
            .load( visage, function ( object ) {
                    object.traverse(function( child ) {
                        if (child instanceof THREE.Mesh) {
                            child.material.color = {r: 1, g: 1, b: 1};
                            child.name = "visage";
                            child.selected = false;
                            targetList.push(child);
                            all_object_list.push(child);
                        }
                    });
                    object.scale.set(30,30,30);
                    object.position.set(0, 0, 0);
                    virgin_object_visage.add( object );
            },onProgress, onError );
    } );
    
    // visage
    let loader_visage_2 = new OBJLoader( manager );
    let mtl_visage_2 = new MTLLoader( manager );
    
    mtl_visage_2
    .setPath( '3D/' )
    .load( visage2Mtl, function ( materials ) {
        materials.preload();
        loader_visage_2
            .setMaterials( materials )
            .setPath( '3D/' )
            .load( visage2, function ( object ) {
                    object.traverse(function( child ) {
                        if (child instanceof THREE.Mesh) {
                            child.material.color = {r: 1, g: 1, b: 1};
                            child.name = "visage_2";
                            child.selected = false;
                            targetList.push(child);
                            all_object_list.push(child);
                        }
                    });
                    object.scale.set(0.1,0.1,0.1);
                    object.position.set(0, 0, 0);
                    virgin_object_visage.add( object );
            },onProgress, onError );
    } );
    
    // voile
    let loader_voile = new OBJLoader(manager);
    loader_voile.load(voile, function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.color = {r: getRandomInt(0,255)/255, g: getRandomInt(0,255)/255, b: getRandomInt(0,255)/255};
                child.name = "voile";
                child.selected = false;
                targetList.push(child);
                all_object_list.push(child);
            }
        });
        object.scale.set(30,30,30);
        object.position.set(0, 0, 0);
        virgin_object_voile.add( object );

    }, onProgress, onError);


///// Swipe et color selection
window.mySwipe = new Swipe(slider);
let color_green_2 = document.getElementById('color_green_2');
color_green_2.clicked = 0;
let color_green = document.getElementById('color_green');
color_green.clicked = 0;
let color_yellow = document.getElementById('color_yellow');
color_yellow.clicked = 0;
let color_orange = document.getElementById('color_orange');
color_orange.clicked = 0;
let color_red = document.getElementById('color_red');
color_red.clicked = 0;
let color_violet = document.getElementById('color_violet');
color_violet.clicked = 0;
let color_blue = document.getElementById('color_blue');
color_blue.clicked = 0;
let color_blue_sky = document.getElementById('color_blue_sky');
color_blue_sky.clicked = 0;
let color_white = document.getElementById('color_white');
color_white.clicked = 0;
let color_grey = document.getElementById('color_grey');
color_grey.clicked = 0;
let color_black = document.getElementById('color_black');
color_black.clicked = 0;
let tab_color = [color_green_2, color_green, color_yellow, color_orange, color_red, color_violet, color_blue, color_blue_sky, color_white, color_grey, color_black];
setInterval(()=>{
    tab_color.forEach(element =>{
        if( element.style.transform === "translateX(0px)"){
            color_selected.b = element.getAttribute('b');
            color_selected.g = element.getAttribute('g');
            color_selected.r = element.getAttribute('r');
            colorInterface.style.backgroundColor = element.getAttribute('rgba');
            targetList.forEach(element_2 => {
                if( element_2.selected === true){
                    element_2.material.color.b = color_selected.b;
                    element_2.material.color.g = color_selected.g;
                    element_2.material.color.r = color_selected.r;
                }
            });
        }
    })
}, 200)


/////// FONCTION RANDOM
function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

    var animate = function () {
        // time
        let time = Date.now() * 0.0010;
    
        delta = clock.getDelta();
    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (mixers.length > 0)
        {
            for ( let i = 0; i < mixers.length; i ++ )
            {
                mixers[ i ].update( clock.getDelta() );
            }
        }
        if (mixersScream.length > 0)
        {
            for ( let i = 0; i < mixersScream.length; i ++ )
            {
                // mixersScream[ i ].update( clockScream.getDelta() );
            }
        }
    
        if( place_it === true && controls_camera !== undefined){
            controls_camera.update();
        }
        if( place_it === false && controls_skull_scene !== undefined){
            controls_skull_scene.update();
        }
    
        renderer.render( scene, camera );
    
        setTimeout( window.requestAnimationFrame(animate),1000/30);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===

function onDocumentMouseDown(event)
{
    tab_color.forEach( truc => {
        truc.children[0].style.opacity = "0";
    });

    event.preventDefault();
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
    // event.preventDefault();

	// update the mouse variable
	mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
    let vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    
    let ray = new THREE.Raycaster();

    ray.setFromCamera( vector, camera);

	// create an array containing all objects in the scene with which the ray intersects
    intersects = ray.intersectObjects( targetList );

    // if there is one (or more) intersections
    ////////////// test avec 2 Perso //////////
	if ( intersects.length > 0 && troisDimension === true)
	{
        if( intersects[0].object.name === "ceinture" || intersects[0].object.name === "chapelet" || intersects[0].object.name === "corps" || intersects[0].object.name === "cou" || intersects[0].object.name === "voile"  || intersects[0].object.name === "mains" || intersects[0].object.name === "pieds" || intersects[0].object.name === "visage" || intersects[0].object.name === "visage_2" ||
        intersects[0].object.selected === true)
        {
            if( intersects[0].object.selected === false)
            {
                targetList.forEach(element => {
                    if( element.selected === true)
                    {
                    }
                });
                if( intersects[0].object.name === "visage" || intersects[0].object.name === "visage_2" ){
                    // virgin_object_visage.children[0].children[0].material.color.b = 0.9;
                    // virgin_object_visage.children[0].children[0].material.color.g = 0.9;
                    // virgin_object_visage.children[0].children[0].material.color.r = 0.9;
                    // virgin_object_visage.children[1].children[0].material.color.b = 0.9;
                    // virgin_object_visage.children[1].children[0].material.color.g = 0.9;
                    // virgin_object_visage.children[1].children[0].material.color.r = 0.9;
                } else {
                    intersects[0].object.material.color.b = 0.9;
                    intersects[0].object.material.color.g = 0.9;
                    intersects[0].object.material.color.r = 0.9;
                    intersects[0].object.selected = true;
                }
                targetList.forEach(element => {
                    if( element.name !== intersects[0].object.name )
                    {
                        element.selected = false;
                    }
                });
            } else {
                if( intersects[0].object.name !== "visage" || intersects[0].object.name !== "visage_2"){
                    return intersects[0].object.selected === false;
                }
            }
        }
        if( intersects[0].object.name === "visage" ){
            virgin_object_visage.children[0].scale.set(0.1,0.1,0.1);
            virgin_object_visage.children[1].scale.set(30,30,30);
        } else if ( intersects[0].object.name === "visage_2" ){
            virgin_object_visage.children[0].scale.set(30,30,30);
            virgin_object_visage.children[1].scale.set(0.1,0.1,0.1);
        }
    }
    ////////////////////////////
};
validate_button.addEventListener('touchstart', ()=>{
    if( place_it === false){
        place_it = true;
        setTimeout(()=>{
            let cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            scene.lookAt(cameraDirection);
        }, 500);
    } else {
        place_it = false;
        let cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        scene.lookAt(cameraDirection);
    }
});
  }
  render() {
    return (
        <div ref={ref => (this.mount = ref)} />
    )
  }
}

//const rootElement = document.getElementById("customshoes");
//ReactDOM.render(<Pimp />, rootElement);

export default Pimp;