document.addEventListener('DOMContentLoaded', function () {
  const socket = io.connect()

  // circle
  const circle = document.querySelector('.circle')
  // div
  const area = document.querySelector('.area')

  // variables
  var mousePosition
  var offset = [0, 0]
  var isDown = false
  // circle coords in the "area" div
  var coordX = 450
  var coordY = 250

  // client joined emit
  socket.emit('client-join')

  // set the coordinates, when it's changed on one of the clients
  socket.on('set-coords', (data) => {
    coordX = data.coords.coordX
    coordY = data.coords.coordY

    // 'x'
    circle.style.left = coordX + 'px'
    // 'y'
    circle.style.top = coordY + 'px'

    document.title = `Circle position (${coordX}; ${coordY})`
  })

  // circle position logic
  // setting offset (отступы)
  circle.addEventListener(
    'mousedown',
    function (e) {
      isDown = true
      offset = [circle.offsetLeft - e.clientX, circle.offsetTop - e.clientY]
    },
    true
  )

  document.addEventListener(
    'mouseup',
    function () {
      isDown = false
    },
    true
  )

  area.addEventListener(
    'mousemove',
    function (event) {
      event.preventDefault()
      if (isDown) {
        mousePosition = {
          x: event.clientX,
          y: event.clientY,
        }

        coordX = mousePosition.x + offset[0]
        coordY = mousePosition.y + offset[1]

        document.title = `Circle position (${coordX}; ${coordY})`

        if (coordX >= 0 && coordX < 900 && coordY >= 0 && coordY < 500) {
          // 'x'
          circle.style.left = coordX + 'px'
          // 'y'
          circle.style.top = coordY + 'px'

          // coords on the current client changed => emit it to the server
          socket.emit('coords-changed', {
            coords: {
              coordX: coordX,
              coordY: coordY,
            },
          })
        }
      }
    },
    true
  )
})
