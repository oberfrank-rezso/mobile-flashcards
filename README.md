# Mobile Flashcards

A React Native iOS application built with `expo` that allows you to create study decks and add questions to them.

Readable was created for the final assessment project for the **Udacity's React Native course**.

## Quickstart

Clone the repository and install dependecies. Run the development server using `yarn start`.

```bash
$ git clone https://github.com/oberfrank-rezso/mobile-flashcards
$ cd mobile-flashcards
$ yarn install
$ yarn start
```

**Important** This project was developed for and tested only on iOS.

## Notifications

* The notification system is fully in the background
* It does not send notifications to the user on the day of first running the application even with no quiz completed [that would be really pushy]
* Every time a quiz runs it clears the notification for that day and sets it up for the upcoming days at 20:00

## Acknowledgments

Thanks to the instuctors at Udacity! Also, I've read a lot and watched countless videos on the way, I couldn't list them all even if I set out to but I wanted to show my gratitude somehow.

## Contributing

Both pull requests and bug reports are welcomed. Please don't hesitate to show me ideas and best practices if you feel like it.