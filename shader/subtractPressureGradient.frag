precision highp float;
uniform sampler2D pressure0;
uniform sampler2D velocity1;
uniform vec2 px;

void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= ratio;

  float x0 = texture2D(pressure0, uv-vec2(px.x, 0)).r;
  float x1 = texture2D(pressure0, uv+vec2(px.x, 0)).r;
  float y0 = texture2D(pressure0, uv-vec2(0, px.y)).r;
  float y1 = texture2D(pressure0, uv+vec2(0, px.y)).r;
  vec2 v = texture2D(velocity1, uv).xy;

  gl_FragColor = vec4((v-(vec2(x1, y1)-vec2(x0, y0))*0.5)* -1.0, 1.0, 1.0);
}
