import Cube from './Entity/Cube';
import MyImage from './Entity/Image';

const sim = altspace.utilities.Simulation();
const instanceBase = altspace.utilities.sync.getInstance({
  authorId: 'Bobo'
});

const sceneSync = altspace.utilities.behaviors.SceneSync(instanceBase, {
  instantiators: {
    Cube: () => {
      const cube = new Cube();
      sim.scene.add(cube);
      return cube;
    },
  },

  ready(firstInstance) {
    if (firstInstance) {
      // sceneSync.instantiate('Cube');
    }
  }
});


sim.scene.addBehavior(sceneSync);

// JFS
const getParameterByName = function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const tpImages = {
  'pascal' : 'Images/pascal-portal.jpg',
  'brent' : 'Images/brent-portal.jpg',
  'caiphus' : 'Images/caiphus-portal.png',
  'landing' : 'Images/landing-portal.png'
}

const statements = {
  'pascal' : 'Images/pascal-statement.png',
  'brent' : 'Images/brent-statement.png',
  'caiphus' : 'Images/caiphus-statement.png'
}

// Assumes InWorldBrowser is set w/
//   position: 0 0 0
//   rotation: 0 0 0
//   scale: 60 60 60
// Also assumes image will have initial scale 1 1 1
const images = {
  'left portal' : {
    url: tpImages[getParameterByName('left')],
    pos: new THREE.Vector3(-334.8, 62.8, 103),
    rot: new THREE.Euler(0, Math.PI / 2, 0),
    scale: new THREE.Vector3(0.317, 0.317, 0.02)
  },
  'center portal' : {
    url: tpImages[getParameterByName('center')],
    pos: new THREE.Vector3(-334.8, 62.8, 48.1),
    rot: new THREE.Euler(0, Math.PI / 2, 0),
    scale: new THREE.Vector3(0.317, 0.317, 0.02)
  },
  'right portal' : {
    url: tpImages[getParameterByName('right')],
    pos: new THREE.Vector3(-334.8, 62.8, -3),
    rot: new THREE.Euler(0, Math.PI / 2, 0),
    scale: new THREE.Vector3(0.317, 0.317, 0.02)
  },
  'artist statement' : {
    url: statements[getParameterByName('statement')],
    pos: new THREE.Vector3(-178.4, 70.5, 3.5),
    rot: new THREE.Euler(0, 3 * Math.PI / 2, 0),
    scale: new THREE.Vector3(0.66189, 0.37231, 0.018034),
  }
}

function* entries(obj){
  for (let key of Object.keys(obj)){
    yield [key, obj[key]];
  }
}

const placeholder = 'Images/hk.png';
for (let image of entries(images)){
  const data = image[1];
  const img = new MyImage(data.url || placeholder);
  img.position.copy(data.pos);
  img.rotation.copy(data.rot);
  img.scale.copy(data.scale);
  sim.scene.add(img);
}
