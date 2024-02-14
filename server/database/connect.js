const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/e-comm')
    .then(() => {
        console.log('Mongodb connected')
    })
    .catch((err) => {
        console.log(err)
        console.log('Failed  to connect')
    })

require('../models/user')
require('../models/products')
require('../models/cart')
