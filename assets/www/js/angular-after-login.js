//+++++++++++++++++++++++++++DashBoard page controller+++++++++++++++++++++

mainApp.controller( "dashBoardController", function( $scope, constantData, $http, $timeout, $state, $rootScope, $location  ) {
    var height1 = 
    $rootScope.previousState;
    $rootScope.currentState;
    $scope.date = new Date();
    //alert(device_token);
    $rootScope.$on('$stateChangeSuccess', function( ev, to, toParams, from, fromParams ) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
    });
    $scope.upgradeDisplay = false;
    var user_detail = localStorage.getItem( "userDetail" );
    var userData = JSON.parse( user_detail ).data;
    // console.log(userData);
    var profileImg = localStorage.getItem( "profileData" );
    $scope.profileImg =profileImg;
    // console.log($scope.profileImg);
    // alert($scope.profileImg);
    //alert(localStorage.getItem( "profileData" ));
    // console.log(JSON.stringify(constantData.creditsList()));
     var image = $('#profile_pic');
     image.css('background-image', 'url(' + profileImg +')');

     // $('#profile_pic').attr("src",profileImg);
    var username = userData.displayname;
    $scope.proSection = false;
    $scope.femaleProLink = false;
    $scope.submitReviewPro = false;
    $scope.actionRequired = false;
    $scope.learnMore = true;
    $scope.yellowUpgrade = false;
    $scope.completeProSetup = false;
    $scope.updatePayment = false;
    $scope.shoutsection = false;
    var getDashboardData = {};
    getDashboardData['responsetype'] = "json";
    getDashboardData['app'] = 1;
    var user_id = JSON.parse(user_detail).data.id;
    //console.log(JSON.stringify(getDashboardData));
    var responsePromise = $http.post(BASE_URL+"dashboard",JSON.stringify(getDashboardData));
    responsePromise.success( function( data, status, headers, config ) {
        // console.log( "success:"+JSON.stringify( data ) );

        var getDeviceData = {};
        getDeviceData['os'] = deviceOS;
        getDeviceData['uuid'] = uuid;
        getDeviceData['version'] = deviceVersion;
        getDeviceData['user_id'] = user_id;
        getDeviceData['device_token'] = device_token;
        // console.log(JSON.stringify(getDeviceData));
        var responsePromise = $http.post(BASE_URL+"userphonedetails",JSON.stringify(getDeviceData));
        responsePromise.success( function( data, status, headers, config ) {
            // console.log( "success:"+JSON.stringify( data ) );
            if( data.message == 'user not logged in' ){
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/login"
                });
            }
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( "error:"+JSON.stringify( data ) );
            // window.plugins.nativepagetransitions.slide({
            //     "href" : "#/home/login"
            // });
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
        if( data.status != 'error' ) {
            var user_number = data.data.profile.ringhop_number;
            localStorage.setItem("dashboard_data",JSON.stringify(data));
            $('#usersStatus').html(data.data.status);
            $('#user_loc').html(data.data.profile.profile_status);
            //$('#profile_pic').attr("src",data.data.profile_image_big);
            $scope.profileImg =data.data.profile_image_big;
            var image = $('#profile_pic');
            image.css('background-image', 'url(' + $scope.profileImg +')');
            // alert(data.data.profile_image_big);
            localStorage.setItem("profileData", data.data.profile_image_big);
            //alert(localStorage.getItem( "profileData" ));
            var proDetail = data.data.profile.pro;
            if(proDetail == 2){
                // console.log(proDetail);
                $scope.shoutsection = true;
            }
            if( proDetail == 0 ) {
                $scope.learn_more = 'Learn more';
                $scope.pro_status = 'Earn money with Ringhop Pro.';
                if( data.data.profile.gender == 'F' ) {
                    $scope.femaleProLink = true;
                }
            } else if( proDetail == 1 ) {
                $scope.learn_more = 'Complete Ringhop Pro setup';
                $scope.pro_status = 'Ringhop Pro verification process.';
            } else {
                $scope.learn_more = '';
                $scope.pro_status = '';
            }
            if( data.data.pro_data != null ) {
                if( proDetail == 1 ) {
                    //if((data.data.pro_data.pv_terms == 2) && (data.data.pro_data.pv_idverify == 1 || data.data.pro_data.pv_idverify == 2) && (data.data.pro_data.pv_payinfo == 1 || data.data.pro_data.pv_payinfo == 2) ){
                    if( data.data.pro_data.pv_notes == 'admin_pending' ) {
                        $scope.submitReviewPro = true;
                        //$scope.learnMore = false;
                    } else {
                        $scope.completeProSetup = true;
                    }
                }
                if( data.data.pro_data.pv_terms == -1 || data.data.pro_data.pv_idverify == -1 || data.data.pro_data.pv_idverify == -1 || proDetail == -1 ) {
                    $scope.actionRequired = true;
                    //$scope.learnMore = false;
                }
            }
            if( data.data.user_status == 'billingissue' ) {
                $scope.updatePayment = true;
            }
            if( data.data.user_status == 'pending' && proDetail != 2 && data.data.profile.gender == 'M') {
                $scope.yellowUpgrade = true;
            }
            $scope.proStatusLink = function() {
                if( proDetail == 0 ) {
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/learnmore"
                    });
                }
                if( proDetail == 1 ) {
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/prodashboard"
                    });
                }
            };

            //pro user detail in dashboard
            if( proDetail == 2 ) {
                var pro_number = "("+user_number.substr(1, 3)+") "+user_number.substr(4, 3)+"-"+user_number.substr(7, 4);
                $scope.proSection = true;
                $('#pro_number').html(pro_number);
                $scope.submitReviewPro = false;
            }
            //console.log("====users status for upgrade option=====");
            if( data.data.user_status == 'pending' ) {
                $scope.upgradeDisplay = true;
            } else {
                $scope.upgradeDisplay = false;
            }
        } else {
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/login"
            });
        }

    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( "error:"+JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $('#username').html(username);
    $scope.buyCredits = function () {
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        var user_detail = localStorage.getItem( "userDetail" );
        var userid = JSON.parse( user_detail ).data.id;
        var creditData = {};
        var page_name = 'login';
        creditData['responsetype'] = 'json';
        creditData['userid'] = userid;
        // console.log(JSON.stringify(creditData));
        var responsePromise = $http.get( BASE_URL+"addcredits?responsetype=json&userid="+userid );
        responsePromise.success( function( data, status, headers, config ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            // console.log( JSON.stringify( data ) );
            if( data.paymentVia == 'in_app' ) {
                    window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/addcredits/"+userid+'/'+page_name
                });
            }
            else if(data.paymentVia == 'credit_card'){
                // window.plugins.nativepagetransitions.slide({
                //     "href" : "#/home/upgrade"
                // });
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/addcredits/"+userid+'/'+page_name
                });
            }
        });
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );

    };
    // $scope.goTovideoCredits = function () {
    //     console.log("enter video credits");
    //     window.plugins.nativepagetransitions.slide({
    //         "href" : "#/home/videoCredits"
    //     });
    // };
    // $scope.Payment_method = function(){
    //     window.plugins.nativepagetransitions.slide({
    //         "href" : "#/home/InAppPurchasePayment"
    //     });
    // };

    $scope.shoutLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/createnewshout"
            // "href" : "#/home/createnewshout"+originator_id
        });
    };
    $scope.settingLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/settings"
        });
    };
    $scope.statusAndAvaillink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/phonesettings"
        });
    };
    $scope.chatLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/messages"
        });
    };
    // $scope.proUpgrade = function () {
    //     // window.plugins.nativepagetransitions.slide({
    //     //     "href" : "#/home/upgrade"
    //     // });
    //     window.plugins.nativepagetransitions.slide({
    //         "href" : "#/home/InAppPurchasePayment"
    //     });
    // };
    $scope.callLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/recentcalls"
        });
    };
    $scope.contactsLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/contacts"
        });
    };
    $scope.myLibrary = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/myLibrary"
        });
    };
    $scope.searchLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/search1"
        });
    };
    //console.log('====device part=====');

} )
// 
//+++++++++++++++++++++++++++Profile options page controller+++++++++++++++++++++

mainApp.controller( "profileoptionsctrl", function( $scope, $http, $timeout, $state, $rootScope ) {
    var user_detail = localStorage.getItem("userDetail");
    var userData = JSON.parse(user_detail).data;
    $scope.user_id1 = userData.id;
    $scope.viewProfile = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/profile"+$scope.user_id1
        });
    };
    $scope.statusAndAvail = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/phonesettings"
        });
    };
    $scope.editProfileLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/editProfile"
        });
    };
})


//+++++++++++++++++++++++++++Edit Shout page controller+++++++++++++++++++++

// mainApp.controller("editShoutController", function( $scope, $http, $timeout, $state, $rootScope ) {


// })

//+++++++++++++++++++++++++++Settings page controller+++++++++++++++++++++

mainApp.controller( "settingsController", function( $scope, $http, $timeout, $state, $rootScope ) {
    var myScroll;
// function loaded() {
//     alert('loaded')
    myScroll = new iScroll('wrapper');

    var user_detail = localStorage.getItem("userDetail");
    var userData = JSON.parse(user_detail).data;
    $scope.user_id = userData.id;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    // console.log(proData);
    $scope.viewProfile = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/profile"+$scope.user_id+'/'+userData.displayname
        });
    };
    $scope.settingsbackButton = function(){
        window.plugins.nativepagetransitions.slide({
            "direction": 'right',
            "href" : "#/home/affter_login"
        });
    }
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.userStats = function () {
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/userstats"
            });
        };
        $scope.isPro = false;
    } else {

        $scope.isPro = true;
    }
    $scope.voiceGreet = function(){
        // console.log("greeting");
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/prosettings"
        });
    };
    $scope.proset = function () {
        // console.log("proset");
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/prosettings"
        });
    };
    $scope.homeLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/affter_login"
        });
    };
    $scope.editProfileLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/editProfile"
        });
    };
    $scope.blockingPage = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/blockedusers"
        });
    };
    // $scope.updateUpgrade = function () {
    //     window.plugins.nativepagetransitions.slide({
    //         "href" : "#/home/InAppPurchasePayment"
    //     });
    // };
    $scope.viewCredits = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/viewcredit"
        });
    };
    $scope.buyCredits = function () {
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        var user_detail = localStorage.getItem( "userDetail" );
        var userid = JSON.parse( user_detail ).data.id;
        var creditData = {};
        var page_name = 'settings';
        creditData['responsetype'] = 'json';
        creditData['userid'] = userid;
        // console.log(JSON.stringify(creditData));
        var responsePromise = $http.get( BASE_URL+"addcredits?responsetype=json&userid="+userid );
        responsePromise.success( function( data, status, headers, config ) {
        $('.phpdebugbar-openhandler-overlay').hide();
        $('.ui-loader').hide();
            // console.log( JSON.stringify( data ) );
                if( data.paymentVia == 'in_app' ) {
                            window.plugins.nativepagetransitions.slide({
                            "href" : "#/home/addcredits/"+userid+'/'+page_name
                        });
                    }
            else if(data.paymentVia == 'credit_card'){
                // window.plugins.nativepagetransitions.slide({
                //     "href" : "#/home/upgrade"
                // });
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/addcredits/"+userid+'/'+page_name
                });
            }
        });
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );

    };
    $scope.billingHistory = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/billinghistory"
        });
    };
    $scope.deactivateAcc = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/deactivation"
        });
    };
    $scope.notification = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/notification"
        });
    };

    $scope.logout = function ( $event ) {
        var getLogoutData = {};
        getLogoutData['responsetype'] = "json";
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        var responsePromise = $http.post( BASE_URL+"logout",JSON.stringify(getLogoutData));
        responsePromise.success( function( data, status, headers, config ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if( data.status == 'success' ) {
                localStorage.removeItem("userDetail");
                localStorage.removeItem("rememberme_flag");
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/login"
                });

            } else {
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/login"
                });
            }
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };
    $scope.statusAndAvail = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/phonesettings"
        });
    };
    $scope.resetPassword = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/resetpassword"
        });
    };
    $scope.helpandsupport = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/support"
        });
    };
    $scope.about = function()
    {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/about"
        });
    };

} )
//+++++++++++++++++++++++++++privacypolicy page controller+++++++++++++++++++++

mainApp.controller( "privacypolicycontroller", function( $scope, $http, $timeout, $state, $rootScope ) {
    var myScroll;
    myScroll = new iScroll('wrapper');
});

//+++++++++++++++++++++++++++terms page controller+++++++++++++++++++++

mainApp.controller( "termscontroller", function( $scope, $http, $timeout, $state, $rootScope ) {
    var myScroll;
    myScroll = new iScroll('wrapper');
});

//+++++++++++++++++++++++++++deactivation controller+++++++++++++++++++++

mainApp.controller( "deactivationcontroller", function( $scope, $http, $timeout, $state, $rootScope ) {
    // var myScroll;
    // myScroll = new iScroll('wrapper');
    var flagMenu = 0;
    $scope.navAction = function() {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
    var height = $( window ).height();
    $('.wrapper, #sidebar-wrapper').css( 'min-height', height );
    $scope.deactivateConfirm = function( $event ){
        // console.log("enter");
        var user_detail = localStorage.getItem("userDetail");
        var userData = JSON.parse(user_detail).data;
        var getdeactivationData = {};
        getdeactivationData[ 'user_confirmed' ] = userData.id;
        getdeactivationData[ 'responsetype' ] = "json";
        // console.log(JSON.stringify(getdeactivationData));
        $( '.phpdebugbar-openhandler-overlay' ).show();
        $( '.ui-loader' ).show();
        var responsePromise = $http.post( BASE_URL+"deactivate",JSON.stringify( getdeactivationData ) );
        responsePromise.success( function( data, status, headers, config ) {
            // console.log(JSON.stringify(data));
            $( '.phpdebugbar-openhandler-overlay' ).hide();
            $( '.ui-loader' ).hide();
            if( data.status == 'success' ) {
                // console.log("success enter");
                localStorage.removeItem("userDetail");
                localStorage.removeItem("rememberme_flag");
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/login"
                } );
            }else{
                // console.log("enter error");
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/login"
                } );
            }
        });
        responsePromise.error( function ( data, status, headers, config ) {
            $( '.phpdebugbar-openhandler-overlay' ).hide();
            $( '.ui-loader' ).hide();
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
            console.log( JSON.stringify( data ) );
        });

    };

    $scope.deactivateCancel = function(){
      window.plugins.nativepagetransitions.slide({
            "href" : "#/home/settings"
        });  
    };
});

//+++++++++++++++++++++++++++editProfile page controller+++++++++++++++++++++

mainApp.controller( "editProfileController", function( $scope, $http, $timeout, $state, $rootScope ) {
    $scope.image_available = false;
    $scope.takePhotoOpt = false;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    // console.log(proData);
    var proDisplayFlag = 0;
    var editProfileData = {};
    $scope.isPro = false;
    if( proData != 2 ) {
        //for pro users
        $scope.isPro = false;
    } else {
        $scope.isPro = true;
    }
    editProfileData['responsetype'] = 'json';
    console.log( JSON.stringify( editProfileData ) );
    var responsePromise = $http.post( BASE_URL+"editprofile",JSON.stringify( editProfileData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if( data.data.display_ringhop == 0 ) {
            $scope.isDisplayPro = true;
        } else {
            $scope.isDisplayPro = false;
        }
        if( data.data.display_callstatus == 0 ) {
            $scope.isDisplayCall = true;
        } else {
            $scope.isDisplayCall = false;
        }

    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if( navigator.connection.type == Connection.NONE ) {
            checkConnection();
        }
    } );

    $scope.socialLinks = function () {
        back( 'left', '#/home/forsale' );
    };

    $scope.displayPro = function () {
        if( $scope.isDisplayPro == true ){
            proDisplayFlag = 0;
        } else {
            proDisplayFlag = 1;
        }
        var proDisplayData = {};
        proDisplayData[ 'display_ringhop' ] = proDisplayFlag;
        proDisplayData[ 'responsetype' ] = 'json';
        console.log( JSON.stringify( proDisplayData ) );
        $('.ui-loader').show();
        var responsePromise = $http.post( BASE_URL+"editprofilesettings",JSON.stringify( proDisplayData ) );
        responsePromise.success( function( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.ui-loader').hide();
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.ui-loader').hide();
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );
    };

    // $scope.displayCallStatus = function () {
    //     if( $scope.isDisplayCall == true ){
    //         proDisplayFlag = 0;
    //     } else {
    //         proDisplayFlag = 1;
    //     }
    //     var proDisplayData = {};
    //     proDisplayData[ 'display_callstatus' ] = proDisplayFlag;
    //     proDisplayData[ 'responsetype' ] = 'json';
    //     console.log( JSON.stringify( proDisplayData ) );
    //     $( '.ui-loader' ).show();
    //     var responsePromise = $http.post( BASE_URL+"editprofilesettings",JSON.stringify( proDisplayData ) );
    //     responsePromise.success( function( data, status, headers, config ) {
    //         console.log( JSON.stringify( data ) );
    //         $( '.ui-loader' ).hide();
    //     } );
    //     responsePromise.error( function ( data, status, headers, config ) {
    //         console.log( JSON.stringify( data ) );
    //         $( '.ui-loader' ).hide();
    //         if( navigator.connection.type == Connection.NONE ) {
    //             checkConnection();
    //         }
    //     } );
    // };

    $scope.uploadPhoto = function () {
        $scope.takePhotoOpt = true;
    };

    $scope.cancelPhoto = function () {
        $scope.takePhotoOpt = false;
    };

    $scope.editProfileLink = function ( $event ) {
        window.plugins.nativepagetransitions.slide( {
            "href" : "#/home/editProfile"
        } );
    };

    function onPhotoDataSuccess( imageData ) {
        // console.log(imageData);
        var profileImage = document.getElementById( 'profile_image' );
        profileImage.style.display = 'block';
        profileImage.src = "data:image/jpeg;base64," + imageData;
        imageString = imageData;
    }

    // A button will call this function
    $scope.takePhoto = function ( $event ) {
        $scope.takePhotoOpt = false;
        $scope.image_available = true;
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture( onPhotoDataSuccess, onFail, { quality: 75, targetWidth:1000,
        	targetHeight: 1000, correctOrientation: true,
        	destinationType: Camera.DestinationType.DATA_URL
        } );
    };

    //take photo from phone gallery
    $scope.photoLibrary = function ( ) {
        $scope.takePhotoOpt = false;
        $scope.image_available = true;
        navigator.camera.getPicture( onPhotoDataSuccess, onFail, { quality: 50, targetWidth:1000,
        	targetHeight: 1000, destinationType: Camera.DestinationType.DATA_URL,
         	sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        } );
    };


    // Called if something bad happens.
    function onFail( message ) {
        //alert('Failed because: ' + message);
        $scope.takePhotoOpt = false;
        $scope.image_available = false;
    }

    //upload profile pic
    $scope.saveProfilePic = function ( $event ) {
        var updateProfileData = {};
        updateProfileData[ 'responsetype' ] = "json";
        updateProfileData[ 'image' ] = imageString;
        console.log(JSON.stringify(updateProfileData));
        $( '.phpdebugbar-openhandler-overlay' ).show();
        $( '.ui-loader' ).show();
        var responsePromise = $http.post( BASE_URL+"uploadresized",JSON.stringify( updateProfileData ) );
        responsePromise.success( function( data, status, headers, config ) {
            // console.log('hi');
            console.log(JSON.stringify(data));
            $('#after_img_select').html(data.message).css('color','green').addClass('col-sm-12');
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            //$scope.saveCancelShow = false;
            // window.plugins.nativepagetransitions.slide( {
            //     "href" : "#/home/affter_login"
            // } );
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            // console.log('hi');
            console.log( JSON.stringify( data ) );
            $( '.phpdebugbar-openhandler-overlay' ).hide();
            $( '.ui-loader' ).hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };

    //cancel upload
    $scope.cancelUpload = function () {
        $scope.image_available = false;
    };

    $scope.deletePhoto = function () {
        navigator.notification.confirm(
            'Are you sure you want to delete photo?',  // message
            onConfirm,
            'Delete Photo'
        );
    };

    function onConfirm( button ) {
        if( button == 1 ) {
            var deletePhotoData = {};
            deletePhotoData[ 'responsetype' ] = "json";
            console.log( JSON.stringify( deletePhotoData ) );
            var responsePromise = $http.post( BASE_URL+"removeprofilephoto", JSON.stringify( deletePhotoData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $( '#deleteBtn' ).html( data.message );
                $( '#deleteBtn' ).addClass( 'errorStatus' );
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        }
    }

    $scope.setLocation = function() {
        window.plugins.nativepagetransitions.slide( {
            "href" : "#/home/editlocation"
        } );
    };

    $scope.aboutMe = function() {
        window.plugins.nativepagetransitions.slide( {
            "href" : "#/home/editaboutme"
        } );
    };

} )

//++++++++++++++++++++++++right menu button+++++++++++++++++++++++++++++++++++

mainApp.controller( "menuController", function( $scope, $http, $timeout, $state, $rootScope, $window ) {
    $scope.leftMenu = function ( $event ) {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'up',
            "href" : "#/home/settings"
        } );
    };
    //console.log( JSON.stringify( $window.history ) );
    $scope.backButton = function() {
        // var path = $rootScope.previousState;
        // var splitpath = path.split('.');
        // var prevPath = '#/'+splitpath[0]+'/'+splitpath[1];
        if( $rootScope.currentState == 'home.viewprofile' ) {
            if( $rootScope.previousState == 'home.profileoptions' ) {
                window.plugins.nativepagetransitions.slide( {
                    "direction": 'right',
                    "href" : "#/home/profileoptions"
                } );
            } else {
                // console.log('not moved');
                window.plugins.nativepagetransitions.slide( {
                    "direction": 'right',
                    "href" : window.history.back()
                } );
            }

        } else if( $rootScope.currentState == 'home.settings' ) {
            window.plugins.nativepagetransitions.slide( {
                "direction": 'down',
                "href" : window.history.back()
            } );
        } else {
            window.plugins.nativepagetransitions.slide( {
                "direction": 'right',
                "href" : window.history.back()
            } );
        }
    };
} )

//+++++++++++++++++++++++++++phoneSettings page controller+++++++++++++++++++++

mainApp.controller( "availabilityController", function( $scope, $http, $timeout, $state, $rootScope ) {
    var statusData = {};
    statusData['responsetype'] = "json";
    var responsePromise = $http.post( BASE_URL+"phonesettings",JSON.stringify( statusData ) );
    responsePromise.success( function( data, status, headers, config ) {
        if( data.data.call_available == 1 && data.data.sms_available == 0 ) {
            $scope.call_available = true;
            $scope.sms_available = false;
        }
        if( data.data.call_available == 0 && data.data.sms_available == 1 ) {
            $scope.call_available = false;
            $scope.sms_available = true;
        }
        if( data.data.call_available == 1 && data.data.sms_available == 1 ) {
            $scope.call_available = true;
            $scope.sms_available = true;
        }
        if( data.data.call_available == 0 && data.data.sms_available == 0 ) {
            $scope.call_available = false;
            $scope.sms_available = false;
        }
        if( data.data.profile_status != null ) {
            $scope.profile_status = data.data.profile_status;
        }
    } );

    $scope.updateStatus = function ( $event ) {

        statusData = {};
        statusData[ 'responsetype' ] = "json";
        $( '#availStatusCheck' ).addClass('errorStatus').removeClass('succesStatus');
        if( $scope.sms_available == true ) {
            statusData[ 'sms_available' ] = $scope.sms_available;
        }
        if( $scope.call_available == true ) {
            statusData[ 'call_available' ] = $scope.call_available;
        }
        statusData[ 'profile_status' ] = $scope.profile_status;
        $( '.phpdebugbar-openhandler-overlay' ).show();
        $( '.ui-loader' ).show();
        console.log(JSON.stringify(statusData));
        var responsePromise = $http.post( BASE_URL+"phonesettings",JSON.stringify( statusData ) );
        responsePromise.success( function( data, status, headers, config ) {
            if( data.message == 'user not logged in' ) {
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/login"
                } );
            }
            if( data.status == 'success' ){
                $( '#availStatusCheck' ).removeClass('errorStatus').addClass('succesStatus');
            } else {
                $( '#availStatusCheck' ).addClass('errorStatus').removeClass('succesStatus');
            }
            console.log(JSON.stringify(data));
            $( '.phpdebugbar-openhandler-overlay' ).hide();
            $( '.ui-loader' ).hide();
            $( '#availStatusCheck' ).html( data.message );
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            $( '.phpdebugbar-openhandler-overlay' ).hide();
            $('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );
    };
} )

//+++++++++++++++++++++++++++changepwd page controller+++++++++++++++++++++

mainApp.controller( "changepwdController", function( $scope, $http, $timeout, $state, $rootScope ) {
    var flag = false;
    $scope.changePasswd = function( $event ) {
        $('#changepwd_status').html( '' );
        $('#changepwd_status').removeClass('succesStatus').addClass('errorStatus');
        var password = $scope.password;
        var confirm_passwd = $scope.confirmpassword;
        var oldpassword = $scope.oldpassword;
        var new_val = "";
        var resetFormDiv = document.getElementById( 'changePasswdForm' );
        var input_id = '';
        var elementsLength = parseInt( resetFormDiv.getElementsByTagName( 'input' ).length );
        for ( var i=0; i<elementsLength; i++ ) {
            input_id = resetFormDiv.getElementsByTagName('input')[i].id;
            new_val = resetFormDiv.getElementsByTagName('input')[i].value;
            $( "label[for='"+input_id+"']" ).removeAttr('style');
            document.getElementsByTagName( "span" )[i].innerHTML = '';
            if(new_val == '') {
                document.getElementsByTagName( "span" )[i].innerHTML = 'This field is required.';
                $("label[for='"+input_id+"']").css('color','red');
            }
        }
        $( '#oldpassword' ).keydown(function (e) {
            if(e.keyCode == 8){
                $( '#changepwd_status' ).html('');
                // console.log("enter");
                    if( $('#oldpassword').val().length <= 6 && $('#oldpassword').val().length > 0 ) {
                        // console.log($( '#oldpassword' ).val().length);
                        flag = false;
                        $( '#resetpwdold_error' ).html( 'Please enter at least 6 characters.' );
                    }else if( $('#oldpassword').val().length >=15){
                        flag = false;
                         $( '#resetpwdold_error' ).html( 'Please enter no more than 15 characters.' );
                    }
                    if( $('#oldpassword').val().length == 1 ){
                        // console.log($( '#oldpassword' ).val().length);
                        $( '#resetpwdold_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    $( '#changepwd_status' ).html('');
                    if( $('#oldpassword').val().length <= 6 && $('#oldpassword').val().length > 0 ) {
                    flag = false;
                    $( '#resetpwdold_error' ).html( 'Please enter at least 6 characters.' );
                }
                if( $('#oldpassword').val().length >= 5) {
                    // console.log("check");
                        $( '#resetpwdold_error' ).html('');
                        $( '#resetpwdold_label' ).removeAttr('style');
                        flag = 1;
                }
            }
            // if( $('#oldpassword').val().length >= 6)  {
            //     if( $('#oldpassword').val().length <= 15 ) {
            //         $( '#resetpwdold_error' ).html('');
            //         $( '#resetpwdold_label' ).removeAttr('style');
            //     } else {
            //         $( '#resetpwdold_error' ).html('Please enter no more than 15 characters.');
            //         $('#resetpwdold_label').css('color','red');
            //     }
            // } else {
            //     if( $('#oldpassword').val().length == 0)  {
            //     	//alert(0);
            //         $( '#resetpwdold_error' ).html('This field is required.');
            //     } else {
            //         $( '#resetpwdold_error' ).html('Please enter at least 6 characters.');
            //         $('#resetpwdold_label').css('color','red');
            //     }
            // }
            // if( $('#oldpassword').val().indexOf(' ') >= 0 ) {
            //     var withoutSpace = $('#oldpassword').val().replace(/ /g,"");
            //     var withoutSpaceLength = withoutSpace.length;
            //     if( withoutSpaceLength == 0 ) {
            //         $('#resetpwdold_label').css('color','red');
            //         $( '#resetpwdold_error' ).html('This field is required.');
            //     } else if( withoutSpaceLength > 15 ) {
            //         $('#resetpwdold_label').css('color','red');
            //         $( '#resetpwdold_error' ).html('Please enter no more than 15 characters.');
            //     } else if( withoutSpaceLength < 6 ) {
            //         $('#resetpwdold_label').css('color','red');
            //         $( '#resetpwdold_error' ).html('Please enter at least 6 characters.');
            //     } else {
            //         $( '#resetpwdold_error' ).html('');
            //         $('#resetpwdold_label').removeAttr('style');
            //     }
            // }

        } );
        $( '#new_password' ).keydown(function (e) {
            if(e.keyCode == 8){
                $( '#changepwd_status' ).html('');
                // console.log("enter");
                    if( $('#new_password').val().length <= 6 && $('#new_password').val().length > 0 ) {
                        // console.log($( '#new_password' ).val().length);
                        flag = false;
                        $( '#resetpwd_error' ).html( 'Please enter at least 6 characters.' );
                    }else if( $('#new_password').val().length >=15){
                        flag = false;
                         $( '#resetpwd_error' ).html( 'Please enter no more than 15 characters.' );
                    }
                    if( $('#new_password').val().length == 1 ){
                        // console.log($( '#new_password' ).val().length);
                        $( '#resetpwd_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    $( '#changepwd_status' ).html('');
                    if( $('#new_password').val().length <= 6 && $('#new_password').val().length > 0 ) {
                    flag = false;
                    $( '#resetpwd_error' ).html( 'Please enter at least 6 characters.' );
                }
                if( $('#new_password').val().length >= 5) {
                    // console.log("check");
                        $( '#resetpwd_error' ).html('');
                        $( '#resetpwd_label' ).removeAttr('style');
                        flag = 1;
                }
            }
            // if( $('#new_password').val().length >= 6)  {
            //     if( $('#new_password').val().length <= 15 ) {
            //         $( '#resetpwd_error' ).html('');
            //         $( '#resetpwd_label' ).removeAttr('style');

            //     } else {
            //         $( '#resetpwd_error' ).html('Please enter no more than 15 characters.');
            //         $('#resetpwd_label').css('color','red');
            //     }
            // } else {
            //     if( $('#new_password').val().length == 0)  {
            //         $( '#resetpwd_error' ).html('This field is required.');
            //     } else {
            //         $( '#resetpwd_error' ).html('Please enter at least 6 characters.');
            //         $( '#resetpwd_label' ).css('color','red');
            //     }
            // }
            // if( $('#new_password').val().indexOf(' ') >= 0 ) {
            //     var withoutSpace = $('#new_password').val().replace(/ /g,"");
            //     var withoutSpaceLength = withoutSpace.length;
            //     if( withoutSpaceLength == 0 ) {
            //         $( '#resetpwd_error' ).html('This field is required.');
            //         $('#resetpwd_label').css('color','red');
            //     } else if( withoutSpaceLength > 15 ) {
            //         $( '#resetpwd_error' ).html('Please enter no more than 15 characters.');
            //         $('#resetpwd_label').css('color','red');
            //     } else if( withoutSpaceLength < 6 ) {
            //         $( '#resetpwd_error' ).html('Please enter at least 6 characters.');
            //         $('#resetpwd_label').css('color','red');
            //     } else {
            //         $( '#resetpwd_error' ).html('');
            //         $( '#resetpwd_label' ).removeAttr('style');
            //     }
            // }

        } );
        $( '#con_resetpassword' ).keydown(function (e) {
            if(e.keyCode == 8){
                $( '#changepwd_status' ).html('');
                // console.log("enter");
                    if( $('#con_resetpassword').val().length <= 6 && $('#con_resetpassword').val().length > 0 ) {
                        // console.log($( '#con_resetpassword' ).val().length);
                        flag = false;
                        $( '#resetpwdcon_error' ).html( 'Please enter at least 6 characters.' );
                    }else if( $('#con_resetpassword').val().length >=15){
                        flag = false;
                         $( '#resetpwdcon_error' ).html( 'Please enter no more than 15 characters.' );
                    }
                    if( $('#con_resetpassword').val().length == 1 ){
                        // console.log($( '#con_resetpassword' ).val().length);
                        $( '#resetpwdcon_error' ).html( 'This field is required.' );
                        flag = false;
                        } 
                }else{
                    $( '#changepwd_status' ).html('');
                    if( $('#con_resetpassword').val().length <= 6 && $('#con_resetpassword').val().length > 0 ) {
                    flag = false;
                    $( '#resetpwdcon_error' ).html( 'Please enter at least 6 characters.' );
                }
                if( $('#con_resetpassword').val().length >= 5) {
                    // console.log("check");
                        $( '#resetpwdcon_error' ).html('');
                        $( '#resetpwdcon_label' ).removeAttr('style');
                        flag = true;
                }
            }
            // if( $('#con_resetpassword').val().length >= 6)  {
            //     if( $('#con_resetpassword').val().length <= 15 ) {
            //         $( '#resetpwdcon_error' ).html('');
            //         $( '#resetpwdcon_label' ).removeAttr('style');
            //     } else {
            //         $( '#resetpwdcon_error' ).html('Please enter no more than 15 characters.');
            //         $('#resetpwdcon_label').css('color','red');
            //     }
            // } else {
            //     if( $('#con_resetpassword').val().length == 0)  {
            //         $( '#resetpwdcon_error' ).html('This field is required.');
            //     } else {
            //         $( '#resetpwdcon_error' ).html('Please enter at least 6 characters.');
            //         $('#resetpwdcon_label').css('color','red');
            //     }
            // }
            // if( $('#con_resetpassword').val().indexOf(' ') >= 0 ) {
            //     var withoutSpace = $('#con_resetpassword').val().replace(/ /g,"");
            //     var withoutSpaceLength = withoutSpace.length;
            //     if( withoutSpaceLength == 0 ) {
            //         $( '#resetpwdcon_error' ).html('This field is required.');
            //         $('#resetpwdcon_label').css('color','red');
            //     } else if( withoutSpaceLength > 15 ) {
            //         $( '#resetpwdcon_error' ).html('Please enter no more than 15 characters.');
            //         $('#resetpwdcon_label').css('color','red');
            //     } else if( withoutSpaceLength < 6 ) {
            //         $( '#resetpwdcon_error' ).html('Please enter at least 6 characters.');
            //         $('#resetpwdcon_label').css('color','red');
            //     } else {
            //         $( '#resetpwdcon_error' ).html('');
            //         $( '#resetpwdcon_label' ).removeAttr('style');
            //     }
            // }
        } );

        if ( $('#oldpassword').val() != '' ) {
            var withoutSpace = $('#oldpassword').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( withoutSpaceLength == 0 ) {
                $( '#resetpwdold_error' ).html('This field is required.');
                $( '#resetpwdold_label' ).css('color','red');
            } else if( withoutSpaceLength > 15 ) {
                $( '#resetpwdold_error' ).html('Please enter no more than 15 characters.');
                $( '#resetpwdold_label' ).css('color','red');
            } else if( withoutSpaceLength < 6 ) {
                $( '#resetpwdold_error' ).html('Please enter at least 6 characters.');
                $( '#resetpwdold_label' ).css('color','red');
            } else {
                $( '#resetpwdold_error' ).html('');
                $( '#resetpwdold_label' ).removeAttr('style');
            }
        }

        if ( $('#new_password').val() != '' ) {
            var withoutSpace = $('#new_password').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( withoutSpaceLength == 0 ) {
                $( '#resetpwd_label' ).css('color','red');
                $( '#resetpwd_error' ).html('This field is required.');
            } else if( withoutSpaceLength > 15 ) {
                $( '#resetpwd_label' ).css('color','red');
                $( '#resetpwd_error' ).html('Please enter no more than 15 characters.');
            } else if( withoutSpaceLength < 6 ) {
                $( '#resetpwd_label' ).css('color','red');
                $( '#resetpwd_error' ).html('Please enter at least 6 characters.');
            } else {
                $( '#resetpwd_label' ).removeAttr('style');
                $( '#resetpwd_error' ).html('');
            }
        }

        if( $('#con_resetpassword').val() != '' ) {
            var withoutSpace = $('#con_resetpassword').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( withoutSpaceLength == 0 ) {
                $( '#resetpwdcon_error' ).html('This field is required.');
                $( '#resetpwdcon_label' ).css('color','red');
            } else if( withoutSpaceLength > 15 ) {
                $( '#resetpwdcon_error' ).html('Please enter no more than 15 characters.');
                $( '#resetpwdcon_label' ).css('color','red');
            } else if( withoutSpaceLength < 6 ) {
                $( '#resetpwdcon_error' ).html('Please enter at least 6 characters.');
                $( '#resetpwdcon_label' ).css('color','red');
            } else {
                $( '#resetpwdcon_error' ).html('');
                $( '#resetpwdcon_label' ).removeAttr('style');
            }
        }

        if( $('#resetpwdold_error').html() == '' && $('#resetpwd_error').html() == '' && $('#resetpwdcon_error').html() == ''){
            flag = true;
        } else {
        	flag = false;
        }
        if( flag == true ) {
            if( password == confirm_passwd ) {
                var getResetData = {};
                getResetData['oldpassword'] = oldpassword;
                getResetData['password'] = password;
                getResetData['confirmpassword'] = confirm_passwd;
                getResetData['responsetype'] = 'json';
                console.log( JSON.stringify( getResetData ) );
                $('.ui-loader').show();
                var responsePromise = $http.post( BASE_URL+"changepassword",JSON.stringify(getResetData));
                responsePromise.success( function( data, status, headers, config ) {
                    $('.ui-loader').hide();
                    console.log(JSON.stringify(data));
                    $('#changepwd_status').html( data.message );
                    if( data.status == 'success' ){
                        $('#changepwd_status').removeClass('errorStatus').addClass('succesStatus');
                    } else {
                        $('#changepwd_status').removeClass('succesStatus').addClass('errorStatus');
                    }

                } );
                responsePromise.error( function ( data, status, headers, config ) {
                    $('.ui-loader').hide();
                    console.log( JSON.stringify( data ) );
                    if(navigator.connection.type == Connection.NONE) {
                        checkConnection();
                    }
                } );
            } else {
                $( '#changepwd_status' ).html( 'Password and confirm password mismatch' );
            }
        }
    };
} )


//+++++++++++++++++++++++++++TextMessage page controller+++++++++++++++++++++

mainApp.controller( "recentMessageController", function( $scope, $http, $state, $rootScope, $timeout ) {
    // var myScroll;
    // myScroll = new iScroll('wrapper');
    $scope.prevDisabled = false;
    $scope.nextDisabled = false;
    $scope.messageOptions = false;
    $scope.paginateSection = false;
    $scope.noMessageDiv = false;
    $scope.showLeadstext = false;
    $scope.showmeleads = true;
    $scope.limit = 4;
    $scope.recentChats = {};
    var checkVal = false;
    var pre_count = 0;
    var next_count = 0;
    //var chatArr;
    var users = 'billable';
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    $scope.userid = JSON.parse( dashboard_data ).data.profile.user_id;
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    if( proData == 2 ) {
        //for pro users
        $scope.isPro = true;
        $scope.messageOptions = true;
    } else {
        $scope.isPro = false;
    }
    $('.ui-loader').show();
    var getMessageData1 = {};
    getMessageData1['responsetype'] = 'json';
    //console.log( JSON.stringify( getMessageData1 ) );
    var responsePromise = $http.post( BASE_URL+"messages",JSON.stringify( getMessageData1 ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $('.ui-loader').hide();
        if( data.message == 'user not logged in' ) {
            //if user's session expires
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/login"
            });
        }
        $scope.limit = data.data.per_page; //update the max limit of message per page
        $scope.recentChats = data.data.msghistory;
        // angular.forEach($scope.recentChats, function(recentChat, filterKey) {
        //     recentChat.maxtime = $scope.convertTZ( recentChat.maxtime, data.data.timezone );
        // } );
        $scope.totalMessage = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                $scope.noMessage = "No recent messages available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
        }
        if ( $scope.totalMessage == 0 ) {
            // $('#billable_user').addClass('fullwidth_white');
            // $('#billable_user').addClass('fullwidth_blue');
            // $('#trial_user').addClass('fullwidth_blue');
            // $('#trial_user').removeClass('fullwidth_white');
            //$scope.trialUser();
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $('.phpdebugbar-openhandler-overlay').hide();
        $('.ui-loader').hide();
    } );

    $scope.backButtonMessages = function(){
        // console.log("back to dashboard");
        window.plugins.nativepagetransitions.slide({
            "direction": 'right',
            "href" : '#/home/affter_login'
        });
    };

    $scope.billableShow = true;
    $scope.billableUser = function () {
        checkVal = false;
        $scope.recentChats = {};
        pre_count = 0;
        next_count = 0;
        users = 'billable';
        $('#billable_user').addClass('fullwidth_bluemsg');
        $('#billable_user').removeClass('fullwidth_white');
        $('#trial_user').addClass('fullwidth_white');
        $('#trial_user').removeClass('fullwidth_bluemsg');
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        var getMessageData1 = {};
        getMessageData1['responsetype'] = 'json';
        console.log(JSON.stringify(getMessageData1));
        var responsePromise = $http.post(BASE_URL+"messages",JSON.stringify(getMessageData1));
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            $scope.limit = data.data.per_page;
            $scope.recentChats = data.data.msghistory;
            // angular.forEach($scope.recentChats, function(recentChat, filterKey) {
            //     recentChat.maxtime = $scope.convertTZ( recentChat.maxtime, data.data.timezone );
            // } );
            $scope.totalMessage = data.data.total_count;
            $scope.currentPage = data.data.current_page
            $scope.currentCount = $scope.currentPage * $scope.limit;
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                $scope.noMessage = "No recent messages available.";
            } else {
                $scope.noMessageDiv = false;
            }
            if ( $scope.totalMessage <= $scope.currentCount ) {
                $scope.paginateSection = false;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $('#arrow').css ( {"opacity":"0.5" });
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
            }  else {
                $scope.paginateSection = true;
                $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
                $('#arrow').css ( {"opacity":"0.5" });
            }
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };
    $scope.leadsUser = function(){
        checkVal = true;
        // console.log("show");
        // $('.ui-loader').show();
        $scope.showLeadstext = false;
        $scope.paginateSection = true;
        $scope.showmeleads = true;
        $scope.messageOptions = true;
    };
    $scope.showLeads = function( evt ){
        // console.log(evt);
        if(checkVal == true){
            // console.log(checkVal);
            // evt.stopImmediatePropagation();
            evt.preventDefault();
        }else{
        // console.log(checkVal);
        $('.ui-loader').show();
        $('.phpdebugbar-openhandler-overlay').show();
        $timeout(function(){
          $scope.showLeadstext = true;
          $('.ui-loader').hide();
          $('.phpdebugbar-openhandler-overlay').hide();
        }, 2500);
        $scope.paginateSection = false;
        $scope.messageOptions = false;
        $scope.showmeleads = false;
        $scope.recentChats = {};
        pre_count = 0;
        next_count = 0;
        users = 'trial';
        $('#billable_user').addClass('fullwidth_white');
        $('#billable_user').addClass('fullwidth_bluemsg');
        $('#trial_user').addClass('fullwidth_bluemsg');
        $('#trial_user').removeClass('fullwidth_white');
        var getMessageData = {};
        getMessageData['responsetype'] = 'json';
        getMessageData['sort'] = 'free';
        console.log( JSON.stringify( getMessageData ) );
        var responsePromise = $http.post( BASE_URL+"messages", JSON.stringify( getMessageData ) );
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            $scope.limit = data.data.per_page;
            $scope.recentChats = data.data.msghistory;
            // angular.forEach($scope.recentChats, function(recentChat, filterKey) {
            //     recentChat.maxtime = $scope.convertTZ( recentChat.maxtime, data.data.timezone );
            // } );
            $scope.totalMessage = data.data.total_count;
            $scope.currentPage = data.data.current_page
            $scope.currentCount = $scope.currentPage * $scope.limit;
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                $scope.noMessage = "No recent messages available.";
            } else {
                $scope.noMessageDiv = false;
            }
            if ( $scope.totalMessage <= $scope.currentCount ) {
                $scope.paginateSection = false;
                $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $('#arrow').css ( {"opacity":"0.5" });
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
            }  else {
                $scope.paginateSection = true;
                $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
                $('#arrow').css ( {"opacity":"0.5" });
            }
            $scope.paginateSection = false;
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
        checkVal = false;
      }
        // evt.stopImmediatePropagation();
        
    };
    $scope.replyLink = function () {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/reply"
        });
    };
    $scope.prevBtn = function () {
        $scope.recentChats = {};
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });

        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            getMessageData1['page'] = pre_count;
            if ( users == 'trial' ) {
                getMessageData1['sort'] = 'free';
            }
            var responsePromise = $http.post( BASE_URL+"messages", JSON.stringify( getMessageData1 ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.recentChats = data.data.msghistory;
                // angular.forEach($scope.recentChats, function(recentChat, filterKey) {
                //     recentChat.maxtime = $scope.convertTZ( recentChat.maxtime, data.data.timezone );
                // } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ){
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }
                next_count = next_count - 1;
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        $scope.recentChats = {};
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            getMessageData1['page'] = next_count+1;
            if ( users == 'trial' ) {
                getMessageData1['sort'] = 'free';
            }
            console.log( JSON.stringify( getMessageData1 ) );
            var responsePromise = $http.post( BASE_URL+"messages", JSON.stringify( getMessageData1 ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.limit = data.data.per_page;
                $scope.recentChats = data.data.msghistory;
                // angular.forEach($scope.recentChats, function(recentChat, filterKey) {
                //     recentChat.maxtime = $scope.convertTZ( recentChat.maxtime, data.data.timezone );
                // } );
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };

} )

//>>>>>>>>> Purchase controller >>>>>>>//

mainApp.controller( "purchaseController", function( $scope, $http, $state, $stateParams, $timeout, $rootScope ) {
    // console.log("enter purchase");
    $scope.showButton = true;
    $scope.showLoader = false;
    $scope.purchase_userid = $stateParams.model_id;
    var user_detail = localStorage.getItem("userDetail");
    var userData = JSON.parse(user_detail).data;
    var userId = userData.id;
    var page_name1 = 'purchaseController';
    var paidPhotoData = {};
    paidPhotoData['displayname'] = $stateParams.displayname;
    paidPhotoData['shout'] = $stateParams.shout;
    paidPhotoData['media_id'] = $stateParams.media_id;
    paidPhotoData['model_id'] = $stateParams.model_id;
    paidPhotoData['responsetype'] = 'json';
    console.log( 'photo data'+JSON.stringify( paidPhotoData ) );
    $scope.photoInfo = [];
    var responsePromise = $http.post(BASE_URL+"photopurchase",JSON.stringify(paidPhotoData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log( 'success'+JSON.stringify( data ) );
        $scope.purchase_displayname = data.displayname;
        $scope.purcahse_resulttext = data.result_text;
        $scope.purchase_buttontext = data.button_text;
        $scope.purchase_tagline = data.tagline;
        $scope.purchase_color = data.button_color;
        // console.log(data.button_color);
        if( data.button_color == 'green' ){
            // console.log("enter correct");
            $("#purchase_button").css({"background":"green","border-color":"green","color":"white"});
        }else{
            // console.log("enter wrong");
            $("#purchase_button").css({"background":"red","border-color":"red","color":"white"});
            $(".purchaseEarn p").css({"margin-top": "-30px" , "font-size": "11px" , "margin-left": "9px"});
        }
        // $scope.photoInfo = data;
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( 'error'+JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );
    // console.log($rootScope.currentState);
    // console.log($rootScope.previousState);
    $scope.purchaseUser = function(color, name, text){
        // $('.phpdebugbar-openhandler-overlay').show();
        $scope.showLoader = true;
        // $("#checkLoader").show();
        $scope.showButton = false;
        console.log(color, text);
        $scope.buttonColor = color;
        $scope.purchaseDisplay = name;
        if( $scope.buttonColor == 'red' ) {
            if( text == 'Add credits' ) {
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/addcredits/"+ userId+'/'+page_name1
                });
            }
            if( text == 'Click here to view.' ) {
                //alert($rootScope.previousState);
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/reply"+$stateParams.model_id
                } );

            }
        } 
        else if ( $scope.buttonColor == 'green' ){
        // console.log($rootScope.currentState);
        // console.log($rootScope.previousState);
        $scope.showLoader = true;
            var processpurchaseData = {};
            processpurchaseData['media_id'] = $stateParams.media_id;
            processpurchaseData['model_id'] = $stateParams.model_id;
            processpurchaseData['displayname'] = $scope.purchaseDisplay;
            processpurchaseData['responsetype'] = 'json';
            console.log( 'purchase data'+JSON.stringify( processpurchaseData ) );
            var responsePromise = $http.post( BASE_URL+'processpurchase',JSON.stringify( processpurchaseData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                // $("#checkLoader").hide();
                $scope.showLoader = false;
                if( data.status == 'success') {
                    // console.log("enter");
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/reply"+$stateParams.displayname
                    });
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( 'error'+JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
       }
        
    };
})


//+++++++++++++++++++++++++++Reply page controller+++++++++++++++++++++

mainApp.controller( "replyController", function( $scope, $http, $state, $stateParams, $timeout, $rootScope ) {
    var subscribeCount = 0;
    var start = 25;
    var count = 25;
    var loadstatus = 0;
    var flagvalue = false;
    $scope.showVideoIcon = false;
    $( '.phpdebugbar-openhandler-overlay').hide();
    var deviceHeight = $( window ).height();
    var headerHeight = $('#header').height();
    // console.log( headerHeight);
    var footerHeight = $('#footer').height();
    var innerheight = deviceHeight - ( headerHeight + footerHeight );
    //var dashboard_data = localStorage.getItem( "dashboard_data" );
    //var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $( '#msg_container' ).height( innerheight );
    //alert($( '#msg_container' ).height() );
    $timeout( function() {
       // alert($( '#msg_container' ).height() );
        $( '#msg_container' ).scrollTop( $(document).height()+9500 );
    }, 5000 );
    $scope.popupShow = false;
    $(".loaderId").hide();
    //$scope.imgPopupLoader = false;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    var user_status = JSON.parse( dashboard_data ).data.user_status;
    $scope.proInfo = proData;
    // console.log(proData);
    console.log($scope.proInfo);
    $scope.imgPopupShow = false;
    $scope.networkPopup = false;
    $scope.blockPopup = false;
    $scope.gotoBlockUsers = false;
    $scope.closePopupBlock = false;
    //console.log($scope.replyChats.isBlocked);
    $scope.videoStart = function(){
        $('.ui-loader').show();
        //<----- $('#overlay').show();
        // $scope.blockPopup = true;
        // console.log($scope.getBlockInfo.isBlocked);
        // $scope.blockMsg = "This user is blocked";----->
        // if (($scope.getBlockInfo.isBlocked == 'true') || ($scope.getBlockInfo.isBlocked == 'true' && $scope.getBlockInfo.isBlocked == 'true')) {
        //     $('#overlay').show();
        //     $scope.blockPopup = true;
        //     $scope.blockMsg = "This user is blocked";
        // }else if ($scope.getBlockInfo.isBlocked == '') {
        //     $('#overlay').show();
        //     $scope.blockPopup = true;
        //     $scope.blockMsg = "You are blocked";
        // }
        // else if ($scope.getBlockInfo.isBlocked == 'false' && $scope.getBlockInfo.isBlocked == 'false'){
            $('#overlay').hide();
            console.log(originator_id);
            var reply_detail = localStorage.getItem( "reply_data" );
            var replyData = JSON.parse( reply_detail ).data;
            $scope.replyChats1 = replyData;
            $scope.username1 = replyData.originator.displayname;
            // console.log(replyData);
            var videoData = {};
            videoData['responsetype'] = 'json';
            videoData['receiver'] = originator_id;
            // console.log(JSON.stringify(videoData));
            var responsePromise = $http.post( BASE_URL+"userdetails", JSON.stringify( videoData ) );
            responsePromise.success( function( data, status, headers, config ) {
            console.log(data);
            $('.ui-loader').hide();
                $scope.videoCallRate = data.data.video_call_rate;
                $scope.userBalance = data.data.originator_balance;
                $scope.reqBal = data.data.bal_req;
                $scope.origBlock = data.data.originator_block;
                $scope.receiverBlock = data.data.receiver_block;
                localStorage.setItem("receiverImage_data",data.data.profile_image);
                var receiveData = JSON.stringify({'username':$scope.username1,'origId':originator_id,'videoRate':$scope.videoCallRate,'bal':$scope.userBalance,'page_name':'reply'})
                     pubnub.unsubscribe({
                     channel : channel1
                });
                if ($scope.receiverBlock === true) {
                    // console.log("1st condition");
                    // console.log($scope.origBlock, $scope.receiverBlock );
                    $('#overlay').show();
                    $scope.blockPopup = true;
                    $scope.gotoBlockUsers = true;
                    $scope.closePopupBlock = false;
                    $scope.blockMsg = "This user is blocked";
                }else if ( $scope.origBlock === true) {
                    // console.log("2nd condition")
                    // console.log($scope.origBlock, $scope.receiverBlock );
                    $('#overlay').show();
                    $scope.blockPopup = true;
                    $scope.gotoBlockUsers = false;
                    $scope.closePopupBlock = true;
                    $scope.blockMsg = "You are blocked";
                }
                else if ($scope.origBlock === false && $scope.receiverBlock === false){ 
                    // $scope.blockPopup = false;
                    // $scope.gotoBlockUsers = false;
                    $scope.closePopupBlock = false;
                    console.log("3rd condition");
                    console.log($scope.origBlock, $scope.receiverBlock );
                    $('#overlay').hide();
                    if(data.data.originator_balance >= data.data.bal_req){
                        // console.log(receiveData);
                           $state.go('home.videoCalling',{receive_data:receiveData})
                    }else{
                        window.plugins.nativepagetransitions.slide({
                            "href" : "#/home/videoCredits/"+$scope.username1+'/'+$scope.reqBal
                        });
                    }
                }
            });
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $scope.networkPopup = true;
                $('.ui-loader').hide();
                // $('#overlay').show();
                if( navigator.connection.type == Connection.NONE ) {
                    console.log("connection");
                    checkConnection();
                }
            });
        
        //}
        
    };

    $scope.closeBlock = function(){
        $('#overlay').hide();
        $scope.blockPopup = false;
        $scope.closePopupBlock = false;
        $scope.gotoBlockUsers = false;
         pubnub.unsubscribe({
            channel : channel1
        });
        // window.plugins.nativepagetransitions.slide( {
        //     "direction": 'right',
        //     "href" : window.history.back()
        // } );
    };

    $scope.blockLink = function(){
        $('#overlay').hide();
        $scope.blockPopup = false;
        $scope.closePopupBlock = false;
        $scope.gotoBlockUsers = false;
         pubnub.unsubscribe({
            channel : channel1
        });
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/blockedusers"
        });
    };

    $scope.closeNetworkPopup = function () {
        $('#overlay').hide();
         $scope.networkPopup = false;
         pubnub.unsubscribe({
            channel : channel1
        });
         window.plugins.nativepagetransitions.slide( {
            "direction": 'right',
            "href" : window.history.back()
        } );
    };
    
     $scope.goBackAgain = function(){
            $('#overlay').hide();
            pubnub.unsubscribe({
                channel : channel1
            });
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : "#/home/messages"
            } );
        };
    $scope.closeMsgPopup = function () {
        $(".popup1").addClass('ng-hide');
        $scope.imgPopupShow = false;
        $('#overlay').hide();
    };
    $scope.closeHeaderPopup = function () {
        $('#overlay').hide();
        $('#BMPopup').hide();
    };
    // console.log($stateParams.messageId);
    var user_detail = localStorage.getItem("userDetail");
    var userData = JSON.parse(user_detail).data;
    //console.log(userData);
    var userId = userData.id;
    // console.log(userId);
    var originator_id = $stateParams.messageId;
    console.log(originator_id);
    $scope.user_id = originator_id;
    var display_name = '';
    var channel1;
    var getReplyData = {};
    getReplyData['responsetype'] = 'json';
    getReplyData['uid'] = originator_id;
    getReplyData['displayname'] = display_name;
    console.log(JSON.stringify(getReplyData));
    var responsePromise = $http.post( BASE_URL+"reply",JSON.stringify( getReplyData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.messages = data.data.messages;
        // console.log($scope.messages);
        localStorage.setItem( "reply_data", JSON.stringify( data ) );
        // localStorage.setItem( "purchase_data", JSON.stringify(messages1));
        messageHistory($scope.messages);
        if( data.message == 'user not logged in' ) {
            window.plugins.nativepagetransitions.slide( {
                "href" : "#/home/login"
            } );
        }
        // console.log( JSON.stringify( data ) );
        // console.log(data.data.messages.length);
        $scope.getBlockInfo = data.data;
        $scope.replyChats = data.data;
        $scope.username = data.data.originator.displayname;
        $scope.receiverProInfo = data.data.originator_profile.pro;
        if($scope.proInfo != $scope.receiverProInfo){
            // if( user_status == 'pending' || $scope.replyChats.originator.status == 'pending' ) {
            //     console.log($scope.proInfo, user_status);
            //     $scope.showVideoIcon = false;
            // } else {
            //     console.log($scope.proInfo, user_status);
                $scope.showVideoIcon = true;
            // }
        } else {
            $scope.showVideoIcon = false;
        }
        // if ($scope.proInfo != 2 && $scope.receiverProInfo !=2 ) {
        //     $scope.showVideoIcon = false;
        // }else{
        //     $scope.showVideoIcon = true;
        // }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.networkPopup = true;
        // $('#overlay').show();
        if( navigator.connection.type == Connection.NONE ) {
            checkConnection();
        }
        if( localStorage.getItem( "reply_data" ) ) {
            // console.log('setting reply data..');
            var reply_detail = localStorage.getItem( "reply_data" );
            var replyData = JSON.parse( reply_detail ).data;
            $scope.replyChats = replyData;
            $scope.username = replyData.originator.displayname;
            //console.log('username:'+$scope.username);
        }
    } );
    
    function addZeroes( num ) {
       // Cast as number
       var num = Number(num);
       // If there is no decimal, or the decimal is less than 2 digits, toFixed
       if (String(num).split(".").length < 2 || String(num).split(".")[1].length<=2 ){
           num = num.toFixed(2);
       }
       // Return the number
       return num;
  }  
    function messageHistory(messages)
    {
        //message = message || [];
        // console.log("History");
        // console.log(messages);
        var reply_detail = localStorage.getItem( "reply_data" );
        var replyData = JSON.parse( reply_detail ).data;
        var user_session = userId;
        var photoNameid = 'open_img';
        var photoNameid1 = 'open_img1';
        var unlockNameid = 'unlock_img';
        // var test1 = 'test';
        // localStorage.setItem( "purchase_data", JSON.stringify(messages));
        for(var i = 0; i < messages.length; i++) {
            // console.log(messages[i]);
            if (messages[i].blocked == 'yes') {
                //alert('user is blocked');
                //just a simple way to not display messages that users sent while in a blocked status
            } 
            // else if (messages[i].blocked == 'no' && messages[i].blocker != '0' ) {
            //     //alert('blocked');
            // } 
            else if (messages[i].msg_type == 'tip'){
                    if (user_session == messages[i].originator_u_id){
                        // console.log("hi tip")
                        $("#msg_container").prepend('<div class="you" style="white-space:normal;text-align:right;background:#FCF3E3;padding-right:10px;"> <p>Tip sent @ '+ messages[i].date_time + '</p><p><div class="paidtext" style="background-color:green!important;float:right;">$'+ addZeroes(messages[i].msg_rate) + '</div></p> </div>');
                    }
                    else{
                        // console.log("hi else tip")
                        $("#msg_container").prepend('<div class="you" style="white-space:normal;text-align:left;background:#FCF3E3;"><p>Tip sent @ '+ messages[i].date_time + '</p><p><div class="paidtext"  style="background-color:green!important;">$'+ addZeroes(messages[i].msg_rate) + '</div></p></div>');
                        //$(".messageLog").append('<li class="ui-li-static ui-body-inherit" style="white-space:normal;text-align:center;background:#424242;color:white;"><div><div style="font-size:12px;"><i>User has sent a paid photo request.</i></div><div style="margin-top:10px"><a href="/mobile/users/photopurchase?displayname={{$originator->id}}&media_id=' + message.media_id  +  '&model_id=' +  message.originator_u_id +  '"><img src="{{BASE_URL}}/images/loving_it.png" height="40" width="40" border="0" alt="loving it" /></a><a href="/mobile/users/photopurchase?displayname={{$originator->id}}&media_id=' + message.media_id  +  '&model_id=' +  message.originator_u_id +  '" data-ajax="false" style="color:#7ebbea;">Click to view photo</a></div></div></li>');
                    }
            }
            else if (messages[i].msg_type == 'photo_sale'){ 
                // console.log("messagetype/");                           
                            //check if a photo purchase request sent and display accordingly
                    var tagline = (typeof messages[i].tagline === 'undefined') ? '' : messages[i].tagline.substring(0,200) ;
                    var shout = (typeof messages[i].shout === 'undefined') ? 'no' : messages[i].shout ;
                    var p_image = (typeof messages[i].cloudinary_photo_id_p === 'undefined') ? "img/loving_it.png" : IMAGE_URL+'users/'+ messages[i].originator_u_id + '/'+ messages[i].cloudinary_photo_id_p;
                    if (user_session == messages[i].originator_u_id){
                        // console.log("hi photo sale div");
                        $("#msg_container").prepend('<div class="me" style="white-space:normal;text-align:left;background:#424242;color:white;"><div><div style="margin-top:10px"><a id="'+photoNameid1+'" class="purchasePhotoLink" rel="#/home/purchasePaidPhoto?displayname='+messages[i].originator_u_id+'&shout='+ shout +'&media_id=' + messages[i].media_id  + '&model_id=' +  messages[i].originator_u_id +'"><img src="'+ p_image +'" height="100" width="80" border="0" alt="loving it"  style="float:left;margin-left: 10px;color:#007aff;font-weight:bold;"/></a><div class="rightMsgs"><div style="color: green;font-size:12px;float: right;margin-right: 15px;width: 60%;"><i>Photo purchase request sent!.</i></div> <div id="description" style="float: left;padding: 10px;width: 60%;margin-left: 8px;font-size: 15px;">' + tagline  + '</div></div> </div></div>');
                        //$("#msg_container").prepend('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;">Photo purchase request sent!</div>');                                        
                    }
                    else{ 
                        $("#msg_container").prepend('<div class="me" style="white-space:normal;text-align:left;background:#424242;color:white;"><div><div class="imgUnlock" style="margin-top:10px"><a id="'+photoNameid+'" class="purchasePhotoLink" rel="#/home/purchasePaidPhoto?displayname='+messages[i].originator_u_id+'&shout='+ shout +'&media_id=' + messages[i].media_id  + '&model_id=' +  messages[i].originator_u_id +'" data-ajax="false"><img src="'+ p_image +'" height="100" width="80" border="0" alt="loving it"  style="float:left;margin-left: 10px;color:#007aff;font-weight:bold;"/></a><div class="rightMsgs"><div style="color: green;font-size:12px;float: left;margin-left: 10px;width: 50%;"><i>User has sent a paid photo request.</i></div> <a id="'+unlockNameid+'" rel="#/home/purchasePaidPhoto?displayname='+messages[i].originator_u_id+'&shout='+ shout +'&media_id=' + messages[i].media_id  + '&model_id=' +  messages[i].originator_u_id +'" class="unlockBtn" data-ajax="false" style="color:#fff;">Unlock</a><div id="description" style="float: left;padding: 10px;width: 60%;margin-left: 8px;font-size: 15px;">' + tagline  + '</div></div> </div></div>');
                        //$("#msg_container").prepend('<div class="me" style="white-space:normal;text-align:left;background:#424242;color:white;"><div><div style="margin-top:10px"><a id="'+photoNameid+'" class="purchasePhotoLink" rel="#/home/upgrade" data-ajax="false"><img src="'+ p_image +'" height="100" width="80" border="0" alt="loving it"  style="float:left;margin-left: 10px;color:#007aff;font-weight:bold;"/></a><div class="rightMsgs"><div style="color: green;font-size:12px;float: right;margin-right: 15px;width: 60%;"><i>User has sent a paid photo request.</i></div> <div id="description" style="float: left;padding: 10px;width: 60%;margin-left: 8px;font-size: 15px;">' + tagline  + '</div></div> <a id="'+unlockNameid+'" rel="#/home/upgrade" class="unlockBtn" data-ajax="false" style="color:#fff;">Unlock</a></div></div>');                                                
                        //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:#0dff00;"><div><div style="font-size:12px; float: right; padding-right: 30px;"><i>User has sent you a paid photo request.</i></div><div class="salephoto" style="margin-top:10px"><a class="purchasePhotoLink" rel="#/home/paidphoto/'+messages[i].media_id+'/'+messages[i].originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;"> <img src="" height="40" width="40" border="0" alt="loving it" style="background: #0dff00; float: left; margin-left: 10px; height: 55px;"/> </a></div></div><div style="color: white; float: right;margin:0 auto; padding-bottom: 10px;width:80%;"> <p class="shoutmsg" style="font-size: 12px; width: 73%; text-align: left; padding-right:10px; float: left; box-sizing: border-box; padding-top: 5px;">I just took this photo for you when I was in the shower this morning. I hope you like it more than..</p><div style="width: 65px; background:#09ba00; height: 25px; float: right; border-radius: 6px; text-align: center; padding-top: 3px; font-weight: bold; margin: auto;font-size: 12px;margin-top: 15px;"><a>UNLOCK</a></div></div><div style="color:white;padding-left: 10px;float:left;"> <span>'+ messages[i].date_time +'</span></div></div>');                        
                        //$("#msg_container").prepend('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"><div><div style="font-size:12px;"><i>User has sent a paid photo request.</i></div><div style="margin-top:10px"><a class="purchasePhotoLink" rel="#/home/paidphoto/'+messages[i].media_id+'/'+messages[i].originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;"> <img src="img/loving_it.png" height="40" width="40" border="0" alt="loving it" /> </a> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+messages[i].media_id+'/'+messages[i].originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;" data-ajax="false" style="color:#7ebbea;text-decoration:underline;"> Click to view photo </a></div></div></div>');
                        }                                                                                                                     
                }    //('<li><a style="border-width:0px"><img width="60" height="40" title="Click to preview" itemprop="image" alt="" src="'+path+'" style="border-width:0px"/></a><a class="closeButton "'+newClass+'" href="javascript:softDelFile('+imgid+','+imgid+')"></a></li>')

            else if ( messages[i].msg_type == 'video_sale' ) {                                                                                                 
                // console.log("video/");  
                //check if a photo purchase request sent and display accordingly
                if ( user_session == messages[i].originator_u_id ) {
                    $( "#msg_container" ).prepend( '<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"> <div> <div style="font-size:14px; margin-top: 10px"> Photo purchase request sent!</div> </div> </div>');
                } else {
                    //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"><div><div style="font-size:12px;"><i>User has sent a paid photo request.</i></div><div style="margin-top:10px"><a href="txt_message/photo_purchase.php?rdisplay=<?php echo $receiver_display; ?>&media_id=' + history[i].media_id  +  '&model_id=' +  history[i].originator_u_id +  '"><img src="img/loving_it.png" height="40" width="40" border="0" alt="loving it" /></a><a href="txt_message/photo_purchase.php?rdisplay=<?php echo $receiver_display; ?>&media_id=' + history[i].media_id  +  '&model_id=' +  history[i].originator_u_id +  '" data-ajax="false" style="color:#7ebbea;">Click to view photo</a></div></div></div>');
                    $( "#msg_container" ).prepend( '<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"> <div> <div style="font-size:12px;"> <i>User has sent a paid photo request.</i> </div> <div style="margin-top:10px"> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+messages[i].media_id+'/'+messages[i].originator_u_id+'/'+replyData.originator.displayname+'"> <img src="img/loving_it.png" height="40" width="40" border="0" alt="loving it" /> </a> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+messages[i].media_id+'/'+messages[i].originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;" data-ajax="false" style="color:#7ebbea; text-decoration:underline; "> Click to view photo </a> </div> </div> </div>');
                }
            } else if (messages[i].msg_type == 'trialexpired' || messages[i].msg_type == 'upgrade' || messages[i].msg_type == 'creditexpired') {
                //just a simple way to not display messages that users sent while in a trial expired status
                //alert('trialexpired');
            }

            // start image insertion
            else if (typeof messages[i].cloudinary_photo_id != 'undefined' && messages[i].cloudinary_photo_id) {
                //alert('history cloudinary');
                var imgname = messages[i].cloudinary_photo_id;                                              
                            if(messages[i].cloudinary_photo_id.indexOf(".jpg") == -1){
                                imgname = imgname + '.jpg';
                            }
                var small_image_url = IMAGE_URL+'users/'+messages[i].originator_u_id+'/'+imgname;
                var large_image_url = IMAGE_URL+'users/'+ messages[i].originator_u_id+'/big_'+imgname;
                //console.log("history cloudinary..");
                //console.log("small_image_url==="+small_image_url);
                // var large_image_url = $.cloudinary.url(history[i].cloudinary_photo_id,
                //     {
                //         width: 300, height: 460,
                //         crop: 'fit'
                //     });
                // var small_image_url = $.cloudinary.image(history[i].cloudinary_photo_id,
                //     {
                //         width: 100, height: 150,
                //         crop: 'fit',fetch_format: 'png',
                //         radius: 15
                //     });
                // var large_splitted_url = large_image_url.split('//');
                // var small_splitted_url = $(small_image_url).attr("src").split('//');

                var li = '';
                if ( messages[i].originator_u_id !=  user_session ) {
                    //li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
                    if(messages[i].charge_rate == 0 || messages[i].charge_rate == 0.00 || messages[i].charge_rate == null ) {

                       if(messages[i].msg_rate>0)
                       {
                            li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
                            var rate = "<div class='paidtext'>$"+ messages[i].msg_rate +"</div>";
                       }
                       else
                       {
                           li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
                           var rate = "<div class='paidtext'>$0</div>";
                       }


                    } else {
                       li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
                       var rate = "<div class='paidtext'>$"+messages[i].charge_rate + "</div>";
                    }

                } else {
                    li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
                    if( messages[i].charge_rate == 0 || messages[i].charge_rate == 0.00 || messages[i].charge_rate == null ) {

                       if(messages[i].msg_rate>0)
                       {
                            li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
                            var rate = "<div class='paidtext'>$"+ messages[i].msg_rate +"</div>";
                       }
                       else
                       {
                           li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
                           var rate = "<div class='paidtext'>$0</div>";
                       }
                    } else {
                       li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
                       var rate = "<div class='paidtext'>$"+messages[i].charge_rate + "</div>";
                    }
                }
                //var link = $('<a href="javascript:;"></a>').append('<img src="http://'+small_splitted_url[1]+'" id="message_image_'+history[i].media_id+'" data="http://' + large_splitted_url[1] + '">');
                    var pname = 'message_image';
                    
                    var tagline = (typeof messages[i].tagline === 'undefined') ? '' : messages[i].tagline.substring(0,200);
                    // var linkl = $('<div style="float:left;"><a id="message_image_'+messages[i].media_id+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>'); //.append('<img src="'+ image_url + '">');
                    // var linkr = $('<div style="float:right;"><a id="message_image_'+messages[i].media_id+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>'); //.append('<img src="'+ image_url + '">');
                    var linkl = $('<div style="float:left;"><a id="'+pname+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>'); //.append('<img src="'+ image_url + '">');
                    var linkr = $('<div style="float:right;"><a id="'+pname+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>');
                    var descl = '<div id="description" style="float:left;padding: 0px 10px;width:53%;font-size: 14px;">' + tagline  + '</div>';
                    var descr = '<div id="description" style="float:right;padding:0px 10px;width:53%;font-size: 14px;">' + tagline  + '</div>';
                                        
                //var link = $('<a href="javascript:;"></a>').append('<img src="'+small_image_url+'" id="message_image_'+messages[i].media_id+'" data="'+large_image_url+'">');
                if ( messages[i].originator_u_id !=  user_session ){
                    // console.log("left"+linkl);
                        $(li).append(linkl);
                        $(li).append(descl);
                    }else
                    {
                        // console.log("right"+linkr);
                        $(li).append(linkr);
                        $(li).append(descr);
                    }
                // $(li).append(link);
                $(li).append(rate);
                $("#msg_container").prepend(li);

            }

            else if ( messages[i].txt_available ==  0 && user_session == messages[i].originator_u_id) {
                //alert('user not available');
            }
            else if (messages[i].msg_type == 'trialexpired' || messages[i].msg_type == 'upgrade' || messages[i].msg_type == 'creditexpired')
            {
                //just a simple way to not display messages that users sent while in a trial expired status

            }
            // //check if message from history is for this user or sender and prepare html
            else if ( messages[i].originator_u_id !=  user_session ) {
                if( messages[i].msg_rate == 0 || messages[i].msg_rate == 0.00 || messages[i].msg_rate == null ) {
                    //$("#msg_container").append( "<div class='you'> <p>" + history[i].user_msg + "</p> <span>" + history[i].date_time + "</span><div class='freetext'>free</div></div>" );
                    if( messages[i].msg_type == 'trial' ) {
                         $("#msg_container").prepend( "<div class='you'> <p>" + messages[i].user_msg + "</p> <span>" + messages[i].date_time + "</span><div class='freetext'>free</div></div>" );
                    } else if( messages[i].msg_type == 'active' && messages[i].receiver_user_status == 'pending' || messages[i].sender_user_status=='pending' ) {
                         $("#msg_container").prepend( "<div class='you'> <p>" + messages[i].user_msg + "</p> <span>" + messages[i].date_time + "</span><div class='freetext'>free</div></div>" );
                    } else {
                        $("#msg_container").prepend("<div class='you'> <p>"+messages[i].user_msg+"</p> <span>"+ messages[i].date_time +"</span><div class='paidtext'>$0</div></div>");
                    }
                } else {
                    $("#msg_container").prepend("<div class='you'> <p>"+messages[i].user_msg+"</p> <span>"+ messages[i].date_time +"</span><div class='paidtext'>$"+messages[i].msg_rate+"</div></div>");
                }
            } else {
                if( messages[i].msg_rate == 0 || messages[i].msg_rate == 0.00 || messages[i].msg_rate == null ) {
                    //$("#msg_container").append("<div class='me'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='freetext'>free</div></div>");
                    if(messages[i].msg_type == 'trial') {
                        $("#msg_container").prepend("<div class='me'> <p>"+messages[i].user_msg+"</p> <span>"+ messages[i].date_time +"</span><div class='freetext'>free</div></div>");
                    } else if(messages[i].msg_type == 'active' && messages[i].receiver_user_status== 'pending' || messages[i].sender_user_status=='pending') {
                        $("#msg_container").prepend("<div class='me'> <p>"+messages[i].user_msg+"</p> <span>"+ messages[i].date_time +"</span><div class='freetext'>free</div></div>");
                    } else {
                        $("#msg_container").prepend("<div class='me'> <p>"+messages[i].user_msg+"</p> <span>"+ messages[i].date_time +"</span><div class='paidtext'>$0</div></div>");
                    }
                } else {
                    $("#msg_container").prepend("<div class='me'> <p>"+messages[i].user_msg+"</p> <span>"+ messages[i].date_time +"</span><div class='paidtext'>$"+messages[i].msg_rate+"</div></div>");
                }

                //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:#0dff00;"><div><div style="font-size:12px; float: right; padding-right: 30px;"><i>User has sent you a paid photo request.</i></div><div class="salephoto" style="margin-top:10px"><a class="purchasePhotoLink" rel="#/home/paidphoto/'+messages[i].media_id+'/'+messages[i].originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;"> <img src="" height="40" width="40" border="0" alt="loving it" style="background: #0dff00; float: left; margin-left: 10px; height: 55px;"/> </a></div></div><div style="color: white; float: right;margin:0 auto; padding-bottom: 10px;width:80%;"> <p class="shoutmsg" style="font-size: 12px; width: 73%; text-align: left; padding-right:10px; float: left; box-sizing: border-box; padding-top: 5px;">I just took this photo for you when I was in the shower this morning. I hope you like it more than..</p><div style="width: 65px; background:#09ba00; height: 25px; float: right; border-radius: 6px; text-align: center; padding-top: 3px; font-weight: bold; margin: auto;font-size: 12px;margin-top: 15px;"><a>UNLOCK</a></div></div><div style="color:white;padding-left: 10px;float:left;"> <span>'+ messages[i].date_time +'</span></div></div>');
           // $( "#msg_container" ).append( '<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"> <div> <div style="font-size:12px;"> </div> <div style="margin-top:10px"> <a id="'+test1+'" class="purchasePhotoLink" rel="#/home/upgrade"><a class="purchasePhotoLink" rel="#/home/upgrade" href="javascript:;" data-ajax="false" style="color:#7ebbea; text-decoration:underline; "> Click to view photo </a> </div> </div> </div>');
            }


            $( '#message_image' ).on( 'click', function(event) {
                event.preventDefault();
                //alert('click id');
                //$(".loaderId").show();
                var bigimageurl = $(this).data( "bigimageurl" );
                $("#bigMsgImg" ).attr( "src", "" );
                $("#bigMsgImg" ).attr( "src", bigimageurl ); 
                //$("#bigMsgImg").one("load", function() {
                    //$(".loaderId").hide();
                    $(".popup1").removeClass('ng-hide');
                    $scope.imgPopupShow = true;
                    $('#overlay').show();
                    //$(this).show();
               // });

            } );
            
            // $( '#test' ).on( 'click', function(event) {
            //     console.log($(this).attr("rel"));
            //         pubnub.unsubscribe({
            //         channel : channel1
            //     });
            //     //window.location.href = "#/home/purchasePaidPhoto";
            //     window.location.href = $(this).attr("rel");
            // } );
            // $( '#open_img' ).on( 'click', function(event) {
            //         event.preventDefault();
            //         console.log($(this).attr("rel"));
            //         pubnub.unsubscribe({
            //         channel : channel1
            //     });
            //     //window.location.href = "#/home/purchasePaidPhoto";
            //     window.location.href = $(this).attr("rel");
            // } );
            
            //$('#msg_container').scrollTop( $(document).height() );
            
            // $('#unlock_img').on( 'click', function(event) {
            //     event.preventDefault();
            //     console.log($(this).attr("rel"));
            //         pubnub.unsubscribe({
            //         channel : channel1
            //     });
            //     //window.location.href = "#/home/purchasePaidPhoto";
            //     window.location.href = $(this).attr("rel");
            // } );
            

        }
        $("div.imgUnlock").delegate("a.purchasePhotoLink", "click", function(event){
            event.preventDefault();
             console.log($(this).attr("rel"));
                pubnub.unsubscribe({
                channel : channel1
            });
            //window.location.href = "#/home/purchasePaidPhoto";
            window.location.href = $(this).attr("rel");
        });
        $("div.rightMsgs").delegate("a.unlockBtn", "click", function(event){
            event.preventDefault();
             console.log($(this).attr("rel"));
                pubnub.unsubscribe({
                channel : channel1
            });
            //window.location.href = "#/home/purchasePaidPhoto";
            window.location.href = $(this).attr("rel");
        });
        $("#msg_container").prepend("<div class='me loaderId'><img src='img/loader.gif'></div>");
        $(".loaderId").hide();
        $( '#msg_container' ).scrollTop( $(document).height()+9500 );
        // console.log(messages.length);
        if(messages.length < 25){
            loadstatus = 1;
            // console.log("loader1");
            flagvalue = true;
            $("#msg_container").prepend("<div class='me loaderId1'>Messages</div>");
            // $(".loaderId").text("Messages").show();
        }
                 
    }

    if( parseInt( userId ) < parseInt( originator_id ) ) {
    	channel1 = userId+'X'+originator_id;
    } else {
    	channel1 = originator_id+'X'+userId;
    }
    // console.log(channel1);
    $.cloudinary.config({ cloud_name: 'nobetek-llc', api_key: '247749274532722'});
    var pubnub = PUBNUB.init({
        publish_key: 'pub-c-d69a065d-1b7c-4619-baf8-f240601221bd',
        subscribe_key: 'sub-c-f7bbad58-bf8d-11e3-a219-02ee2ddab7fe',
        auth_key: userId,
        uuid: userId,
        ssl: true
    });
    // if( loadCount%2 == 1 ) {
    //     alert('odd numbr called');
        pubnub.state({
            channel  : channel1,
            uuid     : userId,
            callback : function(m){
                // console.log('in pubnub state:'+m);
                // console.log('histry called');
                // pubnub.history({
                // channel: channel1,
                // count: 100,
                // end: m.lastdelete,
            //     callback: function(history){
            //         //alert($scope.replyChats.isBlocked);
            //         history = history[0];
            //         //message = message || [];
            //         console.log("History");
            //         console.log(history);
            //         var reply_detail = localStorage.getItem( "reply_data" );
            //         var replyData = JSON.parse( reply_detail ).data;
            //         var user_session = userId;

            //         for(var i = 0; i < history.length; i++) {

            //             if (history[i].blocked == 'yes') {
            //                 //alert('user is blocked');
            //                 //just a simple way to not display messages that users sent while in a blocked status
            //             } else if (history[i].blocked == 'no' && history[i].blocker != '0' ) {
            //                 //alert('blocked');
            //             } else if ( history[i].msg_type == 'video_sale' ) {
            //                 //alert('video_sale');
            //                 //check if a photo purchase request sent and display accordingly
            //                 if ( user_session == history[i].originator_u_id ) {
            //                     $( "#msg_container" ).append( '<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"> <div> <div style="font-size:14px; margin-top: 10px"> Photo purchase request sent!</div> </div> </div>');
            //                 } else {
            //                     //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"><div><div style="font-size:12px;"><i>User has sent a paid photo request.</i></div><div style="margin-top:10px"><a href="txt_message/photo_purchase.php?rdisplay=<?php echo $receiver_display; ?>&media_id=' + history[i].media_id  +  '&model_id=' +  history[i].originator_u_id +  '"><img src="img/loving_it.png" height="40" width="40" border="0" alt="loving it" /></a><a href="txt_message/photo_purchase.php?rdisplay=<?php echo $receiver_display; ?>&media_id=' + history[i].media_id  +  '&model_id=' +  history[i].originator_u_id +  '" data-ajax="false" style="color:#7ebbea;">Click to view photo</a></div></div></div>');
            //                     $( "#msg_container" ).append( '<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"> <div> <div style="font-size:12px;"> <i>User has sent a paid photo request.</i> </div> <div style="margin-top:10px"> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+history[i].media_id+'/'+history[i].originator_u_id+'/'+replyData.originator.displayname+'"> <img src="img/loving_it.png" height="40" width="40" border="0" alt="loving it" /> </a> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+history[i].media_id+'/'+history[i].originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;" data-ajax="false" style="color:#7ebbea; text-decoration:underline; "> Click to view photo </a> </div> </div> </div>');
            //                 }
            //             } else if (history[i].msg_type == 'trialexpired' || history[i].msg_type == 'upgrade') {
            //                 //just a simple way to not display messages that users sent while in a trial expired status
            //                 //alert('trialexpired');
            //             }

            //             // start image insertion
            //             else if (typeof history[i].cloudinary_photo_id != 'undefined' && history[i].cloudinary_photo_id) {
            //                 //alert('history cloudinary');
            //                 var small_image_url = IMAGE_URL+history[i].originator_u_id+'/'+history[i].cloudinary_photo_id;
            //                 var large_image_url = IMAGE_URL+history[i].originator_u_id+'/big_'+history[i].cloudinary_photo_id;
            //                 //console.log("history cloudinary..");
            //                 //console.log("small_image_url==="+small_image_url);
            //                 // var large_image_url = $.cloudinary.url(history[i].cloudinary_photo_id,
            //                 //     {
            //                 //         width: 300, height: 460,
            //                 //         crop: 'fit'
            //                 //     });
            //                 // var small_image_url = $.cloudinary.image(history[i].cloudinary_photo_id,
            //                 //     {
            //                 //         width: 100, height: 150,
            //                 //         crop: 'fit',fetch_format: 'png',
            //                 //         radius: 15
            //                 //     });
            //                 // var large_splitted_url = large_image_url.split('//');
            //                 // var small_splitted_url = $(small_image_url).attr("src").split('//');

            //                 var li = '';
            //                 if ( history[i].originator_u_id !=  user_session ) {
            //                     //li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
            //                     if(history[i].charge_rate == 0 || history[i].charge_rate == 0.00 || history[i].charge_rate == null ) {

            //                        if(history[i].msg_rate>0)
            //                        {
            //                             li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
            //                             var rate = "<div class='paidtext'>$"+ history[i].msg_rate +"</div>";
            //                        }
            //                        else
            //                        {
            //                            li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
            //                            var rate = "<div class='paidtext'>$0</div>";
            //                        }


            //                     } else {
            //                        li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
            //                        var rate = "<div class='paidtext'>$"+history[i].charge_rate + "</div>";
            //                     }

            //                 } else {
            //                     li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
            //                     if( history[i].charge_rate == 0 || history[i].charge_rate == 0.00 || history[i].charge_rate == null ) {

            //                        if(history[i].msg_rate>0)
            //                        {
            //                             li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
            //                             var rate = "<div class='paidtext'>$"+ history[i].msg_rate +"</div>";
            //                        }
            //                        else
            //                        {
            //                            li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
            //                            var rate = "<div class='paidtext'>$0</div>";
            //                        }
            //                     } else {
            //                        li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
            //                        var rate = "<div class='paidtext'>$"+history[i].charge_rate + "</div>";
            //                     }
            //                 }
            //                 //var link = $('<a href="javascript:;"></a>').append('<img src="http://'+small_splitted_url[1]+'" id="message_image_'+history[i].media_id+'" data="http://' + large_splitted_url[1] + '">');
            //                 var link = $('<a href="javascript:;"></a>').append('<img src="'+small_image_url+'" id="message_image_'+history[i].media_id+'" data="'+large_image_url+'">');
            //                 $(li).append(link);
            //                 $(li).append(rate);
            //                 $("#msg_container").append(li);

            //             }
            //             else if ( history[i].txt_available ==  0 && user_session == history[i].originator_u_id) {
            //                 //alert('user not available');
            //             }
            //             else if (history[i].msg_type == 'trialexpired' || history[i].msg_type == 'upgrade' || history[i].msg_type == 'creditexpired')
            //             {
            //                 //just a simple way to not display messages that users sent while in a trial expired status

            //             }
            //             //check if message from history is for this user or sender and prepare html
            //             else if ( history[i].originator_u_id !=  user_session ) {
            //                 if( history[i].msg_rate == 0 || history[i].msg_rate == 0.00 || history[i].msg_rate == null ) {
            //                     //$("#msg_container").append( "<div class='you'> <p>" + history[i].user_msg + "</p> <span>" + history[i].date_time + "</span><div class='freetext'>free</div></div>" );
            //                     if( history[i].msg_type == 'trial' ) {
            //                          $("#msg_container").append( "<div class='you'> <p>" + history[i].user_msg + "</p> <span>" + history[i].date_time + "</span><div class='freetext'>free</div></div>" );
            //                     } else if( history[i].msg_type == 'active' && history[i].receiver_user_status == 'pending' || history[i].sender_user_status=='pending' ) {
            //                          $("#msg_container").append( "<div class='you'> <p>" + history[i].user_msg + "</p> <span>" + history[i].date_time + "</span><div class='freetext'>free</div></div>" );
            //                     } else {
            //                         $("#msg_container").append("<div class='you'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='paidtext'>$0</div></div>");
            //                     }
            //                 } else {
            //                     $("#msg_container").append("<div class='you'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='paidtext'>$"+history[i].msg_rate+"</div></div>");
            //                 }
            //             } else {
            //                 if( history[i].msg_rate == 0 || history[i].msg_rate == 0.00 || history[i].msg_rate == null ) {
            //                     //$("#msg_container").append("<div class='me'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='freetext'>free</div></div>");
            //                     if(history[i].msg_type == 'trial') {
            //                         $("#msg_container").append("<div class='me'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='freetext'>free</div></div>");
            //                     } else if(history[i].msg_type == 'active' && history[i].receiver_user_status== 'pending' || history[i].sender_user_status=='pending') {
            //                         $("#msg_container").append("<div class='me'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='freetext'>free</div></div>");
            //                     } else {
            //                         $("#msg_container").append("<div class='me'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='paidtext'>$0</div></div>");
            //                     }
            //                 } else {
            //                     $("#msg_container").append("<div class='me'> <p>"+history[i].user_msg+"</p> <span>"+ history[i].date_time +"</span><div class='paidtext'>$"+history[i].msg_rate+"</div></div>");
            //                 }
            //             }


            //             $( '#message_image_'+history[i].media_id ).on( 'click', function(event) {
				        // 	//alert('click id');
            //                 //$(".loaderId").show();
				        //     var bigimageurl = $(this).attr( "data" );
				        //     $("#bigMsgImg").attr( "src", bigimageurl );
            //                 //$("#bigMsgImg").one("load", function() {
            //                     //$(".loaderId").hide();
            //                     $(".popup1").removeClass('ng-hide');
            //                     $scope.imgPopupShow = true;
            //                     $('#overlay').show();
            //                     //$(this).show();
            //                // });

				        // } );
            //             //$('#msg_container').scrollTop( $(document).height() );
            //         }
            //         $( '#msg_container' ).scrollTop( $(document).height()+9500 );
            //     }
            //});

            //end of new insert
            },
            error: function(m){
                console.log(JSON.stringify(m));
            }

        });
        
        pubnub.subscribe({
            channel  : channel1 ,
            message : function(message) {
                //alert('subscribe');
                // console.log(message);
                var reply_detail = localStorage.getItem( "reply_data" );
                var replyData = JSON.parse( reply_detail ).data;
                var photoNameid = 'open_img';
                var photoNameid1 = 'open_img1';
                var unlockNameid = 'unlock_img';
                // console.log('message is:'+message.user_msg + ' message blocker is' + message.blocker +'blocked:'+message.blocked+' originator_u_id:'+message.originator_u_id);
                var user_session = userId;
                if ( message.blocked == 'yes' ) {
                    // console.log('user blocked..');
                    if (user_session == message.originator_u_id ) {
                        if (user_session == message.blocker){
                            $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#ff9600;color:white;'> <p>"+'You are attempting to send a message to a user you have blocked. If you do wish to send messages to this user, please first remove from block list.'+"</p> <a href='javascript:;' class='blockedLink' data-ajax='false'>Blocked users</a> <br/><span>"+ message.date_time +"</span></div>");
                        } else {
                            $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#6189fb;color:white;'> <p>"+'This user no longer wishes to receive your messages :('+"</p> <span>"+ message.date_time +"</span></div>");
                        }
                    }
                } else if (message.msg_type == 'tip'){
                    // console.log("tip");
                        if (user_session == message.originator_u_id){
                           $( "#msg_container" ).append( '<div class="me" style="white-space:normal;text-align:right;background:#FCF3E3;"> <p>Tip sent @ '+ message.date_time + '</p><p><div class="paidtext" style="background-color:green!important;">$'+ addZeroes(message.msg_rate) + '</div></p> </div>');
                        }
                        else{

                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:left;background:#FCF3E3;"><p>Tip sent @ '+ message.date_time + '</p><p><div class="paidtext"  style="background-color:green!important;">$'+ addZeroes(message.msg_rate) + '</div></p></div>');
                        }
                    } else if (message.msg_type == 'photo_sale'){
                            console.log("messagetype"); 
                            var tagline = (typeof message.tagline === 'undefined') ? '' : message.tagline.substring(0,200) ;
                            var shout = (typeof message.shout === 'undefined') ? 'no' : message.shout ;
                            var p_image = (typeof message.cloudinary_photo_id_p === 'undefined') ? "img/loving_it.png" : IMAGE_URL+'users/'+ message.originator_u_id + '/'+ message.cloudinary_photo_id_p;
                        if (user_session == message.originator_u_id){
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:left;background:#424242;color:white;"><div><div style="margin-top:10px"><a id="'+photoNameid1+'" class="purchasePhotoLink" rel="#/home/purchasePaidPhoto?displayname='+message.originator_u_id+'&shout='+ shout +'&media_id=' + message.media_id  + '&model_id=' +  message.originator_u_id +'"><img src="'+ p_image +'" height="100" width="80" border="0" alt="loving it"  style="float:left;margin-left: 10px;color:#007aff;font-weight:bold;"/></a><div class="rightMsgs"><div style="color: green;font-size:12px;float: right;margin-right: 15px;width: 60%;"><i>Photo purchase request sent!.</i></div> <div id="description" style="float: left;padding: 10px;width: 60%;margin-left: 8px;font-size: 15px;">' + tagline  + '</div></div> </div></div>');
                            //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;">Photo purchase request sent!</div>');
                        }
                        else{
                            // console.log("check tagline/");  
                            // var tagline = (typeof message.tagline === undefined) ? '' : message.tagline.substring(0,200) ;
                            // var shout = (typeof message.shout === undefined) ? 'no' : message.shout ;
                            // var p_image = (typeof message.cloudinary_photo_id_p === undefined) ? "img/loving_it.png" : IMAGE_URL+'users/'+ message.originator_u_id + '/'+ message.cloudinary_photo_id_p;
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:left;background:#424242;color:white;"><div><div class="imgUnlock" style="margin-top:10px"><a id="'+photoNameid+'" class="purchasePhotoLink" rel="#/home/purchasePaidPhoto?displayname='+message.originator_u_id+'&shout='+ shout +'&media_id=' + message.media_id  + '&model_id=' +  message.originator_u_id +'" data-ajax="false"><img src="'+ p_image +'" height="100" width="80" border="0" alt="loving it"  style="float:left;margin-left: 10px;color:#007aff;font-weight:bold;"/></a><div class="rightMsgs"><div style="color: green;font-size:12px;float: left;margin-left: 10px;width: 50%;"><i>User has sent a paid photo request.</i></div> <a id="'+unlockNameid+'"  rel="#/home/purchasePaidPhoto?displayname='+message.originator_u_id+'&shout='+ shout +'&media_id=' + message.media_id  + '&model_id=' +  message.originator_u_id +'" class="unlockBtn unlockBtn1" data-ajax="false" style="color:#fff;">Unlock</a> <div id="description" style="float: left;padding: 10px;width: 60%;margin-left: 8px;font-size: 15px;">' + tagline  + '</div></div></div></div>');                       
                            //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"><div><div style="font-size:12px;"><i>User has sent a paid photo request.</i></div><div style="margin-top:10px"><a class="purchasePhotoLink" rel="#/home/paidphoto/'+message.media_id+'/'+message.originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;"> <img src="img/loving_it.png" height="40" width="40" border="0" alt="loving it" /> </a> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+message.media_id+'/'+message.originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;" data-ajax="false" style="color:#7ebbea;text-decoration:underline;"> Click to view photo </a></div></div></div>');
                        }
                    } else if ( message.msg_type == 'video_sale' ) {
                        // console.log("video/"); 
                    if ( user_session == message.originator_u_id ) {
                        $( "#msg_container" ).append( '<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"> <div> <div style="font-size:14px; margin-top: 10px"> Photo purchase request sent!</div> </div> </div>');
                    } else {
                        $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#424242;color:white;"> <div> <div style="font-size:12px;"> <i>User has sent a paid photo request.</i> </div> <div style="margin-top:10px"> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+message.media_id+'/'+message.originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;"> <img src="img/loving_it.png" height="40" width="40" border="0" alt="loving it" /> </a> <a class="purchasePhotoLink" rel="#/home/paidphoto/'+message.media_id+'/'+message.originator_u_id+'/'+replyData.originator.displayname+'" href="javascript:;" data-ajax="false" style="color:#7ebbea;text-decoration:underline;"> Click to view photo </a> </div> </div> </div>');
                    }
                } else if (message.msg_type == 'trialexpired' || message.msg_type == 'upgrade' || message.msg_type == 'creditexpired') {
                    if (user_session == message.originator_u_id) {
                        if (message.msg_type == 'trialexpired')
                        {
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Your free trial has expired and you must upgrade to continue chat. <p></p><a href="javascript:;" class="upgradeLink" data-ajax="false" style="color: #007DFD;text-decoration: underline;">Upgrade now</a></div>');
                        }
                        else if (message.msg_type == 'upgrade')
                        {
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Your free trial has expired and you must upgrade to continue chat. <p></p><a href="javascript:;" class="upgradeLink" data-ajax="false" style="color: #007DFD;text-decoration: underline;">Upgrade now</a></div>');
                        }
                        else if(message.msg_type == 'creditexpired')
                        {
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">You must add additional credits to continue. <p></p><a href="javascript:;" class="creditLink" style="color: #007DFD;text-decoration: underline;">Add credits now</a></div>');
                        }

                        //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Your free trial has expired and you must upgrade to continue chatting. <p></p><a href="javascript:;" class="upgradeLink" data-ajax="false" style="color: #007DFD;text-decoration: underline;">Upgrade now</a></div>');
                    } else {
                        if (message.msg_type == 'upgrade')
                        {
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">This user has run out of trial msgs and must upgrade to continue.</div>');
                        }
                        else if (message.msg_type == 'trialexpired')
                        {
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">This user has run out of trial msgs and must upgrade to continue.</div>');
                        }
                        else if(message.msg_type == 'creditexpired')
                        {
                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Users credit expired and he must add credits to continue chat.</div>');
                        }
                        //$("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">This user has run out of trial msgs and must upgrade to continue.</div>');
                    }
                }
                // else if ( message.msg_type ==  'creditexpired' ) {
                 //   if (user_session == message.originator_u_id) {
                //        $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">You must add additional credits to continue. <p></p><a href="javascript:;" class="creditLink" style="color: #007DFD;text-decoration: underline;">Add credits now</a></div>');
                //    } else {
                //        $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Users credit expired and he must add credits to continue chat.</div>');
                //    }
                //}
                 else if ( message.txt_available ==  0 && user_session == message.originator_u_id) {
                    // console.log('not available..');
                    $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#03007c;color:white;'> <p>"+'Zzzz. I am not currently available for texting, but I got your message. ttyl.'+"</p> <span>"+ message.date_time +"</span></div>");
                } else if ( $scope.replyChats.isBlocked == true ) {
                    // console.log('receiver is blocked..');
                    if (user_session == message.originator_u_id) {
                        $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#ff9600;color:white;'> <p>"+'You are attempting to send a message to a user you have blocked. If you do wish to send messages to this user, please first remove from block list.'+"</p><a href='javascript:;' class='blockedLink' data-ajax='false'>Blocked users</a> <br/><span>"+ message.date_time +"</span></div>");
                    } else {
                        //$("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#ff9600;color:white;'> <p>"+'User is attempting to send a message you that you have blocked. If you do wish to receive messages from this user, please first remove from block list.'+"</p> <span>"+ message.date_time +"</span></div>");
                    }
                }

                // start image insertion
                else if ( typeof message.cloudinary_photo_id != 'undefined' && message.cloudinary_photo_id) {
                    // console.log('cloudinary..');
                    var imgname = message.cloudinary_photo_id;                                              
                            if(message.cloudinary_photo_id.indexOf(".jpg") == -1){
                                imgname = imgname + '.jpg';
                            }
                    var small_image_url = IMAGE_URL+message.originator_u_id+'/'+imgname;
                    var large_image_url = IMAGE_URL+message.originator_u_id+'/big_'+imgname;
                    //console.log("small_image_url==="+small_image_url);
                    // var large_image_url = $.cloudinary.url(message.cloudinary_photo_id,
                    //     {
                    //         width: 300, height: 460,
                    //         crop: 'fit'
                    //     });
                    // var small_image_url = $.cloudinary.image(message.cloudinary_photo_id,
                    //     {
                    //         width: 100, height: 150,
                    //         crop: 'fit',fetch_format: 'png',
                    //         radius: 15
                    //     });
                    // var large_splitted_url = large_image_url.split('//');
                    // var small_splitted_url = $(small_image_url).attr("src").split('//');
                    var li = '';
                    var rate ='';
                    // console.log($scope.replyChats.isBlocked);
                    if ( $scope.replyChats.isBlocked == true ) {
                        // console.log('receiver is blocked..');
                        if (user_session == message.originator_u_id) {
                            li = "<div class='me' style='white-space:normal;text-align:center;background:#ff9600;color:white;'> <p>"+'You are attempting to send a message to a user you have blocked. If you do wish to send messages to this user, please first remove from block list.'+"</p> <a href='javascript:;' class='blockedLink' data-ajax='false'>Blocked users</a><br/><span>"+ message.date_time +"</span></div>";
                        } else {
                            li = "";
                            //$("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#ff9600;color:white;'> <p>"+'User is attempting to send a message you that you have blocked. If you do wish to receive messages from this user, please first remove from block list.'+"</p> <span>"+ message.date_time +"</span></div>");
                        }
                    } else {
                        if ( message.originator_u_id !=  user_session ) {
                            //li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
                            if(message.charge_rate == 0 || message.charge_rate == 0.00 || message.charge_rate == null ) {

                                li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");

                                if( message.msg_rate > 0 ) {
                                    var rate = "<div class='paidtext'>$"+ message.msg_rate +"</div>";
                                } else {
                                   var rate = "<div class='paidtext'>$0</div>";
                                }

                            } else {

                               li = $("<div class='you' style='white-space:normal; padding: .7em 1em;'> </div>");
                               var rate = "<div class='paidtextyou'>$" + message.charge_rate + "</div>";

                            }
                        } else {
                            //li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");
                            if(message.charge_rate == 0 || message.charge_rate == 0.00 || message.charge_rate == null ) {

                                li = $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");

                                if(message.msg_rate>0)
                                {
                                   var rate = "<div class='paidtext'>$"+ message.msg_rate +"</div>";

                                }
                                else
                                {
                                   var rate = "<div class='paidtext'>$0</div>";
                                }

                            } else {

                                $("<div class='me' style='white-space:normal;text-align:right;background:none; padding: .7em 1em;'> </div>");;
                                var rate = "<p><div class='paidtextme'>$" + message.charge_rate + "</div></p>";
                            }
                        }
                    var pname = 'message_image';     
                    var tagline = (typeof message.tagline === undefined) ? '' : message.tagline.substring(0,200);
                    var linkl = $('<div style="float:left;"><a id="'+pname+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>'); //.append('<img src="'+ image_url + '">');
                    var linkr = $('<div style="float:right;"><a id="'+pname+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>'); //.append('<img src="'+ image_url + '">');
                    // var linkl = $('<div style="float:left;"><a id="message_image_'+messages[i].media_id+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>'); //.append('<img src="'+ image_url + '">');
                    // var linkr = $('<div style="float:right;"><a id="message_image_'+messages[i].media_id+'" class="msg_image" data-bigimageurl="' + large_image_url + '"><img src="'+ small_image_url + '"></a></div>'); //.append('<img src="'+ image_url + '">');
                    
                    var descl = '<div id="description" style="float:left;padding: 0px 10px;width:53%;font-size: 14px;">' + tagline  + '</div>';
                    var descr = '<div id="description" style="float:right;padding:0px 10px;width:53%;font-size: 14px;">' + tagline  + '</div>';
                                        
                //var link = $('<a href="javascript:;"></a>').append('<img src="'+small_image_url+'" id="message_image_'+messages[i].media_id+'" data="'+large_image_url+'">');
                if ( message.originator_u_id !=  user_session ){
                    // console.log("left"+linkl);
                        $(li).append(linkl);
                        $(li).append(descl);
                    }else
                    {
                        // console.log("right"+linkr);
                        $(li).append(linkr);
                        $(li).append(descr);
                    }
                        //var link = $('<a href="javascript:;"></a>').append('<img src="http://'+small_splitted_url[1]+'" id="message_image_'+message.media_id+'" data="http://' + large_splitted_url[1] + '">');
                        //var link = $('<a href="javascript:;"></a>').append('<img src="'+small_image_url+'" id="message_image_'+message.media_id+'" data="'+large_image_url+'">');
                        //$(li).append(link);
                        $(li).append(rate);
                    }
                    $("#msg_container").append(li);
                }
                //check if message from history is for this user or sender and prepare html
                else if ( message.originator_u_id !=  user_session ) {
                    // console.log('msg appending..');
                    if( message.msg_rate == 0 || message.msg_rate == 0.00 || message.msg_rate == null ) {
                        //$("#msg_container").append("<div class='you'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='freetext'>free</div></div>");
                        if( message.msg_type == 'trial' ) {
                            $("#msg_container").append("<div class='you'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='freetext'>free</div></div>");
                        } else if(message.msg_type == 'active' && message.receiver_user_status== 'pending' || message.sender_user_status=='pending') {
                            $("#msg_container").append("<div class='you'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='freetext'>free</div></div>");
                        } else {
                            $("#msg_container").append("<div class='you'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='paidtext'>$0</div></div>");
                        }

                    } else {
                        $("#msg_container").append("<div class='you'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='paidtext'>$"+message.msg_rate+"</div></div>");
                    }
                } else {
                    // console.log('appending again..');
                    var reciver_status = ["upgrade","trial", "trialexpired","creditexpired","notreplied"];
                    var pro_info = '';
                    if ( message.pro == 2 ) {
                        if ( message.sender_user_status != 'active' ) {
                            pro_info = message.sender_user_status ;
                        }
                    }
                    if( message.msg_rate == 0 || message.msg_rate == 0.00 || message.msg_rate == null ) {

                        if( message.msg_type == 'trial' ) {
                            $("#msg_container").append("<div class='me'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='freetext'>free</div></div>");
                        } else if( message.msg_type == 'active' && message.receiver_user_status== 'pending' || message.sender_user_status=='pending' ) {
                            $("#msg_container").append("<div class='me'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='freetext'>free</div></div>");
                        } else {
                            $("#msg_container").append("<div class='me'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='paidtext'>$0</div></div>");
                        }

                    } else {
                        $("#msg_container").append("<div class='me'> <p>"+message.user_msg+"</p> <span>"+ message.date_time +"</span><div class='paidtext'>$"+message.msg_rate+"</div></div>");
                    }



                    // if(message.receiver_credit_status=='trialexpired' || message.receiver_credit_status=='creditexpired' )
                    // {
                    //      //at originator end
                    //     if (user_session == message.originator_u_id)
                    //     {
                    //         if (message.receiver_credit_status == 'trialexpired')
                    //         {
                    //             $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">The user\'s trial is expired. He must upgrade to continue.  </div>');
                    //         }
                    //         else if(message.receiver_credit_status == 'creditexpired')
                    //         {
                    //             $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">The user has $0 in credits. He must add credits to continue. </div>');
                    //         }

                    //     }

                    // }
                    if(  message.pro != 2 && reciver_status.indexOf(message.receiver_credit_status) != -1) {
                                //at originator pro end only
                                    if (user_session == message.originator_u_id){
                                        if (message.receiver_credit_status == 'upgrade' || message.receiver_credit_status == 'trial' || message.receiver_credit_status == 'trialexpired'){
                                            $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#ffae00;color:white;">Your last message was sent Free because the user has not yet upgraded. </div>');
                                           // $(".messageLog").append('<li class="ui-li-static ui-body-inherit" style="white-space:normal;text-align:center;background:#2cba00;color:white;">This user has run out of trial msgs and must upgrade to continue. </li>');
                                        }
                                        else if(message.receiver_credit_status == 'creditexpired'){
                                            $("#msg_container").append('<li class="me" style="white-space:normal;text-align:center;background:#ffae00;color:white;">Your last message was sent Free because the user does not have enough credits. </div>');
                                          //  $(".messageLog").append('<li class="ui-li-static ui-body-inherit" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Users credit expired and he must add credits to continue. </li>');
                                        }
                                        else if(message.receiver_credit_status == 'notreplied'){
                                            $("#msg_container").append('<li class="me" style="white-space:normal;text-align:center;background:#ffae00;color:white;">Your last message was sent Free because the user did not respond. </div>');
                                          //  $(".messageLog").append('<li class="ui-li-static ui-body-inherit" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Users credit expired and he must add credits to continue. </li>');
                                        }
                                    }
                             }
                }
                $timeout(function() {
                    $('#msg_container').scrollTop( $(document).height()+9500 );
                }, 1000);

                
                $("div.rightMsgs").delegate("a.unlockBtn", "click", function(event){
                    event.preventDefault();
                     console.log($(this).attr("rel"));
                        pubnub.unsubscribe({
                        channel : channel1
                    });
                    //window.location.href = "#/home/purchasePaidPhoto";
                    window.location.href = $(this).attr("rel");
                });
                //$('#chatAudio')[0].play();
                $("div.imgUnlock").delegate("a.purchasePhotoLink", "click", function(event){
                    event.preventDefault();
                     console.log($(this).attr("rel"));
                        pubnub.unsubscribe({
                        channel : channel1
                    });
                    //window.location.href = "#/home/purchasePaidPhoto";
                    window.location.href = $(this).attr("rel");
                });
                
            }
        });
        // console.log($("#msg_container div").length);
        // if($("#msg_container div").length < 25){
        //     loadstatus = 1; 
        // }       
        var scrollfirst = 0;
        var scrollcount = 0;
        $scope.loadMoreData = function(event){
            // alert("hello");
            // var scrolobj = $(this);
            // var scroll =  scrolobj.scrollTop();

            var scroll = $(window).scrollTop();
            // console.log(scroll);
            var getChatHistoryData = {};
            getChatHistoryData['channel'] = channel1;
            getChatHistoryData['start'] = start;
            getChatHistoryData['count'] = count;
            if(scrollcount == 0 && flagvalue == false){
                $(".loaderId").show();
            }
            var responsePromise = $http.post( BASE_URL+"getmorehistory",JSON.stringify( getChatHistoryData ) );
            responsePromise.success( function( data, channel1, status, headers, config ) {
                // alert("success"); 
                // console.log( JSON.stringify( data ) );
                $(".loaderId").hide();
                // scrolobj.scrollTop(5);
                if(data != '0'){
                   messageHistory(data.messages);
                   //if(data.totalcount == 25){
                   start = start + data.totalcount;
                   // scrolobj.scrollTop( 500 );
                   // }else{
                   //  loadstatus = 1;
                   //}
                 }
                else {
                    // console.log("load" + data);
                   loadstatus = 1;
                }
                if(loadstatus == 1 && scroll == 0 && flagvalue == false){

                // console.log("scroll");
                //alert('message show');
                if(scrollcount == 0){
                    $("#msg_container").prepend("<div class='me loaderId1'>Messages</div>");
                    scrollcount = scrollcount+1; 
                }
                
                                // $(".loaderId").text("Messages").show();
                }
                $('#msg_container').animate({scrollTop: '5px'}, 800);
               // $('#msg_container').scrollTop( $(document).height()-530 );
            });

            responsePromise.error( function ( data, channel1, status, headers, config ) {
                // alert("error");
                // console.log("error");
                $(".loaderId").hide();
            });
            // if(loadstatus == 1 && scroll == 0){
            //     console.log("scroll");
            //     $(".loaderId").text("Messages").show();
            // }
            if(scrollfirst==0){
                scrollfirst = scrollfirst + 1;
            }
        }

        $scope.popupLink = function() {
            $scope.popupShow = true;
            $('#overlay').show();
            $('#BMPopup').show();
        };
    var page_name1 = 'reply';

    // $(document).on('click',".unlockBtn", function() {
    //    console.log('gvhvgh');
    // });
    $("div").delegate("a.creditLink", "click", function(event){
        event.preventDefault();
        event.stopImmediatePropagation;
         console.log("credit");
            pubnub.unsubscribe({
            channel : channel1
        });
        $state.transitionTo('home.addcredits',{originatrId:originator_id,pageName:page_name1});
    });
    // $(document).on('click',".creditLink", function() {
    //     event.preventDefault();
    //     event.stopImmediatePropagation();
    //     pubnub.unsubscribe({
    //         channel : channel1
    //     });
    //     console.log("creditlink");
    //     window.plugins.nativepagetransitions.slide({
    //         "direction": 'left',
    //         "href" : '#/home/addcredits/'+originator_id+'/'+page_name1
    //     });
    // });
    // $(document).on('click',".upgradeLink", function() {
    //     event.preventDefault();
    //     event.stopImmediatePropagation();
    //     pubnub.unsubscribe({
    //         channel : channel1
    //     });
    //     // window.plugins.nativepagetransitions.slide({
    //     //     "direction": 'left',
    //     //     "href" : "#/home/upgrade"
    //     // });
    //     window.plugins.nativepagetransitions.slide({
    //         "direction": 'left',
    //         "href" : '#/home/addcredits/'+originator_id+'/'+page_name1
    //     });
    // });
    $("div").delegate("a.upgradeLink", "click", function(event){
        event.preventDefault();
        event.stopImmediatePropagation;
         console.log("upgrade");
            pubnub.unsubscribe({
            channel : channel1
        });
        $state.transitionTo('home.addcredits',{originatrId:originator_id,pageName:page_name1});
    });
    // $(document).on('click',".purchasePhotoLink", function() {
    //     event.preventDefault();
    //     console.log($(this).attr("rel"));
    //     pubnub.unsubscribe({
    //         channel : channel1
    //     });
    //     window.plugins.nativepagetransitions.slide({
    //         "direction": 'left',
    //         "href" : $(this).attr("rel")
    //     });
    // });
    $scope.submitChat = function($event){
        // console.log("enter submit chat");
    	//alert("submit message");
        var inputChat = $scope.chatInput;
        $scope.chatInput = '';
        if( $('#input_chat').val() != '' ) {
            // console.log("input chat");
            var getChatData = {};
            getChatData['chat_entry'] = inputChat;
            getChatData['receiver'] = originator_id;
            getChatData['deviceAppId'] = device_token;
            getChatData['deviceType'] = deviceType;
            getChatData['deviceId'] = uuid;
            getChatData['responsetype'] = 'json';
            console.log( JSON.stringify( getChatData ) );
            var responsePromise = $http.post( BASE_URL+"sendchatmessage",JSON.stringify( getChatData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log(JSON.stringify(data));
                //localStorage.setItem("reply_data",JSON.stringify(data));
                $scope.chatInput = '';
                //$('#msg_container').scrollTop( $(document).height() );
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }else{
            // console.log("enter else condition");
           $event.preventDefault(); 
        }
        
    };

    $scope.deleteHistory = function() {
        // console.log( 'deleting..' );
        // var pubnub = PUBNUB.init( {
        //     publish_key : 'pub-c-d69a065d-1b7c-4619-baf8-f240601221bd',
        //     subscribe_key : 'sub-c-f7bbad58-bf8d-11e3-a219-02ee2ddab7fe',
        //     auth_key : userId,
        //     uuid : userId
        // } );

        // pubnub.time( function( time ) {
        // 	//alert(JSON.stringify(time));
        //     pubnub.state( {
        //         channel : channel1,
        //         state : {
        //             'lastdelete' : time
        //         },
        //         callback : function(m) {
        //             // console.log('deleted..');
        //             $("#msg_container").empty();

        //         },
        //         error : function(m) {
        //             // console.log(m)
        //         }
        //     });

        // });
        if (channel1) {
            console.log(channel1);
            var clearChatHistory = {};
            clearChatHistory['responsetype'] = 'json';
            clearChatHistory['channel'] = channel1;
            var responsePromise = $http.post( BASE_URL+"clearhistory",JSON.stringify( clearChatHistory ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log(data);
                if (data == 'success') {
                    $("#msg_container").empty();
                    $('#overlay').hide();
                    $scope.popupShow = false;
                }
            });
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                    if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            });
        }
    };
    //popup link
    $scope.backFromReply = function() {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'right',
            "href" : "#/home/messages"
            } );
            pubnub.unsubscribe( {
                channel : channel1
            } );
            // "href" : window.history.back()
    };
    $scope.cameraClick = function() {
        //$('.ui-loader').show();
        
        var cameraPhotoData = {};
        cameraPhotoData['uid'] = originator_id;
        cameraPhotoData['responsetype'] = 'json';
        var responsePromise = $http.post( BASE_URL+"isblocked",JSON.stringify( cameraPhotoData ) );
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            //$('.ui-loader').hide();
            //alert(data.message);
            if(data.blocked_by_user == userId) {
                //alert("you blocked this user");
                $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#ff9600;color:white;'> <p>"+'You are attempting to send a message to a user you have blocked. If you do wish to send messages to this user, please first remove from block list.'+"</p><a href='javascript:;' class='blockedLink' data-ajax='false'>Blocked users</a></div>");                           
            }
            else if(data.blocked_by_user == originator_id){
                //alert("you are blocked by other user");
                 $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#6189fb;color:white;'> <p>"+'This user no longer wishes to receive your messages :('+"</p></div>");
            }
            else{
                
                var senderstatus = data.senderstatus;
                var senderbalance = parseFloat(data.senderbalance);
                var trial_sms = parseInt(data.sendertrial_sms);        
                var sms_rate = parseFloat(data.to_sms_rate);
                //check here if balance is sufficient before sending image                            
                if(data.senderpro != 2) {
                    if(senderstatus == 'active' && senderbalance < sms_rate){
                        $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">You must add additional credits to continue. <p></p> <a href="javascript:;" class="creditLink" style="color: #007DFD;text-decoration: underline;">Add credits now</a></div>');
                    }
                    else if(senderstatus == 'pending' && trial_sms <= 0){
                        $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Your free trial has expired and you must upgrade to continue chatting. <p></p><div class="upgradeDiv"><a href="javascript:;" class="upgradeLink" data-ajax="false" style="color: #007DFD;text-decoration: underline;">Upgrade now</a></div></div>');
                    }
                    else {
                        pubnub.unsubscribe( {
                            channel : channel1
                        } );
                        window.plugins.nativepagetransitions.slide( {
                            "href" : '#/home/sendPhoto'+$scope.user_id
                        } );
                    }                                
                }
                else if(data.senderpro == 2) {
                    pubnub.unsubscribe( {
                        channel : channel1
                    } );
                    window.plugins.nativepagetransitions.slide( {
                        "href" : '#/home/sendPhoto'+$scope.user_id
                    } );                             
                }                            
            }             
            // if( data.message == 'not blocked' ) {
            //     if( data.senderstatus == 'pending' ){
            //         $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">Your free trial has expired and you must upgrade to continue chatting. <p></p><a href="javascript:;" class="upgradeLink" data-ajax="false" style="color: #007DFD;text-decoration: underline;">Upgrade now</a></div>');
            //     } else {
            //         if( data.senderbalance < data.to_sms_rate ){
            //             $("#msg_container").append('<div class="me" style="white-space:normal;text-align:center;background:#2cba00;color:white;">You must add additional credits to continue. <p></p><a href="javascript:;" class="creditLink" style="color: #007DFD;text-decoration: underline;">Add credits now</a></div>');
            //         } else{
            //             window.plugins.nativepagetransitions.slide( {
            //                 "href" : '#/home/sendPhoto'+$scope.user_id
            //             } );
            //         }
            //     }

            // } else {
            //     if( data.blocked_by_user == userId ){
            //         $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#ff9600;color:white;'> <p>"+'You are attempting to send a message to a user you have blocked. If you do wish to send messages to this user, please first remove from block list.'+"</p><a href='javascript:;' class='blockedLink' data-ajax='false'>Blocked users</a></div>");
            //     } else {
            //         $("#msg_container").append("<div class='me' style='white-space:normal;text-align:center;background:#6189fb;color:white;'> <p>"+'This user no longer wishes to receive your messages :('+"</p></div>");
            //     }
            // }
            $('#msg_container').scrollTop( $(document).height()+9500 );
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            //$('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );

    };
    $scope.viewProfile= function() {
        pubnub.unsubscribe({
            channel : channel1
        } );
        $('#overlay').hide();
        $('#BMPopup').hide();
        window.plugins.nativepagetransitions.slide({
            "href" : '#/home/callerhistory'+$scope.user_id
        } );
    };

    $(document).on('click',".blockedLink", function() {
        event.preventDefault();
        pubnub.unsubscribe({
            channel : channel1
        } );

        window.plugins.nativepagetransitions.slide({
            "direction": 'left',
            "href" : "#/home/blockedusers"
        });
    });
    $('#overlay').click(function() {
        event.preventDefault();
        $('#overlay').hide();
        $('#BMPopup').hide();
        $(".popup1").addClass('ng-hide');
        $scope.imgPopupShow = false;
    } );

    $scope.blockUser = function() {
        navigator.notification.confirm(
            'Are you sure you want to block this user?',  // message
            onConfirm,
            'Block User'
        );
    };
    $scope.sendTip = function() {
        pubnub.unsubscribe({
            channel : channel1
        } );
        var page_name = 'reply';
        // var responsePromise = $http.get( BASE_URL+"sendtip?responsetype=json&proid="+originator_id );
        // responsePromise.success( function( data, status, headers, config ) {
        // console.log( JSON.stringify( data ) );
        // $('#overlay').hide();
        // $('.ui-loader').hide();
        // $scope.sendTipInfo = data.message;
        //     if( data.status == 'error' ) {
        //         console.log("data.status");
        //         //alert("success");
        //         // if( data.message == 'Redirect to upgrade as no credit card is on file.' ) {
        //         //     window.plugins.nativepagetransitions.slide( {
        //         //         "direction": 'left',
        //         //         "href" : '#/home/upgrade'
        //         //     } );
        //         // }
        //     }else{
        //         if((data.message == 'You are attempting to send a tip to a user you have blocked. If you do wish to send tip to this user, please first remove from block list.') || (data.message == 'You must upgrade your account first.')){
        //             console.log("view tip");
        //             $state.transitionTo('home.viewTip',{originatrId:originator_id,pagename:page_name,sendTipData:JSON.stringify({'balance_msg':data.data.balance_msg,'linktext':data.data.linktext,'message':data.message,'color':data.data.color})})
        //         }else {
        //                 console.log("send tip");
        //                 window.plugins.nativepagetransitions.slide({
        //                 "href" : "#/home/sendTip/"+originator_id+"/"+page_name
        //             });
        //         }
        //     }
        // });
        // responsePromise.error( function ( data, status, headers, config ) {
        //     console.log( JSON.stringify( data ) );
        //     if( navigator.connection.type == Connection.NONE ) {
        //         checkConnection();
        //     }
        // } );
        
        
        window.plugins.nativepagetransitions.slide({
            "direction": 'left',
            "href" : "#/home/sendTip/"+originator_id+"/"+page_name
        });

    };
    function onConfirm(button) {
        if( button == 1 ) {
            var blockcontactData = {};
            blockcontactData['responsetype'] = 'json';
            blockcontactData['caller_id'] = originator_id;
            //console.log( JSON.stringify( blockcontactData ) );
            var responsePromise = $http.post(BASE_URL+"blockuser",JSON.stringify(blockcontactData));
            responsePromise.success( function( data, status, headers, config ) {
                //console.log( JSON.stringify( data ) );
                // console.log('blocked');
                $('#user_block').html('<span class="glyphicon glyphicon-ban-circle"></span>already blocked');
                $('#user_block').addClass('blockedMessage');
            } );
        }
    }

} )

//+++++++++++++++++++++++++++paidphoto page controller+++++++++++++++++++++

mainApp.controller( "paidphotoController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var page_name = 'paidphoto';
    var paidPhotoData = {};
    paidPhotoData['displayname'] = $stateParams.displayname;
    paidPhotoData['media_id'] = $stateParams.media_id;
    paidPhotoData['model_id'] = $stateParams.model_id;
    paidPhotoData['responsetype'] = 'json';
    // console.log( 'photo data'+JSON.stringify( paidPhotoData ) );
    $scope.photoInfo = [];
    var responsePromise = $http.post(BASE_URL+"photopurchase",JSON.stringify(paidPhotoData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log( 'success'+JSON.stringify( data ) );
        $scope.photoInfo = data;
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( 'error'+JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.purchasePhoto = function () {
        if( $scope.photoInfo.button_color == 'red' ) {
            if( $scope.photoInfo.button_text == 'Add credits' ) {
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/addcredits/"+ $stateParams.model_id+'/'+page_name
                });
            }
            if( $scope.photoInfo.button_text == 'Click here to view.' ) {
                //alert($rootScope.previousState);
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/reply"+$stateParams.model_id
                } );

            }
        } else if ( $scope.photoInfo.button_color == 'green' ) {
            var purchasePhotoData = {};
            purchasePhotoData['media_id'] = $stateParams.media_id;
            purchasePhotoData['displayname'] = $stateParams.displayname;
            purchasePhotoData['model_id'] = $stateParams.model_id;
            purchasePhotoData['responsetype'] = 'json';
            console.log( 'purchase data'+JSON.stringify( purchasePhotoData ) );
            //console.log('https://beta.ringhop.com'+$scope.photoInfo.button_link);
            var responsePromise = $http.post( BASE_URL+'processpurchase',JSON.stringify( purchasePhotoData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if( $rootScope.previousState == 'home.reply') {
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/paidphotoadd/"+$stateParams.model_id+"/reply"
                    });
                } else {
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/paidphotoadd/"+$stateParams.model_id+"/library"
                    });
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( 'error'+JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
} )


//+++++++++++++++++++++++++++paidphotoadd page controller+++++++++++++++++++++

mainApp.controller( "paidphotoaddController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    //alert($stateParams.fromPgName);
    $scope.PhotoSuccess = function() {
        if($stateParams.fromPgName == 'library') {
            window.plugins.nativepagetransitions.slide({
                "direction": 'right',
                "href" : "#/home/myLibrary"
            });
        } else {
            window.plugins.nativepagetransitions.slide({
                "direction": 'right',
                "href" : "#/home/reply"+$stateParams.originatrId
            });
        }
    };
} )

////+++++++++++++++++++++++++++sendTip page controller+++++++++++++++++++++
mainApp.controller( "sendTipController", function( $scope, $http, $state, $stateParams, $rootScope, constantData ) {
// alert($stateParams.originatrId);
var errorFlag = false;
$('#overlay').hide();
$('.ui-loader').hide();
var intRegex = /^\d+$/;
var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
$scope.credisList = constantData.creditsList();
    $scope.Credit = 20;
    $scope.errorMsg = '';
    var originator_id = $stateParams.originatrId;
    var user_detail = localStorage.getItem( "userDetail" );
    var userid = JSON.parse( user_detail ).data.id;
    var page_name = $stateParams.pagename;
    var page_name2 = 'tip';
    var responsePromise = $http.get( BASE_URL+"sendtip?responsetype=json&proid="+originator_id );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.sendTipInfo = data.message;
        if ($scope.sendTipInfo == 'You must upgrade your account first.') {
            $(".addcreditsanchor").css({"top":"58px"});
            $("#successTipInfo").css({"display":"block","width":"70%"});
        }
        if( data.status == 'error' ) {
            // console.log(data.status);
            //alert("success");
            // if( data.message == 'Redirect to upgrade as no credit card is on file.' ) {
            //     window.plugins.nativepagetransitions.slide( {
            //         "direction": 'left',
            //         "href" : '#/home/upgrade'
            //     } );
            // }
        }else{
                if(data.message == 'You are attempting to send a tip to a user you have blocked. If you do wish to send tip to this user, please first remove from block list.'){
                    window.plugins.nativepagetransitions.slide( {
                        "direction": 'left',
                        "href" : "#/home/viewTip/"+originator_id+"/"+page_name
                    } );
                }
                    // window.plugins.nativepagetransitions.slide( {
                    //     "direction": 'left',
                    //     "href" : "#/home/sendTip/"+originator_id+"/"+page_name
                    // } );
                
            }
    });
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if( navigator.connection.type == Connection.NONE ) {
            checkConnection();
        }
    } );

    $scope.addcreditsTip = function(){
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : "#/home/addcredits/"+originator_id+'/'+page_name2
        } );
    };

    $scope.Sendtipdata = function (inputFlag,chatInput) {
        $('#email_status').html('');
        var str = $('#input_chat').val();
        if(inputFlag == 0){
            if($('#input_chat').val() != '' && ($( '#input_chat' ).val().match( intRegex ) || $( '#input_chat' ).val().match( floatRegex ) )){
                if( $( '#input_chat' ).val() >=1 ){
                    $('#email_status').html('');
                    //inputFlag = 1;
                    errorFlag = true;
                }
                else{
                    $( '#email_status' ).html('Please enter tip amount greater than or equal to 1.');
                }
            }
            else{
                $( '#email_status' ).html('Please enter a valid tip amount.');
            }
        } else {
            errorFlag = true;
            
        }
        if(errorFlag){
            $('#overlay').show();
            $('.ui-loader').show();
            var page_name = $stateParams.pagename;
            var originator_id = $stateParams.originatrId;
            var sendTipData = {};
            sendTipData['responsetype'] = 'json';
            sendTipData['tip_amount'] = chatInput;
            sendTipData['proid'] = originator_id;
            console.log(JSON.stringify(sendTipData))
            var responsePromise = $http.post( BASE_URL+"sendtip" ,JSON.stringify(sendTipData));
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('#overlay').hide();
                $('.ui-loader').hide();
                if( data.status == 'error' ) {
                    alert("error");
                } else {
                    $state.transitionTo('home.viewTip',{originatrId:originator_id,pagename:page_name,sendTipData:JSON.stringify({'balance_msg':data.data.balance_msg,'linktext':data.data.linktext,'message':data.message,'color':data.data.color})})
                    // window.plugins.nativepagetransitions.slide({
                    //     "href" : "#/home/viewTip/"+originator_id+"/"+page_name+"/"+sendTipData
                    // });
                }
            });
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } ); 
        }
        
        
        $( '#input_chat' ).keyup( function (e) {
            if( $('#input_chat').val() != '' && ($( '#input_chat' ).val().match( intRegex ) || $( '#input_chat' ).val().match( floatRegex ) )){
                if($('#input_chat').val() >= 1){
                    $( '#email_status' ).html('');
                }
                else{
                    $( '#email_status' ).html('Please enter tip amount greater than or equal to 1.');
                }
            }
            else{
                $( '#email_status' ).html('Please enter a valid tip amount.');
            }
        });
        
    };
    //     $scope.clear = function(){  
    //       if( $('#input_chat').val() != '' && ($( '#input_chat' ).val().match( intRegex ) || $( '#input_chat' ).val().match( floatRegex ) ))
    //       {
    //         if($('#input_chat').val() >= 1){
    //         $( '#email_status' ).html('');
    //       }
    //       else{
    //         $( '#email_status' ).html('Please enter tip amount greater than or equal to 1.');
    //       }
    //     }
    //       else{
    //         $( '#email_status' ).html('Please enter a valid tip amount.');
    //       }
    // };
    // $scope.creditSubmit = function( credit ) {
    //     alert("credit success");
    //     var originator_id = $stateParams.originatrId;
    //     var page_name = $stateParams.pagename;
    //     console.log(page_name);
    //     var creditData = {};
    //     creditData['responsetype'] = 'json';
    //     creditData['credits'] = credit;
    //     creditData['proid'] = originator_id;
    //     creditData['phoneip'] = IPAddr;
    //     console.log(JSON.stringify(creditData));
    //     $('.ui-loader').show();
    //     var responsePromise = $http.post( BASE_URL+"sendtip", JSON.stringify( creditData ) );
    //     responsePromise.success( function( data, status, headers, config ) {
    //         $('.ui-loader').hide();
    //         console.log(JSON.stringify(data));

    //         if(data.status == 'error'){
    //             $scope.errorMsg = data.message;
    //             alert("credit error");
    //             // if( data.message == 'Redirect to upgrade as no credit card is on file.' ) {
    //             //     $timeout(function() {
    //             //         window.plugins.nativepagetransitions.slide( {
    //             //             "direction": 'left',
    //             //             "href" : '#/home/upgrade'
    //             //         } );
    //             //     }, 2000);

    //             // }
    //         }else {
    //             // $scope.msg = data.message;
    //             window.plugins.nativepagetransitions.slide( {
    //                 "direction": 'left',
    //                 "href" : "#/home/viewTip/"+originator_id+"/"+page_name
    //             } );
    //         }
    //     } );
    //     responsePromise.error( function ( data, status, headers, config ) {
    //         $('.ui-loader').hide();
    //         console.log( JSON.stringify( data ) );
    //        // alert('server error');
    //         if( navigator.connection.type == Connection.NONE ) {
    //             checkConnection();
    //         }
    //     } );
    // };


})
////+++++++++++++++++++++++++++viewTip page controller+++++++++++++++++++++

mainApp.controller( "viewtipController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    // console.log("enter the controller");
    var page_name2 = 'tip';
    var sendTipData = {};
    var originator_id = $stateParams.originatrId;
    // console.log($stateParams.pagename);
    // console.log($stateParams.originatrId);
    sendTipData['responsetype'] = 'json';
    // console.log(JSON.stringify(sendTipData));
    var responsePromise = $http.post( BASE_URL+"sendtip", JSON.stringify( sendTipData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log(data);
        $scope.sendTipInfo = data.data.balance_msg;
        // $scope.sendTipMsg = data.message;
        // $scope.link_info = data.data.linktext;
        // if(data.data.color == "error"){
        //     $('.succesStatus1').css('color','red');
        // }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if( navigator.connection.type == Connection.NONE ) {
            checkConnection();
        }
    } );

    // var page_name = $stateParams.pagename;
    // var originator_id = $stateParams.originatrId;
    // var sendTipData = {};
    // sendTipData['responsetype'] = 'json';
    // sendTipData['tip_amount'] = $stateParams.chatInput;
    // sendTipData['proid'] = originator_id;
    // console.log(JSON.stringify(sendTipData))
    // var responsePromise = $http.post( BASE_URL+"sendtip" ,JSON.stringify(sendTipData));
    // responsePromise.success( function( data, status, headers, config ) {
    //     console.log( JSON.stringify( data ) );
    //     if( data.status == 'error' ) {
    //         //alert("error");
    //     } else {
            // window.plugins.nativepagetransitions.slide({
            //     "href" : "#/home/viewTip/"+originator_id+"/"+page_name
            // });
            $scope.sendTipInfo = JSON.parse($stateParams.sendTipData).balance_msg;
            $scope.sendTipMsg = JSON.parse($stateParams.sendTipData).message;
            $scope.link_info = JSON.parse($stateParams.sendTipData).linktext;
            if(JSON.parse($stateParams.sendTipData).color == "error"){
                $('.succesStatus1').css('color','red');
            }
    //     }
    // });
    // responsePromise.error( function ( data, status, headers, config ) {
    //     console.log( JSON.stringify( data ) );
    //     if( navigator.connection.type == Connection.NONE ) {
    //         checkConnection();
    //     }
    // } ); 
    if (($scope.link_info == 'Upgrade account') || ($scope.link_info == 'Send another tip')) {
        console.log("upgrade link");
        $("#viewTipLink").css({"left":"70px"});
    }
    $scope.sendAnotherTip = function(){
        if($scope.link_info == 'Blocked users'){
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : "#/home/blockedusers"
            } );
        }
        if(($scope.link_info == 'Add credits' ) || ($scope.link_info == 'Upgrade account')){
            // console.log("add credits")
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : "#/home/addcredits/"+$stateParams.originatrId+'/'+page_name2
            } );
        }
        if($scope.link_info == 'Send another tip'){
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : window.history.back()
            } );
        } 
    };
    $scope.backButton = function() {
        // console.log('back')
        if($stateParams.pagename == 'reply'){
           window.plugins.nativepagetransitions.slide( {
                    "direction": 'right',
                    "href" : "#/home/reply"+$stateParams.originatrId
                } ); 
       }else if($stateParams.pagename == 'callerhistory'){
            window.plugins.nativepagetransitions.slide({
                "direction": 'right',
                "href" : "#/home/callerhistory"+$stateParams.originatrId
            });
       }
    };
    
} )

//+++++++++++++++++++++++++++sendPhoto page controller+++++++++++++++++++++

mainApp.controller( "sendPhotoController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $scope.takePhotoOpt = false;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.pro_data = false;
    $(".loaderId").hide();
    if( proData == 2 ) {
        //for pro users
        $scope.pro_data = true;
    }
    $scope.div_visible = true;

    $scope.uploadChatPhoto = function () {
        $scope.takePhotoOpt = true;
    };

    $scope.cancelPhoto = function () {
        $scope.takePhotoOpt = false;
    };

    function onPhotoDataSuccess( imageData ) {
        var profileImage = document.getElementById( 'chat_image' );
        profileImage.style.display = 'block';
        profileImage.src = "data:image/jpeg;base64," + imageData;
        imageString = imageData;
    }

    // A button will call this function
    $scope.takePhoto = function ( $event ) {
        $scope.takePhotoOpt = false;
        $scope.div_visible = false;
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth:500,
        	targetHeight: 500, allowEdit: true, correctOrientation: true,
        destinationType: Camera.DestinationType.DATA_URL });
    };

    //take photo from phone gallery
    $scope.photoLibrary = function ( ) {
        $scope.takePhotoOpt = false;
        $scope.div_visible = false;
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth:1000,
        	targetHeight: 1000, destinationType: destinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
    };

    // Called if something bad happens.
    function onFail(message) {
        // alert('Failed because: ' + message);
        $scope.takePhotoOpt = false;
        $scope.div_visible = true;
    }

    //upload profile pic
    var flag = false;
    $scope.saveChatPic = function ( $event ) {
        if($( "#media_price" ).val() == '' || $( "#media_price" ).val() > 99 || $( "#media_price" ).val() < 0){
            flag = false;
            $("#media_price" ).css('border','1px solid red');
            $("#media_error" ).html('Please enter media price between 0-99.');
        }else{
            flag = true;
           $("#media_price" ).css('border','none'); 
           $("#media_error" ).html('');
        }
        if(flag == true){
        $('#uploadChat_id').hide();
        $('#media_price').hide();
        $('#sendBtn').hide();
        $('#cancelBtn').hide();
        $('#optionalcommentdiv').hide();    
        var chatImageData = {};
        var mediaCharge = $('#media_price').val();
        chatImageData['responsetype'] = "json";
        chatImageData['image'] = imageString;
        chatImageData['uid'] = $stateParams.recieverId;
        if( proData == 2 ) {
            if( mediaCharge == '' ) {
                chatImageData['media_price'] = 0;
            } else {
                chatImageData['media_price'] = mediaCharge;
            }
        } else {
            chatImageData['media_price'] = 0;
        }
        //console.log(JSON.stringify(chatImageData));
        $('.phpdebugbar-openhandler-overlay').show();
        $(".loaderId").show();
        var responsePromise = $http.post(BASE_URL+"uploadchat_media",JSON.stringify(chatImageData));
        responsePromise.success( function( data, status, headers, config ) {
            $('.phpdebugbar-openhandler-overlay').hide();
            $(".loaderId").hide();
            console.log('success=>'+JSON.stringify(data));
            var display_msg = 'Photo message sent!';
            $('#checkLoader').replaceWith("<div style='color:green; margin-left: 14px; font-size: 15px; margin-bottom: -5px;margin-top:-5px;'><p>" + display_msg + "</p></div>");
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( 'error'+JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $(".loaderId").hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    }
};

    $scope.cancelUpload = function () {
        $scope.div_visible = true;
    };

} )

//+++++++++++++++++++++++++++Recent call page controller+++++++++++++++++++++

mainApp.controller( "recentCallController", function( $scope, $http, $state, $stateParams, $rootScope, $filter, $timeout ) {
    $scope.messageOptions = false;
    $scope.prevDisabled = false;
    $scope.nextDisabled = false;
    $scope.paginateSection = false;
    $scope.noCallDiv = false;
    $scope.showLeadstext = false;
    $scope.showmeleads = true;
    $scope.networkPopup = false;
    $scope.limit = 2;
    var checkVal = false;
    var pre_count = 0;
    var next_count = 0;
    var nextCount = 0;
    var users = 'billable';
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    $scope.proInfo = JSON.parse( dashboard_data ).data.profile.pro;
    if( proData == 2 ) {
        //for pro users
        $scope.isPro = true;
        $scope.messageOptions = true;
    } else {
        $scope.isPro = false;
    }
    $('.ui-loader').show();
    var getCallData = {};
    getCallData['responsetype'] = 'json';
    console.log( JSON.stringify( getCallData ) );
    var responsePromise = $http.post(BASE_URL+"recentcalls",JSON.stringify(getCallData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        $('.ui-loader').hide();
        if( data.message == 'user not logged in' ){
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/login"
            });
        }
        $scope.limit = data.data.per_page;
        $scope.recentCalls = data.data.callhistory;
        //console.log( JSON.stringify( $scope.recentCalls ) );
        // angular.forEach($scope.recentCalls, function(recentCall , filterKey) {
        //     recentCall.maxtime = $scope.convertTZ( recentCall.maxtime, data.data.timezone );
        // } );
        //console.log( JSON.stringify( $scope.recentCalls ) );
        $scope.totalCall = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;
        if ( $scope.totalCall <= $scope.currentCount ) {
            $("#prevBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            if( $scope.totalCall == 0 ){
                $scope.noCallDiv = true;
                $scope.noCall = "No recent calls available.";
            }
        }  else {
            $scope.paginateSection = true;
            $("#prevBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtnCall").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
        if ( $scope.totalCall == 0 ) {
            // $('#billable_user').addClass('fullwidth_white');
            // $('#billable_user').addClass('fullwidth_blue');
            // $('#trial_user').addClass('fullwidth_blue');
            // $('#trial_user').removeClass('fullwidth_white');
            //$scope.trialUser();
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.networkPopup = true;
        $('.phpdebugbar-openhandler-overlay').hide();
        $('.ui-loader').hide();
    } );
    $scope.billableUser = function () {
        checkVal = false;
        $scope.recentChats = {};
        pre_count = 0;
        next_count = 0;
        users = 'billable';
        $('#billable_user').addClass('fullwidth_bluemsg');
        $('#billable_user').removeClass('fullwidth_white');
        $('#trial_user').addClass('fullwidth_white');
        $('#trial_user').removeClass('fullwidth_bluemsg');

        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        var getCallData = {};
        getCallData['responsetype'] = 'json';
        console.log(JSON.stringify(getCallData));
        var responsePromise = $http.post(BASE_URL+"recentcalls",JSON.stringify(getCallData));
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            $scope.limit = data.data.per_page;
            $scope.recentCalls = data.data.callhistory;
            // angular.forEach($scope.recentCalls, function(recentCall , filterKey) {
            //     recentCall.maxtime = $scope.convertTZ( recentCall.maxtime, data.data.timezone );
            // } );
            $scope.totalCall = data.data.total_count;
            $scope.currentPage = data.data.current_page;
            $scope.currentCount = $scope.currentPage * $scope.limit;
            if ( $scope.totalCall <= $scope.currentCount ) {
                $scope.paginateSection = false;
                $("#prevBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
                if( $scope.totalCall == 0 ){
                    $scope.noCallDiv = true;
                    $scope.noCall = "No recent calls available.";
                }
            }  else {
                $scope.paginateSection = true;
                $("#prevBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtnCall").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
            }
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };
    $scope.leadsUser = function(){
        checkVal = true;
        // console.log("show");
        // $('.ui-loader').show();
        $scope.showLeadstext = false;
        $scope.paginateSection = true;
        $scope.showmeleads = true;
        $scope.messageOptions = true;
    };
    $scope.showLeads = function(){
        if(checkVal == true){
            // console.log(checkVal);
            evt.stopImmediatePropagation();
            evt.preventDefault();
        }else{
        //alert(1);
        $('.ui-loader').show();
        $('.phpdebugbar-openhandler-overlay').show();
        $timeout(function(){
          $scope.showLeadstext = true;
          $('.ui-loader').hide();
          $('.phpdebugbar-openhandler-overlay').hide();
        }, 2500);
        $scope.paginateSection = false;
        $scope.messageOptions = false;
        $scope.showmeleads = false;
        $scope.recentChats = {};
        pre_count = 0;
        next_count = 0;
        users = 'trial';
        $('#billable_user').addClass('fullwidth_white');
        $('#billable_user').addClass('fullwidth_bluemsg');
        $('#trial_user').addClass('fullwidth_bluemsg');
        $('#trial_user').removeClass('fullwidth_white');
        // $('.phpdebugbar-openhandler-overlay').show();
        // $('.ui-loader').show();
        var getCallData = {};
        getCallData['responsetype'] = 'json';
        getCallData['sort'] = 'free';
        console.log( JSON.stringify( getCallData ) );
        var responsePromise = $http.post( BASE_URL+"recentcalls", JSON.stringify( getCallData ) );
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            // $('.phpdebugbar-openhandler-overlay').hide();
            // $('.ui-loader').hide();
            $scope.limit = data.data.per_page;
            $scope.recentCalls = data.data.callhistory;
            // angular.forEach($scope.recentCalls, function(recentCall , filterKey) {
            //     recentCall.maxtime = $scope.convertTZ( recentCall.maxtime, data.data.timezone );
            // } );
            $scope.totalCall = data.data.total_count;
            $scope.currentPage = data.data.current_page
            $scope.currentCount = $scope.currentPage * $scope.limit;
            if( $scope.totalCall == 0 ) {
                $scope.noCallDiv = true;
                $scope.noCall = "No recent calls available.";
            } else {
                $scope.noCallDiv = false;
            }
            if ( $scope.totalCall <= $scope.currentCount ) {
                console.log("hello");
                $scope.paginateSection = false;
                $("#prevBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $('#arrow').css ( {"opacity":"0.5" });
                $scope.nextDisabled = true;
                $scope.prevDisabled = true;
            }  else {
                $scope.paginateSection = true;
                $("#prevBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                $("#nextBtnCall").css({"background":"#fff","border-color":"#fff","color":"#000"});
                $scope.nextDisabled = false;
                $scope.prevDisabled = true;
                $('#arrow').css ( {"opacity":"0.5" });
            }
            $scope.paginateSection = false;

        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('.phpdebugbar-openhandler-overlay').hide();
            $('.ui-loader').hide();
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
     }
    };
    $scope.prevBtn = function () {
        pre_count = next_count;
        if ( $scope.currentPage == 1 ) {
            $('#prevBtnCall').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            getCallData['page'] = pre_count;
            console.log( JSON.stringify( getCallData ) );
            var responsePromise = $http.post( BASE_URL+"recentcalls", JSON.stringify( getCallData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.recentCalls = data.data.callhistory;
                // angular.forEach($scope.recentCalls, function(recentCall , filterKey) {
                //     recentCall.maxtime = $scope.convertTZ( recentCall.maxtime, data.data.timezone );
                // } );
                $scope.totalCall = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalCall > $scope.currentCount ){
                        $("#nextBtnCall").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtnCall').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtnCall").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtnCall').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }
                next_count = next_count - 1;
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        next_count = next_count + 1;
        if ( $scope.totalCall >= $scope.limit && $scope.currentCount < $scope.totalCall ) {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            getCallData['page'] = next_count+1;
            console.log( JSON.stringify( getCallData ) );
            var responsePromise = $http.post( BASE_URL+"recentcalls", JSON.stringify( getCallData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.recentCalls = data.data.callhistory;
                // angular.forEach($scope.recentCalls, function(recentCall , filterKey) {
                //     recentCall.maxtime = $scope.convertTZ( recentCall.maxtime, data.data.timezone );
                // } );
                $scope.totalCall = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalCall > $scope.currentCount ) {
                    $('#nextBtnCall').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtnCall").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtnCall").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtnCall").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };

    $scope.missedVideoCalling = function(userId,missCaller_name){
        console.log(userId);
        console.log(missCaller_name);
        $scope.idCallback = userId;
        $scope.username1 = missCaller_name;
        //console.log($scope.idCallback);
        // console.log(idCallback);
        var videoData = {};
        videoData['responsetype'] = 'json';
        videoData['receiver'] = $scope.idCallback;
        // console.log(JSON.stringify(videoData));
        var responsePromise = $http.post( BASE_URL+"userdetails", JSON.stringify( videoData ) );
        responsePromise.success( function( data, status, headers, config ) {
        console.log(data);
            $scope.videoCallRate = data.data.video_call_rate;
            $scope.userBalance = data.data.originator_balance;
            $scope.reqBal = data.data.bal_req;
            localStorage.setItem("receiverImage_data",data.data.profile_image);
            var receiveData = JSON.stringify({'username':$scope.username1,'origId':$scope.idCallback,'videoRate':$scope.videoCallRate,'bal':$scope.userBalance,'page_name':'recentcalls'})
            if(data.data.originator_balance >= data.data.bal_req){
                console.log(receiveData);
                   $state.go('home.videoCalling',{receive_data:receiveData})
            }else{
                console.log("else condition");
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/videoCredits/"+$scope.username1+'/'+$scope.reqBal
                });
            }
        });
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $scope.networkPopup = true;
            // $('#overlay').show();
            if( navigator.connection.type == Connection.NONE ) {
                console.log("connection");
                checkConnection();
            }
        });
        // window.plugins.nativepagetransitions.slide( {
        //     "direction": 'right',
        //     "href" : '#/home/affter_login'
        // } );

    };
    $scope.backFromRecentcalls = function() {
        console.log("enter");
        window.plugins.nativepagetransitions.slide( {
            "direction": 'right',
            "href" : '#/home/affter_login'
        } );
    };
    $scope.closeNetworkPopup = function () {
        // $('#overlay').hide();
         $scope.networkPopup = false;
         window.plugins.nativepagetransitions.slide( {
            "direction": 'right',
            "href" : window.history.back()
        } );
    };
    $scope.goBackAgain = function(){
        // $('#overlay').hide();
        $scope.networkPopup = false;
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : "#/home/recentcalls"
        } );
    };
} )

//+++++++++++++++++++++++++++Caller History page controller+++++++++++++++++++++

mainApp.controller( "callerhistoryController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var originator_id = $stateParams.userId;
    var getCallerHistoryData = {};
    getCallerHistoryData['responsetype'] = 'json';
    getCallerHistoryData['uid'] = $stateParams.userId;
    // console.log($stateParams.userId);
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    var user_status = JSON.parse( dashboard_data ).data.user_status;
    $scope.proInfo = proData;
    $scope.showVideoIcon = false;
    // console.log(proData);
    if( proData == 2 ) {
        //for pro users
        $scope.isPro = true;
    } else {
        $scope.isPro = false;
    }
    //console.log(JSON.stringify(getCallerHistoryData));
    var responsePromise = $http.post(BASE_URL+"callerhistory",JSON.stringify(getCallerHistoryData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        if( data.message == 'user not logged in' ){
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/login"
            });
        }
        $scope.callerHistory = data.data;
        // console.log($scope.callerHistory);
        $scope.callerProfile = data.data.profile_images.profile_image;
        $scope.callerHistoryProData = data.data.caller.profile;
        console.log($scope.callerHistoryProData);
        var image = $('#profile_pic');
            image.css('background-image', 'url(' + $scope.callerProfile +')');
         angular.forEach($scope.callerHistory.usercallhistory , function(history , filterKey) {
            if( history.call_total_amount != null ) {
                history.call_total_amount = parseFloat( history.call_total_amount ).toFixed(2);
            } else {
                history.call_total_amount = 0.00;
            }
        } );
        // angular.forEach($scope.callerHistory.usercallhistory, function(history , filterKey) {
        //     history.call_start = $scope.convertTZ( history.call_start, data.data.timezone );
        // } );
        console.log($scope.callerHistoryProData.pro);
        if($scope.proInfo != $scope.callerHistoryProData.pro){
            // if( user_status == 'pending' || $scope.callerHistory.caller.status == 'pending' ) {
            //     console.log($scope.proInfo, user_status);
            //     $scope.showVideoIcon = false;
            // } else {
            //     console.log($scope.proInfo, user_status);
                $scope.showVideoIcon = true;
            // }
        } else {
            $scope.showVideoIcon = false;
        }
        if( data.data.isblocked == true ) {
            $('#alreadyBlocked').removeClass('redCallHistory');
            $('#alreadyBlocked').addClass('italicCall');
            $('#alreadyBlocked').html('already blocked');
        } else {
            $('#alreadyBlocked').removeClass('italicCall');
            $('#alreadyBlocked').addClass('redCallHistory');
            $('#alreadyBlocked').html('Block this user');
            $scope.blockUser = function(){
                if($('#alreadyBlocked').html()=='Block this user') {
                    navigator.notification.confirm(
                        'Are you sure you want to block this user?',  // message
                        onConfirm,
                        'Block User'
                    );
                }
            };
        }
        function onConfirm(button) {
            if( button == 1 ) {
                var blockUsrData = {};
                blockUsrData['responsetype'] = 'json';
                blockUsrData['caller_id'] = data.data.caller.id;
                var responsePromise = $http.post(BASE_URL+"blockuser",JSON.stringify(blockUsrData));
                responsePromise.success( function( data, status, headers, config ) {
                    $('#alreadyBlocked').html('user blocked');
                    $('#alreadyBlocked').removeClass('redCallHistory');
                    $('#alreadyBlocked').addClass('italicCall');
                } );
            }
        }
        if( data.data.iscontact == true ) {
            $('#alreadyContact').removeClass('blueCallHistory');
            $('#alreadyContact').addClass('italicCall');
            $('#alreadyContact').html('already a contact');
        } else {
            $('#alreadyContact').removeClass('italicCall');
            $('#alreadyContact').addClass('blueCallHistory');
            $('#alreadyContact').html('Add as contact');
            $scope.addAsContact = function(){
                var addContactData = {};
                addContactData['responsetype'] = 'json';
                addContactData['caller_id'] = data.data.caller.id;
                var responsePromise = $http.post(BASE_URL+"addcontact",JSON.stringify(addContactData));
                responsePromise.success( function( data, status, headers, config ) {
                    $('#alreadyContact').html('contact added');
                    $('#alreadyContact').removeClass('blueCallHistory');
                    $('#alreadyContact').addClass('italicCall');
                } );
            };
        }

    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    //profile page link from profile pic
    $scope.profileLink = function() {
        window.plugins.nativepagetransitions.slide({
            "href" : "#/home/socialprofile"+$scope.callerHistory.caller.id
        });
    };
    $scope.sendTip = function() {
        $('#overlay').show();
        $('.ui-loader').show();
        var page_name = 'callerhistory';
        var responsePromise = $http.get( BASE_URL+"sendtip?responsetype=json&proid="+originator_id );
        responsePromise.success( function( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $('#overlay').hide();
            $('.ui-loader').hide();
            $scope.sendTipInfo = data.message;
            if( data.status == 'error' ) {
                // console.log(data.status);
                //alert("success");
                // if( data.message == 'Redirect to upgrade as no credit card is on file.' ) {
                //     window.plugins.nativepagetransitions.slide( {
                //         "direction": 'left',
                //         "href" : '#/home/upgrade'
                //     } );
                // }
            }else{
                // console.log(page_name);
                if(data.data.linktext == "Blocked users"){
                    window.plugins.nativepagetransitions.slide( {
                        "direction": 'left',
                        "href" : "#/home/viewTip/"+originator_id+"/"+page_name+"/0"
                    } );
                }else{
                     window.plugins.nativepagetransitions.slide( {
                        "direction": 'left',
                        "href" : "#/home/sendTip/"+originator_id+"/"+page_name
                    } );
                }
                   
                
            }
        });
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );
        
        // window.plugins.nativepagetransitions.slide({
        //             "href" : "#/home/sendTip/"+originator_id+"/"+"reply"
        //         });

    };
    $scope.videoCallFromCallerhistory =function(id_receiver , name_receiver){
        console.log(id_receiver, name_receiver);
        $('.phpdebugbar-openhandler-overlay').hide();
        $scope.idCallback = id_receiver;
        $scope.username1 = name_receiver;
        //console.log($scope.idCallback);
        // console.log(idCallback);
        var videoData = {};
        videoData['responsetype'] = 'json';
        videoData['receiver'] = $scope.idCallback;
        // console.log(JSON.stringify(videoData));
        var responsePromise = $http.post( BASE_URL+"userdetails", JSON.stringify( videoData ) );
        responsePromise.success( function( data, status, headers, config ) {
        console.log(data);
            $scope.videoCallRate = data.data.video_call_rate;
            $scope.userBalance = data.data.originator_balance;
            $scope.reqBal = data.data.bal_req;
            localStorage.setItem("receiverImage_data",data.data.profile_image);
            var receiveData = JSON.stringify({'username':$scope.username1,'origId':$scope.idCallback,'videoRate':$scope.videoCallRate,'bal':$scope.userBalance,'page_name':'callerhistory'})
            if(data.data.originator_balance >= data.data.bal_req){
                console.log(receiveData);
                   $state.go('home.videoCalling',{receive_data:receiveData})
            }else{
                console.log("else condition");
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/videoCredits/"+$scope.username1+'/'+$scope.reqBal
                });
            }
        });
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $scope.networkPopup = true;
            // $('#overlay').show();
            if( navigator.connection.type == Connection.NONE ) {
                console.log("connection");
                checkConnection();
            }
        });
    };
    $scope.backButtonfrmCallerhist = function(){
        window.plugins.nativepagetransitions.slide({
            "direction" : "right",
            "href" : "#/home/affter_login"
        });
    };
} )

//+++++++++++++++++++++++++++Contacts page controller+++++++++++++++++++++

mainApp.controller( "contactsController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $(".fullwidthBluemsg_contact").css({'background':'rgba(92, 24, 98, .8)','border-color':'rgba(92, 24, 98, .8)','color': '#fff', 'text-shadow':'none'});
    $(".fullwidthWhite_contact").css({"background": "#fff","color": "#000","border-color": "#C7C3C3"});
    $(".displaySearch_contact").css({"display":"none"}); //Nanda 10 june
    $(".buttonSelect_contact").css({"padding-top": "13px"}) //Nanda 10 june
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    var user_status = JSON.parse( dashboard_data ).data.user_status;
    $scope.proInfo = proData;
    $scope.showVideoIcon = false;
    console.log($scope.proInfo);
    var getContactsData = {};
    $scope.noContactDiv = false;
    getContactsData['responsetype'] = 'json';
    var responsePromise = $http.post(BASE_URL+"contacts",JSON.stringify(getContactsData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log(JSON.stringify(data));
        $scope.receiverProData = data.data.pro;
        if(data.data.length > 20) //Nanda 10 june
        {
            $(".displaySearch_contact").css({"display":"block"});
            $(".buttonSelect_contact").css({"padding-top": "5px"})
        }
        if(data.data.length == 0){
            $scope.noContactDiv = true;
            $scope.noContacts = "You have not added contacts.";
        }
        if( data.message == 'user not logged in' ){
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/login"
            });
        }
        
        $scope.contacts = data.data;
        $scope.openPopup = function(contactId, contact_pro, contact_pro_status ){
            console.log(contact_pro, contact_pro_status);
            $('#'+contactId).show();
            $('#overlay').show();
            if($scope.proInfo != contact_pro){
                // if( user_status == 'pending' || contact_pro_status == 'pending' ) {
                //     console.log($scope.proInfo, user_status);
                //     $scope.showVideoIcon = false;
                // } else {
                //     console.log($scope.proInfo, user_status);
                    $scope.showVideoIcon = true;
                // }
                
            } else {
                $scope.showVideoIcon = false;
            }
        };
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );
    $scope.deleteContact = function(contactId){
        navigator.notification.confirm(
            'Are you sure you want to delete this contact?',  // message
            onConfirm,
            'Delete Contact'
        );
        function onConfirm(button){
            if( button == 1 ) {
                var deleteContactData = {};
                deleteContactData['responsetype'] = 'json';
                deleteContactData['contact_id'] = contactId;
                //console.log(JSON.stringify(deleteContactData));
                var responsePromise = $http.post(BASE_URL+"removecontact",JSON.stringify(deleteContactData));
                responsePromise.success( function( data, status, headers, config ) {
                    //console.log(JSON.stringify(data));
                    $('#'+contactId).hide();
                    $('#overlay').hide();
                    $('#contact_'+contactId).hide("medium", function(){
                        $(this).remove();
                        if( $.trim( $( '.dashboard' ).text() ).length == 0 ) {
                            $('.no_msg').html("No contacts available.").show().removeClass('ng-hide');
                        }
                    });
                } );
                responsePromise.error( function ( data, status, headers, config ) {
                    console.log( JSON.stringify( data ) );
                    if(navigator.connection.type == Connection.NONE) {
                        checkConnection();
                    }
                } );
            }
        }
    };
    $scope.cancelPopup = function(contactId){
        $('#'+contactId).hide();
        $('#overlay').hide();
    };
    $scope.sortContact = function(){
        $(".fullwidthWhite_contact").css({'background':'rgba(92, 24, 98, .8)','border-color':'rgba(92, 24, 98, .8)','color': '#fff', 'text-shadow':'none'});
        $(".fullwidthBluemsg_contact").css({"background": "#fff","color": "#000","border-color": "#C7C3C3"});
        $("#search-basic").val("");
        $scope.sortType = "displayname";
        $scope.sortReverse = false;
        $scope.searchText = "";
    };
    $scope.resetContact = function(){
        $(".fullwidthBluemsg_contact").css({'background':'rgba(92, 24, 98, .8)','border-color':'rgba(92, 24, 98, .8)','color': '#fff', 'text-shadow':'none'});
        $(".fullwidthWhite_contact").css({"background": "#fff","color": "#000","border-color": "#C7C3C3"});
        $("#search-basic").val("");
        $scope.sortType = "";
        $scope.searchText = "";
    };

    $scope.searchFilter = function(obj){
        var re = new RegExp($scope.searchText,'i');
        return !$scope.searchText || re.test(obj.displayname) || re.test(obj.profile_status) || re.test(obj.online_status);
    };
    $scope.RemoveIcon = false;
    $scope.OnKeyupRemove = function(e){
        $scope.RemoveIcon= true;
        if ($scope.searchText =="") {
            $scope.RemoveIcon = false;
        }
    };

    $scope.removeSearchText = function(){
        $scope.RemoveIcon = false;
        $scope.searchText = "";
        $(".searchData").val('');
    };
    $scope.addPro_UserContact = function(){
        window.plugins.nativepagetransitions.slide({
            "direction": 'left',
            "href" : "#/home/addProContact"
        });
    };
    $scope.videoCallFromContacts = function(receiverId,receiver_name){
        $('.phpdebugbar-openhandler-overlay').hide();
        console.log(receiverId);
        console.log(receiver_name);
        $scope.idCallback = receiverId;
        $scope.username1 = receiver_name;
        //console.log($scope.idCallback);
        // console.log(idCallback);
        var videoData = {};
        videoData['responsetype'] = 'json';
        videoData['receiver'] = $scope.idCallback;
        // console.log(JSON.stringify(videoData));
        var responsePromise = $http.post( BASE_URL+"userdetails", JSON.stringify( videoData ) );
        responsePromise.success( function( data, status, headers, config ) {
        console.log(data);
            $scope.videoCallRate = data.data.video_call_rate;
            $scope.userBalance = data.data.originator_balance;
            $scope.reqBal = data.data.bal_req;
            localStorage.setItem("receiverImage_data",data.data.profile_image);
            var receiveData = JSON.stringify({'username':$scope.username1,'origId':$scope.idCallback,'videoRate':$scope.videoCallRate,'bal':$scope.userBalance,'page_name':'contacts'})
            if(data.data.originator_balance >= data.data.bal_req){
                console.log(receiveData);
                   $state.go('home.videoCalling',{receive_data:receiveData})
            }else{
                console.log("else condition");
                window.plugins.nativepagetransitions.slide({
                    "href" : "#/home/videoCredits/"+$scope.username1+'/'+$scope.reqBal
                });
            }
        });
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $scope.networkPopup = true;
            // $('#overlay').show();
            if( navigator.connection.type == Connection.NONE ) {
                console.log("connection");
                checkConnection();
            }
        });
    };
    $scope.backButton1 =function(){
        window.plugins.nativepagetransitions.slide({
            "direction" : "right",
            "href" : "#/home/affter_login"
        });
    };

} )
//+++++++++++++++++++++++++++addProContact page Controller++++++++++++++++++++
mainApp.controller( "addProContactController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $scope.hideRemoveIcon = false;
    $scope.contactAddBtn = false;
    $scope.Show_no_result_msg = false;
    $scope.contactAlertErrorShow = false;
    var dashboard_data = localStorage.getItem( "dashboard_data" );
    var proData = JSON.parse( dashboard_data ).data.profile.pro;
    if (proData == 2) {
        $scope.displayContactHeading = 'Add User Contact';
        $scope.placeholder = 'Find User';
    }else{
        $scope.displayContactHeading = 'Add Pro Contact';
        $scope.placeholder = 'Find Pro';
    }
    $scope.OnKeyupRemove = function(e){
        // console.log(e.keyCode);
        $scope.hideRemoveIcon= true;
        $scope.Show_no_result_msg = false;
        $scope.contactAddBtn = false;
        $scope.contactAlertErrorShow = false;
        if ($scope.searchContact =="") {
            $scope.hideRemoveIcon = false;
        }
    };

    $scope.removeTextSearch = function(){
        console.log($scope.searchContact);
        $scope.searchContact = "";
        $scope.hideRemoveIcon = false;
        $scope.contactAddBtn = false;
        $scope.Show_no_result_msg = false;
        $scope.contactAlertErrorShow = false;
    };

    $scope.searchThisContact = function(){
        $('.ui-loader').show();
        $('.phpdebugbar-openhandler-overlay').show();
        console.log("search");
        console.log($scope.searchContact);
        if ($scope.searchContact !== undefined) {
            var getSearchData = {};
            getSearchData['responsetype'] = 'json';
            getSearchData['search'] = $scope.searchContact;
            var responsePromise = $http.post(BASE_URL+"addcontacts",JSON.stringify(getSearchData));
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.ui-loader').hide();
                $('.phpdebugbar-openhandler-overlay').hide();
                if (data.srh_msg == 'User found') {
                    $scope.Show_no_result_msg = false;
                    $scope.contactAddBtn = true;
                    $scope.contactIdUser = data.searchUser.user_id;
                }else{
                    $scope.Show_no_result_msg = true;
                    $scope.no_result = data.srh_msg;
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };

    $scope.saveContact = function(){
        // $scope.contactAlertErrorShow = true;
        console.log($scope.contactIdUser);
        var saveSearchData = {};
        saveSearchData['responsetype'] = 'json';
        saveSearchData['contact_id'] = $scope.contactIdUser;
        var responsePromise = $http.post(BASE_URL+"savecontact",JSON.stringify(saveSearchData));
        responsePromise.success( function( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $scope.alreadyAddedContact = data.message;
            if (data.status == 'error') {
                $scope.contactAlertErrorShow = true;
                $scope.contactAddBtn = false;
                $('.contactAlertError').css ( {"color":"red"});
            }else{
                $scope.contactAlertErrorShow = true;
                $scope.contactAddBtn = false;
                $('.contactAlertError').css ( {"color":"green"});
            }
            
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );

    };



})
//+++++++++++++++++++++++++++blockedusers page controller+++++++++++++++++++++

mainApp.controller( "blockedusersController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var getBlockUserData = {};
    getBlockUserData['responsetype'] = 'json';
    $scope.noBlockUsersDiv = false;
    //console.log( JSON.stringify( getBlockUserData ) );
    var responsePromise = $http.post(BASE_URL+"blockedusers",JSON.stringify(getBlockUserData));
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(data.data.length == 0){
            $scope.noBlockUsersDiv = true;
            $scope.noBlockUsers = "No users are blocked.";
        }
        if( data.message == 'user not logged in' ){
            window.plugins.nativepagetransitions.slide({
                "href" : "#/home/login"
            });
        }
        $scope.blockUsers = data.data;
        $scope.openPopup = function(blockId){
            $('#'+blockId).show();
            $('#overlay').show();
        };
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );


    $scope.unblockUser = function(blockId,id1){
        navigator.notification.confirm(
            'Are you sure you want to UN-BLOCK this contact?',  // message
            onConfirm,
            'UN-BLOCK Contact'
        );
        function onConfirm( button ) {
            if( button == 1 ) {
                var unblockData = {};
                unblockData['responsetype'] = 'json';
                unblockData['contact_id'] = blockId;
                //console.log(JSON.stringify(unblockData));
                var responsePromise = $http.post(BASE_URL+"unblock",JSON.stringify(unblockData));
                responsePromise.success( function( data, status, headers, config ) {
                    console.log(JSON.stringify(data));
                    $( '#'+id1 ).hide();
                    $( '#overlay' ).hide();
                    $( '#blockUser_'+id1 ).hide( "medium", function(){
                        $(this).remove();
                        if( $.trim( $( '.dashboard' ).text() ).length == 0 ) {
                            $('.no_msg').html("No users are blocked.").show().removeClass('ng-hide');
                        }
                    } );
                } );
                responsePromise.error( function ( data, status, headers, config ) {
                    console.log( JSON.stringify( data ) );
                    if( navigator.connection.type == Connection.NONE ) {
                        checkConnection();
                    }
                } );
            }
        }
    };
    $scope.cancelPopup = function(blockId){
        $('#'+blockId).hide();
        $('#overlay').hide();
    };

} )

//+++++++++++++++++++++++++++editlocation page controller+++++++++++++++++++++

mainApp.controller( "editlocationController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var flag = false;
    var locationSetData = {};
    locationSetData['responsetype'] = 'json';
    //console.log(JSON.stringify(locationSetData));
    var responsePromise = $http.post(BASE_URL+"editlocation",JSON.stringify(locationSetData));
    responsePromise.success( function( data, status, headers, config ) {
        //console.log(JSON.stringify(data));
        $( '#userLocation' ).val(data.data.location);
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log(JSON.stringify(data));
    } );
    $scope.updateLocation = function() {
        $('#locationStatusCheck').html('');
        if( $('#userLocation').val().length == 0 ) {
            $('#locationError').html('This field is required');
            $("label[for='userLocation']").css('color','red');
            flag = false;
        } else {
            flag = true;
        }
        // $( '#userLocation' ).keydown(function (e) {
        //     if(e.keyCode == 8){
        //         // console.log($('#userLocation').val().length);
        //         if( $('#userLocation').val().length == 1 ){
        //             // console.log($('#userLocation').val().length);
        //             $( '#locationError' ).html( 'This field is required.' );
        //             $("label[for='userLocation']").css('color','red');
        //             flag = false;
        //             } else{
        //             // console.log($('#userLocation').val().length);
        //             $('#locationError').html('');
        //             $("label[for='userLocation']").removeAttr('style');
        //             flag = true;
        //        }
        //    }else{
        //     if( $('#userLocation').val().length == 0 ){
        //         // console.log($('#userLocation').val().length);
        //             $( '#locationError' ).html( 'This field is required.' );
        //             $("label[for='userLocation']").css('color','red');
        //             flag = false;
        //             } else{
        //             // console.log($('#userLocation').val().length);
        //             $('#locationError').html('');
        //             $("label[for='userLocation']").removeAttr('style');
        //             flag = true;
        //         }
                
        //     }
        //     // $('#locationStatusCheck').html('');
        //     // var withoutSpace = $('#userLocation').val().replace(/ /g,"");
        //     // var withoutSpaceLength = withoutSpace.length;
        //     // if( $('#userLocation').val().indexOf(' ') >= 0 ) {
        //     //     if( withoutSpaceLength == 0 ) {
        //     //         $('#locationError').html('This field is required');
        //     //         $("label[for='userLocation']").css('color','red');
        //     //     } else {
        //     //         $('#locationError').html('');
        //     //         $("label[for='userLocation']").removeAttr('style');
        //     //         flag = true;
        //     //     }
        //     // }
        //     // if( $('#userLocation').val().length == 0 ) {
        //     //     $('#locationError').html('This field is required');
        //     //     $("label[for='userLocation']").css('color','red');
        //     //     flag = false;
        //     // } else {
        //     //     if( withoutSpaceLength == 0 ) {
        //     //         $('#locationError').html('This field is required');
        //     //         $("label[for='userLocation']").css('color','red');
        //     //     } else {
        //     //         $('#locationError').html('');
        //     //         $("label[for='userLocation']").removeAttr('style');
        //     //         flag = true;
        //     //     }
        //     // }
        // } );
        $( '#userLocation' ).keyup(function (e) {
            $('#locationStatusCheck').html('');
            var withoutSpace = $('#userLocation').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( $('#userLocation').val().indexOf(' ') >= 0 ) {
                if( withoutSpaceLength == 0 ) {
                    $('#locationError').html('This field is required');
                    $("label[for='userLocation']").css('color','red');
                } else {
                    $('#locationError').html('');
                    $("label[for='userLocation']").removeAttr('style');
                    flag = true;
                }
            }
            if( $('#userLocation').val().length == 0 ) {
                $('#locationError').html('This field is required');
                $("label[for='userLocation']").css('color','red');
                flag = false;
            } else {
                if( withoutSpaceLength == 0 ) {
                    $('#locationError').html('This field is required');
                    $("label[for='userLocation']").css('color','red');
                } else {
                    $('#locationError').html('');
                    $("label[for='userLocation']").removeAttr('style');
                    flag = true;
                }
            }
        } );
        if( $('#userLocation').val() != '' ) {
            var withoutSpace = $('#userLocation').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( withoutSpaceLength == 0 ) {
                $("#label[for='userLocation']").css('color','red');
                $( '#locationError' ).html('This field is required.');
                flag = false;
            } else {
                $('#locationError').html('');
                $("label[for='userLocation']").removeAttr('style');
                flag = true;
            }
        }
        if( flag == true ) {
            locationSetData['location'] = $scope.location;
            //console.log(JSON.stringify(locationSetData));
            $('.ui-loader').show();
            var responsePromise = $http.post(BASE_URL+"editlocation",JSON.stringify(locationSetData));
            responsePromise.success( function( data, status, headers, config ) {
                $('.ui-loader').hide();
                //console.log(JSON.stringify(data));
                if( data.message == 'user not logged in' ){
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/login"
                    });
                }
                if( data.status == 'success' ) {
                    $('#locationStatusCheck').removeClass('errorStatus').addClass('succesStatus');
                } else {
                    $('#locationStatusCheck').removeClass('succesStatus').addClass('errorStatus');
                }
                $('#locationStatusCheck').html( data.message );
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                $('.ui-loader').hide();
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
} )

//+++++++++++++++++++++++++++editaboutme page controller+++++++++++++++++++++

mainApp.controller( "editaboutmeController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var flag = false;
    var aboutmeData = {};
    aboutmeData['responsetype'] = 'json';
    //console.log(JSON.stringify(aboutmeData));
    var responsePromise = $http.post( BASE_URL+"editaboutme", JSON.stringify( aboutmeData ) );
    responsePromise.success( function( data, status, headers, config ) {
        //console.log( JSON.stringify( data ) );
        $('#aboutme').val(data.data.aboutme);
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
    } );
    $scope.updateAboutMe = function() {
        $('#aboutmeStatusCheck').removeClass('succesStatus').addClass('errorStatus');
        if( $('#aboutme').val() == '' ) {
            $('#aboutmeError').html('This field is required');
            $("label[for='aboutme']").css('color','red');
            flag = false;
        } else {
            flag = true;
        }
        // $( '#aboutme' ).keydown(function (e) {
        //     if(e.keyCode == 8){
        //         // console.log("enter");
        //         if( $('#aboutme').val().length == 1 ){
        //             $( '#aboutmeError' ).html( 'This field is required.' );
        //             $("label[for='aboutme']").css('color','red');
        //             flag = false;
        //             } else{
        //                 $('#aboutmeError').html('');
        //                 $("label[for='aboutme']").removeAttr('style');
        //                 flag = true;
        //              }
        //    }else{
        //     if( $('#aboutme').val().length == 0 ){
        //             $( '#aboutmeError' ).html( 'This field is required.' );
        //             $("label[for='aboutme']").css('color','red');
        //             flag = false;
        //             } else{
        //             $('#aboutmeError').html('');
        //             $("label[for='aboutme']").removeAttr('style');
        //             flag = true;
        //         }
                
        //     }
        //     // if(e.keyCode == 8){
        //     //        if( $( '#aboutmeError' ).html() == 'This field is required' ) {
        //     //         $('#aboutmeError').html('');
        //     //         $("label[for='aboutme']").removeAttr('style');
        //     //         flag = true;
        //     //     } 
        //     // }else{
        //     //         if( $( '#aboutmeError' ).html() == 'This field is required' ) {
        //     //         $('#aboutmeError').html('');
        //     //         $("label[for='aboutme']").removeAttr('style');
        //     //         flag = true;
        //     //     }
        //     // }
            
        // } );
        $( '#aboutme' ).keyup(function (e) {
            var withoutSpace = $('#aboutme').val().replace(/ /g,"");
            var withoutSpaceLength = withoutSpace.length;
            if( $('#aboutme').val().indexOf(' ') >= 0 ) {
                if( withoutSpaceLength == 0 ) {
                    $('#aboutmeError').html('This field is required');
                    $("label[for='aboutme']").css('color','red');
                } else {
                    $('#aboutmeError').html('');
                    $("label[for='aboutme']").removeAttr('style');
                    flag = true;
                }
            }
            if( $('#aboutme').val().length == 0 ) {
                $('#aboutmeError').html('This field is required');
                $("label[for='aboutme']").css('color','red');
                flag = false;
            } else {
                if( withoutSpaceLength == 0 ) {
                    $('#aboutmeError').html('This field is required');
                    $("label[for='aboutme']").css('color','red');
                } else {
                    $('#aboutmeError').html('');
                    $("label[for='aboutme']").removeAttr('style');
                    flag = true;
                }
            }
        } );
        if( flag == true ) {
            aboutmeData['aboutme'] = $scope.aboutme;
            //console.log(JSON.stringify(aboutmeData));
            $('.ui-loader').show();
            var responsePromise = $http.post( BASE_URL+"editaboutme", JSON.stringify( aboutmeData ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.ui-loader').hide();
                //console.log(JSON.stringify(data));
                if( data.message == 'user not logged in' ) {
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/login"
                    });
                }
                if( data.status == 'success' ){
                    $('#aboutmeStatusCheck').removeClass('errorStatus').addClass('succesStatus');
                } else {
                    $('#aboutmeStatusCheck').removeClass('succesStatus').addClass('errorStatus');
                }
                $('#aboutmeStatusCheck').html(data.message);
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
} )

//+++++++++++++++++++++++++++forsale page controller+++++++++++++++++++++

mainApp.controller( "forsaleController", function( $scope, $http, $state, $stateParams, $rootScope, constantData ) {
    $scope.submitSocialShow = true;
    $scope.social_link_select = [{ id:'', value:'(Select social link)'}];;
    angular.forEach(constantData.socialLinks(), function(value, key){
        var item = { id:key, value:value };
        $scope.social_link_select.push(item);
    });
    // $scope.social_link_select = [
    //     {id:'facebook', value:'Facebook'},
    //     {id:'twitter', value:'Twitter'},
    //     {id:'linkedin', value:'Linkedin'},
    //     {id:'amazon', value:'Amazon'},
    //     {id:'instagram', value:'Instagram'},
    //     {id:'my-web', value:'My-web'},
    //     {id:'tubmir', value:'Tubmir'},
    //     {id:'vine', value:'Vine'}
    // ];
    //$scope.socialLinkSelected = $scope.social_link_select[0];
    var defaultSocialData = {};
    defaultSocialData['responsetype'] = 'json';
    var responsePromise = $http.post( BASE_URL+"sociallinks", JSON.stringify( defaultSocialData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.socialData = data.data.sociallinks;
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );
    $scope.submitSocialLink = function(isEdit) {
        $('#socialLinkStatus').removeClass('succesStatus').addClass('errorStatus');
        if( $( '#profile_name' ).val() != '' ) {
            $( '#errorsocialname' ).html( '' );
            $( "label[for='profile_name']" ).removeAttr('style');
            var socialLinksData = {};
            socialLinksData['responsetype'] = 'json';
            socialLinksData['link_type'] = $scope.socialLinkSelected;
            socialLinksData['profile_name'] = $scope.profile_name;
            socialLinksData['editprofilename'] = isEdit;
            console.log( JSON.stringify( socialLinksData ) );
            $('.ui-loader').show();
            var responsePromise = $http.post( BASE_URL+"sociallinks", JSON.stringify( socialLinksData ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.ui-loader').hide();
                console.log( JSON.stringify( data ) );
                $state.go($state.current, {}, {reload: true});
                $scope.submitSocialShow = true;
                $scope.serverMsg = data.message;
                $scope.socialData = data.data.sociallinks;
                $scope.socialLinkSelected = $scope.social_link_select[0].id;
                $('#profile_name').val('');
                if( data.status == 'success' ){
                    $('#socialLinkStatus').removeClass('errorStatus').addClass('succesStatus');
                } else {
                    $('#socialLinkStatus').removeClass('succesStatus').addClass('errorStatus');
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                $('.ui-loader').hide();
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $( '#profile_name' ).keydown(function (e) {
                if( $('#profile_name').val() != '' ) {
                    $('#errorsocialname').html('');
                    $("label[for='profile_name']").removeAttr('style');
                } else {
                    $('#errorsocialname').html('This field is required.');
                    $("label[for='profile_name']").css('color','red');
                }
            } );
            $('#errorsocialname').html('This field is required.');
            $("label[for='profile_name']").css('color','red');
        }

    };


    $scope.editLink = function ( id ) {
        $("#social_"+id+",.phpdebugbar-openhandler-overlay").fadeIn();
    };
    $scope.cancel = function ( id ) {
        $("#social_"+id+",.phpdebugbar-openhandler-overlay").fadeOut();
    };
    $scope.editSocialLink = function ( id, profileName, socialsite ) {
        $scope.submitSocialShow = false;
        $scope.profile_name = profileName;
        $scope.socialLinkSelected = socialsite;
        $("#social_"+id+",.phpdebugbar-openhandler-overlay").fadeOut();
    };
    $scope.deletelink = function ( id ) {
        navigator.notification.confirm(
            'Are you sure you want to delete this link?',  // message
            onConfirm,
            'Delete link'
        );
        function onConfirm(button){
            if( button == 1 ) {
                var deleteSocialData = {};
                deleteSocialData['responsetype'] = 'json';
                deleteSocialData['linkid'] = id;
                console.log(JSON.stringify(deleteSocialData));
                var responsePromise = $http.post( BASE_URL+"deletesociallink", JSON.stringify( deleteSocialData ) );
                responsePromise.success( function( data, status, headers, config ) {
                    console.log(JSON.stringify(data));
                    $("#social_"+id+",.phpdebugbar-openhandler-overlay").hide();
                    $('#link_'+id).hide("medium", function(){ $(this).remove(); });
                } );
                responsePromise.error( function ( data, status, headers, config ) {
                    console.log( JSON.stringify( data ) );
                    if(navigator.connection.type == Connection.NONE) {
                        checkConnection();
                    }
                } );
            }
        }
    };
} )

//+++++++++++++++++++++++++++social page controller+++++++++++++++++++++

mainApp.controller( "socialnewController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var user_detail = localStorage.getItem("userDetail");
    var userData = JSON.parse(user_detail).data;
    $scope.date = new Date();
    $scope.loginid = userData.id;
    $scope.userid = $stateParams.userid;
    var viewprofileData = {};
    viewprofileData['responsetype'] = 'json';
    viewprofileData['userid'] = $stateParams.userid;
    var responsePromise = $http.post( BASE_URL+"socialprofile", JSON.stringify( viewprofileData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.user_data = data.data;
        $scope.profileData = data.data.sociallinks;
        var user_number = data.data.userprofile.ringhop_number;
        if(user_number != ''){
            $scope.usr_number = "+"+user_number.substr(0,1)+" ("+user_number.substr(1, 3)+") "+user_number.substr(4, 3)+"-"+user_number.substr(7, 4);
        } else {
            $scope.usr_number = "";
        }
        if( data.data.iscontact == false ) {
            $('#savecontact').html('Save Contact');
        } else {
            $('#savecontact').html('Already a contact');
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );
    $scope.saveContact = function () {
        if( $scope.user_data.iscontact == false ){
            var saveContactData = {};
            saveContactData['responsetype'] = 'json';
            saveContactData['caller_id'] = $stateParams.userid;
            console.log( JSON.stringify( saveContactData ) );
            var responsePromise = $http.post( BASE_URL+"addcontact", JSON.stringify( saveContactData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $scope.contactMsg = data.message;
                if( data.status == 'error' ){
                    $('#savecontact').html('Already a contact');
                } else {
                    $('#savecontact').html('Contact added');
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
} )

//+++++++++++++++++++++++++++viewprofilenew page controller+++++++++++++++++++++

mainApp.controller( "viewprofilenewController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var user_detail = localStorage.getItem("userDetail");
    var userData = JSON.parse(user_detail).data;
    $scope.date = new Date();
    $scope.loginid = userData.id;
    $scope.userid = $stateParams.userid;
    var viewprofileData = {};
    viewprofileData['responsetype'] = 'json';
    //viewprofileData['uid'] = $stateParams.userid;
    var responsePromise = $http.get( SITE_URL+$stateParams.uname+'?responsetype=json');
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.user_data = data.data;
        $scope.profileData = data.data.sociallinks;
        var user_number = data.data.ringhop_number;
        $scope.profilenew = data.data.profile_images.profile_image;

        //console.log($scope.profilenew);
        var image = $('#profile_pic');
            image.css('background-image', 'url(' + $scope.profilenew +')');

        //$scope.user_data.caller.profile.ringhop_number = "("+user_number.substr(1, 3)+") "+user_number.substr(4, 3)+"-"+user_number.substr(7, 4);
        if(user_number != ''){
            $scope.user_data.ringhop_number = "("+user_number.substr(1, 3)+") "+user_number.substr(4, 3)+"-"+user_number.substr(7, 4);
        } else {
            $scope.user_data.ringhop_number = "";
        }

        $scope.blockUser = function(){
            if($('#alreadyBlocked').html()=='Block this user') {
                navigator.notification.confirm(
                    'Are you sure you want to block this user?',  // message
                    onConfirm,
                    'Block User'
                );
            }
        };
        function onConfirm(button) {
            if( button == 1 ) {
                var blockUsrData = {};
                blockUsrData['responsetype'] = 'json';
                blockUsrData['caller_id'] = data.data.caller.id;
                var responsePromise = $http.post(BASE_URL+"blockuser",JSON.stringify(blockUsrData));
                responsePromise.success( function( data, status, headers, config ) {
                    $('#alreadyBlocked').html('user blocked');
                    $('#alreadyBlocked').removeClass('redCallHistory');
                    $('#alreadyBlocked').addClass('italicCall');
                } );
            }
        }
        if( data.data.iscontact == true ) {
            $('#alreadyContact').removeClass('blueCallHistory');
            $('#alreadyContact').addClass('italicCall');
            $('#alreadyContact').html('already a contact');
        } else {
            $('#alreadyContact').removeClass('italicCall');
            $('#alreadyContact').addClass('blueCallHistory');
            $('#alreadyContact').html('Add as contact');
            $scope.addAsContact = function(){
                var addContactData = {};
                addContactData['responsetype'] = 'json';
                addContactData['caller_id'] = data.data.caller.id;
                var responsePromise = $http.post(BASE_URL+"addcontact",JSON.stringify(addContactData));
                responsePromise.success( function( data, status, headers, config ) {
                    $('#alreadyContact').html('contact added');
                    $('#alreadyContact').removeClass('blueCallHistory');
                    $('#alreadyContact').addClass('italicCall');
                } );
            };
        }

    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if( navigator.connection.type == Connection.NONE ) {
            checkConnection();
        }
    } );

    $scope.openLink = function(url){
        // console.log(url);
        var ref = window.open(url, '_blank');
    };

    $scope.saveContact = function () {
        if( $scope.user_data.iscontact == false ){
            var saveContactData = {};
            saveContactData['responsetype'] = 'json';
            saveContactData['caller_id'] = $stateParams.userid;
            // console.log( JSON.stringify( saveContactData ) );
            var responsePromise = $http.post( BASE_URL+"addcontact", JSON.stringify( saveContactData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $scope.contactMsg = data.message;
                if( data.status == 'error' ){
                    $('#savecontact').html('Already a contact');
                } else {
                    $('#savecontact').html('Contact added');
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
    $scope.menuloggedout = function () {
        if( flagMenu == 0 ) {
            $( ".wrapper" ).animate( {
               "left":"-280px"
            } );
            flagMenu = 1;
        } else {
            $( ".wrapper" ).animate( {
               "left":"0px"
            } );
            flagMenu = 0;
        }
    };
} )

//+++++++++++++++++++++++++++viewprofile page controller+++++++++++++++++++++

mainApp.controller( "viewprofileController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $scope.playSlide = false;
    $( ".hide-content-row" ).hide();
    $( '.save-list-section' ).hide();
    $( "#shortDesc" ).click ( function() {
        $( ".hide-content-row" ).show();
        $( '.save-list-section' ).show();
        $( "#shortDesc" ).hide();
    } );
    //alert($stateParams.user_id);
    $scope.saveContacts = true;
    $scope.saveClick = function () {
        if($scope.saveContacts == true) {
            $scope.saveContacts = false;
        } else {
            $scope.saveContacts = true;
        }
    };
    if( $stateParams.user_id == '' || $stateParams.user_id == null ) {
        //do nothing
    } else {
        //$scope.slides = [];
        var profileData = {};
        profileData['responsetype'] = 'json';
        profileData['uid'] = $stateParams.user_id;
        //console.log(JSON.stringify(profileData));
        var responsePromise = $http.post( BASE_URL+"profile", JSON.stringify( profileData ) );
        responsePromise.success( function( data, status, headers, config ) {
            console.log(JSON.stringify(data));
            /*$('#slider_ul').css({
                position:'absolute',
                left: ($(window).width() - $('#slider_ul').outerWidth())/2,
                top: ($(window).height() - $('#slider_ul').outerHeight())/2
            });*/

            $scope.profileInfo = data.data;
            $scope.slides = [
                { image: $scope.profileInfo.profile_image_big, description: 'Image 00' },
                { image: 'img/imgA.jpg', description: 'Image 01' },
                { image: 'img/imgB.jpg', description: 'Image 02' },
                { image: 'img/imgC.jpg', description: 'Image 03' },
                { image: 'img/imgD.jpg', description: 'Image 04' },
                { image: 'img/imgE.jpg', description: 'Image 05' }
            ];


            function getSlide(target, style) {
                var i = target.length;
                return {
                    id: (i + 1),
                    label: 'slide #' + (i + 1),
                    img: $scope.slides[i].image,
                    odd: (i % 2 === 0)
                };
            }

            function addSlide(target, style) {
                target.push(getSlide(target, style));
            };
            $scope.carouselIndex2 = 0;
            function addSlides(target, style, qty) {
                for (var i=0; i < qty; i++) {
                    addSlide(target, style);
                }
            }
            $scope.slides2 = [];
            addSlides($scope.slides2, 'sports', 6);

            $scope.playSlider = function () {
                if ( $scope.playSlide == false ) {
                    $scope.playSlide = true;
                    $("#slider_ul1").attr("rn-carousel-auto-slide","");
                    $("#slider_ul").attr("rn-carousel-auto-slide","");
                } else {
                    $scope.playSlide = false;
                    $("#slider_ul1").removeAttr("rn-carousel-auto-slide");
                    $("#slider_ul").removeAttr("rn-carousel-auto-slide");
                }

            };
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
           // alert('server error');
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );

    }

    $(".slider-popup-frame").hide();
    $scope.openPopup = function () {
        //console.log('clicked on img');
        $(".slider-popup-frame").show();
    };
    $scope.closePopup = function () {
        $(".slider-popup-frame").hide();
    };
    $scope.discription = function () {
        $(".hide-content-row").hide();
        $("#shortDesc").show();
        $(".save-list-section").hide();
    };
    /** angular slider**/
} );
/*.animation('.slide-animation', function () {
return {
    beforeAddClass: function (element, className, done) {
        var scope = element.scope();

        if (className == 'ng-hide') {
            var finishPoint = element.parent().width();
            if(scope.direction !== 'right') {
                finishPoint = -finishPoint;
            }
            TweenMax.to(element, 0.5, {
                left: finishPoint, onComplete: done
            });
        } else {
            done();
        }
    },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
    /** angular slider end**/
/*} );*/

//+++++++++++++++++++++++++++addcredits page controller+++++++++++++++++++++
mainApp.controller( "addcreditsController", function( $scope, $http, $state, $stateParams, $rootScope, $timeout, constantData ) {
    $rootScope.$on('$stateChangeSuccess', function( ev, to, toParams, from, fromParams ) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
    });
    $scope.credisList = constantData.creditsList();
    $scope.InApp_credits = [
        { credit:'10', price:'9.99'},
        { credit:'20', price:'19.99'},
        { credit:'40', price:'39.99' },
        { credit:'60', price:'99.99'}
    ];
    $scope.Credit = 20;
    $scope.errorMsg = '';
    var user_detail = localStorage.getItem( "userDetail" );
    var userid = JSON.parse( user_detail ).data.id;
    var creditData = {};
    creditData['responsetype'] = 'json';
    creditData['userid'] = userid;
    // console.log(JSON.stringify(creditData));
    var responsePromise = $http.get( BASE_URL+"addcredits?responsetype=json&userid="+userid );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.creditInfo = data.balance_msg;
        // if( data.status == 'error' ) {
        //     if( data.message == 'Redirect to upgrade as no credit card is on file.' ) {
        //         window.plugins.nativepagetransitions.slide( {
        //             "direction": 'left',
        //             "href" : '#/home/upgrade'
        //         } );
        //     }
        // }else{
            //localStorage.setItem("payment_method",data.paymentVia);
            $scope.payment_method = data.paymentVia;
        //}
    });
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if( navigator.connection.type == Connection.NONE ) {
            checkConnection();
        }
    } );
    var productIds = ['com.ringhop.ringhop.10','com.ringhop.ringhop.20','com.ringhop.ringhop.40','com.ringhop.ringhop.60'];
    inAppPurchase
      .getProducts(productIds)
      .then(function (products) {
        $scope.products = products;
        console.log($scope.products);
      })
      .catch(function (err) {
        console.log(err);
      });
    var nameOfPage = $stateParams.pageName;
    $scope.creditSubmit = function( credit, price ) {
        $('.phpdebugbar-openhandler-overlay').show();
        $('.ui-loader').show();
        console.log(credit, price);
        if ($scope.payment_method == 'in_app') {
            $scope.credit_id1 = 'com.ringhop.ringhop.'+credit;
            inAppPurchase
              .buy($scope.credit_id1)
              .then(function (data) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(data);
                // The consume() function should only be called after purchasing consumable products
                // otherwise, you should skip this step
                    var InAppcreditData = {};
                    InAppcreditData['responsetype'] = 'json';
                    InAppcreditData['credits'] =credit;
                    InAppcreditData['amount'] = price;
                    InAppcreditData['transactionId'] = data.transactionId;
                    InAppcreditData['receipt'] = data.receipt;
                    //console.log(JSON.stringify(InAppcreditData));
                    // $('.ui-loader').show();
                    var responsePromise = $http.post( BASE_URL+"upgradeinapp", JSON.stringify( InAppcreditData ) );
                    responsePromise.success( function( data, status, headers, config ) {
                        $('.ui-loader').hide();
                        console.log(JSON.stringify(data));
                        $scope.creditInfo = data.account_msg;
                        window.plugins.nativepagetransitions.slide( {
                            "direction": 'left',
                            "href" : '#/home/creditscomplete/'+$stateParams.originatrId+'/'+nameOfPage
                        } );
                    } );
                    responsePromise.error( function ( data, status, headers, config ) {
                        $('.ui-loader').hide();
                        console.log( JSON.stringify( data ) );
                       // alert('server error');
                        if( navigator.connection.type == Connection.NONE ) {
                            checkConnection();
                        }
                    } );
                return inAppPurchase.consume(data.type, data.receipt, data.signature);
              })
              .then(function () {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log('consume done!');
              })
              .catch(function (err) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(err);
              });

        }else{
            var creditData = {};
            creditData['responsetype'] = 'json';
            creditData['credits'] = credit;
            creditData['userid'] = userid;
            creditData['phoneip'] = IPAddr;
            // console.log(JSON.stringify(creditData));
            $('.ui-loader').show();
            var responsePromise = $http.post( BASE_URL+"addcredits", JSON.stringify( creditData ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.ui-loader').hide();
                $('.phpdebugbar-openhandler-overlay').hide();
                console.log(JSON.stringify(data));

                if(data.status == 'error'){
                    $scope.errorMsg = data.message;
                    if( data.message == 'Redirect to upgrade as no credit card is on file.' ) {
                        $timeout(function() {
                            window.plugins.nativepagetransitions.slide( {
                                "direction": 'left',
                                "href" : '#/home/upgrade'
                            } );
                        }, 2000);

                    }
                }
                if( data.status == 'success' ) {
                    $scope.msg = data.message;
                    // console.log($stateParams.originatrId)
                    window.plugins.nativepagetransitions.slide( {
                        "direction": 'left',
                        "href" : '#/home/creditscomplete/'+$stateParams.originatrId+'/'+nameOfPage
                    } );
                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                $('.ui-loader').hide();
                $('.phpdebugbar-openhandler-overlay').hide();
                console.log( JSON.stringify( data ) );
               // alert('server error');
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        }
        
    };
});


//+++++++++++++++++++++++++++creditscomplete page controller+++++++++++++++++++++
mainApp.controller( "creditscompleteController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    // console.log($stateParams.originatrId);
    $scope.successLink = function(){
        console.log($rootScope.previousState);
        if( $rootScope.previousState == 'home.addcredits' ) {
            if( $stateParams.originatrId != 0 && $stateParams.namePage == 'video') {
                // console.log("complete credits");
                window.plugins.nativepagetransitions.slide( {
                    "direction": 'right',
                    "href" : "#/home/messages"
                    // "href" : '#/home/reply'+$stateParams.originatrId
                } );
            } else {
                window.plugins.nativepagetransitions.slide( {
                    "direction": 'right',
                    "href" : '#/home/settings'
                } );
            }
        }
        if( $rootScope.previousState == 'home.upgrade' || $rootScope.previousState == 'home.updatepayment' ) {
            window.plugins.nativepagetransitions.slide( {
                "direction": 'right',
                "href" : '#/home/affter_login'
            } );
        }
        if($stateParams.namePage == 'InAppPurchasePayment'){
            window.plugins.nativepagetransitions.slide( {
                "direction": 'right',
                "href" : '#/home/settings'
            } );
        }
    }
} );

//+++++++++++++++++++++++++++InAppPurchasePayment page controller+++++++++++++++++++++

// mainApp.controller( "paymentMethodController", function( $scope, $http, $state, $stateParams, $rootScope,$timeout ) {
//     console.log("InAppPurchase");
//     $scope.showCreditsDropdown = false;
//     $scope.InApp_credits = [
//         { id:'0', value:'Choose Credits', price:'$0'},
//         { id:'10', value:'10 Credits', price:'$9.99'},
//         { id:'20', value:'20 Credits', price:'$19.99'},
//         { id:'40', value:'40 Credits', price:'$39.99' },
//         { id:'60', value:'60 Credits', price:'$99.99'}
//     ];
//     $scope.creditsCode = $scope.InApp_credits[0];
//     console.log( $scope.creditsCode.id);
//     if( $scope.creditsCode.id == '0'){
//         $('#credits').css ( {"padding-left":"35px"});
//     }
//     $scope.buyCreditsOnchng = function(item_id){
//         if(item_id == '0'){
//             $('#credits').css ( {"padding-left":"35px"});
//         }else{
//             $('#credits').css ( {"padding-left":"50px"});
//         }
//     };
//     $scope.creditCard_payment = function(){
//         console.log("creditCard_payment");
//         window.plugins.nativepagetransitions.slide({
//             "href" : "#/home/updatepayment"
//         });
//     };
//     $scope.apple_payment = function(){
//         $scope.showCreditsDropdown = true;
//         console.log("apple_payment");
//     };
//     var productIds = ['com.ringhop.ringhop.10','com.ringhop.ringhop.20','com.ringhop.ringhop.40','com.ringhop.ringhop.60'];
//     inAppPurchase
//       .getProducts(productIds)
//       .then(function (products) {
//         $scope.products = products;
//         console.log($scope.products);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//     $scope.buyCreditschng = function(item,item_price){
//         $('.phpdebugbar-openhandler-overlay').show();
//         $('.ui-loader').show();
//         // $timeout(function(){
//         //   $('.ui-loader').hide();
//         //   $('.phpdebugbar-openhandler-overlay').hide();
//         // }, 2300);
//         console.log(item);
//         $scope.credit_id = item;
//         $scope.product_amt = item_price;
//         $scope.credit_id1 = 'com.ringhop.ringhop.'+item;
//         // if ($scope.credit_id == '10') {
//         //     $scope.product_amt = $scope.products[0].price;
//         // }else if ($scope.credit_id == '20') {
//         //     $scope.product_amt = $scope.products[1].price;
//         // }else if ($scope.credit_id == '40') {
//         //     $scope.product_amt = $scope.products[2].price;
//         // }else if ($scope.credit_id == '60') {
//         //     $scope.product_amt = $scope.products[3].price;
//         // }
//         console.log($scope.product_amt);
//         inAppPurchase
//           .buy($scope.credit_id1)
//           .then(function (data) {
//             $('.phpdebugbar-openhandler-overlay').hide();
//             $('.ui-loader').hide();
//             $scope.showCreditsDropdown = false;
//             console.log(data);
//             $scope.page_name = 'InAppPurchasePayment';
//             $scope.id1 = '0';
//             // The consume() function should only be called after purchasing consumable products
//             // otherwise, you should skip this step
//                 var InAppcreditData = {};
//                 InAppcreditData['responsetype'] = 'json';
//                 InAppcreditData['credits'] = $scope.credit_id;
//                 InAppcreditData['amount'] = $scope.product_amt;
//                 InAppcreditData['transactionId'] = data.transactionId;
//                 InAppcreditData['receipt'] = data.receipt;
//                 console.log(JSON.stringify(InAppcreditData));
//                 // $('.ui-loader').show();
//                 var responsePromise = $http.post( BASE_URL+"upgradeinapp", JSON.stringify( InAppcreditData ) );
//                 responsePromise.success( function( data, status, headers, config ) {
//                     $('.ui-loader').hide();
//                     console.log(JSON.stringify(data));
//                     window.plugins.nativepagetransitions.slide({
//                         "href" : "#/home/creditscomplete/"+$scope.id1+'/'+$scope.page_name
//                     });
//                 } );
//                 responsePromise.error( function ( data, status, headers, config ) {
//                     $('.ui-loader').hide();
//                     console.log( JSON.stringify( data ) );
//                    // alert('server error');
//                     if( navigator.connection.type == Connection.NONE ) {
//                         checkConnection();
//                     }
//                 } );
//             return inAppPurchase.consume(data.type, data.receipt, data.signature);
//           })
//           .then(function () {
//             $scope.showCreditsDropdown = false;
//             console.log();
//             $('.phpdebugbar-openhandler-overlay').hide();
//             $('.ui-loader').hide();
//             console.log('consume done!');
//           })
//           .catch(function (err) {
//             $('.phpdebugbar-openhandler-overlay').hide();
//             $('.ui-loader').hide();
//             console.log(err);
//           });
//     };
// } );

//++++++++++++++++++++++++++++++++videocallAccept Controller+++++++++++++++++++++++++++++++++++++++//

mainApp.controller("videocallAcceptController", function( $scope, $filter, $http, $state, $stateParams, $timeout, $rootScope, constantData, GenerateRandomNo ) {
    // console.log("accept or reject");

    var receiveAftrNotiData = localStorage.getItem("caller_Data");
    var afterNoti = JSON.parse( receiveAftrNotiData );
    var audio = document.getElementById("audio1");
    audio.play();
    // console.log(afterNoti);
    $scope.showNamedata = afterNoti.u_name;
    $scope.IdReceiver = afterNoti.receiverid;
    $scope.Call_Id = afterNoti.CallId;
    var currDate = new Date();
    $scope.newCurrDate = $filter('date')(currDate,'yyyy-MM-dd HH:mm:ss');
    // $scope.Token = afterNoti.token;
    var token_random = localStorage.getItem("Random_token");
    var profileImageUrl = afterNoti.image;
    var image = $('#profile_pic');
    image.css('background-image', 'url(' + profileImageUrl +')');
    var data = '';
    var userid = afterNoti.userId;
    $scope.callAccept = function(){
        $state.go('home.videoCalling',{receive_data:data})
       // window.plugins.nativepagetransitions.slide( {
       //      "direction": 'left',
       //      "href" : "#/home/videoCalling/"+ data
       // } );  
    };

    $scope.callReject = function(){
        audio.pause();
        var callerNotificationData = {};
        callerNotificationData['responsetype'] = 'json';
        callerNotificationData['receiver_id'] = $scope.IdReceiver;
        callerNotificationData['originator_id'] = userid;
        callerNotificationData['call_id'] = $scope.Call_Id;  
        callerNotificationData['event'] = 'pro_rejected';
        callerNotificationData['cur_time'] = $scope.newCurrDate;
        // callerNotificationData['call_cost'] = '0.00';
        console.log(JSON.stringify(callerNotificationData));
        var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( callerNotificationData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log(data);
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            if( navigator.connection.type == Connection.NONE ) {
                checkConnection();
            }
        } );
        window.plugins.nativepagetransitions.slide( {
            "href" : "#/home/affter_login"
        } );

     };
     
});
//+++++++++++++++++++++++++++video calling page controller+++++++++++++++++++++

mainApp.controller("videoCallingController", function( $scope, $http,  $filter,  $state, $stateParams, $timeout, $rootScope, constantData, GenerateRandomNo ) {
        $scope.networkPopup = false;
        $scope.time_out = '';
        // console.log("videoCallingController");
        // $http({
        //     url : 'https://api.opentok.com/session/create',
        //     method : 'POST',
        //     async : true,
        //     crossDomain : true,
        //     headers : { 'Accept' : 'application/json' , 'x-tb-partner-auth': '45598312:cf6f43cc8bef8070ec86be37183aa550e6981a74', 'p2p.preference':'enabled'},
        // }).success(function(data) {
        //    alert('succ');
        //    console.log(data)
        //    console.log(data[0].partner_id);
        //    console.log(data[0].session_id);
        //     var secondsInDay = 86400;
        //   // Credentials
        //   var apiKey = data[0].partner_id;
        //   var secret = 'cf6f43cc8bef8070ec86be37183aa550e6981a74';
        //   var sessionId = data[0].session_id;
        //   // Token Params
        //   var timeNow = Math.floor(Date.now()/1000);
        //   var expire = timeNow+secondsInDay;
        //   var role = "publisher";
        //    //var data = "First";

        //   // alert("check");
        //   // var role = "subscriber";
        //   var data = "Second";
        //   TB.setLogLevel(TB.DEBUG);
        //   // Calculation
        //   data = escape(data);
        //   console.log("data:" + data);
        //   // alert("data:" + data);
        //   var rand = Math.floor(Math.random()*999999);
        //   var dataString =  "session_id="+sessionId+"&create_time="+timeNow+"&expire_time="+expire+"&role="+role+"&connection_data="+data+"&nonce="+rand;
        //   console.log("datastring:" + dataString);
        //   // alert("datastring:" + dataString);
        //   // Encryption
        //   var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, secret);
        //   // alert(hmac);
        //   hmac.update( dataString );
        //   hash = hmac.finalize();
        //   // alert("hash:" + hash);
        //   console.log("hash:" + hash);
        //   preCoded = "partner_id="+apiKey+"&sig="+hash+":"+dataString;
        //   console.log("precode:" + preCoded);
        //   // alert("precode:" + preCoded)
        //   var token = "T1=="+$.base64.encode( preCoded )
        //   console.log("token:" + token);
        //   alert("token:" + token);
        //   }).error(function(error){
        //       alert('error')
        //       console.log(error);
        //     });
        // var calleeData = JSON.parse($stateParams.receive_data);
        var currDate = new Date();
        $scope.newCurrDate = $filter('date')(currDate,'yyyy-MM-dd HH:mm:ss');
        // console.log($scope.newCurrDate);
        var flag = 0;
        var apiKey = '45606972';
        if($stateParams.receive_data == ''){
            // console.log($stateParams.receive_data);
            $scope.showEndVideoDiv = false;
            flag = 1;
            var receiveAftrNotiData = localStorage.getItem("caller_Data");
            var afterNoti = JSON.parse( receiveAftrNotiData );
            // console.log(afterNoti);
            // var receiverCallId = afterNoti.CallId;
            $scope.ReceiveCallId2 = afterNoti.CallId;
            // console.log(receiverCallId);
            // console.log($scope.ReceiveCallId1);
            $scope.IdReceiver = afterNoti.receiverid;
            $scope.showNamedata = afterNoti.u_name;
            var userid = afterNoti.userId;
            $scope.user_id = userid;
            var profileImageUrl = afterNoti.image;
            var sessonId = afterNoti.sessionId;
            var sessonToken = afterNoti.sessionToken; 
            var callPerMinute = 0;
            var userBalance = 0;
            hello.initializeVideoCalling(apiKey, sessonId, sessonToken, callPerMinute, userBalance, profileImageUrl, onSuccess, onFail);

        }
        else{
        flag=0;
        var sessonId = '2_MX40NTYwNjk3Mn5-MTQ2NTk2ODc4MjUzNX5adm0vb2JzL3lPZDlkWlN5U0t1NXN5NVd-fg';
        var sessonToken = 'T1==cGFydG5lcl9pZD00NTYwNjk3MiZzaWc9YTFmNDU3ZDE5YzQ5YzEwYmRmZjc2YjM4YTlhNzNiNWIwYjE5NjNlZDpzZXNzaW9uX2lkPTJfTVg0ME5UWXdOamszTW41LU1UUTJOVGsyT0RjNE1qVXpOWDVhZG0wdmIySnpMM2xQWkRsa1dsTjVVMHQxTlhONU5WZC1mZyZjcmVhdGVfdGltZT0xNDY1OTcwNzk1Jm5vbmNlPTAuNTg5Mzk5ODE5MDI5NDk1MSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNDY4NTYyNzk0';
        var callPerMinute = JSON.parse($stateParams.receive_data).videoRate;
        var userBalance = JSON.parse($stateParams.receive_data).bal;
        var imageUrl = localStorage.getItem("receiverImage_data");
        var connectionflag = false;
        $scope.showEndVideoDiv = false;
        // console.log(JSON.parse($stateParams.receive_data));
        $scope.showNamedata = JSON.parse($stateParams.receive_data).username;
        $scope.IdReceiver = JSON.parse($stateParams.receive_data).origId;
        $scope.PageInfo = JSON.parse($stateParams.receive_data).page_name;
        $scope.pageState = $rootScope.previousState;

        // console.log($scope.showNamedata);
        // console.log($scope.IdReceiver);
        $('#wrapper').css ( {"background":"#E9E9E9" });
        var channel_secret = GenerateRandomNo.randomString(8, '0123456789abcdef');
        // console.log(channel_secret);
        localStorage.setItem("Random_token",channel_secret);
        var user_detail = localStorage.getItem( "userDetail" );
        var userid = JSON.parse( user_detail ).data.id;
        var detailsdata = {};
        detailsdata['responsetype'] = 'json';
        detailsdata['receiver_id'] = $scope.IdReceiver;
        detailsdata['originator_id'] = userid;
        detailsdata['event']='init';
        detailsdata['cur_time'] = $scope.newCurrDate;
        // console.log(JSON.stringify(detailsdata));
        var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdata ) );
        responsePromise.success( function( data, status, headers, config ) {
            // console.log(data);
            console.log( JSON.stringify( data ) );
                // console.log(imageUrl);
                var profileImageUrl = imageUrl;
                // console.log(profileImageUrl);
               localStorage.setItem("CallId",data.data.callId);
               hello.initializeVideoCalling(apiKey, sessonId, sessonToken, callPerMinute, userBalance, profileImageUrl, onSuccess, onFail);
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            console.log( JSON.stringify( data ) );
            $scope.networkPopup = true;
            // $('#overlay').show();
            if( navigator.connection.type == Connection.NONE ) {
                console.log("error");
                checkConnection();
            }
        } );
    }
            
    function onSuccess(successmsg) {
        console.log(successmsg);
        console.log(JSON.stringify(successmsg));
        console.log(successmsg.data);
        var token_random = localStorage.getItem("Random_token");
        var receiverCallId = localStorage.getItem("CallId");
        $scope.ReceiveCallId1 = receiverCallId;
        function Endfunc(){
            var detailsdataAtEnd = {};
            detailsdataAtEnd['responsetype'] = 'json';
            detailsdataAtEnd['receiver_id'] = $scope.IdReceiver;
            detailsdataAtEnd['originator_id'] = userid;
            detailsdataAtEnd['call_id'] = $scope.ReceiveCallId1;
            detailsdataAtEnd['event'] = 'ended';
            detailsdataAtEnd['cur_time'] = $scope.newCurrDate;
            console.log(JSON.stringify(detailsdataAtEnd));
            var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdataAtEnd ) );
            responsePromise.success( function( data, status, headers, config ) {
                // console.log(data);
                $scope.totaldata = data.data;
                $scope.costOfCall = data.data.call_cost;
                $scope.durationOfCall = data.data.call_duration;
                $scope.identifier = 'sender';
                $('.ui-loader').hide();
                // console.log($scope.IdReceiver);
                window.plugins.nativepagetransitions.slide( {
                    "direction": 'right',
                    "href" : '#/home/videocallEnd/'+$scope.costOfCall+'/'+$scope.durationOfCall+'/'+$scope.showNamedata+'/'+$scope.IdReceiver+'/'+$scope.identifier+'/'+$scope.PageInfo
                } );
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                Endfunc();
                //$scope.networkPopup = true;
                // $('#overlay').show();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        }
        function startFunc(){
            var detailsdataAtStart = {};
            detailsdataAtStart['responsetype'] = 'json';
            detailsdataAtStart['receiver_id'] = $scope.IdReceiver;
            detailsdataAtStart['originator_id'] = userid;
            if(flag == 1){
            detailsdataAtStart['call_id'] = $scope.ReceiveCallId2;
            }else{
            detailsdataAtStart['call_id'] = $scope.ReceiveCallId1;
            }
            detailsdataAtStart['event']= 'started';
            detailsdataAtStart['cur_time'] = $scope.newCurrDate;
            // console.log(JSON.stringify(detailsdataAtStart));
            var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdataAtStart ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log(data);
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                startFunc();
                // $scope.networkPopup = true;
                // $('#overlay').show();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        }
        function initFunc(){
            var notificationData = {};
            notificationData['receiver_id'] = $scope.IdReceiver;
            notificationData['session_id'] = sessonId;
            notificationData['video_token'] = sessonToken;
            notificationData['call_id'] = $scope.ReceiveCallId1;
            var responsePromise = $http.post( BASE_URL+"sendvideonoti", JSON.stringify( notificationData ) );
                responsePromise.success( function( data, status, headers, config ) {
                    console.log(data);
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                initFunc();
                // $scope.networkPopup = true;
                // $('#overlay').show();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        }
        function successfullyDisconnect(){
             console.log("callPerMinute>>>" + callPerMinute);
             var user_detail = localStorage.getItem( "userDetail" );
             var userid = JSON.parse( user_detail ).data.id;
            //alert(flag+".."+userid);
            if(flag == 0){
                $scope.user_id = userid;
            }
            //alert($scope.IdReceiver+">>"+ $scope.user_id);
            var detailsdataAtEnd = {};
            detailsdataAtEnd['responsetype'] = 'json';
            detailsdataAtEnd['receiver_id'] = $scope.IdReceiver;
            detailsdataAtEnd['originator_id'] = $scope.user_id;
            detailsdataAtEnd['call_id'] = $scope.ReceiveCallId1;
            detailsdataAtEnd['event'] = 'user_rejected';
            detailsdataAtEnd['cur_time'] = $scope.newCurrDate;
            console.log(JSON.stringify(detailsdataAtEnd));
            var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdataAtEnd ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log(data);
                // alert(JSON.stringify(data));
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                successfullyDisconnect();
                //successfullyDisconnect();
                // $scope.networkPopup = true;
                // $('#overlay').show();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        }
        if(successmsg.data == 'ReceiverInitializationCompleted'){
            // console.log("notified");
            $scope.time_out = setTimeout( TimeoutFunction, 40000);
            $scope.receverTimeout = true;
        }
        if(successmsg.data == 'Initialization completed !!'){
            // console.log("notified");
            $scope.time_out = setTimeout( TimeoutFunction, 40000);
            initFunc();
            // var notificationData = {};
            // notificationData['receiver_id'] = $scope.IdReceiver;
            // notificationData['session_id'] = sessonId;
            // notificationData['video_token'] = sessonToken;
            // notificationData['call_id'] = $scope.ReceiveCallId1;
            // var responsePromise = $http.post( BASE_URL+"sendvideonoti", JSON.stringify( notificationData ) );
            //     responsePromise.success( function( data, status, headers, config ) {
            //         console.log(data);
            // } );
            // responsePromise.error( function ( data, status, headers, config ) {
            //     console.log( JSON.stringify( data ) );
            //     // $scope.networkPopup = true;
            //     // $('#overlay').show();
            //     if( navigator.connection.type == Connection.NONE ) {
            //         checkConnection();
            //     }
            // } );
            
        }
        if(successmsg.data == 'connectionCreated' ){
            clearTimeout($scope.time_out);
        }
        if(successmsg.data == 'CallStarted'){
            clearTimeout($scope.time_out);
            startFunc();
            //console.log($scope.ReceiveCallId2);
            // var detailsdataAtStart = {};
            // detailsdataAtStart['responsetype'] = 'json';
            // detailsdataAtStart['receiver_id'] = $scope.IdReceiver;
            // detailsdataAtStart['originator_id'] = userid;
            // if(flag == 1){
            // detailsdataAtStart['call_id'] = $scope.ReceiveCallId2;
            // }else{
            // detailsdataAtStart['call_id'] = $scope.ReceiveCallId1;
            // }
            // detailsdataAtStart['event']= 'started';
            // detailsdataAtStart['cur_time'] = $scope.newCurrDate;
            // // console.log(JSON.stringify(detailsdataAtStart));
            // var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdataAtStart ) );
            // responsePromise.success( function( data, status, headers, config ) {
            //     console.log(data);
            // } );
            // responsePromise.error( function ( data, status, headers, config ) {
            //     console.log( JSON.stringify( data ) );
            //     // $scope.networkPopup = true;
            //     // $('#overlay').show();
            //     if( navigator.connection.type == Connection.NONE ) {
            //         checkConnection();
            //     }
            // } );
        }else if (successmsg.data == " ") {
            console.log("clear");
            clearTimeout($scope.time_out);
        } else if (successmsg.data == 'receiverMissedCall') {
            console.log("receiverMissedCall");
            clearTimeout($scope.time_out);
            window.plugins.nativepagetransitions.slide( {
                    "direction": 'left',
                    "href" : "#/home/recentcalls"
            } );
        }
         else if (successmsg.data == 'missedCall') {
            clearTimeout($scope.time_out);
            successfullyDisconnect();
            // console.log("enter");
            //     var detailsdataAtEnd = {};
            //     detailsdataAtEnd['responsetype'] = 'json';
            //     detailsdataAtEnd['receiver_id'] = $scope.IdReceiver;
            //     detailsdataAtEnd['originator_id'] = userid;
            //     detailsdataAtEnd['call_id'] = $scope.ReceiveCallId1;
            //     detailsdataAtEnd['event'] = 'user_rejected';
            //     detailsdataAtEnd['cur_time'] = $scope.newCurrDate;
            //     console.log(JSON.stringify(detailsdataAtEnd));
            //     var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdataAtEnd ) );
            //     responsePromise.success( function( data, status, headers, config ) {
            //         console.log(data);
            //     } );
            //     responsePromise.error( function ( data, status, headers, config ) {
            //         console.log( JSON.stringify( data ) );
            //         $scope.networkPopup = true;
            //         // $('#overlay').show();
            //         if( navigator.connection.type == Connection.NONE ) {
            //             checkConnection();
            //         }
            //     } );
            }
            else if (successmsg.data == 'proRejectsCall') {
                console.log($scope.time_out);
            clearTimeout($scope.time_out);
            // console.log($rootScope.previousState);
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : "#/home/videoProReject/"+$scope.showNamedata+'/'+$scope.pageState+'/'+$scope.IdReceiver
            } );

        }else if (successmsg.data == 'callEndedByUser') {
            clearTimeout($scope.time_out);
            console.log("user call end");
            console.log("callPerMinute>>>" + callPerMinute);
            successfullyDisconnect();
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : "#/home/recentcalls"
            } );

        }
        else if(successmsg.data == 'Successfully disconnected !!' ){
            clearTimeout($scope.time_out);
            console.log(flag);
            console.log("callPerMinute>>>" + callPerMinute);
            // successfullyDisconnect();
                // var detailsdataAtEnd = {};
                // detailsdataAtEnd['responsetype'] = 'json';
                // detailsdataAtEnd['receiver_id'] = $scope.IdReceiver;
                // detailsdataAtEnd['originator_id'] = userid;
                // detailsdataAtEnd['call_id'] = $scope.ReceiveCallId1;
                // detailsdataAtEnd['event'] = 'user_rejected';
                // detailsdataAtEnd['cur_time'] = $scope.newCurrDate;
                // console.log(JSON.stringify(detailsdataAtEnd));
                // var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdataAtEnd ) );
                // responsePromise.success( function( data, status, headers, config ) {
                //     console.log(data);
                // } );
                // responsePromise.error( function ( data, status, headers, config ) {
                //     console.log( JSON.stringify( data ) );
                //     $scope.networkPopup = true;
                //     // $('#overlay').show();
                //     if( navigator.connection.type == Connection.NONE ) {
                //         checkConnection();
                //     }
                // } );
                        window.plugins.nativepagetransitions.slide( {
                                "direction": 'left',
                                "href" : "#/home/recentcalls"
                        } );
                    // if ($rootScope.previousState == 'home.recentcalls') {
                    //     window.plugins.nativepagetransitions.slide( {
                    //             "direction": 'left',
                    //             "href" : "#/home/recentcalls"
                    //     } );
                    // }else{
                    //     window.plugins.nativepagetransitions.slide( {
                    //             "direction": 'left',
                    //             "href" : "#/home/reply"+$scope.IdReceiver
                    //     } );
                    // }
                //}
            }else if(successmsg.data == 'CallEnded'){
                clearTimeout($scope.time_out);
                console.log("callPerMinute>>>" + callPerMinute);
                // console.log(callPerMinute);
                $('.ui-loader').show();
                    $timeout(function(){
                      $('.ui-loader').hide();
                    }, 2500);
                if( callPerMinute !== 0 ){
                    Endfunc();
                    // var detailsdataAtEnd = {};
                    // detailsdataAtEnd['responsetype'] = 'json';
                    // detailsdataAtEnd['receiver_id'] = $scope.IdReceiver;
                    // detailsdataAtEnd['originator_id'] = userid;
                    // detailsdataAtEnd['call_id'] = $scope.ReceiveCallId1;
                    // detailsdataAtEnd['event'] = 'ended';
                    // detailsdataAtEnd['cur_time'] = $scope.newCurrDate;
                    // console.log(JSON.stringify(detailsdataAtEnd));
                    // var responsePromise = $http.post( BASE_URL+"setvideocalldetails", JSON.stringify( detailsdataAtEnd ) );
                    // responsePromise.success( function( data, status, headers, config ) {
                    //     // console.log(data);
                    //     $scope.totaldata = data.data;
                    //     $scope.costOfCall = data.data.call_cost;
                    //     $scope.durationOfCall = data.data.call_duration;
                    //     $scope.identifier = 'sender';
                    //     $('.ui-loader').hide();
                    //     // console.log($scope.IdReceiver);
                    //     window.plugins.nativepagetransitions.slide( {
                    //         "direction": 'right',
                    //         "href" : '#/home/videocallEnd/'+$scope.costOfCall+'/'+$scope.durationOfCall+'/'+$scope.showNamedata+'/'+$scope.IdReceiver+'/'+$scope.identifier+'/'+$scope.PageInfo
                    //     } );
                    // } );
                    // responsePromise.error( function ( data, status, headers, config ) {
                    //     console.log( JSON.stringify( data ) );
                    //     // $scope.networkPopup = true;
                    //     // $('#overlay').show();
                    //     funcC();
                    //     if( navigator.connection.type == Connection.NONE ) {
                    //         checkConnection();
                    //     }
                    // } );
                }
                
                // if(flag == 0){
                //     console.log("flag");
                //     $scope.showEndVideoDiv = true;
                //     $('#wrapper').css ( {"background":"#424242" }); 
                //     console.log($scope.disConnectData.callCost);
                //     $scope.showCall_time = $scope.disConnectData.callTime ;
                //     $scope.showCall_bal = $scope.disConnectData.callCost;
                // }else{
                //     console.log("flag1");
                //     window.plugins.nativepagetransitions.slide( {
                //             "href" : "#/home/affter_login"
                //         } );
                // }
            }
            // else if (successmsg.data == 'Subscriber didFailWithError') {
            //     connectionflag == true;
            //     alert("FailWithError");
            // }
         }
        function onFail(errormsg) {
            console.log("Failed" + JSON.stringify(errormsg));
            clearTimeout($scope.time_out);
            $scope.errMsg = errormsg.data.error;
            $scope.ntwrkType = errormsg.data.networkType;
            console.log($scope.errMsg, $scope.ntwrkType , flag);
            var errorCallLog = {};
            errorCallLog['responsetype'] = 'json';
            errorCallLog['networkType'] = $scope.ntwrkType;
            errorCallLog['errorMessage'] = $scope.errMsg ;
            errorCallLog['userid'] = userid ;
            if(flag == 1){
                errorCallLog['initiator'] = 'receiver';
            }else{
                errorCallLog['initiator'] = 'sender';
            }
            console.log(JSON.stringify( errorCallLog ));
            var responsePromise = $http.post( BASE_URL+"videoerrorlog", JSON.stringify( errorCallLog ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log(data);
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                // successfullyDisconnect();
                // $scope.networkPopup = true;
                // $('#overlay').show();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        }
    function TimeoutFunction() {
        // console.log("Hello");
        if ($scope.receverTimeout ==  true) {
            hello.endCalling("receiverMissedCall");
        }else{
            hello.endCalling("missedCall");
        }
        
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : "#/home/videoProReject/"+$scope.showNamedata+'/'+$scope.pageState+'/'+$scope.IdReceiver
        } );
    }
    $scope.closeNetworkPopup = function () {
        $('#overlay').hide();
         $scope.networkPopup = false;
         window.plugins.nativepagetransitions.slide( {
            "direction": 'right',
            "href" : window.history.back()
        } );

    };
    $scope.goBackAgain = function(){
        $('#overlay').hide();
        console.log("network");
        if( $rootScope.currentState == 'home.videoCalling' ) {
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : "#/home/messages"
            } );
         }
    };

});


//++++++++++++++++++++++++++++video call end controller +++++++++++++++++++++++++++++++++++//

mainApp.controller( "videocallEndController", function( $scope, $http, $timeout, $state, $stateParams, $rootScope, $location, $interval, $filter  ) {
     // console.log("end controller");
        $scope.showCall_time = $stateParams.totalcalltime;
        if($stateParams.check_identity == 'sender'){
            $scope.receiverShowdiv = false;
            $scope.showCall_bal = $stateParams.totalcallcost;  
         }else{
            $scope.receiverShowdiv = true;
            $scope.showCall_bal = $stateParams.totalcallcost;
         }
        $scope.showUserName = $stateParams.userName;
        $scope.receiverId1 = $stateParams.idReceive;
        $scope.identifierCheck = $stateParams.check_identity;
        $scope.pagedetail = $stateParams.infoOfpage;
        console.log($scope.receiverId1);
        $scope.backToreply = function(){
            console.log("back");
            console.log($rootScope.previousState , $scope.identifierCheck);
                // if( $rootScope.previousState == 'home.videoCalling' ) {
                //     console.log("2");
                //     if($scope.identifierCheck == 'sender'){
                //         console.log("3");
                //         if ($scope.pagedetail == 'reply') {
                //             console.log("reply");
                //               window.plugins.nativepagetransitions.slide( {
                //                 "direction": 'left',
                //                 "href" : "#/home/reply"+$scope.receiverId1
                //             } ); 
                //         }else if($scope.pagedetail == 'contacts'){
                //             window.plugins.nativepagetransitions.slide({
                //                 "href" : "#/home/contacts"
                //             });
                //         }
                //         else if($scope.pagedetail == 'callerhistory'){
                //             console.log("others");
                //                 window.plugins.nativepagetransitions.slide({
                //                 "href" : "#/home/callerhistory"+$scope.receiverId1
                //             });
                //         }else{
                //             window.plugins.nativepagetransitions.slide( {
                //                 "href" : "#/home/affter_login"
                //             } );
                //         }
                //       }else{
                        console.log("receiver end");
                        window.plugins.nativepagetransitions.slide({
                            "direction": 'left',
                            "href" : "#/home/affter_login"
                        });
                 //      }
                 // }
            };


});

//+++++++++++++++++++++++++++videocallMissed page controller+++++++++++++++++++++

mainApp.controller( "videocallMissedController", function( $scope, $http, $timeout, $state, $stateParams, $rootScope, $location, $interval, $filter  ) {
     // console.log("end controller");
        $scope.showMissedName = $stateParams.user_name;
        $scope.idCallback = $stateParams.callBackid;
         $scope.callBackUser = function($event){
            $event.stopPropagation();
            var reply_detail = localStorage.getItem( "reply_data" );
            var replyData = JSON.parse( reply_detail ).data;
            $scope.replyChats1 = replyData;
            $scope.username1 = replyData.originator.displayname;
            console.log(replyData);
            console.log("strt");
            var videoData = {};
            videoData['responsetype'] = 'json';
            videoData['receiver'] = $scope.idCallback;
            // console.log(JSON.stringify(videoData));
            var responsePromise = $http.post( BASE_URL+"userdetails", JSON.stringify( videoData ) );
            responsePromise.success( function( data, status, headers, config ) {
            console.log(data);
                $scope.videoCallRate = data.data.video_call_rate;
                $scope.userBalance = data.data.originator_balance;
                $scope.reqBal = data.data.bal_req;
                localStorage.setItem("receiverImage_data",data.data.profile_image);
                var receiveData = JSON.stringify({'username':$scope.username1,'origId':$scope.idCallback,'videoRate':$scope.videoCallRate,'bal':$scope.userBalance,'page_name':''})
                if(data.data.originator_balance >= data.data.bal_req){
                    console.log(receiveData);
                       $state.go('home.videoCalling',{receive_data:receiveData})
                }else{
                    console.log("else condition");
                    window.plugins.nativepagetransitions.slide({
                        "href" : "#/home/videoCredits/"+$scope.username1+'/'+$scope.reqBal
                    });
                }
            });
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $scope.networkPopup = true;
                // $('#overlay').show();
                if( navigator.connection.type == Connection.NONE ) {
                    console.log("connection");
                    checkConnection();
                }
            });

         };
         $scope.callRejectback = function(){
            window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/affter_login"
                } );
         };


});

//+++++++++++++++++++++++++++video page controller+++++++++++++++++++++
mainApp.controller( "videoController", function( $scope, $http, $timeout, $state, $stateParams, $rootScope, $location, $interval, $filter  ) {
     // $scope.showCreditInfoDiv = true;
     // $scope.showEndVideoDiv = false;
     // $('#wrapper').css ( {"background":"#E9E9E9" });
     $('.phpdebugbar-openhandler-overlay').hide();
     var user_detail = localStorage.getItem( "userDetail" );
     var userid = JSON.parse( user_detail ).data.id;
     var page_name = 'video';
     $scope.diplayUsername = $stateParams.user_name;
     $scope.showReqBal = $stateParams.Bal_req;
        $scope.addCreditsforvideo = function(){
            window.plugins.nativepagetransitions.slide( {
                "direction": 'left',
                "href" : "#/home/addcredits/"+ userid+'/'+page_name
            } );
         };

});

//+++++++++++++++++++++++++++videoProReject page controller+++++++++++++++++++++

mainApp.controller( "videoProRejectController", function( $scope, $http, $timeout, $state, $stateParams, $rootScope, $location, $interval, $filter  ) {
     // $scope.showCreditInfoDiv = true;
     // $scope.showEndVideoDiv = false;
     // $('#wrapper').css ( {"background":"#E9E9E9" });
     var user_detail = localStorage.getItem( "userDetail" );
     var userid = JSON.parse( user_detail ).data.id;
     var page_name = 'video';
     $scope.diplayUsername = $stateParams.user_name;
     $scope.pro_name = $stateParams.user_name;
     $scope.previous_State = $stateParams.state_page;
     $scope.id2 = $stateParams.id_receiver1;
     console.log($scope.previous_State);
        $scope.goBack = function(){
            if ($scope.previous_State == 'home.recentcalls' || $scope.previous_State == 'home.videocallMissed') {
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/recentcalls"
                } );
             }else if($scope.previous_State == 'home.contacts'){
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/contacts"
                } );
             }else if($scope.previous_State == 'home.callerhistory'){
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/callerhistory"+$scope.id2
                } );
             }
             else{
                window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/messages"
                } );
             }
     };
     $scope.backButton2 = function(){
        window.plugins.nativepagetransitions.slide( {
                    "href" : "#/home/affter_login"
                } );
     };

});
//+++++++++++++++++++++++++++viewcredit page controller+++++++++++++++++++++
mainApp.controller( "viewcreditController", function( $scope, $http, $state, $stateParams, $rootScope ) {
    var viewcreditData = {};
    viewcreditData['responsetype'] = 'json';
    // console.log(JSON.stringify(viewcreditData));
    var responsePromise = $http.post( BASE_URL+"viewcredits", JSON.stringify( viewcreditData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log(data);
        $scope.creditInfo = data.message;
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if( navigator.connection.type == Connection.NONE ) {
            checkConnection();
        }
    } );
} );

//+++++++++++++++++++++++++++creditscomplete page controller+++++++++++++++++++++

mainApp.controller( "mylibrarycontroller", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $scope.slides2 = [
        { id:1, image: 'img/imgA.jpg', label: 'Image 01', odd:true }
    ];
    $scope.devheight = $( window ).height();
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.showNewimg = false;
    $scope.limit = 6;
    var pre_count = 1;
    var next_count = 1;
    var imgWidth,imgHeight;
    var imgObj = [];
    $scope.imgPopup = false;
    var libraryData = {};
    var imgDimensn = [];
    libraryData['responsetype'] = 'json';
    libraryData['page'] = 1;
    // console.log( JSON.stringify( libraryData ) );
    var responsePromise = $http.post( BASE_URL+"mylibrary", JSON.stringify( libraryData ) );
    responsePromise.success( function( data, status, headers, config ) {
        imgDimensn = [];
        console.log( JSON.stringify( data ) );
        $scope.libraries = data.data.myimages;
        $scope.limit = data.data.per_page;
        $scope.totalMessage = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        angular.forEach($scope.libraries , function(lib){
                    // console.log(lib);
                    $scope.isNew(lib);
                });

        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                $scope.noMessage = "No billing history available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});

            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
            $('#arrow').css ( {"opacity":"0.5" });
        }
        for ( var i = 0; i < $scope.libraries.length; i++ ) {
            // if( $scope.libraries[i].media_status == 'new' && $scope.libraries[i].charge_amount != '0.00'){
            //     //alert(i);
            //     continue;
            // }
            getMeta( $scope.libraries[i].image_big, i, function(width, height, index) {
                var imgid = index+1;
                var item = { hgt: height, wdt: width };
                imgDimensn.push(item);
            } );

        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
    } );

    $scope.prevBtn = function () {
        imgDimensn = [];
        next_count = next_count - 1;
        pre_count = next_count;
        // console.log(pre_count);
        if( $scope.currentPage == 1 ) {
            // console.log($scope.currentPage);
            $scope.prevDisabled = true;
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
            $('#arrow').css ( {"opacity":"0.5" });

        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            libraryData['page'] = pre_count;
            // console.log( JSON.stringify( libraryData ) );
            var responsePromise = $http.post( BASE_URL+"mylibrary", JSON.stringify( libraryData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $scope.libraries = '';
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.libraries = data.data.myimages;
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                angular.forEach($scope.libraries , function(lib){
                    // console.log(lib);
                    $scope.isNew(lib);
                });
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }
                for ( var i = 0; i < $scope.libraries.length; i++ ) {
                    // if( $scope.libraries[i].media_status == 'new' && $scope.libraries[i].charge_amount != '0.00'){
                    //     //alert(i);
                    //     continue;
                    // }
                    getMeta( $scope.libraries[i].image_big, i, function(width, height, index) {
                        var imgid = index+1;
                        var item = { hgt: height, wdt: width };
                        imgDimensn.push(item);
                    } );

                }
            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }
    };
    $scope.nextBtn = function () {
        $('#arrow').css ( {"opacity":"1" });
        imgDimensn = [];
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            libraryData['page'] = next_count;
            // console.log( JSON.stringify( libraryData ) );
            var responsePromise = $http.post( BASE_URL+"mylibrary", JSON.stringify( libraryData ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.libraries = '';
                $scope.limit = data.data.per_page;
                $scope.libraries = data.data.myimages;
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page;

                $scope.currentCount = $scope.currentPage * $scope.limit;
                angular.forEach($scope.libraries , function(lib){
                    // console.log(lib);
                    $scope.isNew(lib);
                });

                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }
                for ( var i = 0; i < $scope.libraries.length; i++ ) {
                    // if( $scope.libraries[i].media_status == 'new' && $scope.libraries[i].charge_amount != '0.00'){
                    //     //alert(i);
                    //     continue;
                    // }
                    getMeta( $scope.libraries[i].image_big, i, function(width, height, index) {
                        var imgid = index+1;
                        var item = { hgt: height, wdt: width };
                        imgDimensn.push(item);
                    } );

                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if( navigator.connection.type == Connection.NONE ) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $scope.nextDisabled = true;
        }
    };
    $scope.popupShow = false;

    $scope.openImage = function (image) {
        // console.log(JSON.stringify(imgDimensn));
        $scope.slides = [];
        for ( var i = 0; i < $scope.libraries.length; i++ ) {
            // console.log('i=>'+i);
            if( $scope.libraries[i].media_status == 'new' && $scope.libraries[i].charge_amount != '0.00' ) {
                // console.log('new'+ imgDimensn[i].hgt +'i:'+i);
                continue;
            }
            // console.log('purchased'+ imgDimensn[i].hgt +'i:'+i);
            var item = {
                'image': $scope.libraries[i].image_big,
                'description': $scope.libraries[i].charge_amount,
                'sender_id': $scope.libraries[i].originator_id,
                'sender_name': $scope.libraries[i].sender_name,
                'imgHgt': imgDimensn[i].hgt,
                'imgWdt':imgDimensn[i].wdt
            };
            // console.log(JSON.stringify(item));
            $scope.slides.push( item );
            //console.log($scope.slides);
        }
        // console.log( JSON.stringify( $scope.slides ) );
        function getSlide( target, style ) {
            var i = target.length;
            //$('#slider_bottom_name').html($scope.slides[i].username);
            return {
                id: (i + 1),
                label: 'slide #' + (i + 1),
                img: $scope.slides[i].image,
                charge: $scope.slides[i].description,
                sender_name: $scope.slides[i].sender_name,
                sender_id: $scope.slides[i].sender_id,
                imgHgt: $scope.slides[i].imgHgt,
                imgWdt: $scope.slides[i].imgWdt,
                odd: (i % 2 === 0)
            };
        }

        function addSlide( target, style, val_i ) {
            target.push( getSlide( target, style ) );
            if( target[ val_i ].img == image) {
                $scope.carouselIndex2 = target[ val_i ].id-1;
            }
        };
        //$scope.carouselIndex2 = 0;
        function addSlides( target, style, qty ) {
            for ( var i = 0; i < qty; i++ ) {
                addSlide( target, style, i );
            }
        }
        $scope.slides2 = [];
        addSlides( $scope.slides2, 'sports', $scope.slides.length );
        $scope.popupShow = true;
        //console.log($scope.slides2);
    };
    $scope.isNew = function( lib ){
        // console.log("hello");
        if(lib.media_status == 'new' && lib.charge_amount != '0.00'){
            console.log(lib.media_status);
            $scope.showNewimg = false;
        }
        else if((lib.media_status == 'purchased') || (lib.media_status == 'new' && lib.charge_amount == '0.00')) {
            // console.log(lib.media_status);
            $scope.showNewimg = true;
        }
        // else{
        //     $scope.showNewimg = false;
        // }

    };


    $scope.closePopup = function () {
        $scope.popupShow = false;
    };
    $scope.profileLink = function (userid,uname) {
        window.plugins.nativepagetransitions.slide( {
            "direction": "left",
            "href" : "#/home/profile"+userid+"/"+uname
        } );
    };
    function getMeta(url, index, callback) {
        var img = new Image();
        img.src = url;
        img.onload = function() { callback(this.width, this.height, index); }
    }

    $scope.buyNow = function(media_id, model_id, displayname) {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'right',
            "href" : '#/home/paidphoto/'+media_id+'/'+model_id+'/'+displayname
        } );
    };

    // $scope.openImage = function (image) {
    //     //alert(image);
    //     img.src = image;
    //     img.onload = function() {
    //         var imgWidth = this.width;
    //         $('#imgPopup').width(imgWidth);
    //     };
    //     $('#overlay').show();
    //     $scope.imgPopup = true;
    //     $scope.bigImg = image;
    // };
    // $scope.closeImage = function () {
    //     $('#overlay').hide();
    //     $scope.imgPopup = false;
    // };
} );
//+++++++++++++++++++++++++++creditscomplete page controller+++++++++++++++++++++

mainApp.controller( "billinghistorycontroller", function( $scope, $http, $state, $stateParams, $rootScope ) {
    $scope.paginateSection = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.noMessageDiv = false;
    $scope.limit = 4;
    var pre_count = 1;
    var next_count = 1;
    var historyData = {};
    historyData['responsetype'] = 'json';
    historyData['page'] = 1;
    // console.log( JSON.stringify( historyData ) );
    var responsePromise = $http.post( BASE_URL+"billinghistory", JSON.stringify( historyData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.billinghistory = data.data.billings;
        // angular.forEach($scope.billinghistory, function(history , filterKey) {
        //     history.created_at = $scope.convertTZ( history.created_at, data.data.timezone );
        // } );
        $scope.limit = data.data.per_page;
        $scope.totalMessage = data.data.total_count;
        $scope.currentPage = data.data.current_page;
        $scope.currentCount = $scope.currentPage * $scope.limit;//total messages till current page
        if ( $scope.totalMessage <= $scope.currentCount ) {
            $scope.paginateSection = false;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $('#arrow').css ( {"opacity":"0.5" });
            $('#arrowNext').css ( {"opacity":"0.5" });
            $scope.nextDisabled = true;
            $scope.prevDisabled = true;
            //alert($scope.totalMessage);
            if( $scope.totalMessage == 0 ) {
                $scope.noMessageDiv = true;
                $scope.noMessage = "No billing history available.";
            } else {
                $scope.noMessageDiv = false;
            }

        }  else {
            $scope.paginateSection = true;
            $("#prevBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.nextDisabled = false;
            $scope.prevDisabled = true;
        }
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $('.phpdebugbar-openhandler-overlay').hide();
        $('.ui-loader').hide();
    } );
    $scope.prevBtn = function () {
        $("#arrowNext").css({"opacity":"1"});
        next_count = next_count - 1;
        pre_count = next_count;
        if( $scope.currentPage == 1 ) {
            $( '#prevBtn' ).css( { "background":"#dedede", "border-color":"#dedede", "color":"#acacac" } );
            $('#arrow').css ( {"opacity":"0.5" });
            $scope.prevDisabled = true;
        } else {
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            historyData['page'] = pre_count;
            console.log( JSON.stringify( historyData ) );
            var responsePromise = $http.post( BASE_URL+"billinghistory", JSON.stringify( historyData ) );
            responsePromise.success( function( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                $scope.limit = data.data.per_page;
                $scope.billinghistory = data.data.billings;
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if( $scope.currentPage == 1 ) {
                    if( $scope.totalMessage > $scope.currentCount ) {
                        $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                        $scope.nextDisabled = false;
                    }
                    $('#prevBtn').css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $scope.prevDisabled = true;
                    $('#arrow').css ( {"opacity":"0.5" });
                } else {
                    $("#nextBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $('#prevBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.prevDisabled = false;
                    $scope.nextDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        }

    };
    $scope.nextBtn = function () {
        $("#arrow").css({"opacity":"1"});
        next_count = next_count + 1;
        if ( $scope.totalMessage >= $scope.limit && $scope.currentCount < $scope.totalMessage ) {
            // console.log('more messages are to load..');
            $('.phpdebugbar-openhandler-overlay').show();
            $('.ui-loader').show();
            historyData['page'] = next_count;
            // console.log( JSON.stringify( historyData ) );
            var responsePromise = $http.post( BASE_URL+"billinghistory", JSON.stringify( historyData ) );
            responsePromise.success( function( data, status, headers, config ) {
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                console.log(JSON.stringify(data));
                $scope.recentChats = '';
                $scope.limit = data.data.per_page;
                $scope.billinghistory = data.data.billings;
                $scope.totalMessage = data.data.total_count;
                $scope.currentPage = data.data.current_page;
                $scope.currentCount = $scope.currentPage * $scope.limit;
                if ( $scope.totalMessage > $scope.currentCount ) {
                    $('#nextBtn').css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = false;
                    $scope.prevDisabled = false;
                } else {
                    $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
                    $("#arrowNext").css({"opacity":"0.5"});
                    $("#prevBtn").css({"background":"#fff","border-color":"#fff","color":"#000"});
                    $scope.nextDisabled = true;
                    $scope.prevDisabled = false;
                }

            } );
            responsePromise.error( function ( data, status, headers, config ) {
                console.log( JSON.stringify( data ) );
                $('.phpdebugbar-openhandler-overlay').hide();
                $('.ui-loader').hide();
                if(navigator.connection.type == Connection.NONE) {
                    checkConnection();
                }
            } );
        } else {
            $("#nextBtn").css({"background":"#dedede","border-color":"#dedede","color":"#acacac"});
            $('#arrowNext').css ( {"opacity":"0.5" });
            $scope.nextDisabled = true;
        }
    };

} );

//+++++++++++++++++++++++++++notification page controller+++++++++++++++++++++

mainApp.controller( "notificationcontroller", function( $scope, $http, $state, $rootScope, constantData ) {
    // $scope.InAPPChange = function (){
    //     navigator.notification.confirm(
    //         'Are you sure you want to disable notifications?',  // message
    //         onConfirm,
    //         'Disable Notification'
    //     );
    // };

    // function onConfirm( button ) {
    //     if( button == 1 ) {
    //         $scope.isInAPP = false;
    //     } else {
    //         $scope.isInAPP = true;
    //     }
    // };
    $scope.dailyalert = 'yes';
    $scope.notifyHrList = [{ id:'', value:'(Select frequency)'}];
    //$("#notificationTime").text($scope.notifyHrList.value);
    angular.forEach(constantData.getNotificationData(), function(value, key) {
        var item = { id:key, value:value };
        $scope.notifyHrList.push(item);
    });
    var notifyData = {};
    notifyData['responsetype'] = 'json';
    $scope.notifyCheck = '';
    // console.log( JSON.stringify( $scope.notifyHrList ) );
    // console.log( JSON.stringify( $scope.notifySumList ) );
    var responsePromise = $http.post( BASE_URL+"notificationsettings", JSON.stringify( notifyData ) );
    responsePromise.success( function( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        $scope.notifyServerData = data.data.notification;
        if( $scope.notifyServerData.sms == 0 ) {
            $scope.isSMS = false;
        } else {
            $scope.isSMS = true;
        }

        if( $scope.notifyServerData.inapp == 0 ) {
            $scope.isInAPP = false;
        } else {
            $scope.isInAPP = true;
        }
        //console.log($scope.notifyHrList)
        angular.forEach($scope.notifyHrList, function(notifydata){
            if(notifydata.id == $scope.notifyServerData.frequency){
                $scope.frequency = {'id':notifydata.id,'value':notifydata.value}
            }
        })

        //console.log($scope.frequency)
        //console.log($scope.notifyHrList[$scope.notifyServerData.frequency])
        //alert($scope.notifyServerData.frequency);
        //$scope.frequency = $scope.notifyServerData.frequency.toString();
        //$scope.frequency = {'id':$scope.notifyServerData.frequency.toString(),'value':};
        $scope.dailyalert = data.data.dailyalert;
        // console.log($scope.dailyalert);
    } );
    responsePromise.error( function ( data, status, headers, config ) {
        console.log( JSON.stringify( data ) );
        if(navigator.connection.type == Connection.NONE) {
            checkConnection();
        }
    } );

    $scope.updateStatus = function () {
        if($scope.dailyalert == '(Select daily alert)') {
            $scope.alertFrequency = '';
        }else{
            $scope.alertFrequency = $scope.dailyalert;
        }
        $('#notifyCheck').addClass('errorStatus').removeClass('succesStatus');
        if( $scope.isSMS == true ) {
            $('#sms').val(1);
        } else {
            $('#sms').val(0);
        }
        if( $scope.isInAPP == true ) {
            $('#inapp').val(1);
        } else {
            $('#inapp').val(0);
        }
        console.log($scope.frequency.id)
        var notifyData = {};
        notifyData['responsetype'] = 'json';
        notifyData['sms'] = $('#sms').val();
        notifyData['inapp'] = $('#inapp').val();
        notifyData['frequency'] = $scope.frequency.id;
        notifyData['dailyalert'] = $scope.alertFrequency;
        console.log( JSON.stringify( notifyData ) );
        $('.ui-loader').show();
        var responsePromise = $http.post( BASE_URL+"updatenotificationsettings", JSON.stringify( notifyData ) );
        responsePromise.success( function( data, status, headers, config ) {
            $('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            $scope.notifyServerData = data.data.notification;
            $scope.notifyCheck = data.message;
            $scope.dailyalert = data.data.dailyalert;
            if( data.status == 'success' ){
                $('#notifyCheck').removeClass('errorStatus').addClass('succesStatus');
            } else {
                $('#notifyCheck').addClass('errorStatus').removeClass('succesStatus');
            }
        } );
        responsePromise.error( function ( data, status, headers, config ) {
            $('.ui-loader').hide();
            console.log( JSON.stringify( data ) );
            if(navigator.connection.type == Connection.NONE) {
                checkConnection();
            }
        } );
    };
} )

//+++++++++++++++++++++++++++support page controller+++++++++++++++++++++

mainApp.controller( "supportcontroller", function( $scope, $http, $state, $rootScope ) {
    $scope.privacyPolicy = function () {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : '#/home/privacypolicy'
        } );
    };
    $scope.termsOfUse = function () {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : '#/home/terms'
        } );
    };
    $scope.contactSupport = function () {
        window.plugins.nativepagetransitions.slide( {
            "direction": 'left',
            "href" : '#/home/contactus'
        } );
    };
} );
