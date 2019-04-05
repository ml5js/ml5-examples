const fs = require('fs');
const path = require('path');
const recursive = require("recursive-readdir");
const { parse } = require('node-html-parser');

const baseurl = path.resolve(__dirname, "..");
const ml5version = process.argv[2] || '0.2.3'

recursive(baseurl + "/p5js", (err, files) => {
    // let indexFiles = []; 
    files.forEach(file => {
        const fileName = file.split('/').pop()
        if(fileName.endsWith('.html')){
            // indexFiles.push(file)
            updateMl5Reference(file)
        }
    })
    console.log('🌈 done!')
})

function updateMl5Reference(filePath){
    let pos;
    let el = parse(fs.readFileSync(filePath, 'utf8'));
    let scripts = el.querySelectorAll('script')
    let selectedRef = scripts.find((item, idx) => {
        if(item.rawAttrs.includes('ml5')){
            pos = idx;
            return item
        }
    })
    selectedRef.rawAttrs = `src="https://unpkg.com/ml5@${ml5version}/dist/ml5.min.js" type="text/javascript"`
    scripts[pos] = selectedRef;

    fs.writeFileSync(filePath, el, 'utf8');
}