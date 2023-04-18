# 3D Model Viewer

This is 3D model Uploader and Viewer. Created using MERN stack.

## Installation

```bash
  * git clone https://github.com/AyRawat/3D-Model-Viewer
  * cd 3D-Model-Viewer
  * cd client
  * npm i
  * npm run dev
  * cd ..
  * cd server
  * npm start
```

Open up your favorite browser and navigate to http://localhost:5173/ and you should see the Home Page.

## App Structure

```
>Root
 ->App
  -->FileComponent
  -->ShowCaseComponent
   ---->Model
```

## Functionality

1. Upload 3D files (.gltb,glb,ftx).
2. Save Models in DB
3. Display 3D model.

## Design Choices

1. Why choose a Framework ?
   Framework makes managing a lot of things easier. Managing state, library support, and routing are some of the key advantages of using frameworks.

2. Why React ?
   Three.js is a powerful javascript library that can be used to render 3D models in a browser. There is a library called React Three Fibre, that is built for React to work with 3D models and is maintained continuously. I used this library extensively and Also, React has a huge community, so you can always get some help whenever you are stuck

3. Bootstrap
   Bootstrap makes things easy, as it comes with a lot of prebuilt components. Also, it helps a lot in Layouting the components.

4. Node.js
   Since, I was using React.js (which is essentially a JS Front end framework) , using Node.js (a JS runtime environment) was a good choice. Besides, Node.js comes with a lot of advantage but the primary reason for choosing Node.js was to seemlessly integrate front-end back-end and MongoDb Databases.

5. Express.js
   Express.js is a fast and lightweight web application framework for Node.js. It provides a robust set of features for building web and mobile applications, APIs, and web services. I used it for routing, and handling CORS.

6. MongoDb
   Mongo is a NoSQL database. I used mongodb because there is no relation in the records that we are storing. MongoDB also has built-in features like GridFS, which allows for efficient storage and retrieval of large files.

7. Tailwind CSS
   Used Tailwind for adding styles to components. It is easy to use and brings a lot of customisability to the table.

##Database Schema

    filename: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    data: {
      type: Buffer,
      required: true,
    },
    { timestamps: {true}

\*\*example

```
{
    filename: "car.gltf"
    mimeType: "model/gltf""
    description: "V8 Specs"
    data : <Files stored in Binary Format>
}
```

This schema consists of the basic things that are required to store and render the model.

1. data -> of Buffer type, to save the file
2. mimeType -> metadata parameter of file
3. filename-> File name
4. description -> Description about the file
5. timestamp-> to always get the latest file

## Approach

1. Upload the File and details From Front-end.
2. Save the File to DB.
3. Redirect to second page
4. Download the File.
5. Display it on the second page.

## Challenges

1. ### Storing File in DB
   3D files cannot be stored directly, in the Databases. Even though I was using a Cloud based DB (MongoDB-Atlas), the file cannot be stored directly. It has to be converted to Binary before insertion.

Solution: I used Node's Buffer class to convert the file to a Binary form.

2. ### Passing the file's data from Front-end to Back-end
   Files cannot be passed direclty. Just like the objects and other variables. I tried to use some libraries for this, but most of them were for images and were PAID.

Solution : I used multer to read the data on back-end. Multer is a popular middleware for handling multipart/form-data which is primarily used for file uploads. In the context of Node.js, Multer is a Node.js package that simplifies the process of handling file uploads.

2. ### Downloading the file
   As, I was saving the file in Binary format, I first needed to convert it into its original form. but React is a front-end framework it doesn't have access to file system.

Solution: The only option to parse the file back to its original form was to use Node.js fs (inbuilt File Sytem library) library.So, I did exactly that, but instead of writing file to server, I made it write it inside the "public" folder of React, from where it can be accessed.

3. ### Making this operation Asynchronous
   There are two screens, The first one uploads the file , and second one displays it. And the size of the file is very large. The problem arises when we start uploading the file and the upload is not yet completed, even if it is, and we reach to the second screen,(where we need to download the file,read it and display it), and the file is not downloaded yet, The app crashes in this case.

Solution : Even though JS is single threaded, event loop makes it possible to do Async Operations in Node.js. So I used setTimeout to wait for sometime and set up a loader , so that user won't feel that nothing is happening. and rendered the Model when it was available.

## API Reference

#### Get Model

- Description : Get Recent Model.

```
curl --location 'http://localhost:8000/api/getModel' \
--header 'Content-Type: application/json'
```

Response

```
    {
        "name": "M5.gltf",
        "description": false,
        "mimeType": "model/glTF",
        "title": "Scene",
        "__v": 0
    },

```

#### DELETE - Delete All Models

```
| Parameter | Type     | Description                       |
| XXX---NO Parameters- |


```

```
curl --location --request DELETE 'http://localhost:8000/api/deleteModel'
```

Response

```
{
    "message": "No. of Rows Deleted: 1"
}
```

#### POST - Add Model

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-----------|
| `name`      | `string` | **Required**. e.g testFile"|
| `mimeType`      | `string` | **Required**. e.g model/gltf+json"|
| `file`      | `gltf, glb ,ftx` | **Required**. e.g any 3d file"|
| `description`| `string` | **Required**. e.g 'lets test it' "|


```

```
curl --location 'http://localhost:8000/api/saveModel' \
--form 'name="test"' \
--form 'mimetype="model/gltf+json"' \
--form 'file=@"/Users/ayushrawat/Documents/Personal_Projects/Demo_3D_project/demo-project/public/desktop_pc/scene.gltf"' \
--form 'description="This is a 3D model of BMW M5 LCS"'
```
