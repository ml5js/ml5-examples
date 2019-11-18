// const fs = require('fs');
// const path = require('path');
// const recursive = require("recursive-readdir");
// const { parse } = require('node-html-parser');

// const baseurl = path.resolve(__dirname, "..");

// const ghUrl = 'https://ml5js.github.io/ml5-examples'
// const indexPath = `${baseurl}/public/index.html`

// let $index = parse(fs.readFileSync(indexPath, 'utf8'));
// let $myLinks = $index.querySelector('#myLinks')
// // clear the content;
// $myLinks.set_content("")

// const p5Examples = getReferences(`${baseurl}/p5js`, 'p5js', ghUrl);
// const plainJsExamples = getReferences(`${baseurl}/javascript`, 'javascript', ghUrl);
// const d3Examples = getReferences(`${baseurl}/d3`, 'd3', ghUrl);


// const p5Header = `<div class="category-header"><h2>ml5 examples with p5.js</h2></div>`
// const jsHeader = `<div class="category-header"><h2>ml5 examples with plain javascript</h2></div>`
// const d3Header = `<div class="category-header"><h2>ml5 examples with d3</h2></div>`

// // p5 examples
// $myLinks.appendChild(p5Header);
// addToDom(p5Examples, $myLinks)
// // plain js examples
// $myLinks.appendChild(jsHeader);
// addToDom(plainJsExamples, $myLinks)
// // D3 examples
// $myLinks.appendChild(d3Header);
// addToDom(d3Examples, $myLinks)

// fs.writeFileSync(`${baseurl}/public/index.html`, $index, 'utf8');
// // ************************************
// /**
//  * 
//  * @param {*} _exampleReferences 
//  * @param {*} _myLinksEl 
//  */
// function addToDom(_exampleReferences, _myLinksEl){
//     _exampleReferences.forEach( example => {
//         const {parent, children} = example;
    
//         // append a section header
//         const sectionHeader = `<div class="category-header"><h3>${parent}</h3></div>`
//         _myLinksEl.appendChild(sectionHeader);
    
//         children.forEach( child => {
//             const childName = child.split('/').pop();
//             _myLinksEl.appendChild(
//                 `<div class="item"> <a target="_blank" href="${child}">${childName}</a></div>`
//             )
//         })
    
//     })
// }

// /**
//  * 
//  * @param {*} path 
//  */
// function getDirectories(path) {
//     return fs.readdirSync(path).filter(function (file) {
//       return fs.statSync(path+'/'+file).isDirectory();
//     });
//   }

// /**
//  * 
//  * @param {*} _examplesRoot 
//  * @param {*} _rootName 
//  * @param {*} _ghUrl 
//  */
// function getReferences(_examplesRoot, _rootName, _ghUrl){
//     const dirs = getDirectories(_examplesRoot);
//     const subdirs = dirs.map(dir => {
        
//         let items = getDirectories(`${_examplesRoot}/${dir}`);
//         items = items.map(item => `${_ghUrl}/${_rootName}/${dir}/${item}`);

//         return {parent: dir, children: items}
//     });

//     return subdirs;
// }