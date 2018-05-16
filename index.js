'use script'

const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port',(process.env.PORT || 5000))

//Allow us to process the data.
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//SET-Routes

app.get('/',function(req, res)
{
	res.send("Hi, I am Umesh Kushwah")
})


const token = "EAADZC141sLwABAKLgAf8PmVYqxxCyI51I21JmvicONO9iesf6FirVZCvacBrySPJBIeg87QHXkZBaeKedVWeUBvVBrVvcrL22wCZAKLNwx2moy3Wz8QR9K1tsD0XCnjKzvyGnM86FcodQzGqwd2kyPLPYucQerBCYrJSZChrURQZDZD"
//Facebook

app.get('/webhook/',function(req, res)
{
	if(req.query['hub.verify_token'] === "Abinfinity"){
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong Token")
	
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text.toLowerCase()
			if ((text.includes("hello")) || (text.includes("hi")))
			{sendText(sender,"Hello . I am Umesh Kushwah, Co-founder and CEO of RannLab Technologies")
			 buttonMessage(sender, "How was your day??")
			}
			
		}
		if(event.postback){
			let text = JSON.stringify(event.postback)
			if (text.includes("Good"))
			{sendText(sender,"Great!! Mine was awesome as well..")
			 buttonMessage2(sender, "So how often do you play sports?")
			}
			else if (text.includes("Okay"))
			{sendText(sender,"Well..Don't worry, remember for every dark night there is a brighter day")
			 buttonMessage2(sender, "So how often do you play sports?")
			}
			else if (text.includes("Quite often"))
			{sendText(sender,"Great, you know good body often leads to good mind.")
			 buttonMessage3(sender, "Which job field you think you are interested in??")
			}
			else if (text.includes("Rarely"))
			{sendText(sender,"Then you should work on that.")
			 buttonMessage3(sender, "Which job field you think you are interested in??")
			}
			
			else if (text.includes("tech") || text.includes("non"))
			{
			 buttonMessage4(sender, "Are you currently working on that skill??")
			}
			
			else if (text.includes("yes"))
			{sendText(sender,"Good, there are only few people who follow their passion.")
			 sendText(sender,"It's feels good to talk to a person with impetuous passion.")
			 callButton(sender)
			}
			else if (text.includes("no"))
			{sendText(sender,"You see it's never too late but you got to think on it somehow..")
			 callButton(sender)
			}
			continue
		}
	}
	res.sendStatus(200)
})

//for the button in chatbox

function buttonMessage(sender, text){
	let messageData ={
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": text,
        "buttons":[
          {
            "type":"postback",
            "title":"Good",
            "payload":"good"
          },
          {
			"type":"postback",
            "title":"Okay",
            "payload":"okay"
          }
        ]
      }
    }
	}
	
	sendRequest(sender, messageData)
}


function buttonMessage2(sender, text){
	let messageData ={
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": text,
        "buttons":[
          {
            "type":"postback",
            "title":"Quite often",
            "payload":"Quite often"
          },
          {
			"type":"postback",
            "title":"Rarely",
            "payload":"Rarely"
          }
        ]
      }
    }
	}
	
	sendRequest(sender, messageData)
}


function buttonMessage3(sender, text){
	let messageData ={
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": text,
        "buttons":[
          {
            "type":"postback",
            "title":"Technical",
            "payload":"tech"
          },
          {
			"type":"postback",
            "title": "Non-Technical",
            "payload":"non"
          }
        ]
      }
    }
	}
	
	sendRequest(sender, messageData)
}

function buttonMessage4(sender, text){
	let messageData ={
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": text,
        "buttons":[
          {
            "type":"postback",
            "title":"Yes",
            "payload":"yes"
          },
          {
			"type":"postback",
            "title": "No",
            "payload":"no"
          }
        ]
      }
    }
	}
	
	sendRequest(sender, messageData)
}

function sendRequest(sender, messageData){
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
	
	
}


	

function callButton(sender){
	let messageData ={
		"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": "For any further assistance on career planning, feel free to contact",
        "buttons":[
          {
            "type":"phone_number",
            "title":"Call Us",
            "payload":"+9195993 88970 "
          }
        ]
      }
    }
	}
	
	sendRequest(sender, messageData)
}



function sendText(sender, text) {
	let messageData = {text: text}
	sendRequest(sender, messageData)
}


app.listen(app.get('port'), function()
{
	console.log("running:port")
})
