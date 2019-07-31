function buildMetadata(sample) {
  url1 = `/metadata/${sample}`
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url1).then(function(metadata){
    var metadata = [metadata];
    console.log(metadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    var dataContainer = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    dataContainer.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    dataPair = []
    Object.entries(metadata).forEach(([key, value])=>{
      dataPair.push(key,value);
    });
    pair = Object.entries(dataPair[1])
    
    // retuen key:value on the panel
    dataContainer.selectAll('p')
    .data(pair)
    .enter()
    .append('p')
    .text(function(d){
      return `${d[0]}:${d[1]}`
    })
    

  });
  // @TODO: Complete the following function that builds the metadata panel
    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  url2 = `/samples/${sample}`
  // Use `d3.json` to fetch the sample data for the plots
  d3.json(url2).then(function(data){
    var data = [data];
    console.log(data);
    otuIds = data[0].otu_ids;
    otuLabels = data[0].otu_labels;
    sampleValues = data[0].sample_values

    // Build a Pie Chart
    var trace1={
      labels: otuIds.slice(0, 10),
      values: sampleValues.slice(0, 10), 
      type: 'pie'
    }
    var data1 = [trace1];
    Plotly.newPlot("pie", data1);

    var trace2 ={
      x : otuIds,
      y : sampleValues,
      mode: "markers",
      marker :{
        size: sampleValues, 
        color: otuIds
      }
    };

    var data2 = [trace2];
    Plotly.newPlot("bubble", data2);


  })
  

  

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
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
