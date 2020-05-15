'use strict';

// Global Variables
var parent1 = document.getElementById('mall');
var uniqueIndexArray = [];
var allItems = [];
var clickCount = 0;
var maxClicks = 25;
var names = [];
var votes = [];
var views = [];
// check our Local Storage to see if we have an array of products
// if it looks in there and sees nothing in that key it returns a false
if (localStorage.getItem('items') === null) {
  // if we do NOT
  // we need to instantiate our object instances for the first time like we have
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
  // if we DO have products in local storage
  // get them out
  var localStorageItems = localStorage.getItem('items');
  // parse them
  var parsedLocalStorageArray = JSON.parse(localStorageItems);
  // connect them back to our contructor
  for (var i = 0; i < parsedLocalStorageArray.length; i++){
    new ItemImage(parsedLocalStorageArray[i].title, parsedLocalStorageArray[i].filePath.slice(parsedLocalStorageArray[i].filePath.length-4), parsedLocalStorageArray[i].views, parsedLocalStorageArray[i].votes);
  }
  // use this as our allItems array

}

// Constructor Function for Images
function ItemImage(name, extension, views=0, votes=0) {
  this.filePath = `imgs/${name}${extension}`;
  this.alt = name;
  this.title = name;
  this.votes = votes;
  this.views = views;
  allItems.push(this);
}






// render images to the page function
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

// display a random image
function displayImage() {
  var index = getRandomItem();
  allItems[index].render();
}


// renders results of what user has input onto a UL
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
getRandomItem();

// Makes a new set of images generate when clicked, and stops after 25 rounds
function clickHandler(event) {
  parent1.textContent = ('');
  var titleOfItemThatWasClickedOn = event.target.title;

  for (var i = 0; i < allItems.length; i++) {
    if (titleOfItemThatWasClickedOn === allItems[i].title) {
      allItems[i].votes++;
      clickCount++;

      // save our all ITems array into local storage
      var stringifiedAllItemsArray = JSON.stringify(allItems);
      localStorage.setItem('items',stringifiedAllItemsArray);


      if (clickCount === maxClicks) {
        //call get random item function to genrate new items with a click
        // we need to remove event listeners from parent1
        alert('Thanks for Voting! Your voting results are below!');
        parent1.removeEventListener('click', clickHandler);
        // call results function
        showResults();
        makeNameArray();

      }
    }
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
    views.push(allItems[i].views);
  }

  generateChart();
}

// Makes the results chart on bottom of the page
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

