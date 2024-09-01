uniform sampler2D density;

uniform vec2 cellSize;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv.x *= resolution.x / resolution.y;

    vec4 left = texture2D(density, vec2(uv.x - cellSize.x, uv.y));
    vec4 right = texture2D(density, vec2(uv.x + cellSize.x, uv.y));
    vec4 top = texture2D(density, vec2(uv.x, uv.y + cellSize.y));
    vec4 bottom = texture2D(density, vec2(uv.x, uv.y -  cellSize.y));

    vec4 average = (left + right + top + bottom) / vec4(4);

    // gl_FragColor = texture2D(density, uv.xy);
    gl_FragColor = average;
}
