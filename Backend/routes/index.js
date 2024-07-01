const express = require('express')

const router = express.Router({ mergeParams: true }) // позволяем использовать параметры маршрута (:userId, :roomId)

router.use('/', require('./auth')) // подключаем маршрутизатор из auth.js, который будет обрабатывать все запросы с '/'
router.use('/rooms', require('./room'))
router.use('/users', require('./user'))

module.exports = router
