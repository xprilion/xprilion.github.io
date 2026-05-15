# Methods of Integrating Artificial Intelligence on Flutter

---

One of the coolest UI toolkit's for cross-platform applications, [Flutter](https://flutter.dev), a Google offering has grown rapidly in popularity over the last few years. While there are speculations about how Flutter could affect the developer ecosystem, with the under-development [Fuchsia](https://fuchsia.dev) constantly making observers thrum with excitement, we cannot ignore the uprising of another popular market term - artificial intelligence (AI). This blog discusses the confluence of Flutter with AI!

## But isn't AI super cool?

Yes, and it's hot as well!
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-7.png)
Source: [Your Truly](__GHOST_URL__/)

## Should Flutter devs care for AI?

> Definitely.

You'll not be the first to ask why you would need AI on mobile apps, or why would you need a unified way of performing machine learning on your business websites and apps. So let me quickly introduce you to some folks who made it big by incorporating machine learning in their business apps -

### 1. Google

When we're talking about machine learning and artificial intelligence in general, Google is one of the foremost names that pop up.

Being as smart as Google is definitely not an easy task for a human. They leveraged the power of AI as one of the earliest players and today, a plethora of Google products such as GMail, Google Assistant, Google Translate and others.

### 2. Netflix

Remember how tough it is to stop using the Netflix app once you started to explore the infinite treasures in it. each better than the previous? Netflix was one of the early betters on AI, and today, they lead the market of subscription based video streaming which keeps the viewers glued to their screens due to the power of recommendations that it makes.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-8.png)
Source: [Your Truly Returns](__GHOST_URL__/)

Oh, and, please get your own subscription even if your crush does not ask you for your account. (And tell her to get one too!)

---

By now, if you're convinced you do need artificial intelligence on your apps, let's move on to discuss the various methods you have available for making AI enabled apps!

## How do I get AI on my app?
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-9.png)
Source: [Your Truly Again](__GHOST_URL__/)

To integrate machine learning with your mobile apps, you\'ll need a model in place, and then, a way to call that model. In Flutter, the options you have available for running ML models in apps, at the time of writing this blog, are -
- Firebase ML Kit
- On-device models
- Models as APIs

Let's try to understand what each of these are, and how you would decide which one you would want.

### Firebase ML Kit

ML Kit is a part of the Firebase suite which allows app developers to quickly import and use machine learing models from the Firebase console. Besides having the ability to host and import custom models (not yet available on Firebase for Flutter), there are a number of readymade state-of-the-art models available on Firebase such as -
- Face detection
- On-device Translation
- Object detection and tracking
- Smart Reply, and others that keep getting added to the console!

This method is suitable when your application is using Firebase, or you have a custom model but do not want to host it on your own server setup. It is possible to cache the models hosted on Firebase, and hence this method is also suitable for model which expect regular but not very frequent updates.

### On-device models

On device models are very powerful if you want to perform high-speed inference directly on the devices of the app users. A very popular way of creating such models is to first create them as TensorFlow models, and then to export them as `.tflite` files. You can then use the ML Kit plugin in your Flutter app to import from within the project repository the stored `.tflite` file and run it for inference.

You can find a sample Flutter application using the Face detection model available on Firebase, by first downloading it and then using it as an on-device model [here](https://github.com/PacktPublishing/Mobile-Deep-Learning-Projects/tree/master/Chapter2/flutter_face_detection).

> The code in the sample repository given above has been detailed in *Chapter 2: Mobile Vision - Face Detection Using On-Device Models* of my book [Mobile Deep Learning with TensorFlow Lite, ML Kit and Flutter](https://www.packtpub.com/data/mobile-deep-learning-projects).

This method is most suitable when you want your app users to experience no lag in the time it takes the model to perform inference, and are also confident that the model will not require rapid updates.

### Models as APIs

This is another very popular method of integrating machine learning with apps. In this method, we wrap the model in an API service and host it using web based servers. These servers could be popular platforms like AWS Lambda, Google App Engine, Heroku or Virtual Machines with a runtime that supports running the model and serving it as a web based service.

This method is best suitable when you're comfortable with working with servers and web interfaces, and also expect the model to update very frequently.

I shall be discussing this method in details in the future blogs.