function buildMetadata(sample) {
  url1 = `/metadata/${sample}`;
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url1).then(function(metadata){
    var metadata = [metadata];

    // Use d3 to select the panel with id of `#sample-metadata`
    var dataContainer = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    dataContainer.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    dataPair = [];
    Object.entries(metadata).forEach(([key, value])=>{
      dataPair.push(key,value);
    });
    pair = Object.entries(dataPair[1]);
    console.log(pair[5][1]);
    // retuen key:value on the panel
    dataContainer.selectAll('p')
    .data(pair)
    .enter()
    .append('p')
    .text(function(d){
      return `${d[0]}:${d[1]}`;
    });
    
    // set level for gauge plot
   var level = pair[5][1]*20;
    // call gauge plot
    gaugeChart(level);
  });
}

function buildCharts(sample) {
  url2 = `/samples/${sample}`;
  // Use `d3.json` to fetch the sample data for the plots
  d3.json(url2).then(function(data){
    var data = [data];
    otuIds = data[0].otu_ids;
    otuLabels = data[0].otu_labels;
    sampleValues = data[0].sample_values;

    // Build a Pie Chart
    var trace1={
      labels: otuIds.slice(0, 10),
      values: sampleValues.slice(0, 10), 
      textinfo: 'values', 
      text: otuLabels.slice(0, 10),
      hoverinfo: 'text',
      type: 'pie'
    };
    var data1 = [trace1];
    Plotly.newPlot("pie", data1);

    // Build a Bubble Chart using the sample data
    var trace2 ={
      x : otuIds,
      y : sampleValues,
      text: otuLabels,
      mode: "markers",
      marker :{
        size: sampleValues, 
        color: otuIds
      }
    };
    
    var layout2 ={
      xaxis: { title: "OTU ID" },
    };
    var data2 = [trace2];
    Plotly.newPlot("bubble", data2, layout2);


  });
  
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
