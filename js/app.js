'use strict';

var parent1 = document.getElementById('mall');
var uniqueIndexArray = [];

var allItems = [];

var clickCount = 0;

var maxClicks = 25;

var names = [];

var votes = [];

var views = [];

function ItemImage(name, extension) {
  this.filePath = `imgs/${name}${extension}`;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allItems.push(this);
}

ItemImage.prototype.render = function () {
  //create an element -img
  var imageElement = document.createElement('img');
  imageElement.src = this.filePath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;

  parent1.appendChild(imageElement);
};


function startTest() {
  var trackItems = localStorage.getItem('trackAllItems');
  if (trackItems === null) {
    new ItemImage('bag', '.jpg');
    new ItemImage('banana', '.jpg');
    new ItemImage('bathroom', '.jpg');
    new ItemImage('boots', '.jpg');
    new ItemImage('breakfast', '.jpg');
    new ItemImage('bubblegum', '.jpg');
    new ItemImage('chair', '.jpg');
    new ItemImage('cthulhu', '.jpg');
    new ItemImage('dog-duck', '.jpg');
    new ItemImage('dragon', '.jpg');
    new ItemImage('pen', '.jpg');
    new ItemImage('pet-sweep', '.jpg');
    new ItemImage('scissors', '.jpg');
    new ItemImage('shark', '.jpg');
    new ItemImage('sweep', '.png');
    new ItemImage('tauntaun', '.jpg');
    new ItemImage('unicorn', '.jpg');
    new ItemImage('usb', '.gif');
    new ItemImage('water-can', '.jpg');
    new ItemImage('wine-glass', '.jpg');
  } else {
    trackItems = JSON.parse(trackItems);
    console.log(trackItems);
    for (var i = 0; i < trackItems.length; i++) {
      var item = trackItems[i]
      var filePath = item.filePath;
      var votes = item.votes;
      var views = item.views;
      new ItemImage(filePath, votes, views);
    }
  }
  var trackVotes = localStorage.getItem('trackVoteTotal');
  if (trackVotes === null) {
    clickCount = 0;
  } else {
    clickCount = parseInt(trackVotes);
  }
  displayImage();
  displayImage();
  displayImage();
}

startTest();



//helper function
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
// render three random images to dom from an array of images

function getRandomItem() {

  // call random number function to get random index position to generate random item from array
  var randomIndex = randomNumber(allItems.length);
  while (uniqueIndexArray.includes(randomIndex)) {
    randomIndex = randomNumber(allItems.length);
  }
  uniqueIndexArray.push(randomIndex);

  if (uniqueIndexArray.length > 6) {
    uniqueIndexArray.shift();
  }

  // use object instance to call render function
  // allItems[randomIndex].render();
  allItems[randomIndex].views++;
  return randomIndex;

}

function displayImage() {
  var index = getRandomItem();
  allItems[index].render();
}



function showResults() {
  var parentEl = document.getElementById('results');
  var unorderedL = document.createElement('ul');
  for (var i = 0; i < allItems.length; i++) {
    var listItem = document.createElement('li');
    //Banana Slicer had 3 votes and was shown 5 times
    listItem.textContent = `${allItems[i].title} had ${allItems[i].votes} votes and was shown ${allItems[i].views} times.`;
    unorderedL.appendChild(listItem);
  }
  parentEl.appendChild(unorderedL);
}
// call the function!


function clickHandler(event) {
  parent1.textContent = ('');
  var titleOfItemThatWasClickedOn = event.target.title;

  for (var i = 0; i < allItems.length; i++) {
    if (titleOfItemThatWasClickedOn === allItems[i].title) {
      allItems[i].votes++;
    }
  }
  clickCount++;
  if (clickCount < maxClicks) {
    //call get random item function to genrate new items with a click

  // } else {
    // we need to remove event listeners from parent1
    parent1.removeEventListener('click', clickHandler);
    // call results function
    showResults();
    makeNameArray();
  } else {
  localStorage.setITem('trackAllItems', JSON.stringify(allItems));
  localStorage.setItem('trackVoteTotal', clickCount);


  displayImage();
  displayImage();
  displayImage();
}

displayImage();
displayImage();
displayImage();

// Adding event listener so users can click on a certain item
parent1.addEventListener('click', clickHandler);


// loop over all of my items and make an array of just the names of my items
function makeNameArray() {
  for (var i = 0; i < allItems.length; i++) {
    names.push(allItems[i].title);
    votes.push(allItems[i].votes);
    views.push(allItems[i].views);
  }

  generateChart();
}


function generateChart() {
  var ctx = document.getElementById('myChart').getContext('2d');

  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: 'rgb(255,67,164)', // wild strawberry pink
        borderColor: 'rgb(255,67,164)', // wild strawberry pink
        borderWidth: 1
      }, {
        label: 'Views',
        data: views,
        backgroundColor: 'rgb(31,206,203)', // robin egg blue
        borderColor: 'rgb(31,206,203)',// robin egg blue
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
