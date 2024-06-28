const express = require('express');
const requestIp = require('request-ip');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

const results = {};

function predictFuture(name) {
  const predictions = [
    `${name}, Dimasa depan kamu akan mendapatkan uang dari jerih payah mu sendiri, memang tidak seperti ekpentasi mu, jadi terima apa adanya dan tetap bersyukur.`,
    `${name}, Dimasa depan kamu akan memiliki anak perempuan dari hasil wik wik di kebun singkong, tetaplah bertanggung jawab dan rawat anakmu agar tidak seperti mu.`,
    `${name}, Dimasa depan kamu akan mendapatkan pasangan yang cantik sekali, tapi sayang pada saat itu kamu tidak bisa melihat dikarenakan sebuah penyakit.`,
    `${name}, Dimasa depan kamu akan menjadi direktur di perusahaan besar, dan kekayaan melimpah, namun sayang setelah merasakan itu selama 7 hari kamu masuk penjara.`,
    `${name}, Dimasa depan kamu akan menjadi pemulung, dan tinggal di bawah jalan tol, tetap bersyukur dan menerima apa adanya, jika tidak pilihan satu-satunya bunuh diri`
  ];
  return predictions[Math.floor(Math.random() * predictions.length)];
}

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/predict', express.urlencoded({ extended: true }), (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  const { name } = req.body;
  
  if (results[name]) {
    const prediction = results[name];
    return res.render('result', { name, prediction });
  }

  const prediction = predictFuture(name);
  
  results[name] = prediction;

  res.render('result', { name, prediction });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
