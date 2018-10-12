var scene, camera, renderer, controls;
var gameStarted;
var sphere;
var obstacleHalfOne, obstacleHalfTwo;
var dandrufHalfOne, dandrufHalfTwo;
var fallenHalfOne, fallenHalfTwo;
var cracksHalfOne, cracksHalfTwo;
var shuffled;
var player;
var playerMoving;
var raycaster;
var intersects;
var restartButton;
var gravity;
var jumping;
var modelReady;
var mixers, mixersG;
var clock;
var timeClock;
var timeText, scoreText;
var remainingTime;
var boyAction, girlAction;

var aspectRatio;

var currentLevel;
var restarting;
var collitionStarted;
var playerScore;

var dead;
var uiGroup;

var uiChecking;
var mouse;
var gender;

document.getElementById("Restart").onclick = function() 
{
	if(!gameStarted && !restarting){
		restartGame();
	}
};

window.addEventListener('resize', setSize, true);

window.addEventListener( 'mousedown', function(event)
{
	if(uiChecking)
	{
		event.preventDefault();
		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( uiGroup.children );
		
		if ( intersects.length > 0 ) {
			if(intersects[0].object.tag == "Play")
			{
				playMenuDisapearAnimation();
			}
			else if(intersects[0].object.tag == "Male")
			{
				gender = 0;
				player.children[1].visible = true;
				player.children[2].visible = false;
				playGenderDisapearAnimation();
			}
			else if(intersects[0].object.tag == "Female")
			{
				gender = 1;
				player.children[1].visible = false;
				player.children[2].visible = true;
				playGenderDisapearAnimation();
			}
		}
	}
});

//Set renderer size
function setSize(){
    if(window.innerWidth/window.innerHeight > aspectRatio){
        renderer.setSize(window.innerHeight * aspectRatio, window.innerHeight);
    }else{
        renderer.setSize(window.innerWidth, window.innerWidth/aspectRatio);
    }
}

var init = function()
{
	aspectRatio = 9/16;
	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0x6E8CC1 );
	
	camera = new THREE.PerspectiveCamera(75, 9/16, 0.1, 1000);
	
	var container = document.getElementById('game');
	document.body.appendChild(container);
	
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	
	// controls = new THREE.OrbitControls( camera );
	
	document.addEventListener("keydown", onDocumentKeyDown, false);
	
	restartButton = document.getElementById("Restart");
	restartButton.style.display = "none";
	
	// timeText = document.getElementById("time");
	// scoreText = document.getElementById("score");
	gameStarted = false;
	
	setSize();
	
	startGame();
};

var initFb = function()
{
	FBInstant.initializeAsync().then(function() {
		
		for (var i = 0; i < 1000; i++) {
			FBInstant.setLoadingProgress(i);
		}
		
        FBInstant.startGameAsync().then(function() {
			startGame();          
        });
    });
};

var startGame = function() 
{
	console.log("Game started!");
	
	obstacleHalfOne = [];
	obstacleHalfTwo = [];
	dandrufHalfOne = [];
	dandrufHalfTwo = [];
	fallenHalfOne = [];
	fallenHalfTwo = [];
	cracksHalfOne = [];
	cracksHalfTwo = [];
	
	shuffled = false;
	playerMoving = false;
	raycaster = new THREE.Raycaster();
	gravity = 0.01;
	jumping = false;
	modelReady = false;
	clock = new THREE.Clock();
	timeClock = new THREE.Clock();
	mixers = [];
	mixersG = [];
	remainingTime = 60;
	currentLevel = 0;
	restarting = false;
	collitionStarted = false;
	playerScore = 0;
	dead = false;
	uiChecking = false;
	mouse = new THREE.Vector2();
	gender = 0;
	
	initUI();
};

var initUI = function()
{
	uiGroup = new THREE.Group();
	
	addSprite("images/mainBG.png", -1, 0, 0, 1.08 * 0.8, 1.92 * 0.8, "");
	
	addSprite("images/name.png", -0.99, 0.43, 0, 0.451 * 1.3, 0.3 * 1.3, "");
	addSprite("images/girl.png", -0.99, -0.07, -0.34, 1.91 * 0.225, 3.8 * 0.225, "");	
	addSprite("images/boy.png", -0.99, -0.035, 0.35, 1.71 * 0.25, 3.71 * 0.25, "");	
	addSprite("images/play.png", -0.99, -0.07, 0, 3.7 * 0.11, 1.78 * 0.11, "Play");
	
	addSprite("images/genderText.png", -0.99, 0.56, 0, 0.898 * 0.8, 0.08 * 0.8, "");
	addSprite("images/girl.png", -0.99, -0.07, -0.15, 1.91 * 0.225, 3.8 * 0.225, "");	
	addSprite("images/boy.png", -0.99, -0.035, 0.15, 1.71 * 0.25, 3.71 * 0.25, "");
	addSprite("images/female.png", -0.99, -0.58, -0.17, 3.75 * 0.08, 1.8 * 0.08, "Female");
	addSprite("images/male.png", -0.99, -0.58, 0.185, 3.75 * 0.08, 1.8 * 0.08, "Male");
	
	addSprite("images/3.png", -0.99, 0.4, 0, 1.01 * 0.08, 1.4 * 0.08, "");
	addSprite("images/2.png", -0.99, 0.4, 0, 1.01 * 0.08, 1.4 * 0.08, "");
	addSprite("images/1.png", -0.99, 0.4, 0, 1.01 * 0.08, 1.4 * 0.08, "");
	
	camera.add(uiGroup);
	
	uiGroup.children[0].visible = false;
	uiGroup.children[1].visible = false;
	uiGroup.children[2].visible = false;
	uiGroup.children[3].visible = false;
	
	uiGroup.children[4].visible = false;
	uiGroup.children[5].visible = false;
	uiGroup.children[6].visible = false;
	uiGroup.children[7].visible = false;
	uiGroup.children[8].visible = false;
	uiGroup.children[9].visible = false;
	
	uiGroup.children[10].visible = false;
	uiGroup.children[11].visible = false;
	uiGroup.children[12].visible = false;
	
	playMenuApearAnimation();
	
	initGame();
};

var playMenuApearAnimation = function()
{
	uiGroup.children[0].visible = true;
	uiGroup.children[1].visible = true;
	uiGroup.children[2].visible = true;
	uiGroup.children[3].visible = true;
	uiGroup.children[4].visible = true;
	
	var yOne = uiGroup.children[1].position.y;
	uiGroup.children[1].position.y = 2;
	
	var xOne = uiGroup.children[2].position.x;
	uiGroup.children[2].position.x = -2;
	
	var xTwo = uiGroup.children[3].position.x;
	uiGroup.children[3].position.x = 2;
	
	var yTwo = uiGroup.children[4].position.y;
	uiGroup.children[4].position.y = -2;
	
	TweenMax.to(uiGroup.children[1].position,0.5,{ease: Power4.easeOut, delay: 1,y:yOne,
		onComplete: function() {
			TweenMax.to(uiGroup.children[2].position,0.5,{ease: Power4.easeOut,x:xOne,
				onComplete: function() {
					
				}
			});
			TweenMax.to(uiGroup.children[3].position,0.5,{ease: Power4.easeOut,x:xTwo,
				onComplete: function() {
					TweenMax.to(uiGroup.children[4].position,0.5,{ease: Power4.easeOut, y:yTwo,
						onComplete: function() {
							uiChecking = true;
						}
					});
				}
			});
		}
	});
};

var playMenuDisapearAnimation = function()
{
	uiChecking = false;
	
	var yOne = uiGroup.children[1].position.y;
	var xOne = uiGroup.children[2].position.x;
	var xTwo = uiGroup.children[3].position.x;
	var yTwo = uiGroup.children[4].position.y;
	
	TweenMax.to(uiGroup.children[4].position,0.5,{ease: Power4.easeIn, y:-2,
		onComplete: function() {
			TweenMax.to(uiGroup.children[2].position,0.5,{ease: Power4.easeIn,x:-2,
				onComplete: function() {
					
				}
			});
			TweenMax.to(uiGroup.children[3].position,0.5,{ease: Power4.easeIn,x:2,
				onComplete: function() {
					TweenMax.to(uiGroup.children[1].position,0.5,{ease: Power4.easeIn, y:2,
						onComplete: function() {
							uiGroup.children[1].visible = false;
							uiGroup.children[2].visible = false;
							uiGroup.children[3].visible = false;
							uiGroup.children[4].visible = false;
							
							uiGroup.children[0].material.opacity = 1;
							uiGroup.children[1].position.y = yOne;
							uiGroup.children[2].position.x = xOne;
							uiGroup.children[3].position.x = xTwo;
							uiGroup.children[4].position.y = yTwo;
							
							playGenderApearAnimation();
						}
					});
				}
			});
		}
	});
};

var playGenderApearAnimation = function()
{
	uiGroup.children[0].visible = true;
	uiGroup.children[5].visible = true;
	uiGroup.children[6].visible = true;
	uiGroup.children[7].visible = true;
	uiGroup.children[8].visible = true;
	uiGroup.children[9].visible = true;
	
	var yOne = uiGroup.children[5].position.y;
	uiGroup.children[5].position.y = 2;
	
	var xOne = uiGroup.children[6].position.x;
	uiGroup.children[6].position.x = -2;
	
	var xTwo = uiGroup.children[7].position.x;
	uiGroup.children[7].position.x = 2;
	
	var yTwo = uiGroup.children[8].position.y;
	uiGroup.children[8].position.y = -2;
	uiGroup.children[9].position.y = -2;
	
	TweenMax.to(uiGroup.children[5].position,0.5,{ease: Power4.easeOut,y:yOne,
		onComplete: function() {
			TweenMax.to(uiGroup.children[6].position,0.5,{ease: Power4.easeOut,x:xOne,
				onComplete: function() {
					
				}
			});
			TweenMax.to(uiGroup.children[7].position,0.5,{ease: Power4.easeOut,x:xTwo,
				onComplete: function() {
					TweenMax.to(uiGroup.children[8].position,0.5,{ease: Power4.easeOut, y:yTwo,
						onComplete: function() {
							uiChecking = true;
						}
					});
					TweenMax.to(uiGroup.children[9].position,0.5,{ease: Power4.easeOut, y:yTwo,
						onComplete: function() {
							uiChecking = true;
						}
					});
				}
			});
		}
	});
};

var playGenderDisapearAnimation = function()
{
	uiChecking = false;
	
	var yOne = uiGroup.children[5].position.y;
	var xOne = uiGroup.children[6].position.x;
	var xTwo = uiGroup.children[7].position.x;
	var yTwo = uiGroup.children[8].position.y;
	
	TweenMax.to(uiGroup.children[8].position,0.5,{ease: Power4.easeIn, y:-2,
		onComplete: function() {
			TweenMax.to(uiGroup.children[6].position,0.5,{ease: Power4.easeIn,x:-2,
				onComplete: function() {
					
				}
			});
			TweenMax.to(uiGroup.children[7].position,0.5,{ease: Power4.easeIn,x:2,
				onComplete: function() {
					TweenMax.to(uiGroup.children[5].position,0.5,{ease: Power4.easeIn, y:2,
						onComplete: function() {
							TweenMax.to(uiGroup.children[0].material,0.5,{ease: Power4.easeIn, opacity:0,
								onComplete: function() {
									uiGroup.children[0].visible = false;
									uiGroup.children[5].visible = false;
									uiGroup.children[6].visible = false;
									uiGroup.children[7].visible = false;
									uiGroup.children[8].visible = false;
									uiGroup.children[9].visible = false;
									
									uiGroup.children[0].material.opacity = 1;
									uiGroup.children[5].position.y = yOne;
									uiGroup.children[6].position.x = xOne;
									uiGroup.children[7].position.x = xTwo;
									uiGroup.children[8].position.y = yTwo;
									uiGroup.children[9].position.y = yTwo;
									
									showCountDown();
								}
							});
						}
					});
				}
			});
		}
	});
	
	TweenMax.to(uiGroup.children[9].position,0.5,{ease: Power4.easeIn, y:-2,
		
	});
};

var showCountDown = function()
{
	var scaleX = uiGroup.children[10].scale.x;
	var scaleY = uiGroup.children[10].scale.y;
	
	uiGroup.children[10].scale.x = 0;
	uiGroup.children[10].scale.y = 0;
	
	uiGroup.children[11].scale.x = 0;
	uiGroup.children[11].scale.y = 0;
	
	uiGroup.children[12].scale.x = 0;
	uiGroup.children[12].scale.y = 0;
	
	uiGroup.children[10].visible = true;
	uiGroup.children[11].visible = true;
	uiGroup.children[12].visible = true;
	
	TweenMax.to(uiGroup.children[10].scale,0.5,{ease: Power4.easeIn, x: scaleX, y: scaleY,
		onComplete: function() {
			TweenMax.to(uiGroup.children[10].material,0.5,{ease: Power4.easeIn, opacity: 0,
				onComplete: function() {
					uiGroup.children[10].visible = false;
					uiGroup.children[10].material.opacity = 1;
					
					TweenMax.to(uiGroup.children[11].scale,0.5,{ease: Power4.easeIn, x: scaleX, y: scaleY,
						onComplete: function() {
							TweenMax.to(uiGroup.children[11].material,0.5,{ease: Power4.easeIn, opacity: 0,
								onComplete: function() {
									uiGroup.children[11].visible = false;
									uiGroup.children[11].material.opacity = 1;
									
									TweenMax.to(uiGroup.children[12].scale,0.5,{ease: Power4.easeIn, x: scaleX, y: scaleY,
										onComplete: function() {
											TweenMax.to(uiGroup.children[12].material,0.5,{ease: Power4.easeIn, opacity: 0,
												onComplete: function() {
													uiGroup.children[12].visible = false;
													uiGroup.children[12].material.opacity = 1;
													
													startRunning();													
												}
											});
										}
									});
									
								}
							});
						}
					});
					
				}
			});
		}
	});
};

var startRunning = function()
{
	gameStarted = true;
	timeClock.start();
	boyAction.time = 3.2916666;
	girlAction.time = 7.04166;
};

var addSprite = function(location, zVal, yVal, xVal, scaleX, scaleY, tag)
{
	var spriteMap = new THREE.TextureLoader().load( location );
	// spriteMap.minFilter = THREE.minFilter;
	var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	var item = new THREE.Sprite( spriteMaterial );
	item.position.set(xVal, yVal, zVal);
	item.scale.x = scaleX;
	item.scale.y = scaleY;
	item.tag = tag;
	item.lookAt(camera.position);
	uiGroup.add(item);
}

var initGame = function()
{
	initSphere();
	
	initHair();
	initDandruff();
	initFallenHair();
	initCracks();
	
	initPlayer();
	
	var light = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
	scene.add( light );
	
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.position.set(10, 40, 10);
	scene.add( directionalLight );
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 512;
	directionalLight.shadow.mapSize.height = 512;
	directionalLight.shadow.camera.near = 0.5;
	directionalLight.shadow.camera.far = 500
	
	camera.position.set(0, 24, 4);
	camera.lookAt(0,20,0);
	
	sceneLoop();
};

var setLevel = function()
{		
	for(var i = 0; i <  dandrufHalfOne.length; i++)
	{
		dandrufHalfOne[i].visible = false;
	}
	for(var i = 0; i <  dandrufHalfTwo.length; i++)
	{
		dandrufHalfTwo[i].visible = false;
	}
	
	for(var i = 0; i <  fallenHalfOne.length; i++)
	{
		fallenHalfOne[i].visible = false;
	}
	for(var i = 0; i <  fallenHalfTwo.length; i++)
	{
		fallenHalfTwo[i].visible = false;
	}
	
	for(var i = 0; i <  cracksHalfOne.length; i++)
	{
		cracksHalfOne[i].visible = false;
	}
	for(var i = 0; i <  cracksHalfTwo.length; i++)
	{
		cracksHalfTwo[i].visible = false;
	}
	
	if(currentLevel == 0){
		shuffleCones(obstacleHalfOne, dandrufHalfOne);
		shuffleCones(obstacleHalfTwo, dandrufHalfTwo);
	}
	else if(currentLevel == 1){
		shuffleCones(obstacleHalfOne, fallenHalfOne);
		shuffleCones(obstacleHalfTwo, fallenHalfTwo);
	}
	else if(currentLevel == 2){
		shuffleCones(obstacleHalfOne, cracksHalfOne);
		shuffleCones(obstacleHalfTwo, cracksHalfTwo);
	}
	
	for(var i = 20; i <  40; i++)
	{
		obstacleHalfTwo[i].visible = false;
		fallenHalfTwo[i].visible = false;
		dandrufHalfTwo[i].visible = false;
	}

	if(currentLevel == 0)
	{
		fogColor = new THREE.Color(0xE5FFCC);
		scene.background = fogColor;
		scene.fog = new THREE.Fog(fogColor, 0.0025, 100);
	}
	else if(currentLevel == 1)
	{
		fogColor = new THREE.Color(0xCCFFFF);
		scene.background = fogColor;
		scene.fog = new THREE.Fog(fogColor, 0.0025, 25);
	}
	else if(currentLevel == 2)
	{
		fogColor = new THREE.Color(0xFFFFCC);
		scene.background = fogColor;
		scene.fog = new THREE.Fog(fogColor, 0.0025, 25);
	}
};

var initSphere = function()
{
	var geometry = new THREE.SphereGeometry( 20, 100, 100 );
	
	var texture = new THREE.TextureLoader().load( 'images/ground.png' );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 15, 15 );
	
	var material = new THREE.MeshPhongMaterial( { map: texture, wireframe: false} );
	sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );
	sphere.receiveShadow = true;
	sphere.material.visible = false;
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/head.fbx', function ( object ) {
		var model = object;
		// object.traverse( function ( child ) {
			// if ( child.isMesh ) {
				// child.castShadow = true;
				// child.receiveShadow = true;
			// }
		// } );
		
		object.children[1].material[0].transparent = false;
		object.children[1].material[0].alphaTest = 0.5;
		object.children[1].material[0].alphaMap = null;
		sphere.add(object);
		object.rotation.y = Math.PI;
		object.scale.set(0.1035,0.1035,0.1035);
	} );	
	
	sphere.update = function()
	{
		if(!dead){
			sphere.rotation.x += Math.PI/360 + timeClock.getElapsedTime() * 0.0001;
			if(sphere.rotation.x >= 2 * Math.PI)
			{
				shuffled = false;
				sphere.rotation.x = 0;
				
				if(currentLevel == 0){
					shuffleCones(obstacleHalfOne, dandrufHalfOne);
				}
				else if(currentLevel == 1){
					shuffleCones(obstacleHalfOne, fallenHalfOne);
				}
				else if(currentLevel == 2){
					shuffleCones(obstacleHalfOne, cracksHalfOne);
				}
			}
			
			if(sphere.rotation.x >=  Math.PI && !shuffled)
			{
				shuffled = true;
				if(currentLevel == 0){
					shuffleCones(obstacleHalfTwo, dandrufHalfTwo);
				}
				else if(currentLevel == 1){
					shuffleCones(obstacleHalfTwo, fallenHalfTwo);
				}
				else if(currentLevel == 2){
					shuffleCones(obstacleHalfTwo, cracksHalfTwo);
				}
			}
		}
	};
};

var initHair = function()
{
	var geometry = new THREE.ConeGeometry( 1, 20, 32 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0x000000)} );
	var cone = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20, 0 ) );
	cone.isCone = true;
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/hair.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		//model.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20, 0 ) );
		model.isCone = true;
		object.scale.set(0.1, 0.1, 0.1);
		object.position.y = 20;
		cone.add(object);
		cone.material.visible = false;
		object.isCone = true;
		for(var i = 0; i < 16; i++)
		{
			initObstacleModel((Math.PI/16) * (i + 8), 0, obstacleHalfOne, cone);
			initObstacleModel((Math.PI/16) * (i + 8), Math.PI/30, obstacleHalfOne, cone);
			initObstacleModel((Math.PI/16) * (i + 8), -Math.PI/30, obstacleHalfOne, cone);
			
			initObstacleModel((Math.PI/16) * (i - 8), 0, obstacleHalfTwo, cone);
			initObstacleModel((Math.PI/16) * (i - 8), Math.PI/30, obstacleHalfTwo, cone);
			initObstacleModel((Math.PI/16) * (i - 8), -Math.PI/30, obstacleHalfTwo, cone);
		}
		
		for(var i = 0; i <  obstacleHalfTwo.length; i++)
		{
			obstacleHalfOne[i].children[0].children[0].isCone = true;
			
			obstacleHalfTwo[i].children[0].children[0].isCone = true;
		}
	} );
	
};

var initFallenHair = function()
{
	var geometry = new THREE.ConeGeometry( 0.5, 20, 32 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0x000000)} );
	var cone = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 30, 0 ) );
	cone.isCone = true;
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/hair.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		//model.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20, 0 ) );
		model.isCone = true;
		object.scale.set(0.1, 0.1, 0.1);
		object.position.y = 20;
		cone.add(object);
		cone.material.visible = false;
		model.isCone = true;
		
		for(var i = 0; i < 16; i++)
		{
			initObstacleModel((Math.PI/16) * (i + 8), 0, fallenHalfOne, cone);
			initObstacleModel((Math.PI/16) * (i + 8), Math.PI/30, fallenHalfOne, cone);
			initObstacleModel((Math.PI/16) * (i + 8), -Math.PI/30, fallenHalfOne, cone);
			
			initObstacleModel((Math.PI/16) * (i - 8), 0, fallenHalfTwo, cone);
			initObstacleModel((Math.PI/16) * (i - 8), Math.PI/30, fallenHalfTwo, cone);
			initObstacleModel((Math.PI/16) * (i - 8), -Math.PI/30, fallenHalfTwo, cone);
		}
		
		for(var i = 0; i <  fallenHalfOne.length; i++)
		{
			fallenHalfOne[i].children[0].children[0].fallen = false;
			fallenHalfOne[i].children[0].children[0].canFall = true;
			fallenHalfOne[i].children[0].children[0].arrayNumber = 1;
			fallenHalfOne[i].children[0].children[0].hairNumber = i;
			fallenHalfOne[i].children[0].children[0].isCone = true;
			
			fallenHalfTwo[i].children[0].children[0].fallen = false;
			fallenHalfTwo[i].children[0].children[0].canFall = true;
			fallenHalfTwo[i].children[0].children[0].arrayNumber = 2;
			fallenHalfTwo[i].children[0].children[0].hairNumber = i;
			fallenHalfTwo[i].children[0].children[0].isCone = true;
		}
	} );	
};

var fallHair = function(arrayNumber, hairNumber)
{
	var obj;
	
	if(arrayNumber == 1)
	{
		obj = fallenHalfOne[hairNumber].children[0].children[0];
	}
	else if(arrayNumber == 2)
	{
		obj = fallenHalfTwo[hairNumber].children[0].children[0];
	}
	
	obj.fallen = true;
	var rot = 0;
	var pRot = 0;
	
	if(arrayNumber == 1)
	{
		pRot = fallenHalfOne[hairNumber].rotation;
	}
	else if(arrayNumber == 2)
	{
		pRot = fallenHalfTwo[hairNumber].rotation;
	}
	console.log(pRot.z + Math.PI/30);
	
	if(pRot.z == Math.PI/30)
	{
		rot = -Math.PI/1.8;
	}
	else if(pRot.z == -Math.PI/30)
	{
		rot = Math.PI/1.8;
	}
	TweenMax.to(obj.rotation,1,{ ease: Bounce.easeOut, z:rot});
};

var initDandruff = function()
{
	var geometry = new THREE.BoxGeometry( 0.9, 0.5, 0.3 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0xffffff)} );
	var cube = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20.2, 0 ) );
	cube.isCone = true;
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/dandruff.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.1, 0.1, 0.1);
		object.position.y = 20;
		cube.add(object);
		cube.material.visible = false;
		object.isCone = true;
		
		for(var i = 0; i < 16; i++)
		{
			initObstacleModel((Math.PI/16) * (i + 8), 0, dandrufHalfOne, cube);
			initObstacleModel((Math.PI/16) * (i + 8), Math.PI/30, dandrufHalfOne, cube);
			initObstacleModel((Math.PI/16) * (i + 8), -Math.PI/30, dandrufHalfOne, cube);
			
			initObstacleModel((Math.PI/16) * (i - 8), 0, dandrufHalfTwo, cube);
			initObstacleModel((Math.PI/16) * (i - 8), Math.PI/30, dandrufHalfTwo, cube);
			initObstacleModel((Math.PI/16) * (i - 8), -Math.PI/30, dandrufHalfTwo, cube);
		}
		
		for(var i = 0; i <  obstacleHalfTwo.length; i++)
		{
			dandrufHalfOne[i].isCone = true;
			
			dandrufHalfTwo[i].isCone = true;
		}
	} );
	
};

var initCracks = function()
{
	var geometry = new THREE.BoxGeometry( 0.9, 0.5, 0.3 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0xffffff)} );
	var cube = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20.2, 0 ) );
	cube.isCone = true;
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/crack.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.1, 0.1, 0.1);
		object.position.y = 20;
		cube.add(object);
		cube.material.visible = false;
		object.isCone = true;
		
		for(var i = 0; i < 16; i++)
		{
			initObstacleModel((Math.PI/16) * (i + 8), 0, cracksHalfOne, cube);
			
			initObstacleModel((Math.PI/16) * (i - 8), 0, cracksHalfTwo, cube);
		}
		
		for(var i = 0; i <  obstacleHalfTwo.length; i++)
		{
			cracksHalfTwo[i].isCone = true;
			
			cracksHalfTwo[i].isCone = true;
		}
				
	} );
	
};

var initObstacleModel = function(xRot, zRot, obstacle, origin)
{
	var obj = origin.clone();
	obj.geometry.computeBoundingSphere();
	
	var a = Math.floor(Math.random() * 10);
	scene.add(obj);
	obj.rotation.x = xRot;
	obj.rotation.z = zRot;
	sphere.add(obj);
	obj.castShadow = true;
	obj.isCone = true;
	obstacle.push(obj);
};

var shuffleCones = function(obstacle1, obstacle2)
{
	if(currentLevel == 1)
	{
		for(var i = 0; i <  obstacle2.length; i++)
		{
			obstacle2[i].children[0].children[0].rotation.z = 0;
			obstacle2[i].children[0].children[0].fallen = false;
		}
	}
	
	for(var i = 0; i <  obstacle1.length/3; i++)
	{
		obstacle1[i * 3 + 0].visible = true;
		obstacle1[i * 3 + 1].visible = true;
		obstacle1[i * 3 + 2].visible = true;
		if(currentLevel != 2){
			obstacle2[i * 3 + 0].visible = true;
			obstacle2[i * 3 + 1].visible = true;
			obstacle2[i * 3 + 2].visible = true;
		}
		else
		{
			obstacle2[i].visible = true;
		}
		var randA = Math.floor(Math.random() * 3) + 1;
		
		if(randA == 2 || randA == 1)
		{
			var randX = Math.floor(Math.random() * 3);
			var randY = 100;
			do
			{
				randY = Math.floor(Math.random() * 3);
			}
			while(randX == randY);
			
			obstacle1[i * 3 + randX].visible = false;
			obstacle1[i * 3 + randY].visible = false;
			if(currentLevel != 2){
				obstacle2[i * 3 + randX].visible = false;
				obstacle2[i * 3 + randY].visible = false;
			}
			
			for(var j = 0; j < 3; j++)
			{
				if(j != randX && j != randY)
				{
					var randZ = Math.floor(Math.random() * 4);
					if(randZ == 0 ){
						obstacle1[i * 3 + j].visible = false;
					}
					else
					{
						if(currentLevel != 2){
							obstacle2[i * 3 + j].visible = false;
						}
						else
						{
							obstacle2[i].visible = false;
						}
					}
				}
			}
		}
		else if(randA == 3)
		{
			obstacle1[i * 3 + 0].visible = false;
			obstacle1[i * 3 + 1].visible = false;
			obstacle1[i * 3 + 2].visible = false;
			
			if(currentLevel != 2){
				obstacle2[i * 3 + 0].visible = false;
				obstacle2[i * 3 + 1].visible = false;
				obstacle2[i * 3 + 2].visible = false;
			}
			else
			{
				obstacle2[i].visible = false;
			}
		}
	}
};

var initPlayer = function()
{
	var geometry = new THREE.BoxGeometry( 0.5, 1, 0.5 );
	var material = new THREE.MeshPhongMaterial( {color: 0xFFD700} );
	player = new THREE.Mesh( geometry, material );
	scene.add( player );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20 + player.scale.y/2, 0 ) );
	
	scene.add(player);
	player.rotation.x = Math.PI/9;
	player.rotation.z = 0;
	player.add(camera);
	
	player.castShadow = true; 
	player.receiveShadow = false;

	player.dy = 0;
	player.firstJump = true;
	
	player.update = function()
	{
		if(jumping && !dead){
			if(player.position.y < 0)
			{
				player.dy = 0;
				jumping = false;
				player.position.y = 0;
				boyAction.time = 3.2916666;
				girlAction.time = 7.04166;
			}
			else
			{
				player.dy -= gravity;
			}
			player.position.y += player.dy;
		}
	};
	player.material.visible = false;
	initPlayerModel();
};

var initPlayerModel = function()
{
	var loader = new THREE.FBXLoader();
	loader.load( 'models/playerBoy.fbx', function ( object ) {
		var model = object;
		object.mixer = new THREE.AnimationMixer( object );
		mixers.push( object.mixer );
		boyAction = object.mixer.clipAction( object.animations[ 0 ] );
		boyAction.play();
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		// boyAction.time = 3.29;
		model.scale.x = 0.1;
		model.scale.y = 0.1;
		model.scale.z = 0.1;
		model.position.y = 20;
		// model.rotation.x = Math.PI/2;
		model.rotation.y = Math.PI;
		
		scene.add( object );
		
		player.add(object);
	} );
	
	loader.load( 'models/playerGirl.fbx', function ( object ) {
		var model = object;
		object.mixer = new THREE.AnimationMixer( object );
		mixersG.push( object.mixer );
		girlAction = object.mixer.clipAction( object.animations[ 0 ] );
		girlAction.play();
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		// boyAction.time = 3.29;
		model.scale.x = 0.1;
		model.scale.y = 0.1;
		model.scale.z = 0.1;
		model.position.y = 20;
		// model.rotation.x = Math.PI/2;
		model.rotation.y = Math.PI;
		
		scene.add( object );
		
		player.add(object);
		modelReady = true;
		
		setLevel();
		
	} );
};

var onDocumentKeyDown = function(event) {
	if(gameStarted && !dead){
		var keyCode = event.which;
		if (keyCode == 37) //left
		{
			moveLeft();
		} 
		else if (keyCode == 39) //right
		{
			moveRight();
		}
		else if (keyCode == 40 && !jumping) //down
		{
			player.dy = 0.2;
			jumping = true;
			boyAction.time = 3.916666;
			girlAction.time = 7.66666;
		}
	}
};

var moveLeft = function()
{
	if(player.rotation.z != Math.PI/32 && !playerMoving){
		playerMoving = true;
		TweenMax.to(player.rotation,0.3,{z:player.rotation.z + Math.PI/32,
			onUpdate:function(){
				camera.updateProjectionMatrix();
			},
			onComplete: function() {
				playerMoving = false;
			}
		});
	}
};

var moveRight = function()
{
	if(player.rotation.z != -Math.PI/32 && !playerMoving){
		playerMoving = true;
		TweenMax.to(player.rotation,0.3,{z:player.rotation.z - Math.PI/32,
			onUpdate:function(){
				camera.updateProjectionMatrix();
			},
			onComplete: function() {
				playerMoving = false;
			}
		});
	}
};

var collitionDetection = function()
{
	if(collitionStarted && !dead){
		player.geometry.computeBoundingBox();  
		player.updateMatrixWorld();
		var vector = new THREE.Vector3();
		vector.setFromMatrixPosition( camera.matrixWorld );
		var yVal = 19 + player.position.y;
		raycaster.set(new THREE.Vector3(vector.x, yVal , 7), new THREE.Vector3( 0, 0,  -1));
		raycaster.far = 10;
		intersects = raycaster.intersectObjects(sphere.children, true);
		if(intersects.length > 0)
		{
			for(var i =  0; i <  intersects.length; i++)
			{
				if(intersects[i].distance < 1 && intersects[i].object.isCone)
				{
					if(currentLevel == 2)
					{
						playerScore = 0;
					}
					else
					{
						playerScore += Math.floor(timeClock.getElapsedTime ());
					}
					timeClock.stop();
					timeClock.startTime = 0;
					timeClock.oldTime = 0;
					timeClock.elapsedTime = 0;
					dead = true;
					boyAction.time = 4.91666;
					girlAction.time = 8.6666;
				}
			}
		}
	
		if(currentLevel == 1){
			raycaster.set(new THREE.Vector3(-2.254, 20 , 7), new THREE.Vector3( 0, 0,  -1));
			raycaster.far = 50;
			intersects = raycaster.intersectObjects(sphere.children, true);
			if(intersects.length > 0)
			{
				for(var i =  0; i <  intersects.length; i++)
				{
					if(intersects[i].object.canFall && intersects[i].distance > 2)
					{
						if(!intersects[i].object.fallen)
						{
							fallHair(intersects[i].object.arrayNumber, intersects[i].object.hairNumber);
						}
					}
				}
			}
			
			raycaster.set(new THREE.Vector3(2.254, 20 , 7), new THREE.Vector3( 0, 0,  -1));
			raycaster.far = 50;
			intersects = raycaster.intersectObjects(sphere.children, true);
			if(intersects.length > 0)
			{
				for(var i =  0; i <  intersects.length; i++)
				{
					if(intersects[i].object.canFall && intersects[i].distance > 2)
					{
						if(!intersects[i].object.fallen)
						{
							fallHair(intersects[i].object.arrayNumber, intersects[i].object.hairNumber);
						}
					}
				}
			}
		}
	}
};

var gameOver = function()
{
	if(gameStarted){
		gameStarted = false;
		restartButton.style.display = "block";
		jumping = false;
		timeClock.stop();
	}
}

var restartGame = function()
{
	restarting = true;
	collitionStarted = false;
	restartButton.style.display = "none";
	sphere.rotation.x = 0;
	
	player.rotation.z = 0;
	player.position.y = 0;
	remainingTime = 60;
	// timeText.innerHTML = "Time : " + remainingTime;
	timeClock.start();
	dead = false;
	boyAction.time = 0;
	girlAction.time = 0;
	
	if(currentLevel == 2)
	{
		currentLevel = 0;
	}
	else
	{
		currentLevel++;
	}
	setLevel();
	
	restarting = false;
	
	if(currentLevel != 0){
		showCountDown();
	}
	else
	{
		playMenuApearAnimation();
	}
};

var update = function()
{
	if(gameStarted)
	{
		sphere.update();
		collitionDetection();
		player.update();
		remainingTime = 60 - Math.floor(timeClock.getElapsedTime () );
		
		if(remainingTime == 0)
		{
			gameOver();
		}
		// timeText.innerHTML = " Time : " + remainingTime;
		// scoreText.innerHTML = " Score : " + (playerScore + Math.floor(timeClock.getElapsedTime ()) );
		
		var a = Math.floor(timeClock.getElapsedTime () );
		
		if(!collitionStarted && a >= 0.5)
		{
			collitionStarted = true;
		}		
	}
	
	if(modelReady && gameStarted)
	{
		if(!jumping && !dead)
		{
			if(boyAction.time >= 3.875)
			{
				boyAction.time = 3.2916666;
			}
			if(girlAction.time >= 7.625)
			{
				girlAction.time = 7.04166;
			}
		}
		else if(dead)
		{
			if(gender == 0){
				if(boyAction.time >= 7.9)
				{
					boyAction.time = 7.9;
					player.position.y = 0;
					gameOver();
				}	
			}
			else
			{
				if(girlAction.time >= 11.60)
				{
					girlAction.time = 11.60;
					player.position.y = 0;
					gameOver();
				}	
			}			
		}
		
		if(gender == 1)
		{
			mixersG[0].update( clock.getDelta() );
		}
		else
		{
			mixers[0].update( clock.getDelta() );
		}
	}
	else if(modelReady && !gameStarted && !dead)
	{
		if(boyAction.time >= 3.25)
		{
			boyAction.time = 0;
		}
		if(girlAction.time >= 7)
		{
			girlAction.time = 0;
		}
		if(gender == 1)
		{
			mixersG[0].update( clock.getDelta() );
		}
		else
		{
			mixers[0].update( clock.getDelta() );
		}
	}
	
	//controls.update();

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

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {                                         
    xDown = getTouches(evt)[0].clientX;                                      
    yDown = getTouches(evt)[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

	if(gameStarted){
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				moveLeft();
			} else {
				moveRight();
			}                       
		}
		else
		{
			if ( yDiff > 0 ) {
				player.dy = 0.2;
				jumping = true;
			}
		} 
	}	
	xDown = null;
	yDown = null;   
};

init();