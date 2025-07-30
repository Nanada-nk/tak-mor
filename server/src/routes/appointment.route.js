import express from 'express'

const appointmentRouter = express.Router()

appointmentRouter.post('/', ()=>{})
appointmentRouter.get('/', ()=>{})
appointmentRouter.get('/:id', ()=>{})
appointmentRouter.put('/:id/status', ()=>{})
appointmentRouter.delete('/:id', ()=>{})


export default appointmentRouter