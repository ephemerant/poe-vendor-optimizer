var app = angular.module("app", []);

app.controller("main", function($scope) {
  var vm = $scope;
  vm.items = [];
  vm.combination = [];
  vm.quality = null;

  vm.$on('itemProcessed', function(event, item) { // When an item has been pasted and processed
    vm.items.push(item);
    calculateCombination();
    vm.$apply();    
  });

  vm.deleteItem = function(index) { // Delete a single item
    vm.items.splice(index, 1);
    calculateCombination();
  };

  vm.clearItems = function() { // Clear all items
    vm.items = [];
    vm.combination = [];
    vm.quality = null;
  };

  vm.clearOptimal = function() { // Clear optimal items
      var items = [];

      vm.items.forEach(function(item) { // See what items to keep
          if (vm.combination.indexOf(item) === -1) // Not in optimal, so keep it
            items.push(item);            
      });

      vm.items = items;
      calculateCombination();
  };

  function calculateCombination() {
    var combination = smallest( // Get the optimal combination of items
        40, vm.items.slice());

    if (combination.length) { // Set new combination and quality
        vm.combination = combination;
        vm.quality = sum(combination) + '%';        
    }
    else { // Clear previous combination and quality
        vm.combination = [];
        vm.quality = null;
    }
  }
});