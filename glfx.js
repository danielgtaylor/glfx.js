/*
 * glfx.js
 * http://evanw.github.com/glfx.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var fx=function(){function w(b){return{_:p.fromImage(b)}}function x(b,c){this._.texture&&this._.texture.destroy();this._.spareTexture&&this._.spareTexture.destroy();this.width=b;this.height=c;this._.texture=new p(b,c,a.RGBA,a.UNSIGNED_BYTE);this._.spareTexture=new p(b,c,a.RGBA,a.UNSIGNED_BYTE);this._.flippedShader=this._.flippedShader||new n(null,"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");
this._.isInitialized=true}function y(b){if(!this._.isInitialized||b._.width!=this.width||b._.height!=this.height)x.call(this,b._.width,b._.height);this._.texture.drawTo(function(){b._.use();n.getDefaultShader().drawRect()});return this}function z(){this._.texture.use();this._.flippedShader.uniforms({texSize:[this._.texture.width,this._.texture.height]}).drawRect();return this}function m(b,c){var i=this._.texture;this._.spareTexture.drawTo(function(){i.use();b.uniforms(c).drawRect()});this._.spareTexture.swapWith(i)}
function A(b){b.parentNode.insertBefore(this,b);b.parentNode.removeChild(b);return this}function l(b){return function(){a=this._.gl;return b.apply(this,arguments)}}function r(b,c,i,h,d,e,f,g){var j=i-d,k=h-e,o=f-d,s=g-e;d=b-i+d-f;e=c-h+e-g;var t=j*s-o*k;o=(d*s-o*e)/t;j=(j*e-d*k)/t;return[i-b+o*i,h-c+o*h,o,f-b+j*f,g-c+j*g,j,b,c,1]}function u(b){var c=b[0],i=b[1],h=b[2],d=b[3],e=b[4],f=b[5],g=b[6],j=b[7];b=b[8];var k=c*e*b-c*f*j-i*d*b+i*f*g+h*d*j-h*e*g;return[(e*b-f*j)/k,(h*j-i*b)/k,(i*f-h*e)/k,(f*
g-d*b)/k,(c*b-h*g)/k,(h*d-c*f)/k,(d*j-e*g)/k,(i*g-c*j)/k,(c*e-i*d)/k]}function B(b,c){return[b[0]*c[0]+b[1]*c[3]+b[2]*c[6],b[0]*c[1]+b[1]*c[4]+b[2]*c[7],b[0]*c[2]+b[1]*c[5]+b[2]*c[8],b[3]*c[0]+b[4]*c[3]+b[5]*c[6],b[3]*c[1]+b[4]*c[4]+b[5]*c[7],b[3]*c[2]+b[4]*c[5]+b[5]*c[8],b[6]*c[0]+b[7]*c[3]+b[8]*c[6],b[6]*c[1]+b[7]*c[4]+b[8]*c[7],b[6]*c[2]+b[7]*c[5]+b[8]*c[8]]}function C(b,c){a.brightnessContrast=a.brightnessContrast||new n(null,"uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec3 color=texture2D(texture,texCoord).rgb;color+=brightness;if(contrast>0.0){color=(color-0.5)/(1.0-contrast)+0.5;}else{color=(color-0.5)*(1.0+contrast)+0.5;}gl_FragColor=vec4(color,1.0);}");
m.call(this,a.brightnessContrast,{brightness:Math.max(-1,Math.min(b,1)),contrast:Math.max(-1,Math.min(c,1))});return this}function D(b,c){a.hueSaturation=a.hueSaturation||new n(null,"uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec3 color=texture2D(texture,texCoord).rgb;float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color);color=vec3(dot(color,weights.xyz),dot(color,weights.zxy),dot(color,weights.yzx));float average=(color.x+color.y+color.z)/3.0;if(saturation>0.0){color+=(average-color)*(1.0-1.0/(1.0-saturation));}else{color+=(average-color)*(-saturation);}gl_FragColor=vec4(color,1.0);}");
m.call(this,a.hueSaturation,{hue:Math.max(-1,Math.min(b,1)),saturation:Math.max(-1,Math.min(c,1))});return this}function E(b,c,i,h){a.colorHalftone=a.colorHalftone||new n(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec3 color=texture2D(texture,texCoord).rgb;vec3 cmy=1.0-color;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,1.0);}");
m.call(this,a.colorHalftone,{center:[b,c],angle:i,scale:Math.PI/h,texSize:[this.width,this.height]});return this}function F(b,c,i,h){a.dotScreen=a.dotScreen||new n(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec3 color=texture2D(texture,texCoord).rgb;float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),1.0);}");
m.call(this,a.dotScreen,{center:[b,c],angle:i,scale:Math.PI/h,texSize:[this.width,this.height]});return this}function G(b){a.ink=a.ink||new n(null,"uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec3 color=texture2D(texture,texCoord).rgb;float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color-dot(edge,edge)*strength*100000.0,1.0);}");
m.call(this,a.ink,{strength:b*b*b*b*b,texSize:[this.width,this.height]});return this}function H(b,c,i,h,d,e){a.tiltShift=a.tiltShift||new n(null,"uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}void main(){vec3 color=vec3(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);color+=texture2D(texture,texCoord+delta/texSize*percent*radius).rgb*weight;total+=weight;}gl_FragColor=vec4(color/total,1.0);}");
var f=i-b,g=h-c,j=Math.sqrt(f*f+g*g);m.call(this,a.tiltShift,{blurRadius:d,gradientRadius:e,start:[b,c],end:[i,h],delta:[f/j,g/j],texSize:[this.width,this.height]});m.call(this,a.tiltShift,{blurRadius:d,gradientRadius:e,start:[b,c],end:[i,h],delta:[-g/j,f/j],texSize:[this.width,this.height]});return this}function I(b){a.triangleBlur=a.triangleBlur||new n(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}void main(){vec3 color=vec3(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);color+=texture2D(texture,texCoord+delta*percent).rgb*weight;total+=weight;}gl_FragColor=vec4(color/total,1.0);}");
m.call(this,a.triangleBlur,{delta:[b/this.width,0]});m.call(this,a.triangleBlur,{delta:[0,b/this.height]});return this}function J(b,c,i){a.zoomBlur=a.zoomBlur||new n(null,"uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}void main(){vec3 color=vec3(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);color+=texture2D(texture,texCoord+toCenter*percent*strength/texSize).rgb*weight;total+=weight;}gl_FragColor=vec4(color/total,1.0);}");
m.call(this,a.zoomBlur,{center:[b,c],strength:i,texSize:[this.width,this.height]});return this}function K(b,c,i,h){a.bulgePinch=a.bulgePinch||q("uniform float radius;uniform float strength;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
m.call(this,a.bulgePinch,{radius:i,strength:Math.max(-1,Math.min(h,1)),center:[b,c],texSize:[this.width,this.height]});return this}function q(b,c){return new n(null,b+"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;"+c+"gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor*=max(0.0,1.0-length(coord-clampedCoord));}}")}
function L(b,c){a.matrixWarp=a.matrixWarp||q("uniform mat3 matrix;","vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;");b=Array.prototype.concat.apply([],b);if(b.length==4)b=[b[0],b[1],0,b[2],b[3],0,0,0,1];else if(b.length!=9)throw"can only warp with 2x2 or 3x3 matrix";m.call(this,a.matrixWarp,{matrix:c?u(b):b,texSize:[this.width,this.height]});return this}function M(b,c){var i=r.apply(null,c),h=r.apply(null,b);return this.matrixWarp(B(u(i),h))}function N(b,
c,i,h){a.swirl=a.swirl||q("uniform float radius;uniform float angle;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
m.call(this,a.swirl,{radius:i,center:[b,c],angle:h,texSize:[this.width,this.height]});return this}var v={},a;v.canvas=function(){var b=document.createElement("canvas");try{a=b.getContext("experimental-webgl")}catch(c){a=null}if(!a)throw"This browser does not support WebGL";b._={gl:a,isInitialized:false,texture:null,spareTexture:null,flippedShader:null};b.texture=l(w);b.draw=l(y);b.update=l(z);b.replace=l(A);b.brightnessContrast=l(C);b.hueSaturation=l(D);b.colorHalftone=l(E);b.triangleBlur=l(I);b.perspective=
l(M);b.matrixWarp=l(L);b.bulgePinch=l(K);b.tiltShift=l(H);b.dotScreen=l(F);b.zoomBlur=l(J);b.swirl=l(N);b.ink=l(G);return b};var n=function(){function b(d,e){var f=a.createShader(d);a.shaderSource(f,e);a.compileShader(f);if(!a.getShaderParameter(f,a.COMPILE_STATUS))throw"compile error: "+a.getShaderInfoLog(f);return f}function c(d,e){this.texCoordAttribute=this.vertexAttribute=null;this.program=a.createProgram();d=d||i;e=e||h;e="precision highp float;"+e;a.attachShader(this.program,b(a.VERTEX_SHADER,
d));a.attachShader(this.program,b(a.FRAGMENT_SHADER,e));a.linkProgram(this.program);if(!a.getProgramParameter(this.program,a.LINK_STATUS))throw"link error: "+a.getProgramInfoLog(this.program);}var i="attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",h="uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";
c.prototype.destroy=function(){a.deleteProgram(this.program);this.program=null};c.prototype.uniforms=function(d){a.useProgram(this.program);for(var e in d)if(d.hasOwnProperty(e)){var f=a.getUniformLocation(this.program,e);if(f!==null){var g=d[e];if(Object.prototype.toString.call(g)=="[object Array]")switch(g.length){case 1:a.uniform1fv(f,new Float32Array(g));break;case 2:a.uniform2fv(f,new Float32Array(g));break;case 3:a.uniform3fv(f,new Float32Array(g));break;case 4:a.uniform4fv(f,new Float32Array(g));
break;case 9:a.uniformMatrix3fv(f,false,new Float32Array(g));break;case 16:a.uniformMatrix4fv(f,false,new Float32Array(g));break;default:throw"dont't know how to load uniform \""+e+'" of length '+g.length;}else if(Object.prototype.toString.call(g)=="[object Number]")a.uniform1f(f,g);else throw'attempted to set uniform "'+e+'" to invalid value '+(g||"undefined").toString();}}return this};c.prototype.textures=function(d){a.useProgram(this.program);for(var e in d)d.hasOwnProperty(e)&&a.uniform1i(a.getUniformLocation(this.program,
e),d[e]);return this};c.prototype.drawRect=function(d,e,f,g){var j=a.getParameter(a.VIEWPORT);e=e!==void 0?(e-j[1])/j[3]:0;d=d!==void 0?(d-j[0])/j[2]:0;f=f!==void 0?(f-j[0])/j[2]:1;g=g!==void 0?(g-j[1])/j[3]:1;if(a.vertexBuffer==null)a.vertexBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.bufferData(a.ARRAY_BUFFER,new Float32Array([d,e,d,g,f,e,f,g]),a.STATIC_DRAW);if(a.texCoordBuffer==null){a.texCoordBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,a.texCoordBuffer);a.bufferData(a.ARRAY_BUFFER,
new Float32Array([0,0,0,1,1,0,1,1]),a.STATIC_DRAW)}if(this.vertexAttribute==null){this.vertexAttribute=a.getAttribLocation(this.program,"vertex");a.enableVertexAttribArray(this.vertexAttribute)}if(this.texCoordAttribute==null){this.texCoordAttribute=a.getAttribLocation(this.program,"_texCoord");a.enableVertexAttribArray(this.texCoordAttribute)}a.useProgram(this.program);a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.vertexAttribPointer(this.vertexAttribute,2,a.FLOAT,false,0,0);a.bindBuffer(a.ARRAY_BUFFER,
a.texCoordBuffer);a.vertexAttribPointer(this.texCoordAttribute,2,a.FLOAT,false,0,0);a.drawArrays(a.TRIANGLE_STRIP,0,4)};c.getDefaultShader=function(){a.defaultShader=a.defaultShader||new c;return a.defaultShader};return c}(),p=function(){function b(d){a.bindTexture(a.TEXTURE_2D,d.id);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,
a.CLAMP_TO_EDGE)}function c(d,e,f,g){this.id=a.createTexture();this.width=d;this.height=e;this.format=f;this.type=g;if(d&&e){b(this);a.texImage2D(a.TEXTURE_2D,0,this.format,d,e,0,this.format,this.type,null)}}function i(d){if(h==null)h=document.createElement("canvas");h.width=d.width;h.height=d.height;d=h.getContext("2d");d.clearRect(0,0,h.width,h.height);return d}c.fromImage=function(d){var e=new c(d.width,d.height,a.RGBA,a.UNSIGNED_BYTE);b(e);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,
d);return e};c.prototype.destroy=function(){a.deleteTexture(this.id);this.id=null};c.prototype.use=function(d){a.activeTexture(a.TEXTURE0+(d||0));a.bindTexture(a.TEXTURE_2D,this.id)};c.prototype.drawTo=function(d){a.framebuffer=a.framebuffer||a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,a.framebuffer);a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.id,0);a.viewport(0,0,this.width,this.height);d();a.bindFramebuffer(a.FRAMEBUFFER,null)};var h=null;c.prototype.fillUsingCanvas=
function(d){d(i(this));this.format=a.RGBA;this.type=a.UNSIGNED_BYTE;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,h);return this};c.prototype.toImage=function(d){this.use();n.getDefaultShader().drawRect();var e=this.width*this.height*4,f=new Uint8Array(e),g=i(this),j=g.createImageData(this.width,this.height);a.readPixels(0,0,this.width,this.height,a.RGBA,a.UNSIGNED_BYTE,f);for(var k=0;k<e;k++)j.data[k]=f[k];g.putImageData(j,0,0);d.src=h.toDataURL()};
c.prototype.swapWith=function(d){var e;e=d.id;d.id=this.id;this.id=e;e=d.width;d.width=this.width;this.width=e;e=d.height;d.height=this.height;this.height=e;e=d.format;d.format=this.format;this.format=e};return c}();return v}();