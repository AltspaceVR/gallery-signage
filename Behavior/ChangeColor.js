import Behavior from './Behavior';

class ChangeColor extends Behavior {
  awake(o) {
    super.awake(o);

    this.o3d.addEventListener('cursordown', () => {
      this.syncData.color = Math.random() * (255 * 255 * 255);
      this.send();
    });
  }

  update(/* deltaTime */) {
    if (this.syncData.color !== this.lastColor) {
      this.lastColor = this.syncData.color;
      this.o3d.material.color = new THREE.Color(this.syncData.color);
      this.o3d.material.needsUpdate = true;
    }
  }
}

export default ChangeColor;
