
<h1>Visitor Solution</h1>
A solution for motioring Visitor to a company.
User can add a visitor and attach their respective host details in database. Host will get a mail and message <br>
with details of the visitor and their check in time.<br>
Visitor can check Out on leaving the company which will add their name to past visitor list updating their check<br>
ot time. A message will also be sent to visitor regarding their visiting details.


## Available Scripts

In the project directory, you can run:
### `cd client`
### `npm start`

Runs the Frontend app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
In Root Directory Run
### `npm run server`

Starts the server for Backend of the App on [http://localhost:5000](http://localhost:5000) built on NodeJs with mongo db as database.

<h1>Approach</h1>
<h2>This App is made on React and Node as prime languages with some external Apis.</h2>
Apis Used:-<br>
1) Nexmo-Api for sending text message<br>
2) Node Mailer:- Api for sending mail using gsmtp<br>

## working
-On opening the app user will be prompted to enter Visitor name,email, number on a Check in Screen.<br>
-User can add host to the visitor by proving his/her Name and Email.<br>
-On clicking check in Visitor will be addded to the data base.<br>
-a message and mail will be sent to the Host with details of the visitor

<br>
<br>
-There is option for checkout functionality which will prompt user to enter the name and email of visitor<br>
-An otp will be sent to the visitor on his mobile for checking out.<br>
-On entering the OTP visitor will be checked out and his name will be added to past visitor list in the database<br>
-A message and mail will be sent to the visitor with his visit details.




