import { usePointer } from "@vueuse/core";
import { Vector2 } from "three";

interface UseMouseOptions {
  onChange?: (x: number, y: number) => void
}

export const useMouse = (options?: UseMouseOptions) => {
  const { x: _x, y: _y, ...other } = usePointer();

  const x = computed(() => (_x.value / window.innerWidth))
  const y = computed(() => 1 - _y.value / window.innerHeight)

  const coords = new Vector2(0, 0);
  const coordsOld = new Vector2(0, 0);

  const diff = new Vector2();
  const force = new Vector2();

  watch([x, y], ([newX, newY], [oldX, oldY]) => {
    coords.set(newX, newY);
    coordsOld.set(oldX, oldY);

    diff.subVectors(coords, coordsOld);
    force.set(diff.x * 20, diff.y * 20);

    options?.onChange?.(newX, newY)
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
