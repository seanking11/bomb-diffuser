const audioDing = document.getElementById('audioDing')
const successKey = 's'
const failKey = 'x'
let progressCounter = 0
const keyCommand = { command: 'Defuse with the key (magnet)', key: 'm'}
const thumbCommand = { command: 'Scan your thumb', key: 'q'}

const commandsDB = [
  {
    command: 'Press the green button',
    key: 'b'
  },
  {
    command: 'Press the green button',
    key: 'b'
  },
  {
    command: 'Press the red button',
    key: 'r'
  },
  {
    command: 'Touch the red wires together',
    key: 'e'
  },
  {
    command: 'Put the slider in the left position',
    key: 't'
  },
  {
    command: 'Put the slider in the right position',
    key: 'y'
  },
  {
    command: 'Turn on the knob',
    key: 'o'
  },
  {
    command: 'Turn off the knob',
    key: 'p'
  }
]



const commandsArr = shuffle(commandsDB)
// Randomly start somewhere in the array
// let displayIndex = randomIntFromInterval(0, commandsArr.length - 1)
let displayIndex = 0
let lastPressed

$(document).ready(function() {
  chooseCommand()
  $('.controller').focus()
})


$('.controller').on('input', function() {
  const value = $(this).val()
  console.log(value)
  checkValidity(value.substr(-1))
})

function checkValidity(pressed) {
  const shouldBe = commandsArr[displayIndex].key
  if (pressed === shouldBe) {
    lastPressed = pressed
    commandSuccess()
  } else {
    if (pressed != lastPressed) {
      loseGame()
      console.log('pressed: ' + pressed)
    }
  }
}

function chooseCommand() {
  if (displayIndex >= commandsArr.length) {
    // displayIndex = 0
    winGame()
  } else {
    console.log(commandsArr);
    $('.target').html(commandsArr[displayIndex].command)
  }
}

function commandSuccess() {
  audioDing.currentTime = 0.1;
  audioDing.play();
  progressCounter++
  displayIndex++
  $('.progressCounter').html(progressCounter + '/10')
  updateSlider(progressCounter)
  chooseCommand()
}

function loseGame() {
  console.log('Game lost!')
  clearTimeout(timerId);
  $('.target').html('You lose!')
  $('.overlay').css('display', 'block')
  document.getElementById('explosionSound').play()
  document.getElementById('bombVideo').play()
  // show a losing screen/gif and play explosion sound
}

function winGame() {
  clearTimeout(timerId);
  $('.target').html('You do not die today.')
}

function updateSlider(value) {
  $('.determinate').css('width', ((value * 10) + '%'))
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  array.unshift(thumbCommand)
  array.push(keyCommand)

  return array;
}

var timeLeft = 30;
var timer = document.getElementById('timer');
var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
    clearTimeout(timerId);
    loseGame();
  } else {
    if (timeLeft < 10) {
      timer.innerHTML = '0:0' + timeLeft;
    } else {
      timer.innerHTML = '0:' + timeLeft;
    }
    timeLeft--;
  }
}
