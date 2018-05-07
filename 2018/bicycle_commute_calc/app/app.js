/* app.js */

var app = angular.module('App', []);

app.controller('AppController', ['$scope', '$http',

    function($scope, $http) {

      $scope.to_latlng = {
        "lat": 35.706043,
        "lng": 139.651444,
        "name": 'ヴァル研究所'
      };

      /*
       * 2点の緯度経度の距離を計算する(Qiita)
       * https://qiita.com/collapsar/items/7311adac703606967a48
       */
      // 世界観測値系
      var GRS80_A  = 6378137.000;         // 長半径 a(m)
      var GRS80_E2 = 0.00669438002301188; // 第一遠心率 eの2乗

      function deg2rad(deg) {
        return deg * Math.PI / 180.0;
      }

      function calc_distance(lat1, lng1, lat2, lng2) {
        var my = deg2rad((lat1 + lat2) / 2.0); // 緯度の平均値
        var dy = deg2rad(lat1 - lat2); // 緯度の差
        var dx = deg2rad(lng1 - lng2); // 経度の差

        // 卯酉線曲率半径を求める(東と西を結ぶ線の半径)
        var sin_my = Math.sin(my);
        var w = Math.sqrt(1.0 - GRS80_E2 * sin_my * sin_my);
        var n = GRS80_A / w;

        // 子午線曲線半径を求める(北と南を結ぶ線の半径)
        var mnum = GRS80_A * (1 - GRS80_E2);
        var m = mnum / (w * w * w);

        //ヒュベニの公式
        var dym = dy * m;
        var dxncos = dx * n * Math.cos(my);

        return Math.sqrt(dym * dym + dxncos * dxncos);
      }

      // initialize
      $scope.init = function() {

        // ヴァル研究所を地図の中心に表示させる。
        $scope.mymap = L.map('mapid', {
          center: [$scope.to_latlng.lat, $scope.to_latlng.lng],
          zoom: 18
        });
        L.control.scale().addTo($scope.mymap);
        L.marker([$scope.to_latlng.lat, $scope.to_latlng.lng]).addTo($scope.mymap).bindPopup($scope.to_latlng.name).openPopup();

        // 2,5,10km毎に範囲を色つきの円で塗りつぶす。
        L.circle([$scope.to_latlng.lat, $scope.to_latlng.lng], {radius: (1000 *  2), color: "#0000FF", opacity: 0.001}).addTo($scope.mymap);
        L.circle([$scope.to_latlng.lat, $scope.to_latlng.lng], {radius: (1000 *  5), color: "#0000FF", opacity: 0.002}).addTo($scope.mymap);
        L.circle([$scope.to_latlng.lat, $scope.to_latlng.lng], {radius: (1000 * 10), color: "#0000FF", opacity: 0.004}).addTo($scope.mymap);

        // OpenStreetMapで使用する地図のCopyright表示。
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
          id: 'mapbox.streets'
        }).addTo($scope.mymap);

        // 地図上でクリックした個所まで線を引く。
        $scope.mymap.on('click', function(e) {
          console.log(e);
          var line = L.polyline([
              [$scope.to_latlng.lat, $scope.to_latlng.lng],
              [e.latlng.lat, e.latlng.lng]
            ], {
              "color": "#FF0000",
              "weight": 10,
              "opacity": 0.6
            });

          line.on('mouseover', function() {
            // 
          });

          line.addTo($scope.mymap);

          // 距離を計算する。
          var distance = calc_distance($scope.to_latlng.lat, $scope.to_latlng.lng, e.latlng.lat, e.latlng.lng);
          console.log(distance);
        });
      }

      $scope.init();
   }
]);

