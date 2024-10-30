// Array to hold product information
const products = [
    { 
        name: "Bulldog", 
        price: "???", 
        image: "images/Bulldog.png", 
        model: "models/Bulldog.stl" 
    },
    { 
        name: "Kuromi", 
        price: "???", 
        image: "images/Kuromi.png", 
        model: "models/Kuromi.stl" 
    },    { 
        name: "Psyche-Mercury", 
        price: "???", 
        image: "images/Psyche-Mercury.png", 
        model: "models/Psyche-Mercury.stl" 
    },    { 
        name: "TuringVase", 
        price: "???", 
        image: "images/TuringVase.png", 
        model: "models/TuringVase.stl" 
    },
    { 
        name: "Totoro (Ghibli)", 
        price: "???", 
        image: "images/Totoro (Ghibli).png", 
        model: "models/Totoro (Ghibli).stl" 
    },
    { 
        name: "Murakami Flower", 
        price: "???", 
        image: "images/Murakami Flower.png", 
        model: "models/Murakami Flower.stl" 
    },
    { 
        name: "Nautilus", 
        price: "???", 
        image: "images/Nautilus.png", 
        model: "models/Nautilus.stl" 
    },
    { 
        name: "Ocarina", 
        price: "???", 
        image: "images/Ocarina.png", 
        model: "models/Ocarina.stl" 
    },
    { 
        name: "Apple Watch Stand", 
        price: "???", 
        image: "images/Apple Watch Stand.png", 
        model: "models/Apple Watch Stand.stl" 
    },
    { 
        name: "Benchy Barco", 
        price: "???", 
        image: "images/Benchy Barco.png", 
        model: "models/Benchy Barco.stl" 
    },
    { 
        name: "Bluey", 
        price: "???", 
        image: "images/Bluey.png", 
        model: "models/Bluey.stl" 
    },
    { 
        name: "Canelo", 
        price: "???", 
        image: "images/Canelo.png", 
        model: "models/Canelo.stl" 
    },
    { 
        name: "Chica Arrodillada", 
        price: "???", 
        image: "images/Chica Arrodillada.png", 
        model: "models/Chica Arrodillada.stl" 
    },
    { 
        name: "Cubone Stand", 
        price: "???", 
        image: "images/Cubone Stand.png", 
        model: "models/Cubone Stand.stl" 
    },
    { 
        name: "Fantasma (NSFW)", 
        price: "???", 
        image: "images/Fantasma (NSFW).png", 
        model: "models/Fantasma (NSFW).stl" 
    },
    { 
        name: "Hongos", 
        price: "???", 
        image: "images/Hongos.png", 
        model: "models/Hongos.stl" 
    },
    { 
        name: "Karambit", 
        price: "???", 
        image: "images/Karambit.png", 
        model: "models/Karambit.stl" 
    },
    { 
        name: "Meditante Flotante", 
        price: "???", 
        image: "images/Meditante Flotante.png", 
        model: "models/Meditante Flotante.stl" 
    },
    { 
        name: "Mimir (God Of War)", 
        price: "???", 
        image: "images/Mimir (God Of War).png", 
        model: "models/Mimir (God Of War).stl" 
    },
    { 
        name: "Oogy Boogy", 
        price: "???", 
        image: "images/Oogy Boogy.png", 
        model: "models/Oogy Boogy.stl" 
    },
    { 
        name: "Orejas de Gato", 
        price: "???", 
        image: "images/Orejas de Gato.png", 
        model: "models/Orejas de Gato.stl" 
    },
    { 
        name: "Peach (Super Mario Bros.)", 
        price: "???", 
        image: "images/Peach (Super Mario Bros.).png", 
        model: "models/Peach (Super Mario Bros.).stl" 
    },
    { 
        name: "Pikachu", 
        price: "???", 
        image: "images/Pikachu.png", 
        model: "models/Pikachu.stl" 
    },
    { 
        name: "Rafachu", 
        price: "???", 
        image: "images/Rafachu.png", 
        model: "models/Rafachu.stl" 
    },
    { 
        name: "Ranita", 
        price: "???", 
        image: "images/Ranita.png", 
        model: "models/Ranita.stl" 
    },
    { 
        name: "Ternurin", 
        price: "???", 
        image: "images/Ternurin.png", 
        model: "models/Ternurin.stl" 
    },
    { 
        name: "Trompo (Inception)", 
        price: "???", 
        image: "images/Trompo (Inception).png", 
        model: "models/Trompo (Inception).stl" 
    }
];

let currentScene, currentCamera, currentRenderer, currentModel, currentControls;

function renderProducts() {
    const shelf = document.getElementById('product-shelf');
    shelf.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = function() { show3DModel(index); };

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'product-image-wrapper';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';

        const name = document.createElement('h3');
        name.innerText = product.name;

        const price = document.createElement('p');
        price.innerText = product.price;

        imageWrapper.appendChild(img);
        infoDiv.appendChild(name);
        infoDiv.appendChild(price);
        
        productCard.appendChild(imageWrapper);
        productCard.appendChild(infoDiv);

        shelf.appendChild(productCard);
    });
}
// Function to initialize three.js scene and load 3D models
function show3DModel(productIndex) {
    const modal = document.getElementById('modelModal');
    const viewer = document.getElementById('3d-viewer');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const modalProductName = document.getElementById('modal-product-name');
    
    viewer.innerHTML = '';
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '5px';
    progressBar.style.backgroundColor = '#4CAF50';
    progressBar.style.transition = 'width 0.3s';
    loadingMessage.appendChild(progressBar);

    modalProductName.textContent = products[productIndex].name;
    viewer.style.width = '100%';
    viewer.style.height = '400px';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const camera = new THREE.PerspectiveCamera(75, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
    viewer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const loader = new THREE.GLTFLoader();
    const modelPath = products[productIndex].model;

    const loadingTimeout = setTimeout(() => {
        loadingMessage.textContent = 'Loading is taking longer than expected. Please wait...';
    }, 10000);

    loader.load(
        modelPath,
        function(gltf) {
            clearTimeout(loadingTimeout);
            loadingMessage.style.display = 'none';
            
            const model = gltf.scene;
            if (!model) {
                throw new Error('Loaded GLTF file does not contain a valid scene');
            }

            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / Math.tan(fov / 2)) * 1.5;
            camera.position.set(cameraZ, cameraZ, cameraZ);
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            controls.target.set(0, 0, 0);
            controls.update();

            currentScene = scene;
            currentCamera = camera;
            currentRenderer = renderer;
            currentModel = model;
            currentControls = controls;

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('resize', onWindowResize, false);
        },
        function(xhr) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            progressBar.style.width = percentComplete + '%';
            loadingMessage.textContent = `Loading: ${Math.round(percentComplete)}%`;
        },
        function(error) {
            clearTimeout(loadingTimeout);
            loadingMessage.style.display = 'none';
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Error loading 3D model: ${error.message}\nFile: ${modelPath}`;
            console.error(error);
        }
    );

    modal.style.display = 'flex';
}
function onWindowResize() {
    if (currentCamera && currentRenderer) {
        const viewer = document.getElementById('3d-viewer');
        currentCamera.aspect = viewer.clientWidth / viewer.clientHeight;
        currentCamera.updateProjectionMatrix();
        currentRenderer.setSize(viewer.clientWidth, viewer.clientHeight);
    }
}

function closeModel() {
    const modal = document.getElementById('modelModal');
    modal.style.display = 'none';
    
    if (currentRenderer) {
        currentRenderer.dispose();
        currentRenderer = null;
    }
    if (currentScene) {
        while(currentScene.children.length > 0){ 
            currentScene.remove(currentScene.children[0]); 
        }
        currentScene = null;
    }
    if (currentControls) {
        currentControls.dispose();
        currentControls = null;
    }
    currentCamera = null;
    currentModel = null;
}

function setupTabNavigation() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('tab');

            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            tabLinks.forEach(link => {
                link.classList.remove('active');
            });

            document.getElementById(tabId).classList.add('active');
            link.classList.add('active');
        });
    });
}

function setupBuyingOptions() {
    const layerHeight = document.getElementById('layer-height');
    const fill = document.getElementById('fill');
    const color = document.getElementById('color');
    const addToCartButton = document.getElementById('add-to-cart');

    layerHeight.addEventListener('change', updateModel);
    fill.addEventListener('change', updateModel);
    color.addEventListener('change', updateModel);

    addToCartButton.addEventListener('click', () => {
        const options = {
            layerHeight: layerHeight.value,
            fill: fill.value,
            color: color.value
        };
        console.log('Adding to cart with options:', options);
    });
}

function updateModel() {
    if (currentModel) {
        const layerHeight = document.getElementById('layer-height').value;
        const fill = document.getElementById('fill').value;
        const color = document.getElementById('color').value;

        currentModel.scale.y = parseFloat(layerHeight) * 10;

        const fillOpacity = parseInt(fill) / 100;
        currentModel.traverse((child) => {
            if (child.isMesh) {
                child.material.opacity = fillOpacity;
                child.material.transparent = true;
                child.material.color.setStyle(color);
            }
        });

        if (currentRenderer && currentScene && currentCamera) {
            currentRenderer.render(currentScene, currentCamera);
        }
    }
}

function webglAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e) {
        return false;
    }
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupTabNavigation();
    setupBuyingOptions();

    if (!webglAvailable()) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'WebGL is not available in your browser. 3D models may not display correctly.';
        }
    }
});