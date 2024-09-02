precision highp float;

uniform sampler2D pres0;
uniform vec2 resolution;

// uniform sampler2D divergence;
uniform vec2 cellSize;

void main(){
  vec2 uv = gl_FragCoord.xy / resolution;
 

  // poisson equation
  float p0 = texture2D(pres0, uv+vec2(cellSize.x * 2.0,  0)).r;
  float p1 = texture2D(pres0, uv-vec2(cellSize.x * 2.0, 0)).r;
  float p2 = texture2D(pres0, uv+vec2(0, cellSize.y * 2.0 )).r;
  float p3 = texture2D(pres0, uv-vec2(0, cellSize.y * 2.0 )).r;
  // float div = texture2D(divergence, uv).r;
  
  float newP = (p0 + p1 + p2 + p3) / 4.0;
  gl_FragColor = vec4(newP);
}
