/// <reference path="/usr/local/lib/node_modules/@types/three/index.d.ts"/>
function main(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
	var render = new THREE.WebGLRenderer();
	render.setClearColor(0xcccccc);
	render.setSize(window.innerWidth,window.innerHeight);
	var axes = new THREE.AxesHelper(20);
	scene.add(axes);

	var cubeGeo = new THREE.CubeGeometry(1,1,1);
	var cubeMesh = new THREE.MeshBasicMaterial({
		color:0x111111,
		wireframe:true
	});
	var cube = new THREE.Mesh(cubeGeo,cubeMesh);
	scene.add(cube);

	camera.position.set(0,0,10);
	// blue z green y red x
	camera.lookAt(scene.position);
	document.querySelector('#output').append(render.domElement);
	render.render(scene,camera);
}
window.onload = main();