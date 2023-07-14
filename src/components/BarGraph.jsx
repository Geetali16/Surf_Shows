import React, {useState, useEffect} from "react";
import Plot from "react-plotly.js";

const BarGraph = ({ data, selectedChoice }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  // const [episodeCounts, setEpisodeCounts] = useState(null);

  // useEffect(() => {
  //   const fetchEpisodeCounts = async () => {
  //     const episodeCountsPromises = data.map(async (result) => {
  //       const episodesResponse = await fetch(`http://api.tvmaze.com/shows/${result.show.id}/episodes`);
  //       const episodesData = await episodesResponse.json();
  //       const numEpisodes = episodesData.length;
  //       return { ...result, numEpisodes };
  //     });

  //     const resultsWithEpisodeCount = await Promise.all(episodeCountsPromises);
  //     setEpisodeCounts(resultsWithEpisodeCount);
  //   };

  //   if (selectedChoice === "episodeCount" && data) {
  //     fetchEpisodeCounts();
  //   }
  // }, [data, selectedChoice]);



  const typeCounts = data.reduce((counts, item) => {

    if (selectedChoice === "type" || selectedChoice === "language") {

      const choice = item[selectedChoice];
      counts[choice] = (counts[choice] || 0) + 1;

    } else if (selectedChoice === "country") {

      const country = item.network?.country?.name;
      if (country) counts[country] = (counts[country] || 0) + 1;
      console.log("hello");

    } else if (selectedChoice === "genre") {

      const genres = item.genres;
      genres.forEach((genre) => {
        counts[genre] = (counts[genre] || 0) + 1;
      });
      console.log(genres);

    } else if (selectedChoice === 'episodeCount') {
      console.log(data);
      console.log('ki');
      // episodeCounts.forEach((countData) => {
      //   const { show, numEpisodes } = countData;
      //   const choice = show[selectedChoice];
      //   counts[choice] = (counts[choice] || 0) + numEpisodes;
      // });
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
            x: Labels,

            y: Counts,

            type: "bar",

            mode: "lines+markers",

            marker: { color: "lightblue" },
          },
        ]}

        layout={{ width: 700, height: 300, title: "Bar Graph" }}
      />
    </div>
  );
};

export default BarGraph;



// import React, { useEffect, useState } from "react";
// import Plot from "react-plotly.js";

// const BarGraph = ({ data, selectedChoice }) => {
//   const [episodeCounts, setEpisodeCounts] = useState(null);

//   useEffect(() => {
//     const fetchEpisodeCounts = async () => {
//       const episodeCountsPromises = data.map(async (result) => {
//         if (result.show && result.show.id) {
//           const episodesResponse = await fetch(`http://api.tvmaze.com/shows/${result.show.id}/episodes`);
//           const episodesData = await episodesResponse.json();
//           const numEpisodes = episodesData.length;
//           return { ...result, numEpisodes };
//         }
//         return result;
//       });

//       const resultsWithEpisodeCount = await Promise.all(episodeCountsPromises);
//       setEpisodeCounts(resultsWithEpisodeCount);
//       console.log(episodeCounts);
//     };

//     if (selectedChoice === "episodeCount" && data) {
//       fetchEpisodeCounts();
//       console.log(episodeCounts);
//     }
//   }, [data, selectedChoice]);

//   if (!data) {
//     return <div>No data available</div>;
//   }

//   const typeCounts = data.reduce((counts, item) => {

//     if (selectedChoice === "type" || selectedChoice === "language") {

//       const choice = item[selectedChoice];
//       counts[choice] = (counts[choice] || 0) + 1;

//     } else if (selectedChoice === "country") {

//       const country = item.network?.country?.name;
//       if (country) counts[country] = (counts[country] || 0) + 1;

//     } else if (selectedChoice === "genre") {

//       const genres = item.genres;
//       genres.forEach((genre) => {
//         counts[genre] = (counts[genre] || 0) + 1;

//       });
//     } 
//     else if (selectedChoice === "episodeCount" && episodeCounts) {

//       episodeCounts.forEach((countData) => {
//         const { show, numEpisodes } = countData;
//         const choice = show[selectedChoice];
//         counts[choice] = (counts[choice] || 0) + numEpisodes;

//       });
//     }

//     return counts;

//   }, {});

//   const Labels = Object.keys(typeCounts);
//   const Counts = Object.values(typeCounts);

//   return (

//     <div>

//       <Plot

//         data={[
//           {
//             x: Labels,

//             y: Counts,

//             type: "bar",

//             mode: "lines+markers",

//             marker: { color: "lightblue" },

//           },
//         ]}

//         layout={{ width: 700, height: 300, title: "Bar Graph" }}

//       />

//     </div>

//   );
// };

// export default BarGraph;
