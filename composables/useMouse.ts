import { usePointer } from "@vueuse/core";
import { Vector2 } from "three";

const ratio = window.innerWidth / window.innerHeight;

export const useMouse = () => {
  const { x: _x, y: _y, ...other } = usePointer();

  const x = computed(() => _x.value / window.innerWidth * ratio);
  const y = computed(() => 1 - _y.value / window.innerHeight);

  const coords = new Vector2(0, 0);
  const coordsOld = new Vector2(0, 0);

  const diff = new Vector2();
  const force = new Vector2();
  const center = new Vector2();

  watch([x, y], ([newX, newY], [oldX, oldY]) => {
    coords.set(newX, newY);
    coordsOld.set(oldX, oldY);

    diff.subVectors(coords, coordsOld);
    force.set(diff.x * 20, diff.y * 20);
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
