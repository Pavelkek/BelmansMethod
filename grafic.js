var Chart = require('chart.js');
drowChart = (labels, data) => {
    let ctx = document.createElement('canvas');
    ctx.id = 'myChart';
    document.body.appendChild(ctx);
    createDataset = (data) => {
        const dataset = [];
        data.forEach((element, index) => {
            dataset.push(
                {
                    borderColor: `rgb(${index * 75}, ${index * 75}, ${index * 75})`,
                    fill: false,
                    data: element
                });
        });
        return dataset;
    }
    console.log(data);
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: createDataset(data),
        },
        options: {
            color: [
                'red',    // color for data at index 0
                'blue',   // color for data at index 1
                'green',  // color for data at index 2
                //...
            ],
            responsive:false,
            legend: {
                display: false,
            }
        }
    });
}
input = document.createElement("input");
input.type = "button";
input.value = "Create Chart";
input.addEventListener( "click" , () => drowChart([1,2,3], [[2,15,1], [1, 5, 2], [4, 6, 8]]));
document.body.appendChild(input);
