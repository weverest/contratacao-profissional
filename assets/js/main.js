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

    $scope.monthlyPayment = 'R$0,00';

    $scope.calc = function(){
        if($scope.monthlyPayment == '')
            $scope.monthlyPayment = 'R$0,00';
        else {
            $scope.contractor();
            $scope.hired();
        }
    };

    $scope.contractor = function(){
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

    $scope.hired = function(){
        var monthlyPayment = angular.element('#monthly-payment').maskMoney('unmasked')[0];

        $scope.hiredSimplesC5 = monthlyPayment * 0.045;

        $scope.hiredISSC3 = monthlyPayment * 0.05;
        $scope.hiredISSC4 = monthlyPayment * 0.05;
        if(monthlyPayment > 0)
            $scope.hiredISSC5 = Math.round((52 / monthlyPayment) * 100);
        else
            $scope.hiredISSC5 = 0;

        $scope.hiredTaxesC4 = monthlyPayment * 0.1133;
        //SE($I$6<1399,13;ARRED($I$6*0,08;2);
        //SE($I$6<2331,89;ARRED($I$6*0,09;2);
        //SE($I$6<4663,76;ARRED($I$6*0,11;2);
        //ARRED(4663,75*0,11;2))))
        $scope.hiredINSS = 0;
        if( monthlyPayment < 1399.13 ){
            $scope.hiredINSS = monthlyPayment * 0.08;
        } else if(monthlyPayment < 2331.89) {
            $scope.hiredINSS = monthlyPayment * 0.09;
        } else if(monthlyPayment < 4663.76) {
            $scope.hiredINSS = monthlyPayment * 0.11;
        } else {
            $scope.hiredINSS = 4663.75 * 0.11;
        }

        if($scope.hiredINSS > 0)
            $scope.hiredINSSPercentage = Math.round(($scope.hiredINSS / monthlyPayment) * 100);
        else
            $scope.hiredINSSPercentage = 0;


        $scope.hiredIRRF = 0;
        //SE(($I$6-E28)<1903,99;0;
        //SE(($I$6-E28)<2826,66;ARRED(($I$6-E28)*0,075-142,8;2);
        //SE(($I$6-E28)<3751,06;ARRED(($I$6-E28)*0,15-354,8;2);
        //SE(($I$6-E28)<4664,68;RED(($I$6-E28)*0,225-636,13;2);
        //ARRED(($I$6-E28)*0,275-869,36;2)))))
        if((monthlyPayment - $scope.hiredINSS) < 1903.99){
            $scope.hiredIRRF = 0;
        } else if((monthlyPayment - $scope.hiredINSS) < 2826.66){
            $scope.hiredIRRF = (monthlyPayment - $scope.hiredINSS) * 0.075 - 142.8;
        } else if((monthlyPayment - $scope.hiredINSS) < 3751.06) {
            $scope.hiredIRRF = (monthlyPayment - $scope.hiredINSS) * 0.15 - 354.8;
        } else if((monthlyPayment - $scope.hiredINSS) < 4664.68) {
            $scope.hiredIRRF = (monthlyPayment - $scope.hiredINSS) * 0.225 - 636.13;
        } else {
            $scope.hiredIRRF = (monthlyPayment - $scope.hiredINSS) * 0.275 - 869.36;
        }

        if($scope.hiredIRRF > 0)
            $scope.hiredIRRFPercentage = Math.round(($scope.hiredIRRF / monthlyPayment) * 100);
        else
            $scope.hiredIRRFPercentage = 0;

        $scope.hiredTotalPercentageC1C2 = $scope.hiredIRRFPercentage + $scope.hiredINSSPercentage;
        $scope.hiredTotalPercentageC3 = $scope.hiredIRRFPercentage + $scope.hiredINSSPercentage + 5;
        $scope.hiredTotalPercentageC4 = $scope.hiredIRRFPercentage + $scope.hiredINSSPercentage + 5;

        $scope.hiredTotalC1C2 = monthlyPayment - $scope.hiredINSS - $scope.hiredIRRF;
        $scope.hiredTotalC3 = monthlyPayment - $scope.hiredISSC3 - $scope.hiredINSS - $scope.hiredIRRF;
        $scope.hiredTotalC4 = monthlyPayment - $scope.hiredTaxesC4 - $scope.hiredISSC4;
        $scope.hiredTotalC5 = monthlyPayment - $scope.hiredSimplesC5;
        $scope.hiredTotalC6 = monthlyPayment - 52;

    };

    $scope.$watch('monthlyPayment', function(){
        $scope.calc();
        if($scope.monthlyPayment == '')
            $scope.monthlyPayment = 'R$0,00';
    });
}]);

