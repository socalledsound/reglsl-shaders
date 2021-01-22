precision mediump float;
      uniform mat4 projection, view;
      attribute vec3 position;
      attribute vec2 barycentric;
      varying vec3 vPos;
      
      varying vec2 b;
      void main () {
          vPos = position;
          b = barycentric;
        gl_Position = projection * view * vec4(position,1);
      }