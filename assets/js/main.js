$(document).ready(function() {
    $("#calculateButton").click(function() {
        totalVol = parseFloat($("#totalVolume").val());

        comName = $("#componentName").val();
        stockCon = parseFloat($("#stockCon").val());
        desiredCon = parseFloat($("#desiredCon").val());

        calc = (totalVol/stockCon) * desiredCon;

        $("#desiredResult").val(calc);

        //alert(calc)
    });


});