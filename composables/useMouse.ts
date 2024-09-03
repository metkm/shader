import { usePointer } from "@vueuse/core";
import { Vector2 } from "three";

interface UseMouseOptions {
  onChange?: (x: number, y: number) => void
}

const ratio = window.innerWidth / window.innerHeight;

export const useMouse = (options?: UseMouseOptions) => {
  const { x: _x, y: _y, ...other } = usePointer();

  const x = computed(() => (_x.value / window.innerWidth) * ratio)
  const y = computed(() => 1 - _y.value / window.innerHeight)

  const coords = new Vector2(0, 0);
  const coordsOld = new Vector2(0, 0);

  const diff = new Vector2();
  const force = new Vector2();

  const center = new Vector2();

  const cellScaleX = 1 / window.innerWidth;
  const cellScaleY = 1 / window.innerHeight;

  const cursorSizeX = 100 * cellScaleX;
  const cursorSizeY = 100 * cellScaleY;

  watch([x, y], ([newX, newY], [oldX, oldY]) => {
    coords.set(newX, newY);
    coordsOld.set(oldX, oldY);

    diff.subVectors(coords, coordsOld);
    force.set(diff.x * 20, diff.y * 20);

    center.set(
      Math.min(Math.max(newX, -1 + cursorSizeX + cellScaleX * 2), 1 - cursorSizeX - cellScaleX * 2),
      Math.min(Math.max(newY, -1 + cursorSizeY + cellScaleY * 2), 1 - cursorSizeY - cellScaleY * 2),
    )

    options?.onChange?.(newX, newY);
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
