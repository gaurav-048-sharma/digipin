const express = require('express');
const router = express.Router();
const { encodeDigiPin, decodeDigiPin } = require('../controllers/digiController');

/**
 * Encode coordinates into a DigiPin code
 * @route POST /api/digipin/encode
 * @route GET /api/digipin/encode
 * @param {number} latitude - Latitude (2.5 to 38.5)
 * @param {number} longitude - Longitude (63.5 to 99.5)
 * @param {boolean} [includeHyphens=true] - Include hyphens in output
 */
router.post('/encode', encodeDigiPin);
router.get('/encode', encodeDigiPin);

/**
 * Decode a DigiPin code into coordinates
 * @route POST /api/digipin/decode
 * @route GET /api/digipin/decode
 * @param {string} digipin - DigiPin code
 */
router.post('/decode', decodeDigiPin);
router.get('/decode', decodeDigiPin);

module.exports = router;