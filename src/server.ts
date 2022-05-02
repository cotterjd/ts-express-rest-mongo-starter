require(`dotenv`).config() // load env vars from .env file
const { log } = console
const app = require(`express`)()
const bodyParser = require(`body-parser`)
const cors = require(`cors`)
const controller = require(`./controllers`)
const mongo = require(`./config/mongo`)

app.use(cors()) // enables cors for all origins
app.use(bodyParser.json()) // to be able to receive json in requests

app.get('/:name', controller.getExample)
app.post('/', controller.postExample)

app.set('port', process.env.PORT || 3040)
const runMessage: string = 'Node app is running on port'
mongo.initDb((err, _) => {
  if (err) console.error(err)
  else app.listen(app.get('port'), function () {
    console.log(runMessage, app.get('port'))
  })
})

module.exports = app
