function gaugeChart(level){

    var degrees = 180 - level,
   radius = .5;
   var radians = degrees * Math.PI / 180;
   var x = radius * Math.cos(radians);
   var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
   var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
   pathX = String(x),
   space = ' ',
   pathY = String(y),
   pathEnd = ' Z';
   var path = mainPath.concat(pathX,space,pathY,pathEnd);

   var data = [{ type: 'scatter',
   x: [0], y:[0],
   marker: {size: 28, color:'850000'},
   showlegend: false,
   name: 'speed',
   text: level,
   hoverinfo: 'text+name'},
   { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
   text: ['8-9', '7-8', '6-7', '5-6',
       '4-5', '3-4','2-3', '1-2', '0-1', ''],
   textinfo: 'text',
   textposition:'inside',
   marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(41, 141, 28, .5)',
                    'rgba(68, 155, 56, .5)', 'rgba(94, 169, 85, .5)',
                    'rgba(121, 183, 115, .5)', 'rgba(147, 198, 141, .5)',
                    'rgba(174, 221, 170, .5)', 'rgba(201, 226, 198, .5)', 
                    'rgba(228, 240, 226, .5)', 'rgba(255, 255, 255, 0)']},
   labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4','2-3', '1-2', '0-1' , ''],
   hoverinfo: 'label',
   hole: .5,
   type: 'pie',
   showlegend: false
   }];

   var layout = {
     shapes:[{
     type: 'path',
     path: path,
     fillcolor: '850000',
     line: {
       color: '850000'
     }
    }],
     height: 700,
     width: 700,
     title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week', 
     xaxis: {zeroline:false, showticklabels:false,
        showgrid: false, range: [-1, 1]},
     yaxis: {zeroline:false, showticklabels:false,
        showgrid: false, range: [-1, 1]}
    };

     Plotly.newPlot('gauge', data, layout);


  
}
