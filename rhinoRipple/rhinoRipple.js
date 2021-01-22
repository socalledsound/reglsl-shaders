const regl = require('regl')();
const glslify = require('glslify');
// const boids = require('./boids.jpeg');


// function loadImage(url){
//     return new Promise(resolve => {
//         const img = new Image();
//         img.crossOrigin = "anonymous";
//         img.onload = () => resolve(img);
//         img.src = url;
//       })
// }

// const image = loadImage('./sa1.jpg').then((img)=>{
    
// })


const drawTexture = regl({
    frag: glslify('./rhinoRipple.frag'),

    vert: glslify('./rhinoRipple.vert'),

    attributes: {
      position: [[0, 1], [0, 0], [1, 0], [1,1]],
    },

    uniforms: {
        color: [0, 1, 1, 1],
      tex: regl.prop('texture'),
      u_time: (context)=> context.time,
      u_duration: 8.0,
    },

    count: 4,
    primitive: 'triangle fan',
  });


//   regl.frame(() => {
//     console.log(image);
//     drawTexture();
//   });

  require('resl')({
    manifest: {
      texture: {
        type: 'image',
        src: './rhino/sa1.jpg',
        parser: (data) => regl.texture({
          data: data,
          mag: 'linear',
          min: 'linear'
        })
      }
    },
    onDone: ({texture}) => {
      regl.frame((context) => {
        regl.clear({
          color: [0.5, 0, 0, 255],
          depth: 1
        })
        drawTexture({texture})
      })
    }
  })