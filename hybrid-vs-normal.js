var hybrid = {
    short: "h",
    initialCost: "",
    milesPerGallon: "",
    yearlyMileage: "",
    pricePerGallon: "",
    resellValue: "",
    totalCost: "",
    gasConsumption: ""
}

var normal = {
    short: "n",
    initialCost: "",
    milesPerGallon: "",
    yearlyMileage: "",
    pricePerGallon: "",
    resellValue: "",
    totalCost: "",
    gasConsumption: ""
}

function output() {
    saveData();
    calculateOutputs();
    giveCounsel();
}

function saveData() {
    hybrid.initialCost = document.getElementsByName("initial-cost")[0].value;
    hybrid.milesPerGallon = document.getElementsByName("miles-per-gallon")[0].value;
    hybrid.yearlyMileage = document.getElementsByName("yearly-mileage")[0].value;
    hybrid.pricePerGallon = document.getElementsByName("price-per-gallon")[0].value;
    hybrid.resellValue = document.getElementsByName("resell-value")[0].value;
    hybrid.totalCost = Math.floor(Number(hybrid.initialCost) * (hybrid.resellValue/100) + ((Number(hybrid.yearlyMileage * 5)/Number(hybrid.milesPerGallon)) * hybrid.pricePerGallon)); //divided resellValue by 100 because the resellValue should be a percentage, or in this case a decimal which is multiplied by the car's initial cost to determine the value that remains.
    hybrid.gasConsumption = Math.floor(Number(hybrid.yearlyMileage)/Number(hybrid.milesPerGallon) * 5);

    normal.initialCost = document.getElementsByName("initial-cost")[1].value;
    normal.milesPerGallon = document.getElementsByName("miles-per-gallon")[1].value;
    normal.yearlyMileage = document.getElementsByName("yearly-mileage")[0].value;
    normal.pricePerGallon = document.getElementsByName("price-per-gallon")[0].value;
    normal.resellValue = document.getElementsByName("resell-value")[0].value;
    normal.totalCost = Math.floor(Number(normal.initialCost) * (normal.resellValue/100) + ((Number(normal.yearlyMileage * 5)/Number(normal.milesPerGallon)) * normal.pricePerGallon));
    normal.gasConsumption = Math.floor(Number(normal.yearlyMileage)/Number(normal.milesPerGallon) * 5);

    console.log(hybrid);
    console.log(normal);
}

function emptyInputs() {
    for (var x = 0; x < 2; x++) {
        document.getElementsByName("initial-cost")[x].value = '';
        document.getElementsByName("miles-per-gallon")[x].value = '';
    }
    document.getElementsByName("price-per-gallon")[0].value = '';
    document.getElementsByName("yearly-mileage")[0].value = '';
}

function giveCounsel() {
    var gasChecked = document.getElementById('gas').checked;
    var costChecked = document.getElementById('cost').checked;
    if (gasChecked) { //if the user selected gas as the more important factor
        //create the element that says that the better fuel consumption car (probably the hybrid) is best
        var showSuggestion = document.getElementById('suggestion').style.visibility = "visible";
        var headerChange = document.getElementById('suggestion');
        if (hybrid.gasConsumption < normal.gasConsumption) { //choose the car with less fuel consumption
            headerChange.innerHTML = "You seem like the hybrid type! Make sure to take a picture of the gas station because you won't be seeing it very often.";
            showSuggestion;
            return;
        }
        else {
            headerChange.innerHTML = "It looks like you'll save more fuel driving the non-hybrid....weird.";
            showSuggestion;
            return;
        }
    }
    else if (costChecked) {
        //create the element that says the lower cost item (hybrid or normal car) is a better option
        var header = document.getElementById('suggestion');
        if (normal.totalCost < hybrid.totalCost) {
            header.innerHTML = "Yep, the non-hybrid was cheaper. Enjoy your savings!";
            showSuggestion;
            return;
        }
        else {
            header.innerHTML= "Did you really find a hybrid that costs less than a non-hybrid? Nice Work!";
            showSuggestion;
            return;
        }
    }
}

function validate(inputFunction) {
    stop = document.getElementsByTagName('INPUT').length;
    var num = 0;
    for (var x = 0; x < stop; x++) {
        if (!document.getElementsByTagName('INPUT')[x].value) {
            num++;
            if (num > 0) {
                alert("Make sure to fill in all the input boxes");
                return;
            }
        }
        else if (!document.getElementById('gas').checked && !document.getElementById('cost').checked) {
            alert("Make sure to select an output suggestion");
            return;
        }
        else {
            inputFunction;
        }
    }
}

function calculateOutputs() {
    if (hybrid.gasConsumption) {
        document.getElementById('h-gas-consumption').innerHTML = hybrid.gasConsumption;
    }
    if (hybrid.totalCost) {
        document.getElementById('h-cost-output').innerHTML = hybrid.totalCost;
    }
    if (normal.gasConsumption) {
        document.getElementById('n-gas-consumption').innerHTML = normal.gasConsumption;
    }
    if (normal.totalCost) {
        document.getElementById('n-cost-output').innerHTML = normal.totalCost;
    }
}
