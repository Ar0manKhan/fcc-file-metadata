var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

// Configuring multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// API to analyse file and return metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
})