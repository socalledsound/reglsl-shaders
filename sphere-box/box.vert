precision mediump float;
    #define PI 3.14592
      uniform mat4 projection, view;
      uniform float u_radius;
      uniform float u_time;
      attribute vec3 position;
      attribute vec2 barycentric;
      varying vec3 vPos;
      
      varying vec2 b;
      void main () {
          vPos = position;
          b = barycentric;

          float delta = (sin(u_time) + 1.0)/0.5;  
            vec3 v = normalize(position) * u_radius * -PI;
            vec3 pos = mix(position, v, delta/10.0);

        gl_Position = projection * view * vec4(pos,1);
      }