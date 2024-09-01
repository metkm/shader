uniform sampler2D velocity;

uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv.x *= resolution.x / resolution.y;

    vec4 vel = texture2D(velocity, uv.xy); 

    vec2 uv2 = uv - vel.xy * 0.014;
    vec4 vel2 = texture2D(velocity, uv2);

    gl_FragColor = vec4(vel2.xy, 0.0, 0.0);
}
