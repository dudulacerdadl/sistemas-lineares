(function() {
    var ordemValue = null;
    var generateButton = document.querySelector('#generateButton');
    var button = document.querySelector('#resultButton');
    var matrizButton = document.querySelector('#resultButtonMatriz');
    var resultDiv = document.querySelector('#result');
    var identityDiv = document.querySelector('#identity');
    var matrizLDiv = document.querySelector('#matrizL');
    var matrizUDiv = document.querySelector('#matrizU');
    var inputs = document.querySelector('.inputs');
    var condition = document.querySelector('.condition');
    var values = [];
    var arrayValues = [];
    var results = [];
    var identidade = [];
    var identidadeOrden = [];
    var x = [];
    var arrPivo = [];
    var matrizL = [];
    var matrizU = [];
    var valor;
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
                newInput.setAttribute("required", "");
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
            newInput.setAttribute("required", "");
            condition.appendChild(newDiv);
            newDiv.appendChild(newInput);
            condition.appendChild(br);
        }

        for (var i = 0; i < identidade.length; i = i + parseInt(ordem)) {
            identidadeOrden.push(identidade.slice(i, i + parseInt(ordem)));
        }
    }

    matrizButton.addEventListener("click", function() {
        button.removeAttribute("disabled");
        button.removeAttribute("style");
        returnResult(ordemValue);
    });

    button.addEventListener("click", function() {
        resultDiv.innerHTML = `<p class="resultReturn">[${setX(ordemValue)}]</p>`;
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

        matrizU = execute(arrayValues, ordem, identidadeOrden);
        gerateArrayIdentity(ordem);
        gerateArrayL(ordem);
        gerateArrayU(ordem);
    }

    function execute(array, ordem, identidadeArray) {
        valor = array;

        var i = parseInt(ordem);
        j = i;
        i = i - 1;
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
                arrPivo.push(m);

                for (var k = 0; k < j; k++) {
                    if (valor[o][k] == 0) {

                    } else {
                        for (var k = 0; k < j + 1; k++) {
                            val = (valor[o][k]) - (m * valor[l][k]); //0
                            valor[o][k] = val.toFixed(5);
                        }
                    }
                }
            }

            for (var o = l + 1; o < i + 1; o++) {
                for (var k = 0; k < j; k++) {
                    if (valor[o][k] != 0) {
                        break;
                    } else {
                        a++;
                    }
                }
                if (a > o) {
                    var troca = valor[a];
                    valor[a] = valor[o];
                    valor[o] = troca;
                    variante = ident[a];
                    ident[a] = ident[o];
                    ident[o] = variante;
                    l++
                    break;
                }
            }
        }

        const retorno = valor;

        return retorno;
    }

    function setX(ordem) {
        let i = parseInt(ordem);
        let j = i;
        i = i - 1;

        for (let y = i; y > -1; y--) {
            result = valor[y][j];

            for (let m = 0; m < j; m++) {
                if (m == y) {} else {
                    result = result - valor[y][m];
                }
            }

            x[y] = result / valor[y][y];
            for (let l = i; l > -1; l--) {
                valor[l][y] = x[y] * valor[l][y];
            }
        }

        return x;
    }

    function gerateArrayIdentity(ordem) {
        var title = document.createElement("div");
        title.setAttribute("class", "titleMatriz");
        identityDiv.appendChild(title);
        title.innerHTML = "<p>Matriz Permutação</p>";
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

    function gerateArrayL(ordem) {
        var title = document.createElement("div");
        title.setAttribute("class", "titleMatriz");
        matrizLDiv.appendChild(title);
        title.innerHTML = "<p>Matriz L</p>";
        for (let i = 0; i < ordem; i++) {
            for (let j = 0; j < ordem; j++) {
                var newDivIdent = document.createElement("div");
                var newInputIdent = document.createElement("input");
                newDivIdent.setAttribute("class", "row");
                newInputIdent.setAttribute("class", "inputRow");
                newInputIdent.setAttribute("disabled", "disabled");
                newInputIdent.setAttribute("id", `linha${i}coluna${j}`);
                matrizLDiv.appendChild(newDivIdent);
                newDivIdent.appendChild(newInputIdent);
            }
            let br = document.createElement("br");
            matrizLDiv.appendChild(br);
        }
        matrizL = identidadeOrden;
        matrizL.forEach(setMatrizL);
        matrizL.forEach(orderMatrizL);
        matrizL.forEach(setL);
    }

    function gerateArrayU(ordem) {
        var title = document.createElement("div");
        title.setAttribute("class", "titleMatriz");
        matrizUDiv.appendChild(title);
        title.innerHTML = "<p>Matriz U</p>";
        for (let i = 0; i < ordem; i++) {
            for (let j = 0; j < ordem; j++) {
                var newDivIdent = document.createElement("div");
                var newInputIdent = document.createElement("input");
                newDivIdent.setAttribute("class", "row");
                newInputIdent.setAttribute("class", "inputRow");
                newInputIdent.setAttribute("disabled", "disabled");
                newInputIdent.setAttribute("id", `linhau${i}colunau${j}`);
                matrizUDiv.appendChild(newDivIdent);
                newDivIdent.appendChild(newInputIdent);
            }
            let br = document.createElement("br");
            matrizUDiv.appendChild(br);
        }
        matrizU.forEach(setU);
    }

    function setIdent(item, index) {
        item.forEach(function(elemento, indice) {
            let dir = document.querySelector(`#lin${index}col${indice}`);
            dir.setAttribute("value", elemento);
        });
    }

    function setL(item, index) {
        item.forEach(function(elemento, indice) {
            let dir = document.querySelector(`#linha${index}coluna${indice}`);
            dir.setAttribute("value", elemento);
        });
    }

    function setU(item, index) {
        item.forEach(function(elemento, indice) {
            if (indice < item.length - 1) {
                let dir = document.querySelector(`#linhau${index}colunau${indice}`);
                dir.setAttribute("value", elemento);
            }
        });
    }

    function setMatrizL(item, index) {
        item.forEach(function(elemento, indice) {
            if (indice < index) {
                if (arrPivo[index + indice - 1] === undefined) {
                    matrizL[index][indice] = 1;
                } else {
                    matrizL[index][indice] = arrPivo[index + indice - 1];
                }
            }
        })
    }

    function orderMatrizL(item, index) {
        item.forEach(function(elemento, indice) {
            if (index == indice) {
                if (matrizL[index][indice] != 1) {
                    let temp = matrizL[index + 1];
                    matrizL[index + 1] = matrizL[index];
                    matrizL[index] = temp;
                    matrizL.forEach(orderMatrizL);
                }
            }
        })
    }
})();