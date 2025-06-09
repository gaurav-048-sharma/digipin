import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import axios from 'axios';

function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 10); // Zoom to the selected/decoded location
    }
  }, [position, map]);
  return null;
}

function MapClickHandler({ onClick }) {
  const map = useMap();
  useMapEvents({
    click(e) {
      onClick(e.latlng);
      map.setView(e.latlng, 10); // Center map on click
    },
  });
  
  return null;
}

function Map() {
  const [position, setPosition] = useState(null);
  const [digiPin, setDigiPin] = useState('');
  const [decodedCoords, setDecodedCoords] = useState(null);
  const [error, setError] = useState('');
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');

  const handleMapClick = (latlng) => {
    setPosition(latlng);
    setLatInput(latlng.lat.toFixed(6));
    setLngInput(latlng.lng.toFixed(6));
    setError('');
    setDigiPin('');
    setDecodedCoords(null);
  };

  const handleSetCoordinates = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    if (isNaN(lat) || isNaN(lng)) {
      setError('Please enter valid latitude and longitude values');
      return;
    }
    if (lat < 2.5 || lat > 38.5) {
      setError('Latitude must be between 2.5 and 38.5');
      return;
    }
    if (lng < 63.5 || lng > 99.5) {
      setError('Longitude must be between 63.5 and 99.5');
      return;
    }
    setPosition({ lat, lng });
    setError('');
    setDigiPin('');
    setDecodedCoords(null);
  };

  const handleEncode = async () => {
    if (!position) {
      setError('Please select a location on the map or enter coordinates');
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/digipin/encode`, {
        latitude: position.lat,
        longitude: position.lng,
        includeHyphens,
      });
      console.log("API URL:", import.meta.env.VITE_API_URL);
      setDigiPin(response.data.digipin);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to encode coordinates');
    }
  };

  const handleDecode = async () => {
    if (!digiPin) {
      setError('Please enter a DigiPin code');
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/digipin/decode`, {
        digipin: digiPin,
      });
      setDecodedCoords(response.data);
      setPosition({ lat: parseFloat(response.data.latitude), lng: parseFloat(response.data.longitude) });
      setLatInput(response.data.latitude);
      setLngInput(response.data.longitude);
      setError('');
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to decode DigiPin');
    }
  };

//   function MapClickHandler({ onClick }) {
//     handleEncode();
//   const map = useMap();
//   useMapEvents({
//     click(e) {
//       onClick(e.latlng);
//       map.setView(e.latlng, 10); // Center map on click
//     },
//   });
  
//   return null;
// }

  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-b bg-amber-50 min-h-screen rounded-lg shadow-md ">
      <h1 className="text-4xl font-bold bg-amber-50 text-blue-800 mb-6 text-center">DigiPin Map Explorer</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-amber-50">
        <Card className="shadow-lg">
          {/* <CardHeader>
            <CardTitle className="text-2xl text-blue-700">Interactive Map</CardTitle>
          </CardHeader> */}
          <CardContent>
            <MapContainer
              center={[20.5937, 78.9629]} // Center of India
              zoom={5}
              style={{ height: '500px', width: '100%' }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {position && <Marker position={position} />}
              <MapClickHandler onClick={handleMapClick} />
              <MapUpdater position={position} />
            </MapContainer>
            <div className="mt-4 space-y-4">
              {position && (
                <p className="text-gray-700">
                  Selected: <span className="font-semibold">Lat {position.lat.toFixed(6)}, Lng {position.lng.toFixed(6)}</span>
                </p>
              )}
              


            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">DigiPin Encoder/Decoder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Encode Coordinates</h3>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleEncode}
                  disabled={!position}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Encode to DigiPin
                </Button>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="hyphens"
                    checked={includeHyphens}
                    onChange={(e) => setIncludeHyphens(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="hyphens" className="text-gray-700">Include Hyphens</Label>
                </div>
              </div>
              {digiPin && (
                <p className="mt-4 text-gray-700">
                  DigiPin: <span className="font-mono text-blue-600">{digiPin}</span>
                </p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Decode DigiPin</h3>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter DigiPin (e.g., 3T2-JTF-7KLF)"
                  value={digiPin}
                  onChange={(e) => setDigiPin(e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                />
                <Button
                  onClick={handleDecode}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Decode
                </Button>
              </div>
              {decodedCoords && (
                <p className="mt-4 text-gray-700">
                  Decoded: <span className="font-semibold">Lat {decodedCoords.latitude}, Lng {decodedCoords.longitude}</span>
                  {decodedCoords.fromDatabase && <span className="text-green-600"> (from database)</span>}
                </p>
              )}
            </div>


            {error && <p className="text-red-500 font-medium">{error}</p>}

             <div className="flex gap-4 mt-45">
                <div className="flex-1">
                  <Label htmlFor="latitude" className="text-gray-700">Latitude</Label>
                  <Input
                    id="latitude"
                    type="text"
                    placeholder="Enter latitude (2.5 to 38.5)"
                    value={latInput}
                    onChange={(e) => setLatInput(e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="longitude" className="text-gray-700">Longitude</Label>
                  <Input
                    id="longitude"
                    type="text"
                    placeholder="Enter longitude (63.5 to 99.5)"
                    value={lngInput}
                    onChange={(e) => setLngInput(e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
            </div>
                <Button
                onClick={handleSetCoordinates}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full "
              >
                Set Coordinates
              </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Map;

