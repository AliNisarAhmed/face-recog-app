const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd27038cccdb34d8ba37b9cec2a40147a'
 });

 const handleApiCall = (req, res) => {
  app.models.predict(
  Clarifai.FACE_DETECT_MODEL, 
  req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with api'))
 };

const handleImage = (req, res, db) => {
  const { id } = req.body;
  
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries);
;  })
  .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
  handleImage,
  handleApiCall
}