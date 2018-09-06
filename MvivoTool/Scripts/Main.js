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
var cubeFloor, cubeWallInt;
var attachedComponent;
var gridHelperGroup;
var floorColorArray, wallColorArray;
var widthBar, heightBar;

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
				if(intersects[0].object.componentType == "Floor" || intersects[0].object.componentType == "WallInt" )
				{
					transformCOntrols.attach(intersects[0].object);
					selectedObject = intersects[0].object;
					obj.width = selectedObject.scale.x;
					obj.length = selectedObject.scale.z;
					var col = selectedObject.material.color.getHex().toString(16);
					obj.color = '#' + col;
					gui.updateDisplay();
					updateGui();
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
			updateGui();
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
			if(attachedComponent.componentType == "Floor"){
				attachedComponent.position.set(Math.round(intersects[0].point.x), 0.05, Math.round(intersects[0].point.z));
			}
			else if(attachedComponent.componentType == "WallInt"){
				attachedComponent.position.set((Math.round(intersects[0].point.x/0.5))*0.5, 1.5, (Math.round(intersects[0].point.z/0.5))*0.5);
			}
		}
	}
});

var init = function()
{	
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x111111 );
	
	camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(0, 8, 5);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
	//orbitControls.enablePan = false;
	orbitControls.maxPolarAngle = Math.PI * 0.4;
	
	transformCOntrols = new THREE.TransformControls(camera, renderer.domElement);
	
	initMeshes();
	
	group = new THREE.Group();
	scene.add( group );
	
	//modifying transform controls
	transformCOntrols.setTranslationSnap(0.5);
	transformCOntrols.setRotationSnap( THREE.Math.degToRad( 90 ) );
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
	gridHelper.position.set(0.5, 0, 0.5);
	gridHelperGroup = new THREE.Group();
	gridHelperGroup.add( gridHelper );
	scene.add(gridHelperGroup);
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	
	addingObject = false;
	floorColorArray = ['0x71c7ec','0x1ebbd7','0x189ad3','0x107dac'];
	wallColorArray = ['0xc1d11f','0x6ec007','0x34a203','0x3d860b'];
	
	initDatGui();
	
	sceneLoop();
};

var initMeshes = function()
{
	var geometry = new THREE.BoxGeometry( 1, 0.1, 1);
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0.5, 0, 0.5 ) );
	var material = new THREE.MeshLambertMaterial( {color: 0xffffff, wireframe: false} );
	cubeFloor = new THREE.Mesh( geometry, material );
	
	geometry = new THREE.BoxGeometry( 1, 3, 0.1);
	material = new THREE.MeshLambertMaterial( {color: 0xffffff, wireframe: false} );
	cubeWallInt = new THREE.Mesh( geometry, material );
};

var initDatGui = function()
{
	obj = {
        recenter: function () {
			camera.position.set(0, 8, 5);
			camera.lookAt(0,0,0);
        },
		
		rotateB: function () {
			transformCOntrols.setMode( "rotate" );
			transformCOntrols.showX = false;
			transformCOntrols.showZ = false;
			transformCOntrols.showY = true;
        },
		
		moveB: function () {
			transformCOntrols.setMode( "translate" );
			transformCOntrols.showX = true;
			transformCOntrols.showZ = true;
			transformCOntrols.showY = false;
        },
		
		removel: function () {
			if(selectedObject != null){
				group.remove( selectedObject );
				transformCOntrols.attach(group);
				selectedObject = null;
				transformCOntrols.visible = false;
				sceneLoop();
			}
        },
		
		selectItem: function () {
			
        },
		
		floor: function () {
			transformCOntrols.visible = false;
			transformCOntrols.enabled = false;
			var cube = cubeFloor.clone();
			var mat = cube.material.clone();
			mat.color.setHex('0xffffff');
			obj.color = "#ffffff";
			cube.material = mat;
			cube.componentType = "Floor";
			cube.name = "Floor " + group.children.length;
			group.add(cube);
			cube.position.y = 0.05;
			attachedComponent = cube;
			addingObject = true;
			highFloorFolder.add(obj, "selectItem").name(cube.name).onChange(function(){
				transformCOntrols.attach(cube);
				selectedObject = cube;
			});
			highUI.updateDisplay();
			gui.updateDisplay();
        },
		
		internalWall: function () {
			transformCOntrols.visible = false;
			transformCOntrols.enabled = false;
			var cube = cubeWallInt.clone();
			var mat = cube.material.clone();
			mat.color.setHex('0xffffff');
			obj.color = "#ffffff";
			cube.material = mat;
			cube.componentType = "WallInt";
			cube.name = "Wall " + group.children.length;
			group.add(cube);
			cube.position.y = 1;
			attachedComponent = cube;
			addingObject = true;
			highWallFolder.add(obj, "selectItem").name(cube.name).onChange(function(){
				transformCOntrols.attach(cube);
				selectedObject = cube;
			});
			gui.updateDisplay();
        },
		
		externalWallLeft: function () {
			
        },
		
		width: 1,
		length: 1,
		
		color: "#ffffff",
    };
	
	gui = new dat.gui.GUI();
    gui.remember(obj);
	var scaleFolder = gui.addFolder('Properties');
	widthBar = scaleFolder.add(obj, 'width').min(1).max(10).step(1).onChange(function(){
		if(selectedObject != null)
		{
			selectedObject.scale.set(obj.width, 1, obj.length);
		}
	});
	heightBar = scaleFolder.add(obj, 'length').min(1).max(10).step(1).onChange(function(){
		if(selectedObject != null)
		{
			selectedObject.scale.set(obj.width, 1, obj.length);
		}
	});;
	scaleFolder.addColor(obj, 'color').onChange(function(){
		if(selectedObject != null)
		{
			var color = obj.color.replace("#", "x");
			color = '0' + color;
			selectedObject.material.color.setHex(color);
		}
	});;;
	
	var componentUI = new dat.gui.GUI();
	var itemsFolder = componentUI.addFolder('House Components');
	var floorFolder = itemsFolder.addFolder('Floors');
	floorFolder.add(obj, 'floor').name('Normal floor');
	var wallFolder = itemsFolder.addFolder('Walls');
	wallFolder.add(obj, 'internalWall').name('Internal wall');
	wallFolder.add(obj, 'externalWallLeft').name('External wall left');
	
	var controlUI = new dat.gui.GUI();
	var controlsFolder = controlUI.addFolder('Controls');
	controlsFolder.add(obj, 'recenter').name('Recenter');
	controlsFolder.add(obj, 'moveB').name('Move');
	controlsFolder.add(obj, 'rotateB').name('Rotate');
	controlsFolder.add(obj, 'removel').name('Remove');
	
	var highUI = new dat.gui.GUI();
	var highFolder = highUI.addFolder('Hierarchy');
	var highFloorFolder = highFolder.addFolder('Floors');
	var highWallFolder = highFolder.addFolder('Walls');
	scaleFolder.open();
	itemsFolder.open();
	floorFolder.open();
	wallFolder.open();
	controlsFolder.open();
	highFolder.open();
	highFloorFolder.open();
	highWallFolder.open();
};

var updateGui = function()
{
	if(selectedObject.componentType == "WallInt")
	{
		heightBar.domElement.style.pointerEvents = "none";
		heightBar.domElement.style.opacity = .5;
	}
	else
	{
		heightBar.domElement.style.pointerEvents = "auto";
		heightBar.domElement.style.opacity =  1;
	}
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

