      #extension GL_OES_standard_derivatives : enable
      precision mediump float;
        varying vec3 vPos;
        #pragma glslify: atmosphere = require('glsl-atmosphere')
        #pragma glslify: grid = require(glsl-solid-wireframe/barycentric/scaled)
        varying vec2 b;
        uniform vec3 eye, sunpos;
        void main () {
            vec3 pos = normalize(vPos);
            vec3 vscatter = atmosphere(
                eye-pos, // ray direction
                pos*6372e3, // ray origin
                sunpos, // sun position
                22.0, // sun intensity
                6372e3, // planet radius (m)
                6472e3, // atmosphere radius (m)
                vec3(5.5e-6,13.0e-6,22.4e-6), // rayleigh scattering
                21e-6, // mie scattering
                8e3, // rayleight scale height
                1.2e3, // mie scale height
                0.758 //  mie scattering direction
              );


        gl_FragColor = vec4(vec3(grid(b, 1.0)), 1);
      }