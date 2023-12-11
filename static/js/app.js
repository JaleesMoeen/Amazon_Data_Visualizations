// API endpoints for fetching iPhone, Samsung, and merged details
const iphone_samsung_url = "/api/iphone_samsung_details"
const iphone_url = "/api/iphone_details";
const samsung_url = "/api/samsung_details";

// No. 1 Defines the function to create the Dashboard activities
// Select each product using the dropdown
function initProduct() {    
    d3.json(iphone_samsung_url).then(data => {
        var brandModel = data.map(entry => entry.brand_model);
        var dropdown = d3.select("#selDataset");
        // Append an option for each brand model
        brandModel.forEach(brandModel => {
            dropdown.append("option").text(brandModel).property("value", brandModel);
        });
        // Initial call to update charts with the first brand model
        // updateCharts(brandModels[0]);
        // Call the function to populate Product Info
        populateProdcutInfo(brandModel[0]);
        // Call the function to create Pie Chart
        buildProductPieChart(brandModel[0]);
        // Call all those functions which build the 'Bar', 'Bubble', & 'Gauge' Chart for the Dashboard.
        // buildBarChart(brandModel[0]);
        // buildBubbleChart(brandModel[0]);
        
    });
  
}

// Call the function for Dashboard
initProduct();


// No. 2 Defines the function to populate Product Info
function  populateProdcutInfo(brandModel) {

  var demographicInfoBox = d3.select("#sample-metadata");
  // Fetch data from the current URL
  d3.json(iphone_samsung_url).then(data => {
      var brandModelData = data.find(entry => entry.brand_model === brandModel);
      // Clear the previous data
      demographicInfoBox.html("");
      // Display specific demographic information
      var desired_info = ['brand', 'color', 'price', 'storage_capacity'];
      desired_info.forEach(key => {
          demographicInfoBox.append("p").text(`${key}: ${brandModelData[key]}`);
      });
  });
}

// No. 3 Defines the function for OptionChaged 
function optionProductChanged(brandModel) {
    console.log(brandModel);
    // Call the function to populate Demographic info 
    populateProdcutInfo(brandModel);
    // Call the function to Create Pie Chart
    buildProductPieChart(brandModel)
    // Call the function to pass the 'patientID' for the 'Bar', 'Bubble' and 'Guage' chart.
    // buildBarChart(patientID);
    // buildBubbleChart(patientID);

}


// No. 4 Defines to create the Pie Chart for Each Product  star ratings distribution 
function buildProductPieChart(){
  // Read in the JSON data
  d3.json(iphone_samsung_url).then((data => {
  // Extract star ratings and counts from the data
  // Extracting data for Pie Chart
var pieChartData = {
  "5 star": data.map(entry => entry["5 star"]).reduce((a, b) => a + b, 0),
  "4 star": data.map(entry => entry["4 star"]).reduce((a, b) => a + b, 0),
  "3 star": data.map(entry => entry["3 star"]).reduce((a, b) => a + b, 0),
  "2 star": data.map(entry => entry["2 star"]).reduce((a, b) => a + b, 0),
  "1 star": data.map(entry => entry["1 star"]).reduce((a, b) => a + b, 0),
};

// Create a Pie Chart using Plotly
var trace = {
  labels: Object.keys(pieChartData),
  values: Object.values(pieChartData),
  type: 'pie',
  marker: {
    colors: ['rgb(0, 128, 255)', 'rgb(0, 179, 0)', 'rgb(255, 191, 0)', 'rgb(255, 0, 0)', 'rgb(128, 0, 128)'], // Colors for segments
  }
};

var layout = {
  title: 'Iphone Distribution of Star Ratings',
};

// Plot the Pie Chart
Plotly.newPlot('pieProduct', [trace], layout);

  }))
}







