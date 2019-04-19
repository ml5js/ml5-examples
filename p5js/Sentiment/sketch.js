let sentiment;
let statusEl;
let submitBtn;
let inputBox;
let sentimentResult;

function setup() {
    // update all html elements
    statusEl = createP('Loading Model...');
    // initialize sentiment
    sentiment = ml5.sentiment('movieReviews', modelReady);

    // setup the html environment
    submitBtn = createButton('submit').parent('myForm');
    inputBox = select('#inputBox');
    sentimentResult = createP('sentiment score:').parent('myForm');

    // predicting the sentiment on mousePressed()
    submitBtn.mousePressed(getSentiment);

}

function getSentiment(){
    // get the values from the input
    const text = inputBox.value();
    
    // make the prediction
    const prediction = sentiment.predict(text);

    // display sentiment result on html page
    sentimentResult.html('Sentiment score: ' + prediction.score);
}

function modelReady() {
    // model is ready
    statusEl.html('model loaded');
}



