const { getDigiPin, getLatLngFromDigiPin, isValidDigiPin, DigiPinError } = require('../digipin');


/**
 * Encodes latitude and longitude into a DigiPin code
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const encodeDigiPin = async (req, res) => {
  try {
    const { latitude, longitude, includeHyphens = true } = req.body || req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
const digipin = getDigiPin(parsedLat, parsedLng, { includeHyphens });
// const formattedDigiPin = includeHyphens ? digipin : `${digipin.slice(0, 4)}-${digipin.slice(3, 7)}-${digipin.slice(6)}`;
// console.log('Formatted DigiPin for DB:', formattedDigiPin);
// await DigiPin.create({ digipin: formattedDigiPin, latitude: parsedLat, longitude: parsedLng });
    
    res.status(200).json({ digipin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Decodes a DigiPin code into latitude and longitude
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const decodeDigiPin = async (req, res) => {
  try {
    const { digipin } = req.body || req.query;
    if (!digipin) {
      return res.status(400).json({ error: 'DigiPin code is required' });
    }
    if (!isValidDigiPin(digipin)) {
      return res.status(400).json({ error: 'Invalid DigiPin format' });
    }
    const coords = getLatLngFromDigiPin(digipin);
    
    // Check database for existing record
    const formattedDigiPin = digipin.includes('-') ? digipin : `${digipin.slice(0, 3)}-${digipin.slice(3, 6)}-${digipin.slice(6)}`;
    // const record = await DigiPin.findOne({ digipin: formattedDigiPin });
    // if (record) {
    //   coords.fromDatabase = true;
    // }
    
    res.status(200).json(coords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  encodeDigiPin,
  decodeDigiPin,
};