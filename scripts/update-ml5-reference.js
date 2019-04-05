const fs = require('fs');
const path = require('path');
const recursive = require("recursive-readdir");
const { parse } = require('node-html-parser');

const baseurl = path.resolve(__dirname, "..");
const ml5version = process.argv[2] || '0.2.3'

<<<<<<< HEAD
// run the functions
make("/javascript")
make("/p5js")
=======
let ml5src;
if(process.env.NODE_ENV && ['development', 'dev', 'DEVELOPMENT'].includes(process.env.NODE_ENV) === true ){
    console.log(`setting src for ${process.env.NODE_ENV}`)
    ml5src = `src="localhost:8080/ml5.js" type="text/javascript"`
} else {
    console.log(`setting src for production`)
    ml5src = `src="https://unpkg.com/ml5@${ml5version}/dist/ml5.min.js" type="text/javascript"`
}

// run the functions
make("/javascript", ml5src);
make("/p5js", ml5src);
>>>>>>> release

/**
 * Take the relative path to the examples directory and 
 * runs the process
 * @param {*} examplesDir 
 */
<<<<<<< HEAD
function make(examplesDir){
=======
function make(examplesDir, ml5src){
>>>>>>> release
    recursive(baseurl + examplesDir, (err, files) => {
        // let indexFiles = []; 
        files.forEach(file => {
            const fileName = file.split('/').pop()
            if(fileName.endsWith('.html')){
                // indexFiles.push(file)
<<<<<<< HEAD
                updateMl5Reference(file)
=======
                updateMl5Reference(file, ml5src)
>>>>>>> release
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
<<<<<<< HEAD
function updateMl5Reference(filePath){
=======
function updateMl5Reference(filePath, ml5src){
>>>>>>> release
    let pos;
    let el = parse(fs.readFileSync(filePath, 'utf8'));
    let scripts = el.querySelectorAll('script')
    let selectedRef = scripts.find((item, idx) => {
        if(item.rawAttrs.includes('ml5')){
            pos = idx;
            return item
        }
    })
<<<<<<< HEAD
    selectedRef.rawAttrs = `src="https://unpkg.com/ml5@${ml5version}/dist/ml5.min.js" type="text/javascript"`
=======
    selectedRef.rawAttrs = ml5src
>>>>>>> release
    scripts[pos] = selectedRef;

    fs.writeFileSync(filePath, el, 'utf8');
}