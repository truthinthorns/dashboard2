To run this application:

1. In the root folder, run `npm run dev`
2. Pull a mongo image from dockerhub. In my case, I had to run `docker pull mongo:4.4.6`. That may be because I'm on a VM though.
3. Run the mongo image `docker run --name mongo -p 27017:27017 -d mongo:4.4.6`.
3. In the backend folder, run `uvicorn server:app --port 5000 --reload`


To access Swagger:
In a browser, go to `localhost:5000/docs`

To access the frontend:
In a browser, go to `localhost:5173`. You must allow location access for the app to function correctly.