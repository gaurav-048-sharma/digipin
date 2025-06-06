/**
 * DIGIPIN Encoder and Decoder Library
 * Developed by India Post, Department of Posts
 * Released under an open-source license for public use
 *
 * Encodes latitude/longitude into a 10-character alphanumeric DigiPin code and decodes it back to coordinates.
 * Optimized for India's geographic bounds (lat: 2.5° to 38.5°, lon: 63.5° to 99.5°).
 *
 * @module digipin
 */

const DIGIPIN_GRID = [
  ['F', 'C', '9', '8'],
  ['J', '3', '2', '7'],
  ['K', '4', '5', '6'],
  ['L', 'M', 'P', 'T'],
];

const BOUNDS = {
  minLat: 2.5,
  maxLat: 38.5,
  minLon: 63.5,
  maxLon: 99.5,
};

// Precomputed character-to-position map for faster decoding
const CHAR_TO_POSITION = DIGIPIN_GRID.reduce((map, row, r) => {
  row.forEach((char, c) => {
    map[char] = { row: r, col: c };
  });
  return map;
}, {});

/**
 * Custom error for DigiPin-related issues
 */
class DigiPinError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DigiPinError';
  }
}

/**
 * Validates latitude and longitude inputs
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @throws {DigiPinError} If coordinates are invalid
 */
function validateCoordinates(lat, lon) {
  if (typeof lat !== 'number' || isNaN(lat)) {
    throw new DigiPinError('Latitude must be a valid number');
  }
  if (typeof lon !== 'number' || isNaN(lon)) {
    throw new DigiPinError('Longitude must be a valid number');
  }
  if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat) {
    throw new DigiPinError(`Latitude must be between ${BOUNDS.minLat} and ${BOUNDS.maxLat}`);
  }
  if (lon < BOUNDS.minLon || lon > BOUNDS.maxLon) {
    throw new DigiPinError(`Longitude must be between ${BOUNDS.minLon} and ${BOUNDS.maxLon}`);
  }
}

/**
 * Encodes latitude and longitude into a DigiPin code
 * @param {number} lat - Latitude (2.5 to 38.5)
 * @param {number} lon - Longitude (63.5 to 99.5)
 * @param {Object} [options] - Encoding options
 * @param {boolean} [options.includeHyphens=true] - Include hyphens in output
 * @returns {string} 10-character DigiPin code (e.g., "XXX-XXX-XXXX" or "XXXXXXXXXX")
 * @throws {DigiPinError} If coordinates are invalid
 */
function getDigiPin(lat, lon, { includeHyphens = true } = {}) {
  validateCoordinates(lat, lon);

  let minLat = BOUNDS.minLat;
  let maxLat = BOUNDS.maxLat;
  let minLon = BOUNDS.minLon;
  let maxLon = BOUNDS.maxLon;
  let digiPin = '';

  for (let level = 1; level <= 10; level++) {
    const latDiv = (maxLat - minLat) / 4;
    const lonDiv = (maxLon - minLon) / 4;

    // Calculate grid position (reversed row logic)
    const row = Math.max(0, Math.min(3, 3 - Math.floor((lat - minLat) / latDiv)));
    const col = Math.max(0, Math.min(3, Math.floor((lon - minLon) / lonDiv)));

    digiPin += DIGIPIN_GRID[row][col];

    if (includeHyphens && (level === 3 || level === 6)) {
      digiPin += '-';
    }

    // Update bounds
    maxLat = minLat + latDiv * (4 - row);
    minLat = minLat + latDiv * (3 - row);
    minLon = minLon + lonDiv * col;
    maxLon = minLon + lonDiv;
  }

  return digiPin;
}

/**
 * Decodes a DigiPin code into its central latitude and longitude
 * @param {string} digiPin - DigiPin code (e.g., "XXX-XXX-XXXX" or "XXXXXXXXXX")
 * @returns {Object} Coordinates { latitude: string, longitude: string }
 * @throws {DigiPinError} If DigiPin is invalid
 */
function getLatLngFromDigiPin(digiPin) {
  if (typeof digiPin !== 'string') {
    throw new DigiPinError('DigiPin must be a string');
  }

  const pin = digiPin.replace(/-/g, '');
  if (pin.length !== 10) {
    throw new DigiPinError('DigiPin must be 10 characters long (excluding hyphens)');
  }

  let minLat = BOUNDS.minLat;
  let maxLat = BOUNDS.maxLat;
  let minLon = BOUNDS.minLon;
  let maxLon = BOUNDS.maxLon;

  for (const char of pin) {
    const pos = CHAR_TO_POSITION[char];
    if (!pos) {
      throw new DigiPinError(`Invalid character in DigiPin: ${char}`);
    }

    const { row, col } = pos;
    const latDiv = (maxLat - minLat) / 4;
    const lonDiv = (maxLon - minLon) / 4;

    // Update bounds based on grid position
    maxLat = maxLat - latDiv * row;
    minLat = maxLat - latDiv;
    minLon = minLon + lonDiv * col;
    maxLon = minLon + lonDiv;
  }

  const centerLat = (minLat + maxLat) / 2;
  const centerLon = (minLon + maxLon) / 2;

  return {
    latitude: centerLat.toFixed(6),
    longitude: centerLon.toFixed(6),
  };
}

/**
 * Utility function to validate a DigiPin code format
 * @param {string} digiPin - DigiPin code to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidDigiPin(digiPin) {
  if (typeof digiPin !== 'string') return false;
  const pin = digiPin.replace(/-/g, '');
  if (pin.length !== 10) return false;
  return pin.split('').every((char) => char in CHAR_TO_POSITION);
}

module.exports = { getDigiPin, getLatLngFromDigiPin, isValidDigiPin };