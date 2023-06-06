const numpadButtons = { 'percent': '&#37;', 'clear-entry': 'CE', 'clear': 'C', 'backspace': '&#8592;', 'fraction': '&#185;&#8725;&#8339;', 'power': '&#8339;&#178;', 'square-root': '&#8730;', 'divide': '&#247;', 'seven': 7, 'eight': 8, 'nine': 9, 'multiple': '&#215;', 'four': 4, 'five': 5, 'six': 6, 'subtract': '&#8722;', 'one': 1, 'two': 2, 'three': 3, 'add': '&#43;', 'sign': '&#43;&#8725;&#8722;', 'zero': 0, 'dot': '.', 'ans': '&#61;' };
const numpadNames = Object.keys(numpadButtons);
const numpadSymbols = Object.values(numpadButtons);
const userInterface = document.getElementById('user-interfaces');
const screenLine1 = document.getElementById('screen-line-1');
const screenLine2 = document.getElementById('screen-line-2');
var numA = 0;
var numB = 0;
var line1Text = 0;
var line2Text = 0;
var mathsObj = {'maths': null, 'mathsExp': null};
var currentEntry = null;



for (let i = 0; i < 6; i += 1) {
    let features = ['clear-entry', 'clear', 'backspace', 'ans'];
    let basicCals = ['divide', 'multiple', 'subtract', 'add'];
    let row = document.createElement('div');
    row.className = 'row';
    let height = (100 - 7) / 6;
    row.setAttribute('style', `width: 100%; height: ${height}%;`)
    for (let j = 0; j < 4; j += 1) {
        let btn = document.createElement('button');
        let width = (100 - 5) / 4;
        btn.setAttribute('style', `width: ${width}%; height: 100%;`)
        btn.type = 'button';
        let index = i * 3 + j + i;
        let numpadValue = numpadSymbols[index];
        let numpadName = numpadNames[index];
        btn.name = numpadName;
        btn.innerHTML = numpadValue;
        if (!(isNaN(numpadValue))) {
            btn.value = numpadValue;
            btn.className = 'numpad';
        } else {
            btn.value = numpadName;
            btn.className = 'operator'
        }

        if (features.includes(numpadName)) {
            btn.className = 'feature';
        } else if (basicCals.includes(numpadName)) {
            btn.className = 'basicCals';
        }
        row.appendChild(btn);
    }
    userInterface.appendChild(row);
}
const btns = document.querySelectorAll('button');

class screenFuncs {
    varA = numA;
    varB = numB;
    operatorObj = mathsObj;
    constructor (varA, varB, operatorObj) {
        this.varA = Number(varA);
        this.varB = Number(varB);
        this.operatorObj = operatorObj;
    }

    mathsInText () {
        if (this.varB != 0) {
            return `${this.varA} ${this.operatorObj['mathsExp']} ${this.varB}`;
        } else if (this.operatorObj['mathsExp'] != null) {
            return `${this.varA} ${this.operatorObj['mathsExp']}`;
        } else {
            return `${this.varA}`;
        }
    }

    calc () {
        if (this.operatorObj['maths'] == 'add') {
            return this.varA + this.varB;
        } else if (this.operatorObj['maths'] == 'subtract') {
            return this.varA - this.varB;
        } else if (this.operatorObj['maths'] == 'multiple') {
            return this.varA * this.varB;
        } else if (this.operatorObj['maths'] == 'divide') {
            return this.varA / this.varB;
        }
    }

    quickCalc (num, mathsType) {
        if (mathsType == 'percent') {
            return num / 100;
        } else if (mathsType == 'fraction' && num != 0) {
            return 1 / num;
        } else if (mathsType == 'power') {
            return Math.pow(num, 2);
        } else if (mathsType == 'square-root') {
            return Math.sqrt(num);
        } else if (mathsType == 'sign') {
            return num * (-1);
        }
    }

    mathsUpdate (a, b, newOperatorObj) {
        this.varA = Number(a);
        this.varB = Number(b);
        this.operatorObj = newOperatorObj;
    }

    textLineUpdate (line1Text, line2Text) {
        screenLine1.innerHTML = line1Text;
        screenLine2.innerHTML = line2Text;
    }

    screenUpdate (a, b, newOperatorObj, line2Text, btnName) {
        if (btnName == 'ans') {
            line1Text = this.mathsInText() + " =";
            this.mathsUpdate(a, b, newOperatorObj);
        } else {
            this.mathsUpdate(a, b, newOperatorObj);
            line1Text = this.mathsInText();
        }
        this.textLineUpdate(line1Text, line2Text);
    }

    clear () {
        numA = 0;
        numB = 0;
        mathsObj = {'maths': null, 'mathsExp': null};
        line2Text = 0;
        currentEntry = null;
    }

    clearEntry (currentEntry) {
        if (currentEntry == null) {
            this.clear();
        } else {
            if (currentEntry == 'numA') {
                numA = 0;
            } else if (currentEntry == 'numB') {
                numB = 0;
            }
            line2Text = 0;
        }
    }

    numReduce (num) {
        let numArr = num.toString().split("");
        let newNumArr = numArr.toSpliced(numArr.length-1, 1);
        let newNum = Number(newNumArr.toString());
        return newNum;
    }

    backspace (currentEntry) {
        if (currentEntry == null) {
            this.clear();
        } else {
            if (currentEntry == 'numA') {
                numA = this.numReduce(numA);
                line2Text = numA;
            } else if (currentEntry == 'numB') {
                numB = this.numReduce(numB);
                line2Text = numB;
            }
        }
    }
}

const screenValues = new screenFuncs(numA, numB, mathsObj);

function mathsUpdate(text, btnType, btnValue) {
    let currentDisplay = screenLine1.innerHTML;
    let textLen = currentDisplay.length;
    if (btnType == 'numpad') {
        let numValue = parseInt(text);
        if (!isNaN(currentDisplay)) {
            numA = numA * 10 + numValue;
            screenValues.varA = numA;
            currentEntry = 'numA';
            line2Text = numA;
        } else {
            if (mathsObj.maths != null) {
                numB = numB * 10 + numValue;
                screenValues.varB = numB;
                currentEntry = 'numB';
                line2Text = numB;
            }
        }
    } else if (btnType == 'basicCals' && textLen > 0) {
        mathsObj.maths = btnValue;
        mathsObj.mathsExp = text;
        screenValues.operatorObj = mathsObj;
        currentEntry = 'maths';
    } else if (btnType == 'operator' && (currentEntry == 'numA' || currentEntry == 'numB')) {
        if (currentEntry == 'numA') {
            numA = screenValues.quickCalc(numA, btnValue);
            line2Text = numA;
        } else if (currentEntry == 'numB') {
            numB = screenValues.quickCalc(numB, btnValue);
            line2Text = numA;
        }
    }
    screenValues.screenUpdate(numA, numB, mathsObj, line2Text, btnValue);
}

Array.from(btns).forEach(btn => {
    btn.addEventListener('click', () => {
        let btnType = btn.className;
        if (btnType == 'feature') {
            if (btn.value == 'ans') {
                let result = screenValues.calc();
                line2Text = result;
                numA = result;
                numB = 0;
                mathsObj = {'maths': null, 'mathsExp': null};
                currentEntry = null;
            } else if (btn.value == 'clear') {
                screenValues.clear();
            } else if (btn.value == 'clear-entry') {
                screenValues.clearEntry(currentEntry);
            } else if (btn.value == 'backspace') {
                screenValues.backspace(currentEntry);
            }
            screenValues.screenUpdate(numA, numB, mathsObj, line2Text, btn.value);
        } else {
            mathsUpdate(btn.innerHTML, btnType, btn.value);
        }
    })
})

