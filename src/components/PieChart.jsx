
import React from "react";
import Plot from "react-plotly.js";

const PieChart = ({ data, selectedChoice }) => {
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
  console.log({ Labels, Counts });

  return (
    <div>
      <Plot
        data={[
          {
            labels: Labels,

            values: Counts,

            type: "pie",
          },

        ]}
        layout={{ width: 600, height: 400, title: "Pie Chart" }}
      />
    </div>
  );

};

export default PieChart;