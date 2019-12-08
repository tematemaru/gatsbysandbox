export const fragment = `
  precision highp float;

  varying vec3 vPosition;
  varying float vDelay;

  uniform sampler2D dot;
  uniform sampler2D glow;
  uniform float time;
  uniform float blend;
  uniform vec2 resolution;

  void main() {
    float difftime = time - vDelay;
    float d = clamp(0., 1., difftime);
    float l = 1. - length(vPosition) / (resolution.x / 2.);

    vec4 texture = texture2D(dot, gl_PointCoord);
    vec4 glow = texture2D( glow, gl_PointCoord );
    // clamp(0., 0.5, blend)
    // if (vDelay != 0.) {
      gl_FragColor = texture * vec4(1., 1., 1.5, 0.1) + glow * vec4(0.5, 0.5, 0.5, 0.8);
    // } else {
      // gl_FragColor = vec4(0, 0., 0., 0.);
    // }
 
    // gl_FragColor = vec4(1., 1., 1., clamp(0., 0.5, blend)) * texture;
    // gl_FragColor = vec4(l, 0., 0., 1.);
  }
`;
