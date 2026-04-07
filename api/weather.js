// Proxy del clima — el iPad 2 (iOS 9) no puede conectar directo a open-meteo por TLS
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  var lat = req.query.lat || '-34.6037';
  var lon = req.query.lon || '-58.3816';

  var url = 'https://api.open-meteo.com/v1/forecast' +
    '?latitude=' + lat +
    '&longitude=' + lon +
    '&current=temperature_2m,apparent_temperature,relative_humidity_2m,windspeed_10m,weathercode' +
    '&timezone=America%2FArgentina%2FBuenos_Aires' +
    '&forecast_days=1';

  try {
    var response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: 'open-meteo error: ' + response.status });
    }
    var data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
