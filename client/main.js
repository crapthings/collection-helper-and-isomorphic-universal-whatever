import React from 'react'
import { render } from 'react-dom'
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

function Comp ({ result }) {
  return (
    <div>{result.map((user) => (
      <div key={user._id}>{user.username}</div>
    ))}</div>
  )
}

Meteor.startup(function () {
  const data = () => Users.已关闭的用户()
  render((
    <Meteor.SubscriptionComponent name='something' data={data}>
      {Comp}
    </Meteor.SubscriptionComponent>
  ), document.getElementById('app'))
})

function log ({ ctx, space = 2 }) {
  console.log(JSON.stringify(ctx, null, space))
}

function App () {
  return <div>app</div>
}
