uniform vec2 resolution;
uniform vec2 mPosition;
uniform vec2 force;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 circle = (uv - 0.5) * 2.0;

  float d = 1.0 - min(1.0, length(circle));

  gl_FragColor = vec4(d * force, 1.0, 1.0);
}
