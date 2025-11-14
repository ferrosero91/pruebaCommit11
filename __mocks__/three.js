class WebGLRenderer {
  constructor() {
    // eslint-disable-next-line no-undef
    this.domElement = global.document.createElement('canvas');
    this.shadowMap = { enabled: false, type: 0 };
  }
  setSize() {}
  render() {}
  dispose() {}
}

class Scene {
  add() {}
}

class PerspectiveCamera {
  constructor() {
    this.position = { set: () => {} };
  }
}

class AmbientLight {}

class DirectionalLight {
  constructor() {
    this.position = { set: () => {} };
    this.shadow = { mapSize: { width: 0, height: 0 } };
  }
}

class PointLight {
  constructor() {
    this.position = { set: () => {} };
  }
}

class BoxGeometry {}
class ConeGeometry {}
class CylinderGeometry {}
class SphereGeometry {}
class MeshStandardMaterial {}

class Mesh {
  constructor() {
    this.rotation = { x: 0, y: 0, z: 0 };
    this.position = { set: () => {} };
    this.castShadow = false;
    this.receiveShadow = false;
  }
}

class Color {
  constructor(value) {
    this.value = value;
  }
}

const PCFShadowMap = 1;

// eslint-disable-next-line no-undef
global.module = global.module || { exports: {} };

// eslint-disable-next-line no-undef
module.exports = {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  PointLight,
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  Color,
  PCFShadowMap
};
