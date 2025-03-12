import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {
  const loginServiceConfigured = useTracker(() => Accounts.loginServicesConfigured(), []);
  const user = useTracker(() => Accounts.user(), []);

  if (!loginServiceConfigured) return <>Loading auth info...</>

  return <>
    { !user ? <>
        <a
          href={''}
          onClick={
            async (e) => {
              e.preventDefault();
              try {
                await Meteor.entraSignIn(
                  options = {},
                  callback = (error) => {
                    debugger;
                    if (error) {
                      alert(`Sigin failed: ${ JSON.stringify(error) }`);
                    } else {
                      alert('Sigin!');
                    }
                  },
                );
              } catch (e) {
                debugger;
                alert("error:");
                alert(JSON.stringify(e.message));
              }
            }
          }
        >Signin Entra</a>
      </> :
      <div>
        <h1>Logged in !</h1>
        <div>Meteor user : { JSON.stringify( user ) }</div>
        <div>
          <a
            href={''}
            onClick={
              async (e) => {
                e.preventDefault();
                Meteor.logout()
              }
            }
          >Logout</a>
        </div>
      </div>
    }
  </>
}
