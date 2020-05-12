/* eslint-disable no-undef */
'use strict';

var parent1 = document.getElementById('mall');
var uniqueIndexArray = [];

var allItems = [];

var clickCount = 0;

var maxClicks = 25;

var names = [];

var votes = [];

function ItemImage(name, extension) {
  this.filePath = `imgs/${name}${extension}`;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allItems.push(this);
}


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


ItemImage.prototype.render = function () {
  //create an element -img
  var imageElement = document.createElement('img');
  imageElement.src = this.filePath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;
  parent1.appendChild(imageElement);
};

//helper function
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
// render three random images to dom from an array of images

function getRandomItem() {

  // call random number function to get random index position to generate random item from array
  var randomIndex = randomNumber(allItems.length);
  // var secondRandomIndex = randomNumber(0, allItems.length - 1);
  // var thirdRandomIndex = randomNumber(0, allItems.length - 1);

  // while loop to make it so two of the same item do not generate at one time
  // while (randomIndex === secondRandomIndex || secondRandomIndex === thirdRandomIndex || randomIndex === thirdRandomIndex) {
  //   secondRandomIndex = randomNumber(0, allItems.length - 1);
  //   thirdRandomIndex = randomNumber(0, allItems.length - 1);
  // }
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
  parent1.textContent=('');
  var titleOfItemThatWasClickedOn = event.target.title;

  for (var i = 0; i < allItems.length; i++) {
    if (titleOfItemThatWasClickedOn === allItems[i].title) {
      allItems[i].votes++;
    }
  }
  clickCount++;
  if (clickCount < maxClicks) {
    //call get random item function to genrate new items with a click

  } else {
    // we need to remove event listeners from parent1
    parent1.removeEventListener('click', clickHandler);
    // call results function
    showResults();
    makeNameArray();
  }
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
  }

  generateChart();
}


function generateChart() {
  var ctx = document.getElementById('myChart').getContext('2d');

  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
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
