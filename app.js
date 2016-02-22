(function(window) {
  angular.module('app',[])
  .directive('tab', function() {
    //ddo
    return {
      restrict: 'E',
      transclude: true,
      template: '<div role="tabpanel" ng-transclude ng-if="active"></div>',
      require: '^tabset', //access the tabset controller, accessed via the directive name
      scope: {
        heading: '@' //heading is defined in the scope in the tab element, here we are binding same with the heading property in the isolated scope. @ establishes one way binding
      },
      link: function(scope, elem, attr, tabsetCtrl){
        scope.active = false;
        tabsetCtrl.addTab(scope);
      }
    }
  })
  .directive('tabset', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'tabset.html',
      bindToController: true,
      controllerAs: 'tabset',
      controller: function()  {
        this.tabs = [];
        this.addTab = function addTab(tab) {
          this.tabs.push(tab);
          if(this.tabs.length === 1 ){
            tab.active = true;
          }
        }.bind(this);

        this.select = function(selectedTab) {
          angular.forEach(this.tabs, function(tab) {
            if(tab.active && tab != selectedTab) {
              tab.active = false;
            }
          })
          selectedTab.active = true;
        }.bind(this);
      }
    }
  })
})(window);
