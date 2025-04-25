# <center>DDoS-ME</center>
An experiment showing how an AI could potentially protect a server from a DDoS attack and introduce the concept of a DDoS attack.

## How it works
This repo consist of 4 different smaller projects

1. DDoS-ME-Frontend: It's a simple react app, where users can start an attack, change the attack interval and see some stats such as requests send and requests gone trough

2. DDoS-ME-Stats: A react app used to display metrics while the attack runs such as current server status and incoming requests. It's also used to control the experiemtn (start, stop, enable AI,change min attack interval)

3. DDoS-ME-AIProxy: This is basically the heart of this experiment. It proxies the incoming requests and blocks potential attacks. It also queries the stats from the the backend and stores them in the mongoDB. The AIProxy is also used to handle the backend funcionality for the DDoS-ME-Stats (quearying the latest data from DB, start and stop the experiment)

4. DDoS-ME-Backend: This is the backend for the DDoS-ME-Stats. It's the server thats beeing attaked. Since the routes don't really couse any computing it simulates some computing by utilising the CPU and memory by sorting and calculating some things to simulate load.

## How to use
1. Clone the repo
2. Run `docker-compose build`
3. Run `docker-compose up`
4. Start the frontend on `http://localhost:3000` by running `npm run start` in the frontend folder
5. Start the stats page on `http://localhost:3001`  by running `npm run start` in the stats folder

> You might need to change the local variable in the top of the api.js file in the frontend folder

> Note that this project was only build for a small demonstration for school so it's not well build, the instructions are bad (it might not work for you) and it probably has major bugs and security flaws -> (I mean I just disabled all CORS on the express servers to make it easier to test for me)

## Technologies
- React
- Node.js
- Express
- MongoDB
- Docker
- TailwindCSS

## Reason for this project
This project was made for a school presentation where we wanted to show how an AI could potentially protect a server from a DDoS attack. This project was made for just this purpose and is not meant to be used in production, since it has security flaws and is not well built.