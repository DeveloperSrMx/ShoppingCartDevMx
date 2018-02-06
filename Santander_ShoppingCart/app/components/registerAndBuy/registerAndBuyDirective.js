App.directive('creditCardType', function () {
    var directive = {
        require: 'ngModel'
            , link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (value) {
                    scope.ccinfo.type =
                      (/^5[1-5]/.test(value)) ? "MASTERCARD"
                      : (/^4/.test(value)) ? "VISA"
                      : (/^3[47]/.test(value)) ? "AMEX"
                      : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'DISCOVER'
                      : undefined
                    ctrl.$setValidity('invalid', !!scope.ccinfo.type)
                    return value
                })
            }
    }
    return directive
});