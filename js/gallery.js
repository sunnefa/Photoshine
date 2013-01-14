//as soon as the window loads we need to do stuff
window.onload = init;

//global variables
//gets all the img tags on the page into a nodelist
var element = document.getElementsByTagName("img");
//starts the picture counter at 0
var inc = 0;
//sets the variable for the picture array
var array = [];

//makes an array out of the nodelist and removes the thumbs/ from the path
function sortArray() {
	//push every element in the nodelist into an array
	for (i = 0; i < element.length; i++) {
		array.push(element[i].src);	
	}
	//split every item in the array into another array by the "/"
	for(k = 0; k < array.length; k++) {
		var split = array[k].split("/");
		//remove them thumbs from every item in the array
		for(j = 0; j < 	split.length; j++) {
			if(split[j] == "thumbs") {
				split.splice(j,1);	
			}
		}
		//join the previously created array back together
		split = split.join("/");
		//replace the items in the original array with the updated items
		array.splice(k, 1, split);
	}
	//return the array for future use
	return array;	
}

//we need to do a few things as soon as the page loads
function init() {
	//this calls the function to sort the image array
	sortArray();
	//this calls the function to set the slideshow in the right place and show the next and previous buttons
	slide();
	//for every image tag on the page, we want to initiate the function full on mouse over
	for(i = 0; i < element.length; i++) {
		//this way copies the function to the element so the element becomes its owner. that allows us to use the "this" keyword
	element[i].onmouseover = full;
	}
	//we need to initiate the slideshow function when someone clicks the element with the id play
	document.getElementById("play").onclick = slideshow;
}

//this sets up the next and previous links for the random slideshow
function slide() {
	//gets the element the slides are displayed in
	var slides = document.getElementById("slides");
	//this sorts the array randomly. Every time the page is loaded the array is randomized again
	array.sort(function(){return Math.floor(Math.random()*array.length)})
	//this sets the first image in the random array as a background image on the slide display. it's a background image because the script is gathering all img elements on the page and would therefore gather this one too
	slides.style.background = "url(" + array[inc] + ") no-repeat";
	//when we click the next and previous buttons we call the functions nextpic and prevpic respectively
	document.getElementById("prev").onclick = function() {nextpic(slides,array);};
	document.getElementById("next").onclick = function() {prevpic(slides,array);};
		
}

//this function is called when the next button is pressed
function nextpic(slides,array) {
	//this increments the counter by one and makes sure that number is a percentage of the array length to make sure it doesn't exceed that
	inc = ++inc % array.length;
	//just to make sure, this checks to see if the counter is equal to the array length and sets the counter to zero if it is
	if(inc == array.length) {
		inc = 0;
	}
	//this sets the background image of the slide element to the item in the array that corresponds to the value of the counter
	slides.style.background = "url(" + array[inc] + ") no-repeat";
}

//this function is called when the previous button is pressed
function prevpic(slides,array) {
	//this decrements the counter by one and makes sure that number is a percentage of the array length to make sure it doesn't go below that
	inc = --inc % array.length;
	//just to make sure this check to see if the counter is below zero and if it is set it to the value of the last array item
	if(inc < 0) {
		inc = array.length-1;
	}
	//this sets the background image of the slide element to the item in the array that corresponds to the value of the counter
	slides.style.background = "url(" + array[inc] + ") no-repeat";
}

//this function is called when the play button is pressed
function slideshow () { 
	//get the element of the slides
	var slides = document.getElementById("slides");
	//set the interval. The anonymous function sets the background image of the style to the item in the array that corresponds to the value of the counter, then increments the counter and checks if the counter is larger than or equal to the array length and sets it to zero if it is. The interval is 3000 milliseconds which is three seconds
	var delay = setInterval(function() {++inc; if(inc == array.length) inc = 0; slides.style.background = "url(" + array[inc] + ") no-repeat";}, 3000);
	//when the play button is pressed the background image is changed to pause
	document.getElementById("play").style.background = "url(images/pause.jpg)";
	//when the play button is clicked the pause function is called
	document.getElementById("play").onclick = function() {pause(delay);};
}

//this function is called when the pause button is pressed
function pause(delay) {
	//this clears the interval to stop the slideshow
	clearInterval(delay);
	//this changes the pause button back to the play button
	document.getElementById("play").style.background = "url(images/play.jpg)";
	//when the play button is clicked again we want to start the slideshow again	
	document.getElementById("play").onclick = slideshow;
}
	
//this function is called whenever the mouse is over the little thumbnails and displays a larger image in the middle
function full() {
	//this gets the src of the current element and makes it into an array split by the /
	var sliced = this.src.split("/");
	//this is the array of categories used
	var cats = new Array("2009", "2010");
	//two variables that we are going to use later on
	var elem;
	var delay;
	
	//we want to remove the thumbs from the src to be able to display the larger image
	for(i = 0; i < sliced.length; i++) {
		if(sliced[i] == "thumbs") {
			sliced.splice(i,1);	
		}
		//we want to make sure that the larger image is dispayed in the right box
		for(k = 0; k < cats.length; k++) {
			if(sliced[i] == cats[k]) {
				elem = document.getElementById(cats[k]);
			}
		}
	}
	//we need to join the sliced up array back together and separate the items by /
	sliced = sliced.join("/");
	//creates an image inside the right box where the src is equal to the src minus thumbs
	elem.innerHTML = '<img src="' + sliced + '" />';
	//sets a time out for the larger images. The anonymous function calls a function that takes arguments which clears away the image after ten seconds
	delay = setTimeout(function(){clear(elem, delay)}, 10000);

}

//this function is called after the large image has been displayed for ten seconds and puts a paragraph inside the box
function clear(elem, delay) {
	clearTimeout(delay);
	elem.innerHTML = "<p>Hover over the images to view a larger version</p>";
}