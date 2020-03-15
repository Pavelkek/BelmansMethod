var Chart = require('chart.js');
drowChart = (labels, data, namesGraph) => {
    let ctx = document.createElement('canvas');
    ctx.id = 'myChart';
    document.body.appendChild(ctx);
    createDataset = (data, namesGraph) => {
        const dataset = [];
        data.forEach((element, index) => {
            if (index % 2 === 0) {
                dataset.push({
                    borderColor: `rgb(${index * 75}, ${index * 25}, ${index * 25})`,
                    fill: false,
                    data: element,
                    label: namesGraph[index]
                });
            } else if (index % 3 === 0) {
                dataset.push({
                    borderColor: `rgb(${index * 25}, ${index * 75}, ${index * 25})`,
                    fill: false,
                    data: element,
                    label: namesGraph[index]
                });
            } else {
                dataset.push({
                    borderColor: `rgb(${index * 25}, ${index * 25}, ${index * 75})`,
                    fill: false,
                    data: element,
                    label: namesGraph[index]
            });
            }
            
        });
        return dataset;
    }
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: createDataset(data, namesGraph),
        },
        options: {
            responsive:false,
            legend: {
                display: false,
            }
        }
    });
}
drowButtonChart = (nameArr, valueArr, namesGraph) => {
    drowChart(nameArr, valueArr, namesGraph);
}

module.exports.drowButtonChart = drowButtonChart;