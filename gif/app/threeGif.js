import * as THREE from 'three';
class ThreeGif {
	constructor(data) {
		this.data = data;
	}
	export() {

		var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load('../../1.png');


		var scene = new THREE.Scene();

		var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

		var render = new THREE.WebGLRenderer();
		render.setClearColor(0xEEEEEE);
		render.setSize(window.innerWidth,window.innerHeight);

		var planeGeo = new THREE.PlaneGeometry(30,20,1,1);
		var planeMaterial = new THREE.MeshBasicMaterial({
			color:0xcccccc,
			side:THREE.DoubleSide,
			map:texture
		});
		var plane = new THREE.Mesh(planeGeo,planeMaterial);
		plane.rotation.x = -0.5*Math.PI;
		plane.position.set(15,0,0);
		scene.add(plane);

		var axes = new THREE.AxesHelper(20);
		scene.add(axes);

		camera.position.set(0,40,40);
		camera.lookAt(scene.position);
		document.body.appendChild(render.domElement);
		renderding();
		var step = 0;
		function renderding(){
			step += 0.01;
			plane.rotation.x = step;
			requestAnimationFrame(renderding);
			render.render(scene,camera);	
		}
	}
}

export default ThreeGif;
