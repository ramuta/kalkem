$(document).ready(function() {
    // unit swap for component #1 when site reloaded
    var sConUnit = $("#stockConcentrationUnit1");
    var desConUnit = $("#desiredConcentrationUnit1");

    desConUnit.text(sConUnit.val());

    // unit swap for all components
    $(document).on('change', '.scu', function() {
        for(var i = 1; i < componentCounter+1; i++) {
            var localStockConUnit = $("#stockConcentrationUnit"+i).val();
            $("#desiredConcentrationUnit"+i).text(localStockConUnit);
        }
    });

    // add new component
    var wrapper = $("#componentsWrapper");
    var componentCounter = 1;

    $("#addComponent").click(function() {
        componentCounter += 1;

        wrapper.append('<!-- Component #' + componentCounter +' -->' +
                '<div class="col-md-4 form-group well">' +
                    '<h4>Component #' + componentCounter + '<a class="remove-component pull-right label label-danger">remove</a>' + '</h4>' +
                    '<input class="form-control" placeholder="Component name" id="componentName' + componentCounter +'">'+
                    '<br>'+

                    '<div class="row form-group">'+
                        '<div class="col-xs-7">' +
                            '<input class="form-control" placeholder="Stock concentration" id="stockCon' + componentCounter +'">' +
                        '</div>' +

                        '<div class="col-xs-5">' +
                            '<select class="form-control scu" id="stockConcentrationUnit' + componentCounter +'">' +
                                '<option>%</option>' +
                                '<option>M</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +

                    '<div class="row form-group desired">' +
                        '<div class="col-xs-7">' +
                            '<input class="form-control" placeholder="Desired concentration" id="desiredCon' + componentCounter +'">' +
                        '</div>' +

                        '<div class="col-xs-5">' +
                            '<p class="form-control-static dcu" id="desiredConcentrationUnit' + componentCounter +'">%</p>' +
                        '</div>' +
                    '</div>' +
                '</div><!-- End component #' + componentCounter + ' + -->'); // end wrapper append
    });

    // remove component
    $(wrapper).on("click",".remove-component", function(e){
        $(this).parent().parent('div').remove();
        componentCounter--;
    });

    // calculation
    $("#calculateButton").click(function() {
        var resultDiv = $("#result");
        resultDiv.empty();

        resultDiv.append("<h4>Results</h4>");

        var totalVol = $("#totalVolume").val();

        if(!totalVol){
            resultDiv.append("<p class='error-text'>Error: Total volume field is empty.")
        }

        totalVol = parseFloat(totalVol.replace(",", ".")); // replace decimal comma with the decimal dot

        var totalVolUnit = $("#totalVolumeUnit").val();



        var volumeLeft = totalVol;

        for(var i = 1; i < componentCounter+1; i++) {
            var comName = $("#componentName"+i).val();
            var stockCon = $("#stockCon"+i).val();
            var desiredCon = $("#desiredCon"+i).val();

            if(comName && stockCon && desiredCon) {
                stockCon = parseFloat(stockCon.replace(",", ".")); // replace decimal comma with the decimal dot

                desiredCon = parseFloat(desiredCon.replace(",", ".")); // replace decimal comma with the decimal dot

                var calc = (totalVol/stockCon) * desiredCon;

                $("#desiredResult").val(calc);

                resultDiv.append("<p>" + comName + " = " + calc.toFixed(4) + " " + totalVolUnit + "</p>");

                volumeLeft -= calc;
            } else {
                resultDiv.append("<p class='error-text'>Error: Some of the Component #" + i + " fields are empty... please fill all the fields.</p>");
            }
        }

        resultDiv.append("<p><strong>Total volume left = " + volumeLeft.toFixed(4) + " " + totalVolUnit + "</strong></p>");
    });


});