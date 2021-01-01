// const { Color } = require("../../../Users/Marcus/.vscode/extensions/samplavigne.p5-vscode-1.2.4/p5types")
const n = 50
let arr = new Array(getIndex(n - 1, n - 1, n - 1))
let nextArr = new Array(getIndex(n - 1, n - 1, n - 1))

const colorA = [167, 54, 76]
const colorB = [17, 94, 75]
const colorC = [177, 84, 86]

function setup() {

  createCanvas(1000, 1000)

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {

        nextArr[getIndex(i, j, k)] = Math.random()

      }
    }
  }

  colorMode(HSL)
  rectMode(CORNER)
  ellipseMode(CENTER)
  noStroke()

}


function draw() {

  background(...colorA)
  
  oncePerFrame = true

  arr = nextArr
  nextArr = new Array(getIndex(n - 1, n - 1, n - 1))

  const slice = frameCount

  const s = Math.min(width, height) / n

  for (let i = 0; i < n; i++) {

    for (let j = 0; j < n; j++) {

      const displayIndex = getIndex(i, j, slice)

      const x = (i+0.5) * s
      const y = (j+0.5) * s

      const displayValue = arr[displayIndex]

      let r = s
      
      if (displayValue < 0.01) {

        fill(...colorB)
        
      } else if (displayValue > 0.99) {
        
        fill(...colorC)
        
      } else {
        
        fill(360 * displayValue, 95, 78)
        r = s * 1.5

      }

      ellipse(x, y, r, r)

      for (let k = 0; k < n; k++) {

        const thisIndex = getIndex(i, j, k)

        nextArr[thisIndex] = applyRuleToNeighbours(i, j, k)

        if (Math.pow(Math.abs(mouseX - x),2) + Math.pow(Math.abs(mouseY-y),2) < 2500) {
  
          nextArr[thisIndex] = Math.random()
          
        }
      }


    }

  }

}

function getIndex(i, j, k) {

  return i % n * n * n + j % n * n + k % n

}

function applyRuleToNeighbours(i, j, k) {

  let result = arr[getIndex(i, j, k)]

  const neighbours = getNeighbours(i, j, k)

  let sum = 0
  let neighbourValues = []

  neighbours.forEach(neighbour => {

    neighbourValues.push(arr[neighbour])
    sum += arr[neighbour]

  })

  const average = sum / neighbours.length

  if (average < 0.5) {

    result -= 0.01

  } else if (average > 0.5) {

    result += 0.01

  }

  return result

}

function getNeighbours(i, j, k) {

  const neighbours = []

  for (let a = -1; a <= 1; a++) {
    for (let b = -1; b <= 1; b++) {
      for (let c = -1; c <= 1; c++) {

        const ii = i + a
        const jj = j + b
        const kk = k + c

        const iii = ii < 0 ? n - 1 : ii > n - 1 ? ii - n : ii
        const jjj = jj < 0 ? n - 1 : jj > n - 1 ? jj - n : jj
        const kkk = kk < 0 ? n - 1 : kk > n - 1 ? kk - n : kk

        neighbours.push(getIndex(iii, jjj, kkk))

      }
    }
  }

  return neighbours

}