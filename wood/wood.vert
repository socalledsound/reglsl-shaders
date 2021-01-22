
//   precision mediump float;
//   attribute vec2 position;
//   void main () {
//     gl_Position = vec4(position, 0, 1);
//   }

precision mediump float;
attribute vec3 position;
uniform mat4 projection, view;
uniform float u_time;
varying vec3 vPosition;


vec3 rotate(vec3 pt, float theta){
  float c = cos(theta);
  float s = sin(theta);
  float aspect = 2.0/1.5;
  mat3 mat = mat3(2.0,      s,   1.5, 
                  -s * 2.0, 1.0, 5.0, 
                  1.0,      c, 2.0);
 
  pt = mat * pt;
  
  return pt;
}




void main() {	
  vPosition = position;
  vec3 newPosition = position - vec3(1.0);
   newPosition = rotate(newPosition, u_time * 0.3);
   newPosition += vec3(1.0);
  gl_Position = projection * view * vec4( newPosition, 1 );
}