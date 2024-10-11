import * as THREE from "three";
import { RenderEngine } from "./renderEngine";
import { RenderLoop } from "./renderLoop";
import { Sizes } from "./sizes";
import { Camera } from "./camera";
import { Experience, ExperienceConstructor } from "./experience";
import { Player } from "./player";

export class Engine {
  public readonly camera!: Camera;
  public readonly scene!: THREE.Scene;
  public readonly player!: Player;
  public readonly renderEngine!: RenderEngine;
  public readonly time!: RenderLoop;
  public readonly sizes!: Sizes;
  public readonly canvas!: HTMLCanvasElement;
  public readonly experience!: Experience;

  constructor({
    canvas,
    experience,
  }: {
    canvas: HTMLCanvasElement;
    experience: ExperienceConstructor;
  }) {
    if (!canvas) {
      throw new Error("No canvas provided");
    }

    this.canvas = canvas;
    this.sizes = new Sizes(this);

    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.renderEngine = new RenderEngine(this);

    this.player = new Player(this);
    this.player.instance.add(this.camera.instance);
    this.scene.add(this.player.instance);

    this.time = new RenderLoop(this);
    this.experience = new experience(this);

    this.experience.init();
  }

  update(delta: number) {
    this.camera.update();
    this.player.update();
    this.renderEngine.update();
    this.experience.update(delta);
  }

  resize() {
    this.camera.resize();
    this.renderEngine.resize();
    if (this.experience.resize) {
      this.experience.resize();
    }
  }

  setEnvironment(texture: THREE.Texture) {
    this.scene.environment = texture;
  }

  setBackground(
    background: THREE.Texture | THREE.Color | THREE.CubeTexture | null
  ) {
    this.scene.background = background;
  }
}
