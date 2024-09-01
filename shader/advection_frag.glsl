uniform sampler2D velocity;

uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;

  vec4 target = texture2D(velocity, uv.xy); 
  gl_FragColor = vec4(target.x, target.y, 1.0, 1.0);
}
