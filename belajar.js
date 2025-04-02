var nama ="fahmzy"
let umur ="15"
const hobi ="mencoba hal baru"
console,log(nama, umur, hobi)
    function hitung() {
        let num1 = parseFloat(document.getElementById("num1").value);
        let num2 = parseFloat(document.getElementById("num2").value);
        let operator = document.getElementById("operator").value;
        let hasil;
        if (isNaN(num1) || isNaN(num2)) {
            hasil = "Masukkan angka yang valid!";
        } else {
            switch (operator) {
                case "+":
                    hasil = num1 + num2;
                    break;
                case "-":
                    hasil = num1 - num2;
                    break;
                case "*":
                    hasil = num1 * num2;
                    break;
                case "/":
                    hasil = num2 !== 0 ? num1 / num2 : "Tidak bisa bagi 0!";
                    break;
                default:
                    hasil = "Operator tidak valid!";
            }
        }
}