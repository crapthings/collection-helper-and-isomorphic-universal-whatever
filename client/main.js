import axios from 'axios'
import '/lib/lib'

window.axios = axios

Meteor.startup(function () {
  Tracker.autorun(function () {
    if (!Meteor.userId()) {
      return Meteor.loginWithPassword('aaa', '123')
    }

    if (!Meteor.subscribe('pub-something').ready()) return

    console.log(Users.find().fetch())
    console.log(Users.myIssues().fetch())
    // console.log(UsefulCollectionWhatever.find().fetch())
  })

  Tracker.autorun(function () {
    if (!Meteor.userId()) return
    log({ ctx: UsefulCollectionWhatever.find().fetch(), space: 0 })
  })
})

function log ({ ctx, space = 2 }) {
  console.log(JSON.stringify(ctx, null, space))
}
