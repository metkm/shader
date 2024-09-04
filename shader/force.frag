precision highp float;

uniform vec2 mForce;
uniform vec2 mPosition;
uniform vec2 resolution;
uniform float ratio;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv.x *= ratio;
  
  float d = 0.5 - min(0.5, distance(uv, mPosition));

  gl_FragColor = vec4(d * mForce, 0.0, 1.0);
}
