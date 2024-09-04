uniform sampler2D velocity0;
uniform vec2 px1;
uniform vec2 resolution;
uniform float dt;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  gl_FragColor = texture2D(velocity0, uv - texture2D(velocity0, uv).xy * dt * px1);
}
