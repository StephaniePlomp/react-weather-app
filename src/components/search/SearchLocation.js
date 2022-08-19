import React, { useState, useContext } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

  
function SearchLocation({ setQuery }) {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({  
    lat: null,
      lon: null,
    });

    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      let lat = latLng[Object.keys(latLng)[0]];
      let lon = latLng[Object.keys(latLng)[1]];

        setCoordinates(latLng);
        setAddress("");
        setQuery({
          lat,
          lon,
        });

    console.log(latLng)
    };
  

    const handleLocationClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
  
          setQuery({
            lat,
            lon,
          });
        });
      }
    };
  
    return (
      <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={{ types: ['locality', 'country'] }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search location',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer',}
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div className="input-suggestion"
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
        <LocationOnOutlinedIcon
        onClick={handleLocationClick}
        fontSize='large'
        cursor= 'pointer'
        />
      </>
    );
  }

  export default SearchLocation;


