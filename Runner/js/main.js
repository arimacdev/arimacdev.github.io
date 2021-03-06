var scene, camera, renderer, controls;
var gameStarted;
var sphere;
var obstacleHalfOne, obstacleHalfTwo;
var dandrufHalfOne, dandrufHalfTwo;
var fallenHalfOne, fallenHalfTwo;
var cracksHalfOne, cracksHalfTwo;
var coinHalfOne, coinHalfTwo;
var topBottle, bottomBottle;
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

var dead;
var uiGroup;

var uiChecking;
var mouse;
var gender;
var whiteNumbers, greenNumber;

var playerScore, playerTime, extraTime, playerLives;

var bgSound, buttonSound, swipeSound, jumpSound, hitSound, collectSound, coundSound, apearSound, coinSound, tadaSound;

var elapsedT;
var tempScore;
var tempRun;
var hitByHair;
var allComplete;

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
				buttonSound.play();
				playMenuDisapearAnimation();
			}
			else if(intersects[0].object.tag == "Male")
			{
				buttonSound.play();
				gender = 0;
				player.children[1].visible = true;
				player.children[2].visible = false;
				playGenderDisapearAnimation();
			}
			else if(intersects[0].object.tag == "Female")
			{
				buttonSound.play();
				gender = 1;
				player.children[1].visible = false;
				player.children[2].visible = true;
				playGenderDisapearAnimation();
			}
			else if(intersects[0].object.tag == "Tap")
			{
				buttonSound.play();
				showHideLevel(false, currentLevel+1);
			}
			else if(intersects[0].object.tag == "Try")
			{
				buttonSound.play();
				hideGameOver();
			}
			else if(intersects[0].object.tag == "Submit")
			{
				buttonSound.play();
				
				var encodedScore = encodeScore(playerScore.toString());
				var hashKey = makeid();
				
				//check location
				var locationName = "default";
				var field = 'loc';
				var url = window.location.href;
				if(url.indexOf('?' + field + '=') != -1)
					locationName = window.location.location;
				else if(url.indexOf('&' + field + '=') != -1)
					locationName = window.location.location;
				
				
				var redUrl = "https://score.dandexfreedomrun.arimac.games/submit/" + encodedScore + "/" + hashKey + "/" + locationName;
				console.log(redUrl);
				window.location.href = redUrl;
			}
			else if(intersects[0].object.tag == "Ready")
			{
				buttonSound.play();
				playHowToDisapearAnimation();
			}
		}
	}
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

function encodeScore(x){

    /*
    1=a   2=s  3=d  4=f  5=1  6=2  7=3  8=4  9=z  0=x
    */

    var scorestr = [...x];

    console.log(x);
    console.log(scorestr + "  " + scorestr.length);

    var _score = '';
    for (var i in scorestr) {
        var key=scorestr[i];
        switch(key){
            case '1':
                _score = _score.concat('a');
                break;
            case '2':
                _score = _score.concat('s');
                break;
            case '3':
                _score = _score.concat('d');
                break;
            case '4':
                _score = _score.concat('f');
                break;
            case '5':
                _score = _score.concat('1');
                break;
            case '6':
                _score = _score.concat('2');
                break;
            case '7':
                _score = _score.concat('3');
                break;
            case '8':
                _score = _score.concat('4');
                break;
            case '9':
                _score = _score.concat('z');
                break;
            case '0':
                _score = _score.concat('x');
                break;
            default:
            break;    
        }
        console.log("Score : " + _score);
    }
    
    return _score;
}

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
	// renderer.shadowMap.enabled = true;
	// renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	
	// controls = new THREE.OrbitControls( camera );
	
	document.addEventListener("keydown", onDocumentKeyDown, false);
	
	gameStarted = false;
	
	
	setSize();
	
	startGame();
};

var setSkyBox = function()
{
	var cube = new THREE.CubeGeometry(100, 100, 100);
    
    var cubeMaterials = [
      // back side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/skybox/side.png'),
        side: THREE.DoubleSide
      }),
      // front side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/skybox/side.png'),
        side: THREE.DoubleSide
      }), 
      // Top side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/skybox/top.png'),
        side: THREE.DoubleSide
      }), 
      // Bottom side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/skybox/down.png'),
        side: THREE.DoubleSide
      }), 
      // right side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/skybox/side.png'),
        side: THREE.DoubleSide
      }), 
      // left side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/skybox/side.png'),
        side: THREE.DoubleSide
      }) 
    ];

    //add cube & materials
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var mesh = new THREE.Mesh(cube, cubeMaterial);
    scene.add(mesh);
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
	coinHalfOne = [];
	coinHalfTwo = [];
	
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
	currentLevel = 0;
	restarting = false;
	collitionStarted = false;
	dead = false;
	uiChecking = false;
	mouse = new THREE.Vector2();
	gender = 0;
	
	playerScore = 0;
	playerTime = 60;
	extraTime = 0;
	playerLives = 3;
	
	elapsedT = 60;
	tempScore = 0;
	allcomplete = false;
	
	tempRun = false;
	hitByHair = false;
	
	initUI();
	initSound();
};

var initSound = function()
{
	var listener = new THREE.AudioListener();
	camera.add( listener );
	
	var audioLoader = new THREE.AudioLoader();
	
	bgSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/bg1.mp3', function( buffer ) {
		bgSound.setBuffer( buffer );
		bgSound.setLoop( true );
		bgSound.setVolume( 1 );
		bgSound.play();
	});
	
	buttonSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/button1.mp3', function( buffer ) {
		buttonSound.setBuffer( buffer );
		buttonSound.setLoop( false );
		buttonSound.setVolume( 1 );
	});
	
	swipeSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/swipe1.mp3', function( buffer ) {
		swipeSound.setBuffer( buffer );
		swipeSound.setLoop( false );
		swipeSound.setVolume( 1 );
	});
	
	jumpSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/jump1.mp3', function( buffer ) {
		jumpSound.setBuffer( buffer );
		jumpSound.setLoop( false );
		jumpSound.setVolume( 1 );
	});
	
	hitSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/hit1.mp3', function( buffer ) {
		hitSound.setBuffer( buffer );
		hitSound.setLoop( false );
		hitSound.setVolume( 1 );
	});
	
	collectSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/collect1.wav', function( buffer ) {
		collectSound.setBuffer( buffer );
		collectSound.setLoop( false );
		collectSound.setVolume( 1 );
	});
	
	coundSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/count1.wav', function( buffer ) {
		coundSound.setBuffer( buffer );
		coundSound.setLoop( false );
		coundSound.setVolume( 1 );
	});
	
	apearSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/apear1.mp3', function( buffer ) {
		apearSound.setBuffer( buffer );
		apearSound.setLoop( false );
		apearSound.setVolume( 1 );
	});
	
	coinSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/superCoin.mp3', function( buffer ) {
		coinSound.setBuffer( buffer );
		coinSound.setLoop( false );
		coinSound.setVolume( 1 );
	});
	
	tadaSound = new THREE.Audio( listener );
	audioLoader.load( 'audio/tada1.mp3', function( buffer ) {
		tadaSound.setBuffer( buffer );
		tadaSound.setLoop( false );
		tadaSound.setVolume( 1 );
	});
};

var initUI = function()
{
	uiGroup = new THREE.Group();
	
	addSprite("images/p/bg.png", -1, 0, 0, 1.08 * 0.8, 1.92 * 0.8, "");//0
	
	addSprite("images/name.png", -0.99, 0.36, 0, 0.451 * 1.65, 0.3 * 1.65, "");//1
	addSprite("images/girl.png", -0.99, -0.13, -0.24, 1.91 * 0.11, 3.8 * 0.11, "");//2
	addSprite("images/boy.png", -0.99, -0.12, 0.24, 1.71 * 0.125, 3.71 * 0.125, "");//3
	addSprite("images/p/start.png", -0.99, -0.165, 0, 3.7 * 0.075, 1.78 * 0.075, "Play");//4
	
	addSprite("images/p/genderS.png", -0.99, 0.56, 0, 0.642 * 1.1, 0.08 * 1.1, "");//5
	addSprite("images/girl.png", -0.99, -0.07, -0.15, 1.91 * 0.225, 3.8 * 0.225, "");//6
	addSprite("images/boy.png", -0.99, -0.035, 0.15, 1.71 * 0.25, 3.71 * 0.25, "");//7
	addSprite("images/female.png", -0.99, -0.58, -0.17, 3.75 * 0.08, 1.8 * 0.08, "Female");//8
	addSprite("images/male.png", -0.99, -0.58, 0.185, 3.75 * 0.08, 1.8 * 0.08, "Male");//9
	
	addSprite("images/p/numbers/3.png", -0.99, 0.3, 0, 1.16 * 0.11, 1.87 * 0.11, "");//10
	addSprite("images/p/numbers/2.png", -0.99, 0.3, 0, 1.16 * 0.11, 1.87 * 0.11, "");//11
	addSprite("images/p/numbers/1.png", -0.99, 0.3, 0, 1.16 * 0.11, 1.87 * 0.11, "");//12
	
	addSprite("images/p/level1.png", -1, 0, 0, 1.08 * 0.8, 1.92 * 0.8, "");//13
	addSprite("images/p/level2.png", -1, 0, 0, 1.08 * 0.8, 1.92 * 0.8, "");//14
	addSprite("images/p/level3.png", -1, 0, 0, 1.08 * 0.8, 1.92 * 0.8, "");//15
	
	addSprite("images/tap.png", -0.99, -0.58, 0, 5.84* 0.08, 1.8 * 0.08, "Tap");//16
	
	addSprite("images/level1.png", -0.99, 0.64, 0, 0.746 * 0.8, 0.547 * 0.8, "");//17
	addSprite("images/level2.png", -0.99, 0.64, 0, 0.746 * 0.8, 0.547 * 0.8, "");//18
	addSprite("images/level3.png", -0.99, 0.64, 0, 0.746 * 0.8, 0.547 * 0.8, "");//19
	
	addSprite("images/cBot.png", -0.99, -0.23, 0, 6.67* 0.08, 0.69 * 0.08, "");//20
	addSprite("images/p/level1text.png", -0.99, -0.4, 0, 5.53* 0.11, 1.28 * 0.11, "");//21
	addSprite("images/p/level2text.png", -0.99, -0.4, 0, 5.53* 0.11, 1.28 * 0.11, "");//22
	addSprite("images/p/level3text.png", -0.99, -0.4, 0, 7.33* 0.11, 1.28 * 0.11, "");//23
	
	addSprite("images/p/score.png", -0.99, 0.64, 0.25, 4.42* 0.11, 1.45 * 0.11, "");//24
	
	addSprite("images/p/whiteNumbers/0.png", -0.98, 0.635, 0.36, 0.72 * 0.08, 1.13 * 0.08, "");//25
	addSprite("images/p/whiteNumbers/0.png", -0.98, 0.635, 0.315, 0.72 * 0.08, 1.13 * 0.08, "");//26
	addSprite("images/p/whiteNumbers/0.png", -0.98, 0.635, 0.27, 0.72 * 0.08, 1.13 * 0.08, "");//27
	
	addSprite("images/p/time1.png", -0.99, 0.635, -0.31, 1.45 * 0.13, 1.45 * 0.13, "");//28
	addSprite("images/p/whiteNumbers/0.png", -0.97, 0.625, -0.275, 0.72 * 0.11, 1.13 * 0.11, "");//29
	addSprite("images/p/whiteNumbers/0.png", -0.97, 0.625, -0.335, 0.72 * 0.11, 1.13 * 0.11, "");//30
	
	addSprite("images/p/gameover.png", -0.99, 0.47, 0, 0.356 * 1.1, 0.248 * 1.1, "");//31
	addSprite("images/p/yScore.png", -0.99, -0.04, 0, 0.414 * 1.11, 0.152 * 1.11, "");//32
	addSprite("images/p/submit.png", -0.99, -0.46, 0, 0.402 * 1.11, 0.124 * 1.11, "Submit");//33
	
	addSprite("images/p/numbers/0.png", -0.99, -0.22, 0.16, 0.116 * 1.1, 0.187 * 1.1, "");//34
	addSprite("images/p/numbers/0.png", -0.99, -0.22, 0.055, 0.116 * 1.1, 0.187 * 1.1, "");//35
	addSprite("images/p/numbers/0.png", -0.99, -0.22, -0.05, 0.116 * 1.1, 0.187 * 1.1, "");//36
	
	addSprite("images/p/plus5.png", -0.99, 0.35, 0, 0.19 * 1, 0.19 * 1, "");//37
	
	addSprite("images/p/life.png", -0.99, 0.64, -0.18, 0.054 * 1.1, 0.05 * 1.1, "");//38
	addSprite("images/p/life.png", -0.99, 0.64, -0.11, 0.054 * 1.1, 0.05 * 1.1, "");//39
	addSprite("images/p/life.png", -0.99, 0.64, -0.04, 0.054 * 1.1, 0.05 * 1.1, "");//40
	
	addSprite("images/b1.png", -0.99, 0.03, 0, 0.307 * 0.8, 0.859 * 0.8, "");//41
	addSprite("images/b2.png", -0.99, 0.03, 0, 0.307 * 0.8, 0.859 * 0.8, "");//42
	addSprite("images/b3.png", -0.99, 0.03, 0, 0.307 * 0.8, 0.859 * 0.8, "");//43
	
	addSprite("images/complete.png", -0.99, 0.08, 0, 0.746 * 1.1, 0.226 * 1.1, "");//44	
		
	addSprite("images/p/logos.png", -0.99, -0.6, 0, 0.633 * 1.1, 0.182 * 1.1, "");//45	
	
	addSprite("images/p/howtitle.png", -0.99, 0.57, 0, 0.404 * 1.12, 0.08 * 1.12, "");//46	
	addSprite("images/p/howto.png", -0.99, 0.03, 0, 0.660 * 1.1, 0.735 * 1.1, "");//47	
	addSprite("images/p/ready.png", -0.99, -0.545, 0, 0.256 * 1.1, 0.124 * 1.1, "Ready");//48
	
	addSprite("images/p/whiteNumbers/0.png", -0.98, 0.635, 0.225, 0.72 * 0.08, 1.13 * 0.08, "");//49
	
	addSprite("images/p/allcomplete.png", -0.98, 0.15,0, 6.09 * 0.11, 1.78 * 0.11, "");//50
	addSprite("images/p/nocomplete.png", -0.98, 0.15,0, 6.09 * 0.11, 1.78 * 0.11, "");//51
	
	addSprite("images/p/numbers/0.png", -0.99, -0.22, -0.155, 0.116 * 1.1, 0.187 * 1.1, "");//52
	addSprite("images/p/tryagian.png", -0.99, -0.58, 0, 0.212 * 1.11, 0.066 * 1.11, "Try");//53
	
	
	whiteNumbers = [];
	
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/0.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/1.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/2.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/3.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/4.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/5.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/6.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/7.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/8.png" ));
	whiteNumbers.push(new THREE.TextureLoader().load( "images/p/whiteNumbers/9.png" ));
	
	greenNumber = [];
	
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/0.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/1.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/2.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/3.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/4.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/5.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/6.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/7.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/8.png" ));
	greenNumber.push(new THREE.TextureLoader().load( "images/p/numbers/9.png" ));
		
	camera.add(uiGroup);
	
	setScore(playerScore, playerTime);
	
	playMenuApearAnimation();
	
	initGame();
};

var displayLives = function()
{
	uiGroup.children[38].material.opacity = 0;
	uiGroup.children[39].material.opacity = 0;
	uiGroup.children[40].material.opacity = 0;
	
	uiGroup.children[38].visible = true;
	uiGroup.children[39].visible = true;
	uiGroup.children[40].visible = true;
		
	TweenMax.to(uiGroup.children[38].material,0.5,{ease: Power4.easeOut, opacity:1});
	if(playerLives > 1)
	{
		TweenMax.to(uiGroup.children[39].material,0.5,{ease: Power4.easeOut, opacity:1});
	}
	if(playerLives > 2)
	{
		TweenMax.to(uiGroup.children[40].material,0.5,{ease: Power4.easeOut, opacity:1});
	}
}

var hideLives = function()
{			
	TweenMax.to(uiGroup.children[38].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[38].visible = false;
		}
	});
	TweenMax.to(uiGroup.children[39].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[39].visible = false;
		}
	});
	TweenMax.to(uiGroup.children[40].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[41].visible = false;
		}
	});
}

var removeLives = function(index)
{
	TweenMax.to(uiGroup.children[38 + index].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[38 + index].visible = false;
		}
	});
}

var showGameOver = function()
{
	setFinalScore(playerScore);
	
	uiGroup.children[0].material.opacity = 0;
	uiGroup.children[0].visible = true;
	TweenMax.to(uiGroup.children[0].material,0.5,{ease: Power4.easeOut,opacity:1});
	
	uiGroup.children[31].material.opacity = 0;
	uiGroup.children[31].visible = true;
	TweenMax.to(uiGroup.children[31].material,0.5,{ease: Power4.easeOut,delay : 0.2, opacity:1});
	
	var a = 50;
	if(!allcomplete)
	{
		a = 51;
	}
	
	uiGroup.children[a].material.opacity = 0;
	uiGroup.children[a].visible = true;
	TweenMax.to(uiGroup.children[a].material,0.5,{ease: Power4.easeOut,delay : 0.4, opacity:1});
	
	uiGroup.children[32].material.opacity = 0;
	uiGroup.children[32].visible = true;
	TweenMax.to(uiGroup.children[32].material,0.5,{ease: Power4.easeOut,delay : 0.6, opacity:1});
	
	uiGroup.children[34].material.opacity = 0;
	uiGroup.children[34].visible = true;
	TweenMax.to(uiGroup.children[34].material,0.5,{ease: Power4.easeOut,delay : 0.8, opacity:1});
	
	uiGroup.children[35].material.opacity = 0;
	uiGroup.children[35].visible = true;
	TweenMax.to(uiGroup.children[35].material,0.5,{ease: Power4.easeOut,delay : 0.8, opacity:1});
	
	uiGroup.children[36].material.opacity = 0;
	uiGroup.children[36].visible = true;
	TweenMax.to(uiGroup.children[36].material,0.5,{ease: Power4.easeOut,delay : 0.8, opacity:1});
	
	uiGroup.children[52].material.opacity = 0;
	uiGroup.children[52].visible = true;
	TweenMax.to(uiGroup.children[52].material,0.5,{ease: Power4.easeOut,delay : 0.8, opacity:1});
	
	uiGroup.children[33].material.opacity = 0;
	uiGroup.children[33].visible = true;
	TweenMax.to(uiGroup.children[33].material,0.5,{ease: Power4.easeOut,delay : 1, opacity:1});
	
	uiGroup.children[53].material.opacity = 0;
	uiGroup.children[53].visible = true;
	TweenMax.to(uiGroup.children[53].material,0.5,{ease: Power4.easeOut,delay : 1.2, opacity:1,
		onComplete: function() {
			uiChecking = true;
		}
	});
};

var hideGameOver = function()
{	
	TweenMax.to(uiGroup.children[31].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[31].visible = false;
			uiGroup.children[31].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[50].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[50].visible = false;
			uiGroup.children[50].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[51].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[51].visible = false;
			uiGroup.children[51].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[32].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[32].visible = false;
			uiGroup.children[32].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[33].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[33].visible = false;
			uiGroup.children[33].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[34].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[34].visible = false;
			uiGroup.children[34].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[35].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[35].visible = false;
			uiGroup.children[35].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[36].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[36].visible = false;
			uiGroup.children[36].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[52].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[52].visible = false;
			uiGroup.children[52].material,opacity = 1;
		}
	});
	
	TweenMax.to(uiGroup.children[53].material,0.5,{ease: Power4.easeOut, opacity:0,
		onComplete: function() {
			uiGroup.children[53].visible = false;
			uiGroup.children[53].material,opacity = 1;
			
			playMenuApearAnimation();
			
		}
	});
};

var setScore = function(score, time)
{
	var s = score.pad(4);
	
	uiGroup.children[25].material.map = whiteNumbers[parseInt(s[3])];
	uiGroup.children[26].material.map = whiteNumbers[parseInt(s[2])];
	uiGroup.children[27].material.map = whiteNumbers[parseInt(s[1])];
	uiGroup.children[49].material.map = whiteNumbers[parseInt(s[0])];
	
	var t = time.pad(2);
	
	uiGroup.children[29].material.map = whiteNumbers[parseInt(t[1])];
	uiGroup.children[30].material.map = whiteNumbers[parseInt(t[0])];
};

var setFinalScore = function(score)
{
	var s = score.pad(4);
	
	uiGroup.children[34].material.map = greenNumber[parseInt(s[3])];
	uiGroup.children[35].material.map = greenNumber[parseInt(s[2])];
	uiGroup.children[36].material.map = greenNumber[parseInt(s[1])];
	uiGroup.children[36].material.map = greenNumber[parseInt(s[0])];
};

var showHideGameMenu = function(show)
{
	var arr = [24,25,26,27,28,29,30,49];
	if(show){
		for(var i = 0; i < arr.length; i++)
		{
			uiGroup.children[arr[i]].material.opacity = 0;
			uiGroup.children[arr[i]].visible = true;
			
			TweenMax.to(uiGroup.children[arr[i]].material,0.5,{ease: Power4.easeOut, opacity:1});
		}
		displayLives();
	}
	else {
		for(var i = 0; i < arr.length; i++)
		{
			TweenMax.to(uiGroup.children[arr[i]].material,0.5,{ease: Power4.easeIn, opacity:0,
				onComplete: function() {
					uiGroup.children[24].visible = false;
					uiGroup.children[25].visible = false;
					uiGroup.children[26].visible = false;
					uiGroup.children[27].visible = false;
					uiGroup.children[28].visible = false;
					uiGroup.children[29].visible = false;
					uiGroup.children[30].visible = false;
					uiGroup.children[49].visible = false;
				}
			});
		}
		hideLives();
	}
}

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

var playMenuApearAnimation = function()
{
	playerScore = 0;
	setScore(playerScore, playerTime);
	currentLevel = 0;
	playerLives = 3;
	elapsedT = 60;
	playerScore = 0;
	allcomplete = false;
	
	uiGroup.children[2].scale.set(1.91 * 0.11,3.8 * 0.11, 1);
	uiGroup.children[3].scale.set(1.71 * 0.125, 3.71 * 0.125, 1);
	
	uiGroup.children[2].position.set(-0.24, -0.13, -0.99);
	uiGroup.children[3].position.set(0.24, -0.12, -0.99);
	
	var yScale = uiGroup.children[1].scale.y;
	uiGroup.children[1].scale.y = 0;
	var xScale = uiGroup.children[1].scale.x;
	uiGroup.children[1].scale.x= 0;
	
	var xOne = uiGroup.children[2].position.x;
	uiGroup.children[2].position.x = -2;
	
	var xTwo = uiGroup.children[3].position.x;
	uiGroup.children[3].position.x = 2;
	
	var yTwo = uiGroup.children[4].position.y;
	uiGroup.children[4].position.y = -2;
	
	var yOne = uiGroup.children[45].position.y;
	uiGroup.children[45].position.y = -2;
	
	uiGroup.children[0].visible = true;
	uiGroup.children[1].visible = true;
	uiGroup.children[2].visible = true;
	uiGroup.children[3].visible = true;
	uiGroup.children[4].visible = true;
	uiGroup.children[45].visible = true;
	
	TweenMax.to(uiGroup.children[1].scale,1,{ease: Elastic.easeOut, delay : 0,y:yScale, x: xScale});
	TweenMax.to(uiGroup.children[2].position,1,{ease: Power4.easeOut, delay : 0.2,x:xOne});
	TweenMax.to(uiGroup.children[3].position,1,{ease: Power4.easeOut, delay : 0.2,x:xTwo});
	TweenMax.to(uiGroup.children[4].position,1,{ease: Power4.easeOut, delay : 0,y:yTwo});
	TweenMax.to(uiGroup.children[45].position,1,{ease: Power4.easeOut, delay : 0.5,y:yOne,
		onComplete: function() {
			uiChecking = true;
		}
	});
};

var playMenuDisapearAnimation = function()
{
	uiChecking = false;
	
	TweenMax.to(uiGroup.children[1].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[1].visible = false;
			uiGroup.children[1].material.opacity = 1;
		}
	});
	TweenMax.to(uiGroup.children[4].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[4].visible = false;
			uiGroup.children[4].material.opacity = 1;
		}
	});
	TweenMax.to(uiGroup.children[45].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[45].visible = false;
			uiGroup.children[45].material.opacity = 1;
		}
	});
	
	var giS = uiGroup.children[6].scale;
	var boS = uiGroup.children[7].scale;
	var giP = uiGroup.children[6].position;
	var boP = uiGroup.children[7].position
	
	TweenMax.to(uiGroup.children[2].scale,1,{ease: Power4.easeOut,y:giS.y, x: giS.x});
	TweenMax.to(uiGroup.children[3].scale,1,{ease: Power4.easeOut,y:boS.y, x: boS.x});
	TweenMax.to(uiGroup.children[2].position,1,{ease: Power4.easeOut,y:giP.y, x: giP.x});
	TweenMax.to(uiGroup.children[3].position,1,{ease: Power4.easeOut,y:boP.y, x: boP.x});
	
	playGenderApearAnimation();
};

var playGenderApearAnimation = function()
{
	
	var yScale = uiGroup.children[5].scale.y;
	uiGroup.children[5].scale.y = 0;
	var xScale = uiGroup.children[5].scale.x;
	uiGroup.children[5].scale.x = 0;
	
	var yTwo = uiGroup.children[8].position.y;
	uiGroup.children[8].position.y = -2;
	uiGroup.children[9].position.y = -2;
	
	uiGroup.children[0].visible = true;
	uiGroup.children[5].visible = true;
	uiGroup.children[8].visible = true;
	uiGroup.children[9].visible = true;
	
	TweenMax.to(uiGroup.children[5].scale,0.5,{ease: Elastic.easeOut, delay : 0.2,y:yScale, x: xScale});
	TweenMax.to(uiGroup.children[8].position,0.5,{ease: Power4.easeOut, y:yTwo});
	TweenMax.to(uiGroup.children[9].position,0.5,{ease: Power4.easeOut, y:yTwo,
		onComplete: function() {
			uiChecking = true;
		}
	});
};

var playGenderDisapearAnimation = function()
{
	uiChecking = false;
	
	TweenMax.to(uiGroup.children[5].material,0.5,{ opacity:0});
	TweenMax.to(uiGroup.children[2].material,0.5,{ opacity:0});
	TweenMax.to(uiGroup.children[3].material,0.5,{ opacity:0});
	TweenMax.to(uiGroup.children[7].material,0.5,{ opacity:0});
	TweenMax.to(uiGroup.children[8].material,0.5,{ opacity:0});
	TweenMax.to(uiGroup.children[9].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[5].visible = false;
			uiGroup.children[2].visible = false;
			uiGroup.children[3].visible = false;
			uiGroup.children[7].visible = false;
			uiGroup.children[8].visible = false;
			uiGroup.children[9].visible = false;
			
			uiGroup.children[5].material.opacity = 1;
			uiGroup.children[2].material.opacity = 1;
			uiGroup.children[3].material.opacity = 1;
			uiGroup.children[7].material.opacity = 1;
			uiGroup.children[8].material.opacity = 1;
			uiGroup.children[9].material.opacity = 1;
			playHowToApearAnimation();
		}
	});
};

var playHowToApearAnimation = function()
{
	
	var yScale = uiGroup.children[46].scale.y;
	uiGroup.children[46].scale.y = 0;
	var xScale = uiGroup.children[46].scale.x;
	uiGroup.children[46].scale.x = 0;
	
	uiGroup.children[47].material.opacity = 0;
	
	var yTwo = uiGroup.children[48].position.y;
	uiGroup.children[48].position.y = -2;
	
	uiGroup.children[46].visible = true;
	uiGroup.children[47].visible = true;
	uiGroup.children[48].visible = true;
	
	TweenMax.to(uiGroup.children[46].scale,0.5,{ease: Elastic.easeOut, delay : 0.2,y:yScale, x: xScale});
	TweenMax.to(uiGroup.children[47].material,0.5,{ease: Power4.easeOut, delay: 0.3, opacity:1});
	TweenMax.to(uiGroup.children[48].position,0.5,{ease: Power4.easeOut, y:yTwo,
		onComplete: function() {
			uiChecking = true;
		}
	});
};

var playHowToDisapearAnimation = function()
{
	uiChecking = false;
	
	TweenMax.to(uiGroup.children[46].material,0.5,{ opacity:0});
	TweenMax.to(uiGroup.children[47].material,0.5,{ opacity:0});
	TweenMax.to(uiGroup.children[48].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[46].visible = false;
			uiGroup.children[47].visible = false;
			uiGroup.children[48].visible = false;
			
			uiGroup.children[46].material.opacity = 1;
			uiGroup.children[47].material.opacity = 1;
			uiGroup.children[48].material.opacity = 1;
			showHideLevel(true, currentLevel+1);
		}
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
	
	coundSound.isPlaying = false;
	coundSound.play();
	
	TweenMax.to(uiGroup.children[10].scale,0.5,{ease: Power4.easeIn, x: scaleX, y: scaleY,
		onComplete: function() {
			TweenMax.to(uiGroup.children[10].material,0.5,{ease: Power4.easeIn, opacity: 0,
				onComplete: function() {
					uiGroup.children[10].visible = false;
					uiGroup.children[10].material.opacity = 1;
					
					coundSound.isPlaying = false;
					coundSound.play();
					
					TweenMax.to(uiGroup.children[11].scale,0.5,{ease: Power4.easeIn, x: scaleX, y: scaleY,
						onComplete: function() {
							TweenMax.to(uiGroup.children[11].material,0.5,{ease: Power4.easeIn, opacity: 0,
								onComplete: function() {
									uiGroup.children[11].visible = false;
									uiGroup.children[11].material.opacity = 1;
									
									coundSound.isPlaying = false;
									coundSound.play();
									
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
	playerScore = tempScore;
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
	item.visible = false;
};

var showHideLevel = function(show, index)
{
	if(show)
	{
		if(index == 1)
		{
			levelApear(13, 17, 41, 21, 16);
		}
		else if(index == 2)
		{
			levelApear(14, 18, 42, 22, 16);
		}
		else if(index == 3)
		{
			levelApear(15, 19, 43, 23, 16);
		}
	}
	else
	{
		if(index == 1)
		{
			levelDisapear(13, 17, 41, 21, 16);
		}
		else if(index == 2)
		{
			levelDisapear(14, 18, 42, 22, 16);
		}
		else if(index == 3)
		{
			levelDisapear(15, 19, 43, 23, 16);
		}
	}
};

var levelApear = function(bg, name, text1, text2, tap)
{	
	uiGroup.children[bg].material.opacity = 0;
	
	var yThree= uiGroup.children[text2].position.x;
	uiGroup.children[text2].position.x = 6;
	
	var yFour = uiGroup.children[tap].position.y;
	uiGroup.children[tap].position.y = -2;
	
	uiGroup.children[bg].visible = true;
	uiGroup.children[text2].visible = true;
	uiGroup.children[tap].visible = true;
	
	var de = 0;
	if(currentLevel != 0)
	{
		de = 2;
	}
	
	TweenMax.to(uiGroup.children[bg].material,0.5,{ease: Power4.easeOut, delay : de, opacity:1,
		onUpdate: function() {
			uiGroup.children[44].visible = false;
		},
		onComplete: function() {
	
			TweenMax.to(uiGroup.children[text2].position,0.5,{ease: Power4.easeOut, x: yThree});
			TweenMax.to(uiGroup.children[tap].position,0.5,{ease: Power4.easeOut, y: yFour});
			
			uiGroup.children[0].visible = false;
			tempRun = false;
			uiGroup.children[44].visible = false;
			uiChecking = true;
			
			collitionStarted = false;
			sphere.rotation.x = 0;
			
			player.rotation.z = 0;
			player.position.y = 0;
			elapsedTime = 60;
			extraTime = 0;
			
			dead = false;
			boyAction.time = 0;
			girlAction.time = 0;
			setLevel();
		}
	});
};

var levelDisapear = function(bg, name, text1, text2, tap)
{
	uiChecking = false;
	
	TweenMax.to(uiGroup.children[bg].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[bg].visible = false;
			uiGroup.children[bg].material.opacity = 1;
		}
	});
	TweenMax.to(uiGroup.children[text2].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[text2].visible = false;
			uiGroup.children[text2].material.opacity = 1;
		}
	});
	TweenMax.to(uiGroup.children[tap].material,0.5,{ opacity:0,
		onComplete: function() {
			uiGroup.children[tap].visible = false;
			uiGroup.children[tap].material.opacity = 1;
			showHideGameMenu(true);
			showCountDown();
		}
	});
		
};

var initGame = function()
{
	initSphere();
	
	initHair();
	initDandruff();
	initFallenHair();
	initCracks();
	initCoins();
	
	initTopBottle();
	initBottomBottle();
	
	initPlayer();
	
	var light = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
	scene.add( light );
	
	// var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
	// directionalLight.position.set(0, 40, 10);
	// scene.add( directionalLight );
	// directionalLight.castShadow = true;
	// directionalLight.shadow.mapSize.width = 512;
	// directionalLight.shadow.mapSize.height = 512;
	// directionalLight.shadow.camera.near = 0.5;
	// directionalLight.shadow.camera.far = 500
	
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
		shuffleCones(obstacleHalfOne, dandrufHalfOne, bottomBottle, coinHalfOne);
		shuffleCones(obstacleHalfTwo, dandrufHalfTwo, topBottle, coinHalfTwo);
	}
	else if(currentLevel == 1){
		shuffleCones(obstacleHalfOne, fallenHalfOne, bottomBottle, coinHalfOne);
		shuffleCones(obstacleHalfTwo, fallenHalfTwo, topBottle, coinHalfTwo);
	}
	else if(currentLevel == 2){
		shuffleCones(obstacleHalfOne, cracksHalfOne, bottomBottle, coinHalfOne);
		shuffleCones(obstacleHalfTwo, cracksHalfTwo, topBottle, coinHalfTwo);
	}
	
	for(var i = 20; i <  40; i++)
	{
		obstacleHalfTwo[i].visible = false;
		fallenHalfTwo[i].visible = false;
		dandrufHalfTwo[i].visible = false;
		coinHalfTwo[i].visible = false;
	}
	for(var i = 7; i <  14; i++)
	{
		cracksHalfTwo[i].visible = false;
	}

	fogColor = new THREE.Color(0xCCE5FF);
	scene.background = fogColor;
	scene.fog = new THREE.Fog(fogColor, 0.0025, 25);
		
	if(currentLevel == 0)
	{
		topBottle.children[0].visible = true;
		topBottle.children[1].visible = false;
		topBottle.children[2].visible = false;
		
		bottomBottle.children[0].visible = true;
		bottomBottle.children[1].visible = false;
		bottomBottle.children[2].visible = false;
	}
	else if(currentLevel == 1)
	{
		// fogColor = new THREE.Color(0xFFFFCC);
		// scene.background = fogColor;
		// scene.fog = new THREE.Fog(fogColor, 0.0025, 25);
		
		topBottle.children[0].visible = false;
		topBottle.children[1].visible = true;
		topBottle.children[2].visible = false;
		
		bottomBottle.children[0].visible = false;
		bottomBottle.children[1].visible = true;
		bottomBottle.children[2].visible = false;
	}
	else if(currentLevel == 2)
	{
		// fogColor = new THREE.Color(0xE5FFCC);
		// scene.background = fogColor;
		// scene.fog = new THREE.Fog(fogColor, 0.0025, 25);
		
		topBottle.children[0].visible = false;
		topBottle.children[1].visible = false;
		topBottle.children[2].visible = true;
		
		bottomBottle.children[0].visible = false;
		bottomBottle.children[1].visible = false;
		bottomBottle.children[2].visible = true;
	}
	
	extraTime = 0;
	
	timeClock.startTime = 0;
	timeClock.oldTime = 0;
	timeClock.elapsedTime = 0;
	
	setScore(playerScore, 60);
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
	loader.load( 'models/head2.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		
		object.children[1].material[0].transparent = false;
		object.children[1].material[0].alphaTest = 0.5;
		object.children[1].material[0].alphaMap = null;
		sphere.add(object);
		object.rotation.y = Math.PI;
		object.scale.set(0.1035,0.1035,0.1035);
		object.castShadow = true;
		object.receiveShadow = true;
	} );	
	
	sphere.update = function()
	{
		if(!dead || tempRun){
			// + timeClock.getElapsedTime() * 0.0001
			sphere.rotation.x += Math.PI/360 * 0.8 ;
			if(sphere.rotation.x >= 2 * Math.PI)
			{
				shuffled = false;
				sphere.rotation.x = 0;
				
				if(currentLevel == 0){
					shuffleCones(obstacleHalfOne, dandrufHalfOne, bottomBottle, coinHalfOne);
				}
				else if(currentLevel == 1){
					shuffleCones(obstacleHalfOne, fallenHalfOne, bottomBottle, coinHalfOne);
				}
				else if(currentLevel == 2){
					shuffleCones(obstacleHalfOne, cracksHalfOne, bottomBottle, coinHalfOne);
				}
			}
			
			if(sphere.rotation.x >=  Math.PI && !shuffled)
			{
				shuffled = true;
				if(currentLevel == 0){
					shuffleCones(obstacleHalfTwo, dandrufHalfTwo, topBottle, coinHalfTwo);
				}
				else if(currentLevel == 1){
					shuffleCones(obstacleHalfTwo, fallenHalfTwo, topBottle, coinHalfTwo);
				}
				else if(currentLevel == 2){
					shuffleCones(obstacleHalfTwo, cracksHalfTwo, topBottle, coinHalfTwo);
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
			obstacleHalfOne[i].isCone = false;
			obstacleHalfTwo[i].isCone = false;
			obstacleHalfOne[i].children[0].children[0].isCone = true;
			obstacleHalfTwo[i].children[0].children[0].isCone = true;
			obstacleHalfOne[i].children[0].children[0].isHair = true;
			obstacleHalfTwo[i].children[0].children[0].isHair = true;
		}
	} );
	
};

var initFallenHair = function()
{
	var geometry = new THREE.ConeGeometry( 0.5, 20, 32 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0x000000)} );
	var cone = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 30, 0 ) );
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/hair.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		object.scale.set(0.1, 0.1, 0.1);
		object.position.y = 20;
		cone.add(object);
		cone.material.visible = false;
		
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
			
			fallenHalfOne[i].isCone = false;
			fallenHalfTwo[i].isCone = false;
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
	
	if(pRot.z == Math.PI/30)
	{
		rot = -Math.PI/2;
	}
	else if(pRot.z == -Math.PI/30)
	{
		rot = Math.PI/2;
	}
	TweenMax.to(obj.rotation,1,{ ease: Bounce.easeOut, z:rot,
		onUpdate:function(){
			obj.updateMatrixWorld();
		}
	});
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
	loader.load( 'models/cracks1.fbx', function ( object ) {
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
			cracksHalfOne[i].isCone = false;
			cracksHalfTwo[i].isCone = false;
			
			cracksHalfOne[i].children[0].children[0].isCone = true;
			cracksHalfTwo[i].children[0].children[0].isCone = true;
		}
	} );
	
};

var initCoins = function()
{
	var geometry = new THREE.BoxGeometry( 0.7, 0.7, 0.7 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0xffffff)} );
	var cube = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20.5, 0 ) );
	cube.isCoin = true;
	cube.castShadow = true;
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/coin4.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				// child.receiveShadow = true;
			}
		} );
		model.isCoin = true;
		object.scale.set(1.5, 1.5, 1.5);
		object.position.y = 20.7;
		// object.rotation.x += Math.PI/2;
		cube.add(object);
		cube.material.visible = false;
		
		for(var i = 0; i < 16; i++)
		{
			initObstacleModel((Math.PI/16) * (i + 8), 0, coinHalfOne, cube);
			initObstacleModel((Math.PI/16) * (i + 8), Math.PI/30, coinHalfOne, cube);
			initObstacleModel((Math.PI/16) * (i + 8), -Math.PI/30, coinHalfOne, cube);
			
			initObstacleModel((Math.PI/16) * (i - 8), 0, coinHalfTwo, cube);
			initObstacleModel((Math.PI/16) * (i - 8), Math.PI/30, coinHalfTwo, cube);
			initObstacleModel((Math.PI/16) * (i - 8), -Math.PI/30, coinHalfTwo, cube);
			
		}
		
		for(var i = 0; i <  coinHalfOne.length; i++)
		{
			coinHalfOne[i].isCone = false;
			coinHalfTwo[i].isCone = false;
			coinHalfOne[i].isCoin = true;
			coinHalfTwo[i].isCoin = true;
		}
	} );
	
};

var initTopBottle = function()
{
	var geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0xffffff)} );
	var cube = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20, 0 ) );
	
	var obj = cube;
	scene.add(obj);
	sphere.add(obj);
	obj.castShadow = true;
	cube.material.visible = false;
	cube.isBottle = true
	var loader = new THREE.FBXLoader();
	loader.load( 'models/bottle1.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.07, 0.07, 0.07);
		object.position.y = 20.1;
		cube.add(object);
		object.isBottle = true;
	} );
	
	var loader1 = new THREE.FBXLoader();
	loader1.load( 'models/bottle2.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.07, 0.07, 0.07);
		object.position.y = 20.1;
		cube.add(object);
		object.isBottle = true;
	} );
	
	var loader2 = new THREE.FBXLoader();
	loader2.load( 'models/bottle3.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.07, 0.07, 0.07);
		object.position.y = 20.1;
		cube.add(object);
		object.isBottle = true;
	} );
	
	topBottle = obj;
};

var initBottomBottle = function()
{
	var geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );
	var material = new THREE.MeshBasicMaterial( {color: new THREE.Color(0xffffff)} );
	var cube = new THREE.Mesh( geometry, material );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 20.4, 0 ) );
	
	var obj = cube;
	scene.add(obj);
	sphere.add(obj);
	obj.castShadow = true;
	cube.material.visible = false;
	
	var loader = new THREE.FBXLoader();
	loader.load( 'models/bottle1.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.07, 0.07, 0.07);
		object.position.y = 20.1;
		cube.add(object);
		object.isBottle = true;
	} );
	
	var loader1 = new THREE.FBXLoader();
	loader1.load( 'models/bottle2.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.07, 0.07, 0.07);
		object.position.y = 20.1;
		cube.add(object);
		object.isBottle = true;
	} );
	
	var loader2 = new THREE.FBXLoader();
	loader2.load( 'models/bottle3.fbx', function ( object ) {
		var model = object;
		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		model.isCone = true;
		object.scale.set(0.07, 0.07, 0.07);
		object.position.y = 20.1;
		cube.add(object);
		object.isBottle = true;
	} );
	
	bottomBottle = obj;
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

var shuffleCones = function(obstacle1, obstacle2, bottleNo, coins)
{
	if(currentLevel == 1)
	{
		for(var i = 0; i <  obstacle2.length; i++)
		{
			obstacle2[i].children[0].children[0].rotation.z = 0;
			obstacle2[i].children[0].children[0].fallen = false;
		}
	}
	var lastCrack = false;
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
		var randA = Math.floor(Math.random() * 6) + 1;
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
					if(randZ == 0 || randZ == 1 || randZ == 2 ){
						if(currentLevel != 2){
							obstacle2[i * 3 + j].visible = false;
						}
						else
						{
							obstacle2[i].visible = false;
							lastCrack = false;
						}
					}
					else
					{
						if(lastCrack)
						{
							obstacle2[i].visible = false;
						}
						else{
							obstacle1[i * 3 + j].visible = false;
							lastCrack = true;
						}
					}
				}
			}
		}
		else
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
	
	bottleNo.visible = true;
	var a,b,c;
	if(currentLevel != 2){
		do
		{
			a = Math.floor(Math.random() * 16);
			b = Math.floor(Math.random() * 3);
			c = a * 3 + b;
		}while(obstacle1[c].visible != false || obstacle2[c].visible != false);
	}
	else
	{
		do
		{
			a = Math.floor(Math.random() * 16);
			b = Math.floor(Math.random() * 3);
			c = a * 3 + b;
		}while(obstacle1[c].visible != false || obstacle2[a].visible != false);
	}
	
	bottleNo.rotation.x = obstacle1[c].rotation.x;
	bottleNo.rotation.z = obstacle1[c].rotation.z;
	
	
	for(var  i = 0; i < bottleNo.children.length; i++)
	{
		bottleNo.children[i].isBottle = true;
	}
	
	// var k = Math.floor(Math.random() * 3);
	// if(k == 0)
	// {
		// bottleNo.visible = true;
	// }
	// else 
	// {
		// bottleNo.visible = false;
	// }
	
	for(var i = 0; i < coins.length; i++)
	{
		coins[i].visible = false;
	}
	
	for(var i = 0; i < 16; i++)
	{
		if(currentLevel != 2){
			var rx = 100;
			var vis = Math.floor(Math.random() * 5);
			do
			{
				rx = Math.floor(Math.random() * 3);
			}while(obstacle1[i * 3 + rx].visible != false || obstacle2[ i * 3 + rx].visible != false);
			
			if(vis == 0 || vis == 1){
				coins[i * 3 + rx].visible = true;
			}
			if(i + 1 < 16){
				while(obstacle1[i * 3 + rx].visible != false || obstacle2[ i * 3 + rx].visible != false)
				{
					i = i + 1;
					if(vis == 0 || vis == 1){
						coins[i * 3 + rx].visible = true;
					}
					if(i + 1 < 16){
						i = i + 1;
					}
					else{
						break;
					}
				}
			}
		}
		else{
			var rx = 100;
			var vis = Math.floor(Math.random() * 5);
			do
			{
				rx = Math.floor(Math.random() * 3);
			}while(obstacle1[i * 3 + rx].visible != false);
			
			if(vis == 0 || vis == 1){
				coins[i * 3 + rx].visible = true;
			}
			if(i + 1 < 16){
				while(obstacle1[i * 3 + rx].visible != false)
				{
					i = i + 1;
					if(vis == 0 || vis == 1){
						coins[i * 3 + rx].visible = true;
					}
					if(i + 1 < 16){
						i = i + 1;
					}
					else{
						break;
					}
				}
			}
		}
	}
	
	coins[c].visible = false;
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
				// child.receiveShadow = true;
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
				// child.receiveShadow = true;
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
			jumpNow();
		}
	}
};

var jumpNow = function()
{
	if(!jumping){
		jumpSound.isPlaying = false;
		jumpSound.play();
		player.dy = 0.2;
		jumping = true;
		boyAction.time = 3.916666;
		girlAction.time = 7.66666;
	}
};

var moveLeft = function()
{
	if(player.rotation.z != Math.PI/32 && !playerMoving){
		swipeSound.isPlaying = false;
		swipeSound.play();
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
		swipeSound.isPlaying = false;
		swipeSound.play();
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
					if(intersects[i].object.isHair)
					{
						hitByHair = true;
					}
					
					hitSound.isPlaying = false;
					hitSound.play();
					
					elapsedT = playerTime;
					// playerScore = Math.floor(timeClock.getElapsedTime ()) + (60 - elapsedT);
					timeClock.stop();
					dead = true;
					boyAction.time = 4.91666;
					girlAction.time = 8.6666;
					
					// showHideGameMenu(false);
				}
				else if(intersects[i].distance < 1 && intersects[i].object.isCoin)
				{
					playerScore += 2;
					intersects[i].object.visible = false;
					coinSound.isPlaying = false;
					coinSound.play();
				}
			}
		}
		
		if(topBottle.visible){
			raycaster.set(new THREE.Vector3(vector.x - vector.x * 0.15, yVal , 7), new THREE.Vector3( 0, 0,  -1));
			intersects = raycaster.intersectObjects(topBottle.children, true);
			
			if(intersects.length > 0)
			{
				if(intersects[0].distance < 1 && intersects[0].object.parent.isBottle)
				{
					intersects[0].object.parent.isBottle = false;
					topBottle.visible = false;
					addTime();
				}
			}
		}
		
		if(bottomBottle.visible){
			raycaster.set(new THREE.Vector3(vector.x - vector.x * 0.15, yVal , 7), new THREE.Vector3( 0, 0,  -1));
			intersects = raycaster.intersectObjects(bottomBottle.children, true);
			if(intersects.length > 0)
			{
				if(intersects[0].distance < 1 && intersects[0].object.parent.isBottle)
				{
					intersects[0].object.parent.isBottle = false;
					bottomBottle.visible = false;
					addTime();
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

var addTime = function()
{
	extraTime += 5;
	collectSound.isPlaying = false;
	collectSound.play();
	
	uiGroup.children[37].material.opacity = 0;
	var yOne = uiGroup.children[37].position.y;
	uiGroup.children[37].position.y = yOne - 0.3;
	uiGroup.children[37].visible = true;
	
	TweenMax.to(uiGroup.children[37].position,1,{ease: Back.easeOut, y:yOne,
		onComplete: function() {
			
		}
	});
	TweenMax.to(uiGroup.children[37].material,1,{ease: Back.easeOut, opacity:1,
		onComplete: function() {
			uiGroup.children[37].visible = false;
		}
	});
}

var showLevelComplete = function()
{
	uiGroup.children[44].material.opacity = 0;
	var yOne = uiGroup.children[44].position.y;
	uiGroup.children[44].position.y = yOne - 0.3;
	uiGroup.children[44].visible = true;
	
	TweenMax.to(uiGroup.children[44].position,1,{ease: Back.easeOut, y:yOne,
		onComplete: function() {
			
		}
	});
	TweenMax.to(uiGroup.children[44].material,1,{ease: Back.easeOut, opacity:1,
		onComplete: function() {
		}
	});
}

var gameOver = function()
{
	if(gameStarted){
		gameStarted = false;
		// restartButton.style.display = "block";
		jumping = false;
		timeClock.stop();
		elapsedT = 60;
		extraTime = 0;
		
		if(currentLevel == 2)
		{
			currentLevel = 0;
			playerLives = 0;
			showGameOver();
		}
		else
		{
			currentLevel++;
			showHideLevel(true, currentLevel + 1);
		}
	}
};

var gameTempOver = function()
{
	if(gameStarted){
		gameStarted = false;
		jumping = false;
		timeClock.stop();
		extraTime = 0;
		if(playerLives != 1)
		{
			if(!hitByHair){
				playerLives--;
			}
			hitByHair = false;
			removeLives(playerLives);
			collitionStarted = false;
			sphere.rotation.x = 0;
			
			player.rotation.z = 0;
			player.position.y = 0;
			dead = false;
			boyAction.time = 0;
			girlAction.time = 0;
			
			for(var i = 20; i <  40; i++)
			{
				obstacleHalfTwo[i].visible = false;
				fallenHalfTwo[i].visible = false;
				dandrufHalfTwo[i].visible = false;
			}
			for(var i = 7; i <  14; i++)
			{
				cracksHalfTwo[i].visible = false;
			}
			
			showCountDown();
		}
		else 
		{
			showHideGameMenu(false);
			showGameOver();
		}
	}
};

var update = function()
{
	if(gameStarted)
	{
		sphere.update();
		collitionDetection();
		player.update();
		if(!dead){
			playerTime = extraTime + elapsedT - Math.floor(timeClock.getElapsedTime ());
			if(playerTime <= 0)
			{
				if(currentLevel == 2)
				{
					allcomplete = true;
				}
				showHideGameMenu(false);
				tempRun = true;
				tadaSound.isPlaying = false;
				tadaSound.play();
				player.position.y = 0;
				showLevelComplete();
				gameOver();
			}
			
			tempScore = playerScore + Math.floor(timeClock.getElapsedTime ());
			
			setScore(tempScore, playerTime);
		}
		
		var a = Math.floor(timeClock.getElapsedTime () );
		
		if(!collitionStarted && a >= 0.5)
		{
			collitionStarted = true;
		}		
	}
	
	if(tempRun)
	{
		sphere.update();
	}
	
	if(modelReady && (gameStarted || tempRun))
	{
		if((!jumping && !dead) || tempRun)
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
				if(boyAction.time >= 7.7)
				{
					boyAction.time = 7.9;
					player.position.y = 0;
					gameTempOver();
				}	
			}
			else
			{
				if(girlAction.time >= 11.40)
				{
					girlAction.time = 11.60;
					player.position.y = 0;
					gameTempOver();
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

	for(var i = 0; i < topBottle.children.length; i++)
	{
		topBottle.children[i].rotation.y += 0.1;
	}
	for(var i = 0; i < bottomBottle.children.length; i++)
	{
		bottomBottle.children[i].rotation.y += 0.1;
	}
	
	for(var i = 0; i < coinHalfOne.length; i++)
	{
		coinHalfOne[i].children[0].rotation.y += 0.05;
		coinHalfTwo[i].children[0].rotation.y += 0.05;
	}
	
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
				jumpNow();
			}
		} 
	}	
	xDown = null;
	yDown = null;   
};

document.addEventListener("visibilitychange", function() {
	if( document.visibilityState == "visible")
	{
		bgSound.play();
	}
	else
	{
		bgSound.pause();
	}
});

init();