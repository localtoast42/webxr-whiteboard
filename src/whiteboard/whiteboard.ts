import * as THREE from "three";
import { XRButton } from "three/addons/webxr/XRButton.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { Engine } from "../engine/engine";
import { Experience } from "../engine/experience";

export class Whiteboard implements Experience {
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

    const icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 2),
      defaultMaterial
    );

    icosahedron.position.set(1.0, 0.5, 0);

    this.engine.scene.add(icosahedron);
  }

  resize() {}

  update() {}
}
