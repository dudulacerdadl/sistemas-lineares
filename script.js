(function() {
    var ordemValue = null;
    var generateButton = document.querySelector('#generateButton');
    var button = document.querySelector('#resultButton');
    var resultDiv = document.querySelector('#result');
    var inputs = document.querySelector('.inputs');
    var condition = document.querySelector('.condition');
    var values = [];
    var arrayValues = [];
    var results = [];
    var pivo;
    var result;

    generateButton.addEventListener("click", function() {
        ordemValue = document.querySelector('.inputOrdem').value
        let ordem = document.querySelector('.ordem');
        let divHidden = document.querySelector('.hidden');
        ordem.style.display = "none";
        divHidden.removeAttribute("style");
        gerateArray(ordemValue);
    });

    function gerateArray(ordem) {
        for (let i = 1; i - 1 < ordem; i++) {
            for (let j = 1; j - 1 < ordem; j++) {
                let newDiv = document.createElement("div");
                let newInput = document.createElement("input");
                newDiv.setAttribute("class", "row");
                newInput.setAttribute("type", "number");
                newInput.setAttribute("class", "inputRow");
                newInput.setAttribute("id", `l${i}c${j}`);
                inputs.appendChild(newDiv);
                newDiv.appendChild(newInput);
            }
            let br = document.createElement("br");
            inputs.appendChild(br);
        }

        for (let k = 1; k - 1 < ordem; k++) {
            let newDiv = document.createElement("div");
            let newInput = document.createElement("input");
            let br = document.createElement("br");
            newDiv.setAttribute("class", "row");
            newInput.setAttribute("type", "number");
            newInput.setAttribute("class", "inputRow");
            newInput.setAttribute("id", `r${k}`);
            condition.appendChild(newDiv);
            newDiv.appendChild(newInput);
            condition.appendChild(br);
        }
    }

    button.addEventListener("click", function() {
        resultDiv.innerHTML = returnResult(ordemValue);
    });

    function getValues(item) {
        if (!item.getAttribute("id").includes("r")) {
            values.push(item.value);
        }
    }

    function getResults(item) {
        if (item.getAttribute("id").includes("r")) {
            results.push(item.value);
        }
    }

    function setResultsInArray(item, index) {
        item.push(results[index]);
    }

    function returnResult(ordem) {
        let inputsValues = document.querySelectorAll('.inputRow');
        inputsValues.forEach(getValues);
        inputsValues.forEach(getResults);
        console.log(ordem);

        for (var i = 0; i < values.length; i = i + parseInt(ordem)) {
            console.log(i);
            arrayValues.push(values.slice(i, i + parseInt(ordem)));
        }

        arrayValues.forEach(setResultsInArray);

        return execute(arrayValues, ordem);
    }

    function execute(array, ordem) {
        let valor = array;

        var i = ordem;
        i = parseInt(i);
        j = i;
        i = i - 1;
        var x = [];

        for (var l = 0; l < i; l++) {
            pivo = valor[l][l];
            for (var o = l + 1; o < i + 1; o++) {
                var m = valor[o][l] / pivo;
                if (valor[o][k] == 0) {} else {
                    for (var k = 0; k < j + 1; k++) {
                        val = (valor[o][k]) - (m * valor[l][k]);
                        valor[o][k] = val.toFixed(5);
                    }
                }
            }
        }

        for (y = i; y > -1; y--) {
            result = valor[y][j];

            for (m = 0; m < j; m++) {
                if (m == y) {} else {
                    result = result - valor[y][m];
                }
            }

            x[y] = result / valor[y][y];
            for (l = i; l > -1; l--) {
                valor[l][y] = x[y] * valor[l][y];
            }
        }

        return `<p class="resultReturn">[${x}]</p>`
    }
})();