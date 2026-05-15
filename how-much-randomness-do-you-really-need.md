# How much Randomness do you really need?

> tl;dr: This article doesn't tell you how to generate more random numbers, it asks you - do you need it? And also sort of tells you how to generate more random numbers along the way.

In a world full of choices, its easy to come across situations where you would want to offload the decision making to something as simple as a coin toss. Sometimes, you could also roll a dice for a large number of options. Or maybe several dices, with the increasing number of choices.

The learned elite of the [Math Exchange](https://math.stackexchange.com/) have some really [good advice on how to generate any size of random numbers by something as simple as rolling a dice several times](https://math.stackexchange.com/a/1200650). At the same time, it can be argued that generating a random number once is not enough, you need to do it several times and make a strategy to pick a number from them or using them.

I shall not be presenting much of my case for why we need random numbers to be truly random, or how difficult it is to achieve, that has been discussed at length by several tech frontrunners -
- [The Surprising Complexity of Randomness on Kdnuggets](https://www.kdnuggets.com/2017/06/surprising-complexity-randomness.html)
- [Cloudflare uses lava lamps to generate a fundamental resource: Randomness on QZ](https://qz.com/1642628/cloudflare-uses-lava-lamps-to-generate-a-crucial-resource)
- [League of Entropy by Cloudflare](https://www.cloudflare.com/en-gb/leagueofentropy/)
- [The Quest for Randomness on American Scientist](https://www.americanscientist.org/article/the-quest-for-randomness)

Randomness is a fascinating aspect of both nature and technology. It underpins everything from the evolutionary processes of biology to the algorithms securing our most sensitive digital transactions. But when it comes to integrating randomness into our systems and models, how much do we truly need? And what does it mean for our outcomes?
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-16.png)
How can we determine the levels of randomness of numbers?

## Understanding randomness

Randomness comes in various forms, and can be divided into several types of randomness based on how difficult it is for them to be predicted:

### Level 1: Deterministic sequence

Remember the traffic lights at the crossing? The sequence in which the lights change - from green to yellow to red and then back to green - is deterministic. This means the sequence is predefined and follows a set schedule, ensuring that each light phase occurs predictably. This predictability helps manage traffic flow efficiently, prevents accidents, and ensures pedestrians and vehicles can anticipate changes and act accordingly.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-17.png)
At this stage, there is no randomness.

Any mathematical function with one to one mapping is deterministic in randomness if passed a linear or periodic sequence of inputs.

### Level 2: Pseudo-Random Number Generators (PRNGs)

Probably the most widely used level of randomness in software development - the psuedo random number generators are the trick behind the random function in almost all major programming languages.

While PRNGs do not offer better cryptographic security of other possible algorithms, they provide an essential balance between speed, efficiency, and a sufficient level of unpredictability for many practical applications. Their ability to rapidly produce large volumes of pseudo-random numbers underpins a wide range of scientific, industrial, and entertainment applications, making them a fundamental tool in the arsenal of developers and researchers.

### Level 3: Cryptographically Secure Pseudo-Random Number Generators (CSPRNGs)

Unlike standard pseudo-random number generators, CSPRNGs are designed to produce sequences of numbers that are not only pseudo-random but also fulfill stringent cryptographic security criteria. This means that the numbers they generate cannot be feasibly predicted by attackers, even with knowledge of the generator's workings and prior outputs, making them indispensable in a variety of security-sensitive applications.

When you log into a website, the session management system generates a unique session token using a CSPRNG. This token is a large random number that serves as a temporary identity for your session. Because CSPRNGs ensure that these numbers are unpredictable, it becomes extremely difficult for attackers to hijack your session by guessing the token, thereby safeguarding your data and interactions with the site.

One of the most critical uses of CSPRNGs is in the generation of encryption keys. Whether for symmetric or asymmetric encryption, the strength of the encryption largely depends on the unpredictability of the key. CSPRNGs ensure that encryption keys are generated in a manner that makes them hard to predict, thus fortifying the encryption against attacks. Many authentication protocols require random challenges or tokens to be generated as part of the authentication process. CSPRNGs are used to produce these tokens to ensure they cannot be predicted by an attacker, thus securing the authentication mechanism.

### Level 4: True Random Number Generators (TRNGs)

True Random Number Generators (TRNGs) utilize fundamentally unpredictable physical processes to generate numbers. Unlike their pseudo-random counterparts, TRNGs do not rely on algorithms but instead on inherent randomness found in natural phenomena. This level of randomness is crucial in applications where the highest degree of unpredictability is required, such as in high-security cryptographic environments. For instance, the Lava lamps used by the good folk at Cloudflare!

TRNGs are the gold standard when absolute randomness is required. By relying on unpredictable physical processes, they provide a level of security and fairness that pseudo-random number generators cannot match.

Go check out [Cloudflare Randomness Beacon](https://developers.cloudflare.com/randomness-beacon/) - drand for a state of the art TRNG implementation - [https://drand.love/](https://drand.love/)

![random number gif](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXFmbWR3aHVxOTdyZDExdjQ4cjlhdnJldHo4MGtyNDRnenJraTNkcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qa3L7MniZuLQ6raaOp/giphy.gif)

True randomness - unpredictable and without patterns - has a mystical quality in science and engineering. However, running TRNGs is not a trivial task. It requires sophisticated hardware solutions to be running 24x7, failure-proof and without environmental bias.

In contrast to true randomness, PRNGs are much easier. While the sequences are not genuinely random because they are initialized with a 'seed' and will repeat their sequence if the seed is reused. Yet, for most applications, from simulations to video games, pseudo-randomness suffices. It's easier to generate, replicate, and test, which makes it incredibly valuable in software development.

## Understanding Hash Collision

A lot of requirements of randomness in software development are around generating unique hashes. That's where you try to come up with a string that when you put into your database, maybe as a unique identifier of a resource or a key, you want it to work without you having to explicitly check if its not already present in the database. Historically, using hash functions has worked out pretty well for this. However, there are times when the output of the hash function isn't unique and that's where the problem of Hash collision starts.

A hash collision occurs when two distinct inputs - like different files or data strings - are processed through a hash function and, surprise, they end up with the same hash value. It's as if two completely different paths unexpectedly lead you to the same destination.

In a perfect world, a hash function would give each unique input a unique hash, but due to the limitations of mathematics and the finite nature of hash values, collisions are theoretically possible. Think of it like this: if you're assigning a unique number to every star in the sky using a finite number of digits, eventually, you'll run out of numbers and have to repeat one.

Now, why should you care? In contexts where hashes are used to verify the integrity of data or authenticate information, a collision can be exploited to deceive systems into accepting a malicious file in place of a legitimate one. This vulnerability can be a real Achilles' heel in cybersecurity.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-19.png)
PS: The above meme is based on experiment by Nat McHugh published on their blog: [Create your own md5 hash collision](https://natmchugh.blogspot.com/2015/02/create-your-own-md5-collisions.html).

This is why, in the realm of cryptographic security, choosing robust hash functions, those with a lower likelihood of collisions, is crucial. MD5, once a poster child of hash functions, has shown its age and vulnerability, pushing the digital world towards more secure alternatives like SHA-256 or SHA-3.

## Randomness by use case

You don't really always need a lot of randomness in your regular developer life. Let's walk you through some calculations -

### Unique System Assigned Usernames

Some applications designate system generated random usernames to their users on sign up, which the user may or may not be able to change later. For such systems, its important to have good randomness in place to ensure that each username is unique without needing manual/automated intervention.

#### General strategy:

Using a pseudo-random generator can suffice, combining a predictable element (like a timestamp or user initials) with a randomly generated number or string. This provides a balance between uniqueness and simplicity, avoiding the need for high-level security measures that true randomness would entail.

#### My strategy:

When working on such systems, I've usually utilized the user's email along with the unix timestamp in the following manner -
- Strip the email of all special characters
- Hash it through md5 (yes, even though its not collision-proof)
- Append the current timestamp.

You might wonder, why did I use md5 even though I've trolled it in the previous section? The answer lies in the question - what is the probability of two users signing up on my website with emails that can cause the md5 function to produce the same hash at the same Unix timestamp?

**Collision Calculation**
- **Probability of same timestamp:** Let's assume your site has ((N)) users registering in a day ((86400 seconds)). If user registrations are uniformly distributed (which they typically are not, but we'll assume for simplicity), the probability ((p_t)) that two users register in the same second is (( \frac{1}{86400} )).
- **Probability of MD5 collision:** Even under conditions where two emails could hash to the same value, the actual observed incidence of MD5 collisions in non-adversarial contexts is exceedingly low. Conservatively, let’s assume the probability ((p_m)) of any two random strings producing the same MD5 hash is much less than the theoretical (( \frac{1}{2^{128}} )) due to MD5's vulnerabilities. A rough estimate might place it around (( \frac{1}{2^{64}} )) given practical considerations and known weaknesses.
- **Combined probability:** The combined probability ((P)) that two users have the same hash and register at the exact same second is roughly (( p_t \times p_m = \frac{1}{86400} \times \frac{1}{2^{64}} )).

**Numeric approximation:**

Given that ((2^{64} \approx 1.84 \times 10^{19})) and ((86400 \approx 8.64 \times 10^{4})), the probability becomes:

[[ P \approx \frac{1}{8.64 \times 10^{4} \times 1.84 \times 10^{19}} \approx \frac{1}{1.59 \times 10^{24}} ]]

This probability is astronomically low, indicating that under normal circumstances (non-adversarial), the likelihood of a collision from two users signing up in the same second with a colliding MD5 hash is virtually nil.

### System Suggested Project Names (like on GitHub)

Did you spot the cool, sometimes witty and weird project name suggestions that many websites, like Github, offer? There's a trick to generating these and I put those down into this repository - [https://github.com/xprilion/project-name-generator-api](https://github.com/xprilion/project-name-generator-api), a free hosted version of this api is available at - [https://project-name-generator-api.xprilion.com/](https://project-name-generator-api.xprilion.com/). The primary goal here is to provide memorable, yet unique project names that users can easily modify.

Turns out, not a lot of randomness is required for this use case. Similar to the previous use case, its okay to go along with even a single PRNG output of sufficient length. A simple algorithm can combine two or three words from a predefined list with some numeric values. The randomness here mainly helps in avoiding collisions and providing inspiration, rather than securing data.

**Collision Calculation**

To put together some math for this, if we selected 3 random words out of a 100 words pool for each (all pools having different set of words), and appended a random three digit number at the end,

[[ \text{Total combinations} = 100 \times 100 \times 100 \times 900 ]]

The total number of unique project names that can be generated is 900 million.

Let's again assume a realistic scenario where (( N )) is 1 million project names are generated and using a 128-bit hash function:

[[ P \approx \frac{N^2}{2M} ]]

Where (( M )) is the hash space size ((2^{128})).

The probability of a hash collision when generating 1,000,000 unique project names, using a combination of three words from different pools and a three-digit number, with a 128-bit hash function, is still approximately ((1.47 \times 10^{-27})). This remains an extremely low probability, indicating that the method is highly effective in preventing collisions even with a large number of names generated.

To add on it, in a situation like Github's where projects are made unique by `username/repo-name`, every user would have to refresh the project creation page millions of times to see the same suggestion twice.

### **Verification Tokens for User Account Creation or Email Link Login**

When the goal is to secure the token against guessing or brute-force attacks, ensuring that the token is valid only for the intended recipient and use case.

True randomness or high-quality pseudo-randomness generated by cryptographic methods is ideal. These tokens should be unpredictable and not repeatable, as they are crucial for security.

#### General Strategy

A very common way of achieving this is through CSPRNG. In Python, you can use the `secrets` package to get CSPRNG sequences easily.

```python
import secrets

def generate_secure_token(length=128):
    # Generate a secure random token using secrets, which is suitable for cryptographic use
    return secrets.token_urlsafe(length)

```

This function uses the secrets module’s token_urlsafe method, which generates a secure random URL-safe token. The length parameter controls the token's complexity, and the output is suitable for cryptographic purposes.

**Collision Calculation:**

Assuming a token length to 128 characters and using a character set of 64 possible characters.

**Number of Possible Tokens:** ((64^{128})) (64 characters raised to the power of 128).

Using the same birthday problem approximation:

[[ P \approx \frac{N^2}{2M} ]]

Where:
- (( N )) is the number of tokens generated (1,000,000 in this scenario).
- (( M )) is ((64^{128}))

Let’s calculate the updated collision probability for this configuration:

The probability of a hash collision when generating 1,000,000 verification tokens, each 128 characters long from a character set of 64 possible characters, is approximately ((3.22 \times 10^{-220})).

The token length of 128 characters vastly expands the possible token space, making collisions almost impossible under normal conditions. This provides an exceptionally robust method for generating secure verification tokens for critical applications such as secure login processes or user account verifications.
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-20.png)I'm So Random by xkcd: [https://xkcd.com/1210](https://xkcd.com/1210)
## Conclusion

With the increasing ease of generation of highly random numbers (and brute-force guessing them in adversarial scenarios), its import to resits the temptation of using costlier algorithms unless absolutely necessary. True randomness is rarely required in the common software development process. Usually, determining the collision probability and constraining your needs within realistic scenarios will let you decide better on how much randomness to require and to eventually save both on computational and storage costs.

Finally, remember, just because you have a great, truly random string as your password, doesn't mean it cannot be stolen - stay careful!
![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/4ml9m8u/2025/05/image-21.png)Security by xkcd: [https://xkcd.com/538](https://xkcd.com/538)