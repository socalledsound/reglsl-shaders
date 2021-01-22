precision mediump float;

#define PI 3.141592653589
#define PI2 6.28318530718

uniform vec3 u_LightColor;
uniform vec3 u_DarkColor;
uniform float u_Frequency;
uniform float u_NoiseScale;
uniform float u_RingScale;
uniform float u_Contrast;
uniform float u_time;

varying vec3 vPosition;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)


vec3 rotate(vec3 pt, float theta){
  float c = cos(theta);
  float s = sin(theta);
  float aspect = 2.0/1.5;
  mat3 mat = mat3(c,s,1, 
                  -s,c, 1, 
                  s,c, 1);
 
  pt = mat * pt;
  
  return pt;
}



void main(){
  vec3 rotPoints = rotate(vPosition, u_time * 0.02);
  float n = snoise3( rotPoints );
  float ring = fract( u_Frequency * vPosition.z + u_NoiseScale * n );
  ring *= u_Contrast * ( 1.0 - ring );

  // Adjust ring smoothness and shape, and add some noise
  float lerp = pow( ring, u_RingScale ) + n;
  vec3 color = mix(u_DarkColor, u_LightColor, lerp);

    // vec3 color = vec3(0.6);

  gl_FragColor = vec4(color, 1.0);
}


//   precision mediump float;
//   uniform vec4 color;
//   void main () {
//     gl_FragColor = color;
//   }



// uniform vec2 u_mouse;
// uniform vec2 u_resolution;
// uniform float u_time;
// uniform sampler2D u_tex;


// varying vec2 vUv;

// vec2 rotate(vec2 pt, float theta){
//   float c = cos(theta);
//   float s = sin(theta);
//   mat2 mat = mat2(c,s,-s,c);
//   return mat * pt;
// }

// void main (void)
// {
//   vec2 uv = vUv;
// //   vec3 color = texture2D(u_tex, uv).rgb;
//   vec3 color = vec3(0.9);
  
//   gl_FragColor = vec4(color, 1.0); 
// }