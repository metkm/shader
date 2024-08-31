uniform vec2 uv;
uniform vec2 resolution;

void main() {
    vec2 texelSize = vec2(1.0, 1.0) / resolution;

    gl_FragColor = vec4(uv, 1.0, 1.0);
}
