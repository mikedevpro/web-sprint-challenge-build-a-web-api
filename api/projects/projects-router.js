// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Project = require('./projects-model')
const { validateBody } = require('./projects-middleware');

router.get('/', (req, res) => {
  Project.get()
  .then(resp => {
    res.status(200).json(resp);
  })
  .catch(error => {
    res.status(500).json({ message: 'Problem getting projects' })
  })
});

router.get('/:id', (req, res) => {
  Project.get(req.params.id)
  .then(resp => {
    if(resp) {
        res.status(201).json(resp);
    } else {
        res.status(404).json({ message: 'could find project' })
    }
  })
  .catch(error => {
    res.status(500).json({ message: 'Server error' })
  })
});

router.post('/', validateBody, (req, res) => {
  Project.insert(req.body)
  .then(project => {
    res.status(201).json(project);
  })
  .catch(error => {
    res.status(500).json({ message: 'Error adding post'})
  })
})

router.put('/:id', (req, res) => {
  if (req.body.completed == null || req.body.name == null || req.body.description == null) {
    res.status(400).json({
        message: "Provide completed status for the project",
    });
    return;
  }

  Project.update(req.params.id, req.body)
    .then((resp) => {
      res.status(200).json(resp);
    })
})

router.delete('/:id', (req, res) => {
  Project.get(req.params.id)
  .then(resp => {
    if(resp) {
        Project.remove(req.params.id)
        .then(resp => {
            res.status(200).json({ message: 'deleted' })
        })
        .catch(error => {
            res.status(500).json({ message: 'Server Error, could not delete' })
        })
    } else {
        res.status(404).json({ message: 'No project with that id'})
    }
  })
  .catch(error => {
    res.status(404).json({ message: 'Server error: could not delete' })
  })
})

router.get('/:id/actions', (req, res) => { 
  Project.get(req.params.id)
  .then(resp => {
    if(resp) {
        Project.getProjectActions(req.params.id)
        .then(innerResp => {
            res.status(200).json(innerResp);
        })
    } else {
        res.status(404).json({ message: 'could find a project with that id' })
    }
  })
  .catch(error => {
    res.status(500).json({ message: 'Server Error: could not get actions' })
  })
})


module.exports = router