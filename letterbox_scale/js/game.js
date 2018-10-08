var aspectRatio = 9/16;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, 9/16, 0.1, 1000);

var container = document.getElementById('game');

document.body.appendChild(container);

var renderer = new THREE.WebGLRenderer();

setSize();

container.appendChild(renderer.domElement);


var geometry = new THREE.BoxGeometry(1,1,1);
var boxMat =  new THREE.MeshBasicMaterial({color: 0xff4433});
var cube = new THREE.Mesh(geometry, boxMat);
scene.add(cube);

camera.position.z = 5;

function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

//Change the size of the renderer based on the resize
window.addEventListener('resize', setSize, true);

//Set renderer size
function setSize(){
    if(window.innerWidth/window.innerHeight > aspectRatio){
        renderer.setSize(window.innerHeight * aspectRatio, window.innerHeight);
    }else{
        renderer.setSize(window.innerWidth, window.innerWidth/aspectRatio);
    }
}