var google =  {
    maps : {
        OverlayView : function () {
        },
        Marker : function () {
        },
        InfoWindow : function () {
        },
        getBounds: function(){
          return {
            getNorthEast:function(){
              return {
                lat: function(){ return 44},
                lng: function(){ return 1}
              }
            },
            getSouthWest:function(){
              return {
                lat: function(){ return 50},
                lng: function(){ return 10}
                }
            }
          }
        },
        getZoom:function(){ return 8}
    }
}