document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function handleNumberClick(number) {
        if (waitingForSecondOperand) {
            currentInput = number;
            waitingForSecondOperand = false;
        } else {
            currentInput += number;
        }
        display.value = currentInput;
    }

    function handleOperatorClick(nextOperator) {
        const inputValue = parseFloat(currentInput);
        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }
        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation(firstOperand, inputValue, operator);
            display.value = result;
            firstOperand = result;
        }
        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function performCalculation(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return num2;
        }
    }

    function handleClear() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        display.value = '';
    }

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;
            if (!isNaN(buttonValue) || buttonValue === '.') {
                handleNumberClick(buttonValue);
            } else if (buttonValue === 'C') {
                handleClear();
            } else if (buttonValue === '=') {
                handleOperatorClick(buttonValue);
            } else {
                handleOperatorClick(buttonValue);
            }
        });
    });
});
