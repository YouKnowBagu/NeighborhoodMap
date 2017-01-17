// I went through quite a few iterations of this.  At first I wanted to add the ability for users to add markers to the map that would then display FourSquare location data.  I nearly had this working, but for places with multiple locations (e.g. McDonald's, Starbucks, etc), each marker would display EVERY locatoin's infoWindow, stacked on top of each other.  I spent some time trying to work that out but decided to focus on getting the MVP working.
'use strict';
// var testVenues = [
// 	{
// 		Name: 'Utah State Capitol',
// 		address: "Test address street road",
// 		url: "www.website.com",
// 		number:"404-404-4404"
// 	},
// 	{
// 		Name: "Red Butte Trail",
// 		address: "Test address street road",
// 		url: "www.website.com",
// 		number:"404-404-4404"
// 	},
// 	{
// 		Name:"Sean's house",
// 		address:"Sean's address",
// 		url: "seanpsampson.com",
// 		number: "404-404-4404"
// 	}];
//FourSquare keys
// var	clientID = "LNIAGQRXCOHRU0NUYS50R2KQC1SVITFKR1YRFXQ0XC5DOSHZ";
// var	clientSecret = "1VN1YABW1IHLXRJKQSWZ5KWVRMJVSKQWR35IBDXSIITCXEZV";
//Global var def
var map;

//Venue Model
// var viewModel = {
// 		venues:
// 		[{
// 			Name: 'Utah State Capitol',
// 			address: "Test address street road",
// 			url: "www.website.com",
// 			number:"404-404-4404"
// 		},
// 		{
// 			Name: "Red Butte Trail",
// 			address: "Test address street road",
// 			url: "www.website.com",
// 			number:"404-404-4404"
// 		},
// 		{
// 			Name:"Sean's house",
// 			address:"Sean's address",
// 			url: "seanpsampson.com",
// 			number: "404-404-4404"
// 		}]
// 	};
	// var self = this;
    //Stuff here


    //  var fourSquareUrl = //TODO Get URL JSON Query
	// $.getJSON(fourSquareUrl).done(function(data) {
	// 	var results = data.response.venues[0];
	//
	// 	}
	// }).fail(function() {
	// 	alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
	// });
	//
	// //TODO Determine InfoWindow content
	// this.content
	//
	// this.infoWindow = new google.maps.InfoWindow({content: self.content});
	//
	// this.marker = new google.maps.Marker({
	// 		//Marker Stuff here.  Name, position, etc.
	// });



	// this.marker.addListener('click', function(){
	// 	//infoWindow content stuff here
	// 	,
	//
    //     self.infoWindow.setContent(self.content);
	//
	// 	self.infoWindow.open(map, this);
	//
	//
	// });
// };
// var ViewModel = function() {
// 	var self = this;
// 	this.searchBox = ko.observable("");
// 	this.venues = ko.observableArray(venues);
// 	//Initialize map centered on Utah Capitol
    // map = new google.maps.Map(document.getElementById('map'), {
    //         center: {
    //             lat: 40.777,
    //             lng: -111.888
    //         },
    //         zoom: 14
    //     });
// 			testItems.forEach(function(testItem){
// 				self.testArray.push( new Venue(testItem));
// 			});
//
// //Beginnings of search filter
// 	this.filtering = ko.computed( function() {
//
// 	//Grab Map Element
	// this.mapElem = document.getElementById('map');
// 	this.mapElem.style.height = window.innerHeight - 50;
//     }
var viewModel = {
  items: [ { Name: "Burger" }, { Name: "Fries" }, { Name: "Apple" }, { Name: "Salad" }, { Name: "Potatoes" }, { Name: "Mac n' Cheese" } ]
};

viewModel.Query = ko.observable('');

viewModel.searchResults = ko.computed(function() {
    var q = viewModel.Query().toLowerCase();
    return viewModel.items.filter(function(i) {
      return i.Name.toLowerCase().indexOf(q) >= 0;
    });
  });

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 40.777,
                    lng: -111.888
                },
                zoom: 14
            });
};

ko.applyBindings(viewModel);