// 1. Логика прелоадера
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('preloader-hidden');
    }, 2200);
});

// 2. Логика 3D сцены
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Создаем технологичную сетчатую сферу под цвет логотипа
const geometry = new THREE.IcosahedronGeometry(2.5, 1);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x5c4dff, 
    wireframe: true,
    transparent: true,
    opacity: 0.6
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

camera.position.z = 6;

function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    if(container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
});
