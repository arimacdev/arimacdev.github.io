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
var ballType;
var ballShadow;
var batmanAnimator1,batmanAnimator2;
var clock;
var batting;
var shotInDisplay;
var ballCanMove;
var originalPos;
var camCounter;
var camAnimation;
var firstTime;
var ballInHold;
var players;
var shotLine;
var catcherIndex;
var throwMultiplier;
var throwY;
var batman1, batman2;
var running;
var ballIsThrwoing;
var initRotaton;

document.getElementById("HitButton").onclick = function() {
	if(!shotInDisplay && !ballIsThrwoing){
		if(firstTime)
		{
			ballCanMove = true;
			firstTime = false;
			recursiveBalling();
		}
		batting = true;
		if(batman1.inStrike){
			batmanAnimator1.startBattingAnimation();
		}
		else if(batman2.inStrike){
			batmanAnimator2.startBattingAnimation();
		}
		calculateHit();
	}
};

var calculateHit = function()
{
	var direction = new THREE.Vector3();
	if(batman1.inStrike)
	{
		batman1.dy = -0.05;
		batman1.dz = -0.2;
		batman2.dy = -0.05;
		batman2.dz = 0.2;
	}
	else if(batman2.inStrike)
	{
		batman1.dy = -0.05;
		batman1.dz = 0.2;
		batman2.dy = -0.05;
		batman2.dz = -0.2;
	}
	
	if(ball.position.z >= 5 && ball.position.z < 6.3)
	{
		shotInDisplay = true;
		ball.dx = -0.3;
		ball.dz = -0.4;
		ball.dy = 0.1;
		direction = new THREE.Vector3(-0.3, 0, -0.4);
		catcherIndex = 5;
		throwMultiplier = 0.5;
		throwY = 0.2;
		
		batman1.running = true;
		batman2.running = true;
	}
	else if(ball.position.z >= 6.3)
	{
		shotInDisplay = true;
		ball.dx = -0.2;
		ball.dz = -0.6;
		ball.dy = 0.25;
		direction = new THREE.Vector3(-0.2, 0, -0.6);
		catcherIndex = 1;
		throwMultiplier = 1;
		throwY = 0.2;
		batman1.running = true;
		batman2.running = true;
	}
	
	var startPos = new THREE.Vector3(ball.position.x, 1, ball.position.z);
	var distance1 = 7;
	var distance2 = 50;
	var newPos1 = new THREE.Vector3();
	var newPos2 = new THREE.Vector3();
	newPos1.addVectors ( startPos, direction.multiplyScalar( distance1 ) );
	newPos2.addVectors ( startPos, direction.multiplyScalar( distance2 ) );
	shotLine = new THREE.Line3(new THREE.Vector3(newPos1.x, 1, newPos1.z),new THREE.Vector3(newPos2.x, 1, newPos2.z));
	
	for(var i = 0; i < players.length; i++)
	{
		players[i].CalculateInteractPoint();
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
	
window.addEventListener( 'keydown', function()
{
	var keyCode = event.which;
	if (keyCode == 32) {
		recursiveBalling();
    }
});

var init = function()
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x111111 );
	
	camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
	//camera.position.set(0, 3.5, 12);
	camera.position.set(-5, 10, 20);
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
	
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	bowlerSpeed = 0;
	traveledDistance = 0;
	bowling = false;
	gravity = 0.01;
	friction = 0.5;
	ballType = 0;
	batting  = false;
	shotInDisplay = false;
	ballCanMove = false;
	clock = new THREE.Clock();
	originalPos = new THREE.Vector3( 0, 3.5, 12 );
	camCounter = 0;
	camAnimation = true;
	firstTime = true;
	ballInHold = true;
	players = [];
	shotLine = new THREE.Line3();
	catcherIndex = 10;
	throwMultiplier = 0;
	throwY = 0;
	running = false;;
	ballIsThrwoing = false;
	initRotaton = camera.rotation;
	
	if(camAnimation)
	{
		TweenMax.to(camera.position,2,{x:0,y:3.5,z:12,
			onUpdate:function(){
				
				camera.lookAt(0,0,0);
				camera.updateProjectionMatrix();
			},
			onComplete: function() {
				
				initRotaton = camera.rotation;
				camAnimation = false;
			}
		});
	}
	
	camera.update = function()
	{
		if(shotInDisplay || ballIsThrwoing)
		{
			camera.lookAt(ball.position.x, 0, ball.position.z);
		}
	};
	
	
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
	
	initPlayer(8,-11, 0);
	initPlayer(-5,-40, 1);
	initPlayer(5,-40, 2);
	initPlayer(-4,-11, 3);
	initPlayer(-20,-15, 4);
	initPlayer(-23,-8, 5);
	initPlayer(	25,-15, 6);
	initPlayer(15,0, 7);
	initBall();
	
	batman1 = initSprites(0);
	batman2 = initSprites(1);
	
	scene.add(batman1);
	scene.add(batman2);
	//recursiveBalling();
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

var initPlayer = function(x, z, index)
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
	player.interactPoint = new THREE.Vector3();
	player.initialPoint = new THREE.Vector3(x, 1, z);
	player.playerCounter = 0;
	player.movedToPos = false;
	player.distanceToBall = 0;
	player.index = index;
	player.update = function()
	{
		if(shotInDisplay && !player.movedToPos)
		{
			var val = 0.004;
			if(player.index == catcherIndex)
			{
				val = 0.06;
			}
			var x = player.position.x - (player.position.x - player.interactPoint.x) * val;
			var y = player.position.y - (player.position.y - player.interactPoint.y) * val;
			var z = player.position.z - (player.position.z - player.interactPoint.z) * val;
			player.position.set(x, y, z);
			player.lookAt(camera.position.x, 1, camera.position.z);
			player.playerCounter++;
			if(player.playerCounter > Math.ceil(10 - player.distanceToBall/4) * 7)
			{
				player.movedToPos = true;
				player.playerCounter = 0;
				//camAnimation = false;
				//player.position.set(0, 3.5, 12);
				//player.lookAt(new THREE.Vector3( 0, 0, 0 ));
			}
		}
		else if(player.movedToPos && !shotInDisplay)
		{
			var x = player.position.x - (player.position.x - player.initialPoint.x) * 0.02;
			var y = player.position.y - (player.position.y - player.initialPoint.y) * 0.02;
			var z = player.position.z - (player.position.z - player.initialPoint.z) * 0.02;
			player.position.set(x, y, z);
			player.lookAt(camera.position.x, 1, camera.position.z);
			player.playerCounter++;
			if(player.playerCounter > 20)
			{
				player.movedToPos = false;
				player.position = player.initialPoint;
				//camAnimation = false;
				//player.position.set(0, 3.5, 12);
				//player.lookAt(new THREE.Vector3( 0, 0, 0 ));
			}
		}
	};
	
	player.CalculateInteractPoint = function()
	{
		var h = new THREE.Vector3();
		shotLine.closestPointToPoint(player.position, 0, h);
		player.interactPoint = h;
		player.distanceToBall = calculateDistance(player.position, player.interactPoint);
	};
	
	players.push(player);

};

var calculateDistance = function(v1, v2)
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
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
	ball.position.x = 0.5;
	ball.position.z = -7;
	ball.position.y = 2;
	
	ball.radius = 0.15;
	ball.dy = 0;
	ball.dx = 0;
	ball.dz = 0.4;
	
	ball.update = function()
	{
		if(ballCanMove && !ballInHold){
			if(this.position.y - this.radius + ball.dy < 0)
			{
				ball.dy = -ball.dy * friction;
				if(!shotInDisplay){
					if(ballType == 1)
					{
						ball.dx = -ball.dx * 0.7 ;
					}
					else if(ballType == 2)
					{
						ball.dx = -0.035 ;
					}
				}
				//ball.dz *= 0.9;
			}
			else
			{
				this.dy -= gravity;
			}
			ball.position.y += ball.dy;
			ball.position.z += ball.dz;
			ball.position.x += ball.dx;
		}
		else if(ballInHold)
		{
			ball.position.x = 0.5;
			ball.position.z = bowler.position.z;
			ball.position.y = 2;
		}
		
		if(shotInDisplay)
		{
			var travelD = calculateDistance(new THREE.Vector3(0,0,0), ball.position);
			if(travelD > 65)
			{
				TweenMax.to(camera.rotation,2,{x:initRotaton.x,y:initRotaton.y,z:initRotaton.z,
				onUpdate:function(){
					camera.updateProjectionMatrix();
				},
				onComplete: function() {
					shotInDisplay = false;
					recursiveBalling();
				}
			});
			}
			else if(Math.ceil(players[catcherIndex].position.x) == Math.ceil(ball.position.x) && Math.ceil(players[catcherIndex].position.z) == Math.ceil(ball.position.z))
			{
				ball.position.x = players[catcherIndex].position.x;
				ball.position.z = players[catcherIndex].position.z;
				shotInDisplay = false;
				var dir = calculateDirection(ball.position, bowler.position);
				ball.dx = dir.x * throwMultiplier;
				ball.dy = throwY;
				ball.dz = dir.z  * throwMultiplier;
				ballType = 0;
				ballIsThrwoing = true;
			}
		}
		else
		{
			if(!ballInHold && ballIsThrwoing)
			{
				if(Math.ceil(ball.position.x) == bowler.position.x && Math.ceil(ball.position.z) == bowler.position.z)
				{
					ballIsThrwoing = false;
					ballInHold = true;
					recursiveBalling();
				}
			}
		}
	};
	
	var geometry = new THREE.CircleGeometry( 0.18,20 );
	var material = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: false, transparent: true, opacity: 0.4} );
	ballShadow = new THREE.Mesh( geometry, material );
	scene.add(ballShadow);
	ballShadow.rotation.x = - Math.PI / 2;
	ballShadow.position.y = 0.002;
	
	ballShadow.update = function()
	{
		ballShadow.position.x = ball.position.x;
		ballShadow.position.z = ball.position.z;
	};
};

var calculateDirection = function(v1, v2)
{
	var dir = new THREE.Vector3();

	dir.subVectors( v2, v1 ).normalize();
	return dir;
};

var recursiveBalling = function()
{
	if(!bowling){
		shotInDisplay = false;
		bowlerSpeed = -0.1;
		bowling = true;
		ball.dz = 0.4;
		ballInHold = true;
		ball.position.x = 0.5;
		ball.position.z = -7;
		ball.position.y = 2;
	}
	//setTimeout(recursiveBalling, 1500);
};

var startBowling = function()
{
	ball.dy = 0;
	ballType = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
	if(ballType == 0)
	{
		ball.dx = -0.01;
	}
	else if(ballType == 1)
	{
		ball.dx = -0.04;
	}
	else if(ballType == 2)
	{
		ball.dx = 0;
	}
};

var initSprites = function(pos)
{
	var loader = new THREE.TextureLoader();
	var texture = loader.load( 'Textures/sprite3.png' );
	texture.anisotropy  = 16;
	if(pos == 0){
		batmanAnimator1 = new TextureAnimator1( texture, 62, 1, 62, 20);
	}	
	else if(pos == 1){
		batmanAnimator2 = new TextureAnimator2( texture, 62, 1, 62, 20);
	}
	var batmanMat = new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide , alphaTest: 0.5} );
	var batmanGeo = new THREE.PlaneGeometry(2.5, 2.5);
	var batter = new THREE.Mesh(batmanGeo, batmanMat);
	
	batter.dx = 0;
	batter.dy = 0;
	batter.dz = 0;
	batter.x = 0;
	batter.radius = 1.25;
	batter.inStrike = false;
	batter.running  = false;
	if(pos == 0)
	{
		batter.position.set(-0.6,0.8,6);
		batter.inStrike = true;
	}
	else if(pos == 1)
	{
		batter.position.set(-0.6,0.8,-6);
		batter.inStrike = false;
	}
	
	batter.update = function()
	{
		if(this.running)
		{
			if(batter.position.y - batter.radius + batter.dy < -0.5)
			{
				batter.dy = -batter.dy;
			}
			else
			{
				batter.dy -= gravity;
			}
			batter.position.y += batter.dy;
			batter.position.z += batter.dz;
			//batter.position.x += batter.dx;
			var travelD = calculateDistance(new THREE.Vector3(0,0,0), ball.position);
			if(this.inStrike)
			{
				if(this.position.z < -6)
				{
					this.inStrike = false;
					if(shotInDisplay && travelD < 65){
						this.dz = -this.dz;
						//this.position.set(-0.6,0.8,-6);
					}
					else
					{
						//this.position.set(-0.6,0.8,-6);
						this.running = false;
						this.dz = 0;
						this.dy = 0;
					}
				}
			}
			else
			{
				if(this.position.z > 6)
				{
					this.inStrike = true;
					if(shotInDisplay && travelD < 65){
						this.dz = -this.dz;
						//this.position.set(-0.6,0.8,6);
					}
					else
					{
						//this.position.set(-0.6,0.8,6);
						this.running = false;
						this.dz = 0;
						this.dy = 0;
					}
				}
			}
		}
	};
	
	return batter;
};

function TextureAnimator1(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;
	// how long has the current image been displayed?
	this.currentDisplayTime = 0;
	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		if(batting && batman1.inStrike){
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles){
					this.currentTile = 0;
					batting = false;
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
				
			}
		}
	};
	
	this.startBattingAnimation = function()
	{
		this.currentTile = 20;
	};
};

function TextureAnimator2(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;
	// how long has the current image been displayed?
	this.currentDisplayTime = 0;
	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		if(batting && batman2.inStrike){
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles){
					this.currentTile = 0;
					batting = false;
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
				
			}
		}
	};
	
	this.startBattingAnimation = function()
	{
		this.currentTile = 20;
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
		ballInHold = false;
		startBowling();
	}
	ball.update();
	ballShadow.update();
	camera.update();
	
	for(var i = 0; i < players.length; i++)
	{
		players[i].update();
	}
	
	batman1.update();
	batman2.update();
	
	var delta = clock.getDelta(); 
	batmanAnimator1.update(1000 * delta);
	batmanAnimator2.update(1000 * delta);
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

