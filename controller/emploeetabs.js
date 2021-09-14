angular.module('payroll').controller('emploeetabs',function($scope,$http,$filter,$location, $localStorage,$window,$route,$rootScope,apiurl){

 
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
			
		
		$scope.emptabslist  = function(){
			$http.get(apiurl+"employeetabs").success((data)=>{
				//console.log(data);
				$scope.listemptabs = data;
			})
		}
		$scope.getpermlist  = function(){
			$http.get("http://b.aditya.ac.in/analysis/api/permissions.php").success((data)=>{
				//console.log(data);
				$scope.permlist = data;
				$scope.permissionslist=[];
				for(var i=0; i<$scope.permlist.length; i++){
					$scope.permissionslist[i] = {
						"label":$scope.permlist[i].permission_type,
						"id":$scope.permlist[i].id
					}
				}
				console.log($scope.permissionslist);
			})
		}
		$scope.hidecode = 0;
		$scope.edittab = function(tab){
			//console.log(tab);
			$scope.hidecode = 1;
			let tabcode = tab.Tab_Code;
			$http.get(apiurl+"employeetabs/getemptabbycode/"+tabcode).success((data)=>{
				console.log(data);
				$scope.emptab = data[0];
				$scope.permModel=[];
				for(var i=0; i<$scope.emptab.Tab_Permissions.length; i++){
					$scope.permModel[i] = {
						"label":$scope.emptab.Tab_Permissions[i].permission_type,
						"id":$scope.emptab.Tab_Permissions[i].id
					}
				}
				//console.log($scope.permModel);
			})
		}
		// $scope.myperm = {
		// 	selected:{}
		// };
		$scope.permModel = [];
			$scope.permSettings = {
				scrollableHeight: '200px',
				scrollable: true,
				enableSearch: true
			};
			$scope.example2settings = {
				displayProp: 'id'
			};
		$scope.AddEmpTabInfo = function(info){
			
			var permarry = [];
		//	console.log($scope.permModel);
			for(var i=0; i<$scope.permModel.length; i++){
				let perarry = $scope.permissionslist.filter(e=>e.id==$scope.permModel[i].id);
				let newobj = {
					id : perarry[0].id,
					permission_type : perarry[0].label
				}
				permarry.push(newobj);
			}
			let finalobj = {
				Tab_Code : info.Tab_Code,
				Tab_Name : info.Tab_Name,
				Tab_Permissions : permarry,
				Tab_Status : info.Tab_Status
			}
			// console.log(finalobj);
			// let checktab = $scope.listemptabs.filter(e=>e.Tab_Code==finalobj.Tab_Code);
			// console.log(checktab.length);
			if(!info._id){
				$http.post(apiurl+"employeetabs", finalobj).success((data)=>{
					console.log(data);
					if(data.name=="MongoError"){
						$scope.dupeerr = "Duplicate Tab Code";
					} else {
						location.reload();
					}
				})
			} else {
				let tabcode = info.Tab_Code;
				$http.patch(apiurl+"employeetabs/updatetab/"+tabcode, finalobj).success((data)=>{
					console.log(data);
					location.reload();
				})
			}
			
		}
		
		$scope.arrtocommastring = function(obj){
			//console.log(array);
			return Array.prototype.map.call(obj, function(item) { return item.permission_type; }).join(", ");
		}

 });
