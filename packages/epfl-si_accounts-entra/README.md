# Install

meteor add epfl-si:entra-oauth
meteor add epfl-si:accounts-entra

# Setup

Create entraAuth.ts in server side with this content: 
```
import { ServiceConfiguration } from "meteor/service-configuration";


export const setEntraAuthConfig = () => {
  // Validate the env values
  const clientId = process.env.AUTH_ENTRA_CLIENT_ID
  const secret = process.env.AUTH_ENTRA_SECRET
  const tenantId = process.env.AUTH_ENTRA_TENANT_ID

  if ( !(
    clientId && secret && tenantId
  )) {
    throw Error(`
      Missing env vars: 
        AUTH_ENTRA_CLIENT_ID or
        AUTH_ENTRA_SECRET or
        AUTH_ENTRA_TENANT_ID
      `)
  }

  // set the entra config
  ServiceConfiguration.configurations.upsert(
    { service: "entra" },
    {
      $set: {
        clientId: clientId,
        secret: secret,
        tenantId: tenantId,
        loginStyle: 'redirect', // 'popup',
      },
    }
  );
}
```

# UI

Add this:
```
    <a
      href={''}
      onClick={
        () => {
          Meteor.loginWithEntra(
            options = {},
            callback = (error: any) => {
              if (error) {
                alert(`Login failed: ${ JSON.stringify(error) }`);
              } else {
                alert(`Successful login !`);
              }
            },
          );
        }
      }
    >Login Entra</a>
```
