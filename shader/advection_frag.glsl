uniform sampler2D vel0;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float ratio = resolution.x / resolution.y;
  uv.x *= ratio;

  vec2 vel = texture2D(vel0, uv).xy;
  vec2 uv2 = uv - vel * 0.014 * ratio;
  vec2 newVel = texture2D(vel0, uv2).xy;
  
  gl_FragColor = vec4(newVel, 0.0, 0.0);
}
