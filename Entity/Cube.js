import ChangeColor from '../Behavior/ChangeColor';

class Cube extends THREE.Mesh {
  constructor() {
    super(
        new THREE.BoxGeometry(50, 50, 50),
        new THREE.MeshBasicMaterial({ color: '#ffffff' })
    );

    this.addBehaviors(
        altspace.utilities.behaviors.Object3DSync({ syncData: true }),
        altspace.utilities.behaviors.Spin({ speed: 0.0005 }),
        new ChangeColor()
    );
  }
}

export default Cube;
