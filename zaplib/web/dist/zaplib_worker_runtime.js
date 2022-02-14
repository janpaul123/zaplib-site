!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.zaplib=r():e.zaplib=r()}(self,(function(){return(()=>{"use strict";var e,r={d:(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};r.r(t),r.d(t,{callRust:()=>j,callRustInSameThreadSync:()=>$,createMutableBuffer:()=>V,createReadOnlyBuffer:()=>Y,deserializeZapArrayFromPostMessage:()=>K,initializeWorker:()=>z,newWorkerPort:()=>N,serializeZapArrayForPostMessage:()=>G}),function(e){e[e.String=0]="String",e[e.ReadOnlyU8Buffer=1]="ReadOnlyU8Buffer",e[e.U8Buffer=2]="U8Buffer",e[e.F32Buffer=3]="F32Buffer",e[e.ReadOnlyF32Buffer=4]="ReadOnlyF32Buffer"}(e||(e={})),self;const n="function"==typeof importScripts;class s extends SharedArrayBuffer{constructor(e,r){super(0),this.__zaplibWasmBuffer=e,this.__zaplibBufferData=r}get readonly(){return this.__zaplibBufferData.readonly}get byteLength(){return this.__zaplibWasmBuffer.byteLength}slice(...e){return this.__zaplibWasmBuffer.slice(...e)}}function a(e){return class r extends e{constructor(...r){const t=r[0];if("object"==typeof t&&t instanceof s){if(r.length<2&&(r[1]=t.__zaplibBufferData.bufferPtr),r.length<3&&(r[2]=Math.floor((t.__zaplibBufferData.bufferPtr+t.__zaplibBufferData.bufferLen-r[1])/e.BYTES_PER_ELEMENT)),r[1]<t.__zaplibBufferData.bufferPtr)throw new Error(`Byte_offset ${r[1]} is out of bounds`);if(r[1]+r[2]*e.BYTES_PER_ELEMENT>t.__zaplibBufferData.bufferPtr+t.__zaplibBufferData.bufferLen)throw new Error(`Byte_offset ${r[1]} + length ${r[2]} is out of bounds`);r[0]=t.__zaplibWasmBuffer,super(...r),this.__zaplibBuffer=t}else super(...r)}get buffer(){return this.__zaplibBuffer||super.buffer}subarray(e=0,t=this.length){return e<0&&(e=this.length+e),t<0&&(t=this.length+t),t<e&&(t=e),new r(this.buffer,this.byteOffset+e*this.BYTES_PER_ELEMENT,t-e)}}}const o={Int8Array:"ZapInt8Array",Uint8Array:"ZapUint8Array",Uint8ClampedArray:"ZapUint8ClampedArray",Int16Array:"ZapInt16Array",Uint16Array:"ZapUint16Array",Uint16ClampedArray:"ZapUint16ClampedArray",Int32Array:"ZapInt32Array",Uint32Array:"ZapUint32Array",Float32Array:"ZapFloat32Array",Float64Array:"ZapFloat64Array",BigInt64Array:"ZapBigInt64Array",BigUint64Array:"ZapBigUint64Array",DataView:"ZapDataView"};for(const[e,r]of Object.entries(o))e in self&&(self[r]=a(self[e]));function i(e){if("object"!=typeof e||null===e)return!1;if(Object.prototype.hasOwnProperty.call(e,"__zaplibBuffer"))return!0;if(Array.isArray(e)||e instanceof Set||e instanceof Map){for(const r of e)if(i(r))return!0}else if(Object.getPrototypeOf(e)===Object.getPrototypeOf({}))for(const r of Object.entries(e))if(i(r))return!0;return!1}function f(e){const r=e.postMessage;e.postMessage=function(...e){if(i(e[0]))throw new Error("Sending ZapBuffers to/from workers is not supported - use .slice() on typed array instead to make an explicit copy");r.apply(this,e)}}const u=new WeakMap;function l(e){return"object"==typeof e&&e instanceof s}function c(r){if(!l(r.buffer))throw new Error("zapArray.buffer is not a ZapBuffer in checkValidZapArray");const t=r.buffer;if(r.byteOffset!==t.__zaplibBufferData.bufferPtr||r.byteLength!==t.__zaplibBufferData.bufferLen)throw new Error("Called Rust with a buffer that does not span the entire underlying ZapBuffer");const n=v(r,t.readonly);if(n!==t.__zaplibBufferData.paramType)throw new Error(`Cannot call Rust with a buffer which has been cast to a different type. Expected ${e[t.__zaplibBufferData.paramType]} but got ${e[n]}`)}const p={},h=new FinalizationRegistry((({arcPtr:e,destructor:r})=>{delete p[e],r&&r(e)})),d=new FinalizationRegistry((({bufferData:e,destructor:r})=>{r(e)})),y=(e,r,t,n)=>{var a;if(r.readonly){if(null===(a=p[r.arcPtr])||void 0===a?void 0:a.deref())t(r.arcPtr);else{const n=new s(e.buffer,r);h.register(n,{arcPtr:r.arcPtr,destructor:t}),p[r.arcPtr]=new WeakRef(n)}return p[r.arcPtr].deref()}{const t=new s(e.buffer,r);return d.register(t,{bufferData:r,destructor:n},t),t}},b=e=>{if(e.readonly)throw new Error("`unregisterMutableBuffer` should only be called on mutable ZapBuffers");d.unregister(e)};class _{constructor({buffer:e,byteOffset:r,slots:t,growCallback:n}){this._buffer=e,this._byteOffset=r,this._slots=t,this._growCallback=n,this._used=2,this._updateRefs()}_updateRefs(){this._f32=new Float32Array(this._buffer,this._byteOffset,this._slots),this._u32=new Uint32Array(this._buffer,this._byteOffset,this._slots),this._f64=new Float64Array(this._buffer,this._byteOffset,this._slots>>1),this._u64=new BigUint64Array(this._buffer,this._byteOffset,this._slots>>1),this._u64[0]=BigInt(this._slots)*BigInt(4)}_fit(e){if(this._used+e>this._slots){let r=Math.max(this._used+e,2*this._slots);1&r&&r++;const t=4*r,{buffer:n,byteOffset:s}=this._growCallback(this._buffer,this._byteOffset,t);this._buffer=n,this._byteOffset=s,this._slots=r,this._updateRefs()}const r=this._used;return this._used+=e,r}sendF32(e){const r=this._fit(1);this._f32[r]=e}sendU32(e){const r=this._fit(1);this._u32[r]=e}sendF64(e){if(1&this._used){const r=this._fit(3)+1;this._f64[r>>1]=e}else{const r=this._fit(2);this._f64[r>>1]=e}}sendU64(e){if(1&this._used){const r=this._fit(3)+1;this._u64[r>>1]=e}else{const r=this._fit(2);this._u64[r>>1]=e}}sendString(e){let r=this._fit(e.length+1);this._u32[r++]=e.length;for(let t=0;t<e.length;t++)this._u32[r++]=e.charCodeAt(t)}getData(){return{buffer:this._buffer,byteOffset:this._byteOffset}}}class g{constructor(e,r){this._memory=e,this._usedSlots=2,this._f32=new Float32Array(this._memory.buffer,r),this._u32=new Uint32Array(this._memory.buffer,r),this._f64=new Float64Array(this._memory.buffer,r),this._u64=new BigUint64Array(this._memory.buffer,r)}parseU32(){return this._u32[this._usedSlots++]}parseF32(){return this._f32[this._usedSlots++]}parseF64(){1&this._usedSlots&&this._usedSlots++;const e=this._f64[this._usedSlots>>1];return this._usedSlots+=2,e}parseU64(){1&this._usedSlots&&this._usedSlots++;const e=this._u64[this._usedSlots>>1];return this._usedSlots+=2,e}parseString(){let e="";const r=this.parseU32();for(let t=0;t<r;t++){const r=this.parseU32();0!=r&&(e+=String.fromCharCode(r))}return e}parseU8Slice(){const e=this.parseU32(),r=e>>2,t=new Uint8Array(e),n=3&e;for(let e=0;e<r;e++){const r=e<<2,n=this.parseU32();t[r+0]=255&n,t[r+1]=n>>8&255,t[r+2]=n>>16&255,t[r+3]=n>>24&255}const s=r<<2;if(1==n){const e=this.parseU32();t[s+0]=255&e}else if(2==n){const e=this.parseU32();t[s+0]=255&e,t[s+1]=e>>8&255}else if(3==n){const e=this.parseU32();t[s+0]=255&e,t[s+1]=e>>8&255,t[s+2]=e>>16&255}return t}parseZapParams(){const r=this.parseU32(),t=[];for(let n=0;n<r;++n){const r=this.parseU32();if(r===e.String)t.push(this.parseString());else if(r===e.ReadOnlyU8Buffer||r===e.ReadOnlyF32Buffer){const e=this.parseU32(),n=this.parseU32(),s=this.parseU32();t.push({paramType:r,bufferPtr:e,bufferLen:n,arcPtr:s,readonly:!0})}else{if(r!==e.U8Buffer&&r!==e.F32Buffer)throw new Error(`Unknown ZapParam type: ${r}`);{const e=this.parseU32(),n=this.parseU32(),s=this.parseU32();t.push({paramType:r,bufferPtr:e,bufferLen:n,bufferCap:s,readonly:!1})}}}return t}}const w="$$RESPONSE",m="$$ERROR";class E{constructor(e){if(this._messageId=0,this._pendingCallbacks={},this._receivers=new Map,this._onChannelMessage=e=>{const{id:r,topic:t,data:n}=e.data;if(t===w)return this._pendingCallbacks[r](e.data),void delete this._pendingCallbacks[r];new Promise((e=>{const r=this._receivers.get(t);if(!r)throw new Error(`no receiver registered for ${t}`);e(r(n))})).then((e=>{if(!e)return void this.postMessage({topic:w,id:r},[]);const t=e[E.transferrables];delete e[E.transferrables];const n={topic:w,id:r,data:e};this.postMessage(n,t)})).catch((e=>{const t={topic:w,id:r,data:{[m]:!0,name:e.name,message:e.message,stack:e.stack}};this.postMessage(t,[])}))},this._channel=e,this._channel.onmessage)throw new Error("channel.onmessage is already set. Can only use one Rpc instance per channel.");this._channel.onmessage=this._onChannelMessage}send(e,r,t){const n=this._messageId++,s={topic:e,id:n,data:r},a=new Promise(((e,r)=>{this._pendingCallbacks[n]=t=>{if(t.data&&t.data[m]){const e=new Error(t.data.message);e.name=t.data.name,e.stack=t.data.stack,r(e)}else e(t.data)}}));return this.postMessage(s,t),a}receive(e,r){if(this._receivers.has(e))throw new Error(`Receiver already registered for topic: ${e}`);this._receivers.set(e,r)}postMessage(e,r){try{this._channel.postMessage(e,r)}catch(e){console.error("Rpc postMessage call itself failed: ",e)}}}E.transferrables="$$TRANSFERRABLES";const B=(e,r,t)=>{new e.constructor(r,t,e.length).set(e)},v=(r,t)=>{if(r instanceof Uint8Array)return t?e.ReadOnlyU8Buffer:e.U8Buffer;if(r instanceof Float32Array)return t?e.ReadOnlyF32Buffer:e.F32Buffer;throw new Error("Invalid array type")},W=(e,r,t)=>{const n=Number(r.allocWasmVec(BigInt(t.byteLength)));return B(t,e.buffer,n),n};class k extends Error{constructor(e){super(e),this.name="RustPanic"}}var A,U,S,R;!function(e){e.CallRust="WorkerEvent.CallRust",e.CreateBuffer="WorkerEvent.CreateBuffer",e.CreateReadOnlyBuffer="WorkerEvent.CreateReadOnlyBuffer",e.BindMainWorkerPort="WorkerEvent.BindMainWorkerPort",e.DecrementArc="WorkerEvent.DecrementArc",e.DeallocVec="WorkerEvent.DeallocVec",e.IncrementArc="WorkerEvent.IncrementArc",e.DragEnter="WorkerEvent.DragEnter",e.DragOver="WorkerEvent.DragOver",e.DragLeave="WorkerEvent.DragLeave",e.Drop="WorkerEvent.Drop",e.WindowMouseUp="WorkerEvent.WindowMouseUp",e.CanvasMouseDown="WorkerEvent.CanvasMouseDown",e.WindowMouseMove="WorkerEvent.WindowMouseMove",e.WindowMouseOut="WorkerEvent.WindowMouseOut",e.WindowFocus="WorkerEvent.WindowFocus",e.WindowBlur="WorkerEvent.WindowBlur",e.ScreenResize="WorkerEvent.ScreenResize",e.CanvasWheel="WorkerEvent.CanvasWheel",e.ShowIncompatibleBrowserNotification="WorkerEvent.ShowIncompatibleBrowserNotification",e.RemoveLoadingIndicators="WorkerEvent.RemoveLoadingIndicators",e.SetDocumentTitle="WorkerEvent.SetDocumentTitle",e.SetMouseCursor="WorkerEvent.SetMouseCursor",e.Fullscreen="WorkerEvent.Fullscreen",e.Normalscreen="WorkerEvent.Normalscreen",e.TextCopyResponse="WorkerEvent.TextCopyResponse",e.EnableGlobalFileDropTarget="WorkerEvent.EnableGlobalFileDropTarget",e.CallJs="WorkerEvent.CallJs",e.ShowTextIME="WorkerEvent.ShowTextIME",e.TextInput="WorkerEvent.TextInput",e.TextCopy="WorkerEvent.TextCopy",e.KeyDown="WorkerEvent.KeyDown",e.KeyUp="WorkerEvent.KeyUp",e.Init="WorkerEvent.Init",e.RunWebGL="WorkerEvent.RunWebGL",e.ThreadSpawn="WorkerEvent.ThreadSpawn",e.WindowTouchStart="WorkerEvent.WindowTouchStart",e.WindowTouchMove="WorkerEvent.WindowTouchMove",e.WindowTouchEndCancelLeave="WorkerEvent.WindowTouchEndCancelLeave"}(A||(A={})),function(e){e.Init="TaskWorkerEvent.Init"}(U||(U={})),function(e){e.Run="AsyncWorkerEvent.Run",e.ThreadSpawn="AsyncWorkerEvent.ThreadSpawn"}(S||(S={})),function(e){e.Init="MainWorkerChannelEvent.Init",e.BindMainWorkerPort="MainWorkerChannelEvent.BindMainWorkerPort",e.CallRust="MainWorkerChannelEvent.CallRust",e.SendEventFromAnyThread="MainWorkerChannelEvent.SendEventFromAnyThread"}(R||(R={}));let M,P,T,C,O,I=!1;const{checkWasm:D,wrapWasmExports:F}=(e=>{const r=()=>{if(1!==Atomics.load(O,0))throw new Error("Zaplib WebAssembly instance crashed")};return{checkWasm:r,wrapWasmExports:e=>new Proxy(e,{get:function(e,t){return r(),e[t]}})}})(),z=e=>{if(I)throw new Error("Only call zaplib.initializeWorker once");if(I=!0,!n)throw new Error("zaplib.initializeWorker() can only be called in a WebWorker");return function(){for(const[e,r]of Object.entries(o))e in self&&(self[e]=self[r]);f(self),f(self.Worker),self.MessagePort&&f(self.MessagePort)}(),new Promise((r=>{M=new E(e),M.send(R.Init).then((({wasmModule:e,memory:t,taskWorkerSab:n,baseUri:s,appPtr:a,tlsAndStackData:o,wasmOnline:i})=>{O=i,T=t,C=a;const f=(({getExports:e,memory:r,taskWorkerSab:t,fileHandles:n,sendEventFromAnyThread:s,threadSpawn:a,baseUri:o})=>{const i=(e,t)=>{let n="";const s=new Uint32Array(r.buffer,e,t);for(let e=0;e<t;e++)n+=String.fromCharCode(s[e]);return n};return{memory:r,_consoleLog:(e,r)=>{const t=i(parseInt(e),parseInt(r));console.log(t)},_throwError:(e,r)=>{throw new k(i(parseInt(e),parseInt(r)))},readUserFileRange:(e,t,s,a)=>{const o=n[e],i=Number(a),f=i+Number(s);o.lastReadStart<=i&&i<o.lastReadEnd&&console.warn(`Read start (${i}) fell in the range of the last read (${o.lastReadStart}-${o.lastReadEnd}); this usually happens if you don't use BufReader or if you don't use BufReader.seek_relative.`),o.lastReadStart=i,o.lastReadEnd=f;const u=(new FileReaderSync).readAsArrayBuffer(o.file.slice(i,f));return B(new Uint8Array(u),r.buffer,Number(t)),BigInt(u.byteLength)},performanceNow:()=>performance.now(),threadSpawn:e=>{a(e)},_sendEventFromAnyThread:e=>{s(e)},readUrlSync:(t,n,s,a)=>{const f=i(t,n),u=new XMLHttpRequest;if(u.responseType="arraybuffer",u.open("GET",new URL(f,o).href,!1),u.send(null),200===u.status){const t=e(),n=W(r,t,new Uint8Array(u.response));return new Uint32Array(r.buffer,s,1)[0]=n,new Uint32Array(r.buffer,a,1)[0]=u.response.byteLength,1}return 0},randomU64:()=>new BigUint64Array(self.crypto.getRandomValues(new Uint32Array(2)).buffer)[0],sendTaskWorkerMessage:e=>{((e,r)=>{const t=new Int32Array(e);((e,r)=>{for(;;){if(0==Atomics.compareExchange(e,0,0,1))return;Atomics.wait(e,0,1)}})(t);const n=t[1];new Uint32Array(e)[n+2]=r,t[1]=n+1,((e,r)=>{if(1!=Atomics.compareExchange(e,0,1,0))throw new Error("Called mutex_unlock on an already unlocked mutex");Atomics.notify(e,0,1)})(t),Atomics.notify(t,1)})(t,parseInt(e))}}})({getExports:function(){return P},memory:t,taskWorkerSab:n,fileHandles:[],sendEventFromAnyThread:e=>{M.send(R.SendEventFromAnyThread,e)},threadSpawn:()=>{throw new Error("Not yet implemented")},baseUri:s});WebAssembly.instantiate(e,{env:f}).then((e=>{((e,r)=>{e.__stack_pointer.value=Number(r.ptr)+r.size-8,e.__wasm_init_tls(Number(r.ptr))})(e.exports,o),P=F(e.exports),r()}))}))}))},L=e=>{P.decrementArc(BigInt(e))},x=({bufferPtr:e,bufferLen:r,bufferCap:t})=>{P.deallocVec(BigInt(e),BigInt(r),BigInt(t))},Z=r=>function(r,t,n,s){return s.map((s=>{if("string"==typeof s)return s;{const a=y(r,s,t,n);if(s.paramType===e.String)throw new Error("ZapParam buffer type called with string paramType");const o={[e.U8Buffer]:Uint8Array,[e.ReadOnlyU8Buffer]:Uint8Array,[e.F32Buffer]:Float32Array,[e.ReadOnlyF32Buffer]:Float32Array}[s.paramType];return function(e,r){var t;return(null===(t=u.get(e))||void 0===t?void 0:t.BYTES_PER_ELEMENT)!==r.BYTES_PER_ELEMENT&&u.set(e,r),u.get(e)}(a,new o(a,s.bufferPtr,s.bufferLen/o.BYTES_PER_ELEMENT))}}))}(T,L,x,r),N=()=>{const e=new MessageChannel;return M.send(R.BindMainWorkerPort,e.port1,[e.port1]),e.port2},j=(e,r=[])=>{return t=void 0,n=void 0,a=function*(){D();const t=r.map((e=>"string"==typeof e?e:l(e.buffer)?(c(e),G(e)):(e.buffer instanceof SharedArrayBuffer||console.warn("Consider passing Uint8Arrays backed by ZapBuffer or SharedArrayBuffer into `callRust` to prevent copying data"),e)));return Z(yield M.send(R.CallRust,{name:e,params:t}))},new((s=void 0)||(s=Promise))((function(e,r){function o(e){try{f(a.next(e))}catch(e){r(e)}}function i(e){try{f(a.throw(e))}catch(e){r(e)}}function f(r){var t;r.done?e(r.value):(t=r.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,i)}f((a=a.apply(t,n||[])).next())}));var t,n,s,a},$=(r,t=[])=>{D();const n=((e,r)=>{const t=Number(r.allocWasmMessage(BigInt(4096)));return new _({buffer:e.buffer,byteOffset:t,slots:1024,growCallback:(t,n,s)=>{const a=Number(r.reallocWasmMessage(BigInt(n),BigInt(s)));return{buffer:e.buffer,byteOffset:a}}})})(T,P);n.sendString(r),n.sendU32(t.length);for(const r of t)if("string"==typeof r)n.sendU32(e.String),n.sendString(r);else if(r.buffer instanceof s)if(c(r),r.buffer.__zaplibBufferData.readonly){n.sendU32(v(r,!0));const e=r.buffer.__zaplibBufferData.arcPtr;P.incrementArc(BigInt(e)),n.sendU32(e)}else b(r.buffer),n.sendU32(v(r,!1)),n.sendU32(r.buffer.__zaplibBufferData.bufferPtr),n.sendU32(r.buffer.__zaplibBufferData.bufferLen),n.sendU32(r.buffer.__zaplibBufferData.bufferCap);else{console.warn("Consider passing Uint8Arrays backed by ZapBuffer to prevent copying data");const e=r.byteLength,t=W(T,P,r);n.sendU32(v(r,!1)),n.sendU32(t),n.sendU32(e),n.sendU32(e)}const a=P.callRustInSameThreadSync(C,BigInt(n.getData().byteOffset)),o=new g(T,Number(a)).parseZapParams();return Z(o)},V=e=>{D();const r=e.byteLength,t=W(T,P,e);return Z([{paramType:v(e,!1),bufferPtr:t,bufferLen:r,bufferCap:r,readonly:!1}])[0]},Y=e=>{D();const r=W(T,P,e),t=v(e,!0),n=Number(P.createArcVec(BigInt(r),BigInt(e.length),BigInt(t)));return Z([{paramType:t,bufferPtr:r,bufferLen:e.byteLength,arcPtr:n,readonly:!0}])[0]},G=e=>{if("object"!=typeof e||!l(e.buffer))throw new Error("Only pass Zap arrays to serializeZapArrayForPostMessage");const r=e.buffer;return r.__zaplibBufferData.readonly?P.incrementArc(BigInt(r.__zaplibBufferData.arcPtr)):b(r),{bufferData:r.__zaplibBufferData,byteOffset:e.byteOffset,byteLength:e.byteLength}},K=e=>{const r=y(T,e.bufferData,L,x);return new Uint8Array(r,e.byteOffset,e.byteLength)};return t})()}));
//# sourceMappingURL=zaplib_worker_runtime.js.map