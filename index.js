const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/articles", (req, res) => {

    const query = req.query.query;
    const page = req.query.page;
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=Mku2VBAV1JuAn7Wq7ug0hHd1uOKhim2n`)
        .then((response) => {
            let articles = [];
            let url = response.data.response.docs;
            // console.log(response.data.response.docs);
            articles.push(url);
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const resultArticles = articles[0].slice(startIndex, endIndex);
            // console.log(resultArticles);
            const query = req.query.query;
            res.render("articles.ejs", { articles: resultArticles, page: page, query: query });
        })
        .catch((err) => console.log(err));




})
app.listen(3000, () => console.log("Server listening at port 3000"));

