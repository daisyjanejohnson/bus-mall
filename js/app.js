'use strict';

var parent1 = document.getElementById('mall');

var allItems = [];

var clickCount = 0;

var maxClicks = 25;


function ItemImage(filePath, alt, title) {
  this.filePath = filePath;
  this.alt = alt;
  this.title = title;
  this.votes = 0;
  this.views = 0;
  allItems.push(this);
}

new ItemImage('imgs/bag.jpg', 'bag', 'bag');
new ItemImage('imgs/banana.jpg', 'banana', 'banana');
new ItemImage('imgs/bathroom.jpg', 'bathroom', 'bathroom');
new ItemImage('imgs/boots.jpg', 'boots', 'boots');
new ItemImage('imgs/breakfast.jpg', 'breakfast', 'breakfast');
new ItemImage('imgs/bubblegum.jpg', 'bubblegum', 'bubblegum');
new ItemImage('imgs/chair.jpg', 'chair', 'chair');
new ItemImage('imgs/cthulhu.jpg', 'cthulhu', 'cthulhu');
new ItemImage('imgs/dog-duck.jpg', 'dog-duck', 'dog-duck');
new ItemImage('imgs/dragon.jpg', 'dragon', 'dragon');
new ItemImage('imgs/pen.jpg', 'pen', 'pen');
new ItemImage('imgs/pet-sweep.jpg', 'pet-sweep', 'pet-sweep');
new ItemImage('imgs/scissors.jpg', 'scissors', 'scissors');
new ItemImage('imgs/shark.jpg', 'shark', 'shark');
new ItemImage('imgs/sweep.png', 'sweep', 'sweep');
new ItemImage('imgs/tauntaun.jpg', 'tauntaun', 'tauntaun');
new ItemImage('imgs/unicorn.jpg', 'unicorn', 'unicorn');
new ItemImage('imgs/usb.gif', 'usb', 'usb');
new ItemImage('imgs/water-can.jpg', 'water-can', 'water-can');
new ItemImage('imgs/wine-glass.jpg', 'wine-glass', 'wineglass');

ItemImage.prototype.render = function () {
  //create an element -img
  var imageElement = document.createElement('img');
  // fill the src with the path to the image
  imageElement.setAttribute('src', this.filePath);
  // fill in alt which is name of image w/o .jpeg
  imageElement.setAttribute('alt', this.alt);
  // fil in title with same thing as alt
  imageElement.setAttribute('title', this.title);
  //append to parent
  parent1.appendChild(imageElement);
};

//helper function
function randomNumber(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// render three random images to dom from an array of images

function getRandomItem() {
  parent1.textContent = '';

  // call random number function to get random index position to generate random item from array
  var randomIndex = randomNumber(0, allItems.length - 1);
  var secondRandomIndex = randomNumber(0, allItems.length - 1);
  var thirdRandomIndex = randomNumber(0, allItems.length - 1);

  // while loop to make it so two of the same item do not generate at one time
  while (randomIndex === secondRandomIndex || secondRandomIndex === thirdRandomIndex || randomIndex === thirdRandomIndex) {
    secondRandomIndex = randomNumber(0, allItems.length - 1);
    thirdRandomIndex = randomNumber(0, allItems.length - 1);
  }

  // use object instance to call render function
  allItems[randomIndex].render();
  allItems[randomIndex].views++;

  allItems[secondRandomIndex].render();
  allItems[secondRandomIndex].views++;

  allItems[thirdRandomIndex].render();
  allItems[thirdRandomIndex].views++;
}

function showResults() {
  var parentEl = document.getElementById('results');
  var unorderedL = document.createElement('ul');
  for (var i = 0; i < allItems.length; i++){
    var listItem = document.createElement('li');
    //Banana Slicer had 3 votes and was shown 5 times
    listItem.textContent = `${allItems[i].title} had ${allItems[i].votes} votes and was shown ${allItems[i].views} times`;
    unorderedL.appendChild(listItem);
  }
  parentEl.appendChild(unorderedL);
}
// call the function!
getRandomItem();

function clickHandler(event) {
  var titleOfItemThatWasClickedOn = event.target.title;

  for (var i = 0; i < allItems.length; i++) {
    if (titleOfItemThatWasClickedOn === allItems[i].title) {
      allItems[i].votes++;
    }
  }
  clickCount++;
  if (clickCount < maxClicks) {
    //call get random item function to genrate new items with a click
    getRandomItem();
  } else {
    // we need to remove event listeners from parent1
    parent1.removeEventListener('click', clickHandler);
    // call results function
    showResults();
  }
}

// Adding event listener so users can click on a certain item
parent1.addEventListener('click', clickHandler);

