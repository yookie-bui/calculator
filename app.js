const numpadButtons = {'clear-entry': 'CE', 'clear': 'C', 'backspace': '&#8592;', 'percent': '&#37;', 'fraction': '&#185;&#8725;&#8339;', 'square': '&#8339;&#178;', 'square-root': '&#8730;', 'divide': '&#247;', 'seven': 7, 'eight': 8, 'nine': 9, 'multiple': '&#215;', 'four': 4, 'five': 5, 'six': 6, 'subtract': '&#8722;', 'one': 1, 'two': 2, 'three': 3, 'add': '&#43;', 'sign': '&#43;&#8725;&#8722;', 'zero': 0, 'decimal': '.', 'ans': '&#61;' };
const numpadNames = Object.keys(numpadButtons);
const numpadSymbols = Object.values(numpadButtons);
const userInterface = document.getElementById('user-interfaces');
const screenLine1 = document.getElementById('screen-line-1');
const screenLine2 = document.getElementById('screen-line-2');
var numA = 0;
var numB = 0;
var numAinText = numA;
var numBinText = numB;
var line1Text = 0;
var line2Text = 0;
var mathsObj = {'maths': null, 'mathsExp': null};
var currentEntry = null;
var isQuickCal = false;
var isDecimal = false;
var isNegative = false;
var invalidOperator = false;



for (let i = 0; i < 6; i += 1) {
    let features = ['clear-entry', 'clear', 'backspace', 'ans'];
    let basicCals = ['divide', 'multiple', 'subtract', 'add'];
    let row = document.createElement('div');
    row.className = 'row';
    // let height = (100 - 7) / 6;
    let height = 100 / 6;
    row.setAttribute('style', `width: 100%; height: ${height}%;`)
    for (let j = 0; j < 4; j += 1) {
        let btn = document.createElement('button');
        // let width = (100 - 5) / 4;
        let width = 100 / 4
        btn.setAttribute('style', `width: ${width}%; height: 100%;`)
        btn.type = 'button';
        let index = i * 3 + j + i;
        let numpadValue = numpadSymbols[index];
        let numpadName = numpadNames[index];
        btn.name = numpadName;
        btn.innerHTML = numpadValue;
        // btn.setAttribute('onclick', 'toggleOperButtons()');
        btn.disabled = false;
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

        if (numpadName == 'decimal') {
            btn.className = 'decimal';
            btn.style.color = 'black';
        }

        if (numpadName == 'ans') {
            // btn.style.backgroundColor = '#8bb3fb'
            btn.style.backgroundColor = '#FF5B46';
            btn.style.color = 'white';
        }

        if (numpadName == 'sign') {
            btn.style.color = 'black';
        }

        // if (numpadName == 'clear' || numpadName == 'clear-entry') {
        //     btn.style.backgroundColor = '#fb9b8b'
        // }
        row.appendChild(btn);
    }
    userInterface.appendChild(row);
}
const btns = document.querySelectorAll('button');

function entryFormat (num) {
    if (num % 1 === 0) {
        return num
    } else {
        if (num.toString().length < 11) {
            return num
        } else {
            let numArr = num.toString().split("");
            let startIndex = numArr.length - 11;
            let newNumArr = numArr.toSpliced(startIndex, startIndex);
            return Number(newNumArr.join(""));
        }
    }
}

function addDecimalPlaces (num, decimalNum) {
    let newNum = 0;
    let remainder = Number(num) % 1;
    let decimalPlaces = num.toString().split(".")[1].length;
    if (decimalPlaces == 1 && remainder == 0) {
        decimalPlaces = decimalPlaces
    } else {
        decimalPlaces += 1;
    }
    if (!isNegative) {
        newNum = Number(num) + decimalNum / Math.pow(10, decimalPlaces);
    } else {
        newNum = Number(num) - decimalNum / Math.pow(10, decimalPlaces);
    }
    
    return Number(newNum.toFixed(decimalPlaces));
}

function toggleOperButtons () {
    var operatorBtns = document.querySelectorAll('.operator,.decimal,.basicCals');
    if (invalidOperator) {
        Array.from(operatorBtns).forEach(btn => {
            btn.setAttribute('disabled', "");
        })
    } else {
        Array.from(operatorBtns).forEach(btn => {
            btn.disabled = false;
        })
    }
}


class screenFuncs {
    varA = numA;
    varB = numB;
    operatorObj = mathsObj;
    constructor (varA, varB, operatorObj) {
        this.varA = Number(varA);
        this.varB = Number(varB);
        this.operatorObj = operatorObj;
    }

    mathsInText (a, b) {
        if (b != 0) {
            return `${a} ${this.operatorObj['mathsExp']} ${b}`;
        } else if (this.operatorObj['mathsExp'] != null) {
            return `${a} ${this.operatorObj['mathsExp']}`;
        } else {
            return `${a}`;
        }
    }

    mathsInText_2 (mathsType, num) {
        if (mathsType == 'fraction') {
            return `1\/${num}`;
        } else if (mathsType == 'square') {
            return `sqr(${num})`;
        } else if (mathsType == 'square-root') {
            return `&#8730;(${num})`;
        } else if (mathsType == 'percent') {
            return num / 100;
        } else if (mathsType == 'decimal') {
            if (isDecimal == false) {
                return `${num}.` ;
            } else {
                return num;
            }
        } else if (mathsType == 'sign') {
            return (-1) * num;
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
        } else {
            return this.varA;
        }
    }

    quickCalc (num, mathsType) {
        let out = 0;
        if (mathsType == 'percent') {
            out = num / 100;
        } else if (mathsType == 'fraction') {
            out =  1 / num;
        } else if (mathsType == 'square') {
            out = Math.pow(num, 2);
        } else if (mathsType == 'square-root') {
            out = Math.sqrt(num);
        } else if (mathsType == 'sign') {
            out = num * (-1);
        } else if (mathsType == 'decimal') {
            out = parseFloat(num).toFixed(1);
        }
        if (isNaN(out) || !isFinite(out)) {
            invalidOperator = true;
            return
        } else {
            return out;
        }
    }

    mathsUpdate (a, b, newOperatorObj) {
        this.varA = Number(a);
        this.varB = Number(b);
        this.operatorObj = newOperatorObj;
    }

    textLineUpdate (text1, text2) {
        let formatText2 = entryFormat(Number(text2));
        screenLine1.innerHTML = text1;
        screenLine2.innerHTML = formatText2;
        line1Text = text1;
        line2Text = formatText2;
    }

    screenUpdate (a, b, newOperatorObj, text2, btnName) {
        let text1 = '';
        toggleOperButtons();
        if (!invalidOperator) {
            if (Math.abs(Number(a) % 1) == 0) {
                a = parseInt (a);
            } 

            if (Math.abs(Number(b) % 1) == 0 ) {
                b = parseInt (b);
            }
            if (btnName == 'ans') {
                if (currentEntry == 'numB') {
                    currentEntry = null;
                    text1 = this.mathsInText(a, b) + " =";
                    numA = text2;
                    numB = 0;
                    this.mathsUpdate(numA, numB, newOperatorObj);
                } else if (currentEntry == 'numA') {
                    currentEntry = null;
                    numA = text2;
                    numB = 0;
                    this.mathsUpdate(numA, numB, newOperatorObj);
                } else {
                    isDecimal = false;
                    isQuickCal = false;
                    isNegative = false;
                }
            } else if (btnName == 'clear' || (btnName == 'clear-entry' && a == 0)) {
                this.mathsUpdate(numA, numB, newOperatorObj);
                text1 = '';
            } else if (btnName == 'backspace') {
                if (newOperatorObj.maths == null) {
                    text1 = '';
                    text2 = a;
                    this.mathsUpdate(numA, numB, newOperatorObj);
                }
            } else {
                this.mathsUpdate(numA, numB, newOperatorObj);
                text1 = this.mathsInText(a, b);
            }
            this.textLineUpdate(text1, text2); 
        } else {
            this.clear();
            text2 = line2Text;
            text1 = this.mathsInText(a, b);
            this.mathsUpdate(numA, numB, newOperatorObj);
            this.textLineUpdate(text1, text2);
        }
    }

    clear () {
        if (!invalidOperator) {
            line2Text = 0;
        } else {
            line2Text = 'Invalid input';
        }
        numA = 0;
        numB = 0;
        numAinText = 0;
        numBinText = 0;
        mathsObj = {'maths': null, 'mathsExp': null};
        currentEntry = null;
        isDecimal = false;
        isQuickCal = false;
        isNegative = false;
        invalidOperator = false;
    }

    clearEntry (currentEntry) {
        if (currentEntry == null) {
            this.clear();
        } else {
            if (currentEntry == 'numA') {
                numA = 0;
                numAinText = 0;
            } else if (currentEntry == 'numB') {
                numB = 0;
                numBinText = 0;
            }
            line2Text = 0;
        }
        isDecimal = false;
    }



    numReduce (num) {
        let numArr = "";
        let newNumArr = [];
        let newNum = 0; 
        let out = 0;
        numArr = num.toString().split("");
        newNumArr = numArr.toSpliced(numArr.length-1, 1);
        newNum = Number(newNumArr.join(""));
        console.log(newNum);
        out = entryFormat(newNum);
        return out;
    }

    backspacePerformance (num) {
        let out = 0;
        if (!isDecimal) {
            out = this.numReduce(num);
        } else {
            let numArr = num.toString().split(".");
            let decimalValue = Number(numArr[1]);
            console.log(decimalValue);
            if (decimalValue == 0) {
                out = Number(numArr[0]);
            } else {
                numArr[1] = this.numReduce(decimalValue);
                out = Number(numArr.join("."));
            }
            if (out % 1 == 0){
                isDecimal = false;
            }
        }
        return out;
    }

    backspace (currentEntry) {
        if(line1Text.length == 0) {
            this.clear();
        } else {
            if (!isQuickCal) {
                if (currentEntry == null) {
                    numB = 0;
                    mathsObj = {'maths': null, 'mathsExp': null};
                } else {
                    if (currentEntry == 'numA') {
                        numA = this.backspacePerformance(numA);
                        line2Text = numA;
                    } else if (currentEntry == 'numB') {
                        numB = this.backspacePerformance(numB);
                        line2Text = numB;
                    }
                }
            }
        }
    }
}

const screenValues = new screenFuncs(numA, numB, mathsObj);

function mathsUpdate(text, btnType, btnValue) {
    let currentDisplay = Number(screenLine2.innerHTML);
    numAinText = numA;
    numBinText = numB;
    if (btnType == 'numpad') {
        let numValue = parseInt(text);
        if (currentEntry == 'numA') {
            if (!isDecimal) {
                numA = numA * 10 + numValue;
            } else {
                numA = addDecimalPlaces(numA, numValue);
            }
            screenValues.varA = numA;
            currentEntry = 'numA';
            line2Text = numA;
            numAinText = numA;
        } else if (currentEntry == null) {
            numA = numValue;
            screenValues.varA = numA;
            currentEntry = 'numA';
            line2Text = numA;
            numAinText = numA;
        } else {
            if (mathsObj.maths != null) {
                if (!isDecimal) {
                    numB = numB * 10 + numValue;
                } else {
                    numB = addDecimalPlaces(numB, numValue)
                }
                screenValues.varB = numB;
                currentEntry = 'numB';
                line2Text = numB;
                numBinText = numB;
            }
        }
        isQuickCal = false;
    } else if (btnType == 'basicCals' && currentDisplay != 0) {
        if (currentEntry == 'numA' && (numA % 1 == 0)) {
            line2Text = parseInt(numA);
        } else if (currentEntry == 'numB' && (numB % 1 == 0)) {
            line2Text = parseInt(numB);
        }
        mathsObj.maths = btnValue;
        mathsObj.mathsExp = text;
        screenValues.operatorObj = mathsObj;
        currentEntry = 'maths';
        numB = 0;
        numBinText = 0;
        isQuickCal = false;
        isDecimal = false;
        isNegative = false;
        
    } else if ((btnType == 'operator')) {
        if (currentEntry == 'numA' || currentEntry == null) {
            numAinText = screenValues.mathsInText_2(btnValue, numA);
            numA = screenValues.quickCalc(numA, btnValue);
            line2Text = numA;
        } else if (currentEntry == 'numB') {
            numBinText = screenValues.mathsInText_2(btnValue, numB);
            numB = screenValues.quickCalc(numB, btnValue);
            line2Text = numB;
        } else if (currentEntry == 'maths') {
            numBinText = screenValues.mathsInText_2(btnValue, numA);
            numB = screenValues.quickCalc(numA, btnValue);
            line2Text = numB;
            currentEntry = 'numB';
        }
        isQuickCal = true;
        if (btnValue == 'sign') {
            isNegative = !isNegative;
        }
    } else if (btnType == 'decimal') {
        if (currentEntry == 'numA') {
            numAinText = screenValues.mathsInText_2(btnValue, numA);
            numA = screenValues.quickCalc(numA, btnValue);
            line2Text = numAinText;
        } else if (currentEntry == 'numB') {
            numBinText = screenValues.mathsInText_2(btnValue, numB);
            numB = screenValues.quickCalc(numB, btnValue);
            line2Text = numBinText;
        } else if (currentEntry == null || currentEntry == 'maths') {
            numB = 0;
            numBinText = 0;    
            currentEntry = 'numA';
            numAinText = screenValues.mathsInText_2(btnValue, numA);
            numA = screenValues.quickCalc(numA, btnValue);
            line2Text = numAinText;
            mathsObj = {'maths': null, 'mathsExp': null};
        }
        isDecimal = true;
    } 
    // console.log(currentEntry);
    // console.log({isDecimal, isNegative, isQuickCal, invalidOperator});
    // line2Text = entryFormat(Number(line2Text));
    screenValues.screenUpdate(numAinText, numBinText, mathsObj, line2Text, btnValue);
}

Array.from(btns).forEach(btn => {
    btn.addEventListener('click', () => {
        let btnType = btn.className;
        if (btnType == 'feature') {
            if (btn.value == 'ans') {
                let result = screenValues.calc();
                line2Text = result;
                isQuickCal = false;
                mathsObj = {'maths': null, 'mathsExp': null};
                if (result % 1 == 0) {
                    isDecimal = false;
                } else {
                    isDecimal = true;
                }
            } else if (btn.value == 'clear') {
                screenValues.clear();
            } else if (btn.value == 'clear-entry') {
                if (currentEntry == 'numB' && numB == 0 || currentEntry == 'numA' && numA == 0) {
                    currentEntry = null;
                }
                screenValues.clearEntry(currentEntry);
            } else if (btn.value == 'backspace') {
                screenValues.backspace(currentEntry);
            }
            screenValues.screenUpdate(numA, numB, mathsObj, line2Text, btn.value);
        } else {
            if (btnType == 'operator') {
                if (currentEntry == null) {
                    currentEntry = 'numA';
                    mathsObj = {'maths': null, 'mathsExp': null};
                    numB = 0;
                }
            } else if (btnType == 'basicCals') {
                if (currentEntry == 'numB') {
                    numA = screenValues.calc();
                    console.log(numA);
                    currentEntry = 'numA';
                    numB = 0;
                }
            }
            mathsUpdate(btn.innerHTML, btnType, btn.value);
        }
        console.log(screenValues);
        console.log({isDecimal, isNegative, isQuickCal, invalidOperator})
    })
})
