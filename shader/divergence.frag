uniform vec2 resolution;
uniform vec2 cellSize;

uniform sampler2D force;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float left = texture2D(force, uv - vec2(cellSize.x, 0.0)).x;
  float right = texture2D(force, uv + vec2(cellSize.x, 0.0)).x;
  float top = texture2D(force, uv - vec2(0.0, cellSize.y)).y;
  float bottom = texture2D(force, uv + vec2(0.0, cellSize.y)).y;

  float divergence = ((right - left + bottom - top) / 2.0) / 0.014;

  gl_FragColor = vec4(divergence);
}
