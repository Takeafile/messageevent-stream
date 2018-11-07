# MessageEvent-stream

Wrap a MessageEvent emiter object as a Node.js stream

Wrap a [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent)
emiter object as a Node.js `Duplex` [stream](https://nodejs.org/api/stream.html).
This includes Server-sent events, Web sockets, Cross-document messaging
(`postMessage()`), Channel messaging, Cross-worker/document messaging (including
Service Workers), Broadcast channels and WebRTC data channels. In case the
`MessageEvent` emitter object is not writeable (like Server-sent events), it
will create a `Readable` stream instead.

This module was inspired by https://github.com/maxogden/websocket-stream and
https://github.com/DmitryMyadzelets/slip-stream/blob/master/tests/ws-stream.js,
and based on https://github.com/piranna/ws-backpressure.
