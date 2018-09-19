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
var wicketAnim;
var out;
var bowlerAnim;
var xBarrier;

window.addEventListener( 'mousedown', function()
{
	//console.log(ball.position.z);
	if(!shotInDisplay && !ballIsThrwoing){
		if((batman1.inStrike && !batman1.running) ||(batman2.inStrike && !batman2.running))
		{
			if(firstTime)
			{
				initRotaton = camera.rotation;
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
	}
});

var calculateHit = function()
{
	var direction = new THREE.Vector3();
	var hitted = false;
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
	
	if(ball.position.z >= 3  && ball.position.z < 4)
	{
		console.log("shot 1");
		
		shotInDisplay = true;
		ball.dx = -0.35;
		ball.dz = -0.1;
		ball.dy = 0.3;
		direction = new THREE.Vector3(-0.35, 0, -0.1);
		catcherIndex = 5;
		throwMultiplier = 0.5;
		throwY = 0.2;
		
		if(ball.position.x > xBarrier)
		{
			ball.dx = -ball.dx;
			direction.x = -direction.x;
			catcherIndex = 7;
		}
		
		hitted = true;
	}
	else if(ball.position.z >= 4  && ball.position.z < 4.5)
	{
		console.log("shot 2");
		
		shotInDisplay = true;
		ball.dx = -0.1;
		ball.dz = -0.1;
		ball.dy = 0.2;
		direction = new THREE.Vector3(-0.1, 0, -0.1);
		catcherIndex = 3;
		throwMultiplier = 0.5;
		throwY = 0.2;
		
		if(ball.position.x > xBarrier)
		{
			ball.dx = -ball.dx;
			direction.x = -direction.x;
			catcherIndex = 0;
		}
		
		hitted = true;
	}
	else if(ball.position.z >= 4.5  && ball.position.z < 5)
	{
		console.log("shot 3");
		
		shotInDisplay = true;
		ball.dx = -0.2;
		ball.dz = -0.5;
		ball.dy = 0.45;
		direction = new THREE.Vector3(-0.2, 0, -0.5);
		catcherIndex = 6;
		throwMultiplier = 0.5;
		throwY = 0.2;
		
		if(ball.position.x > xBarrier)
		{
			ball.dx = -ball.dx;
			direction.x = -direction.x;
			catcherIndex = 2;
		}
		
		hitted = true;
	}
	else if(ball.position.z >= 5 && ball.position.z < 5.5)
	{
		console.log("shot 4");
		
		shotInDisplay = true;
		ball.dx = -0.3;
		ball.dz = -0.4;
		ball.dy = 0.1;
		direction = new THREE.Vector3(-0.3, 0, -0.4);
		catcherIndex = 4;
		throwMultiplier = 0.5;
		throwY = 0.2;
		
		if(ball.position.x > xBarrier)
		{
			ball.dx = -ball.dx;
			direction.x = -direction.x;
			catcherIndex = 6;
		}
		
		hitted = true;
		
	}
	else if(ball.position.z >= 5.5  && ball.position.z < 6)
	{
		console.log("shot 5");
		
		shotInDisplay = true;
		ball.dx = -0.2;
		ball.dz = -0.6;
		ball.dy = 0.25;
		direction = new THREE.Vector3(-0.2, 0, -0.6);
		catcherIndex = 1;
		throwMultiplier = 1;
		throwY = 0.2;
		
		if(ball.position.x > xBarrier)
		{
			ball.dx = -ball.dx;
			direction.x = -direction.x;
			catcherIndex = 2;
		}
		
		hitted = true;
	}
	else if(ball.position.z >= 6  && ball.position.z < 7)
	{
		console.log("shot 6");
		
		shotInDisplay = true;
		ball.dx = -0.03;
		ball.dz = -0.5;
		ball.dy = 0.3;
		direction = new THREE.Vector3(-0.03, 0, -0.5);
		catcherIndex = 1;
		throwMultiplier = 1;
		throwY = 0.2;
		
		if(ball.position.x > xBarrier)
		{
			ball.dx = -ball.dx;
			direction.x = -direction.x;
			catcherIndex = 2;
		}
		
		hitted = true;
	}
	
	if(hitted)
	{
		
		batman1.running = true;
		batman2.running = true;
		
		if(batman1.inStrike){
			batmanAnimator1.runToWicket();
			batmanAnimator2.runFromWicket();
		}
		else if(batman2.inStrike){
			batmanAnimator2.runToWicket();
			batmanAnimator1.runFromWicket();
		}
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

var init = function()
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x0C162F );
	
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
	out = false;
	xBarrier = 0.05;
	
	if(camAnimation)
	{
		TweenMax.to(camera.position,2,{x:0,y:1.5,z:10,
			onUpdate:function(){
				
				camera.lookAt(0,0,0);
				camera.updateProjectionMatrix();
			},
			onComplete: function() {
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
	var crowdTexture = loader.load( 'Textures/Background1.png' );
	crowdTexture.wrapS = crowdTexture.wrapT = THREE.RepeatWrapping;
	crowdTexture.repeat.set( 6, 1 );
	crowdTexture.anisotropy = 16;
	
	var crowdMaterial = new THREE.MeshBasicMaterial( { map: crowdTexture, alphaTest: 0.7} );
	crowdMaterial.side = THREE.DoubleSide
	var geometrya = new THREE.CylinderBufferGeometry( 65, 65, 50, 65 , 1, true);
	var crowd = new THREE.Mesh( geometrya, crowdMaterial );
	scene.add(crowd);
	crowd.position.y = 19;
	crowd.rotation.y = 0.4;
	
	var loadera = new THREE.TextureLoader();
	var groundTexture = loadera.load( 'Textures/ground.png' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 150, 150 );
	var geometry = new THREE.CircleGeometry( 150,150 );
	var material = new THREE.MeshBasicMaterial( { map: groundTexture} );
	var floor = new THREE.Mesh( geometry, material );
	scene.add(floor);
	floor.rotation.x = - Math.PI / 2;
	
	var geometryf = new THREE.PlaneGeometry( 4, 16 );
	var pitchTexture = loader.load( 'Textures/pitch.png' );
	pitchTexture.anisotropy  = 16;
	var materialf = new THREE.MeshBasicMaterial( {map: pitchTexture, transparent: true} );
	var pitch = new THREE.Mesh( geometryf, materialf );
	scene.add(pitch);
	pitch.rotation.x = - Math.PI / 2;
	pitch.position.y = 0.001;
	
	var texture = loader.load( 'Textures/bowler2.png' );
	texture.anisotropy = renderer.getMaxAnisotropy();
	bowlerAnim = new TextureAnimatorBowler( texture, 4, 1, 4, 120);
	var bowlerMat = new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide, alphaTest: 0.5} );
	bowlerMat.transparent = true;
	var bowlerGeo = new THREE.PlaneGeometry(3.95/3, 6.25/3);
	bowler = new THREE.Mesh(bowlerGeo, bowlerMat);
	scene.add( bowler );
	bowler.position.x = 1;
	bowler.position.z = -7;
	bowler.position.y = 1;
	bowler.scale.x = -bowler.scale.x;
	
	initCylinder(0xffffff,50, 0.3);
	//initCylinder(0xffffff,60, 3);
	//initCylinder(0xFCEE00,100, 10);
	initCylinder(0x0B1630,150, 200);
	
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
	
	batmanAnimator2.setNonStrikeBatman();
	
	//recursiveBalling();
};

var initWickets = function()
{
	var loader = new THREE.TextureLoader();
	var texture = loader.load( 'Textures/wicket2.png' );
	texture.anisotropy = renderer.getMaxAnisotropy();
	wicketAnim = new TextureAnimatorWicket( texture, 20, 1, 20, 40);
	var batmanMat = new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide} );
	batmanMat.transparent = true;
	var batmanGeo = new THREE.PlaneGeometry(1.1, 1.25);
	var batter = new THREE.Mesh(batmanGeo, batmanMat);
	scene.add( batter );
	batter.position.set(0, 0.48, 7.9);
	
	var loader2 = new THREE.TextureLoader();
	var texture2 = loader.load( 'Textures/wicket4.png' );
	texture2.anisotropy = renderer.getMaxAnisotropy();
	var batmanMat2 = new THREE.MeshBasicMaterial( { map: texture2, side:THREE.DoubleSide, alphaTest: 0.5} );

	var batmanGeo2 = new THREE.PlaneGeometry(1.1, 1.25);
	var batter2 = new THREE.Mesh(batmanGeo2, batmanMat2);
	scene.add( batter2 );
	batter2.position.set(0, 0.48, -7.9);
};

var initPlayer = function(x, z, index)
{
	var loader = new THREE.TextureLoader();
	var geometry = new THREE.PlaneGeometry( 3.95/3, 6.29/3 );
	var texture = loader.load( 'Textures/player4.png' );
	texture.anisotropy  = renderer.getMaxAnisotropy();
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
	var geometry = new THREE.PlaneGeometry( 0.2, 0.2 );
	var texture = loader.load( 'Textures/ballN.png' );
	texture.anisotropy  = 16;
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	material.transparent = true;
	ball = new THREE.Mesh( geometry, material );
	scene.add(ball);
	ball.position.x = 0.5;
	ball.position.z = -1;
	ball.position.y = 1;
	
	ball.radius = 0.1;
	ball.dy = 0;
	ball.dx = 0;
	ball.dz = 0.4;
	
	ball.update = function()
	{
		ball.lookAt(camera.position.x, ball.position.y, camera.position.z);
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
					else if(ballType == 3)
					{
						ball.dx = 0.02 ;
					}
				}
				//ball.dz *= 0.9;
				
				bowlerAnim.startAnimation();
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
			ball.position.z = bowler.position.z - 0.01;
			ball.position.y = 0.6;
		}
		
		if(shotInDisplay)
		{
			var travelD = calculateDistance(new THREE.Vector3(0,0,0), ball.position);
			if(travelD > 65)
			{
				camera.lookAt(0,0,0);
				shotInDisplay = false;
				recursiveBalling();
			}
			else if(Math.round(players[catcherIndex].position.x) == Math.round(ball.position.x) && Math.round(players[catcherIndex].position.z) == Math.round(ball.position.z) && Math.round(ball.position.y) < Math.round(players[catcherIndex].position.y ) + 2)
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
				if(Math.round(ball.position.x) == Math.round(bowler.position.x) && Math.round(ball.position.z) == Math.round(bowler.position.z))
				{
					ballIsThrwoing = false;
					ballInHold = true;
					camera.rotation = initRotaton;
					recursiveBalling();
				}
			}
			
			if(ball.position.z >= 7.9)
			{
				ball.position.z = -100;
				ball.dz = 0;
				ball.dy = 0;
				ball.dx = 0;
				out = true;
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
		ball.position.z = -7.1;
		ball.position.y = 1;
	}
	//setTimeout(recursiveBalling, 1500);
};

var startBowling = function()
{
	ball.dy = 0.1;
	ballType = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
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
	else if(ballType == 3)
	{
		ball.dx = -0.01;
	}
};

var initSprites = function(pos)
{
	var loader = new THREE.TextureLoader();
	var texture = loader.load( 'Textures/batmanNN.png' );
	texture.anisotropy  = 16;
	if(pos == 0){
		batmanAnimator1 = new TextureAnimator1( texture, 14, 1, 14, 20);
	}	
	else if(pos == 1){
		batmanAnimator2 = new TextureAnimator2( texture, 14, 1, 14, 20);
	}
	var batmanMat = new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide , alphaTest: 0.5} );
	var batmanGeo = new THREE.PlaneGeometry(5.55/3, 8.82/3);
	var batter = new THREE.Mesh(batmanGeo, batmanMat);
	
	batter.dx = 0;
	batter.dy = 0;
	batter.dz = 0;
	batter.x = 0;
	batter.radius = 1.25;
	batter.inStrike = false;
	batter.running  = false;
	batter.animator = batmanAnimator1;
	
	if(pos == 0)
	{
		batter.position.set(-0.6,0.75,6);
		batter.inStrike = true;
		batter.animator = batmanAnimator1;
	}
	else if(pos == 1)
	{
		batter.position.set(-0.6,0.75,-6);
		batter.inStrike = false;
		batter.animator = batmanAnimator2;
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
						this.animator.runFromWicket();
					}
					else
					{
						this.running = false;
						this.dz = 0;
						this.dy = 0;
						batter.position.set(-0.6,0.75,-6);
						this.animator.startBattingAnimation();
						this.animator.setNonStrikeBatman();
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
						this.animator.runToWicket();
					}
					else
					{
						this.running = false;
						this.dz = 0;
						this.dy = 0;
						batter.position.set(-0.6,0.75,6);
						this.animator.startBattingAnimation();
					}
				}
			}
		}
	};
	
	return batter;
};

function TextureAnimatorWicket(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
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
		if(out){
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles){
					this.currentTile = 0;
					out = false;
					recursiveBalling();
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
				
			}
		}
	};
	
	this.startAnimation = function()
	{
		this.currentTile = 0;
	};
};

function TextureAnimatorBowler(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
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
		if(bowlerSpeed != 0){
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == 2){
					this.currentTile = 0;
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
			}
		}
	};
	
	this.startAnimation = function()
	{
		this.currentTile = 0;
	};
	
	this.inBall = function()
	{
		this.currentTile = 3;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
	};
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
		if(batting && batman1.inStrike && !batman1.running){
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles - 4){
					this.currentTile = 0;
					batting = false;
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
			}
		}
		else if(batman1.inStrike && batman1.running)
		{
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles - 2){
					this.currentTile = this.numberOfTiles - 4;
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
			}
		}
		else if(!batman1.inStrike && batman1.running)
		{
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles){
					this.currentTile = this.numberOfTiles - 2;
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
		this.tileDisplayDuration = 20;
		
		this.currentTile = 0;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
	};
	
	this.runToWicket = function()
	{
		this.tileDisplayDuration = 120;
		
		this.currentTile = this.numberOfTiles - 4;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
	};
	this.runFromWicket = function()
	{
		this.tileDisplayDuration = 120;
		
		this.currentTile = this.numberOfTiles - 2;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
	};
	this.setNonStrikeBatman = function()
	{
		this.currentTile = this.numberOfTiles - 1;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
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
		if(batting && batman2.inStrike && !batman2.running){
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles - 4){
					this.currentTile = 0;
					batting = false;
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
			}
		}
		else if(batman2.inStrike && batman2.running)
		{
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles - 2){
					this.currentTile = this.numberOfTiles - 4;
				}
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
			}
		}
		else if(!batman2.inStrike && batman2.running)
		{
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles){
					this.currentTile = this.numberOfTiles - 2;
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
		this.tileDisplayDuration = 20;
		
		this.currentTile = 0;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
	};
	
	this.runToWicket = function()
	{
		this.tileDisplayDuration = 120;
		
		this.currentTile = this.numberOfTiles - 4;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
	};
	
	this.runFromWicket = function()
	{
		this.tileDisplayDuration = 120;
		
		this.currentTile = this.numberOfTiles - 2;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
	};
	
	this.setNonStrikeBatman = function()
	{
		this.currentTile = this.numberOfTiles - 1;
		var currentColumn = this.currentTile % this.tilesHorizontal;
		texture.offset.x = currentColumn / this.tilesHorizontal;
		var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
		texture.offset.y = currentRow / this.tilesVertical;
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
		bowlerAnim.inBall();
		ball.position.x = 0.4;
		ball.position.y = 1.4;
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
	
	wicketAnim.update(1000 * delta);
	bowlerAnim.update(1000 * delta);
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

