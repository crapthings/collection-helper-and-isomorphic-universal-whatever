import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

Activities = new Mongo.Collection('activities')
GroupMembers = new Mongo.Collection('groupmembers')
Groups = new Mongo.Collection('groups')
IssueMembers = new Mongo.Collection('issuemembers')
Users = Meteor.users
UsefulCollectionWhatever = new Mongo.Collection('usefulCollectionWhatever', { connection: Meteor.isServer && null })

Users.myIssues = function () {
  const IssueMembersCursor = IssueMembers.find({ userId: Meteor.userId() })
  return IssueMembersCursor
}

Users.helpers({
  myIssuesHelper () {
    return IssueMembers.find({ userId: this._id })
  },
})

Users.SubscriptionComponent = function ({ children }) {
  const ready = useTracker(() => {
    return Meteor.subscribe('something').ready()
  }, [])

  const users = useTracker(() => {
    return Users.find().fetch()
  }, [])

  if (!ready) {
    return <div>loading</div>
  }

  return children({ users })
}

Meteor.methods({
  updateUsefulCollectionWhatever,
})

function updateUsefulCollectionWhatever (extra = {}) {
  // return UsefulCollectionWhatever.update({ _id: '1' }, { $set: { zhanghong: Date.now(), ...extra } })
  return UsefulCollectionWhatever.upsert({ _id: '1' }, { $set: { zhanghong: Date.now(), ...extra } })
}

export {
  updateUsefulCollectionWhatever,
}
