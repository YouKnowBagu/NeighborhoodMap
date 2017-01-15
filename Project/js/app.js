// I went through quite a few iterations of this.  At first I wanted to add the ability for users to add markers to the map that would then display FourSquare location data.  I nearly had this working, but for places with multiple locations (e.g. McDonald's, Starbucks, etc), each marker would display EVERY locatoin's infoWindow, stacked on top of each other.  I spent some time trying to work that out but decided to focus on getting the MVP working.
'use strict';
var testItems = [
	{
		name: 'Utah State Capitol',
		lat: 40.777,
		lng: -111.888
	},
	{
		name: "Red Butte Trail",
		lat: 40.7659,
		lng: -111.8225
	}
//FourSquare keys
var	clientID = "LNIAGQRXCOHRU0NUYS50R2KQC1SVITFKR1YRFXQ0XC5DOSHZ";
var	clientSecret = "1VN1YABW1IHLXRJKQSWZ5KWVRMJVSKQWR35IBDXSIITCXEZV";
//Global var def
var map;

//Venue Model
var Venue = function(data) {
	var self = this;
    //Stuff here


     var fourSquareUrl = //TODO Get URL JSON Query
	$.getJSON(fourSquareUrl).done(function(data) {
		var results = data.response.venues[0];

		}
	}).fail(function() {
		alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
	});

	//TODO Determine InfoWindow content
	this.content

	this.infoWindow = new google.maps.InfoWindow({content: self.content});

	this.marker = new google.maps.Marker({
			//Marker Stuff here.  Name, position, etc.
	});



	this.marker.addListener('click', function(){
		//infoWindow content stuff here
		,

        self.infoWindow.setContent(self.content);

		self.infoWindow.open(map, this);


	});
};
var viewModel = function() {
	var self = this;
	this.searchBox = ko.observable("");
	this.testArray = ko.observableArray([]);
	//Initialize map centered on Utah Capitol
    map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.777,
                lng: -111.888
            },
            zoom: 14
        });
			testItems.forEach(function(testItem){
				self.testArray.push( new Venue(testItem));
			});

//Beginnings of search filter
	this.filtering = ko.computed( function() {

	//Grab Map Element
	this.mapElem = document.getElementById('map');
	this.mapElem.style.height = window.innerHeight - 50;
    }

//Start knockout
ko.applyBindings(new viewModel());
