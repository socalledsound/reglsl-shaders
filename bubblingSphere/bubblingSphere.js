const regl = require('regl')({extensions: ['oes_standard_derivatives']});
const camera = require('regl-camera')(regl, {
    distance: 1,
    phi: 0.7,
    theta: 1.5,
    center: [0, 0, 0],
    damping: 0,
    noScroll: true
})
const normals = require('angle-normals');
const glslify = require('glslify');
const icosphere = require('icosphere')(3);
const wireframe = require('glsl-solid-wireframe');
const sphere = wireframe(icosphere);
const bunny = require('bunny');
const mat4 = require('gl-mat4');

// console.log(sphere.barycentric);
// console.log(sphere.cells, sphere.positions);

const drawSphere = regl({

    frag: glslify('./bubblingSphere.frag'),
    vert: glslify('./bubblingSphere.vert'),
    attributes: {
        position: icosphere.positions,
        barycentric: sphere.barycentric,
        normal: normals(icosphere.cells, icosphere.positions),
    },
    uniforms: {
        view: ({tick}) => {
            const t = 0.01 * tick
            return mat4.lookAt([2.0,2.0,2.0],
              [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
              [1, 2.5, 1],
              [0,1,0])
          },
        u_time: context => context.time,
    },
    elements: icosphere.cells,


})

regl.frame((context) => {
    camera(() => {
        regl.clear({color: [0.1,0.1,0.6]});
        drawSphere();
    })
})