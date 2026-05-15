# Python Flask app with Gemini Pro Vision Multimodal

## Overview

Duration: 1

Hey there!

In this codelab, you'll explore building a Python Flask application that leverages Gemini Pro Vision Multimodal's capabilities to perform tasks like image classification, object detection, and text understanding. By the end, you'll have a practical understanding of integrating Gemini Pro Vision into your backend applications.

## Requirements

Duration: 2

In order to follow this codelab, you'll need the following:
- A development environment with Python 3.7 or above installed.
- Access to terminal/shell for executing commands.
- Basic understanding of Python and Flask
- Familiarity with REST APIs is helpful but not mandatory
- Access to a Gemini Pro Vision model

## Setting Up Your Dev Environment

Duration: 10
- Log in to your [Google AI Studio](https://makersuite.google.com/) account.
- Create a new `API KEY`.
- Note the API Key in a secure location.

## Setting Up Your Local Environment

Duration: 5

Install other required libraries:

```bash
pip install marko google-generativeai

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
import google.generativeai as genai

```
- **Initializing the App and Gemini API**: We initialize our Flask app and load the Gemini API client.

```python
genai.configure(api_key=os.getenv("API_KEY"))

app = Flask(__name__)
app.debug = True

config = {
  'temperature': 0,
  'top_k': 20,
  'top_p': 0.9,
  'max_output_tokens': 500
}

```

We also need to confiugre the security settings for the model output:

```python
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }
]

model = genai.GenerativeModel(model_name="gemini-pro-vision",
                              generation_config=config,
                              safety_settings=safety_settings)

```
- **Defining Routes**: We define two routes - one for the home page and another for handling chat messages.

```python
@app.route('/', methods=['GET'])
def hello_world():
    return render_template("chat.html")

@app.route('/chat', methods=['POST'])
def chat():
    if 'user_image' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['user_image']

    if file.filename == '':
        return jsonify({"error": "No selected file"})

    if file:
        image_data = file.read()
        image_parts = [
            {
                "mime_type": file.content_type,
                "data": image_data
            },
        ]

        prompt_parts = [
            "You are Sheldon Cooper. User will upload an image. Based on the image, you have to come up with a Sheldon Cooper style fun fact. Also give a funny, sarcastic note about the image. \n\nUser's image:\n\n",
            image_parts[0],
            "\n\nFun fact:\n",
        ]    

        response = model.generate_content(prompt_parts)

        return jsonify({
            "response": marko.convert(response.text)
        })

```

Finally, we'll add the entrypoint for the file which runs the Flask development server.

```python
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
        <blockquote style="border-left: 4px solid #43a047;">Hi, I am Sheldon Cooper. Upload an image and I will tell you a fun fact.</blockquote>
    </div>
    <progress id="progress-bar" style="display: none"></progress>
    
    <!-- Updated form to include file upload -->
    <form id="chat-form">
        <div class="input-group mb-3">
            <input id="image-input" type="file" class="form-control">
        </div>
        <div class="input-group">
            <button type="submit" id="send-button" class="btn btn-primary">Upload</button>
        </div>
    </form>
</div>

```

Then, let's add some JavaScript to the page for interactivity:

```html
<script>
function appendImageToChat(file) {
    var reader = new FileReader();

    reader.onloadend = function () {
        var img = $('<img>').attr('src', reader.result).css({'max-width': '100%', 'height': 'auto'});
        $('#chat-box').append($('<blockquote>').css({'border-left': '4px solid dodgerblue'}).append(img));
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

$(function() {
    $('#chat-form').submit(function(e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this);
        var fileInput = $('#image-input')[0].files[0];

        formData.append('user_image', fileInput);

        if (fileInput) {
            $('#chat-box').append('<blockquote style="border-left: 4px solid #1288ff;">User: </blockquote>');
            appendImageToChat(fileInput);
            $('#image-input').val('');
            $('#progress-bar').show();
            
            // Use AJAX to send the formData to the server
            $.ajax({
                url: '/chat',
                type: 'POST',
                data: formData,
                processData: false, // Prevent jQuery from converting the data into a query string
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: function(data) {
                    $('#chat-box').append('<blockquote style="border-left: 4px solid #43a047;">Sheldon: ' + data.response + '</blockquote>');
                    $('#progress-bar').hide();
                },
                error: function() {
                    $('#chat-box').append('<blockquote style="border-left: 4px solid red;">Sheldon: Sorry, I am not able to respond at the moment.</blockquote>');
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

Set the `API_KEY` as environment variable in the terminal:

```bash
export API_KEY=your_api_key

```

## Interacting with Your Chatbot

Duration: 2
- The bot will greet you asking you to provide an image.
- Upload a JPG/PNG below 1MB to the interface and click Upload.
- The chatbot will respond with a fun fact about the image!

## Conclusion

Duration: 1

Congratulations! You've just built and deployed a software powered by Google's Gemini AI! This bot acts like Sheldon Cooper and provides facts about user's uploaded images!

## What's Next?

Duration: 1
- Experiment with different model parameters to see how they affect the output.
- Try integrating this chatbot into a larger web application.
- Explore other capabilities of Gemini AI.