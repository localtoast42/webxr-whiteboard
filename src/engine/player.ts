import * as THREE from "three";
import { Engine } from "./engine";
import { Entity } from "./entity";
import { Controller } from "./controller";

export class Player implements Entity {
  public instance!: THREE.Group;
  private controllers!: {
    left: Controller | null;
    right: Controller | null;
    none: Controller | null;
  };

  constructor(private engine: Engine) {
    this.instance = new THREE.Group();
    this.controllers = {
      left: null,
      right: null,
      none: null,
    };
    this.initControllers();
  }

  private initControllers() {
    for (let i = 0; i < 2; i++) {
      let controller = new Controller(
        this,
        this.engine.renderEngine.renderer.xr,
        i
      );
      this.instance.add(controller.raySpace, controller.gripSpace);
    }
  }

  addController(controller: Controller, handedness: XRHandedness) {
    this.controllers[handedness] = controller;
  }

  removeController(handedness: XRHandedness) {
    this.controllers[handedness] = null;
  }

  update() {
    Object.values(this.controllers).forEach((controller) => {
      if (controller) {
        controller.update();
      }
    });
  }
}
