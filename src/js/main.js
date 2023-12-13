(function () {
 'use strict';
 var path, slash;
 path = location.href;
	if(getOS() == "MAC") {
		slash = "/";
		path = path.substring(0, path.length - 11);
	}
	if(getOS() == "WIN") {
		slash = "/";
		path = path.substring(8, path.length - 11);
	}

	init();

 }());


function init() {
	var widthE = document.createElement("DIV");
	widthE.id = "widthE";
	widthE.style.width = "100%";
	widthE.style.position = "relative";
	widthE.style.display = "inline-block";
	widthE.style.textAlign = "center";
	document.getElementById("container").appendChild(widthE);

	var regInput = document.createElement("INPUT");
	regInput.id = "regInput";
	regInput.type = "password";
	regInput.style.border = "none";
	regInput.style.outline = "none";
	regInput.style.backgroundColor = "#343434";
	regInput.style.color = "white";
	regInput.style.position = "relative";
	regInput.style.display = "inline-block";
	regInput.style.width = "250px";
	regInput.style.height = "25px";
	regInput.style.paddingLeft = "15px";
	regInput.value = "";
	widthE.appendChild(regInput);

	var regButton = document.createElement("DIV");
	regButton.innerHTML = "Login";
	regButton.style.width = "70px";
	regButton.style.height = "35px";
	regButton.style.position = "relative";
	regButton.style.display = "inline-block";
	regButton.id = "regButton";
	regButton.style.backgroundColor = "#353535";
	regButton.style.color = "white";
	regButton.style.textAlign = "center";
	widthE.appendChild(regButton);

	regButton.addEventListener("click", ()=> {
		imageGeneration(regInput.value);
	});

	
}

function login(apiKey) {
	var widthE = document.getElementById("widthE");
	widthE.removeChild(widthE.childNodes[0]);
	widthE.removeChild(widthE.childNodes[0]);

	var resInput = document.createElement("INPUT");
	resInput.id = "regInput";
	resInput.type = "text";
	resInput.style.border = "none";
	resInput.style.outline = "none";
	resInput.style.backgroundColor = "#343434";
	resInput.style.color = "white";
	resInput.style.position = "relative";
	resInput.style.display = "inline-block";
	resInput.style.width = "450px";
	resInput.style.height = "25px";
	resInput.style.paddingLeft = "15px";
	resInput.value = "";
	widthE.appendChild(resInput);

	const https = require('https');

// Data to be sent in the POST request
const data = JSON.stringify({
    "model": "gpt-4",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant who specializes in baking."
        },
        {
            "role": "user",
            "content": "Who invented the chocolate chip cookie?"
        },
		{
            "role": "assistant",
            "content": "The chocolate chip cookie was invented by Ruth Graves Wakefield in 1938. She owned the Toll House Inn in Whitman, Massachusetts and created the cookie when she added chopped up semisweet chocolate to her cookie dough. This ultimately led to the creation of the iconic Nestle Toll House Chocolate Chip Cookie."
        }, 
		{
            "role": "user",
            "content": "Amazing! Now give me a great recipe in honor of Ruth Graves Wakefield in JSON format!"
        }
    ],
	//"response_format": { type: "json_object" },
	"temperature": .3
});

// Options for the HTTPS request
const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
        'Content-Length': data.length
    }
};

// Making the request
const req = https.request(options, (res) => {
    let responseBody = '';

    // Handle incoming data
    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    // Handle end of the response
    res.on('end', () => {
		try {
			//alert(responseBody);
        var responseText = JSON.parse(responseBody).choices[0].message;

		resInput.value = responseText.content;
		} catch(e) {
			alert(e);
		}
    });
});

// Handle error
req.on('error', (error) => {
    alert(error);
});

// Write data to request body and end the request
req.write(data);
req.end();

}

function imageGeneration(apiKey) {
	var widthE = document.getElementById("widthE");
	widthE.removeChild(widthE.childNodes[0]);
	widthE.removeChild(widthE.childNodes[0]);


	var resInput = document.createElement("INPUT");
	resInput.id = "regInput";
	resInput.type = "text";
	resInput.style.border = "none";
	resInput.style.outline = "none";
	resInput.style.backgroundColor = "#343434";
	resInput.style.color = "white";
	resInput.style.position = "relative";
	resInput.style.display = "inline-block";
	resInput.style.width = "450px";
	resInput.style.height = "25px";
	resInput.style.paddingLeft = "15px";
	resInput.value = "";
	widthE.appendChild(resInput);

	
	var img = document.createElement("IMG");
	img.style.width = "512";
	img.style.height = "512";
	img.style.position = "relative";
	img.style.display = "inline-block";
	widthE.appendChild(img);

	const https = require('https');

// Data to be sent in the POST request
const data = JSON.stringify({
    "model": "dall-e-3",
    "prompt": "A Russian Blue cat climbing the eiffel tower at night, with a beautiful glowing city lights background", // prompt
  	"n": 1, // num images
  	"size": "1024x1024",
	//"temperature": .3
});

// Options for the HTTPS request
const options = {
    hostname: 'api.openai.com',
    path: '/v1/images/generations',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
        'Content-Length': data.length
    }
};

// Making the request
const req = https.request(options, (res) => {
    let responseBody = '';

    // Handle incoming data
    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    // Handle end of the response
    res.on('end', () => {
		resInput.value = responseBody;
		try {
			//alert(responseBody);
        var response = JSON.parse(responseBody);
		//alert(response.data[0].url)

		img.src = response.data[0].url;
		} catch(e) {
			alert(e);
		}
    });
});

// Handle error
req.on('error', (error) => {
    alert(error);
});

// Write data to request body and end the request
req.write(data);
req.end();

}


function getOS() {
 		var userAgent = window.navigator.userAgent,
 		platform = window.navigator.platform,
 		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
 		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
 		os = null;

 		if(macosPlatforms.indexOf(platform) != -1) {
 			os = "MAC";
 		} else if(windowsPlatforms.indexOf(platform) != -1) {
 			os = "WIN";
 		}
 		return os;
 	}