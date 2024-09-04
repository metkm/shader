import { usePointer } from "@vueuse/core";
import { Vector2 } from "three";

const ratio = window.innerWidth / window.innerHeight;

export const useMouse = () => {
  const { x: _x, y: _y, ...other } = usePointer();

  const x = computed(() => (_x.value / window.innerWidth));
  const y = computed(() => 1 - _y.value / window.innerHeight);

  const coords = new Vector2(0, 0);
  const coordsOld = new Vector2(0, 0);

  const diff = new Vector2();
  const force = new Vector2();
  const center = new Vector2();

  const cellSizeX = 1 / window.innerWidth;
  const cellSizeY = 1 / window.innerHeight;

  const cSizeX = 100 * cellSizeX;
  const cSizeY = 100 * cellSizeY;

  watch([x, y], ([newX, newY], [oldX, oldY]) => {
    coords.set(newX, newY);
    coordsOld.set(oldX, oldY);

    diff.subVectors(coords, coordsOld);
    force.set(1, 1);

    // center.set(
    //   Math.min(Math.max(newX, -1 + cSizeX + cellSizeX * 2), 1 - cSizeX - cellSizeX * 2),
    //   Math.min(Math.max(newY, -1 + cSizeY + cellSizeY * 2), 1 - cSizeY - cellSizeY * 2)
    // );
  });

  return {
    x,
    y,
    coords,
    coordsOld,
    force,
    center,
    ...other,
  };
};
