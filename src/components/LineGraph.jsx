import React from "react";
import Plot from "react-plotly.js";

const LineGraph = ({ data, selectedChoice }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const typeCounts = data.reduce((counts, item) => {
    if (selectedChoice === "type" || selectedChoice === "language") {
      const choice = item[selectedChoice];
      counts[choice] = (counts[choice] || 0) + 1;
    } 
    
    else if (selectedChoice === "country") {

      const country = item.network?.country?.name;
      if (country) counts[country] = (counts[country] || 0) + 1;
      console.log("hello");

    } else if (selectedChoice === "genre") {
      const genres = item.genres;

      genres.forEach((genre) => {
        counts[genre] = (counts[genre] || 0) + 1;
      });
      console.log(genres);
    }
    return counts;
  }, {});

  const Labels = Object.keys(typeCounts);
  const Counts = Object.values(typeCounts);

  return (
    <div>
      <Plot
        data={[
          {
            x: Labels,

            y: Counts,

            type: 'line',

            mode: "lines+markers",

            marker: { color: "red" },
          },

        ]}
        layout={{ width: 800, height: 320, title: selectedChoice + " Line Graph" }}
      />
    </div>
  );

};

export default LineGraph;



// import React from "react";
// import { Chart, CategoryScale } from "chart.js/auto";
// import { Line} from "react-chartjs-2";

// const LineGraph = ({ data, selectedChoice }) => {
//   if (!data) {
//     return <div>No data available</div>;
//   }

//   // Count the number of unique types.
//   const uniqueTypes = data
//     .map((item) => item[selectedChoice])
//     .filter((item, index, self) => self.indexOf(item) === index).length;

//   // Create a new array of objects with the type as the key and the count as the value.
//   const typeCounts = data.reduce((counts, item) => {
//     const choice = item[selectedChoice];
//     counts[choice] = (counts[choice] || 0) + 1;
//     return counts;
//   }, {});

//   const chartData = {
//     labels: Object.keys(typeCounts),
//     datasets: [
//       {
//         label: 'Line Graph Data',
//         data: Object.values(typeCounts),
//         fill: false,
//         borderColor: 'rgba(75,192,192,1)',
//         // tension: 0.1,
//       },
//     ],
//   };

  
//   const chartOptions = {
//     maintainAspectRatio: false, // Set to false to allow custom height and width
//     responsive: true,
//     height: 400, // Set the desired height
//     width: 500, // Set the desired width
//   };

//   console.log({chartData});
//   return <Line data={chartData} options={chartOptions} />;
// };

// export default LineGraph;
