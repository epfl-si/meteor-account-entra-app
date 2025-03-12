import { ServiceConfiguration } from "meteor/service-configuration";
import { Accounts } from 'meteor/accounts-base'

export const setEntraAuthConfig = () => {
  // Validate the env values
  const tenantId = process.env.AUTH_ENTRA_TENANT_ID
  const clientId = process.env.AUTH_ENTRA_CLIENT_ID
  const secret = process.env.AUTH_ENTRA_SECRET

  if ( !(
    clientId && secret && tenantId
  )) {
    throw Error(`
      Missing env vars:
        AUTH_ENTRA_TENANT_ID 
        AUTH_ENTRA_CLIENT_ID or
        AUTH_ENTRA_SECRET or
      `)
  }

  // set the entra config
  ServiceConfiguration.configurations.upsert(
    { service: "entra" },
    {
      $set: {
        tenantId: tenantId,
        clientId: clientId,
        secret: secret,
        loginStyle: 'redirect',  // 'popup'
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

Meteor.publish(null, function () {
  if (!this.userId) return this.ready();

  return Meteor.users.find(
    { _id: this.userId },
    {
      fields: {
        'services.entra.displayName': 1,
        'services.entra.givenName': 1,
        'services.entra.surname': 1,
        'services.entra.userPrincipalName': 1,
      }
    }
  )
});
