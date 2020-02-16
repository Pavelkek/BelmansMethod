inputAlternative = () => {
    let alternative = Number(document.getElementById('alternative').value);
    if (alternative) {
        let getAlternative = document.getElementById('initialDiv');
        if (getAlternative) {
            getAlternative.remove();
        }
        let formForInitialValues = document.getElementById('formForInitialValues');
        let initialDiv = document.createElement('div');
        initialDiv.id = 'initialDiv';
        formForInitialValues.append(initialDiv);
        for (let i = 0; i < alternative; i++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.id = `alternative${i + 1}`;
            input.placeholder = `Альтернатива ${i + 1}`;
            initialDiv.append(input);
        }
        let br = document.createElement('br');
        let inputCriterionButton = document.createElement('input');
        inputCriterionButton.type = 'button';
        inputCriterionButton.classList.add('readyButton');
        inputCriterionButton.id = 'inputCriterion';
        inputCriterionButton.value = 'Ввести количество критериев';
        inputCriterionButton.addEventListener( "click" , () => inputCriterion(alternative));
        initialDiv.append(br);
        initialDiv.append(inputCriterionButton);
    }
}

inputCriterion = (alternative) => {
    alternativeArr = [];
    for (let i = 0; i < alternative; i++) {
        alternativeValue = document.getElementById(`alternative${i + 1}`).value;
        alternativeValue !== '' ? alternativeArr.push(alternativeValue) : '';
    }
    if (alternativeArr.length === alternative) {
        let criterion = Number(document.getElementById('criterion').value);
        if (criterion) {
            let getCriterion = document.getElementById('initialDiv');
            getCriterion.remove();
            let formForInitialValues = document.getElementById('formForInitialValues');
            let initialDiv = document.createElement('div');
            initialDiv.id = 'initialDiv';
            formForInitialValues.append(initialDiv);
            for (let i = 0; i < criterion; i++) {
                let input = document.createElement('input');
                input.type = 'text';
                input.id = `criterion${i + 1}`;
                input.placeholder = `Критерий ${i + 1}`;
                initialDiv.append(input);
            }
            let br = document.createElement('br');
            let createTableButton = document.createElement('input');
            createTableButton.type = 'button';
            createTableButton.classList.add('readyButton');
            createTableButton.id = 'createTable';
            createTableButton.value = 'Построить таблицу';
            createTableButton.addEventListener( "click" , () => createTable(criterion));
            initialDiv.append(br);
            initialDiv.append(createTableButton);
        }
    }
}

createTable = (criterion) => {
    criterionArr = [];
    for (let i = 0; i < criterion; i++) {
        criterionValue = document.getElementById(`criterion${i + 1}`).value;
        criterionValue !== '' ? criterionArr.push(criterionValue) : '';
    }
}

let inputAlternativeButton = document.getElementById('inputAlternative');
let alternativeArr = [];
let criterionArr = [];
inputAlternativeButton.addEventListener( "click" , () => inputAlternative());

