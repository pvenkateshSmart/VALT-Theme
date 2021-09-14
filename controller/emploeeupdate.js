angular.module('payroll').controller('emploeeupdate',function($scope,$http,$filter, $localStorage,$window,$route,$rootScope,apiurl){

 
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
		var paycode = $route.current.params.paycode
		
		$scope.getdatabypaycode  = function(){
			$scope.paycode = paycode;
			$http.get(apiurl+"employeemaster/getempbypaycode/"+paycode).success((data)=>{
				console.log(data);
				$scope.empinfo = data[0];
			})
		}
		$scope.getbankslist  = function(){
			$http.get(apiurl+"bankslist").success((data)=>{
				console.log(data);
				$scope.bankslist = data;
			})
		}
		$scope.getsalaryattr  = function(){
			$http.get(apiurl+"employeesalaryattr").success((data)=>{
				console.log(data);
				$scope.salaryattrlist = data;
			})
		}
		$scope.getempbypaycode  = function(){
			let newpaycode = $scope.paycodedata;
			$http.get(apiurl+"employeemaster/getempbypaycode/"+newpaycode).success((data)=>{
				console.log(data);
				$scope.showlinkacc = 1;
				$scope.infobypaycode = data[0];
			})
		}
		$scope.getcampuslist  = function(){
			$http.get("http://b.aditya.ac.in/analysis/api/campus.php").success((data)=>{
				//console.log(data);
				$scope.campuslist = data;
			})
		}	
		$scope.tabdiv  = 'Personal';
		
		$scope.emptabslist  = function(){
			$http.get(apiurl+"employeetabs").success((data)=>{
				console.log(data);
				$scope.listemptabs = data;
			})
		}

		$scope.gettabform  = function(val){
			
			if(val=='Primary'){
				$scope.tabdiv  = 'Primary';
			} else if(val=='Personal'){
				$scope.tabdiv  = 'Personal';
			} else if(val=='Bank'){
				$scope.tabdiv  = 'Bank';
			} else if(val=='LinkEmployee'){
				$scope.tabdiv  = 'LinkEmployee';
			} else if(val=='IdProof'){
				$scope.tabdiv  = 'IdProof';
			} else if(val=='Salary'){
				$scope.tabdiv  = 'Salary';
			}
		}

		$scope.empidprooflist  = function(){
			$http.get(apiurl+"employeeidproof").success((data)=>{
				console.log(data);
				$scope.listempidproof = data;
			})
		}

		$scope.updateobj = function(obj){
			$http.patch(apiurl+"employeemaster/updateprimaryinfo/"+paycode, obj).success((data)=>{
				console.log(data);
				//location.reload();
			})
		}
		$scope.UpdateEmpprimary = function(info){
			console.log(info);
			let campusinfo = $scope.campuslist.filter(e=>e.campus_name==info.campusName);
			console.log($scope.campuslist);
			obj = {
				paycode : info.paycode,
				empName : info.empName,
				gender : info.gender,
				mobileNo : info.mobileNo,
				whatsapp : info.whatsapp,
				email : info.email,
				campusId: campusinfo[0].id,
				campusName : info.campusName,
				category: info.category
			  }
			  $scope.updateobj(obj);  
		}
		$scope.UpdateEmppersonal = (info)=>{
			//console.log(info);
			obj = {
				"personal": info.personal
			  }
			  //console.log(info.personal);
			  $scope.updateobj(obj); 
		}
		
		$scope.addbankaccout = function(info){
			//info.bank[0].PrimaryAccount = "YES";
			// obj = {
			// 	"bank": info.bank
			// }
			// $scope.updateobj(obj);
			let findbank = $scope.empinfo.bank.filter(e=>e.AccountNo == info.AccountNo);
			console.log(findbank);
			if(findbank.length==0){
				info.PrimaryAccount= "YES";
				$scope.empinfo.bank.push(info);	
				finalobj = {
					"bank": $scope.empinfo.bank
				}
				$scope.updateobj(finalobj);
			} else {
				info.PrimaryAccount= "NO"
				$http.patch(apiurl+"employeemaster/updatebankinfo/"+paycode, info).success((data)=>{
					//console.log(data);
					location.reload();
				})
			}
			
		}

		$scope.changeprimary = function(bank){
			let bankdetails = $scope.empinfo.bank;
			if (bank.PrimaryAccount=='YES') {
				var result = confirm("Are you sure you want change the primary Account?");
				if(result == true){
					for(let i=0; i<bankdetails.length; i++){
						if(bank.AccountNo==bankdetails[i].AccountNo){
							console.log(bankdetails[i]);
							bankdetails[i].PrimaryAccount = "YES"	 
						} else {
							console.log(bankdetails[i]);
							bankdetails[i].PrimaryAccount = "NO"	
						}
						finalobj = {
							"bank": bankdetails
						}
						$scope.updateobj(finalobj);
					}
				}				
			}
			
		}

		$scope.Editbankaccount = function(bankinfo){
			console.log(bankinfo);
			$scope.bankinfo = bankinfo;
		}

		$scope.UpdateEmpIdproof = function(info){
			//info.bank[0].PrimaryAccount = "YES";
			//console.log(info);
			let findidproof = $scope.empinfo.idproofs.filter(e=>e.IdProofName == info.IdProofName);
			if(findidproof.length==0){
				$scope.empinfo.idproofs.push(info);
				obj = {
					"idproofs": $scope.empinfo.idproofs
				}  
				$scope.updateobj(obj); 
			} else {
				//console.log("update api");
				let paycode = $scope.paycode;
				$http.patch(apiurl+"employeemaster/updateidproof/"+paycode, info).success((data)=>{
					//console.log(data);
					location.reload();
				})
			}	
		}

		$scope.Editidproof = function(idp){
			console.log(idp);
			$scope.empidp = idp;
		}

		$scope.Updatesalaryattr = function(info){
			//info.bank[0].PrimaryAccount = "YES";
			//console.log(info);
			let findslrattr = $scope.empinfo.currentsalary.filter(e=>e.AttributeName == info.AttributeName);
			console.log(findslrattr);
			if(findslrattr.length==0){
				attrobj = {
					AttributeName : info.AttributeName,
					AttributeValue : + parseFloat(info.AttributeValue).toFixed(2)
				}
				//console.log(obj);
				$scope.empinfo.currentsalary.push(attrobj);
				obj = {
					"currentsalary": $scope.empinfo.currentsalary
				}  
				$scope.updateobj(obj); 
			} else {
				//console.log("update api");
				let paycode = $scope.paycode;
				attrobj = {
					AttributeName : info.AttributeName,
					AttributeValue : + parseFloat(info.AttributeValue).toFixed(2)
				}
				$http.patch(apiurl+"employeemaster/updatesalaryattr/"+paycode, attrobj).success((data)=>{
					console.log(data);
					//location.reload();
				})
			}	
		}

		$scope.Editsalaryattr = function(idp){
			//console.log(idp);
			$scope.salaryattr = idp;
		}

		$scope.UpdateEmpcurrentpay = function(info){
			//info.bank[0].PrimaryAccount = "YES";
			console.log(info.currentsalary);
			info.currentsalary[0].BasicSalary = + parseFloat(info.currentsalary[0].BasicSalary).toFixed(2);
			info.currentsalary[0].HRA = + parseFloat(info.currentsalary[0].HRA).toFixed(2);
			info.currentsalary[0].TA = + parseFloat(info.currentsalary[0].TA).toFixed(2);
			//console.log(info.currentsalary);
			obj = {
				"currentsalary": info.currentsalary
			}  
			$scope.updateobj(obj); 
		}
		$scope.UpdateEmpnormspay = function(info){
			//info.bank[0].PrimaryAccount = "YES";
			info.normssalary[0].NormsBasicSalary = + parseFloat(info.normssalary[0].NormsBasicSalary).toFixed(2);
			info.normssalary[0].NormsHRA = + parseFloat(info.normssalary[0].NormsHRA).toFixed(2);
			info.normssalary[0].NormsTA = + parseFloat(info.normssalary[0].NormsTA).toFixed(2);
			obj = {
				"normssalary": info.normssalary
			}
			$scope.updateobj(obj); 
		}

		$scope.LinkTheAccount = function(info){
			let LinkedPaycode = info.paycode;
			let EmployeeName = info.empName;
			newobj = {LinkedPaycode : LinkedPaycode, EmployeeName : EmployeeName}
			$scope.empinfo.linkedemployees.push(newobj);
			console.log($scope.empinfo);	
			finalobj = {
				"linkedemployees": $scope.empinfo.linkedemployees
			}
			$scope.updateobj(finalobj);
			
		}

		$scope.deletelinkedobj = function(pcode){
			obj = {
				LinkedPaycode : pcode
			}
			//console.log(obj);
			var result = confirm("Are you sure you want to delete the linked Account?");
				if(result == true){
					$http.patch(apiurl+"employeemaster/removeobjofarray/"+paycode, obj).success((data)=>{
						//console.log(data);
						location.reload();
					})
				}	
		}

 });
