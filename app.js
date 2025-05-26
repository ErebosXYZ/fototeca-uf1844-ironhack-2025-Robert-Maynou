const express = require('express');
const morgan = require('morgan');


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.use(morgan('dev'));
const images = [];

app.get("/", (req, res)=>{
    res.render("home.ejs", {
      images: images
    });
});

app.get("/new-image", (req, res)=>{
  
  res.render("new-image.ejs", {
    message: undefined
  });

});


app.post("/new-image", (req, res)=>{
  
  images.push({
    title: req.body.title,
    url: req.body.url,
    date: req.body.date
  });
  console.log("Array de imágenes actualizado: ", images);
  const date = images.date;

  res.render("new-image.ejs", {
    message: "La imagen ha sido añadida correctamente"
  });
});

app.use((req, res) => {
  res.status(404).render('404.ejs');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
