const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
const port = 3010;

app.use(cors());
app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

app.get('/tasks/add', (req, res) => {
  let taskId=parseInt(req.query.taskId);
  let text=req.query.text;
  let priority=req.query.priority;
  let taskNew={taskId,text,priority};
  tasks.push(taskNew);
  res.json({tasks});
});

app.get('/tasks', (req, res) => {
  res.json({tasks});
});


app.get('/tasks/sort-by-priority', (req, res) => {
  let sortTask=tasks.sort((a,b)=>a.priority-b.priority);
  res.json({sortTask});
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId=parseInt(req.query.taskId);
  let newPriority=parseInt(req.query.priority);
  for(let i=0;i<tasks.length;i++){
      if(tasks[i].taskId===taskId)
          tasks[i].priority=newPriority;
  }
  res.json({tasks});
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId=parseInt(req.query.taskId);
  let text=req.query.text;
  for(let i=0;i<tasks.length;i++){
      if(tasks[i].taskId===taskId)
          tasks[i].text=text;
  }
  res.json({tasks});
});

app.get('/tasks/delete', (req, res) => {
  let taskId=parseInt(req.query.taskId);
  for(let i=0;i<tasks.length;i++){
      if(tasks[i].taskId===taskId)
          tasks.splice(i,1);
  }
  res.json({tasks});
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority=parseInt(req.query.priority);
  let task=tasks.filter((a)=>a.priority===priority);
  res.json({task});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
