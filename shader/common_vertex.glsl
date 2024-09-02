precision highp float;

uniform vec2 cellSize;

void main() {
  gl_Position = vec4(position.xy * vec2(100, 100) * 2.0 * cellSize + -.5, 0.0, 1.0);
  // gl_Position = projectionMatrix * (modelViewMatrix * vec4(position, 1.0));
}
