import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Engine } from "./engine";
import { Entity } from "./entity";

export class Camera implements Entity {
  public instance!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  constructor(private engine: Engine) {
    this.initCamera();
    this.initControls();
  }

  private initCamera() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.instance.position.set(0, 1.6, 3);
  }

  private initControls() {
    this.controls = new OrbitControls(this.instance, this.engine.canvas);
    this.controls.target.set(0, 1.6, 0);
    this.controls.update();
  }

  resize() {
    this.instance.aspect = this.engine.sizes.aspectRatio;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
