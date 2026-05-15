# Quick Gemini in React apps using Firebase Vertex AI

## Overview

Duration: 1

Hey there!

This codelab will walk you through the process of integrating Google's Gemini into your React apps with a simple 4 step process.

## Requirements

Duration: 2

In order to follow this codelab, you'll need the following:
- A [Google Cloud Platform](https://cloud.google.com/) account.
- A Google Account with [Firebase Console ](https://console.firebase.google.com/)access.
- Access to [Firebase Studio](https://firebase.studio)
- (Optional) Nodejs installed locally, if not using Firebase Studio.

## Setting Up Your Google Cloud Account

Duration: 10
- Head over to [Google Cloud Platform](https://console.cloud.google.com/) and create an account.
- Enable billing
- Create a new project, let's name it `project-x`.

If you're doing this at an in-person workshop and have access to trial credits from GCP, follow the instructions on screen to activate the account and redeem your credits.

## Access Firebase Console

Duration: 2

Head to [Firebase Console ](https://console.firebase.google.com/)and accept conditions as you like them.

## Access Firebase Studio

Duration: 2

Head to [Firebase Studio](https://studio.firebase.google.com) and accept any T&C as suitable.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-30.png)
## Create a React Project

Duration: 5

In Firebase Studio, click on "+ New Workspace" button to bring up the template selector page/modal. Choose "React".
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.16.05-AM.png)
Provide any name for your workspace and select the "Typescript" radio. You can choose to go with Javascript, you dinosaur.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.17.37-AM.png)
Wait for the workspace creation to complete because good things take time.

Once done, you should see the Firebase Studio code editor interface as shown below.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.20.24-AM.png)
Now, we're good to start integrating Firebase Vertex AI to our application!

## Create a Firebase Project

Duration: 5

Now, head to the Firebase Console at [https://console.firebase.google.com](https://console.firebase.google.com/).

Try clicking this fancy card - 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.25.02-AM.png)
Give your project any name as suitable.

Complete the next steps as you feel like, until you end up with another loading screen followed by -
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.27.13-AM.png)
## Get Project Config keys

Duration: 3

Now, we need to obtain the Firebase config keys for our project.

Head to Project Overview > Project Settings in the top left menu as shown below:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.27.51-AM.png)
Scroll down and Click the `</>` icon to setup a web app configuration for this project.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.28.12-AM.png)
You should see a form like the one shown below:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.28.29-AM.png)
Fill in the name and other details as you feel suitable. You should eventually be able to see the commands to run and the configuration keys.

## Add Firebase to your project code

Duration: 5

Head back to the editor interface in the Firebase Studio.

Open a new terminal at the bottom of the screen by clicking the `+` button as shown below - 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.35.15-AM.png)
Copy the command from the Firebase Console and run it into the new terminal: 

```curl
npm install firebase
```

If all goes well, you'll see a clean installation on your terminal, if not, you can see it below:
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.39.30-AM.png)
Next, create a file `config.ts` inside your `src` folder in the studio code editor.

Copy and paste the configuration provided in the Firebase Console. 

At the end of the `config.ts` file, add the following line to complete it for usage.

```typescript
export default app;
```

Your whole file should look like this now:

```typescript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSxxxxxxxxxxxxxxxxxx0r-nhRfFg",
  authDomain: "my-react-ai.firebaseapp.com",
  projectId: "my-react-ai",
  storageBucket: "my-react-ai.firebasestorage.app",
  messagingSenderId: "1871xxxxxxx999",
  appId: "1:1871xxxxxxx999:web:10xxxxxx7df9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
```

If you're successful till here, chances are you'll be successful in the rest of your life, and this codelab.

## Activate Firebase Vertex AI

Duration: 5

Head back to the Firebase Console. 

On the left menu bar, click on AI > Vertex AI. 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.44.42-AM.png)
Among the presented options of using Firebase Vertex AI, we'll go for "Vertex AI in Firebase" - 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.45.58-AM.png)
Click on Get Started to face the reality of life - good things don't come free. 

You'll be asked to create/select a billing account for this Firebase project. 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.46.52-AM.png)
Once you're done, you'll see the following approval of your affluence - 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.47.16-AM.png)
Now, the only thing remains is to activate the APIs required for running Vertex AI via Firebase.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.49.31-AM.png)
Click on the big blue "Enable APIs" button.

## Initalize and Integrate Firebase Vertex AI

Duration: 5

Now we're ready to start integrating Firebase Vertex AI into our React app. 

Head back to the Firebase Studio code editor and in the terminal, enter the following command:

```bash
firebase init
```

This will trigger a test of your faith in Firebase Studio. Choose to trust it as shown below: 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.54.03-AM.png)
Once granted, you'll be presented with a list of your Google Cloud Projects to choose from to link with this project on Firebase Studio.

Choose the one we recently created!
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.54.18-AM.png)
When done, your terminal will update to ask you which Firebase services you want to initialize for this project. 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.56.20-AM.png)
We don't really need any of these because there's no separate configuration required but just for the sake of completing the command, choose "Storage" and hit enter for the next steps. 

You'll be asked to select the relevant project you want to select for your code - choose the one you just created.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-10.57.47-AM.png)
Keep hitting "Enter" until this process completes.

Next, import the Vertex AI into your code in `config.ts` . Add the following line: 

```typescript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai"; // Add this line

...
```

Now we can initialize Gemini through Vertex AI and export it. Add the following lines in the `config.ts` after initializing the `app` but before exporting it: 

```typescript
...

const app = initializeApp(firebaseConfig);

// Add the lines below

// Initialize FirebaseApp
const app = initializeApp(firebaseConfig);

// Initialize the Vertex AI service
const vertexAI = getVertexAI(app);

// Initialize the generative model with a model that supports your use case
const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });

// Wrap in an async function so you can use await
export async function geminiApi(prompt: string) {
  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  return text;
}

// Add the lines above

export default app;
```

At this point, your entire file should look like this: 
[gemini-firebase-vertex-ai-react/src/config.ts at main · xprilion/gemini-firebase-vertex-ai-reactContribute to xprilion/gemini-firebase-vertex-ai-react development by creating an account on GitHub.![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/icon/pinned-octocat-093da3e6fa40.svg)GitHubxprilion![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/thumbnail/gemini-firebase-vertex-ai-react)](https://github.com/xprilion/gemini-firebase-vertex-ai-react/blob/main/src/config.ts)
If you're still with me, good news, we've arrived at the last step!

## Use Gemini in your React App

Duration: 10

Finally, we're ready to use the `geminiApi` function we've created. Let's quickly update the `App.tsx` file to create a UI for generating something using the Gemini API.

Update your `App.tsx` with the following code, compeltely replacing it is fine: 
[gemini-firebase-vertex-ai-react/src/App.tsx at main · xprilion/gemini-firebase-vertex-ai-reactContribute to xprilion/gemini-firebase-vertex-ai-react development by creating an account on GitHub.![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/icon/pinned-octocat-093da3e6fa40.svg)GitHubxprilion![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/thumbnail/gemini-firebase-vertex-ai-react)](https://github.com/xprilion/gemini-firebase-vertex-ai-react/blob/main/src/App.tsx)
This creates a simple interface for a "Gemini prompt enhancer" which essentially makes your simple prompts more nuanced and then allows you to use them!

In the Web tab on your Firebase Studio editor you should be able to see this: 
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/Screenshot-2025-05-04-at-11.10.59-AM.png)
## Conclusion

Duration: 2

Congratulations on making it here! 🎉

How easy was that!? Its just a few clicks and commands with a lot of defaults to integrate Gemini APIs into your existing Firebase apps - without having to add any extra keys or having to manage them! Best part - Vertex AI is production ready!

You can explore the entire codebase here: 
[GitHub - xprilion/gemini-firebase-vertex-ai-reactContribute to xprilion/gemini-firebase-vertex-ai-react development by creating an account on GitHub.![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/icon/pinned-octocat-093da3e6fa40.svg)GitHubxprilion![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/thumbnail/gemini-firebase-vertex-ai-react)](https://github.com/xprilion/gemini-firebase-vertex-ai-react)
If you found this codelab fun and useful, share it with someone who can benefit from this!

## What's Next?

Duration: 1
- Experiment with adding image generation via Firebase Vertex AI. Hint: Google for "firebase vertex ai imagen image generation".
- Add proper rate limits onto your app before giving it out to the world.
- Try adding Firebase Vertex AI on your Firebase Admin SDK apps.