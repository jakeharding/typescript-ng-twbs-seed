/// <reference path="../typings/index.d.ts" />
module FunApp {
    'use strict';
    var fun_app = angular.module('app', [
        'ui.router',
        'ui.bootstrap',
    ]).config(function() {
        console.info("Module loaded");
    }).config(['$stateProvider', function($stateProvider) {
        // $stateProvider.state('', {
        //     template: '<h1>Hello Root State<h1>'
        // })
        $stateProvider.state('list', {
            url: 'pokemon/',
            template:'<h1>Hello World of Pokemon</h1>',
            
        })
    }])
} 