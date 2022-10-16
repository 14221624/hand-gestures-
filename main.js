Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

 camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';

    })

}

console.log('ml5 version: ' , ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XhWpMT41U/model.json",modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
     if (error)
     {
        console.error(error);
     } else
     {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "perfect")
        {
            document.getElementById("update_emoji").innerHTML = "👌🏻";
        }
        if(results[0].label == "victory")
        {
            document.getElementById("update_emoji").innerHTML = "✌🏻";
        }
        if(results[0].label == "swag")
        {
            document.getElementById("update_emoji").innerHTML = "🤘🏻";
        }
     }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction_1;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate = 1.3;
    synth.speak(utterThis);
}