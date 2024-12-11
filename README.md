# Welcome to Evently: The Home of Music Events!

The code in this repo is for Evently, an event management website for music based events!

As a creator, you can add your events to the evently platform, making them available for users to view.

As a user, you can browse events and add them directly to your google calendar.

## Hosted Site

Here is the link to the hosted site: https://evently2024.netlify.app

Evently demonstration video: https://youtu.be/aNcu5NRtv40

## Accounts

### Admin
libakid932@paxnw.com
Evently321.

### User
rarata1225@jameagle.com
Evently321.

Organisation ID: 2398883364363

## Cloning the Repo and Project Setup

to clone the repo, in the command line, navigate to the directory you want to copy the repo to. Then run the following command:

`git clone https://github.com/amyf211/evently`

To install the necessary dependencies, you should also run:

`npm install`

You can now open the directory in your preferred code editor.

You should make a file titled '.gitignore' in the root of the project and add the following file names:

```
node_modules
.env
```

This is important for keeping your confidential information safe. The file '.env' is where we will store all our secret information.

The main secret you will need is an Eventbrite API key. For this, you will need to create an Eventbrite account. Login and go to Account Settings. Find 'Developer Links' and then go to 'API Keys' and 'Create API key'. Fill in the required information and click 'Create Key'. Once you get your API key, store this information in your '.env' file in the following format:

```
API_KEY=[YOUR_API_KEY]
```
For more information, please review the Eventbrite documentation: https://www.eventbrite.com/platform/docs/introduction

## Running the Project
To run the project, open the terminal and type: 

`node listen.js`

This should set the server running. Then, open a second terminal, type:

`cd frontend`

and then:

`npm run dev`

which should run the app. Hold ctrl/cmd and click the link to open the web app in your browser.