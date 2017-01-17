'use strict';

var map;
// FourSquare keys
var clientID = "LNIAGQRXCOHRU0NUYS50R2KQC1SVITFKR1YRFXQ0XC5DOSHZ";
var clientSecret = "1VN1YABW1IHLXRJKQSWZ5KWVRMJVSKQWR35IBDXSIITCXEZV";
var versionDate = "20170116";

var Venues = function(data) {
    var self = this;
    this.restaurantName = data.restaurantName;
    this.address = "";
    this.number = "";
    this.lat = data.lat;
    this.lng = data.lng;
    this.visible = ko.observable(true);

    var fourSquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + versionDate + "&ll=" + this.lat + "," + this.lng + ",&query=" + this.restaurantName;

    $.getJSON(fourSquareUrl).done(function(data) {
        var info = data.response.venues[0];
        self.address = info.location.formattedAddress;
        self.number = info.contact.formattedPhone;
    });

    this.contentString = "<div class='infoWindow'><div class='restaurantName'>" + data.restaurantName + "</div>" + "<div class='info'>" + self.address + "</div>" +
        "<div class='info'>" + self.number + "</div></div>";

    this.infoWindow = new google.maps.InfoWindow({
        content: self.contentString
    });

    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.lat, self.lng),
        map: map,
        name: data.restaurantName
    });
    this.showMarker = ko.computed(function() {
        if (this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);

    this.marker.addListener('click', function() {
        self.contentString = '<div class="infoWindow"><div class="restaurantName"><b>' + data.restaurantName + "</b></div>" +
            '<div class="info">' + self.address + "</div>" +
            '<div class="info">' + self.number + '</div></div>';

        self.infoWindow.setContent(self.contentString);

        self.infoWindow.open(map, this);

        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 2100);
    });

    this.bounce = function(place) {
        google.maps.event.trigger(self.marker, 'click');
    };
};
//Venue Model
// var viewModel = {
// 		venues:
// 		[{
// 			restaurantName: 'Utah State Capitol',
// 			address: "Test address street road",
// 			url: "www.website.com",
// 			number:"404-404-4404"
// 		},
// 		{
// 			restaurantName: "Red Butte Trail",
// 			address: "Test address street road",
// 			url: "www.website.com",
// 			number:"404-404-4404"
// 		},
// 		{
// 			restaurantName:"Sean's house",
// 			address:"Sean's address",
// 			url: "seanpsampson.com",
// 			number: "404-404-4404"
// 		}]
// 	};
// var self = this;
//Stuff here



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
// 		//Marker Stuff here.  restaurantName, position, etc.
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

// 	//Grab Map Element
// this.mapElem = document.getElementById('map');
// 	this.mapElem.style.height = window.innerHeight - 50;
//     }
var allVenues = [{
    restaurantName: "Pago",
    lat: 40.750139,
    lng: -111.865595
}];

function viewModel() {
    var self = this;
    this.Query = ko.observable('');
    this.modelArray = ko.observableArray([]);

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.777,
            lng: -111.888
        },
        zoom: 14
    });
    allVenues.forEach(function(venue) {
        self.modelArray.push(new Venues(venue));
    });
    this.filteredList = ko.computed(function() {
        var filter = self.Query().toLowerCase();
        if (!filter) {
            self.modelArray().forEach(function(venue) {
                venue.visible(true);
            });
            return self.modelArray();
        } else {
            return ko.utils.arrayFilter(self.modelArray(), function(venue) {
                var string = venue.restaurantName.toLowerCase();
                var result = (string.search(filter) >= 0);
                venue.visible(result);
                return result;
            });
        }
    }, self);


    // self.searchResults = ko.computed(function() {
    //     var q = self.Query();
    //     return self.modelArray.forEach.filter(function(i) {
    //       return i.restaurantName.toLowerCase().indexOf(q) >= 0;
    //     });
    //   });


}

function startApp() {
    ko.applyBindings(new viewModel());
}

function anError() {
    alert("Agh!");
}