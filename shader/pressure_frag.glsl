precision highp float;
uniform sampler2D pres0;
uniform sampler2D vel1;

uniform vec2 cellSize;
uniform vec2 resolution;

uniform float dt;

void main(){
    float step = 1.0;

    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.x / resolution.y;

    float p0 = texture2D(pres0, uv+vec2(cellSize.x * step, 0)).r;
    float p1 = texture2D(pres0, uv-vec2(cellSize.x * step, 0)).r;
    float p2 = texture2D(pres0, uv+vec2(0, cellSize.y * step)).r;
    float p3 = texture2D(pres0, uv-vec2(0, cellSize.y * step)).r;

    vec2 v = texture2D(vel1, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * 0.014;
    
    gl_FragColor = vec4(v, 0.0, 1.0);
}

