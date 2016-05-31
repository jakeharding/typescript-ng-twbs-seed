/// <reference path="../../typings/index.d.ts" />
module FunApp {
    'use strict';
    var fun_app = angular.module('app', [
        'ui.router',
        'ui.bootstrap',
    ]).config(function() {
        console.info("Module loaded");
    }).config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('root', {
            url: '',
            
        })
        
        $stateProvider.state('list', {
            url: 'list/',
            templateUrl:'partials/list.html',
        })
    }])
} 