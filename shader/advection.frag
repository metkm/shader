uniform sampler2D velocity0;
uniform float ratio;
uniform float dt;
uniform vec2 px1;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= ratio;

  gl_FragColor = texture2D(velocity0, uv - texture2D(velocity0, uv).xy * dt * px1);
}
