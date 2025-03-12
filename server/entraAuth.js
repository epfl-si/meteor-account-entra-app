import { ServiceConfiguration } from "meteor/service-configuration";
import { Accounts } from 'meteor/accounts-base'

export const setEntraAuthConfig = () => {
  // Validate the env values
  const tenantId = ""
  const clientId = ""
  const secret = ""

  // set the entra config
  ServiceConfiguration.configurations.upsert(
    { service: "entra" },
    {
      $set: {
        tenantId: tenantId,
        clientId: clientId,
        secret: secret,
        loginStyle: 'redirect' // 'popup',  // 'redirect'
      },
    }
  );

  // debug

  Accounts.onExternalLogin( (options, user) => {
      console.log("Called external login!!!")
      console.log(`${ options }`)
      console.log(`${ user }`)
    }
  )

}

Meteor.publish("user", function () {
  return Meteor.users.find();
});
