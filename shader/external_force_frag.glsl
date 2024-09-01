uniform vec2 m_position;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv.x *= resolution.x / resolution.y;

    float d_to_uv = distance(m_position, uv);

    gl_FragColor = vec4(0.0, d_to_uv, 0.0, 1.0);
}

