import * as THREE from "three";
import { Engine } from "./engine";
import { Entity } from "./entity";

export class RenderEngine implements Entity {
  public renderer: THREE.WebGLRenderer;

  constructor(private engine: Engine) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.engine.canvas,
      antialias: true,
    });

    this.renderer.xr.enabled = true;

    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.engine.sizes.pixelRatio, 2));
  }

  update() {
    this.renderer.render(this.engine.scene, this.engine.camera.instance);
  }

  resize() {
    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.update();
  }
}
