precision highp float;

uniform vec2 center;
uniform vec2 cellSize;

void main() {
  vec2 pos = position.xy * 100.0 * 2.0 * cellSize + center;
  gl_Position = vec4(pos, 0.0, 1.0);
}
