varying vec2 v_uv;

precision highp float;

void main() {
  // v_uv = uv;
  gl_Position = projectionMatrix * (modelViewMatrix * vec4(position, 1.0));
}

