(function() {
    var button = document.querySelector('#resultButton');
    var resultDiv = document.querySelector('#result');

    button.addEventListener("click", function() {
        resultDiv.innerHTML = returnResult();
    });

    function getElement(id) {
        return document.querySelector(`#${id}`);
    }

    function returnResult() {
        if (getElement('l1c1').value == 0) {
            return `<p style="color:red; background-color:black;">Não foi possível realizar o cálclulo</p>`
        }
        let k = getElement('l2c1').value / getElement('l1c1').value;
        let w = getElement('l3c1').value / getElement('l1c1').value;

        let l2c1 = 0;
        let l2c2 = getElement('l2c2').value - k * getElement('l1c2').value;
        let l2c3 = getElement('l2c3').value - k * getElement('l1c3').value;
        let l4c2 = getElement('l4c2').value - k * getElement('l4c1').value;
        let l3c1 = 0;
        let l3c2 = getElement('l3c2').value - w * getElement('l1c2').value;
        let l3c3 = getElement('l3c3').value - w * getElement('l1c3').value;
        let l4c3 = getElement('l4c3').value - w * getElement('l4c1').value;

        let v = l3c2 / l2c2;

        l3c3 = l3c3 - v * l2c3;
        l4c3 = l4c3 - v * l4c2;
        l3c2 = 0;
        return ` 
            <table class = "resultTable">
                <tr>
                <td>l1c1: ${getElement('l1c1').value}</td>
                <td>l1c2: ${getElement('l1c2').value}</td>
                <td>l1c3: ${getElement('l1c3').value}</td>
                </tr>
                <tr>
                <td>l2c1: ${l2c1}</td>
                <td>l2c2: ${l2c2}</td>
                <td>l2c3: ${l2c3}</td>
                </tr>
                <tr>
                <td>l3c1: ${l3c1}</td>
                <td>l3c2: ${l3c2}</td>
                <td>l3c3: ${l3c3}</td>
                </tr>
            </table>
            <table class = "resultTable">
                <tr>
                <td>l1c1: ${getElement('l4c1').value}</td>
                <td>l1c2: ${l4c2}</td>
                <td>l1c3: ${l4c3}</td>
                </tr>
            </table>
        `;
    }

    // document.addEventListener("DOMContentLoaded", load, false);
})();