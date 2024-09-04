uniform vec2 px;
uniform vec2 center;

void main() {
  vec2 pos = position.xy * 100.0 * 2.0 * px + center;
  gl_Position = vec4(pos, 0.0, 1.0);
  // gl_Position = projectionMatrix * (modelViewMatrix * vec4(pos, 0.0, 1.0));
}
