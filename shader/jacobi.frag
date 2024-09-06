uniform sampler2D pressure0;
uniform sampler2D divergence;
uniform float ratio;
uniform vec2 resolution;
uniform vec2 px;

void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= ratio;

  float x0 = texture2D(pressure0, uv-vec2(px.x, 0)).r;
  float x1 = texture2D(pressure0, uv+vec2(px.x, 0)).r;
  float y0 = texture2D(pressure0, uv-vec2(0, px.y)).r;
  float y1 = texture2D(pressure0, uv+vec2(0, px.y)).r;
  float d = texture2D(divergence, uv).r;
  float relaxed = (x0 + x1 + y0 + y1 + -1.0 * d) * 0.25;

  gl_FragColor = vec4(relaxed);
}
