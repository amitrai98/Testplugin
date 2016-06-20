/*global cordova, module*/

module.exports = {
    greet: function (name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Hello", "greet", [name]);
    },
    initializeVideoCalling: function (apiKey,sessonId,sessonToken,callPerMinute,userBalance,profileImageUrl, successCallback, errorCallback) {
            cordova.exec(successCallback, errorCallback, "Hello", "initializeVideoCalling", [apiKey,sessonId,sessonToken,callPerMinute,userBalance,profileImageUrl]);
    },
    endCalling: function (messageInReturn,successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Hello", "endCalling", [messageInReturn]);
}
               
};