var scene;
var camera;
var renderer;
var cube;
var orbitControls, transformCOntrols;
var ambientLight, directionalLight;
var selectedObject;
var mouse;
var raycaster;
var group;
var gui;
var obj;

window.addEventListener( 'resize', function()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width,height);
	camera.aspect = width/ height;
	camera.updateProjectionMatrix();
});

window.addEventListener( 'mousedown', function(event)
{
	event.preventDefault();
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( group.children );
	if ( intersects.length > 0 ) {
		if(intersects[0].object.componentType == "Floor")
		{
			transformCOntrols.attach(intersects[0].object);
			selectedObject = intersects[0].object;
			obj.width = selectedObject.scale.x;
			obj.length = selectedObject.scale.z;
			gui.updateDisplay();
		}
	}
});

var init = function()
{
	
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x111111 );
	
	camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(0, 8, 5);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
	//orbitControls.enablePan = false;
	orbitControls.maxPolarAngle = Math.PI * 0.4;
	
	transformCOntrols = new THREE.TransformControls(camera, renderer.domElement);
	
	var geometry = new THREE.BoxGeometry( 1, 0.1, 1);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0.5, 0, 0.5 ) );
	var material = new THREE.MeshLambertMaterial( {color: 0xffffff, wireframe: false} );
	
	var cubeOne = new THREE.Mesh( geometry, material );
	//scene.add( cubeOne );
	cubeOne.componentType = "Floor";
	
	var cubeTwo = new THREE.Mesh( geometry, material );
	//scene.add( cubeTwo );
	cubeTwo.componentType = "Floor";
	cubeTwo.position.set(2,0,2);
	
	group = new THREE.Group();
	group.add( cubeOne );
	group.add( cubeTwo );
	scene.add( group );
	
	transformCOntrols.attach(cubeOne);
	selectedObject = cubeOne;
	
	//modifying transform controls
	transformCOntrols.setTranslationSnap(1);
	transformCOntrols.showY = false;
	transformCOntrols.children[0].children[0].children[0].material.color = new THREE.Color( 0xffc300 );
	transformCOntrols.children[0].children[0].children[1].material.color = new THREE.Color( 0xffc300 );
	transformCOntrols.children[0].children[0].children[6].material.color = new THREE.Color( 0xff5733 );
	transformCOntrols.children[0].children[0].children[7].material.color = new THREE.Color( 0xff5733 );
	transformCOntrols.children[0].children[0].children[16].material.color = new THREE.Color( 0xc70039 );
	transformCOntrols.children[0].children[0].children[17].material.color = new THREE.Color( 0xc70039 );
	transformCOntrols.children[0].children[0].children[18].material.color = new THREE.Color( 0xc70039 );
	scene.add(transformCOntrols);
	
	transformCOntrols.addEventListener( 'dragging-changed', function ( event ) {
		orbitControls.enabled = !event.value;
	} );

	ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
	scene.add(ambientLight);
	
	directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
	directionalLight.position.set(0, 10, 10);
	directionalLight.rotation.set(0, 45, 45);
	scene.add(directionalLight);
	
	var size = 100;
	var divisions = 100;

	var gridHelper = new THREE.GridHelper( size, divisions );
	scene.add( gridHelper );
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	
	initDatGui();
	
	sceneLoop();
};

var initDatGui = function()
{
	obj = {
        recenter: function () {
			camera.position.set(0, 8, 5);
			camera.lookAt(0,0,0);
        },
		
		width: 1,
		length: 1,
    };
	
	gui = new dat.gui.GUI();

    gui.remember(obj);
	
	gui.add(obj, 'recenter').name('Recenter');
	
	var scaleFolder = gui.addFolder('Scale');

	scaleFolder.add(obj, 'width').min(1).max(10).step(1).onFinishChange(function(){
		selectedObject.scale.set(obj.width, 0.1, obj.length);
	});
	
	scaleFolder.add(obj, 'length').min(1).max(10).step(1).onFinishChange(function(){
		selectedObject.scale.set(obj.width, 0.1, obj.length);
	});;
};

var update = function()
{
	
};

var render = function()
{
	renderer.render(scene, camera);
};

var sceneLoop = function()
{
	requestAnimationFrame(sceneLoop);
	update();
	render();
};

init();

