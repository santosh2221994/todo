
app.controller('MainCtrl', ['$scope', 'api',  '$state', '$rootScope',
    function($scope, api, $state) {
        $scope.sessionUser = JSON.parse(sessionStorage.user)
        console.log($scope.sessionUser)
        $scope.add = function() {
            if($scope.task == null) {
                alert('please enter');
                return 0;
            }
            var data = {
                data : {name :$scope.task}
            }
            api.post('/addtask', data)
            .then(function(res){
                $scope.setup()
            })
        }
        $scope.setup = function() {
            if($state.current.name.indexOf('patient') > -1) {
                api.get('/get/doctor')
                .then(function(res){
                    $scope.tasks = res;
                })
            } else {
                api.get('/get/patient')
                .then(function(res){
                    $scope.tasks = res;
                })
            }
        };
        $scope.setup();
        $scope.getStatus = function(doc) {
            var x = 2;
            angular.forEach($scope.sessionUser.doctors,function(d) {
                if(doc._id == d.Id) {
                    // console.log(doc,d);
                    if(d.approved == false) {
                        x = 0;
                    } else if(d.approved == true) {
                        x = 1;
                    }
                }
            })
            return x 
        }
        $scope.getpStatus = function(patient) {
            var x = 0;
            angular.forEach(patient.doctors,function(d) {
                if(d.Id == $scope.sessionUser._id) {
                    // console.log(doc,d);
                    if(d.approved == false) {
                        x = 0;
                    } else if(d.approved == true) {
                        x = 1;
                    }
                }
            })
            return x 
        }
        $scope.complete = function(patient){
            console.log(patient)
            var data = {
                data : {
                    patient: patient.email,
                    doctorId:$scope.sessionUser._id
                }
            }
            api.post('/complete/task', data)
            .then(function(res){
                $scope.setup()
                alert('Accepted')
            })
        }
        $scope.logout = function() {;
            sessionStorage.clear();
            $state.go('/');
        }
        $scope.book = function(id) {
            var data = {
                data : {
                    patientId : $scope.sessionUser.email,
                    doctorId : id
                }
            }
            api.post('/add/doctor' , data)
            .then(function(res) {
                console.log(res)
                alert('Request sent')
            },function(err){
                console.log(err)
            })
        }
    }
]);

