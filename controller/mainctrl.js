var app = angular.module("payroll", ['ngRoute','angularjs-dropdown-multiselect','ngStorage','oc.lazyLoad']);

 app.service('apiurl', function () {
    var apipath = 'http:/10.70.3.194:3001/';
		// var apipath = 'http://exam.aditya.ac.in:3002/api/';
		return {
			getUrl: function() {
				return apipath;
			}
		}
		
    });

	/*app.run(function($rootScope) {
         $rootScope.apipath = "http://api.aditya.ac.in:3009/api/";
      });*/
  app.filter('unique', function() {
   return function(collection, keyname) {
      var output = []; 
        angular.forEach(collection, function(item) {
			if(output.indexOf(item[keyname]) === -1) 
				output.push(item[keyname]);
      });
      return output;
   };
});
  
  app.filter('sumByColumn', function () {
      return function (collection, column) {
        var total = 0;

        collection.forEach(function (item) {
          total += parseInt(item[column]);
        });

        return total;
      };
    });
app.config([ "$ocLazyLoadProvider", function($ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
		    'debug': true, // For debugging 'true/false'
		    'events': true, // For Event 'true/false'
		    'modules': [{ // Set modules initially
		        name : 'dashboard', // State1 module
		        files: ['controller/dashboard.js']
		    },
			{ // Set modules initially
		        name : 'questionmaster', 
		        files: ['controller/questionmaster.js']
		    },
        { 
          name : 'emploeeupdate', 
          files: ['controller/emploeeupdate.js']
      },
      { 
        name : 'emploeetabs', 
        files: ['controller/emploeetabs.js']
      },
      { 
        name : 'emploeesalaryattr', 
        files: ['controller/emploeesalaryattr.js']
      },
      { 
        name : 'emploeeidproof', 
        files: ['controller/emploeeidproof.js']
      }]
		});
   }]);
app.config(function($routeProvider) {
	$routeProvider
		.when('/dashboard', {
			templateUrl: 'html/dashboard.html',
			controller: 'Dashboard',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('dashboard'); // Resolve promise and load before view 
            }]
         }
		})
		.when('/questionmaster', {
			templateUrl: 'html/questionmaster.html',
			controller: 'questionmaster',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('questionmaster'); // Resolve promise and load before view 
            }]
         }
		})
    .when('/emploeeupdate/:paycode', {
			templateUrl: 'html/emploeeupdate.html',
			controller: 'emploeeupdate',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('emploeeupdate'); // Resolve promise and load before view 
            }]
         }
		})
    .when('/emploeetabs', {
			templateUrl: 'html/emploeetabs.html',
			controller: 'emploeetabs',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('emploeetabs'); // Resolve promise and load before view 
            }]
         }
		})
    .when('/emploeesalaryattr', {
			templateUrl: 'html/emploeesalaryattr.html',
			controller: 'emploeesalaryattr',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('emploeesalaryattr'); // Resolve promise and load before view 
            }]
         }
		})
    .when('/emploeeidproof', {
			templateUrl: 'html/emploeeidproof.html',
			controller: 'emploeeidproof',
      resolve: {
            LazyLoadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('emploeeidproof'); // Resolve promise and load before view 
            }]
         }
		})
		.otherwise({
			redirectTo: '/dashboard'
		});
}).run(['$rootScope', '$location', function($rootScope, $location){
   var path = function() { return $location.path();};
   $rootScope.$watch(path, function(newVal, oldVal){
     $rootScope.activetab = newVal;
   });
   }]);

