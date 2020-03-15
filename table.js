var importGraf = require('./grafic.js');
lineBreak = (ancestor) => {
    let br = document.createElement('br');
    ancestor.append(br)
}

inputAlternative = () => {
    let degreeAffiliationDivOld = document.getElementById('degreeAffiliationDiv');
    if (degreeAffiliationDivOld) {
        degreeAffiliationDivOld.remove();
    }
    let alternative = Number(document.getElementById('alternative').value);
    if (alternative) {
        let getInitialDiv = document.getElementById('initialDiv');
        if (getInitialDiv) {
            getInitialDiv.remove();
        }
        let formForInitialValues = document.getElementById('formForInitialValues');
        let initialDiv = document.createElement('div');
        initialDiv.id = 'initialDiv';
        formForInitialValues.append(initialDiv);
        for (let i = 0; i < alternative; i++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.id = `alternative${i + 1}`;
            input.placeholder = `Критерий ${i + 1}`;
            initialDiv.append(input);
        }
        lineBreak(initialDiv);
        let inputCriterionButton = document.createElement('input');
        inputCriterionButton.type = 'button';
        inputCriterionButton.classList.add('readyButton');
        inputCriterionButton.id = 'inputCriterion';
        inputCriterionButton.value = 'Ввести альтернативы';
        inputCriterionButton.addEventListener( "click" , () => inputCriterion(alternative));
        initialDiv.append(inputCriterionButton);
    }
}

inputCriterion = (alternative) => {
    alternativeArr = [];
    for (let i = 0; i < alternative; i++) {
        let alternativeValue = document.getElementById(`alternative${i + 1}`).value;
        alternativeValue !== '' ? alternativeArr.push(alternativeValue) : '';
    }
    if (alternativeArr.length === alternative) {
        let criterion = Number(document.getElementById('criterion').value);
        if (criterion) {
            let getInitialDiv = document.getElementById('initialDiv');
            getInitialDiv.remove();
            let formForInitialValues = document.getElementById('formForInitialValues');
            let initialDiv = document.createElement('div');
            initialDiv.id = 'initialDiv';
            formForInitialValues.append(initialDiv);
            for (let i = 0; i < criterion; i++) {
                let input = document.createElement('input');
                input.type = 'text';
                input.id = `criterion${i + 1}`;
                input.placeholder = `Альтернатива ${i + 1}`;
                initialDiv.append(input);
            }
            lineBreak(initialDiv);
            let createTableButton = document.createElement('input');
            createTableButton.type = 'button';
            createTableButton.classList.add('readyButton');
            createTableButton.id = 'createTable';
            createTableButton.value = 'Построить таблицы';
            createTableButton.addEventListener( "click" , () => createTables(criterion));
            initialDiv.append(createTableButton);
        }
    }
}

addTable = (tableNubmer) => {
    let initialDiv = document.getElementById('initialDiv');
    let table = document.createElement('table');
    table.id = `table${tableNubmer + 1}`;
    table.classList.add('table');
    initialDiv.append(table);
    for(let i = 0; i <= criterionArr.length; i++) {
        let tr = document.createElement('tr');
        tr.id = `${table.id}_tr${i + 1}`;
        table.append(tr);
        for(let j = 0; j <= criterionArr.length; j++) {
            let td = document.createElement('td');
            td.id = `${table.id}_tr${i + 1}_td${j + 1}`;
            tr.append(td);
            let input = document.createElement('input');
            input.type = 'text';
            input.id = `${table.id}_tr${i + 1}_td${j + 1}_input${j + 1}`;
            if (i === 0 && j !== 0) {
                input.value = criterionArr[j - 1];
                input.disabled = true;
            } else if (j === 0 && i !== 0) {
                input.value = criterionArr[i - 1];
                input.disabled = true;
            } else if (i === j && i !== 0 && j !== 0) {
                input.value = 1;
                input.disabled = true;
            } else if (i === j && j === 0) {
                input.value = alternativeArr[tableNubmer];
                input.disabled = true;
            }
            td.append(input);
        }
    }
}

createTables = (criterion) => {
    criterionArr = [];
    for (let i = 0; i < criterion; i++) {
        let criterionValue = document.getElementById(`criterion${i + 1}`).value;
        criterionValue !== '' ? criterionArr.push(criterionValue) : '';
    }
    if (criterionArr.length === criterion) {
        let getInitialDiv = document.getElementById('initialDiv');
        getInitialDiv.remove();
        let formForInitialValues = document.getElementById('formForInitialValues');
        let initialDiv = document.createElement('div');
        initialDiv.id = 'initialDiv';
        formForInitialValues.append(initialDiv);
        for(let i = 0; i < alternativeArr.length; i++) {
            addTable(i);
        }
        lineBreak(initialDiv);
        let inputСalculate = document.createElement('input');
        inputСalculate.type = 'button';
        inputСalculate.classList.add('readyButton');
        inputСalculate.id = 'inputСalculate';
        inputСalculate.value = 'Расчитать степени принадлежности';
        inputСalculate.addEventListener( "click" , () => calculateDegreeAffiliationTables());
        initialDiv.append(inputСalculate);
    }
}

calculateDegreeAffiliationTables = () => {
    createDegreeAffiliationTables();
    fillTables();
    alternativeArr.forEach((item, index) => {
        calculateDegreeAffiliationTable(index + 1);
    })
    createResultTable();
    let minimumsArr = calculateMinimums();
    getRaiting(minimumsArr);
    createDrowChartButton();
}

createDrowChartButton = () => {
    let degreeAffiliationDiv = document.getElementById('degreeAffiliationDiv');
    let drowChartButton = document.createElement('input');
    drowChartButton.id = 'drowChartButton';
    drowChartButton.type = 'button';
    drowChartButton.value = 'Нарисовать график';
    drowChartButton.classList.add('readyButton');
    const valueArr = valueForGraph();
    const nameArr = nameForGraph();
    const nameGrapsArr = nameGraphs();
    drowChartButton.addEventListener( "click" , () => importGraf.drowButtonChart(nameArr, valueArr, nameGrapsArr));
    degreeAffiliationDiv.append(drowChartButton);
}

createResultTable = () => {
    let degreeAffiliationDiv = document.getElementById('degreeAffiliationDiv');
    let resultTable = document.createElement('table');
    resultTable.id = `resultTable`;
    resultTable.classList.add('table');
    resultTable.title = 'result';
    degreeAffiliationDiv.append(resultTable);
    for(let i = 0; i < alternativeArr.length + 1; i++) {
        let tr = document.createElement('tr');
        tr.id = `${resultTable.id}_tr${i + 1}`;
        resultTable.append(tr);
        for(let j = 0; j < criterionArr.length + 1; j++) {
            let td = document.createElement('td');
            td.id = `${resultTable.id}_tr${i + 1}_td${j + 1}`;
            tr.append(td);
            let input = document.createElement('input');
            input.type = 'text';
            input.id = `${resultTable.id}_tr${i + 1}_td${j + 1}_input${j + 1}`;
            if (i === 0 && j === 0) {
                input.disabled = true;
                input.value = 'Случай равновесных критериев';
            } else if (i === 0) {
                input.disabled = true;
                input.value = criterionArr[j - 1];
            } else if (j === 0) {
                input.disabled = true;
                input.value = alternativeArr[i - 1];
            } else {
                input.value = resultArr[(i - 1) * criterionArr.length + j - 1];
            }
            td.append(input);
        }
    }
}

calculateMinimums = () => {
    const minimumsArr = [];
    for (let i = 0; i < criterionArr.length; i++) {
        let minimumStrValue = document.getElementById(`resultTable_tr${2}_td${2 + i}_input${2 + i}`)
            .value;
        for (let j = 0; j < alternativeArr.length; j++) {
            let elementValue = document.getElementById(
                `resultTable_tr${2 + j}_td${2 + i}_input${2 + i}`).value;
            if (minimumStrValue > elementValue) {
                minimumStrValue = elementValue;
            }
        }
        minimumsArr.push(minimumStrValue);
    }
    let resultTable = document.getElementById('resultTable');
    let tr = document.createElement('tr');
    tr.id = `${resultTable.id}_tr${alternativeArr.length + 2}`;
    resultTable.append(tr);
    for(let j = 0; j < criterionArr.length + 1; j++) {
        let td = document.createElement('td');
        td.id = `${resultTable.id}_tr${alternativeArr.length + 2}_td${j + 1}`;
        tr.append(td);
        let input = document.createElement('input');
        input.type = 'text';
        input.id = `${resultTable.id}_tr${alternativeArr.length + 2}_td${j + 1}_input${j + 1}`;
        if (j === 0) {
            input.disabled = true;
            input.value = 'Минимумы';
        } else {
            input.value = minimumsArr[j - 1];
        }
        td.append(input);
    }
    return minimumsArr;
}

getRaiting = (minimumsArr) => {
    this.minimumsArr = minimumsArr.slice();
    minimumsArr.sort((a, b) => b - a);
    let resultTable = document.getElementById('resultTable');
    let tr = document.createElement('tr');
    tr.id = `${resultTable.id}_tr${alternativeArr.length + 2}`;
    resultTable.append(tr);
    for(let j = 0; j < criterionArr.length + 1; j++) {
        let td = document.createElement('td');
        td.id = `${resultTable.id}_tr${alternativeArr.length + 2}_td${j + 1}`;
        tr.append(td);
        let input = document.createElement('input');
        input.type = 'text';
        input.id = `${resultTable.id}_tr${alternativeArr.length + 2}_td${j + 1}_input${j + 1}`;
        if (j === 0) {
            input.disabled = true;
            input.value = 'Рейтинг';
        } else {
            input.value = this.minimumsArr.indexOf(minimumsArr[j - 1]) + 1;
        }
        td.append(input);
    }
}

calculateDegreeAffiliationTable = (tableNubmer) => {
    for (let i = 0; i < criterionArr.length; i++) {
        let degreeAffiliationInCol = 0;
        for (let j = 0; j < criterionArr.length; j++) {
            degreeAffiliationInCol += Number(document.getElementById(`table${tableNubmer}_tr${2 + j}_td${2 + i}_input${2 + i}`).value);
        }
        let tableDegreeAffiliationCol = document.getElementById(`tableDegreeAffiliation${tableNubmer}_tr${2}_td${1 + i}_input${1 + i}`);
        degreeAffiliation = (1 / degreeAffiliationInCol).toFixed(3);
        tableDegreeAffiliationCol.value = degreeAffiliation;
        resultArr.push(degreeAffiliation);
    }
}

fillTables = () => {
    alternativeArr.forEach((item, index) => {
        fillTable(index + 1);
    })
}

fillTable = (tableNubmer) => {
    let tableElementRow = document.getElementById(`table${tableNubmer}_tr${2}_td${3}_input${3}`);
    let tableElementCol = document.getElementById(`table${tableNubmer}_tr${3}_td${2}_input${2}`);
    if (tableElementRow.value) {
        fillTableByRow(tableNubmer);
    } else if (tableElementCol.value) {
        fillTableByCol(tableNubmer);
    }
}

fillTableByRow = (tableNubmer) => {
    valueArr = [];
    for (let i = 0; i < criterionArr.length - 1; i++) {
        let value = document.getElementById(`table${tableNubmer}_tr${2}_td${3 + i}_input${3 + i}`).value;
        value !== '' ? valueArr.push(Number(value)) : '';
    }
    if (valueArr.length === criterionArr.length - 1) {
        for (let i = 1; i < criterionArr.length; i++) {
            let input = document.getElementById(`table${tableNubmer}_tr${2 + i}_td${2}_input${2}`);
            input.value = (1 / Number(document.getElementById(`table${tableNubmer}_tr${2}_td${2 + i}_input${2 + i}`).value)).toFixed(3);
        }
        for (let i = 3; i <= criterionArr.length + 1; i++) {
            for (let j = 4; j <= criterionArr.length + 1; j++) {
                if (j > i) {
                    let input = document.getElementById(`table${tableNubmer}_tr${i}_td${j}_input${j}`);
                    input.value = (valueArr[j - 3] / valueArr[i - 3]).toFixed(3);
                }
            }
        }
        for (let i = 4; i <= criterionArr.length + 1; i++) {
            for (let j = 3; j <= criterionArr.length + 1; j++) {
                if (j < i) {
                    let input = document.getElementById(`table${tableNubmer}_tr${i}_td${j}_input${j}`);
                    input.value = (1 / Number(document.getElementById(`table${tableNubmer}_tr${j}_td${i}_input${i}`).value)).toFixed(3);
                }
            }
        }
    }
}

fillTableByCol = (tableNubmer) => {
    valueArr = [];
    for (let i = 0; i < criterionArr.length - 1; i++) {
        let value = document.getElementById(`table${tableNubmer}_tr${3 + i}_td${2}_input${2}`).value;
        value !== '' ? valueArr.push(Number(value)) : '';
    }
    if (valueArr.length === criterionArr.length - 1) {
        for (let i = 1; i < criterionArr.length; i++) {
            let input = document.getElementById(`table${tableNubmer}_tr${2}_td${2 + i}_input${2 + i}`);
            input.value = (1 / Number(document.getElementById(`table${tableNubmer}_tr${2 + i}_td${2}_input${2}`).value)).toFixed(3);
        }
        for (let i = 4; i <= criterionArr.length + 1; i++) {
            for (let j = 3; j <= criterionArr.length + 1; j++) {
                if (j < i) {
                    let input = document.getElementById(`table${tableNubmer}_tr${i}_td${j}_input${j}`);
                    input.value = (valueArr[i - 3] / valueArr[j - 3]).toFixed(3);
                }
            }
        }
        for (let i = 3; i <= criterionArr.length + 1; i++) {
            for (let j = 4; j <= criterionArr.length + 1; j++) {
                if (j > i) {
                    let input = document.getElementById(`table${tableNubmer}_tr${i}_td${j}_input${j}`);
                    input.value = (1 / Number(document.getElementById(`table${tableNubmer}_tr${j}_td${i}_input${i}`).value)).toFixed(3);
                }
            }
        } 
    }
}

createDegreeAffiliationTables = () => {
    let degreeAffiliationDivOld = document.getElementById('degreeAffiliationDiv');
    if (degreeAffiliationDivOld) {
        degreeAffiliationDivOld.remove();
    }
    let formForInitialValues = document.getElementById('formForInitialValues');
    let degreeAffiliationDiv = document.createElement('div');
    degreeAffiliationDiv.id = 'degreeAffiliationDiv';
    formForInitialValues.append(degreeAffiliationDiv);
    alternativeArr.forEach((item, index) => {
        addDegreeAffiliationTable(item, index);
    });
}

addDegreeAffiliationTable = (item, index) => {
    let degreeAffiliationDiv = document.getElementById('degreeAffiliationDiv');
    let tableDegreeAffiliation = document.createElement('table');
    tableDegreeAffiliation.id = `tableDegreeAffiliation${index + 1}`;
    tableDegreeAffiliation.classList.add('table');
    tableDegreeAffiliation.title = item;
    degreeAffiliationDiv.append(tableDegreeAffiliation);
    for(let i = 0; i < 2; i++) {
        let tr = document.createElement('tr');
        tr.id = `${tableDegreeAffiliation.id}_tr${i + 1}`;
        tableDegreeAffiliation.append(tr);
        for(let j = 0; j < criterionArr.length; j++) {
            let td = document.createElement('td');
            td.id = `${tableDegreeAffiliation.id}_tr${i + 1}_td${j + 1}`;
            tr.append(td);
            let input = document.createElement('input');
            input.type = 'text';
            input.id = `${tableDegreeAffiliation.id}_tr${i + 1}_td${j + 1}_input${j + 1}`;
            if (i === 0) {
                input.value = criterionArr[j];
                input.disabled = true;
            }
            td.append(input);
        }
    }
}

valueForGraph = () => {
    const valueForGraphArr = [];
    for (let i = 0; i < criterionArr.length; i++) {
        valueForGraphArr.push([]);
        for (let j = 0; j < alternativeArr.length; j++) {
            let elementValue = document.getElementById(
                `resultTable_tr${2 + j}_td${2 + i}_input${2 + i}`).value;
                valueForGraphArr[i].push(elementValue);
        }
    }
    return valueForGraphArr;
}

nameForGraph = () => {
    const nameForGraphArr = [];
    for (let j = 0; j < alternativeArr.length; j++) {
        let elementValue = document.getElementById(
            `resultTable_tr${2 + j}_td${1}_input${1}`).value;
            nameForGraphArr.push(elementValue);
    }
    return nameForGraphArr;
}

nameGraphs = () => {
    const nameGraphsArr = [];
    for (let j = 0; j < criterionArr.length; j++) {
        let elementValue = document.getElementById(
            `resultTable_tr${1}_td${2 + j}_input${2 + j}`).value;
            nameGraphsArr.push(elementValue);
    }
    return nameGraphsArr;
}

let inputAlternativeButton = document.getElementById('inputAlternative');
let alternativeArr = [];
let criterionArr = [];
let resultArr = [];
inputAlternativeButton.addEventListener( "click" , () => inputAlternative());
