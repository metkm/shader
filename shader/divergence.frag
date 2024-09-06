uniform sampler2D velocity1;
uniform float ratio;
uniform vec2 resolution;
uniform vec2 px;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= ratio;

  float x0 = texture2D(velocity1, uv-vec2(px.x, 0)).x;
  float x1 = texture2D(velocity1, uv+vec2(px.x, 0)).x;
  float y0 = texture2D(velocity1, uv-vec2(0, px.y)).y;
  float y1 = texture2D(velocity1, uv+vec2(0, px.y)).y;
  float divergence = (x1-x0 + y1-y0)*0.5;

  gl_FragColor = vec4(divergence);
}
