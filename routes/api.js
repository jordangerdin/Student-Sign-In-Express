let express = require('express')
let db = require('../models')
let Sequelize = require('sequelize')
let Student = db.Student

let router = express.Router()

// Returns all students as JSON
router.get('/students', function(req, res, next) {
    Student.findAll( { order: ['starID']}).then( students => {
        return res.json(students)
    }).catch( err => next(err))
})

// Create a new student and return 201 status (ok)
router.post('/students', function(req, res, next) {
    Student.create(req.body).then( data => {
        return res.status(201).send('ok')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            // 400 = bad request from user
            console.log(messages)
            return res.status(400).json(messages)
        }
        console.log(err.data)
        return next(err)
    })
})

// Route for student details
router.patch('/students/:id', function(req, res, next) {
    Student.update( req.body, { where: { id: req.params.id } })
        .then( rowsModified => {
            if (!rowsModified[0]) {
                //404 = not found, student with this ID not found
            } else {
                return res.send('ok')
            }
        }).catch( err => {
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                // 400 code = bad request from user
                return res.status(400).json(messages)
            }
            return next(err)
        })
})

// Route for deleting students
router.delete('/students/:id', function(req, res, next) {
    Student.destroy({where: {id: req.params.id}})
        .then( rowsModified => {
            return res.send('ok')
        }).catch( err => next(err) )
})

module.exports = router