const {Duplex, Readable} = require('stream')


function read(){}


// Based on
// https://github.com/maxogden/websocket-stream/blob/3f39dcbc098f661ee12d7deba297b1420a0a0e07/stream.js#L154
function mapChunks(item)
{
  const {chunk} = item

  return typeof chunk === 'string' ? Buffer.from(item, 'utf8') : chunk
}

function writev(chunks, cb)
{
  this._write(Buffer.concat(chunks.map(mapChunks)), 'binary', cb)
}


module.exports = function MessageEventStream(ws, {closeOnFinish, ...options} = {})
{
  const send = ws.send || ws.postMessage

  const Constructor = send ? Duplex : Readable

  const stream = new Constructor({...options, read})
  .once('close', ws.close.bind(ws))

  // Configure `MessageEvent` emitter object
  ws.addEventListener('close', stream.destroy.bind(stream))
  ws.addEventListener('error', stream.destroy.bind(stream))
  ws.addEventListener('message', function({data})
  {
    stream.push(data)
  })

  // Configure writable part of the `Duplex` stream
  if(send)
  {
    stream._write = function(chunk, _, callback)
    {
      send.call(ws, chunk)

      callback()
    }

    if(closeOnFinish) stream.once('finish', stream.emit.bind(stream, 'close'))

    // Allow to concatenate and sent messages as one if not in `objectMode`
    if(!options.objectMode) stream._writev = writev

    // Don't call to `write()` until the `MessageEvent` emitter object is ready
    const {OPEN, readyState} = ws
    if(readyState === OPEN || readyState === 'open') return

    stream.cork()

    function onOpen()
    {
      ws.removeEventListener('open', onOpen)

      process.nextTick(stream.uncork.bind(stream))
    }

    ws.addEventListener('open', onOpen)
  }

  return stream
}
