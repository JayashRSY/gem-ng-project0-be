const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://JohnRakon:909090@cluster0.ttvlfxw.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(console.log("MongoDB Connected"))
    .catch(err => console.log(err))
