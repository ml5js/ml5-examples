
let sentenceEncoder;
function setup(){
  createCanvas(400, 400);

  sentenceEncoder = ml5.universalSentenceEncoder(modelLoaded)

}

function modelLoaded(){
  
  predict();
}

function predict(){
  const sentences = [
    'I love rainbows',
    'I love rainbows too',
    'I love cupcakes',
    'I love bagels more'
  ]
  sentenceEncoder.predict(sentences, gotResults);
}

function gotResults(err, result){
  if(err){
    return err;
  }
  console.log(result);
}

function draw(){


}