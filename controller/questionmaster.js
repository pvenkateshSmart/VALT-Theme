angular.module('payroll').controller('questionmaster',function($scope,$http,$filter,$location, $localStorage,$window,$route,$rootScope,apiurl){

 
 	if(!$window.localStorage.getItem('logindata')){
			window.location.href = 'login.html';
		}
		$scope.userdata = JSON.parse($window.localStorage.getItem('logindata'));
		
		//console.log($scope.userdata);
		
		$scope.logountnow =  function(){
		 	window.localStorage.removeItem('logindata');
		    window.location.href = 'login.html';
	 	}
			
			 
		var apiurl = apiurl.getUrl();
		//console.log(apiurl);
		//var apiurl = "http://10.60.1.19:3000/api/";
		$scope.listdiv  = 0;
		jQuery.validator.addMethod("noSpace", function(value, element) { 
			return value.indexOf(" ") < 0 && value != ""; 
			}, "spaces not allowed");	
		$("#primaryinfo").validate({
			rules: {
				paycode: {
					required: true,
					noSpace: true,
					digits : true
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
					digits : true,
					minlength : 10,
					maxlength : 10 
				}
			},
			messages: {
				paycode : {
					required : 'Please enter Pay Code',
					digits : 'Enter numbers only'
				},
				campusName: {
					required: "Please Select campus name",
				},
				category: {
					required : 'Please select category'
				},
				empName: {
					required: "Please enter employee name"
				},
				gender: {
					required: "Please select gender"
				},
				mobileNo: {
					required : 'Mobile number is required',
					number:"Provide mobile number",
					digits : 'Enter numbers only',
					minlength : 'Enter a 10 digits phone number',
					maxlength : 'Enter a 10 digits phone number'
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
		$scope.empidprooflist  = function(){
			$http.get(apiurl+"employeeidproof").success((data)=>{
				//console.log(data);
				$scope.listempidproof = data;
			})
		}
	 
			$http.get('http://10.70.3.194:3001/questiontypes').success((data)=>{
				console.log(data);
				$scope.qtypes = data;
				$scope.permissionslist=[];
				for(var i=0; i<$scope.qtypes.length; i++){
					$scope.permissionslist[i] = {
						"label":$scope.qtypes[i].TypeName,
						"id":$scope.qtypes[i].ShortName
					}
				}
				console.log($scope.permissionslist);
			})
			$scope.permModel = [];
			$scope.qtypes = {
				scrollableHeight: '200px',
				scrollable: true,
				enableSearch: true
			};


			$http.get('http://10.70.3.194:3001/Programs').success((data)=>{
				console.log(data);
				$scope.programs = data;
				$scope.programlist=[];
				for(var i=0; i<$scope.programs.length; i++){
					$scope.programlist[i] = {
						"label":$scope.programs[i].ProgramName,
						"id":$scope.programs[i]._id
					}
				}
				console.log($scope.permissionslist);
			})
			$scope.programModel = [];
			$scope.programs = {
				scrollableHeight: '200px',
				scrollable: true,
				enableSearch: true
			};

			$http.get('http://10.70.3.194:3001/Levels').success((data)=>{
				console.log(data);
				$scope.levels = data;
				$scope.levelslist=[];
				for(var i=0; i<$scope.levels.length; i++){
					$scope.levelslist[i] = {
						"label":$scope.levels[i].LevelName,
						"id":$scope.levels[i].LevelShortName
					}
				}
				console.log($scope.permissionslist);
			})
			$scope.levelsModel = [];
			$scope.levels = {
				scrollableHeight: '200px',
				scrollable: true,
				enableSearch: true
			};

	 
		$scope.getcampuslist  = function(){
			$http.get("http://b.aditya.ac.in/analysis/api/campus.php").success((data)=>{
				//console.log(data);
				$scope.campuslist = data;
			})
		}
		$scope.addempoyeediv = function(){
			$scope.listdiv  = 1;
		}

		$scope.AddEmployeeInfo = function(info){
			//console.log(info);
			let campusinfo = $scope.campuslist.filter(e=>e.campus_name==info.campusName);
			console.log(campusinfo);
			obj = {
				paycode : info.paycode,
				empName : info.empName,
				gender : info.gender,
				mobileNo : info.mobileNo,
				whatsapp : info.whatsapp,
				email : info.email,
				campusId: campusinfo[0].id,
				campusName : info.campusName,
				category: info.category,
				personal: [],
				bank:[],
				official: [],
				linkedemployees : [],
				idproofs: [],
				currentsalary: [],
				normssalary: [],
				increments : [],
				otherinfo : []
			  }
			  
			$http.post(apiurl+"employeemaster",obj).success((data)=>{
				console.log(data);
				if(data.name=="MongoError"){
					$scope.dupeerr = "Duplicate paycode";
				} else {
					$location.path('/emploeeupdate/'+data.data.paycode);
				}
			}, function (response) {
				console.log(response);
				// this function handles error
			})  
		}
 

 });
