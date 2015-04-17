# Semitone

  - [Semitone GitHub repo]
  - [Semitone on Heroku]

The inspiration for this app came the night before I had to decide on a concept. I was playing through some printed sheet music on the piano, while singing along, and since a woman sang it originally, the key just wasn’t comfortable. I browsed around online to find the song in a better key, and the only sites that would transpose either required you to pay, or were really ugly and cluttered. With that, the idea came to fruition: search for songs, retrieve the chords, allow the user to change the key instantly, favorite the chords, share the chords via Facebook, and if necessary, listen to the original recording via an embedded YouTube video to get a feel for the rhythm. This app would be incredibly useful for voice teachers, since they have to accommodate many students with different vocal ranges, so I will likely share it with the members of a voice education organization I belong to.

Another possible usage scenario would be collaborative musicians. If you’re trying to learn new songs as a group, you can decide on a key and easily share the link through Facebook, noting which key is best.

I approached building the app from front to back. Getting a visual done, and then implementing the different technological aspects was very helpful for me in staying focused.

## Version

1.0.0

## Tech

I used the required technologies (Node.js, Express, PostgreSQL, data validation/encryption, etc), as well as Bootstrap, web scraping, and used and/or attempted the following:

### jQuery transposition plugin

I was able to find a very simple and effective jQuery plugin for the main purpose of my app: chord transposition (changing the key of a song so it better suits your vocal range). In order to function, the plugin required each song’s original key be inputted in a specific tag at the beginning of the song, however, this information wasn’t readily accessible in my data scraping. Since manually entering the original key of every song would be a burden for the user (and myself), I hard-coded the original key as Ab, and with Anil’s help, customized the plugin code so that it went from displaying these transposition options:

Ab  A  B  Bb  C  C#  D  Eb  E  F  F#  G  Ab

…to these transposition options:

1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16

The additional values were added to account for enharmonic notes and musical preferences (e.g. F# is the same as Gb, however some people might prefer F# minor and Gb major versus F# major and Gb minor).

> I’d really like to be able to save the key of the song that the user transposes to,
> however, since I’m using a plugin, that would take a bit more work, as the plugin
> isn’t permanently changing the data.

### Flash error messages in search bar

The process of handling search errors was fairly simple – I just used if statements to make sure certain values weren’t null. However, to reduce visual clutter, I attempted to populate the search bar with an alternate placeholder, displaying a specific error. After some tinkering, Melanie helped me get this to work, however, I later realized that every single error message would be put into the search bar, even if it was “User logged in”, so that had to go for now.

> I’d love to figure out a way to display only the respective error messages in
> the search bar, however, I’m not sure how feasible that’d be to maneuver
> through pre-built middleware.


### jQuery Autocomplete

One of my original visions for the app was to display search suggestions as the user types, however, I had to cut this from this initial version, due to time constraints and prioritizing getting other more functional aspects working first. Also, this seemed especially tricky, since the results would be coming from data scraping, and it might take a bit of time to update the autocomplete.

> Figuring out how to implement this would add a really cool element to the app,
> and I plan on taking another crack at it soon.


### Bootstrap modal authorization with Flash messages

I initially tried to use modals for log in and sign up, however, I wasn’t able to display error messages, since the modals disappeared, and then displayed the same error for both log in and sign up modals. So this had to go.


### Bootstrap modal favorites with adding favorites

Wasn't able to make favorites appear in the modal without refreshing the page. Would like to figure out how to use AJAX to make the newest favorite appear instantly.


[Semitone GitHub repo]:https://github.com/smithdp60/semitone

[Semitone on Heroku]:https://semitone.herokuapp.com/