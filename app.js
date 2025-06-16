const express = require('express');
const morgan = require('morgan');



const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(morgan('dev'));
const images = [];
let imgUrl = images.url;


app.get("/", (req, res) => {
  const sortedImages = images.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  res.render("home.ejs", {
    images: sortedImages,
    useColorThief: true
  });
});

app.get("/new-image", (req, res) => {

  res.render("new-image.ejs", {
    message: undefined
  });

});



app.post("/new-image", (req, res) => {

  const { title, url, date } = req.body;

  // Comprovació: la URL ja existeix?
  const exists = images.find(image => image.url === url);

  if (exists) {
    return res.render("new-image.ejs", {
      message: "⚠️ Esta URL ya ha sido utilizada.",
      cssClass: "error"
    });
  }

  images.push({ title, url, date });
  res.render("new-image.ejs", {
    message: "✅ La imagen ha sido añadida correctamente.",
    cssClass: "success"
  });
  console.log(images.url);

});

'asddsqwdqwqwdqw'


app.use((req, res) => {
  res.status(404).render('404.ejs');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
