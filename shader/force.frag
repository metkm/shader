precision highp float;

uniform vec2 force;
uniform vec2 center;
uniform vec2 resolution;
uniform vec2 mPosition;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float d = 1.0 - min(1.0, distance(uv, mPosition));
  float res = d * force.x;

  gl_FragColor = vec4(0.0, res, 0.0, 1.0);
}
