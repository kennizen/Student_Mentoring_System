## Steps to get started with connecting to the database.

### Step 1

Make sure to have docker installed in you system if not follow this [link](https://www.docker.com/) to install it. Once you have docker you will be required to have MongoDB Compass. Install it from [here](https://www.mongodb.com/products/tools/compass).

### Step 2

Now, first let's install the docker image for mongoDb as we will be using mongoDb database locally inside docker container.

```
docker pull mongodb/mongodb-community-server:latest
```

Next run the image using a container with the following command

```
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

The container will start if the docker installation is successfully done in your system. The container name here is `mongodb` and it will be running on port `27017`. If you have docker desktop installed you can also view it there.

### Step 3

Open mongoDB compass application, put the following URL to connect to the database `mongodb://localhost:27017`. Once connected create a new database with the name `student_mentoring_system` and collection name as `admins`.

Open the collection in the compass application and insert a document there as follows

```json
{
  "_id": { "$oid": "6741741279e78d9d48608d96" },
  "email": "admin@gmail.com",
  "password": "$2a$08$.0d/IbOXMYXQ/wZ60hdi0OoCqP9vlVFwWrnHWnlgq6QkWpdVVoYhm",
  "firstname": "Admin",
  "middlename": "",
  "lastname": "",
  "avatar": { "url": "", "id": "" },
  "role": "Admin",
  "tokens": [],
  "isEmailVerified": false
}
```

This is the pre seeded admin info so that you can login as admin to perform managerial operations.

When logging in as an admin use the credentials as `email address = admin@gmail.com` and `password = admin1234`

Rename `server/.env.dev.sample` to `.env`, inside the `.env` file you can find many environment variables. Set `MONGO_DB_URI` to `mongodb://localhost:27017/student_mentoring_system`

### Step 4

Run the server using the command 

```
npm run dev
```

You should see that the server is running successfully with the message connected to the database.