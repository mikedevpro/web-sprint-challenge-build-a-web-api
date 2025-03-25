// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const actions = await Action.get();
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get actions' })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
        res.json(action);
    } else {
        res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get action' })
  }
});

router.post('/',  async (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    return res.status(400).json({ message: 'Project_id, description, and notes are required' });
  }

  try {
    const newAction = await Action.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new action' });
  }
});

router.put('/:id', (req, res) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: 'You need to enter a project_id, description, and notes' })
        return;
    }

    Action.get(req.params.id)
    .then(resp => {
        if(resp) {
            Action.update(req.params.id, req.body)
            .then(innerResp => {
                res.status(200).json(innerResp)
            })
            .catch(error => {
                res.status(500).json({ message: 'Server error -- could not update' })
            })
        } else {
            res.status(404).json({ message: 'could not find an action with that id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Server error -- could not update' })
    })
})

router.delete('/:id', (req, res) => {
 Action.get(req.params.id)
 .then(resp => {
    if(resp) {
        Action.remove(req.params.id)
        .then(innerResp => {
            res.status(200).json({ message: 'deleted' })
        })
        .catch(error => {
            res.status(500).json({ message: 'Server error -- could not delete' })
        })
    } else { 
        res.status(404).json({ message: 'Could not find an action with that id' })
    }
 })
 .catch(error => {
    res.status(500).json({ message: 'Server error -- could not delete' })
 })
})



module.exports = router;