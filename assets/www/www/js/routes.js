//alert('1');
mainApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('home', {
            url: '/home',
            views: {
                main: {
                    templateUrl: 'home.html',
                    controller: 'loginBtnController'
                }
            }
        })

       .state('home.login', {
            url: '/login',
            templateUrl: 'home-login.html',
            controller: 'loginformController'
        })

        .state('home.register', {
            url: '/register',
            templateUrl: 'home-register.html',
            controller: 'regFormController'
        })

        .state('home.forgotpassword', {
            url: '/forgotpassword',
            templateUrl: 'home-forgotpassword.html',
            controller: 'forgotpwdController'
        })

        .state('home.forgotpasswordnext', {
            url: '/forgotpasswordnext',
            templateUrl: 'home-forgotpasswordnext.html',
            controller: 'resetpwdController'
        })

        .state('home.pinConfirm', {
            url: '/pinConfirm',
            templateUrl: 'home-pinConfirm.html',
            controller: 'pinMatchController'
        })

        .state('home.pinConfirmForgot', {
            url: '/pinConfirmForgot',
            templateUrl: 'home-pinConfirmForgot.html',
            controller: 'pinMatchFGController'
        })

        .state('home.register_step2', {
            url: '/register_step2',
            templateUrl: 'home-register_step2.html',
            controller: 'regStepTwoController'
        })

        .state('home.affter_login', {
            url: '/affter_login',
            templateUrl: 'home-affter_login.html',
            controller: 'dashBoardController'
        })

        .state('home.phonesettings', {
            url: '/phonesettings',
            templateUrl: 'home-phonesettings.html',
            controller: 'availabilityController'
        })

        .state('home.resetpassword', {
            url: '/resetpassword',
            templateUrl: 'home-resetpassword.html',
            controller: 'changepwdController'
        })

        .state('home.editProfile', {
            url: '/editProfile',
            templateUrl: 'home-editProfile.html',
            controller: 'editProfileController'
        })

        .state('home.messages', {
            url: '/messages',
            templateUrl: 'home-messages.html',
            controller: 'recentMessageController'
        })

        .state('home.reply', {
            url: '/reply:messageId',
            templateUrl: 'home-reply.html',
            controller: 'replyController',
            resolve:{
                messageId: ['$stateParams', function($stateParams){
                    return $stateParams.messageId;
                }]
            }
        })
        .state('home.videoCalling', {
            url: '/videoCalling/:receive_data',
            templateUrl: 'home-videoCalling.html',
            controller: 'videoCallingController'
        })
        .state('home.videoCredits', {
            url: '/videoCredits/:user_name/{Bal_req}',
            templateUrl: 'home-videoCredits.html',
            controller: 'videoController'
        })
        .state('home.videocallAccept', {
            url: '/videocallAccept',
            templateUrl: 'home-videocallAccept.html',
            controller: 'videocallAcceptController'
        })
        .state('home.videocallEnd', {
            url: '/videocallEnd/:totalcallcost/{totalcalltime}/{userName}/{idReceive}/{check_identity}/{infoOfpage}',
            templateUrl: 'home-videocallEnd.html',
            controller: 'videocallEndController'
        })
        .state('home.videoProReject', {
            url: '/videoProReject/:user_name/{state_page}/{id_receiver1}',
            templateUrl: 'home-videoProReject.html',
            controller: 'videoProRejectController'
        })
        .state('home.videocallMissed', {
            url: '/videocallMissed/:user_name/{callBackid}',
            templateUrl: 'home-videocallMissed.html',
            controller: 'videocallMissedController'
        })
        .state('home.purchasePaidPhoto', {
            url: '/purchasePaidPhoto?displayname&shout&media_id&model_id',
            templateUrl: 'home-purchasePaidPhoto.html',
            controller: 'purchaseController'
        })
        
        .state('home.createnewshout', {
            url: '/createnewshout',
            templateUrl: 'home-createnewshout.html',
            controller: 'createnewshoutController'
        })

        .state('home.sendPhotoShout', {
            url: '/sendPhotoShout',
            templateUrl: 'home-sendPhotoShout.html',
            controller: 'sendPhotoShoutController'
        })

        // .state('home.InAppPurchasePayment', {
        //     url: '/InAppPurchasePayment',
        //     templateUrl: 'home-InAppPurchasePayment.html',
        //     controller: 'paymentMethodController'
        // })

        .state('home.settings', {
            url: '/settings',
            templateUrl: 'home-settings.html',
            controller: 'settingsController'
        })

        .state('home.pinsent', {
            url: '/pinsent',
            templateUrl: 'home-pinsent.html',
            controller: 'pinSentController'
        })

        .state('home.upgrade', {
            url: '/upgrade',
            templateUrl: 'home-upgrade.html',
            controller: 'proUpgradeController'
        })

        .state('home.paymentoption', {
            url: '/paymentoption',
            templateUrl: 'home-paymentoption.html',
            controller: 'paymentoptionController'
        })

        .state('home.learnmore', {
            url: '/learnmore',
            templateUrl: 'home-learnmore.html',
            controller: 'learnmoreController'
        })

        .state('home.prodashboard', {
            url: '/prodashboard',
            templateUrl: 'home-prodashboard.html',
            controller: 'prodashboardController'
        })

        .state('home.acceptterms', {
            url: '/acceptterms',
            templateUrl: 'home-acceptterms.html',
            controller: 'accepttermsController'
        })

        .state('home.accepttermscomplete', {
            url: '/accepttermscomplete',
            templateUrl: 'home-accepttermscomplete.html',
            controller: 'accepttermscompleteController'
        })

        .state('home.verifyidentity', {
            url: '/verifyidentity',
            templateUrl: 'home-verifyidentity.html',
            controller: 'verifyidentityController'
        })

        .state('home.howitworks', {
            url: '/howitworks',
            templateUrl: 'home-howitworks.html'
        })

        .state('home.become_Pro', {
            url: '/become_Pro',
            templateUrl: 'home-become_Pro.html',
            controller: 'howitworksCtrl'
        })

        .state('home.faqs', {
            url: '/faqs',
            templateUrl: 'home-faqs.html',
            controller: 'faqCtrl'
        })

        .state('home.verification', {
            url: '/verification',
            templateUrl: 'home-verification.html'
        })

        .state('home.paymentoptcomplete', {
            url: '/paymentoptcomplete',
            templateUrl: 'home-paymentoptcomplete.html'
        })

        .state('home.profileoptions', {
            url: '/profileoptions',
            templateUrl: 'home-profileoptions.html',
            controller: 'profileoptionsctrl'
        })

        .state('home.prosettings', {
            url: '/prosettings',
            templateUrl: 'home-prosettings.html',
            controller: 'prosettingsController'
        })
        .state('home.mygreeting', {
            url: '/mygreeting:ringhop_number',
            templateUrl: 'home-mygreeting.html',
            controller: 'mygreetingController'
        })

        .state('home.setrates', {
            url: '/setrates',
            templateUrl: 'home-setrates.html',
            controller: 'setratesController'
        })

        .state('home.stats', {
            url: '/stats',
            templateUrl: 'home-stats.html',
            controller: 'statsController'
        })

        .state('home.recentcalls', {
            url: '/recentcalls',
            templateUrl: 'home-recentcalls.html',
            controller: 'recentCallController'
        })

        .state('home.contacts', {
            url: '/contacts',
            templateUrl: 'home-contacts.html',
            controller: 'contactsController'
        })

        .state('home.about', {
            url: '/about',
            templateUrl: 'home-about.html',
        } )
        
        .state('home.blockedusers', {
            url: '/blockedusers',
            templateUrl: 'home-blockedusers.html',
            controller: 'blockedusersController'
        })

        .state('home.editlocation', {
            url: '/editlocation',
            templateUrl: 'home-editlocation.html',
            controller: 'editlocationController'
        })

        .state('home.editaboutme', {
            url: '/editaboutme',
            templateUrl: 'home-editaboutme.html',
            controller: 'editaboutmeController'
        })

        .state('home.search', {
            url: '/search',
            templateUrl: 'home-search.html',
            controller: 'searchController'
        })

        .state('home.updatepayment', {
            url: '/updatepayment',
            templateUrl: 'home-updatepayment.html',
            controller: 'proUpgradeController'
        })

        .state('home.paidphoto', {
            url: '/paidphoto/:media_id/{model_id}/{displayname}',
            templateUrl: 'home-paidphoto.html',
            controller: 'paidphotoController'
        })

        .state('home.sendPhoto', {
            url: '/sendPhoto:recieverId',
            templateUrl: 'home-sendPhoto.html',
            controller: 'sendPhotoController',
            resolve:{
                recieverId: ['$stateParams', function($stateParams){
                    return $stateParams.recieverId;
                }]
            }
        })
        .state('home.sendTip', {
            url: '/sendTip/:originatrId/{pagename}',
            templateUrl: 'home-sendTip.html',
            controller: 'sendTipController'
        })

        .state('home.viewprofile', {
            url: '/viewprofile:user_id',
            templateUrl: 'home-viewprofile.html',
            controller: 'viewprofileController',
            resolve:{
                user_id: ['$stateParams', function($stateParams){
                    return $stateParams.user_id;
                }]
            }
        })

        .state('home.callerhistory', {
            url: '/callerhistory:userId',
            templateUrl: 'home-callerhistory.html',
            controller: 'callerhistoryController',
            resolve:{
                userId: ['$stateParams', function($stateParams){
                    return $stateParams.userId;
                }]
            }
        })

        .state('home.forsale', {
            url: '/forsale',
            templateUrl: 'home-forsale.html',
            controller: 'forsaleController'
        })

        .state('home.viewprofilenew', {
            url: '/profile:userid/{uname}',
            templateUrl: 'home-profilenew.html',
            controller: 'viewprofilenewController'
        } )

        .state('home.socialprofile', {
            url: '/socialprofile:userid',
            templateUrl: 'home-socialprofile.html',
            controller: 'socialnewController'
        } )

        .state('home.addcredits', {
            url: '/addcredits/:originatrId/{pageName}',
            templateUrl: 'home-addcredits.html',
            controller: 'addcreditsController'
        } )

        .state('home.creditscomplete', {
            url: '/creditscomplete/:originatrId/{namePage}',
            templateUrl: 'home-creditscomplete.html',
            controller: 'creditscompleteController'
        } )

        .state('home.viewcredit', {
            url: '/viewcredit',
            templateUrl: 'home-viewcredit.html',
            controller: 'viewcreditController'
        } )
        .state('home.viewTip', {
            url: '/viewTip/:originatrId/{pagename}/{sendTipData}',
            templateUrl: 'home-viewTip.html',
            controller: 'viewtipController'
        } )
        .state('home.paidphotoadd', {
            url: '/paidphotoadd/:originatrId/{fromPgName}',
            templateUrl: 'home-paidphotoadd.html',
            controller: 'paidphotoaddController'
        } )

        .state('home.myLibrary', {
            url: '/myLibrary',
            templateUrl: 'home-myLibrary.html',
            controller: 'mylibrarycontroller'
        } )

        .state('home.billinghistory', {
            url: '/billinghistory',
            templateUrl: 'home-billinghistory.html',
            controller: 'billinghistorycontroller'
        } )

        .state('home.deactivation', {
            url: '/deactivation',
            templateUrl: 'home-deactivation.html',
            controller: 'deactivationcontroller'
        } )

        .state('home.inactiveUser', {
            url: '/inactiveUser',
            templateUrl: 'home-inactiveUser.html',
            controller: 'inactiveUsercontroller'
        } )
        
        .state('home.statscalls', {
            url: '/statscalls/:calltype',
            templateUrl: 'home-statscalls.html',
            controller: 'statscallscontroller'
        } )

        .state('home.statsmessages', {
            url: '/statsmessages',
            templateUrl: 'home-statsmessages.html',
            controller: 'statsmessagescontroller'
        } )

        .state('home.statsphotos', {
            url: '/statsphotos',
            templateUrl: 'home-statsphotos.html',
            controller: 'statsphotoscontroller'
        } )

        .state('home.TipHistory', {
            url: '/TipHistory',
            templateUrl: 'home-TipHistory.html',
            controller: 'tiphistorycontroller'
        } )
        .state('home.shoutsHistory', {
            url: '/shoutsHistory',
            templateUrl: 'home-shoutsHistory.html',
            controller: 'shoutsHistorycontroller'
        } )
        .state('home.notification', {
            url: '/notification',
            templateUrl: 'home-notification.html',
            controller: 'notificationcontroller'
        } )

        .state('home.userstats', {
            url: '/userstats',
            templateUrl: 'home-userstats.html',
            controller: 'userstatscontroller'
        } )

        .state('home.statssummary', {
            url: '/statssummary',
            templateUrl: 'home-statssummary.html',
            controller: 'statssummarycontroller'
        } )

        .state('home.contactus', {
            url: '/contactus',
            templateUrl: 'home-contactus.html'
        } )

        .state('home.support', {
            url: '/support',
            templateUrl: 'home-support.html',
            controller: 'supportcontroller'
        } )

        .state('home.privacypolicy', {
            url: '/privacypolicy',
            templateUrl: 'home-privacypolicy.html',
            controller: 'privacypolicycontroller'
        } )

        .state('home.terms', {
            url: '/terms',
            templateUrl: 'home-terms.html',
            controller: 'termscontroller'
        } )

        .state('home.forwardingsettings', {
            url: '/forwardingsettings',
            templateUrl: 'home-forwardingsettings.html',
            controller: 'forwardingsettingsCtrl'
        } )

        .state('home.trialsettings', {
            url: '/trialsettings',
            templateUrl: 'home-trialsettings.html',
            controller: 'trialsettingsCtrl'
        } )
        .state('home.addProContact', {
            url: '/addProContact',
            templateUrl: 'home-addProContact.html',
            controller: 'addProContactController'
        })

        var rememberme_check = localStorage.getItem( "rememberme_flag" );
        if( rememberme_check ) {
            $urlRouterProvider.otherwise( '/home/affter_login' );
        } else {
            $urlRouterProvider.otherwise( '/home' );
        }

    } ).run( ['$rootScope', '$state', '$stateParams', function ( $rootScope,   $state,   $stateParams ) {
        //alert('run');
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo( 'home' );
    } ] );
