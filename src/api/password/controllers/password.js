'use strict'

/**
 * api/password/controllers/password.js
 */
const bcrypt = require('bcrypt');

module.exports = {
  changePassword: async (ctx) => {
    const userId = ctx.request.body.userId
    const currentPassword = ctx.request.body.currentPassword
    const newPassword = ctx.request.body.newPassword

    if (!userId || !currentPassword || !newPassword) {
      return ctx.throw(400, 'provide-userId-currentPassword-newPassword')
    }

    let user = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ id: userId })

    const validPassword = await strapi
      .service('plugin::users-permissions.user')
      .validatePassword(currentPassword, user.password)

    if (!validPassword) {
      return ctx.throw(401, 'wrong-current-password')
    } else {
      // Generate new hashed password
      const password = bcrypt.hashSync(newPassword, 10)

      user = await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { resetPasswordToken: null, password },
      })

      // Return new jwt token
      ctx.send({
        jwt: strapi.service('plugin::users-permissions.jwt').issue({
          id: user.id,
        })
      })
    }
  },
}
