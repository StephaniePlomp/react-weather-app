import React, { useState, useRef, useEffect } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { toast } from 'react-toastify';
import PlaceIcon from '@mui/icons-material/Place';
import { Tooltip } from '@mui/material';

  
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
    };
    
    const handleLocationClick = () => {
      if (navigator.geolocation) {
        toast.info('Fetching users geolocation...')
        navigator.geolocation.getCurrentPosition(savePosition, noPosition)
      } else {
        noPosition(null)
        toast.info('Geolocation is not supported by this browser')
      }
    };

   const savePosition = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;


    setQuery({
      lat,
      lon,
    });
  }
  
const noPosition= (error) => {
    toast.info('User has not given access to geolocation. You will be redirected to the default location. ')
  }

    const renderAfterCalled = useRef(false);

    useEffect(() => {
      if (!renderAfterCalled.current) {
      handleLocationClick();
    }

    renderAfterCalled.current = true;
    }, [])
  
    return (
      <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        textInputProps={{
          autoFocus: true,
        }}
        searchOptions={{ types: ['locality', 'country'] }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search location here',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer',}
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div className="input-suggestion"
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div className='location-button'>
      <Tooltip 
      title={<p style={{fontSize: ".8rem"}}>Get live location</p>}
      placement="top"
      arrow>
        <PlaceIcon
        onClick={handleLocationClick}
        fontSize='medium'
        cursor= 'pointer'
        />
      </Tooltip>
      </div>
      </>
    );
  }

  export default SearchLocation;


