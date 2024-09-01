uniform vec2 resolution;
uniform vec2 mPosition;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution * 2.0 - 1.0;
  uv.x *= resolution.x / resolution.y;

  float d = 1.0 - distance(uv, mPosition);

  gl_FragColor = vec4(d, 1.0, 1.0, 1.0);
}
