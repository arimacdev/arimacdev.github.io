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
var canvas;
var uiGroup;
var raycaster;
var mouse;
var scoreT;
var camBox;
var score;
var scoreForBall;
var numberArray;
var wicketsLeft;
var bounce;
var boundry;
var ballT;
var middleScore;
var firstT;
var scoreCard;
var scoreCardR;
var gameOver;

var cheerSadSound;
var cheerHappySound;
var papareSound;
var papareSound;
var batSound;
var batRunSound;
var ballRunSound;
var buttonSound;
var scoreSound;
var batSound;
var batSwingSound;

var finalScore;

var backgroundSprite;
var playButton;
var soundBuuton;
var sinhalaBuuton;
var tamilBuuton;
var englishBuuton;

var moverTime;

var soundOnMat = null;
var soundOffMat = null;
var soundOnDMat = null;
var soundOffDMat = null;

var listener;

var sOn;
var sOff;

var eOn;
var eOff;

var tOn;
var tOff;

var outMaterial;
var languageSelected;

var gameName;
var sName;
var eName;
var tName;

var yourScore;

window.addEventListener( 'mousedown', function(event)
{
	if(camAnimation){
		event.preventDefault();
		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( uiGroup.children );
		if ( intersects.length > 0 ) {
			if(intersects[0].object.buttonType == "Play")
			{
				buttonSound.play();
				API.spendcoins(playGame);
			}
			else if(intersects[0].object.buttonType == "Sound")
			{
				buttonSound.play();
				handleAudio();
			}
			else if(intersects[0].object.buttonType == "Sinhala")
			{
				buttonSound.play();
				changeLanguage(0);
			}
			else if(intersects[0].object.buttonType == "English")
			{
				buttonSound.play();
				changeLanguage(1);
			}
			else if(intersects[0].object.buttonType == "Tamil")
			{
				buttonSound.play();
				changeLanguage(2);
			}
		}
	}
	else if(gameOver){
		event.preventDefault();
		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children, true );
		if ( intersects.length > 0 ) {
			if(intersects[0].object.buttonType == "Return")
			{
				buttonSound.play();
				API.spendcoins(restartGame);
			}
		}
	}
	else {
	//console.log(ball.position.z);
		if(!shotInDisplay && !ballIsThrwoing && !batting){
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
	}
});

var handleAudio = function()
{
	var loader = new THREE.TextureLoader();
	
	if(soundOnMat == null)
	{
		soundOnMat = loader.load( 'UI/soundOn.png' );
	}
	if(soundOnDMat == null)
	{
		soundOnDMat = loader.load( 'UI/soundOnD.png' );
	}
	if(soundOffMat == null)
	{
		soundOffMat = loader.load( 'UI/soundOff.png' );
	}
	if(soundOffDMat == null)
	{
		soundOffDMat = loader.load( 'UI/soundOffD.png' );
	}
	
	var s = listener.getMasterVolume() ;
	
	var map1;
	var map2;
	var map3;
	
	if(s == 1)
	{
		map1 = soundOnDMat;
		map2 = soundOffDMat;
		map3 = soundOffMat;
		listener.setMasterVolume(0) ;
	}
	else if(s == 0)
	{
		map1 = soundOffDMat;
		map2 = soundOnDMat;;
		map3 = soundOnMat;
		listener.setMasterVolume(1) ;
	}
	
	soundBuuton.material.map = map1;
	
	TweenMax.to(soundBuuton.position,0.1,{z:soundBuuton.position.z - 0.02,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
			soundBuuton.material.map = map2;
			TweenMax.to(soundBuuton.position,0.1,{z:soundBuuton.position.z + 0.02,
				onUpdate:function(){
					camera.updateProjectionMatrix();
				},
				onComplete: function() {
					soundBuuton.material.map = map3;
				}
			});
		}
	});
	
};

var changeLanguage = function(lang)
{
	languageSelected = lang;
	var loader = new THREE.TextureLoader();
	if(lang == 0){
		if(sOff == null)
		{
			sOff = loader.load( 'UI/sF.png' );
		}
		if(sName == null)
		{
			sName = loader.load( 'UI/nameS.png' );
		}
		
		yourScore.material = createMaterial(loader.load( 'UI/scoreS.png' ));
		animateButton(sinhalaBuuton, sOff, sOn, sName);
	}
	else if(lang == 1){
		if(eOff == null)
		{
			eOff = loader.load( 'UI/eF.png' );
		}
		if(eName == null)
		{
			eName = loader.load( 'UI/nameE.png' );
		}
		
		yourScore.material = createMaterial(loader.load( 'UI/scoreE.png' ));
		animateButton(englishBuuton, eOff, eOn, eName);
	}
	else if(lang == 2){
		if(tOff == null)
		{
			tOff = loader.load( 'UI/tF.png' );
		}
		if(tName == null)
		{
			tName = loader.load( 'UI/nameT.png' );
		}
		
		yourScore.material = createMaterial(loader.load( 'UI/scoreT.png' ));
		animateButton(tamilBuuton, tOff, tOn, tName);
	}
	console.log("set m");
};

var animateButton = function(button, map1, map2, map3)
{
	button.material.map = map1;
	
	TweenMax.to(button.position,0.1,{z:button.position.z - 0.02,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
			gameName.material.map = map3;
			TweenMax.to(button.position,0.1,{z:button.position.z + 0.02,
				onUpdate:function(){
					camera.updateProjectionMatrix();
				},
				onComplete: function() {
					button.material.map = map2;
				}
			});
		}
	});
};

var playGame = function()
{
	API.setscore(0);
	camera.position.set(-5, 10, 20);
	uiGroup.visible = false;
	
	var loader = new THREE.TextureLoader();
	
	if(languageSelected == 0){
		outMaterial = createMaterial(loader.load( 'UI/outS.png' ))
	}
	else if(languageSelected == 1){
		outMaterial = createMaterial(loader.load( 'UI/outE.png' ))
	}
	else if(languageSelected == 2){
		outMaterial = createMaterial(loader.load( 'UI/outT.png' ))
	}
	
	TweenMax.to(camera.position,2,{x:0,y:1.5,z:10,
		onUpdate:function(){
			camera.lookAt(0,0,0);
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
			camAnimation = false;
			camBox.visible = true;
		}
	});
};

var restartGame = function()
{
	TweenMax.to(scoreCard.position,0.4,{ease: Bounce.easeOut,y:2,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
			scoreCard.visible = false;
		}
	});
	
	TweenMax.to(scoreCardR.position,0.4,{ease: Bounce.easeOut,y:2 - 0.35,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
			scoreCardR.visible = false;
		}
	});
	
	finalScore[0].visible = false;
	finalScore[1].visible = false;
	finalScore[2].visible = false;
	
	yourScore.visible = false;
	// for(var i = 0; i < finalScore.length; i++){
		// TweenMax.to(finalScore[i].position,0.4,{ease: Bounce.easeOut,y:2,
			// onUpdate:function(){
				// camera.updateProjectionMatrix();
			// },
			// onComplete: function() {
				// finalScore[i].visible = false;
			// }
		// });
	// }
	
	API.setscore(0);
	
	bowlerSpeed = 0;
	traveledDistance = 0;
	bowling = false;
	gravity = 0.01;
	friction = 0.5;
	ballType = 0;
	batting  = false;
	shotInDisplay = false;
	ballCanMove = false;
	camCounter = 0;
	camAnimation = false;
	ballInHold = true;
	catcherIndex = 10;
	throwMultiplier = 0;
	throwY = 0;
	running = false;
	ballIsThrwoing = false;
	out = false;
	xBarrier = 0.05;
	score = 0;
	scoreForBall = 0;
	wicketsLeft = 3;
	bounce = false;
	API.setruns(0);
	boundry = false;
	firstT = true;
	firstTime = true;
	gameOver = false;
	moverTime = 0;
	ballT[0].visible = true;
	ballT[1].visible = true;
	ballT[2].visible = true;
	
	updateScore();
};

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
		batman2.dx = 0.1;
	}
	else if(batman2.inStrike)
	{
		batman1.dy = -0.05;
		batman1.dz = 0.2;
		batman2.dy = -0.05;
		batman2.dz = -0.2;
		batman1.dx = 0.1;
	}
	
	if(ball.position.z >= 3  && ball.position.z <= 6){
		
		hitted = true;
		shotInDisplay = true;
		
		if(ball.position.z >= 3  && ball.position.z < 3.5)
		{
			var x = -0.15;
			var z = -0.5;
			catcherIndex = 3;
			throwMultiplier = 0.25;
			throwY = 0.22;
			moverTime = 0.2;
			if(ball.position.x > xBarrier)
			{
				x = -x/2;
				z = z/2;
				catcherIndex = 2;
				throwMultiplier = 0.5;
				throwY = 0.26;
				moverTime = 1.5;
			}
			ball.dx = x;
			ball.dz = z;
			ball.dy = 0.1;
			direction = new THREE.Vector3(x, 0, z);
		}
		else if(ball.position.z >= 3.5  && ball.position.z < 4)
		{
			var x = -0.3;
			var z = -0.3;
			catcherIndex = 4;
			throwMultiplier = 0.5;
			throwY = 0.27;
			if(ball.position.x > xBarrier)
			{
				x = -x;
				catcherIndex = 6;
				throwMultiplier = 0.5;
				throwY = 0.27;
			}
			ball.dx = x;
			ball.dz = z;
			ball.dy = 0.2;
			direction = new THREE.Vector3(x, 0, z);
			moverTime = 0.1;
		}
		else if(ball.position.z >= 4  && ball.position.z < 4.5)
		{
			var x = -0.4;
			var z = -0.15;
			catcherIndex = 5;
			throwMultiplier = 0.5;
			throwY = 0.27;
			if(ball.position.x > xBarrier)
			{
				x = -x;
				catcherIndex = 7;
				throwMultiplier = 0.5;
				throwY = 0.26;
			}
			ball.dx = x;
			ball.dz = z;
			ball.dy = 0.25;
			direction = new THREE.Vector3(x, 0, z);
			moverTime = 0.1;
		}
		else if(ball.position.z >= 4.5  && ball.position.z < 5)
		{
			var x = -0.4;
			var z = -0.6;
			catcherIndex = 3;
			throwMultiplier = 0.5;
			throwY = 0.27;
			if(ball.position.x > xBarrier)
			{
				x = -x;
				catcherIndex = 0;
				throwMultiplier = 0.5;
				throwY = 0.26;
			}
			ball.dx = x;
			ball.dz = z;
			ball.dy = 0.3;
			direction = new THREE.Vector3(x, 0, z);
			moverTime = 2;
		}
		else if(ball.position.z >= 5  && ball.position.z < 5.5)
		{
			var x = -0.16;
			var z = -0.16;
			catcherIndex = 3;
			throwMultiplier = 0.25;
			throwY = 0.22;
			moverTime = 0.7;
			if(ball.position.x > xBarrier)
			{
				x = -x;
				catcherIndex = 0;
				throwMultiplier = 0.3;
				throwY = 0.25;
				moverTime = 0.35;
			}
			ball.dx = x;
			ball.dz = z;
			ball.dy = 0.2;
			direction = new THREE.Vector3(x, 0, z);
		}
		else if(ball.position.z >= 5.5  && ball.position.z <= 6)
		{
			var x = -0.2;
			var z = -0.8;
			catcherIndex = 1;
			throwMultiplier = 0.5;
			throwY = 0.27;
			if(ball.position.x > xBarrier)
			{
				x = -x;
				catcherIndex = 2;
				throwMultiplier = 0.5;
				throwY = 0.26;
			}
			ball.dx = x;
			ball.dz = z;
			ball.dy = 0.55;
			direction = new THREE.Vector3(x, 0, z);
			moverTime = 2;
		}
	}
	
	if(hitted)
	{
		batSound.play();
		batRunSound.play();
		
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
		bounce = false;
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
		players[i].MoveToBall();
	}
};

window.addEventListener( 'resize', function()
{
	setUISizes();
	var width = window.innerWidth;
	var height = window.innerHeight;
	camera.aspect = width/ height;
	camera.updateProjectionMatrix();
	renderer.setSize(width,height);
	
});

var setUISizes = function()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	console.log(width);
	backgroundSprite.scale.set(19.20 * 1.6,10.80 * 1.6,1);
	
	playButton.scale.set(2.5,2.5,1);
	soundBuuton.scale.set(2.5,2.5,1);
	sinhalaBuuton.scale.set(2.5,2.5,1);
	englishBuuton.scale.set(2.5,2.5,1);
	tamilBuuton.scale.set(2.5,2.5,1);
	
	playButton.position.x = -(width/height) * 4;
	soundBuuton.position.x = -(width/height) * 2.8;
	playButton.position.y = -3;
	soundBuuton.position.y = -3;
	
	ballT[0].position.x = camBox.position.x - width/148;
	ballT[1].position.x = camBox.position.x - width/160;
	ballT[2].position.x = camBox.position.x - width/175;
	
	ballT[0].scale.x = width/2400;
	ballT[1].scale.x = width/2400;
	ballT[2].scale.x = width/2400;
	
	ballT[0].scale.y = height/1350;
	ballT[1].scale.y = height/1350;
	ballT[2].scale.y = height/1350;
	
	scoreT[0].position.x = camBox.position.x + width/175;
	scoreT[1].position.x = camBox.position.x + width/160;
	scoreT[2].position.x = camBox.position.x + width/148;
	
	scoreT[0].scale.x = width/2400;
	scoreT[1].scale.x = width/2400;
	scoreT[2].scale.x = width/2400;
	
	scoreT[0].scale.y = height/1350;
	scoreT[1].scale.y = height/1350;
	scoreT[2].scale.y = height/1350;
	
	sinhalaBuuton.position.x = -(width/height) * 4.6;
	sinhalaBuuton.position.y = -5.5;
	
	englishBuuton.position.x = -(width/height) * 3.4;
	englishBuuton.position.y = -5.5;
	
	tamilBuuton.position.x = -(width/height) * 2.2;
	tamilBuuton.position.y = -5.5;
	
	gameName.scale.x = 8.79 * 1.4;
	gameName.scale.y = 4.92 * 1.4;
	gameName.position.x = -7.5;
	gameName.position.y = 1;
};

var init = function()
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x0C162F );
	
	camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(0, 3.5, 12);
	camera.position.set(-5, 10, 20);
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
	
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	
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
	score = 0;
	scoreForBall = 0;
	numberArray = [];
	scoreT = [];
	camera.rotation.set(0,0,0);
	camera.position.set(0,0,100);
	wicketsLeft = 3;
	bounce = false;
	API.setruns();
	boundry = false;
	ballT = [];
	firstT = true;
	finalScore = [];
	moverTime = 0;
	languageSelected = 1;
	
	initUI();
	
	camera.update = function()
	{
		if(shotInDisplay || ballIsThrwoing)
		{
			camera.lookAt(ball.position.x, 0, ball.position.z);
		}
		if(!gameOver){
			camBox.position.set(camera.position.x, camera.position.y, camera.position.z);
			camBox.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
			scoreT[0].rotation.set(0,0,0);
			scoreT[1].rotation.set(0,0,0);
			scoreT[2].rotation.set(0,0,0);
			ballT[0].rotation.set(0,0,0);
			ballT[1].rotation.set(0,0,0);
			ballT[2].rotation.set(0,0,0);
			scoreCard.rotation.set(0,0,0);
			scoreCardR.rotation.set(0,0,0);
			finalScore[0].rotation.set(0,0,0);
			finalScore[1].rotation.set(0,0,0);
			finalScore[2].rotation.set(0,0,0);
			yourScore.rotation.set(0,0,0);
			middleScore.rotation.set(0,0,0);
		}
	};
	
	initMeshes();
	
	initSound();
	
	changeLanguage(languageSelected);
	
	API.savetoken(startScene);
	
};

var startScene = function()
{
	sceneLoop();
};

var initSound = function()
{
	listener = new THREE.AudioListener();
	camera.add( listener );
	listener.setMasterVolume(0) ;
	cheerSadSound = new THREE.Audio( listener );
	
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load( 'Sounds/cheerS.ogg', function( buffer ) {
		cheerSadSound.setBuffer( buffer );
		cheerSadSound.setLoop( false );
		cheerSadSound.setVolume( 1 );
	});
	
	cheerHappySound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/cheerH.ogg', function( buffer ) {
		cheerHappySound.setBuffer( buffer );
		cheerHappySound.setLoop( false );
		cheerHappySound.setVolume( 1 );
	});
	
	papareSound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/papare.ogg', function( buffer ) {
		papareSound.setBuffer( buffer );
		papareSound.setLoop( true );
		papareSound.setVolume( 0.5 );
		papareSound.play();
	});
	
	batRunSound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/runBat.ogg', function( buffer ) {
		batRunSound.setBuffer( buffer );
		batRunSound.setLoop( true );
		batRunSound.setVolume( 1 );
	});
	
	ballRunSound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/runBall.ogg', function( buffer ) {
		ballRunSound.setBuffer( buffer );
		ballRunSound.setLoop( true );
		ballRunSound.setVolume( 1 );
	});
	
	buttonSound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/button.mp3', function( buffer ) {
		buttonSound.setBuffer( buffer );
		buttonSound.setLoop( false );
		buttonSound.setVolume( 1 );
	});
	
	scoreSound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/score.mp3', function( buffer ) {
		scoreSound.setBuffer( buffer );
		scoreSound.setLoop( false );
		scoreSound.setVolume( 1 );
	});
	
	batSound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/bat.mp3', function( buffer ) {
		batSound.setBuffer( buffer );
		batSound.setLoop( false );
		batSound.setVolume( 1 );
	});
	
	batSwingSound = new THREE.Audio( listener );
	audioLoader.load( 'Sounds/batSwing.mp3', function( buffer ) {
		batSwingSound.setBuffer( buffer );
		batSwingSound.setLoop( false );
		batSwingSound.setVolume( 1 );
	});
	
};

var initUI = function()
{
	uiGroup = new THREE.Group();
	
	var spriteMap = new THREE.TextureLoader().load( "UI/menu2.jpg" );
	spriteMap.minFilter = THREE.minFilter;
	var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	backgroundSprite = new THREE.Sprite( spriteMaterial );
	uiGroup.add( backgroundSprite );
	backgroundSprite.position.z = 90;
	backgroundSprite.lookAt(camera.position);
	
	spriteMap = new THREE.TextureLoader().load( "UI/play.png" );
	spriteMap.minFilter = THREE.minFilter;
	spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	playButton = new THREE.Sprite( spriteMaterial );
	uiGroup.add( playButton );
	playButton.position.z = 91;
	playButton.lookAt(camera.position);
	playButton.buttonType = "Play";
	
	soundOnMat = new THREE.TextureLoader().load( "UI/soundOn.png" );
	soundOnMat.minFilter = THREE.minFilter;
	spriteMaterial = new THREE.SpriteMaterial( { map: soundOnMat, color: 0xffffff } );
	soundBuuton = new THREE.Sprite( spriteMaterial );
	uiGroup.add( soundBuuton );
	soundBuuton.position.z = 91;
	soundBuuton.lookAt(camera.position);
	soundBuuton.buttonType = "Sound";
	
	sOn = new THREE.TextureLoader().load( "UI/sN.png" );
	sOn.minFilter = THREE.minFilter;
	spriteMaterial = new THREE.SpriteMaterial( { map: sOn, color: 0xffffff } );
	sinhalaBuuton = new THREE.Sprite( spriteMaterial );
	uiGroup.add(sinhalaBuuton);
	sinhalaBuuton.position.z = 91;
	sinhalaBuuton.lookAt(camera.position);
	sinhalaBuuton.buttonType = "Sinhala";
	
	eOn = new THREE.TextureLoader().load( "UI/eN.png" );
	eOn.minFilter = THREE.minFilter;
	spriteMaterial = new THREE.SpriteMaterial( { map: eOn, color: 0xffffff } );
	englishBuuton = new THREE.Sprite( spriteMaterial );
	uiGroup.add(englishBuuton);
	englishBuuton.position.z = 91;
	englishBuuton.lookAt(camera.position);
	englishBuuton.buttonType = "English";
	
	tOn = new THREE.TextureLoader().load( "UI/tN.png" );
	tOn.minFilter = THREE.minFilter;
	spriteMaterial = new THREE.SpriteMaterial( { map: tOn, color: 0xffffff } );
	tamilBuuton = new THREE.Sprite( spriteMaterial );
	uiGroup.add(tamilBuuton);
	tamilBuuton.position.z = 91;
	tamilBuuton.lookAt(camera.position);
	tamilBuuton.buttonType = "Tamil";
	
	eName = new THREE.TextureLoader().load( "UI/nameE.png" );
	eName.minFilter = THREE.minFilter;
	spriteMaterial = new THREE.SpriteMaterial( { map: eName, color: 0xffffff } );
	gameName = new THREE.Sprite( spriteMaterial );
	uiGroup.add(gameName);
	gameName.position.z = 91;
	gameName.lookAt(camera.position);
	
	scene.add(uiGroup);
	
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	camBox = new THREE.Mesh( geometry, material );
	scene.add( camBox );
	
	spriteMap = new THREE.TextureLoader().load( "UI/t.png" );
	spriteMap.minFilter = THREE.minFilter;
	spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	scoreT.push(new THREE.Sprite( spriteMaterial ));
	scoreT[0].scale.x = 0.8;
	scoreT[0].scale.y = 0.8;
	scoreT[0].position.z = camBox.position.z - 9;
	scoreT[0].position.y = camBox.position.y + 6;
	scoreT[0].lookAt(camBox.position);
	scoreT[0].buttonType = "score";
	scoreT.push(scoreT[0].clone());
	scoreT.push(scoreT[0].clone());
	
	scoreT[0].position.x = camBox.position.x + 11;
	scoreT[1].position.x = camBox.position.x + 12;
	scoreT[2].position.x = camBox.position.x + 13;
	
	camBox.add( scoreT[0] );
	camBox.add( scoreT[1] );
	camBox.add( scoreT[2] );
	
	camBox.visible = false;
	
	var loader = new THREE.TextureLoader();
	numberArray.push(createMaterial(loader.load( 'UI/0.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/1.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/2.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/3.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/4.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/5.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/6.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/7.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/8.png' )));
	numberArray.push(createMaterial(loader.load( 'UI/9.png' )));
	
	scoreT[0].material = numberArray[0];
	scoreT[1].material = numberArray[0];
	scoreT[2].material = numberArray[0];
	
	ballT.push(scoreT[0].clone());
	ballT.push(scoreT[0].clone());
	ballT.push(scoreT[0].clone());
	
	camBox.add( ballT[0] );
	camBox.add( ballT[1] );
	camBox.add( ballT[2] );
	
	var mat = createMaterial(loader.load( 'Textures/ballN.png' ));;
	ballT[0].material = mat;
	ballT[1].material = mat;
	ballT[2].material = mat;
	
	middleScore = scoreT[0].clone();
	camBox.add(middleScore);
	middleScore.position.x = 0;
	middleScore.position.y = 5;
	middleScore.scale.x = 2;
	middleScore.scale.y = 2;
	middleScore.visible = false;
	
	scoreCard = (scoreT[0].clone());
	scoreCard.material = createMaterial(loader.load( 'UI/t.png' ));;
	camBox.add(scoreCard);
	scoreCard.position.x = 0;
	scoreCard.position.y = 0;
	scoreCard.scale.x = 0.9;
	scoreCard.scale.y = 0.9;
	scoreCard.position.z = -1;
	
	var spriteMapa = new THREE.TextureLoader().load( "UI/return.png" );
	var spriteMateriala = new THREE.SpriteMaterial( { map: spriteMapa, color: 0xffffff } );
	scoreCardR = new THREE.Sprite(spriteMateriala);
	camBox.add(scoreCardR);
	scoreCardR.position.x = 0;
	scoreCardR.position.y = 0;
	scoreCardR.scale.x = 0.3;
	scoreCardR.scale.y = 0.3;
	scoreCardR.position.z = -0.98;
	scoreCardR.buttonType = "Return";
	
	scoreCard.visible = false;
	scoreCardR.visible = false;
	
	finalScore.push(scoreT[0].clone());
	finalScore.push(scoreT[0].clone());
	finalScore.push(scoreT[0].clone());
	
	yourScore = scoreT[0].clone();
	yourScore.position.set(0,0.15, -0.99);
	camBox.add( yourScore );
	
	yourScore.scale.x = 0.8;
	yourScore.scale.y = 0.4;
	yourScore.visible = false;
	
	camBox.add( finalScore[0] );
	camBox.add( finalScore[1] );
	camBox.add( finalScore[2] );
	
	finalScore[0].position.set(0.12,-0.15, -0.98);
	finalScore[1].position.set(0,-0.15, -0.98);
	finalScore[2].position.set(-0.12,-0.15, -0.98);
	
	finalScore[0].scale.x = 0.1;
	finalScore[1].scale.x = 0.1;
	finalScore[2].scale.x = 0.1;
	finalScore[0].scale.y = 0.1;
	finalScore[1].scale.y = 0.1;
	finalScore[2].scale.y = 0.1;
	
	finalScore[0].visible = false;
	finalScore[1].visible = false;
	finalScore[2].visible = false;
	
	setUISizes();
};

var initMeshes = function()
{
	var loader = new THREE.TextureLoader();
	var crowdTexture = loader.load( 'Textures/Background1.png' );
	crowdTexture.wrapS = crowdTexture.wrapT = THREE.RepeatWrapping;
	crowdTexture.repeat.set( 6, 1 );
	crowdTexture.anisotropy = 16;
	crowdTexture.minFilter = THREE.minFilter;
	
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
	groundTexture.anisotropy = 16;
	groundTexture.minFilter = THREE.minFilter;
	var geometry = new THREE.CircleGeometry( 150,150 );
	var material = new THREE.MeshBasicMaterial( { map: groundTexture} );
	var floor = new THREE.Mesh( geometry, material );
	scene.add(floor);
	floor.rotation.x = - Math.PI / 2;
	
	var geometryf = new THREE.PlaneGeometry( 4, 16 );
	var pitchTexture = loader.load( 'Textures/pitch.png' );
	pitchTexture.anisotropy  = 16;
	pitchTexture.minFilter = THREE.minFilter;
	var materialf = new THREE.MeshBasicMaterial( {map: pitchTexture, transparent: true} );
	var pitch = new THREE.Mesh( geometryf, materialf );
	scene.add(pitch);
	pitch.rotation.x = - Math.PI / 2;
	pitch.position.y = 0.001;
	
	var texture = loader.load( 'Textures/bowler2.png' );
	texture.anisotropy = 16;
	texture.minFilter = THREE.minFilter;
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
	
	initPlayer(11,-11, 0);
	initPlayer(-5,-40, 1);
	initPlayer(5,-40, 2);
	initPlayer(-6,-11, 3);
	initPlayer(-20,-15, 4);
	initPlayer(-23,-8, 5);
	initPlayer(	25,-15, 6);
	initPlayer(25,-2, 7);
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
	texture.anisotropy = 16;
	texture.minFilter = THREE.minFilter;
	wicketAnim = new TextureAnimatorWicket( texture, 20, 1, 20, 40);
	var batmanMat = new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide} );
	batmanMat.transparent = true;
	var batmanGeo = new THREE.PlaneGeometry(1.1, 1.25);
	var batter = new THREE.Mesh(batmanGeo, batmanMat);
	scene.add( batter );
	batter.position.set(0, 0.48, 7.9);
	
	var loader2 = new THREE.TextureLoader();
	var texture2 = loader.load( 'Textures/wicket4.png' );
	texture2.anisotropy = 16;
	texture2.minFilter = THREE.minFilter;
	var batmanMat2 = new THREE.MeshBasicMaterial( { map: texture2, side:THREE.DoubleSide, alphaTest: 0.5} );

	var batmanGeo2 = new THREE.PlaneGeometry(1.1, 1.25);
	var batter2 = new THREE.Mesh(batmanGeo2, batmanMat2);
	scene.add( batter2 );
	batter2.position.set(0, 0.48, -7.9);
};

var createMaterial = function( texture ) {
	texture.minFilter = THREE.minFilter;
    return new THREE.MeshBasicMaterial( { map: texture, transparent: true} );
};

var showScore = function()
{
	var scaleX = 1.6;
	var scaleY = 1.6;
	if(scoreForBall >= API.getruns())
	{
		API.appendscore(scoreForBall);
		score += scoreForBall;
		if(API.getruns() == 0)
		{
			middleScore.material = outMaterial;
			scaleX = 8;
			scaleY = 4;
		}
		else
		{
			middleScore.material = numberArray[scoreForBall];
		}
	}
	else
	{
		API.appendscore(API.getruns());
		middleScore.material = numberArray[API.getruns()];
	}
	
	middleScore.scale.x = 0;
	middleScore.scale.y = 0;
	middleScore.visible = true;
	
	scoreSound.play();
	
	TweenMax.to(middleScore.scale,0.8,{ease: Elastic.easeOut,x:scaleX,y:scaleY,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
			TweenMax.to(middleScore.scale,0.8,{ease: Elastic.easeOut,x:0,y:0,
				onUpdate:function(){
					camera.updateProjectionMatrix();
				},
				onComplete: function() {
					initB();
				}
			}).delay(0.3);
		}
	});
	
	middleScore.position.y = 2;
	TweenMax.to(middleScore.position,0.8,{ease: Elastic.easeOut,y:5,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
			TweenMax.to(middleScore.position,0.8,{ease: Elastic.easeOut,y:2,
				onUpdate:function(){
					camera.updateProjectionMatrix();
				},
				onComplete: function() {
					
				}
			}).delay(0.3);
		}
	});
	
	scoreForBall = 0;
	API.setruns(0);
	boundry = false;
	updateScore();
};

var updateScore = function()
{
	var s = API.getscore().pad(3);
	var a = parseInt(s[2]);
	scoreT[2].material = numberArray[a];
	finalScore[0].material = numberArray[a];
	a = parseInt(s[1]);
	scoreT[1].material = numberArray[a];
	finalScore[1].material = numberArray[a];
	a = parseInt(s[0]);
	scoreT[0].material = numberArray[a];
	finalScore[2].material = numberArray[a];
};

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

var initPlayer = function(x, z, index)
{
	var loader = new THREE.TextureLoader();
	var geometry = new THREE.PlaneGeometry( 3.95/3, 6.29/3 );
	var texture = loader.load( 'Textures/player4.png' );
	texture.minFilter = THREE.minFilter;
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
	
	player.CalculateInteractPoint = function()
	{
		var h = new THREE.Vector3();
		shotLine.closestPointToPoint(player.position, 0, h);
		player.interactPoint = h;
		player.distanceToBall = calculateDistance(player.position, player.interactPoint);
	};
	
	player.MoveToBall = function()
	{
		var pX = player.interactPoint.x;
		var pZ = player.interactPoint.z;
		var timeT = moverTime;
		if(player.index != catcherIndex){
			pX = player.interactPoint.x * 0.5 + player.initialPoint.x;
			pZ = player.interactPoint.z * 0.5 + player.initialPoint.z;
			timeT = 2;
		}
		
		TweenMax.to(player.position,timeT,{x:pX,z:pZ,
			onUpdate:function(){
				player.lookAt(camera.position.x,player.position.y,camera.position.z);
				camera.updateProjectionMatrix();
			},
		});
	};
	
	player.MoveFromBall = function()
	{
		TweenMax.to(player.position,2,{x:player.initialPoint.x,z:player.initialPoint.z,
			onUpdate:function(){
				player.lookAt(camera.position.x,player.position.y,camera.position.z);
				camera.updateProjectionMatrix();
			},
			onComplete: function() {
				moverTime = 0;
			}
		});
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
	texture.minFilter = THREE.minFilter;
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
				if(!shotInDisplay && !ballIsThrwoing){
					switch(ballType) {
						case 0:
							ball.dx = -0.01;
							break;
						case 1:
							ball.dx = -0.05;
							break;
						case 2:
							ball.dx = 0.05;
							break;
						case 3:
							ball.dx = -0.01;
							break;
						case 4:
							ball.dx = -0.03;
							break;
						case 5:
							ball.dx = -0.01;
							break;
						case 6:
							ball.dx = 0.035;
							break;
						case 7:
							ball.dx = -0.035;
							break;
						default:
					}
				}
				else
				{
					bounce = true;
				}
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
			if(travelD > 50)
			{
				cheerHappySound.play();
				if(!boundry){
					if(bounce)
					{
						scoreForBall = 4;
					}
					else
					{
						scoreForBall = 6;
					}
					boundry = true;
				}
			}
			if(travelD > 65)
			{
				camera.lookAt(0,0,0);
				shotInDisplay = false;
				for(var i = 0; i < players.length; i++)
				{
					players[i].MoveFromBall();
				}
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
				for(var i = 0; i < players.length; i++)
				{
					players[i].MoveFromBall();
				}
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
				cheerSadSound.play();
				ball.position.z = -100;
				ball.dz = 0;
				ball.dy = 0;
				ball.dx = 0;
				out = true;
				if(wicketsLeft > 0){
					wicketsLeft--;
				}
				ballT[wicketsLeft].visible = false;
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
		if(wicketsLeft == 0)
		{
			gameOver = true;
			showGameOver();
			return;
		}
		bounce = false;
		if(firstT)
		{
			initB();
			firstT = false;
		}
		else{
			showScore();
		}
	}
};

var initB = function()
{
	ballRunSound.play();
	shotInDisplay = false;
	bowlerSpeed = -0.1;
	bowling = true;
	ballInHold = true;
	ball.position.x = 0.5;
	ball.position.z = -7.1;
	ball.position.y = 1;
};

var startBowling = function()
{
	ballType = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
	switch(ballType) {
		case 0:
			ball.dx = -0.01;
			ball.dy = 0.1;
			ball.dz = 0.4;
			break;
		case 1:
			ball.dx = 0;
			ball.dy = 0.1;
			ball.dz = 0.4;
			break;
		case 2:
			ball.dx = -0.04;
			ball.dy = 0.1;
			ball.dz = 0.4;
			break;
		case 3:
			ball.dx = -0.01;
			ball.dy = 0.1;
			ball.dz = 0.5;
			break;
		case 4:
			ball.dx = -0.01;
			ball.dy = 0.03;
			ball.dz = 0.55;
			break;
		case 5:
			ball.dx = -0.01;
			ball.dy = 0.15;
			ball.dz = 0.25;
			break;
		case 6:
			ball.dx = -0.03;
			ball.dy = 0.15;
			ball.dz = 0.25;
			break;
		case 7:
			ball.dx = 0;
			ball.dy = 0.15;
			ball.dz = 0.25;
			break;
		default:
			
	}
};

var showGameOver = function(){
	API.submitscore(submitScoreCall);
};

var submitScoreCall = function()
{
	scoreCard.position.y = 2;
	scoreCard.visible = true;
	TweenMax.to(scoreCard.position,0.8,{ease: Bounce.easeOut,y:0,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
		}
	});
	
	scoreCardR.position.y = 2 - 0.35;
	scoreCardR.visible = true;
	TweenMax.to(scoreCardR.position,0.8,{ease: Bounce.easeOut,y:-0.35,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
		}
	});
	
	for(var i = 0; i < finalScore.length; i++){
		finalScore[i].position.y = 2;
		finalScore[i].visible = true;
		TweenMax.to(finalScore[i].position,0.8,{ease: Bounce.easeOut,y:-0.1,
			onUpdate:function(){
				camera.updateProjectionMatrix();
			},
			onComplete: function() {
			}
		});
	}
	
	yourScore.position.y = 2 + 0.15;
	yourScore.visible = true;
	TweenMax.to(yourScore.position,0.8,{ease: Bounce.easeOut,y:0.15,
		onUpdate:function(){
			camera.updateProjectionMatrix();
		},
		onComplete: function() {
		}
	});
};

var initSprites = function(pos)
{
	var loader = new THREE.TextureLoader();
	var texture = loader.load( 'Textures/batmanNN.png' );
	texture.anisotropy  = 16;
	texture.minFilter = THREE.minFilter;
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
			if(!this.inStrike){
				batter.dx -= 0.003;
			}
			batter.position.y += batter.dy;
			batter.position.z += batter.dz;
			batter.position.x += batter.dx;
			
			//batter.position.x += batter.dx;
			var travelD = calculateDistance(new THREE.Vector3(0,0,0), ball.position);
			if(this.inStrike)
			{
				if(this.position.z < -6)
				{
					this.inStrike = false;
					if(shotInDisplay && travelD < 65){
						this.dz = -this.dz;
						this.dx = 0.1;
						this.animator.runFromWicket();
					}
					else
					{
						batRunSound.stop();
						this.running = false;
						this.dz = 0;
						this.dy = 0;
						this.dx = 0;
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
						this.dx = 0;
						this.animator.runToWicket();
					}
					else
					{
						this.running = false;
						this.dz = 0;
						this.dy = 0;
						this.dx = 0;
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
		batSwingSound.play();
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
		if(API.getruns() < 4){
			API.appendruns(1);
		}
		
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
		batSwingSound.play();
		
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
		if(API.getruns() < 4){
			API.appendruns(1);
		}
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
		ballRunSound.stop();
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

