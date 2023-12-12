
//////////////////////////////////////////////      Sweeet Library           /////////////////////////////////////////////////

function showSweetAlert() {
  Swal.fire({
    title: "Unlock the Power of Data Insights!",
      timer: 3000, // Auto close after 3 seconds
      icon: 'success',
      html: "Where data meets design",
      showConfirmButton: false, // Hide the "OK" button
  });
}

// Trigger the Sweet Alert when the page loads
window.onload = function() {
  showSweetAlert();
};


// API endpoints for fetching iPhone, Samsung, and merged details
const iphone_samsung_url = "/api/iphone_samsung_details"
const iphone_url = "/api/iphone_details";
const samsung_url = "/api/samsung_details";

///////////////////////////////////    Start of Product            ///////////////////////////////////

// No. 1 Defines the function to create the Dashboard activities
// Select each product using the dropdown
function initProduct() {    

  // Start of Product dropdown
    d3.json(iphone_samsung_url).then(data => {
        var brandModel = data.map(entry => entry.brand_model);
        var dropdown = d3.select("#selDataset");
        // Append an option for each brand model
        brandModel.forEach(brandModel => {
            dropdown.append("option").text(brandModel).property("value", brandModel);
        });        
        // Call the function for Each Product 
        populateProdcutInfo(brandModel[0]);
        buildProductPieChart(brandModel[0]);
        buildProductBarChart(brandModel[0]);


        // Call the function for Apple Brand
        buildAppleBarChart(brandModel[0]);
        buildApplePieChart();
        buildApplePriceBarChart();

        // Call the function for Samsung Brand
        buildSamsungBarChart(brandModel[0]);
        buildSamsungPieChart();
        buildSamsungPriceBarChart();


        // Call the function for Line Model Year
        buildBrandModelLineChart();

        // Call the function for Brand Bubble Chart 
        buildBrandBubbleChart();
        
    }); 
  // End of Product Drop Down
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

   // Call the function for Each Product 
    populateProdcutInfo(brandModel);
    buildProductPieChart(brandModel);
    buildProductBarChart(brandModel);
    
    // // Call the function for Apple Brand
    // buildAppleBarChart(brandModel);
    // buildApplePieChart();

    // // Call the function for Samsung Brand
    // buildSamsungBarChart(brandModel);
    // buildSamsungPieChart();

}


// No. 4 Defines to create the Pie Chart for Each Product star ratings distribution 
function buildProductPieChart(brandModel) {
  // Read in the JSON data
  d3.json(iphone_samsung_url).then((data) => {
    // Filter data for the selected brand/model
    var filteredData = data.filter(entry => entry.brand_model === brandModel)[0];

    // Extract star ratings and counts from the data
    var pieChartData = {
      "5 star": filteredData["5 star"],
      "4 star": filteredData["4 star"],
      "3 star": filteredData["3 star"],
      "2 star": filteredData["2 star"],
      "1 star": filteredData["1 star"],
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
      title: `Distribution of Star Ratings for ${brandModel}`,
    };

    // Plot the Pie Chart
    Plotly.newPlot('pieProduct', [trace], layout);
  });
}
// No. 5 Defines to create the Bar chart
function buildProductBarChart(brandModel) {
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
            color: 'rgb(242, 113, 102)' //'rgb(242, 113, 102)',
          },
      }];

      // Define plot layout
      var barLayout = {
          title: `Star Ratings Distribution for ${brandModel}`,
          xaxis: { title: 'Number of Ratings' },
          yaxis: { title: 'Star Ratings' },
      };

      // Display the plot
      Plotly.newPlot('barProduct', barData, barLayout);
  });
}


//////////////////////////////////////////////       Apple        ///////////////////////////////////////////////
// No. 6 defines for Bar chart for Brand
function buildAppleBarChart(brandModel) {
  d3.json(iphone_url).then((data) => {
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
    Plotly.newPlot('applebar', barData, layout);
});

}

//  No. 7 
function buildApplePieChart(brandModel) {
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
      Plotly.newPlot('applepie', [trace], layout);
  });
}

function buildApplePriceBarChart() {
  // Fetch data from the specified URL
  d3.json(iphone_url).then(data => {
      // Extract brand_model and price data
      var brandModels = data.map(entry => entry.brand_model);
      var prices = data.map(entry => entry.price);

      // Create the trace for the bar chart
      var trace = {
          x: brandModels,
          y: prices,
          type: 'bar',
          marker: {
              color: 'rgb(242, 113, 102)',
          },
      };

      // Define plot layout
      var layout = {
          title: 'Price Bar Chart for Apple IPhones',
          xaxis: { title: 'Brand Model' },
          yaxis: {
            title: 'Price',
                tickformat: '$,.2f', // Format ticks as dollars with two decimal places
                automargin: true // Add margin to the left of y-axis labels
        },
      };
      // Display the plot
      Plotly.newPlot('applepricebar', [trace], layout);
  });
}





//////////////////////////////////////////////       Samsung      ///////////////////////////////////////////////
function buildSamsungBarChart(brandModel) {
  d3.json(iphone_samsung_url).then((data) => {
    // Filter data for the Apple brand
    var filteredData = data.filter(entry => entry.brand === 'Samsung');

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
        title: 'Bar Chart for Samsung Phones',
        xaxis: { title: 'Star Ratings' },
        yaxis: { title: 'Count' },
    };

    // Display the plot
    Plotly.newPlot('samsungbar', barData, layout);
});

}

function buildSamsungPieChart(brandModel) {
  d3.json(iphone_samsung_url).then((data) => {
      // Filter data for the Apple brand
      var filteredData = data.filter(entry => entry.brand === 'Samsung');

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
          title: 'Distribution of Star Ratings for Samsung Phones',
      };

      // Plot the Pie Chart
      Plotly.newPlot('samsungpie', [trace], layout);
  });
}

function buildSamsungPriceBarChart() {
  // Fetch data from the specified URL
  d3.json(samsung_url).then(data => {
      // Extract brand_model and price data
      var brandModels = data.map(entry => entry.brand_model);
      var prices = data.map(entry => entry.price);

      // Create the trace for the bar chart
      var trace = {
          x: brandModels,
          y: prices,
          type: 'bar',
          marker: {
              color: 'rgb(242, 113, 102)',
          },
      };

      // Define plot layout
      var layout = {
          title: 'Price Bar Chart for Samsung',
          xaxis: { title: 'Brand Model' },
          yaxis: {
            title: 'Price',
                tickformat: '$,.2f', // Format ticks as dollars with two decimal places
                automargin: true, // Add margin to the left of y-axis labels
        },
      };
      // Display the plot
      Plotly.newPlot('samsungpricebar', [trace], layout);
  });
}


////////////////////////////////////////////////////////   Line Chart for Both Brands //////////////////////

function buildBrandModelLineChart() {
  d3.json(iphone_samsung_url).then((data) => {
    // Filter data for Apple and Samsung brands
    var appleData = data.filter(entry => entry.brand === 'Apple');
    var samsungData = data.filter(entry => entry.brand === 'Samsung');

    // Create traces for Apple and Samsung
    var appleTrace = {
      x: appleData.map(entry => entry.model_year),
      y: appleData.map(entry => entry.price),
      mode: 'lines+markers',
      name: 'Apple',
      text: appleData.map(entry => `${entry.brand_model}<br>$${entry.price.toFixed(2)}`), // Concatenate brand_model and price in the text property
      hoverinfo: 'text',  // Show only the custom text when hovering over a marker
    };

    var samsungTrace = {
      x: samsungData.map(entry => entry.model_year),
      y: samsungData.map(entry => entry.price),
      mode: 'lines+markers',
      name: 'Samsung',
      text: samsungData.map(entry => `${entry.brand_model}<br>$${entry.price.toFixed(2)}`), // Concatenate brand_model and price in the text property
      hoverinfo: 'text',  // Show only the custom text when hovering over a marker
    };

    // Layout settings
    var layout = {
      title: 'Line Chart for Brand Models Over Model Years',
      xaxis: {  title: 'Model Year',
      tickmode: 'array',
      tickvals: appleData.map(entry => entry.model_year), // Set tick values to the actual model years
      ticktext: appleData.map(entry => entry.model_year), // Set tick text to the actual model years
      tickvals: samsungData.map(entry => entry.model_year), // Set tick values to the actual model years
      ticktext: samsungData.map(entry => entry.model_year), // Set tick text to the actual model years
    },
      yaxis: { title: 'Price',
      tickformat: '$,.2f', // Format ticks as dollars with two decimal places
      automargin: true // Add margin to the left of y-axis labels
     },
      margin: {
        l: 50,  // increase left margin
        r: 50,  // increase right margin
        t: 50,  // increase top margin
        b: 50,  // increase bottom margin
      },
      showgrid: false,  // hide background grid
    };

    // Create the line chart
    Plotly.newPlot('lineChart', [appleTrace, samsungTrace], layout);
  });
}



//////////////////////////////////////// Bubble Chart for Both Brands  //////////////////////////////////////


// Function to build a bubble chart for Apple and Samsung brand models
function buildBrandBubbleChart() {
  d3.json(iphone_samsung_url).then((data) => {
    // Filter data for Apple and Samsung brands
    var appleData = data.filter(entry => entry.brand === 'Apple');
    var samsungData = data.filter(entry => entry.brand === 'Samsung');

    // Create traces for Apple and Samsung
    var appleTrace = {
      x: appleData.map(entry => entry.number_of_global_ratings),
      y: appleData.map(entry => entry.price),
      text: appleData.map(entry => entry.brand_model),
      mode: 'markers',
      marker: {
        size: appleData.map(entry => entry.star_ratings * 1), // Scale the size by star ratings
        sizemode: 'diameter',
        sizeref: 0.1,
        color: 'rgb(255, 65, 54)',  // Adjust color as needed
      },
      name: 'Apple',
    };

    var samsungTrace = {
      x: samsungData.map(entry => entry.number_of_global_ratings),
      y: samsungData.map(entry => entry.price),
      text: samsungData.map(entry => entry.brand_model),
      mode: 'markers',
      marker: {
        size: samsungData.map(entry => entry.star_ratings * 1), // Scale the size by star ratings
        sizemode: 'diameter',
        sizeref: 0.1,
        color: 'rgb(255, 144, 14)', // Adjust color as needed
      },
      name: 'Samsung',
    };
    
    // Layout settings
    var layout = {
      title: 'Bubble Chart for Brand Models',
      xaxis: { title: 'Global Ratings' },
      yaxis: { title: 'Price ($) ' },
      showlegend: true,
    };

    // Create the bubble chart
    Plotly.newPlot('bubbleChart', [appleTrace, samsungTrace], layout);
  });
}














///////////////////////////////////   End of Product            ///////////////////////////////////
