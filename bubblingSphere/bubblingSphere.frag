
precision mediump float;

#extension GL_OES_standard_derivatives : enable
#pragma glslify: grid = require(glsl-solid-wireframe/barycentric/scaled)

varying vec3 vPos;
varying vec2 b;

void main(){
    vec3 pos = normalize(vPos);
    
    // gl_FragColor = vec4(vec3(grid(b, 1.0)), 1);
   gl_FragColor = vec4(pos, 1);
}
