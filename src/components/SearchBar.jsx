import React, { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { TextField, Card, CardContent, CardMedia, Typography, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './SearchBar.css'; 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
      const data = await response.json();

      if (data.length === 0) {
        setSearchResults([]);
      } else {
        setSearchResults(data);
      }
      
      setSearchState(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    if(event.target.value === '') setSearchState(false); 
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchEpisodeCount = async () => {
      const episodesDataPromises = searchResults.map(async (result) => {
        const episodesResponse = await fetch(`http://api.tvmaze.com/shows/${result.show.id}/episodes`);
        const episodesData = await episodesResponse.json();
        const numEpisodes = episodesData.length;
        return { ...result, numEpisodes };
      });

      const resultsWithEpisodeCount = await Promise.all(episodesDataPromises);
      setSearchResults(resultsWithEpisodeCount);
    };

    if (searchResults.length > 0) {
      fetchEpisodeCount();
    }
  }, [searchResults]);

  return (
    <div className='container'>  
      <div className="search-bar-container">
        <div className="heading"><h1>Surf Your Shows</h1></div>
        <TextField
          placeholder="Search TV Shows"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              setSearchState(true);
              handleSearch();
            }
          }}
          className="search-box"
          InputProps={{
            style: { border: '2px solid white', backgroundColor: 'white', fontFamily: 'monospace' },
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon onClick={handleSearch} className='search-icon'></SearchRoundedIcon>
              </InputAdornment>
            ),
          }}
        />
        <div className="card-container"> 
          {searchResults.length ? (
            searchResults.map((result) => (
              <Card key={result.show.id} className="card"> 
                <CardMedia
                  component="img"
                  height="360"
                  image={result.show.image ? result.show.image.medium : ""}
                  alt={result.show.name}
                  style={{ objectFit: 'cover', maxHeight: '1000' }}
                />
                
                <CardContent>
                  <Typography variant="h6">{result.show.name}</Typography>
                  <Typography variant="body2">Episode count: {result.numEpisodes ? result.numEpisodes : 'N/A'}</Typography>
                  <Typography variant="body2">First aired: {result.show.premiered ? result.show.premiered : 'N/A'}</Typography>
                  <Typography variant="body2">{result.show.summary ? Parser(result.show.summary.toString()) : 'N/A'}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            searchState && searchTerm ? (
              <Typography variant="body2" style={{ textAlign: 'center', padding: 10, fontSize: 15, fontWeight: 'bold' }}>
                Please search using different keywords.
              </Typography>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;


// import React, { useState } from 'react';
// import Parser from 'html-react-parser';
// import { TextField, Card, CardContent, CardMedia, Typography, InputAdornment } from '@mui/material';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import './SearchBar.css';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
//       const data = await response.json();
//       console.log('API Data:', data); // Added console.log
//       setSearchResults(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className="search-bar-container">
//       <div className="heading">
//         <h1>Surf Your Shows</h1>
//       </div>
//       <TextField
//         placeholder="Search TV Shows"
//         value={searchTerm}
//         onChange={handleInputChange}
//         onKeyPress={(event) => {
//           if (event.key === 'Enter') {
//             handleSearch();
//           }
//         }}
//         className="search-box"
//         InputProps={{
//           style: { border: '2px solid white', backgroundColor: 'white', fontFamily: 'monospace' },
//           endAdornment: (
//             <InputAdornment position="end">
//               <SearchRoundedIcon onClick={handleSearch} className="search-icon" />
//             </InputAdornment>
//           ),
//         }}
//       />
//       <div className="card-container">
//         <Carousel
//           showThumbs={false}
//           showArrows={true}
//           renderArrowPrev={(onClickHandler, hasPrev, label) =>
//             hasPrev && (
//               <button type="button" onClick={onClickHandler} title={label} style={{ zIndex: 1, left: 15 }}>
//                 Previous
//               </button>
//             )
//           }
//           renderArrowNext={(onClickHandler, hasNext, label) =>
//             hasNext && (
//               <button type="button" onClick={onClickHandler} title={label} style={{ zIndex: 1, right: 15 }}>
//                 Next
//               </button>
//             )
//           }
//         >
//           {searchResults.map((result) => (
//             <Card key={result.show.id} className="card">
//               <CardMedia
//                 component="img"
//                 height="360"
//                 image={result.show.image ? result.show.image.medium : ''}
//                 alt={result.show.name}
//                 style={{ objectFit: 'cover', maxHeight: '1000' }}
//               />

//               <CardContent>
//                 <Typography variant="h6">{result.show.name}</Typography>
//                 <Typography variant="body2">
//                   Episode count: {result.show.id.episodes ? result.show.id.episodes : 'N/A'}
//                 </Typography>
//                 <Typography variant="body2">
//                   First aired: {result.show.premiered ? result.show.premiered : 'N/A'}
//                 </Typography>
//                 <Typography variant="body2">
//                      {result.show.summary ? Parser(result.show.summary.toString()) : 'N/A'}</Typography>  
//               </CardContent>
//             </Card>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
