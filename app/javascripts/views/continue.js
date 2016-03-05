/**
 * Continue buttons module
 * @module continue
 */

'use strict';

var domHelpers = require('../dom-helpers');

var configMap = {
  continueClass: 'continue',
  navClass: 'nav'
};
var stateMap = {
  continueButtons: null,
  nav: null
};

/**
 * DOM FUNCTIONS
 */

var activateNav = function() {
  var newActiveNavLink = stateMap.nav.get('active').nextElementSibling;

  //Check if it is not the last nav link, which doesn't have siblings
  if (newActiveNavLink) {
    //Activate the navigation item
    if (newActiveNavLink.classList.contains('disabled')) {
      newActiveNavLink.classList.remove('disabled');
    }
    domHelpers.setActive(newActiveNavLink, 'active');
    return newActiveNavLink;
  }

  return false;
};

/**
 * PUBLIC FUNCTIONS
 */

var bind = function(event, handler) {
  if (event === 'continueClicked') {
    stateMap.continueButtons.forEach(function(element) {
      element.addEventListener('click', function() {
        var nextStep = this.dataset.template;
        var nextStepElement = document.get(nextStep + '-wrapper');
        domHelpers.setActive(nextStepElement, 'show');
        var nextActiveNavLink = activateNav();
        handler(nextActiveNavLink);
      });
    });
  }
};

var setStateMap = function() {
  stateMap.continueButtons = document.getAll(configMap.continueClass);
  stateMap.nav = document.get(configMap.navClass);
};

module.exports = {
  bind: bind,
  setStateMap: setStateMap
};
