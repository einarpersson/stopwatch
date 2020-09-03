// DOM-elements
const timeElement = document.getElementById('time')
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const resetBtn = document.getElementById('reset')

// Globals
let t0
let timerId
let t = 0
let hasBeenStopped = false

function reset() {
  t = 0
  hasBeenStopped = false

  startBtn.disabled = false
  stopBtn.disabled = true
  resetBtn.disabled = true
  timeElement.innerText = '00:00:00'
}

function formatTimeString(t) {
  const minutes = Math.floor(t / 60000)
  const seconds = Math.floor(t / 1000) % 60
  const centiSeconds = Math.floor(t) % 100
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${centiSeconds.toString().padStart(2, '0')}`
}

function start() {
  if (hasBeenStopped) {
    t0 = performance.now() - t
  } else {
    t0 = performance.now()
  }

  startBtn.disabled = true
  stopBtn.disabled = false
  resetBtn.disabled = true

  timerId = setInterval(() => {
    t = performance.now() - t0
    timeElement.innerText = formatTimeString(t)
  }, 5)
}

function stop() {
  hasBeenStopped = true
  startBtn.disabled = false
  stopBtn.disabled = true
  resetBtn.disabled = false
  clearInterval(timerId)
}

startBtn.onclick = start
stopBtn.onclick = stop
resetBtn.onclick = reset
