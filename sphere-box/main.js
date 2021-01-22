const regl = require("regl")({extensions: ['oes_standard_derivatives']});
const camera = require('regl-camera')(regl, { minDistance: 1, distance: 10 });
const wireframe = require('glsl-solid-wireframe');
const ico = (require('icosphere')(3));
const cube = require('primitive-cube')(2.5,2.5,2.5,10,10,10);
const glslify = require('glslify');

const sphere = wireframe(ico);
const box = wireframe(cube);


const drawEarth  = regl({
    frag: glslify('./box.frag'),
    vert: glslify('./box.vert'),
    attributes: {
      position: box.positions,
      barycentric: box.barycentric,
    },
    uniforms: {
        sunpos: (context) => {
          const t = context.time * 0.25, r = 10
          return [Math.cos(t)*r,0,Math.sin(t)*r]
        },
        u_radius: 2.0,
        u_time: context => context.time,
      },
    elements: box.cells,
});
    
// const draw = earth(regl);

regl.frame( (context) => {
   
    camera(() => { 
        regl.clear({ color: [0,0,0,1], depth: true })
        drawEarth() 
    })
  })
  
  