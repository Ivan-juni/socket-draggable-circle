// для подсчета соединений
let connections = []

module.exports = function (socket) {
  if (connections) {
    connections.push(socket)
    console.log(`Socket № ${connections.indexOf(socket) + 1} connected`)
  }

  socket.on('client-join', (data) => {
    console.log('Client joined')
  })

  // when coords on one of the clients changed => emit to all the clients
  socket.on('coords-changed', (data) => {
    //   io.sockets.emit('set-coords', {
    //     coords: data.coords,
    //   })
    socket.broadcast.emit('set-coords', {
      // меньше задержка, так как мы не отсылаем данные клиенту, который это иницииоровал
      coords: data.coords,
    })
  })

  socket.on('disconnect', () => {
    const index = connections.indexOf(socket)
    if (connections) {
      connections.splice(index, 1)
    }
    console.log(`Socket № ${index + 1} disconnected`)
  })
}
