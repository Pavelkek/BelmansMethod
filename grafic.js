var Chart = require('chart.js');
drowChart = (labels, data) => {
    let ctx = document.createElement('canvas');
    ctx.id = 'myChart';
    document.body.appendChild(ctx);
    createDataset = (data) => {
        const dataset = [];
        data.forEach((element, index) => {
            if (index % 2 === 0) {
                dataset.push({
                    borderColor: `rgb(${index * 75}, ${index * 25}, ${index * 25})`,
                    fill: false,
                    data: element
                });
            } else if (index % 3 === 0) {
                dataset.push({
                    borderColor: `rgb(${index * 25}, ${index * 75}, ${index * 25})`,
                    fill: false,
                    data: element
                });
            } else {
                dataset.push({
                    borderColor: `rgb(${index * 25}, ${index * 25}, ${index * 75})`,
                    fill: false,
                    data: element
            });
            }
            
        });
        return dataset;
    }
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: createDataset(data),
        },
        options: {
            responsive:false,
            legend: {
                display: false,
            }
        }
    });
}
drowButtonChart = () => {
    input = document.createElement("input");
    input.type = "button";
    input.value = "Create Chart";
    input.addEventListener( "click" , () => drowChart([1,2,3], [[2,15,1], [1, 5, 2], [4, 6, 8]]));
    document.body.appendChild(input);
}

