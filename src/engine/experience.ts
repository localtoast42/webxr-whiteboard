import { Engine } from "./engine";
import { Entity } from "./entity";

export type ExperienceConstructor = new (engine: Engine) => Experience;
export interface Experience extends Entity {
  init(): void;
}
