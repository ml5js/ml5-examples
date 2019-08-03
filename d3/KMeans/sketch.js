const colDict = {0: 'skyblue', 1: 'coral' , 2: 'olive', 3: 'tan', 4: 'grey'}
const xValue = d => d.x1;
const yValue = d => d.x2;
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const width = 900;
const height = 500;

const row = d => {
  d.x1 = +d.x1;
  d.x2 = +d.x2;
  return d;
};

let kmeansModel;
let currentClusterCount;
let options = {
  'k': 3,
  'maxIter': 10,
  'threshold': 2,
};

function changeClusters(k) {
  document.getElementById('kmeansText').innerText = 'Run K-Means';

  d3.select("svg").remove();

  let svg = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height);

  currentClusterCount = k;

  options['k'] = (k === 'moon' || k === 'circle') ? 2 : k;

  d3.csv(`data/gaussian2d_${k}clusters.csv`, row, data => {
  xScale
  .domain(d3.extent(data, xValue))
  .range([10, width - 100]);

  yScale
  .domain(d3.extent(data, yValue))
  .range([height - 50, 20]);

  svg.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)))
    .attr('r', 6)
    .attr('fill', 'black')
  });
}

function runKMeans() {
  document.getElementById('kmeansText').innerText = 'Running...';
  kmeansModel = ml5.kmeans(`data/gaussian2d_${currentClusterCount}clusters.csv`, options, modelReady);  
}

function modelReady() {
  document.getElementById('kmeansText').innerText = 'Re-run K-Means';
  const dataset = kmeansModel.dataset;
  d3.select('svg').selectAll('circle')
    .transition()
    .attr('fill', (d,i) => colDict[dataset[i].centroid]);
}

changeClusters(3);
