const express = require('express')
const path = require('path')
const app = express()
const { v4 } = require('uuid')

let CONTACTS = [
    
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 1500)
})

app.post('/api/contacts', (req, res) => {
    const contact = { ...req.body, marked: false, id: v4() }
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(value => value.id !== req.params.id)
    res.status(200).json({ message: 'Contact deleted' })
})

app.put('/api/contacts/:id', (req, res) => {
    const index = CONTACTS.findIndex(value => value.id === req.params.id)
    CONTACTS[index] = req.body
    res.json(CONTACTS[index])
})




app.use( express.static(path.resolve(__dirname, 'client')) )

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Running on port 3000...'))
