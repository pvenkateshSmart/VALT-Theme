angular.module('payroll').controller('questionmaster', function ($scope, $http, $filter, $location, $localStorage, $window, $route, $rootScope, apiurl) {


	if (!$window.localStorage.getItem('logindata')) {
		window.location.href = 'login.html';

	}
	$scope.userdata = JSON.parse($window.localStorage.getItem('logindata'));

	//console.log($scope.userdata);

	$scope.logountnow = function () {
		window.localStorage.removeItem('logindata');
		window.location.href = 'login.html';
	}


	var apiurl = apiurl.getUrl();
	//console.log(apiurl);
	//var apiurl = "http://10.60.1.19:3000/api/";
	$scope.listdiv = 0;

	$http.get('http://localhost:3001/Questionmaster/tags/').success((data) => {
		console.log(data)
		$scope.Tagnames = data;
	});

	
	$http.get('http://localhost:3001/Questionmaster/').success((data) => {
			//console.log(data)
			$scope.Qdata = data;
		});
	$scope.selectsearch=function(p,t){
		console.log(p,t);
		 if(t==undefined){
			var apset=p+'/null/';
		 }else if(p==undefined){
			var apset='null/'+t;
		 }
		else{
			var apset=p+'/'+t;
		}
		//console.log('http://localhost:3001/Questionmaster/'+apset);
		$http.get('http://localhost:3001/Questionmaster/'+apset).success((data) => {
			//console.log(data)
			$scope.Qdata = data;
		});
	}
	$scope.onloadapis = function(){
		$('.select2').select2()
		tagin( document.querySelector('.tagin') );
		$http.get('http://localhost:3001/Questionmaster').success((data) => {
		//console.log(data)
		$scope.Qdata = data;
	});

	$http.get('http://10.70.3.194:3001/questiontypes').success((data) => {
		
		
		// for (const el of document.querySelectorAll('.tagin')) {
		// 	tagin(el)
		//   }	 
		//console.log(data);
		$scope.qtypes = data;
	})


	$http.get('http://10.70.3.194:3001/Programs').success((data) => {
		//console.log(data);
		$scope.programs = data;

	})

	$http.get('http://10.70.3.194:3001/Levels').success((data) => {
		//console.log(data);
		$scope.levels = data;

	})

	$http.get('http://10.70.3.194:3001/Topics').success((data) => {
		//console.log(data);
		$scope.topics = data;

	})
	}



	jQuery.validator.addMethod("noSpace", function (value, element) {
		return value.indexOf(" ") < 0 && value != "";
	}, "spaces not allowed");
	$("#primaryinfo").validate({
		rules: {
			paycode: {
				required: true,
				noSpace: true,
				digits: true
			},
			campusName: {
				required: true
			},
			category: {
				required: true
			},
			empName: {
				required: true
			},
			gender: {
				required: true
			},
			mobileNo: {
				required: true,
				digits: true,
				minlength: 10,
				maxlength: 10
			}
		},
		messages: {
			paycode: {
				required: 'Please enter Pay Code',
				digits: 'Enter numbers only'
			},
			campusName: {
				required: "Please Select campus name",
			},
			category: {
				required: 'Please select category'
			},
			empName: {
				required: "Please enter employee name"
			},
			gender: {
				required: "Please select gender"
			},
			mobileNo: {
				required: 'Mobile number is required',
				number: "Provide mobile number",
				digits: 'Enter numbers only',
				minlength: 'Enter a 10 digits phone number',
				maxlength: 'Enter a 10 digits phone number'
			}
		},
		errorElement: 'span',
		errorPlacement: function (error, element) {
			error.addClass('invalid-feedback');
			element.closest('.form-group').append(error);
		},
		highlight: function (element, errorClass, validClass) {
			$(element).addClass('is-invalid');
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).removeClass('is-invalid');
		}
	});


	
 
	$scope.Actionprocess = function (qid) {
		if (qid == undefined) {
			$scope.listdiv = 1;
		} else {
			// 	$http.put("http://localhost:3001/Questionmaster/"+qid).success((data) => {
			// 	console.log(data);
			// 	$scope.Que=data;
			// })
		}
	}

	// $('.select2').on('change', function() {
	// 	//var data = $(".select2 option:selected").text();
	// 	var cd=$(".select2").val();
	// 	console.log(cd);
	//   })
	$scope.AddEmployeeInfo = function () {
		//console.log(info);
		$scope.Que.type_id = $(".select2").val();


		$scope.Que.programs = $("#progrmaselect2").val();


		//$scope.Que.levels = $("#levelselect2").val();

		$scope.Que.Topic = $("#topiselect2").val();
		//console.log($scope.Que.type_id);
		$scope.QTypes = [];
		for (var t = 0; t < $scope.Que.type_id.length; t++) {
			//console.log($scope.qtypes);
			var selected = $scope.qtypes.filter(e => e.TypeName == $scope.Que.type_id[t]);

			//console.log(selected);
			$scope.QTypes.push(selected[0]);
		}
		var myArr=[];
		myArr = $scope.Que.Tags.split(",");
//console.log($scope.Que.tags);
		var obj = {
			"QType": $scope.QTypes,
			"Qmedia": [],
			"Tags": myArr,
			"Level": $scope.Que.level,
			"Program": $scope.Que.programs,
			"Qdesc": $scope.Que.Qdesc,
			"Qid": 14092021153454,
			"Topic": $scope.Que.Topic
		};


		console.log(obj);

		$http.post('http://localhost:3001/Questionmaster', obj).success((data) => {
			console.log(data);
		});
	}



	$scope.deleteQuestion = function (questionid) {
		var r = confirm("Are you sure you want delete this question !");
		if (r == true) {
			$http.delete("http://localhost:3001/Questionmaster/" + questionid).success((data) => {
				//console.log(data);
				$route.reload();
			});
		} else {
		return false;
		}
	
	}
  


});
