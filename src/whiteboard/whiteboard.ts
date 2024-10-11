import * as THREE from "three";
import { XRButton } from "three/addons/webxr/XRButton.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { XR_BUTTONS } from "gamepad-wrapper";
import { Engine } from "../engine/engine";
import { Experience } from "../engine/experience";
import { Item } from "./item";

export class Whiteboard implements Experience {
  items: Item[] = [];

  constructor(private engine: Engine) {
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(
      this.engine.renderEngine.renderer
    );

    this.engine.setEnvironment(pmremGenerator.fromScene(environment).texture);
    this.engine.setBackground(new THREE.Color(0x808080));

    document.body.appendChild(
      XRButton.createButton(this.engine.renderEngine.renderer)
    );
  }

  init() {
    const defaultMaterial = new THREE.MeshStandardMaterial({ color: "green" });

    const icosahedron = new Item(
      new THREE.IcosahedronGeometry(0.5, 2),
      defaultMaterial
    );

    icosahedron.setPosition(1.0, 0.5, 0);
    this.items.push(icosahedron);

    this.engine.scene.add(icosahedron.instance);
  }

  resize() {}

  update() {
    const controllers = this.engine.player.getControllers();

    if (controllers.right) {
      const { gripSpace, gamepad } = controllers.right;
      const squeeze = gamepad.getButton(XR_BUTTONS.SQUEEZE);

      this.items.forEach((item) => {
        item.update();

        if (squeeze) {
          item.checkHit(gripSpace.position);
          if (item.isHit) {
            item.updateMaterial(item.materials.hit);
          } else {
            item.updateMaterial(item.materials.default);
          }
        } else {
          item.updateMaterial(item.materials.default);
        }
      });
    }
  }
}
