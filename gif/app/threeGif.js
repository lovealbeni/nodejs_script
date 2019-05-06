import * as THREE from 'three';
class ThreeGif {
	constructor(data) {
		this.data = data;
	}
	export() {
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		var render = new THREE.WebGLRenderer();
        render.setSize(window.innerWidth, window.innerHeight);

        var color = new THREE.Color();
        color.setHex('0xffffff');

        render.setClearColor(color);
		document.body.appendChild(render.domElement);

        var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load('../../earth.jpg');
		var material = new THREE.MeshBasicMaterial({ map: texture });
		var sphere = new THREE.SphereGeometry(1, 20, 20);
		var mesh = new THREE.Mesh(sphere, material);
		scene.add(mesh);

		function animate() {
			requestAnimationFrame(animate);
			mesh.rotation.y += 0.05;
			render.render(scene, camera);
		}

		animate();
	}
}

export default ThreeGif;
