const regl = require("regl")({
  pixelRatio: Math.min(window.devicePixelRatio, 1.5),
  attributes: {
    antialias: false,
    stencil: false,
    alpha: false,
    depth: true
  }
});

const camera = require('regl-camera')(regl, {
  distance: 10,
  phi: 0.7,
  theta: 1.5,
  center: [0, 0, 0],
  damping: 0,
  noScroll: true
});

const glslify = require('glslify');

const numTriangles = 500;
const minA = -3.0;
const maxA = 3.0;
const minB = -2.0;
const maxB = 2.0;
const minC = -3.5;
const maxC = 3.5;
// -1.0,0.5,-0.5,0.8,-0.5,0.1


const drawTriangle = regl({
  // fragment shader
  frag: glslify('./wood.frag'),

  // vertex shader
  vert: glslify('./wood.vert'),

  // attributes
  attributes: {
    position: (context, props) => props.positionData,
    // position: [[-1, 0, 0], [0, -1, 0], [1, 1, 0]]
  },



  // uniforms
  uniforms: {
    u_LightColor: [0.6, 0, 0.6],
    u_DarkColor: [0, 1, 1],
    u_time : (context, props) => context.time * props.count/numTriangles,
    u_resolution: [0,0],
    // uniforms.u_LightColor = { value: new THREE.Color(0xbb905d) };
    // uniforms.u_DarkColor = { value: new THREE.Color(0x7d490b) };
    u_Frequency: 2.0,
    u_NoiseScale : 6.0,
    u_RingScale: 0.6,
    u_Contrast: 4.0,



  },

  // vertex count
  count: 3
});



// const triangles = [
//   {
//     positionData: [[-1, 0, 0], [0, -1, 0], [1, 1, 0]]
//   },
//   {
//     positionData: [[-0.1, -2, 0], [-1, 0.5, 0], [0, 1, 0]]
//   }
// ];


function generatePoint(min, max){
  return Math.random() * (max-min + 1) + min
}

function createPoints(minA, maxA, minB, maxB, minC, maxC){
  const points = [];
  for(let i = 0; i < 3; i++){
    points.push([generatePoint(minA, maxA), generatePoint(minB, maxB), generatePoint(minC,maxC)])
  }
  return points
}


function createTriangleData(numTriangles){
  

  
  const arr = Array.from({ length: numTriangles}, (item) => ({positionData: createPoints(minA, maxA, minB, maxB, minC, maxC) }));
  // console.log(arr);

  return arr

}

const triangles = createTriangleData(numTriangles);
console.log(triangles);

regl.frame((context) => {
  camera(() => {
    regl.clear({color: [0.1, 0.1, 0.1, 1]});
    // drawBunny();
    triangles.forEach((triangle, count) => {
      const { positionData } = triangle;
      // console.log(positionData);
      drawTriangle({positionData, count});
    })
    
  });
});


