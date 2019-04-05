const fs = require('fs');
const path = require('path');
const recursive = require("recursive-readdir");
const { parse } = require('node-html-parser');

const baseurl = path.resolve(__dirname, "..");
const ml5version = process.argv[2] || '0.2.3'

// run the functions
make("/javascript")
make("/p5js")

/**
 * Take the relative path to the examples directory and 
 * runs the process
 * @param {*} examplesDir 
 */
function make(examplesDir){
    recursive(baseurl + examplesDir, (err, files) => {
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
}


/**
 * takes the filepath to the index.hml file
 * works the DOM to put in our script
 * @param {*} filePath 
 */
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