(function() {
    var ordemValue = null;
    var generateButton = document.querySelector('#generateButton');
    var button = document.querySelector('#resultButton');
    var resultDiv = document.querySelector('#result');
    var identityDiv = document.querySelector('#identity');
    var inputs = document.querySelector('.inputs');
    var condition = document.querySelector('.condition');
    var values = [];
    var arrayValues = [];
    var results = [];
    var identidade = [];
    var identidadeOrden = [];
    var variante;
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
                if (i == j) {
                    identidade.push(1);
                } else {
                    identidade.push(0);
                }
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

        for (var i = 0; i < identidade.length; i = i + parseInt(ordem)) {
            identidadeOrden.push(identidade.slice(i, i + parseInt(ordem)));
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

        for (var i = 0; i < values.length; i = i + parseInt(ordem)) {
            arrayValues.push(values.slice(i, i + parseInt(ordem)));
        }

        arrayValues.forEach(setResultsInArray);

        return execute(arrayValues, ordem, identidadeOrden);
    }

    function execute(array, ordem, identidadeArray) {
        let valor = array;

        var i = parseInt(ordem);
        j = i;
        i = i - 1;
        var x = [];
        var ident = identidadeArray;

        for (l = 0; l < i + 1; l++) {
            if (valor[l][0] == 0) {
                var troca = valor[1];
                valor[1] = valor[l];
                valor[l] = troca;
                variante = ident[1];
                ident[1] = ident[l];
                ident[l] = variante;
                break;
            }
        }

        for (var l = 0; l < i; l++) {
            pivo = valor[l][l];

            for (var o = l + 1; o < i + 1; o++) {
                var m = valor[o][l] / pivo;
                var a = 0;

                for (var k = 0; k < j; k++) {
                    if (valor[o][0] == 0) {
                        for (var k = 1; k < j; k++) {
                            a++;
                            if (valor[o][k] != 0) {
                                break;
                            }
                        }
                        if (a == o) {
                            var troca = valor[l];
                            valor[l] = valor[o];
                            valor[o] = troca;
                            variante = ident[l];
                            ident[l] = ident[o];
                            ident[o] = variante;
                            o++;

                            break;
                        }
                    } else {
                        for (var k = 0; k < j + 1; k++) {
                            val = (valor[o][k]) - (m * valor[l][k]);
                            valor[o][k] = val.toFixed(3);
                        }
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

        console.log(identidadeOrden);

        gerateArrayIdentity(ordem);

        return `<p class="resultReturn">[${x}]</p>`
    }

    function gerateArrayIdentity(ordem) {
        for (let i = 0; i < ordem; i++) {
            for (let j = 0; j < ordem; j++) {
                var newDivIdent = document.createElement("div");
                var newInputIdent = document.createElement("input");
                newDivIdent.setAttribute("class", "row");
                newInputIdent.setAttribute("class", "inputRow");
                newInputIdent.setAttribute("disabled", "disabled");
                newInputIdent.setAttribute("id", `lin${i}col${j}`);
                identityDiv.appendChild(newDivIdent);
                newDivIdent.appendChild(newInputIdent);
            }
            let br = document.createElement("br");
            identityDiv.appendChild(br);
        }
        identidadeOrden.forEach(setIdent);
    }

    function setIdent(item, index) {
        item.forEach(function(elemento, indice) {
            let dir = document.querySelector(`#lin${index}col${indice}`);
            console.log(elemento);
            dir.setAttribute("value", elemento);
        });
    }
})();