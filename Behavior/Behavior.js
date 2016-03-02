class Behavior {
  awake(o) {
    this.o3d = o;
    this.syncData = this.o3d.userData.syncData;
  }

  send() {
    // Behavior could be added later
    this.o3d.getBehaviorByType('Object3DSync').enqueueSend();
  }
}

export default Behavior;
