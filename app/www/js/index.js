/*
 * MIT Lisence 
 * masa8
 */
var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var sw = L.latLng(31.543431,130.586243),
         ne = L.latLng(31.637014,130.730438),
        bounds = L.latLngBounds(sw,ne);
        var map = L.map('map', {center: [31.5926, 130.60006], zoom: 16, touchZoom: false, maxBounds: bounds});
        
        L.tileLayer('./img/map/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 17,
                    minZoom: 12
                    }).addTo(map);
        
        
     
        var orig = [
	 {name:"赤水港",imagefile:"img/akamizu.jpg", lnglat:[130.608344, 31.573622]},
         {name:"野尻港",imagefile:"img/nojiri.jpg", lnglat:[130.619797, 31.561515]},
         {name:"持木港",imagefile:"img/mochigi.jpg", lnglat:[130.627906, 31.556953]},
         {name:"湯之港",imagefile:"img/yuno.jpg", lnglat:[130.632950, 31.553203]},
         {name:"下村港",imagefile:"img/shimomura.jpg", lnglat:[130.647176, 31.549895]},
         {name:"宮下港",imagefile:"img/miyashita2.jpg", lnglat:[130.650859, 31.550483]},
         {name:"有村港",imagefile:"img/arimura.jpg", lnglat:[130.662642, 31.551941]},
         {name:"塩屋ヶ元港",imagefile:"img/shioyagamoto.jpg", lnglat:[130.708722, 31.582562]},
         {name:"宇土港",imagefile:"img/udo.jpg", lnglat:[130.710357, 31.598637]},
         {name:"浦之前港",imagefile:"img/uranomae.jpg", lnglat:[130.708468, 31.607813]},
         {name:"新島港",imagefile:"img/logo.png", lnglat:[130.721445, 31.618864]},
         {name:"園山港",imagefile:"img/sonoyama2.jpg", lnglat:[130.701811, 31.614549]},
         {name:"高免港",imagefile:"img/takamen.jpg", lnglat:[130.683009, 31.624274]},
         {name:"白浜港",imagefile:"img/shirahama.jpg", lnglat:[130.664738, 31.626236]},
         {name:"二俣港",imagefile:"img/futamata.jpg", lnglat:[130.658639, 31.625847]},
         {name:"松浦港",imagefile:"img/matsuura.jpg", lnglat:[130.650307, 31.622874]},
         {name:"西道港",imagefile:"img/saidou.jpg", lnglat:[130.638280, 31.620661]},
         {name:"藤野港",imagefile:"img/fujino.jpg", lnglat:[130.624634, 31.619504]},
         {name:"武港",imagefile:"img/take.jpg", lnglat:[130.617345, 31.612896]},
         {name:"長谷港",imagefile:"img/hase.jpg", lnglat:[130.608972, 31.603905]},
         {name:"赤生原港",imagefile:"img/akoubaru.jpg", lnglat:[130.605235, 31.597087]},
         {name:"桜島港",imagefile:"img/logo.png", lnglat:[130.600109, 31.592518]}]
        
        var data  = [];
        
        for( var i = 0; i < orig.length; i++){
            data.push({
                "type": "Feature",
                "properties":{
                    "title":orig[i].name,
                      "desc":"",
                    "image":orig[i].imagefile},
                "geometry": {
                    "type": "Point",
                    "coordinates":orig[i].lnglat
                      }
                      });
            
        }
        
        L.Icon.Default.imagePath = 'css/images';
        var geo_layer = L.geoJson(data,{ onEachFeature:function(f,l){
                                l.bindPopup(
                                           f.properties.title);
                                l.on("click",function(){
                                               document.getElementById("title").innerText = f.properties.title;
                                               document.getElementById("description").innerText = f.properties.desc;
                                               document.getElementById("image").setAttribute("src",f.properties.image);
                                     
                                     });
                  
                  $("#midokoro").append('<li lng="'+ f.geometry.coordinates[0] + '" lat="' + f.geometry.coordinates[1] + '" ><a href="#"  >' + f.properties.title + '</a></li>').listview().listview('refresh');

                                    
                                  }});
        geo_layer.addTo(map);
        
        
        // Click on the List in Side panel
        $(document).on("click", '#midokoro  li', function(event) {
                       $("#midokoro_panel").panel("close");
                       var selected = L.latLng($(this).attr("lat"),$(this).attr("lng"));
                       map.panTo(selected);
                       geo_layer.eachLayer(function(marker){
                       if ( marker.getLatLng().equals( selected )){
                                           marker.fire('click');
                        }
                                           
                                           });
         }
        );
    
    }

};

app.initialize();
