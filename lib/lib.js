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

Users.已关闭的用户 = function () {
  return Users.find({ isDisable: true }).fetch()
}

Users.helpers({
  myIssuesHelper () {
    return IssueMembers.find({ userId: this._id })
  },
})

Meteor.SubscriptionComponent = function ({ name, children, data }) {
  const ready = useTracker(() => {
    return Meteor.subscribe(name).ready()
  }, [])

  const result = useTracker(() => {
    return data()
  }, [])

  if (!ready) {
    return <div>loading</div>
  }

  return children({ result })
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
