# Task Manager

Task Manager is a simple web application to help you manage your tasks efficiently. It allows you to create, update, and delete tasks, as well as mark them as completed or pending.

## Features

- Create new tasks with title along with date.
- Mark tasks as completed or pending.
- Delete tasks you no longer need.
- Sort tasks based on different criteria (completed/pending)
- All the data is stored at local stroage in db.json file.
- User-friendly drag-and-drop functionality for easy task management.

## Server Setup

The Task Manager uses JSON Server to provide a simple REST API for managing tasks.

To run the JSON Server, use the following command:

```bash
npx json-server --watch data/db.json --port 8000

```
* After starting the JSON Server, open a new terminal and start the React web application using the following command:
```bash
npm start

```
This will start the development server for your React app. Open your browser and go to http://localhost:3000 to use the Task Manager.


  
