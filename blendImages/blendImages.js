const regl = require('regl')();
const camera = require('regl-camera')(regl, {
    distance: 0.6,
    phi: 0.7,
    theta: 1.5,
    center: [0, 0, 0],
    damping: 0,
    noScroll: true
  });
  
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
    frag: glslify('./blendImages.frag'),

    vert: glslify('./blendImages.vert'),

    attributes: {
      position: [[0, 1], [0, 0], [1, 0], [1,1]],
    },

    uniforms: {
        color: [0, 1, 1, 1],
        tex_0 : (context, props) => props.textures.tex_0,
        tex_1 : (context, props) => props.textures.tex_1,
        tex_2 : (context, props) => props.textures.tex_2,
        tex_3 : (context, props) => props.textures.tex_3,
        // tex: regl.prop('texture'),
    //   tex: (context, props) => {
    //     //   console.log(props.textures[0]);
    //       console.log(props.textures);
    //       console.log(props);
    //   },
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
          },
        crowd0: {type: 'image', src: './images/0.jpg'},
        crowd1: {type: 'image', src: './images/1.jpg'},
        crowd2: {type: 'image', src: './images/2.jpg'},
        crowd3: {type: 'image', src: './images/3.jpg'},
    },
    onDone: ({texture, crowd0, crowd1, crowd2, crowd3}) => {

      const textures = {
          tex_0: regl.texture({ data: crowd0, mag: 'linear'}),
          tex_1: regl.texture({ data: crowd1, mag: 'linear'}),
          tex_2: regl.texture({ data: crowd2, mag: 'linear'}),
          tex_3: regl.texture({ data: crowd3, mag: 'linear'}),
      } 

    //   regl.frame((context) => {
    //     camera(() => {
    //       regl.clear({color: [0.1, 0.1, 0.1, 1]});
    //       // drawBunny();
    //       triangles.forEach((triangle, count) => {
    //         const { positionData } = triangle;
    //         // console.log(positionData);
    //         drawTriangle({positionData, count});
    //       })
          
    //     });
    //   });



      regl.frame((context) => {
        camera(() => {
        regl.clear({
          color: [0.5, 0, 0, 255],
          depth: 1
        })
        drawTexture({textures})
      })
    });
    }
  })