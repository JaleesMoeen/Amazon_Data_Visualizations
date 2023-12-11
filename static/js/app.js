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
        buildBarChart(brandModel[0]);
        buildBrandBarChart(brandModel[0]);

        buildBrandPieChart();
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
    populateProdcutInfo(brandModel)
    // Call the function to Create Pie Chart
    buildProductPieChart(brandModel)
    buildBarChart(brandModel)
    buildBrandBarChart(brandModel)
    // Call the function to pass the 'patientID' for the 'Bar', 'Bubble' and 'Guage' chart.
    // buildBarChart(patientID);
    // buildBubbleChart(patientID);
    buildBrandPieChart()
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


// No. 5 Defines to create the Bar chart
function buildBarChart(brandModel) {
  d3.json(iphone_samsung_url).then((data) => {
      // Filter data for the selected brand/model
      var filteredData = data.filter(entry => entry.brand_model === brandModel)[0];

      // Extract relevant information for the bar chart
      var starRatings = ['1 star', '2 star', '3 star', '4 star', '5 star'];
      var sample_values = starRatings.map(rating => filteredData[rating]);

      // Create the trace for the bar chart
      var barData = [{
          x: sample_values,
          y: starRatings,
          type: 'bar',
          orientation: 'h',
          marker: {
              color: 'rgb(242, 113, 102)',
          },
      }];

      // Define plot layout
      var barLayout = {
          title: `Star Ratings Distribution for ${brandModel}`,
          xaxis: { title: 'Number of Ratings' },
          yaxis: { title: 'Star Ratings' },
      };

      // Display the plot
      Plotly.newPlot('bar', barData, barLayout);
  });
}


// No. 6 defines for Bar chart for Brand
function buildBrandBarChart(brandModel) {
  d3.json(iphone_samsung_url).then((data) => {
    // Filter data for the Apple brand
    var filteredData = data.filter(entry => entry.brand === 'Apple');

    // Extract star ratings data for each model
    var barData = filteredData.map(entry => {
        return {
            x: Object.keys(entry).filter(key => key !== 'brand_model' && key !== 'brand'),
            y: Object.values(entry).filter((value, index) => index !== 0 && index !== 1),
            type: 'bar',
            name: entry.brand_model,
        };
    });

    // Define plot layout
    var layout = {
        title: 'Bar Chart for Apple Phones',
        xaxis: { title: 'Star Ratings' },
        yaxis: { title: 'Count' },
    };

    // Display the plot
    Plotly.newPlot('brandbar', barData, layout);
});

}


//  No. 7 

function buildBrandPieChart() {
  d3.json(iphone_samsung_url).then((data) => {
      // Filter data for the Apple brand
      var filteredData = data.filter(entry => entry.brand === 'Apple');

      // Extract star ratings and counts from the data
      var pieChartData = {
          "5 star": filteredData.map(entry => entry["5 star"]).reduce((a, b) => a + b, 0),
          "4 star": filteredData.map(entry => entry["4 star"]).reduce((a, b) => a + b, 0),
          "3 star": filteredData.map(entry => entry["3 star"]).reduce((a, b) => a + b, 0),
          "2 star": filteredData.map(entry => entry["2 star"]).reduce((a, b) => a + b, 0),
          "1 star": filteredData.map(entry => entry["1 star"]).reduce((a, b) => a + b, 0),
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
          title: 'Distribution of Star Ratings for Apple Phones',
      };

      // Plot the Pie Chart
      Plotly.newPlot('brandpie', [trace], layout);
  });
}








// //////////////////////////////////////////          Start of   Brand               / ////////////////////////////////

// // No. 1 Defines the function to create the Dashboard activities
// // Select each product using the dropdowns
// function initBrand() {    
//   d3.json(iphone_samsung_url).then(data => {
//       var brand = data.map(entry => entry.brand);
//       var dropdown = d3.select("#visualizationDropdown");
//       // Append an option for each brand model
//       brand.forEach(brand => {
//           dropdown.append("option").text(brand).property("value", pieChart);
//       });
//       // Initial call to update charts with the first brand model
//       // updateCharts(brandModels[0]);
//       // Call the function to populate Product Info
//       // populateProdcutInfo(brandModel[0]);
//       // Call the function to create Pie Chart
//       buildBrandPieChart(brand[0]);
//       // Call all those functions which build the 'Bar', 'Bubble', & 'Gauge' Chart for the Dashboard.
//       // buildBarChart(brand[0]);
//       // buildBubbleChart(brand[0]);
      
//   });
// }


// // Call the function for Dashboard
// initBrand();


// // // No. 2 Defines the function to populate Product Info
// // function  populateProdcutInfo(brandModel) {

// //     var productInfoBox = d3.select("#sample-metadata");
// //     // Fetch data from the current URL
// //     d3.json(iphone_samsung_url).then(data => {
// //         var brandModelData = data.find(entry => entry.brand_model === brandModel);
// //         // Clear the previous data
// //         productInfoBox.html("");
// //         // Display demographic information
// //         var desired_info = ['brand', 'color', 'price', 'storage_capacity'];
// //         desired_info.forEach(key => {
// //             productInfoBox.append("p").text(`${key}: ${brandModelData[key]}`);
// //         });
// //         // Object.entries(brandModelData).desired_info.forEach(([key, value]) => {
// //         //     demographicInfoBox.append("p").text(`${key}: ${value}`);
// //         // });
// //     });
// // }

// // No. 3 Defines the function for OptionChaged 
// function optionBrandChanged() {
//   console.log(brand);
//   // Call the function to populate Demographic info 
//   // populateProdcutInfo(brand);
//   // Call the function to Create Pie Chart
//   buildBrandPieChart();

//   // Call the function to pass the 'patientID' for the 'Bar', 'Bubble' and 'Guage' chart.
//   // buildBarChart(patientID);
//   // buildBubbleChart(patientID);

// }


// // No. 4 Defines to create the Pie Chart for Each Product  star ratings distribution 
// function buildBrandPieChart(){
//   // Read in the JSON data
//   d3.json(iphone_url).then((data => {
//   // Extract star ratings and counts from the data
//   // Extracting data for Pie Chart
// var pieChartData = {
//   "5 star": data.map(entry => entry["5 star"]).reduce((a, b) => a + b, 0),
//   "4 star": data.map(entry => entry["4 star"]).reduce((a, b) => a + b, 0),
//   "3 star": data.map(entry => entry["3 star"]).reduce((a, b) => a + b, 0),
//   "2 star": data.map(entry => entry["2 star"]).reduce((a, b) => a + b, 0),
//   "1 star": data.map(entry => entry["1 star"]).reduce((a, b) => a + b, 0),
// };

// // Create a Pie Chart using Plotly
// var trace = {
//   labels: Object.keys(pieChartData),
//   values: Object.values(pieChartData),
//   type: 'pie',
//   marker: {
//     colors: ['rgb(0, 128, 255)', 'rgb(0, 179, 0)', 'rgb(255, 191, 0)', 'rgb(255, 0, 0)', 'rgb(128, 0, 128)'], // Colors for segments
//   }
// };

// var layout = {
//   title: 'Iphone Distribution of Star Ratings',
// };

// // Plot the Pie Chart
// Plotly.newPlot('pieChart', [trace], layout);

//   }))
// }


/////////////////////////             End of Brand                  ///////////////////////////////





































//////////////////////////////
///////////////////////

// // No. 5 Defines the function to get the data and build the 'Bar' chart.
// function buildBarChart(patientID) {

//     // Read in the JSON data
//       d3.json(url).then((data => {
  
//           // Define samples
//           var samples = data.samples
  
//           // Filter by patient ID
//           var filteredSample = samples.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
  
//           // Create variables for chart
//           // Grab sample_values for the bar chart
//           var sample_values = filteredSample.sample_values
  
//           // Use otu_ids as the labels for bar chart
//           var otu_ids = filteredSample.otu_ids
  
//           // use otu_labels as the hovertext for bar chart
//           var otu_labels = filteredSample.otu_labels
  
//           // BAR CHART
//           // Create the trace
//            var bar_data =[{
//               // Use otu_ids for the x values
//               x: sample_values.slice(0, 10).reverse(),
//               // Use sample_values for the y values
//               y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
//               // Use otu_labels for the text values
//               text: otu_labels.slice(0, 10).reverse(),
//               type: 'bar',
//               orientation: 'h',
//               marker: {
//                   color: 'rgb(242, 113, 102)'
//               },
//           }]
  
//           // Define plot layout
//           var bar_layout = {
//               title: "Top 10 Microbial Species in Belly Buttons",
//               xaxis: { title: "Bacteria Sample Values" },
//               yaxis: { title: "OTU IDs" }
//           };
  
//           // Display plot
//           Plotly.newPlot('bar', bar_data, bar_layout)
          
//       }))
  
  
//   };


// // No. 5 Defines the function to get the data and build the 'Bubbble' chart.
// function buildBubbleChart(patientID) {

//     // Read in the JSON data
//       d3.json(url).then((data => {
  
//           // Define samples
//           var samples = data.samples
  
//           // Filter by patient ID
//           var filteredSample = samples.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
  
//           // Create variables for chart
//           // Grab sample_values for the bar chart
//           var sample_values = filteredSample.sample_values
  
//           // Use otu_ids as the labels for bar chart
//           var otu_ids = filteredSample.otu_ids
  
//           // use otu_labels as the hovertext for bar chart
//           var otu_labels = filteredSample.otu_labels
  
  
//           // BUBBLE CHART
//           // Create the trace
//           var bubble_data = [{
//               // Use otu_ids for the x values
//               x: otu_ids,
//               // Use sample_values for the y values
//               y: sample_values,
//               // Use otu_labels for the text values
//               text: otu_labels,
//               mode: 'markers',
//               marker: {
//                   // Use otu_ids for the marker colors
//                   color: otu_ids,
//                   // Use sample_values for the marker size
//                   size: sample_values,
//                   colorscale: 'YlOrRd'
//               }
//           }];
  
  
//           // Define plot layout
//           var layout = {
//               title: "Belly Button Samples",
//               xaxis: { title: "OTU IDs" },
//               yaxis: { title: "Sample Values" }
//           };
  
//           // Display plot
//           Plotly.newPlot('bubble', bubble_data, layout)
  
          
//       }))
  
  
//   };






