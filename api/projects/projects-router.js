// Write your "projects" router here!
const express = require('express');
const Project = require('./projects/projects-model.js');
const router = express.Router();

router.get('/api/projects', (req, res) => {
  Project.find(req.query)
    .then(projects => {
      res.json(projects)
    })
    .catch([])
});

router.get('/api/projects/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      console.log(project)
    })
    .catch(err => {
      res.status(404).json({
        message: 'error getting projects',
        err: err.message,
        stack: err.stack,
      })
    })
});

router.post('/api/projects', (req, res) => {

})

router.put('/api/projects/:id', (req, res) => {

})

router.delete('/api/projects/:id', (req, res) => {

})

router.get('/api/projects/:id/actions', (req, res) => {

})


module.exports = router