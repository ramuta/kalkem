$(document).ready(function() {
    // unit swap for component #1
    var sConUnit = $("#stockConcentrationUnit1");
    var desConUnit = $("#desiredConcentrationUnit1");

    desConUnit.text(sConUnit.val());

    sConUnit.change(function() {
        desConUnit.text(sConUnit.val());
    });

    // add new component
    var wrapper = $("#componentsWrapper");
    var componentCounter = 1;

    $("#addComponent").click(function() {
        componentCounter += 1;

        wrapper.append('<!-- Component #' + componentCounter +' -->' +
                '<div class="col-md-4 form-group well">' +
                    '<h4>Component #' + componentCounter +'</h4>'+
                    '<input class="form-control" placeholder="Component name" id="componentName' + componentCounter +'">'+
                    '<br>'+

                    '<div class="row form-group">'+
                        '<div class="col-xs-7">' +
                            '<input class="form-control" placeholder="Stock concentration" id="stockCon' + componentCounter +'">' +
                        '</div>' +

                        '<div class="col-xs-5">' +
                            '<select class="form-control" id="stockConcentrationUnit' + componentCounter +'">' +
                                '<option>%</option>' +
                                '<option>M</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +

                    '<div class="row form-group">' +
                        '<div class="col-xs-7">' +
                            '<input class="form-control" placeholder="Desired concentration" id="desiredCon' + componentCounter +'">' +
                        '</div>' +

                        '<div class="col-xs-5">' +
                            '<p class="form-control-static" id="desiredConcentrationUnit' + componentCounter +'">%</p>' +
                        '</div>' +
                    '</div>' +
                '</div><!-- End component #' + componentCounter + ' + -->');
    });

    // calculation
    $("#calculateButton").click(function() {
        var totalVol = parseFloat($("#totalVolume").val());
        var totalVolUnit = $("#totalVolumeUnit").val();
        var resultDiv = $("#result");
        resultDiv.empty();

        for(var i = 1; i < componentCounter+1; i++) {
            var comName = $("#componentName"+i).val();
            var stockCon = parseFloat($("#stockCon"+i).val());
            var desiredCon = parseFloat($("#desiredCon"+i).val());

            var calc = (totalVol/stockCon) * desiredCon;

            $("#desiredResult").val(calc);

            resultDiv.append("<p>" + comName + " = " + calc + " " + totalVolUnit + "</p>");
        }
    });


});