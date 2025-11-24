import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get('/', async (req, res) => {
    let image;

    try {
        let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
        let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
        let response = await fetch(url);

        if (!response.ok) {
            console.log("API request failed");
            throw new Error("API request failed");
        }

        let data = await response.json();
        image = data.urls.full;   // use API image
    } 
    catch (err) {
        image = "/img/solar-system.jpg"; // fallback image
    }

    res.render("index", { image });
});

app.get('/mercury', (req, res) => {
 let planetMercury = planets.getMercury();
//  console.log(planetMercury);
 res.render('mercury', {planetMercury});
});

app.get('/venus', (req, res) => {
 let planetVenus = planets.getVenus();
//  console.log(planetVenus);
 res.render('venus', {planetVenus});
});

app.get('/earth', (req, res) => {
 let planetEarth = planets.getEarth();
//  console.log(planetEarth);
 res.render('earth', {planetEarth});
});

app.get('/mars', (req, res) => {
 let planetMars = planets.getMars();
//  console.log(planetMars);
 res.render('mars', {planetMars});
});

app.get('/jupiter', (req, res) => {
 let planetJupiter = planets.getJupiter();
//  console.log(planetJupiter);
 res.render('jupiter', {planetJupiter});
});

app.get('/saturn', (req, res) => {
 let planetSaturn = planets.getSaturn();
//  console.log(planetSaturn);
 res.render('saturn', {planetSaturn});
});

app.get('/uranus', (req, res) => {
 let planetUranus = planets.getUranus();
//  console.log(planetUranus);
 res.render('uranus', {planetUranus});
});

app.get('/neptune', (req, res) => {
 let planetNeptune = planets.getNeptune();
//  console.log(planetNeptune);
 res.render('neptune', {planetNeptune});
});

app.get('/pluto', (req, res) => {
 let planetPluto = planets.getPluto();
//  console.log(planetPluto);
 res.render('pluto', {planetPluto});
});

app.get("/nasa", async (req, res) => {
    const nasaUrl =
        "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2024-11-14";

    let nasaData;
    let nasaImage;

    try {
        let response = await fetch(nasaUrl);

        if (!response.ok) {
            throw new Error("NASA API failed");
        }

        nasaData = await response.json();
        nasaImage = nasaData.url; // the image for Picture of the Day
    } catch (err) {
        nasaImage = "/img/fallback-nasa.jpg"; // local fallback image
    }

    res.render("nasa", { nasaImage });
});


app.listen(3000, () => {
   console.log('server started');
});
