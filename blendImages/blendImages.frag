  precision mediump float;
  uniform sampler2D tex_0;
  uniform sampler2D tex_1;
  uniform sampler2D tex_2;
  uniform sampler2D tex_3;
  uniform float u_time;
  uniform float u_duration;
  varying vec2 uv;
  varying vec2 uv_position;

#define PI 3.14592


    vec2 rotate(vec2 pt, float theta, float aspect){
        float c = cos(theta);
        float s = sin(theta);
        mat2 mat = mat2(c, s, -s, c);
        pt.y /= aspect;
        pt = mat * pt;
        pt.y *= aspect;
        return pt;
    }


  float inRect(vec2 pt, vec2 bottomLeft, vec2 topRight){
    vec2 s = step(bottomLeft, pt) - step(topRight, pt);
    return s.x * s.y;
  }


  void main () {

    //   vec2 center = vec2(-1.0, 1.0);
    //   vec2 p = uv.xy / center;
    vec2 p = uv_position.xy;
      float len = length(p);
      vec2 ripple = uv + p/len * 0.1 * cos(len * 10.0 - u_time * 1.0);
    //   float delta = (((sin(u_time) + 1.0)/2.0) * u_duration)/u_duration;
      float delta = (sin(mod(u_time, u_duration) * (2.0 * PI/u_duration)) + 1.0)/2.0;
      vec2 mixUV = mix(ripple, uv, 0.01);

    vec2 center = vec2(0.5);
    vec2 rotateUV = mixUV - center;
    rotateUV = rotate(rotateUV, PI/2.0 * u_time * 0.2, 2.0/1.5);
    rotateUV += center;
      vec3 color0 = texture2D(tex_0, rotateUV).rgb;
      vec3 color1 = texture2D(tex_1, rotateUV).rgb;
      vec3 color2 = texture2D(tex_2, rotateUV).rgb;
      vec3 color3 = texture2D(tex_3, rotateUV).rgb;
      float fade = smoothstep(delta * 0.01, delta * 1.0, len * 1.1);
      vec3 color = mix(mix(color0, color1, fade * 100.0), mix(color2, color3, fade * 50.0), fade * 20.0);
      gl_FragColor = vec4(color, 1);
   // gl_FragColor = texture2D(tex, rotateUV);
  
  // if (rotateUV.x<0.0||rotateUV.x>1.0||rotateUV.y<0.0||rotateUV.y>1.0){
  //  gl_FragColor = vec4(color, 1.0);
  // }else{
  // gl_FragColor = texture2D(tex, rotateUV);
  // }

    // vec2 revUv = vec2(uv.x, 1.0 - uv.y);
    // vec2 rotate = rotate(uv, PI * 2.0);
    //gl_FragColor = texture2D(tex, rotateUV);
    
  }