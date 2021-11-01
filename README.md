_(This was created during my time as a student at Code Chrysalis)_

# Kids Book Sharing Library

A full stack web app to allow parents to share any unwanted kids books, and to request books from other parents.

![Main Page](/readmeimg/hMowNBEE5f.gif)

## How To Use

#### Sign Up as a User

You can sign up for an account using your email and password. Authentication is handled by google so your details aren't stored locally within the app.

#### Add your postal address

(the is needed so you can receive your books)

#### Add Books

Add any books you want to offer by using the 'Add Book ' menu option

- Give the book's name as accurately as possible.
- Give the books Author (if possible)
- Confirm that the book is in good enough condition to share with other families
- Press the 'Submit' button

#### Request Books

Browse the Library page. If there is an available book that you'd like to request, click the 'Request Book' button.
To cancel a request, click the 'Cancel Request' button. (Note, you can only cancel before a book has been sent)

#### Track Status of books

On the 'My Books' page you can see the status of all books related to you.

![My Books Page](/readmeimg/vXvshNRe7f.gif)

You can see:

- **Offering:** Books you are offering to share. You can delete if you have changed your mind.
- **Requested:** Books you have requested from others that have not been sent yet. You can cancel the request.
- **To be sent:** Books you need to send to another user. You can mark as sent.
- **Sent (in Transit):** Books that you have sent, or that have been sent to you, but have not yet arrived. You can mark as received when they arrive.
- **They received:** Books you have successfully sent to others.
- **I received:** Books you have successfully recieved from others.

#### Update your details

On the 'Update User' page you can update your address and other details.

## App details

The front end is built in React with Styled Components, hosted on Firebase Hosting
The back end is a Firestore Relational Database hosted on Firebase

## How To Develop & Deploy

#### Installation

- Fork and Clone from GitHub
- `cd` into the directory and run `npm install`
- Create a (free) Firebase account if you don't already have one.
- Install the firebase cli globally with `npm install -g firebase-tools`
- Sign in to Google using `firebase login`
- Initiate your project by running this command from your app’s root directory: `firebase init`
- Note: Select One Page App and set the public directory to build when asked.

create a .env file in the root of your project to hold private data like api keys. Firebase should give you this information as part of the firebaseConfig object.
Format as below:

```
REACT_APP_APIKEY=
REACT_APP_MESSAGINGSENDERID=
REACT_APP_APPID=
REACT_APP_MEASUREMENTID=
```

#### Development

- check out the readme and package.json
- run `npm start` to start the live development server.

#### Deployment

- Stop the dev server and run `npm run build` from the root directory of your project. This should build the files into the build folder.
- Also in the root folder of your project, run `firebase deploy` to deploy to firebase.

## Notes:

- Uses proxy on localhost to get cover images without CORS issues. Uses full path on production.
