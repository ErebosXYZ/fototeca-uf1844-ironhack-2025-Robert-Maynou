const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));


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
  res.render("new-image.ejs", {
    message: "La imagen ha sido añadida correctamente"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
