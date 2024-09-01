uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  uv.x *= resolution.x / resolution.y;

  float middley = step(0.50, uv.y);
  float middlex = step(0.50, uv.x);

  gl_FragColor = vec4(middlex, middley, 0.0, 1.0);
}
