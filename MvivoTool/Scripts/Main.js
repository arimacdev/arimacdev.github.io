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
var addingObject;
var cubeOne;
var attachedComponent;
var gridHelperGroup;

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
	if(event.button == 0){
		if(!addingObject){
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
		}
		else
		{
			transformCOntrols.attach(attachedComponent);
			selectedObject = attachedComponent;
			obj.width = selectedObject.scale.x;
			obj.length = selectedObject.scale.z;
			gui.updateDisplay();
			addingObject = false;
			attachedComponent = null;
			transformCOntrols.visible = true;
			transformCOntrols.enabled = true;
		}
	}
	else if(event.button == 2)
	{
		if(addingObject)
		{
			group.remove( attachedComponent );
			sceneLoop();
			addingObject = false;
			attachedComponent = null;
			transformCOntrols.visible = true;
			transformCOntrols.enabled = true;
		}
	}
});

window.addEventListener( 'mousemove', function(event)
{
	if(addingObject){
		event.preventDefault();
		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( gridHelperGroup.children );
		if ( intersects.length > 0 ) {
			attachedComponent.position.set(Math.round(intersects[0].point.x), 0, Math.round(intersects[0].point.z));
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
	
	cubeOne = new THREE.Mesh( geometry, material );
	//scene.add( cubeOne );
	cubeOne.componentType = "Floor";
	
	group = new THREE.Group();
	scene.add( group );
	
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
	gridHelperGroup = new THREE.Group();
	gridHelperGroup.add( gridHelper );
	scene.add(gridHelperGroup);
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	
	addingObject = false;
	
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
		
		floor: function () {
			transformCOntrols.visible = false;
			transformCOntrols.enabled = false;
			var cube = cubeOne.clone();
			cube.componentType = "Floor";
			cube.position.set(10,0,10);
			group.add(cube);
			attachedComponent = cube;
			addingObject = true;
        },
		
		wall: function () {
			
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
	
	var itemsFolder = gui.addFolder('House Components');
	
	itemsFolder.add(obj, 'floor').name('Add floor');
	itemsFolder.add(obj, 'wall').name('Add wall');
	
	scaleFolder.open();
	itemsFolder.open();
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

