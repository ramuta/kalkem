$(document).ready(function() {
    var concentrationUnit1 = $("#concentrationUnit1");
    var concentrationUnit2 = $("#concentrationUnit2");

    concentrationUnit2.text(concentrationUnit1.val());

    concentrationUnit1.change(function() {
        concentrationUnit2.text(concentrationUnit1.val());
    });

    $("#calculateButton").click(function() {
        var totalVol = parseFloat($("#totalVolume").val());
        var totalVolUnit = $("#totalVolumeUnit").val();
        var resultDiv = $("#result");

        var comName = $("#componentName").val();
        var stockCon = parseFloat($("#stockCon").val());
        var desiredCon = parseFloat($("#desiredCon").val());

        var calc = (totalVol/stockCon) * desiredCon;

        $("#desiredResult").val(calc);

        resultDiv.empty();
        resultDiv.append("<p>" + comName + " = " + calc + " " + totalVolUnit + "</p>");

        //alert(calc)
    });


});