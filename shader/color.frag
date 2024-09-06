uniform sampler2D velocity0;
uniform sampler2D pressure0;
uniform float ratio;
uniform vec2 resolution;

void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= ratio;

  gl_FragColor = vec4(
    (texture2D(pressure0, uv)).x,
    (texture2D(velocity0, uv)*1.5+0.5).xy,
  1.0);
}
