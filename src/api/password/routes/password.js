module.exports = {
  routes: [
   {
      method: "POST",
      path: "/change-password",
      handler: "password.changePassword",
      config: {
        auth: false,
      },
   }
  ],
}
