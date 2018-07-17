const MessageEventStream = require('..')


class NullSocket
{
  addEventListener(name, func)
  {
    this[name] = func
  }

  close(code, reason)
  {
    // setImmediate(this['close'])
  }

  send(data)
  {
    setImmediate(this['message'], {data})
  }
}


test('Send Buffer', function(done)
{
  const expected = 'asdf'

  const ws = MessageEventStream(new NullSocket)

  ws.write(Buffer.from(expected))
  ws.once('data', function(data)
  {
    expect(data.toString()).toBe(expected)

    done()
  })
})

test('Object mode', function(done)
{
  const ws = MessageEventStream(new NullSocket, {objectMode: true})

  ws.write(1)
  ws.write(2)

  ws.once('data', function(data)
  {
    expect(data).toBe(1)

    ws.once('data', function(data)
    {
      expect(data).toBe(2)

      done()
    })
  })
})
