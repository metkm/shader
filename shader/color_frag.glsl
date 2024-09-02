precision highp float;

uniform sampler2D vel0;
uniform vec2 resolution;

void main(){
  vec2 uv = gl_FragCoord.xy / resolution;

  vec2 vel = texture2D(vel0, uv).xy;
  float len = length(vel);
  vel = vel * 0.5 + 0.5;
  
  vec3 color = vec3(vel.x, vel.y, 1.0);
  color = mix(vec3(1.0), color, len);

  gl_FragColor = vec4(color,  1.0);
}
