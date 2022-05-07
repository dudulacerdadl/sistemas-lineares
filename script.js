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
            return `<p class = "resultReturn" style="color:red;">Não foi possível realizar o cálclulo</p>`
        }
        let k = getElement('l2c1').value / getElement('l1c1').value;
        let w = getElement('l3c1').value / getElement('l1c1').value;

        let l2c2 = getElement('l2c2').value - k * getElement('l1c2').value;
        let l2c3 = getElement('l2c3').value - k * getElement('l1c3').value;
        let r2 = getElement('r2').value - k * getElement('r1').value;
        let l3c2 = getElement('l3c2').value - w * getElement('l1c2').value;

        let v = l3c2 / l2c2;

        let l3c3 = (getElement('l3c3').value - w * getElement('l1c3').value) - v * l2c3;
        let r3 = (getElement('r3').value - w * getElement('r1').value) - v * r2;

        let z = r3 / l3c3;
        let y = (r2 - l2c3 * z) / l2c2;
        let x = (getElement('r1').value - getElement('l1c2').value * y - getElement('l1c3').value * z) / getElement('l1c1').value;

        return `<p class="resultReturn">[${x}, ${y}, ${z}]</p>`;
    }
})();