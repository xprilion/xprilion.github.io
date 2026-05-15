# Build a Gemini Store with Google Sheets

## Overview

Duration: 1

Have you ever been in a situation where you had to qualitatively analyse a large amount of data on a spreadsheet and you wished for someone to take away your pain? With Google's Gemini running directly in your Google Sheets you can now have a super smart AI assistant do the grind work for you!

In this article, we'll cover a very simple way of giving personalities or specific roles to your Gemini powered API calls via the simple and popular interface of Google Sheets!

Here's a screen recording of what we're building:

## Requirements

Duration: 2

In order to follow this codelab, you'll need the following:
- Access to a Google Account
- Access to Google's Gemini Pro APIs via Google AI Studio

## Architecture

Duration: 2

We'll be building our product's architecture in the following manner:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-3.png)
The Google Sheets will interact on every edit operation with the associated Apps Script for that Sheet which in turn talks to the Gemini Pro API. We'll be using the Gemini Pro API via the Google AI Studio in order to get some free API calls at the cost of being non-production ready. However, you can use Gemini Pro APIs via Vertex AI for production workloads.

## Get the Gemini API Key

Duration: 3

Now, let's get an API Key to access the Gemini Pro APIs.
- Head over to [Google AI Studio](https://makersuite.google.com/)
- Click on [Get API Key](https://makersuite.google.com/app/apikey)
- Follow the steps provided on the page to generate an API Key. Store the key safely.

## Setup your Google Sheet

Duration: 5

Let us setup your Google Sheet to work like a Gemini Store. To do so, we'll create a second sheet in the default Google Sheet document titled "Geminis".

Fill the following data in this sheet (only for example, you can change as per your wish):

| name | sys prompt |
| --- | --- |
| Pilot Gemini | Drawing on your extensive experience as a seasoned pilot, how would you explain or advise on the following aviation-related query? Use a lot of Pilot terms! |
| Pirate Gemini | As a legendary pirate who has sailed the seven seas, how would you respond to this inquiry with your adventurous spirit and nautical knowledge? Reply in pirate language only. |
| Techie Gemini | As a tech enthusiast with a passion for the latest gadgets and innovations, how would you explain or solve this technology-related problem? Use techie terms! |

## Setup your Apps Script

Duration: 3

We will now create the AppScript code to interface between Google Sheets and the Gemini Pro API.
- Create a new Google Sheet and create the following columns in it: `GeminiName`, `Query`, `Response`.
- In your Google Sheet, Click on `Extensions > Apps Script`
- We'll be editing the `Code.gs` file. Remove the current contents of this file and head to the next step!

## Listen to onEdit changes to the sheet

Duration: 3

In your `Code.gs` file, add the following function which listens to each edit on the Google Sheet and decides if it needs to perform any action on it.

```javascript
function onEdit(e) {
  var formResponsesSheet = e.source.getSheetByName('Sheet1'); // Use getSheetByName for clarity
  var editedRow = e.range.getRow();
  
  // Avoid running on header row or rows beyond the last content row
  if (editedRow === 1 || editedRow > formResponsesSheet.getLastRow()) {
    return; // Exit if the edit is in the header or beyond the last content row
  }

  var rowData = formResponsesSheet.getRange(editedRow, 1, 1, 7).getValues()[0];
  
  // Check if all required columns are filled (columns 1 to 7, excluding 'Response')
  if (!rowData.every(isColumnFilled)) {
    return; // Exit if not all required fields are filled
  }

  var chosenGemini = rowData[0]; // 'Choose your Gemini' is the third column
  var userQuestion = rowData[1]; // 'Say/Ask something' is the fourth column

  var geminisSheet = e.source.getSheetByName('Geminis');
  var geminiData = geminisSheet.getRange(2, 1, geminisSheet.getLastRow() - 1, 2).getValues();
  
  var systemPrompt = findSystemPrompt(geminiData, chosenGemini, userQuestion);
  
  if (systemPrompt) {
    var apiResponse = callApi(systemPrompt);
    formResponsesSheet.getRange(editedRow, 2).setValue(apiResponse); // Assuming 'Response' is in the 8th column
  } else {
    formResponsesSheet.getRange(editedRow, 2).setValue("Error: Gemini not found or other error occurred.");
  }
}

```

## Create Helper functions

Duration: 3

Now, let's setup two helper functions to work with the script. The `isColumnFilled` function checks if that row is full before trying to hit the Gemini API. The `findSystemPrompt` function loads the system prompt we defined in the Geminis sheet corresponding the Gemini name chosen by the user in the row.

```javascript
// Helper function to check if a column is filled
function isColumnFilled(content) {
  return content !== null && content !== ''; // Checks if content is not null and not an empty string
}

function findSystemPrompt(geminiData, chosenGemini, userQuestion) {
  for (var i = 0; i < geminiData.length; i++) {
    if (geminiData[i][0] === chosenGemini) {
      return geminiData[i][1] + " Max 50 words. Keep it funny and light-hearted. " + " \n User: " + userQuestion + " \n Answer: ";
    }
  }
  return null; // Return null if no matching Gemini is found
}

```

## Call Gemini Pro API

Duration: 3

Finally, we'll create the `callApi` function which makes the call to Gemini Pro API and sets the output in the sheet.

```javascript
function callApi(prompt) {
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY'; // Replace with your actual API Key
  var payload = {"contents":[{"parts":[{"text": prompt}]}]};
  var options = {
    "method" : "post",
    "contentType": "application/json",
    "payload" : JSON.stringify(payload)
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var jsonResponse = JSON.parse(response.getContentText());
    return jsonResponse.candidates[0].content.parts[0].text;
  } catch (error) {
    return "API call failed: " + error.toString();
  }
}

```

## Setup onEdit trigger

Duration: 3

As a final step, you will have to setup the onEdit trigger to execute every time edits are made to your Google Sheet. Click on the "clock" icon on the Apps Script interface to access the triggers section for your Apps Script.

Add a trigger with the configuration as shown below and click on Save.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-4.png)
## Test the integration

Duration: 2

Now, create a new row in the sheet to test if everything works alright! If all goes well, you should see the Gemini response according to your chosen Gemini in the Response column!