# Coding - Introduction

The word "code" has lots of meanings in computer science.
It's often used to talk about programming, and a program can be referred to as "source code".
Even binary representation of information is sometimes referred to as a code.
However, in this chapter (and the next three chapters),
the sense of coding that will be used is about clever representations of information that address a practical issue, such as encrypting the data to keep it secret.

In the previous chapter we looked at using binary representations to store all kinds of data — numbers, text, images and more.
But often simple binary representations don't work so well.
Sometimes they take up too much space, sometimes small errors in the data can cause big problems, and sometimes we worry that someone else could easily read our messages.
Most of the time all three of these things are a problem!
The codes that we will look at here overcome all of these problems, and are widely used for storing and transmitting important information.

The three main reasons that we use more complex representations of binary data are:

- **Compression:** this reduces the amount of space the data needs (for example, coding an audio file using MP3 compression can reduce the size of an audio file to well under 10% of its original size).

- **Encryption:** this changes the representation of data so that you need to have a "key" to unlock the message (for example, whenever your browser uses "https" instead of "http" to communicate with a website, encryption is being used to make sure that anyone eavesdropping on the connection can't make any sense of the information).

- **Error Control:** this adds extra information to your data so that if there are minor failures in the storage device or transmission, it is possible to detect that the data has been corrupted, and even reconstruct the information (for example, bar codes on products have an extra digit added to them so that if the bar code is scanned incorrectly in a checkout, it makes a warning sound instead of charging you for the wrong product).

Often all three of these are applied to the same data; for example, if you take a photo on a smartphone it is usually compressed using JPEG, stored in the phone's memory with error correction, and uploaded to the web through a wireless connection using an encryption protocol to prevent other people nearby getting a copy of the photo.

Without these forms of coding, digital devices would be very slow, have limited capacity, be unreliable, and be unable to keep your information private.
