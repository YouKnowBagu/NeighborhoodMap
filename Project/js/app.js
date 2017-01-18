'use strict';

var map;
//FourSquare info
var clientID = "LNIAGQRXCOHRU0NUYS50R2KQC1SVITFKR1YRFXQ0XC5DOSHZ";
var clientSecret = "1VN1YABW1IHLXRJKQSWZ5KWVRMJVSKQWR35IBDXSIITCXEZV";
// Version date of FourSquare.  Stable as of this date.  Change at your own risk!
var versionDate = "20170116";
// infoWindow control, to close infoWindow when a new one is opened.
var currentInfoWindow = null;

var allVenues = [{
    restaurantName: "Pago",
    lat: 40.750139,
    lng: -111.865595
},
{   restaurantName: "Mazza",
    lat: 40.7515388,
    lng: -111.866192
},
{
    restaurantName:"Cafe Niche",
    lat: 40.7631848,
    lng: -111.8707216
},
{
    restaurantName:"Publik Kitchen",
    lat: 40.7500749,
    lng: -111.8664014
},{
    restaurantName:"East Liberty Tap House",
    lat: 40.749502,
    lng: -111.8687297
},{
    restaurantName:"The Spaghetti Factory",
    lat: 40.701906,
    lng: -111.9781553
},{
    restaurantName:"Cafe Trio",
    lat: 40.6946403,
    lng: -111.9051617
},
{
    restaurantName:"Current Fish and Oyster",
    lat: 40.7631715,
    lng: -111.8850539
},
{
    restaurantName:"Rye",
    lat: 40.7637479,
    lng: -111.8785643
}
];

var Venues = function(data) {
    var self = this;
    this.restaurantName = data.restaurantName;
    this.address = "";
    this.number = "";
    this.lat = data.lat;
    this.lng = data.lng;

    var fourSquareUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + versionDate + "&ll=" + this.lat + "," + this.lng + ",&query=" + this.restaurantName;

    $.getJSON(fourSquareUrl).done(function(data) {
        var info = data.response.venues[0];
        self.address = info.location.formattedAddress;
        if (info.contact.formattedPhone !== undefined) {
        self.number = info.contact.formattedPhone;
    };
    })
        .fail(function() {
            alert("Error retrieving FourSquare information.  Please refresh the page to try again.")
        });

    this.infoWindow = new google.maps.InfoWindow({
    });

    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.lat, self.lng),
        map: map,
        name: data.restaurantName
    });

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
    //When clicking on list item, bounce appropriate marker and pan to location
    this.bounce = function(venueItem) {
        google.maps.event.trigger(self.marker, 'click');
        map.panTo(new google.maps.LatLng(self.lat, self.lng));
    };
};

function viewModel() {
    var self = this;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.777,
            lng: -111.888
        },
        zoom: 14
    });

    this.query = ko.observable('');
    //Holds newly created Venues
    this.modelArray = ko.observableArray([]);
    //Create venue from Venues template
    allVenues.forEach(function(venue) {
        self.modelArray.push(new Venues(venue));
    });

    //Filter list of restaurants based on user input
    this.filteredList = ko.computed(function() {
        return self.modelArray().filter(function(venue) {
            var filtered = self.query().toLowerCase();
            if (venue.restaurantName.toLowerCase().indexOf(filtered) >= 0) {
                venue.marker.setMap(map);
                venue.marker.addListener('click', function() {
                    if (currentInfoWindow != null) {
                        currentInfoWindow.close();
                    }
                venue.infoWindow.open(map, this);
                currentInfoWindow = venue.infoWindow;
                });
                return true;
            } else {
                venue.marker.setMap(null);
                return false;
            }
        });
    });
}

//Callback for google maps is startApp, then apply bindings to viewwModel
function startApp() {
ko.applyBindings(new viewModel());
}

function errorHandler() {
    alert("Error initializing Google Maps.");
}