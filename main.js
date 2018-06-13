let init = (function() {

let data = [
  -1.0, 1.0, 0,
  1.0, 1.0, 0,
  1.0, -1.0, 0,
  -1.0, 1.0, 0,
  -1.0, -1.0, 0,
  1.0, -1.0, 0,
];
let gl, program;
function init() {
  gl = document.getElementById("c").getContext("webgl");
  program = gl.createProgram();

  let fs = document.getElementById("fs").text;
  let vs = document.getElementById("vs").text;

  let fshader = gl.createShader( gl.FRAGMENT_SHADER);
  let vshader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(fshader, fs);
  gl.shaderSource(vshader, vs);

  gl.compileShader(fshader);
  console.log(gl.getShaderInfoLog(fshader));
  gl.compileShader(vshader);
  console.log(gl.getShaderInfoLog(vshader));
  gl.attachShader(program, fshader);
  gl.attachShader(program, vshader);


  gl.linkProgram(program);
  console.log(gl.getProgramInfoLog(program));

  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);


  let aVertex = gl.getAttribLocation(program, "aVertex");
  gl.enableVertexAttribArray(aVertex);
  gl.vertexAttribPointer(aVertex, 3, gl.FLOAT, false, 0, 0);

  gl.linkProgram(program);
  gl.useProgram(program);

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.BIT_BUFFER | gl.COLOR_BUFFER);
  gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
return init;
})();
