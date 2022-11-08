document.addEventListener('DOMContentLoaded', function () {
  const circle = document.querySelector('.circle')
  const area = document.querySelector('.area')

  var mousePosition
  var offset = [0, 0]
  var isDown = false

  const position = (element) => {
    let areaCoords = area.getBoundingClientRect()
    let areaX = areaCoords.x
    let areaY = areaCoords.y

    let circleCoords = element.getBoundingClientRect()
    let circleX = circleCoords.x
    let circleY = circleCoords.y

    let circleDivX = circleX - areaX - 2 // 2 - circle border
    let circleDivY = circleY - areaY - 2

    console.log('areaCoords: ', areaCoords)
    console.log('circleCoords: ', circleCoords)

    document.title = `Circle position (${Math.round(circleDivX)}; ${Math.round(
      circleDivY
    )})`
    return circleCoords
  }

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

        let coordX = mousePosition.x + offset[0]
        let coordY = mousePosition.y + offset[1]

        if (coordX >= 0 && coordX < 900 && coordY >= 0 && coordY < 500) {
          // 'x'
          circle.style.left = coordX + 'px'
          // 'y'
          circle.style.top = coordY + 'px'
        }
      }
    },
    true
  )

  //   position(circle)
})
