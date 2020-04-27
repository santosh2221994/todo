app.controller('mbloginCtrl', ['$scope', 'api', '$state', 'Upload', '$rootScope',
    function ($scope, api, $state, auth, $rootScope, Upload) {
        // console.log(constants)
        window.sessionStorage;
        $scope.reg = 1;
        $scope.loginModel = {
            email: null,
            password: null
        }
        $scope.dForm = false;
        $scope.pForm = false;
        $scope.timeFrames = ["10:00 AM - 2:00 PM", "11:00 AM - 3:00 PM", "12:00 PM - 4:00 PM", "1:00 PM - 5:00 PM", "2:00 PM - 6:00 PM", "3:00 PM - 7:00 PM"]
        $scope.patient = {
            name: null,
            password: null,
            email: null,
            phone: null,
            city: null,
            medicalIssue: null,
            type: 'patient'
        }
        $scope.doctor = {
            name: null,
            password: null,
            email: null,
            phone: null,
            city: null,
            Specialization: null,
            Availibity: null,
            docs: null,
            type: 'doctor'
        }
        // console.log($state.params.loggedIn)
        if (sessionStorage.user) {
            $scope.sessionUser = JSON.parse(sessionStorage.user)
        } else {
            $scope.sessionUser = null
        }
        $scope.submit = function () {
            // console.log($scope.loginModel.email, $scope.loginModel.password)
            if ($scope.loginModel.email != null && $scope.loginModel.password != null) {
                var data = {
                    data: $scope.loginModel
                };
                api.get('/login?email=' + $scope.loginModel.email + '&password=' + $scope.loginModel.password)
                    .then(function (res, err) {
                        // console.log(res, err);
                        sessionStorage.setItem('user', JSON.stringify(res));
                        if (res.type == "patient") {
                            $state.go('/patient/dashboard', { loggedIn: true, user: res })
                        } else {
                            $state.go('/doctor/dashboard', { loggedIn: true, user: res })
                        }
                    });
                // $rootScope.loggedIn = true;
                // $state.go('/dash', {loggedIn : true})
            } else {
                alert('Please enter Username & Password')
            }
        }
        $scope.register = function () {
            console.log($scope.picFile)
            if ($scope.pForm == true) {
                if ($scope.patient.email != null && $scope.patient.name != null && $scope.patient.phone != null && $scope.patient.city != null && $scope.patient.medicalIssue) {
                    var data = {
                        data: $scope.patient
                    };

                    api.post('/signUp', data)
                        .then(function (res, err) {
                            // console.log(res, err);
                            $state.go('/patient/dashboard', { loggedIn: true })
                            // session.set(res)
                        });
                } else {
                    alert('Please enter All Fields')
                }
            } else if ($scope.dForm == true) {
                if ($scope.doctor.email != null && $scope.doctor.name != null && $scope.doctor.phone != null && $scope.doctor.city != null && $scope.doctor.Specialization != null && $scope.doctor.Availibity != null) {
                    var data = {
                        data: $scope.doctor
                    };

                    api.post('/signUp', data)
                        .then(function (res, err) {
                            // console.log(res, err);
                            $state.go('/doctor/dashboard', { loggedIn: true })
                            // session.set(res)
                        });
                } else {
                    alert('Please enter All Fields')
                }
            }
        }
        $scope.openRegisterForm = function (x) {
            if (x == 'p') {
                $scope.pForm = true;
            } else if (x == 'd') {
                $scope.dForm = true;
            } else {
                $scope.pForm = false;
                $scope.dForm = false;
            }
        }
        if ($scope.sessionUser && $scope.sessionUser.email) {
            $scope.loginModel = {
                email: $scope.sessionUser.email,
                password: $scope.sessionUser.password
            }
            $scope.submit();
        }
    }
]);
