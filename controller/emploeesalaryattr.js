angular.module('payroll').controller('emploeesalaryattr',function($scope,$http,$filter,$location, $localStorage,$window,$route,$rootScope,apiurl){

 
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

		$("#salaryattr").validate({
			rules: {
				Sa_code: {
					required: true,
					noSpace: true
				},
				Sa_name: {
					required: true
				},
				Sa_is_deductible: { 
					required: true
				},
				Sa_is_mandatory: {
					required: true
				}
			},
			messages: {
				Sa_code : {
					required : 'Please enter Id Proof Code'
				},
				Sa_name: {
					required: "Please enter Unique Code",
				},
				Sa_is_deductible: {
					required : 'Please select deductible yes/no'
				},
				Sa_is_mandatory: {
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
		
		$scope.empslrattrlist  = function(){
			$http.get(apiurl+"employeesalaryattr").success((data)=>{
				//console.log(data);
				$scope.listempslrattr = data;
			})
		}
		$scope.hidecode = 0;
		$scope.editslrattr = function(tab){
			console.log(tab);
			let sacode = tab.Sa_code;
			$scope.hidecode = 1;
			//console.log(sacode);
			$http.get(apiurl+"employeesalaryattr/getslrattrbycode/"+sacode).success((data)=>{
				console.log(data);
				$scope.slrattr = data[0];
			})
		}
		
		$scope.AddSalaryAttr = function(info){

			if(!info._id){
				if ($("#salaryattr").valid()){
					$http.post(apiurl+"employeesalaryattr", info).success((data)=>{
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
				let sccode = info.Sa_code;
				$http.patch(apiurl+"employeesalaryattr/updatesalaryattr/"+sccode, info).success((data)=>{
					console.log(data);
					//location.reload();
				})
			}
			
		}
		
		$scope.arrtocommastring = function(obj){
			//console.log(array);
			return Array.prototype.map.call(obj, function(item) { return item.permission_type; }).join(", ");
		}

 });
