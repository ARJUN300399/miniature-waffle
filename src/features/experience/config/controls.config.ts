import type { KeyboardControlsEntry } from '@react-three/drei';

export enum ControlAction {
  Back = 'back',
  Forward = 'forward',
  Left = 'left',
  Right = 'right',
}

export const keyboardMap: KeyboardControlsEntry<ControlAction>[] = [
  { keys: ['ArrowUp', 'KeyW'], name: ControlAction.Forward },
  { keys: ['ArrowDown', 'KeyS'], name: ControlAction.Back },
  { keys: ['ArrowLeft', 'KeyA'], name: ControlAction.Left },
  { keys: ['ArrowRight', 'KeyD'], name: ControlAction.Right },
];
