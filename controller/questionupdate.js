angular.module('payroll').controller('questionupdate', function ($scope, $http, $filter, $localStorage, $window, $route, $rootScope, apiurl) {


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
    var questionid = $route.current.params.qid;

    $http.get("http://localhost:3001/Questionmaster/" + questionid).success((data) => {
        console.log(data);
        $scope.Que = data;
        $scope.Que.Qued = [];
        
        for (var i = 0; i < $scope.Que.QType.length; i++) {
            $scope.Que.Qued.push($scope.Que.QType[i].TypeName)
        }       
        $scope.Que.Tagnames=$scope.Que.Tags.toString();
       
        
      
    })

    $scope.addTagto=function(el){
        $scope.Que.Tagnames=$scope.Que.Tagnames+','+el;
    }

    $scope.onloadapis = function(){
        $http.get('http://localhost:3001/questiontypes').success((data) => {
         
            $('.select2').select2()
            
            // for (const el of document.querySelectorAll('.tagin')) {
            // 	tagin(el)
            //   }	 
            //console.log(data);
            $scope.qtypes = data;
            
            //tagin( document.querySelector('.tagin') );
        })   
    
        $http.get('http://localhost:3001/Programs').success((data) => {
            //console.log(data);
            $scope.programs = data;    
        })

        $http.get('http://localhost:3001/Levels').success((data) => {
            //console.log(data);
            $scope.levels = data;    
        })
    
        $http.get('http://localhost:3001/Topics').success((data) => {
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

    
    
    $scope.UpdateEmployeeInfo = function () {
        $scope.Que.type_id = $("#Qued").val();
        console.log($scope.Que.Tagnames);
    }
});
