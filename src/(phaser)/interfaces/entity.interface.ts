export interface IEntityFrame {
  idle: number;
  hurt: number;
}
export interface IEntitystates {
  idle: boolean;
  walk: boolean;
  hurt: boolean;
  dead: boolean;
  last: boolean;
}
export interface IEntitydirection {
  last: boolean;
  current: string;
}
export interface IEntityhealth {
  total: number;
  current: number;
}
export interface IEntityspeed {
  base: number;
  current: number;
  max: number;
}
