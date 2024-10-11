import { Engine } from "./engine/engine";
import { Whiteboard } from "./whiteboard/whiteboard";

new Engine({
  canvas: document.querySelector("#canvas") as HTMLCanvasElement,
  experience: Whiteboard,
});
