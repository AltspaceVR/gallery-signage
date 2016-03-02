// location.href = "http://192.168.1.18:8007/index.html";
class MyImage extends THREE.Mesh {
  constructor(url) {
    super(
      new THREE.BoxGeometry(100, 100, 100),
      new THREE.MeshBasicMaterial()
    );

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    loader.load(url, (loaded) => {
      const texture = loaded;

      texture.minFilter = THREE.LinearFilter;
      this.material.map = texture;
      this.material.needsUpdate = true;
    });
  }
}

export default MyImage;
