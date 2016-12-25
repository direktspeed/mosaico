import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import $ from 'jquery';

import stache from "can-stache";
import 'can-stache/helpers/route';

import DefineList from "can-define/list/";

var templates = "/editor.html#templates/versafix-1/template-versafix-1.html"

const AppViewModel = DefineMap.extend('App', {
    jQuery: $,
    newEmail: function(){
      var rnd = Math.random().toString(36).substr(2, 7);
      var template = 'templates/'+shorttmplname+'/template-'+shorttmplname+'.html';
      var value = { created: Date.now(), key: rnd, name: shorttmplname, template: template }
    },
    message: function () {
      return 'mosaico-admin!'
    },
    title: function () {
      return 'mosaico-admin'
    },
    dummy: "string"
  }); // end AppViewModel

export default AppViewModel;

/*
get completHtml() {
  // isNode?
  if(typeof module !== 'undefined'){
    return "node"
  } else {
     //We are Running Client Side
    if(typeof(Storage) === "undefined"){
      return "noStorage"
    } else {
      //use the local storage
      var allKeys = new DefineList();
      for ( var i = 0, len = window.localStorage.length; i < len; ++i ) {
          //console.log(i, window.localStorage.key( i ).indexOf('template') > -1,window.localStorage.key( i ))
          if (window.localStorage.key( i ).indexOf('template') > -1) {
            // console.log( window.localStorage.key( i ) );
            // beforeHtml = beforeHtml + '<li><a href="#'+window.localStorage.key( i ).split('-')[1]+'">'+window.localStorage.key( i )+'</a></li>'
          }

          if (window.localStorage.key( i ).indexOf('metadata') > -1) {
            // We have a Email Template
            if (window.localStorage.getItem( 'template-'+window.localStorage.key( i ).split('-')[1] ) !== null) {
              // We have Content for that Email Template
              console.log( 'template-'+window.localStorage.key( i ).split('-')[1] );
              console.log( window.localStorage.getItem( 'template-'+window.localStorage.key( i ).split('-')[1] ) )
              console.log( window.localStorage.getItem( window.localStorage.key( i ) ) )
              console.log( 'template-'+window.localStorage.key( i ).split('-')[1] );
              beforeHtml = beforeHtml + '<li><a href="#'+window.localStorage.key( i ).split('-')[1]+'">'+window.localStorage.key( i ).split('-')[1]+'</a></li>'
              allKeys.push(window.localStorage.key( i ))
            } else {
                // We have a Email Template without Content Saved
                //allKeys.push(window.localStorage.key( i ))
                // beforeHtml = beforeHtml + '<li style="color: red;"><a style="color: red;" href="#'+window.localStorage.key( i ).split('-')[1]+'">'+window.localStorage.key( i ).split('-')[1]+'</a></li>'
                console.log('GOT: '+ window.localStorage.getItem( 'template-'+window.localStorage.key( i ).split('-')[1] ))
            }
          }
          if (i === window.localStorage.length -1) {
               return allKeys
          }

          // console.log(window.localStorage.key( i ).indexOf('metadata'), window.localStorage.key( i ))
      } // end for
    } // end ifStorage
  } // end is node
},
*/
