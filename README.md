# Push notification from Backend to Frontend

## Description

This project is a simple example of how to send a push notification from a backend to a frontend using a new experimental API called [PushManager](https://developer.mozilla.org/pt-BR/docs/Web/API/PushManager) on frontend and the library [web-push](https://www.npmjs.com/package/web-push) on backend.

## How to run

1. Clone this repository
2. Run `npm install` on both `frontend` and `backend` folders
3. Run `npm run dev` on `frontend` folder
4. Run `npm run dev` on `backend` folder
5. Access `http://localhost:5173/` on your browser, fill the input and click on the button "Send Notification".

## How it works

First of all, it's create a service worker on frontend that will listen to push notifications. When the user clicks on the button "Send Notification", the frontend will send a POST request to the backend with the user's subscription object. The backend will store this object and will send a push notification to the frontend. The frontend will receive this notification and will show it to the user.
