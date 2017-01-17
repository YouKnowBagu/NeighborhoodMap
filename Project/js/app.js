'use strict';



var map;
// FourSquare keys
var clientID = "LNIAGQRXCOHRU0NUYS50R2KQC1SVITFKR1YRFXQ0XC5DOSHZ";
var clientSecret = "1VN1YABW1IHLXRJKQSWZ5KWVRMJVSKQWR35IBDXSIITCXEZV";
var versionDate = "20170116";

var Venues = function(data) {
    var self = this;
    this.Name = data.Name;
    this.Address = "";
    this.Number = "";
    this.Lat = data.Lat;
    this.Lng = data.Lng;
    this.visible = ko.observable(true);

    var fourSquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + versionDate + "&ll=" + this.Lat + "," + this.Lng + ",&query=" + this.Name;

    $.getJSON(fourSquareUrl).done(function(data) {
        var info = data.response.venues[0];
        self.Address = info.location.formattedAddress;
        self.Number = info.contact.formattedPhone;
    });

    this.contentString = "<div class='infoWindow'><div class='name'>" + data.Name + "</div>" + "<div class='info'>" + self.Address + "</div>" +
        "<div class='info'>" + self.Number + "</div></div>";

    this.infoWindow = new google.maps.InfoWindow({
        content: self.contentString
    });

    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.Lat, self.Lng),
        map: map,
        title: data.Name
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
        self.contentString = '<div class="infoWindow"><div class="name"><b>' + data.Name + "</b></div>" +
            '<div class="info">' + self.Address + "</div>" +
            '<div class="info">' + self.Number + '</div></div>';

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

// 	//Grab Map Element
// this.mapElem = document.getElementById('map');
// 	this.mapElem.style.height = window.innerHeight - 50;
//     }
var allVenues = [{
    Name: "Pago",
    Lat: 40.750139,
    Lng: -111.865595
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
                var string = venue.Name.toLowerCase();
                var result = (string.search(filter) >= 0);
                venue.visible(result);
                return result;
            });
        }
    }, self);

    this.mapElem = document.getElementById('map');
    this.mapElem.style.height = window.innerHeight - 50;
    // self.searchResults = ko.computed(function() {
    //     var q = self.Query();
    //     return self.modelArray.forEach.filter(function(i) {
    //       return i.Name.toLowerCase().indexOf(q) >= 0;
    //     });
    //   });


}

function startApp() {
    ko.applyBindings(new viewModel());
}

function anError() {
    alert("Agh!");
}