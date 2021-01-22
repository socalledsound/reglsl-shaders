  precision mediump float;
  attribute vec2 position;
  varying vec2 uv;
  varying vec2 uv_position;
  void main () {
    uv = vec2(position);  
    uv_position = vec2(1.0 - 2.0 * position);
      //gl_Position = vec4( position, 0, 1 );
      gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
  }