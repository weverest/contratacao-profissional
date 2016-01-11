var toolApp = angular.module('toolApp', []);

toolApp
    .directive('money', function(){
        return {
            restrict: 'A',
            link: function($scope, element, attrs){
                element.maskMoney($scope.$eval(attrs.money));
            }
        }
});

toolApp.controller('toolCtrl', ['$scope', function($scope) {

    var taxesContractorC1 = {
        'inss': 0.28,
        'fgts': 0.08,
        'salary13': 0.1133,
        'vocations': 0.1507,
        'resignation': 0.4
    };

    var taxesContractorC2 = {
        'inss': 0,
        'fgts': 0.08,
        'salary13': 0.09,
        'vocations': 0.1197,
        'resignation': 0.4
    };

    var taxesContractorC3 = {
        'inss': 0.2,
        'fgts': 0,
        'salary13': 0,
        'vocations': 0,
        'resignation': 0
    };

    $scope.monthlyPayment = 'R$ 0,00';

    $scope.calc = function(){
        var monthlyPayment = angular.element('#monthly-payment').maskMoney('unmasked')[0];

        $scope.contractorINSSC1 = monthlyPayment * taxesContractorC1.inss;
        $scope.contractorFGTSC1 = monthlyPayment * taxesContractorC1.fgts;
        $scope.contractorSalary13C1 = monthlyPayment * taxesContractorC1.salary13;
        $scope.contractorVocationsC1 = monthlyPayment * taxesContractorC1.vocations;
        $scope.contractorResignationC1 = $scope.contractorFGTSC1 * taxesContractorC1.resignation;
        $scope.contractorTotalC1 = monthlyPayment + $scope.contractorINSSC1 + $scope.contractorFGTSC1 + $scope.contractorSalary13C1 + $scope.contractorVocationsC1 + $scope.contractorResignationC1;

        $scope.contractorINSSC2 = monthlyPayment * taxesContractorC2.inss;
        $scope.contractorFGTSC2 = monthlyPayment * taxesContractorC2.fgts;
        $scope.contractorSalary13C2 = monthlyPayment * taxesContractorC2.salary13;
        $scope.contractorVocationsC2 = monthlyPayment * taxesContractorC2.vocations;
        $scope.contractorResignationC2 = $scope.contractorFGTSC2 * taxesContractorC2.resignation;
        $scope.contractorTotalC2 = monthlyPayment + $scope.contractorINSSC2 + $scope.contractorFGTSC2 + $scope.contractorSalary13C2 + $scope.contractorVocationsC2 + $scope.contractorResignationC2;

        $scope.contractorINSSC3 = monthlyPayment * taxesContractorC3.inss;
        $scope.contractorFGTSC3 = monthlyPayment * taxesContractorC3.fgts;
        $scope.contractorSalary13C3 = monthlyPayment * taxesContractorC3.salary13;
        $scope.contractorVocationsC3 = monthlyPayment * taxesContractorC3.vocations;
        $scope.contractorResignationC3 = $scope.contractorFGTSC3 * taxesContractorC3.resignation;
        $scope.contractorTotalC3 = monthlyPayment + $scope.contractorINSSC3 + $scope.contractorFGTSC3 + $scope.contractorSalary13C3 + $scope.contractorVocationsC3 + $scope.contractorResignationC3;

    };

    $scope.$watch('monthlyPayment', function(){
        $scope.calc();
        if($scope.monthlyPayment == '')
            $scope.monthlyPayment = 'R$ 0,00';
    });
}]);

