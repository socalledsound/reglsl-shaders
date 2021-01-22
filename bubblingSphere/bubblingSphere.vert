precision mediump float;


#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d) 

uniform mat4 projection, view;
uniform float u_time;
attribute vec3 position, normal;
attribute vec2 barycentric;
varying vec3 vPos;
varying vec2 b;
varying float v_noise;

	float turbulence( vec3 p ) {
	  float w = 100.0;
	  float t = -.5;

	  for (float f = 1.0 ; f <= 10.0 ; f++ ){
		float power = pow( 2.0, f );
		t += abs( pnoise3( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
	  }

	  return t;
	}



void main(){
    vPos = position;
    b = barycentric;
    v_noise = 1.0 * -0.1 * turbulence(0.5 * normal) * sin(u_time);
    float db = 5.0 * pnoise3(0.05 * position, vec3(100.0));
    float displacement = db - 10.0 * v_noise;
    vec3 pos = position + normal * displacement;

    gl_Position = projection * view  * vec4(pos, 0.1);
}
