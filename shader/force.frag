precision highp float;

uniform vec2 mForce;
uniform vec2 mPosition;
uniform vec2 resolution;
uniform float ratio;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= ratio;
  
  float d = 1.0 - min(1.0, distance(uv, mPosition));

  gl_FragColor = vec4(d * mForce, 0.0, 1.0);
}
