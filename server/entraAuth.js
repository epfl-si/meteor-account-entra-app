import { ServiceConfiguration } from "meteor/service-configuration";


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
        // fields: []  // if you want to get specific fields
      },
    }
  );
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
