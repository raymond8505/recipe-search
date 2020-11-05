const fs = require('fs');
const searchFile = 'C:/xampp/htdocs/raymondsfood/wp-content/themes/raymondsfood/search.php';
const appFile = 'C:/xampp/htdocs/recipe-search/build/index.html';

console.log('finishing build');

fs.readFile(searchFile,{},(e,sdata) => {
    
    let searchHTML = sdata.toString();

    fs.readFile(appFile,{},(e,bdata)=>{
        let buildHTML = bdata.toString();

        let cssReg = /main\.[\.\w]+\.css/;

        let js2Reg = /2\.[\.\w]+\.js/;
        let jsMainReg = /main\.[\.\w]+\.js/;

        let js2 = buildHTML.match(js2Reg);
        let jsMain = buildHTML.match(jsMainReg);
        let css = buildHTML.match(cssReg);

        js2 = js2[0];
        jsMain = jsMain[0];
        css = css[0];
        
        searchHTML = searchHTML.replace(js2Reg,js2);
        searchHTML = searchHTML.replace(jsMainReg,jsMain);
        searchHTML = searchHTML.replace(cssReg,css);

        fs.writeFile(searchFile,searchHTML,()=>{});

    });
})