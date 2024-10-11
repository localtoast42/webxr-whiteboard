import { Engine } from "./engine";
import * as THREE from "three";

export class RenderLoop {
  private clock: THREE.Clock;
  public deltaTime: number = 16;
  public currentTime: number = 0;

  constructor(private engine: Engine) {
    this.clock = new THREE.Clock();
    this.engine.renderEngine.renderer.setAnimationLoop(() => {
      this.update();
    });
  }

  update() {
    this.deltaTime = this.clock.getDelta();
    this.currentTime = this.clock.getElapsedTime();

    this.engine.update(this.deltaTime);
  }
}
