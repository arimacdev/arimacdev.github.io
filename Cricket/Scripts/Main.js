var scene;
var camera;
var renderer;
var bowler;
var bowlerSpeed;
var traveledDistance;
var bowling;
var ball;
var gravity;
var friction;

document.getElementById("HitButton").onclick = function() {
	if(!bowling){
		console.log("Hit");
		bowlerSpeed = -0.1;
		bowling = true;
		ball.position.x = 0;
		ball.position.z = -7;
		ball.position.y = 2.5;
		ball.dy = 0;
	}
};

window.addEventListener( 'resize', function()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width,height);
	camera.aspect = width/ height;
	camera.updateProjectionMatrix();
});

var init = function()
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x111111 );
	
	camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(0, 3.5, 12);
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	bowlerSpeed = 0;
	traveledDistance = 0;
	bowling = false;
	gravity = 0.01;
	friction = 0.9;
	
	initMeshes();
	
	sceneLoop();
};

var initMeshes = function()
{
	var loader = new THREE.TextureLoader();
	var groundTexture = loader.load( 'Textures/crowd2.png' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 90, 1 );
	groundTexture.anisotropy = 16;
	
	var groundMaterial = new THREE.MeshBasicMaterial( { map: groundTexture, alphaTest: 0.7} );
	groundMaterial.side = THREE.DoubleSide
	var geometrya = new THREE.CylinderBufferGeometry( 65, 65, 4, 65 , 4, true);
	var crowd = new THREE.Mesh( geometrya, groundMaterial );
	//scene.add(crowd);
	crowd.position.y = 2;
	//crowd.position.z = -65;
	
	var geometry = new THREE.CircleGeometry( 150,150 );
	var material = new THREE.MeshBasicMaterial( {color: 0x98BA5C, wireframe: false} );
	var floor = new THREE.Mesh( geometry, material );
	scene.add(floor);
	floor.rotation.x = - Math.PI / 2;
	
	var geometryf = new THREE.PlaneGeometry( 4, 16 );
	var pitchTexture = loader.load( 'Textures/pitch2.png' );
	pitchTexture.anisotropy  = 16;
	var materialf = new THREE.MeshBasicMaterial( {map: pitchTexture, wireframe: false} );
	var pitch = new THREE.Mesh( geometryf, materialf );
	scene.add(pitch);
	pitch.rotation.x = - Math.PI / 2;
	pitch.position.y = 0.001;
	
	var geometryb = new THREE.PlaneGeometry( 2, 2 );
	var textureb = loader.load( 'Textures/bowler.png' );
	textureb.anisotropy  = 16;
	var materialb = new THREE.MeshBasicMaterial( {map: textureb, alphaTest: 0.5} );
	bowler = new THREE.Mesh( geometryb, materialb );
	scene.add(bowler);
	bowler.position.x = 1;
	bowler.position.z = -7;
	bowler.position.y = 1;
	
	
	initCylinder(0xffffff,50, 0.3);
	initCylinder(0xffffff,60, 3);
	initCylinder(0xFCEE00,100, 10);
	initCylinder(0x13ABDB,150, 200);
	
	initWickets();
	
	initPlayer(8,-11);
	initPlayer(-5,-40);
	initPlayer(5,-40);
	initPlayer(-4,-11);
	initPlayer(-20,-15);
	initPlayer(-23,-8);
	initPlayer(	25,-15);
	initPlayer(15,0);
	
	initBall();
};

var initWickets = function()
{
	var geometry = new THREE.PlaneGeometry(0.1,1);
	var material = new THREE.MeshBasicMaterial( {color: 0x967032} );
	var wicket1 = new THREE.Mesh( geometry, material );
	scene.add( wicket1 );
	wicket1.position.set(0.3, 0.5, 7);
	
	var wicket2 = new THREE.Mesh( geometry, material );
	scene.add( wicket2 );
	wicket2.position.set(-0.3, 0.5, 7);
	
	var wicket3 = new THREE.Mesh( geometry, material );
	scene.add( wicket3 );
	wicket3.position.set(0, 0.5, 7);
	
	var wicket4 = new THREE.Mesh( geometry, material );
	scene.add( wicket4 );
	wicket4.position.set(0.3, 0.5, -7);
	
	var wicket5 = new THREE.Mesh( geometry, material );
	scene.add( wicket5 );
	wicket5.position.set(-0.3, 0.5, -7);
	
	var wicket6 = new THREE.Mesh( geometry, material );
	scene.add( wicket6 );
	wicket6.position.set(0, 0.5, -7);
};

var initPlayer = function(x, z)
{
	var loader = new THREE.TextureLoader();
	var geometry = new THREE.PlaneGeometry( 2, 2 );
	var texture = loader.load( 'Textures/player3.png' );
	texture.anisotropy  = 16;
	texture.wrapS = THREE.RepeatWrapping;
	if(x > 0){
		texture.repeat.x = - 1;
	}
	var material = new THREE.MeshBasicMaterial( {map: texture, alphaTest: 0.5} );
	var player = new THREE.Mesh( geometry, material );
	scene.add(player);
	player.position.x = x;
	player.position.z = z;
	player.position.y = 1;
	player.lookAt(new THREE.Vector3(0, 1, 12));

};

var initCylinder = function(color, radius, height)
{
	var geometry = new THREE.CylinderBufferGeometry( radius, radius, height, radius , height, true);
	var material = new THREE.MeshBasicMaterial( {color: color} );
	material.side = THREE.DoubleSide
	var cylinder = new THREE.Mesh( geometry, material );
	scene.add( cylinder );
};

var initBall = function()
{
	var loader = new THREE.TextureLoader();
	var geometry = new THREE.PlaneGeometry( 0.3, 0.3 );
	var texture = loader.load( 'Textures/ball.png' );
	texture.anisotropy  = 16;
	var material = new THREE.MeshBasicMaterial( {map: texture, alphaTest: 0.5} );
	ball = new THREE.Mesh( geometry, material );
	scene.add(ball);
	ball.position.x = 0;
	ball.position.z = -7;
	ball.position.y = 2.5;
	
	ball.radius = 0.15;
	ball.dy = 0;
	ball.update = function()
	{
		if(this.position.y - this.radius < 0)
		{
			ball.dy = -ball.dy * friction;
		}
		else
		{
			this.dy -= gravity;
		}
		ball.position.y += ball.dy;
		ball.position.z += 0.4;
	};
	
};

var update = function()
{
	bowler.translateOnAxis ( new THREE.Vector3(0, 0, 1), bowlerSpeed );
	traveledDistance += bowlerSpeed;
	if(traveledDistance <= -4)
	{
		bowlerSpeed = 0.1;
		traveledDistance = 0;
	}
	else if(traveledDistance >= 4)
	{
		bowlerSpeed = 0;
		traveledDistance = 0;
		bowling = false;
	}
	ball.update();
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

