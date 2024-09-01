uniform sampler2D velocity;

uniform vec2 m_position;
uniform vec2 resolution;

void main() {
    // We add offset etc because we need to get the center as 0.0, This is not needed on other fragments that use this velocity texture
    vec2 uv = gl_FragCoord.xy / resolution * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;

    float d_to_uv = distance(m_position, uv);

    gl_FragColor = vec4(0.0, d_to_uv, 0.0, 1.0);
}

