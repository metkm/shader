precision highp float;

uniform vec2 resolution;
uniform vec2 mPosition;
uniform vec2 mForce;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= resolution.x / resolution.y;

  float d = 1.0 - min(1.0, distance(mPosition, uv));

  gl_FragColor = vec4(d * mForce, 0.0, 1.0);
}
