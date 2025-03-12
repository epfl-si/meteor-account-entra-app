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

  // For debugging only — Can be removed.

  Accounts.onExternalLogin( (options, user) => {
      console.log("Called external login!!!")
      console.log(`${ options }`)
      console.log(`${ user }`)
      return options
    }
  )

}

Meteor.publish("user", function () {
  return Meteor.users.find();
});
