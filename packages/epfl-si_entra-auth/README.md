# Things to better know

- Entra only allows http as Redirect URIs URL. Better put a https to http proxy in front of your Meteor app.
    - ROOT_URL should be set with https, without the port

# References
- https://login.microsoftonline.com/ + TenantId + /v2.0/.well-known/openid-configuration
- https://my-token.epfl.ch/home
- https://atmospherejs.com/telnowedge/microsoft-entra-oauth
- https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow
