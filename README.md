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

## Install

```
npm install messageevent-stream
```

## API

- *ws*: MessageEvent object to be wrapped
- *options*: options passed to the parent `Duplex` or `Readable` stream class
  constructor
  - *closeOnFinish*: flag to emit `close` event after the writable stream emits
    the `finish` event

By default, the returned stream will inherit from `Readable` class. If the
wrapped MessageEvent emitter object is writable (has a `send()` or
`postMessage()` method), then a `Duplex` stream object will be returned instead.
