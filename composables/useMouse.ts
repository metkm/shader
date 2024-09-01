import { usePointer } from "@vueuse/core";
import { Vector2 } from "three";

export const useMouse = () => {
  const { x: _x, y: _y, ...other } = usePointer();

  const x = computed(() => _x.value / window.innerWidth * 2 - 1)
  const y = computed(() => _y.value / window.innerHeight * 2 - 1)

  const coords = new Vector2(0, 0);
  const coordsOld = new Vector2(0, 0);

  const diff = new Vector2();
  const force = new Vector2();

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
    ...other,
  };
};
