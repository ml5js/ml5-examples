let sentiment;

function setup() {


    // updaye all html elements
    console.log('init');
    document.getElementById("status").innerHTML = 'Loading Model...';

    // initialize sentiment
    sentiment = ml5.sentiment('movieReviews', modelReady);

    let predictSentiment = select('#submit');
    let inputText = select('#inputText');
    let sentimentResult = select('#sentiment-res');

    // predicting the sentiment
    predictSentiment.mousePressed(() => {
        let text = inputText.value();
        const prediction = sentiment.predict(text);

        console.log('score', prediction.score);

        // display sentiment result on html page
        sentimentResult.html('Sentiment score: ' + prediction.score);
    });

}

function modelReady() {
    // model is ready
    console.log('model is ready');
    document.getElementById("status").innerHTML = 'model loaded';
}



