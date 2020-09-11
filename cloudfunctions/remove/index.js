const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {

  console.log(event)

  const { OPENID } = cloud.getWXContext()

  try {
    return await db.collection('hello').where({
      _openid: OPENID
    }).remove()
  } catch (e) {
    console.error(e)
  }
} 
