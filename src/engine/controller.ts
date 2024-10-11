import * as THREE from "three";
import { GamepadWrapper } from "gamepad-wrapper";
import {
  XRControllerModel,
  XRControllerModelFactory,
} from "three/addons/webxr/XRControllerModelFactory.js";
import { Entity } from "./entity";
import { Player } from "./player";

export class Controller implements Entity {
  public readonly raySpace!: THREE.XRTargetRaySpace;
  public readonly gripSpace!: THREE.XRGripSpace;
  private mesh!: XRControllerModel;
  private gamepad!: GamepadWrapper;

  constructor(
    private player: Player,
    webXRManager: THREE.WebXRManager,
    index: number
  ) {
    this.raySpace = webXRManager.getController(index);
    this.gripSpace = webXRManager.getControllerGrip(index);

    const controllerModelFactory = new XRControllerModelFactory();
    this.mesh = controllerModelFactory.createControllerModel(this.gripSpace);
    this.gripSpace.add(this.mesh);

    this.raySpace.visible = false;
    this.gripSpace.visible = false;

    this.gripSpace.addEventListener("connected", (e) => {
      this.raySpace.visible = true;
      this.gripSpace.visible = true;
      this.player.addController(this, e.data.handedness);
    });

    this.gripSpace.addEventListener("disconnected", (e) => {
      this.raySpace.visible = false;
      this.gripSpace.visible = false;
      this.player.removeController(e.data.handedness);
    });
  }

  update() {
    this.gamepad.update();
  }
}
