JavaScript
const container = document.getElementById('webgl-container');

// 1. Создаем сцену, камеру и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 2. Создаем тестовый объект (геометрия + материал)
const geometry = new THREE.IcosahedronGeometry(2, 0);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ffcc, 
    wireframe: true 
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

camera.position.z = 5;

// 3. Запускаем цикл анимации
function animate() {
    requestAnimationFrame(animate);
    
    shape.rotation.x += 0.002;
    shape.rotation.y += 0.005;
    
    renderer.render(scene, camera);
}
animate();

// 4. Делаем сцену адаптивной при изменении размера окна
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
