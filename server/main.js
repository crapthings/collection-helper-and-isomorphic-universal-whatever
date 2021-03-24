import { updateUsefulCollectionWhatever } from '/lib/lib'
import _ from 'lodash'
import axios from 'axios'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

WebApp.connectHandlers.use('/api', Meteor.bindEnvironment(app))

app.post('/updateUsefulCollectionWhatever', function (req, res) {
  return res.json(updateUsefulCollectionWhatever(req.body))
})

Meteor.publish('something', function () {
  return Users.find()
})

Meteor.publish('pub-something', function () {
  if (!this.userId) return this.stop()

  this.onStop(() => {
    this.timerId && Meteor.clearInterval(this.timerId)
  })

  const userCursor = Users.find({ _id: this.userId })
  // const myIssuesCursor = Users.myIssues()
  const myIssuesCursor = userCursor.fetch()[0].myIssuesHelper()
  // console.log(userCursor.fetch()[0].myIssuesHelper())

  Meteor.defer(async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    const somethingSendAloneWithDDP = {
      userId: this.userId,
      issueCount: myIssuesCursor.count(),
      ...data,
    }

    this.added('usefulCollectionWhatever', '1', { ...somethingSendAloneWithDDP, ts: Date.now(), status: 'added' })

    this.timerId = Meteor.setInterval(() => {
      this.changed('usefulCollectionWhatever', '1', { ...somethingSendAloneWithDDP, ts: Date.now(), status: 'changed' })
    }, 3000)
  })

  // return [userCursor, myIssuesCursor]
  return [userCursor, myIssuesCursor, UsefulCollectionWhatever.find({ _id: '1' })]
})

Meteor.startup(function () {
  resetPwd()
})

function resetPwd () {
  Accounts.setPassword(Users.findOne({ username: 'aaa' })._id, '123')
}
