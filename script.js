// Array to hold product information
const products = [
    { 
        name: "Flower", 
        price: "$20", 
        image: "images/flower.jpg", 
        model: "models/flower.glb" 
    },
    { 
        name: "jag", 
        price: "$79.99", 
        image: "images/jag.jpg", 
        model: "models/jag.glb" 
    },
    { 
        name: "Lara", 
        price: "$199.99", 
        image: "images/lara.jpg", 
        model: "models/lara.glb" 
    },    
    { 
        name: "peach", 
        price: "$199.99", 
        image: "images/peach.jpg", 
        model: "models/peach.glb" 
    }
];

let currentScene, currentCamera, currentRenderer, currentModel, currentControls;

// Function to render products dynamically on the shelf
function renderProducts() {
    const shelf = document.getElementById('product-shelf');
    shelf.innerHTML = ''; // Clear the shelf

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = function() { show3DModel(index); };

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const name = document.createElement('h3');
        name.innerText = product.name;

        productCard.appendChild(img);
        productCard.appendChild(name);

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
    
    // Clear previous content
    viewer.innerHTML = '';
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '5px';
    progressBar.style.backgroundColor = '#4CAF50';
    progressBar.style.transition = 'width 0.3s';
    loadingMessage.appendChild(progressBar);

    // Set product details in the modal
    modalProductName.textContent = products[productIndex].name;

    // Set a specific size for the viewer
    viewer.style.width = '100%';
    viewer.style.height = '400px';

    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const camera = new THREE.PerspectiveCamera(75, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
    viewer.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Load the correct 3D model from the products array
    const loader = new THREE.GLTFLoader();
    const modelPath = products[productIndex].model;

    console.log('Attempting to load model from:', modelPath);

    // Set a timeout for loading
    const loadingTimeout = setTimeout(() => {
        loadingMessage.textContent = 'Loading is taking longer than expected. Please wait...';
    }, 10000); // 10 seconds

    loader.load(
        modelPath,
        function(gltf) {
            clearTimeout(loadingTimeout);
            loadingMessage.style.display = 'none';
            console.log('Model loaded successfully:', gltf);

            const model = gltf.scene;
            if (!model) {
                throw new Error('Loaded GLTF file does not contain a valid scene');
            }

            scene.add(model);
            console.log('Model added to scene');

            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            console.log('Model centered');

            // Adjust camera position
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / Math.tan(fov / 2)) * 1.5;
            camera.position.set(cameraZ, cameraZ, cameraZ);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            console.log('Camera positioned');

            // Update controls target
            controls.target.set(0, 0, 0);
            controls.update();

            currentScene = scene;
            currentCamera = camera;
            currentRenderer = renderer;
            currentModel = model;
            currentControls = controls;

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
            console.log('Animation loop started');

            // Handle window resize
            window.addEventListener('resize', onWindowResize, false);
        },
        function(xhr) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log(percentComplete + '% loaded');
            progressBar.style.width = percentComplete + '%';
            loadingMessage.textContent = `Loading: ${Math.round(percentComplete)}%`;
        },
        function(error) {
            clearTimeout(loadingTimeout);
            loadingMessage.style.display = 'none';
            errorMessage.style.display = 'block';
            const errorDetails = `Error loading 3D model: ${error.message}\nFile: ${modelPath}`;
            errorMessage.textContent = errorDetails;
            console.error(errorDetails, error);
        }
    );

    // Show modal
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

// Close the model modal
function closeModel() {
    const modal = document.getElementById('modelModal');
    modal.style.display = 'none';
    
    // Clean up Three.js resources
    if (currentRenderer) {
        currentRenderer.dispose();
        currentRenderer = null;
    }
    if (currentScene) {
        // Remove all objects from the scene
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

// Setup tab navigation
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

// Setup buying options
function setupBuyingOptions() {
    const layerHeight = document.getElementById('layer-height');
    const fill = document.getElementById('fill');
    const color = document.getElementById('color');
    const addToCartButton = document.getElementById('add-to-cart');

    // Add event listeners to update the 3D model when options change
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
        // Implement your add to cart logic here
    });
}

// Function to update the 3D model based on selected options
function updateModel() {
    if (currentModel) {
        const layerHeight = document.getElementById('layer-height').value;
        const fill = document.getElementById('fill').value;
        const color = document.getElementById('color').value;

        // Apply layer height (scale the model vertically)
        currentModel.scale.y = parseFloat(layerHeight) * 10; // Adjust multiplier as needed

        // Apply fill (you might want to adjust this based on your specific needs)
        const fillOpacity = parseInt(fill) / 100;
        currentModel.traverse((child) => {
            if (child.isMesh) {
                child.material.opacity = fillOpacity;
                child.material.transparent = true;
            }
        });

        // Apply color
        currentModel.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setStyle(color);
            }
        });

        // Re-render the scene
        if (currentRenderer && currentScene && currentCamera) {
            currentRenderer.render(currentScene, currentCamera);
        }
    }
}

// Function to check if WebGL is available
function webglAvailable() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e) {
        return false;
    }
}

// Error handling for script loading
window.addEventListener('error', function(event) {
    console.error('Script error:', event.error);
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Script error: ${event.error.message}`;
    }
});

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupTabNavigation();
    setupBuyingOptions();

    // Check WebGL availability
    if (!webglAvailable()) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'WebGL is not available in your browser. 3D models may not display correctly.';
        }
    }
});