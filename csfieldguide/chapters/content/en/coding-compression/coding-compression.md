# Coding - Compression

Data compression reduces the amount of space needed to store files.
If you can halve the size of a file, you can store twice as many files for the same cost, or you can download the files twice as fast (and at half the cost if you're paying for the download).
Even though disks are getting bigger and high bandwidth is becoming common, it's nice to get even more value by working with smaller, compressed files.
For large data warehouses, like those kept by Google and Facebook, halving the amount of space taken can represent a massive reduction in the space and computing required, and consequently big savings in power consumption and cooling, and a huge reduction in the impact on the environment.

Common forms of compression that are currently in use include JPEG (used for photos), MP3 (used for audio), MPEG (used for videos including DVDs), and ZIP (for many kinds of data).
For example, the JPEG method reduces photos to a tenth or smaller of their original size, which means that a camera can store 10 times as many photos, and images on the web can be downloaded 10 times faster.

So what's the catch? Well, there can be an issue with the quality of the data – for example, a highly compressed JPEG image doesn't look as sharp as an image that hasn't been compressed.
Also, it takes processing time to compress and decompress the data. In most cases, the tradeoff is worth it, but not always.

{interactive slug="compression-comparer" type="in-page"}

In this chapter we'll look at how compression might be done, what the benefits are, and the costs associated with using compressed data that need to be considered when deciding whether or not to compress data.

We'll start with a simple example – Run Length Encoding – which gives some insight into the benefits and the issues around compression.

{panel type="teacher-note"}

# Locked in activity

An intriguing activity that relates to compression is the ["locked-in" activity](http://www.cs4fn.org/lockedin.html) from CS4FN.
In this activity, students simulate writing some text using a method used by Jean-Dominique Bauby, who was completely unable to move except for blinking one eye.
With a simple binary interface (blinking or not blinking) he was able to author an entire book.
It is well worth getting students to work in pairs, and have one try to communicate a word or short phrase strictly by blinking only.
It raises many questions, including how it could be done in the shortest time and with the minimum effort.
Of course, the first step is to work out how to convey any text at all!

{panel end}
