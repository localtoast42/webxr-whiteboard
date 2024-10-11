import * as THREE from "three";
import { Entity } from "../engine/entity";

export class Item implements Entity {
  public instance!: THREE.Group;
  public readonly mesh!: THREE.Mesh;
  public readonly boxHelper!: THREE.BoxHelper;
  public bBox!: THREE.Box3;
  public materials!: {
    default: THREE.Material;
    hit: THREE.Material;
  };
  public isHit!: boolean;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    this.instance = new THREE.Group();
    this.materials = {
      default: material,
      hit: new THREE.MeshStandardMaterial({ color: "red" }),
    };
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.geometry.computeBoundingBox();
    this.instance.add(this.mesh);

    this.boxHelper = new THREE.BoxHelper(this.mesh, 0x00ff00);
    this.bBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.instance.add(this.boxHelper);
  }

  updateMaterial(material: THREE.Material) {
    this.mesh.material = material;
  }

  addHitStatus() {
    this.isHit = true;
  }

  checkHit(position: THREE.Vector3) {
    if (this.bBox.containsPoint(position)) {
      this.addHitStatus();
    }
  }

  setPosition(x: number, y: number, z: number) {
    this.instance.position.set(x, y, z);
  }

  update() {
    this.bBox.setFromObject(this.mesh);
    this.isHit = false;
  }
}
