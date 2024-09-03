uniform sampler2D velocity0;

uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float ratio = resolution.x / resolution.y;
  
  vec2 spot_new = uv;
  vec2 vel_old = texture2D(velocity0, uv).xy;
  // back trace
  vec2 spot_old = spot_new - vel_old * 0.014 * ratio;
  vec2 vel_new1 = texture2D(velocity0, spot_old).xy;

  // forward trace
  vec2 spot_new2 = spot_old + vel_new1 * 0.014 * ratio;
  
  vec2 error = spot_new2 - spot_new;

  vec2 spot_new3 = spot_new - error / 2.0;
  vec2 vel_2 = texture2D(velocity0, spot_new3).xy;

  // back trace 2
  vec2 spot_old2 = spot_new3 - vel_2 * 0.014 * ratio;
  // gl_FragColor = vec4(spot_old2, 0.0, 0.0);
  vec2 newVel2 = texture2D(velocity0, spot_old2).xy; 
  gl_FragColor = vec4(newVel2, 0.0, 0.0);

  // vec2 uv = gl_FragCoord.xy / resolution.xy;

  // vec2 vel = texture2D(velocity0, uv).xy;
  // vec2 uv2 = uv - vel * 0.014;
  // vec2 newVel = texture2D(velocity0, uv2).xy;
  
  // gl_FragColor = vec4(newVel, 0.0, 0.0);
}
