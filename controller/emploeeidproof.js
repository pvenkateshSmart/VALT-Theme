angular.module('payroll').controller('emploeeidproof',function($scope,$http,$filter,$location, $localStorage,$window,$route,$rootScope,apiurl){

 
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
		
		//var apiurl = "http://10.60.1.19:3000/api/";
		jQuery.validator.addMethod("noSpace", function(value, element) { 
			return value.indexOf(" ") < 0 && value != ""; 
			}, "spaces not allowed");	
		$("#idproofvalidate").validate({
			rules: {
				Idp_code: {
					required: true,
					noSpace: true
				},
				Idp_name: {
					required: true
				},
				Idp_is_alphanumeric: { 
					required: true
				},
				Idp_length: {
					required: true,
					digits : true
				},
				Idp_is_mandatory: { 
					required: true
				}
			},
			messages: {
				Idp_code : {
					required : 'Please enter Id proof code'
				},
				Idp_name: {
					required: "Please enter Id proof name",
				},
				Idp_is_alphanumeric: {
					required : 'Please select alphanumeric yes/no'
				},
				Idp_length: {
					required: "Please enter Unique Code Length",
					digits : 'Enter numbers only',
				},
				Idp_is_mandatory: {
					required: "Please select mandatory yes/no"
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
		$scope.hidecode = 0;
		$scope.editidproof = function(tab){
			console.log(tab);
			let idpcode = tab.Idp_code;
			$scope.hidecode = 1;
			//console.log(sacode);
			$http.get(apiurl+"employeeidproof/getempidproofbycode/"+idpcode).success((data)=>{
				console.log(data);
				$scope.idproof = data[0];
			})
		}
		
		$scope.AddIdProof = function(info){

			if(!info._id){
				if ($("#idproofvalidate").valid()){
					$http.post(apiurl+"employeeidproof", info).success((data)=>{
						console.log(data);
						if(data.name=="MongoError"){
							$scope.dupeerr = "Duplicate Saalary code";
						} else {
							location.reload();
						}
						
					})
				}
			} else {
				console.log(info);
				let idpcode = info.Idp_code;
				$http.patch(apiurl+"employeeidproof/updateidproof/"+idpcode, info).success((data)=>{
					console.log(data);
					location.reload();
				})
			}
			
		}
		
		$scope.pagereload = function(){
			location.reload()
		}

 });
