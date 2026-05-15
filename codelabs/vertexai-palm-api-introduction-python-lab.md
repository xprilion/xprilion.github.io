# Introduction to Building Solutions with PaLM2 API via VertexAI on GCP

## Overview

Duration: 1

Hey there!

In this Codelab, we'll walk through creating a simple chatbot based game using Google Cloud's Vertex AI and Flask, a popular web framework in Python. Our application will ask you to make a guess about what the bot is thinking and the bot will respond with hints about what it is thinking and how far away your guess is from the correct item.

## Requirements

Duration: 2

In order to follow this codelab, you'll need the following:
- A Google Cloud Platform account with active billing.
- A development environment with Python 3.7 or above installed.
- Access to terminal/shell for executing commands.

## Setting Up Your Google Cloud Environment

Duration: 10
- Log in to your [Google Cloud Platform](https://console.cloud.google.com/) account.
- Create a new project, let's name it `project-x`.
- Enable [billing for the project](https://cloud.google.com/billing/docs/how-to/modify-project).
- Navigate to the [APIs & Services dashboard](https://console.cloud.google.com/apis/dashboard) and enable the Vertex AI API.
- [Create a service account and download the JSON key file](https://cloud.google.com/iam/docs/keys-create-delete) (`key.json`). Store this file safely.

## Setting Up Your Local Environment

Duration: 5

Install other required libraries:

```bash
pip install marko google-cloud-aiplatform

```

Install Flask:

```bash
pip install Flask

```

## Write the driving code

Duration: 10
- **Importing Libraries**: We start by importing necessary Python libraries. Flask for our web framework, Vertex AI for AI model interaction, and others for various functionalities.

```python
import os
from flask import Flask, request, Response, g, render_template, jsonify
import marko
import vertexai
from vertexai.language_models import TextGenerationModel

```
- **Initializing the App and Vertex AI**: We initialize our Flask app and configure Vertex AI with our GCP project details.

```python

app = Flask(__name__)
app.debug = True

vertexai.init(project="project-x", location="us-central1")
parameters = {
    "temperature": 1,
    "max_output_tokens": 256,
    "top_p": 0.8,
    "top_k": 40
}

model = TextGenerationModel.from_pretrained("text-bison@001")

```
- **Defining Routes**: We define two routes - one for the home page and another for handling chat messages.

```python
@app.route('/', methods=['GET'])
def hello_world():
    return render_template("chat.html")

@app.route('/chat/<guess>/<actual>', methods=['GET'])
def chat(guess, actual):
    response = model.predict(
        "You are the bot in a guessing game where the player tries to guess a secret item you are thinking about. " +
        "The rules of the game are: 1. the player will make a guess. 2. if the guess is correct or very close to the correct answer, you will say, 'Congratulations, you've got it right!' " +
         "3. If they are not very close to the actual item, respond with a humorous remark about their guess. Then without mentioning the actual item, " + actual + ", provide a subtle hint to guide the player closer to the secret item." +
        "The player has just guessed " + guess + ".",
        **parameters
    )

    return jsonify({
        "response": marko.convert(response.text)
    })

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

```

With the backend done, we're free to implement the UI for the API in any manner we want to.

## UI for the application

Duration: 10

Now, we can develop a quick UI to work with the API of the chatbot. Here's some sample HTML/JS to create one such UI.

```html
<div>
    <div id="chat-box" class="bg-light p-3 mb-3 rounded">
        <blockquote style="border-left: 4px solid #43a047;">Bot: Can you guess what am I thinking?</blockquote>
    </div>
    <progress id="progress-bar" style="display: none"></progress>
    <div class="input-group">
        <input id="chat-input" type="text" class="form-control" placeholder="Type your message...">
        <div class="input-group-append">
            <button id="send-button" class="btn btn-primary">Guess</button>
            <button id="quit-button">Give Up</button>
        </div>
    </div>
</div>

<script>
$(function() {
    const items = [
    "Eiffel Tower",
    "Pineapple",
    // ... many more!
    "Rubik's Cube",
    "Bamboo"
];

    var actual_item = items[Math.floor(Math.random()*items.length)];

    $('#chat-input').keypress(function(e) {
        if(e.which == 13) { // 13 is the Enter key
            $('#send-button').click();
        }
    });

    $('#quit-button').click(function() {
        $('#chat-box').append('<blockquote style="border-left: 4px solid red;">Bot: The answer was ' + actual_item + '</blockquote>');
        $('#chat-input').val('');
        $('#chat-input').prop('disabled', true);
        $('#send-button').prop('disabled', true);
        $('#quit-button').prop('disabled', true);
    });

    $('#send-button').click(function() {
        var input = $('#chat-input').val().trim();
        if (input !== '') {
            $('#chat-box').append('<blockquote style="border-left: 4px solid dodgerblue;">User: ' + input + '</blockquote>');
            $('#chat-input').val('');
            $('#progress-bar').show();
            // Use AJAX to send the input to the server and get a response
            $.ajax({
                url: '/chat/' + encodeURIComponent(input) + '/' + encodeURIComponent(actual_item),
                type: 'GET',
                success: function(data) {
                    $('#chat-box').append('<blockquote style="border-left: 4px solid #43a047;">Bot: ' + data.response + '</blockquote>');
                    $('#progress-bar').hide();
                },
                error: function() {
                    $('#chat-box').append('<blockquote style="border-left: 4px solid red;">Bot: Sorry, I am not able to respond at the moment.</blockquote>');
                    $('#progress-bar').hide();
                }
            });
        }
    });
});
</script>

```

## Running the App

Duration: 2
- Open your web browser and go to [`http://localhost:8080`](http://localhost:8080). You should see your chatbot interface.

Run your application:

```bash
python main.py

```

## Interacting with Your Chatbot

Duration: 2
- The bot will greet you asking you to guess what the bot is thinking about.
- Enter a guess in the chat interface.
- The chatbot will respond with if your guess was close to what the actual secret item it was thinking about!

## Conclusion

Duration: 1

Congratulations! You've just built and deployed a simple chatbot using Flask and Google Cloud's Vertex AI. This bot plays a guessing game with the users!

## What's Next?

Duration: 1
- Experiment with different model parameters to see how they affect the output.
- Try integrating this chatbot into a larger web application.
- Explore other capabilities of Vertex AI.