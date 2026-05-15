# Machine Learning On 2GB RAM

If you think you read the title, or maybe I typed it wrong, you're wrong in both cases. The title proposes an article about performing machine learning with the bare minimum RAM usage, and that's what this article is going to be about.

You might think I am joking. Maybe that's what my life felt like when I did actually survive performing ML on a 2GB RAM laptop. However, I learned much from that phase, and have used those learnings till today to make decisions while choosing the right amount of RAM I would need for running my ML models.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-10.png)
I am in no manner an expert of advicing about RAM requirements of applications, neither will I attempt to do so. What I share in this blog are simple observationsal learnings which I believe can be helpful at times.

Enough prologue, let's dive in!

## So, how did you do it?
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-11.png)
Okay, it's not magic.

Rather, I found out all possible ways to reduce the amount of RAM the forever running processes on my laptop were consuming. That left more power for the ML models to run! For this, I had to trim down the list of applications I needed to run parallely on the laptop.

It can get confusing and tough to choose the 'right set of applications' you need.

## How do I decide what applications I need?

If you do not have a definite plan and list of requirements that you have from your system, it can be tough to choose the applications you need to run parallely.

In my case, I needed to run machine learning models, but I also had a daily limit on the Internet bandwidth available to me. I had two choices -
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-12.png)
I could choose to run my ML models locally and save on the daily limit on my Internet. But then I would have to spend on buying an extension for the RAM. Or I could run the models online and find a way to minimize my Internet consumption.

This is a story of how I chose the latter option, and never looked back.

> Also, it is a short reminder that decisions made by developers often revolve around financial constraints and that's **okay**.

Once you have laid down all your needs and constraints very clearly before yourself, you'll find it simple to sort things out. Try putting them on a paper! :)

## What applications did I choose?

After more decisions like the example above, my list of requirements boiled down to the following -

### 1. A minimal Linux desktop

For this I chose [LXDE](https://wiki.lxde.org/en/Main_Page) which in its default installation contained the [Openbox](https://wiki.lxde.org/en/Openbox) desktop environment. It is super minimal, only offering me with a black screen and a menu to get things done in the most frills-away manner.

With this choice, I immediately dropped the RAM usage by the default applications on my system to something around 200-300 MBs. I still had almost 6x the amount of that RAM to play with!

### 2. A code editor that didn't do what I did not ask it to

While you may love your favorite code editor, it is worthwhile to check the amount of resources it is eating on your system. With [Spyder](https://www.spyder-ide.org/), I felt power, but that power felt sluggish.

As a replacement to Spyder, I chose to use [Google Colaboratory](https://colab.research.google.com/) (we'll talk about this again) in the browser and for non-ML related tasks, I chose [Sublime Text](https://www.sublimetext.com/3).

Sublime Text gave me a barebones editor with a few cool things, which didn't eat away at the RAM. Hence, leaving me enough free RAM to run a browser!

### 3. A browser that was modern and fast

Now this is where you may doubt my choice - I chose [Google Chrome](https://www.google.com/chrome/) as my only browser on the system.

Yes, it did consume a lot of RAM. But at the same time, it offered me superb support for Colaboratory which I was going to use for running my ML models. The decision was simple.

A habit of minimal Chrome tab usage was developed. I still obsessively close tabs which I do not need.

## Is that all?

Yeah, that's pretty much all the setup you'll need to start using your old dusty laptop for machine learning experiments!
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/04/image-13.png)
Actually, we can have the questions in the comments below.

## What did you learn today

Today, in under 3 minutes you went through my then painful story of how I started my machine learning exploration on a 2GB RAM machine back in 2016. I hope this inspires you to crunch more results out of your current laptop!