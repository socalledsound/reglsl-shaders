  precision mediump float;
  uniform sampler2D tex;
  uniform float u_time;
  varying vec2 uv;

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
    //   gl_FragColor = color;
    vec2 center = vec2(0.5);
  vec2 rotateUV = uv - center;
  rotateUV = rotate(rotateUV, PI/2.0 * u_time * 0.2, 2.0/1.5);
  rotateUV += vec2(0.5);

  vec3 texel = texture2D(tex, rotateUV).rgb;
  vec3 bg = vec3(0.0);
  float t = inRect(uv, vec2(0.0), vec2(1.0));
  vec3 color = mix(bg, texel, t);
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