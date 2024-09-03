uniform vec2 resolution;
uniform vec2 cellSize;

uniform sampler2D divergence;
uniform sampler2D poission0;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float left = texture2D(poission0, uv - vec2(cellSize.x * 2.0, 0.0)).r;
  float right = texture2D(poission0, uv + vec2(cellSize.x * 2.0, 0.0)).r;
  float top = texture2D(poission0, uv - vec2(0.0, cellSize.y * 2.0)).r;
  float bottom = texture2D(poission0, uv + vec2(0.0, cellSize.y * 2.0)).r;

  float div = texture2D(divergence, uv).r;

  float new = (left + right + top + bottom) / 4.0 - div;

  gl_FragColor = vec4(new);
}
