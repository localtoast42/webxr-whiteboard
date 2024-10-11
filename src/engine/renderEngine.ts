import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { Engine } from "./engine";
import { Entity } from "./entity";

export class RenderEngine implements Entity {
  public renderer: THREE.WebGLRenderer;
  composer: EffectComposer;

  constructor(private engine: Engine) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.engine.canvas,
      antialias: true,
    });

    this.renderer.xr.enabled = true;

    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.engine.sizes.pixelRatio, 2));

    this.composer = new EffectComposer(this.renderer);

    const renderPass = new RenderPass(
      this.engine.scene,
      this.engine.camera.instance
    );
    this.composer.addPass(renderPass);
  }

  update() {
    this.composer.render();
  }

  resize() {
    this.renderer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.composer.setSize(this.engine.sizes.width, this.engine.sizes.height);
    this.composer.render();
  }
}
