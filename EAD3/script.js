document.addEventListener("DOMContentLoaded", function() {
    const numbers = document.querySelectorAll(".num");
    const operators = document.querySelectorAll(".oper");
    const output = document.getElementById("output");
    const submit = document.getElementById("submit");
    const cancel = document.querySelector(".cancel");

    let currentInput = "";
    let operator = null;
    let firstOperand = null;
    let secondOperand = null;

    // Handle number click
    numbers.forEach(number => {
        number.addEventListener("click", function() {
            if (number.classList.contains("oper") || number.id === "submit" || number.classList.contains("cancel")) return;
            currentInput += number.getAttribute("val");
            output.innerText = currentInput;
        });
    });

    // Handle operator click
    operators.forEach(op => {
        op.addEventListener("click", function() {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                operator = op.innerText;
                currentInput = "";
            } else if (operator) {
                secondOperand = parseFloat(currentInput);
                firstOperand = calculate(firstOperand, secondOperand, operator);
                operator = op.innerText;
                currentInput = "";
                output.innerText = firstOperand;
            }
        });
    });

    // Handle equal (=) click
    submit.addEventListener("click", function() {
        if (operator && firstOperand !== null) {
            secondOperand = parseFloat(currentInput);
            const result = calculate(firstOperand, secondOperand, operator);
            output.innerText = result;
            firstOperand = result;
            currentInput = "";
            operator = null;
        }
    });

    // Handle cancel click
    cancel.addEventListener("click", function() {
        currentInput = "";
        operator = null;
        firstOperand = null;
        secondOperand = null;
        output.innerText = "";
    });

    // Function to perform calculation
    function calculate(operand1, operand2, operator) {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
            default:
                return null;
        }
    }
});
