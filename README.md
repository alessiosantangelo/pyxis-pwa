# Progressive Web Application with Pyxis

Preview of some functionalities of Progressive Web Applications.
Keep in mind that **PWA requires HTTPS**.

Steps to make it work properly: 
1) Install the deps
2) Run development server
3) Tunnel the application via [LocalTunnel](https://github.com/localtunnel/localtunnel) to expose it to the internet.


## Install deps

In the project directory, you can run `npm install` to install all the deps.


### Run development server 

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Tunnel the application

`npx localtunnel -p 3000`

You can run this tunnel after your development server (`npm start`) has been started. 
This exposes _localhost:3000_ over _https_ on the internet giving you a domain name to resolve the host. 
