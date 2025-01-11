const express = require('express');
const app = express();
const fs = require('fs');
const URL = 'http://localhost:3000/'
// const bodyParser = require('body-parser');
const handlebars = require('handlebars');

const apiUrl = "https://in3.dev/inv/";

const makeHTML = (data, pageName) => {

    data.url = URL;

    const topHtml = fs.readFileSync(`./templates/top.hbr`, 'utf8');     //paimt top
    const pageHtml = fs.readFileSync(`./templates/${pageName}.hbr`, 'utf8');     //paimt vidurį - pagal pageName
    const bottomHtml = fs.readFileSync(`./templates/bottom.hbr`, 'utf8');     //paimt bottom


    const html = handlebars.compile(topHtml + pageHtml + bottomHtml)(data);     //perduoti data ir suklijuoti

    return html;    //grąžinti suklijuotą html

}


// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {

    const data = {
        pageTitle: 'Pirmasis puslapis',
    };

    const html = makeHTML(data, 'landing');

    res.send(html);
});


// Function to add a new item
function addItem(newData) {
    // Read the current content of the file
    let fileContent = {};
    const oldData = fs.readFileSync('./data/invoices.json', 'utf8'); //nuskaito JSON
    fileContent = oldData ? JSON.parse(oldData) : {}; //Patikrina ar kažkas yra, jei ne įdeda '{}'

    if (!fileContent.items) {
        fileContent.items = [];
    }

    // Add the new item as a new array (if needed) or push it into an existing array
    fileContent.items.push(newData);

    // Write the updated content back to the file
    fs.writeFileSync('./data/invoices.json', JSON.stringify(fileContent), 'utf8');
    console.log('New item added successfully!');
    console.log(fileContent)
}

// fetch(apiUrl)
//     .then(res => res.json())
//     .then(data => {
//         addItem(data);

//     });

// Start server

const port = 3000;
app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});