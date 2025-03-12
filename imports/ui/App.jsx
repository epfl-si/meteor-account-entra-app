import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { useTracker } from 'meteor/react-meteor-data';

export const App = () => {
  const loginServiceConfigured = useTracker(() => Accounts.loginServicesConfigured(), []);
  const user = useTracker(() => Accounts.user(), []);

  if (!loginServiceConfigured) return <>Loading auth info...</>

  return <>
    <div>Meteor user : { JSON.stringify( user ) }</div>
    { !user ? <>
        {/*<a*/}
        {/*  href={''}*/}
        {/*  onClick={*/}
        {/*    async () => {*/}
        {/*      try {*/}
        {/*        await Meteor.loginWithEntra(*/}
        {/*          options = {},*/}
        {/*          callback = (error) => {*/}
        {/*            debugger;*/}
        {/*            if (error) {*/}
        {/*              alert(`Sigin failed: ${ JSON.stringify(error) }`);*/}
        {/*            } else {*/}
        {/*              alert('Sigin!');*/}
        {/*            }*/}
        {/*          },*/}
        {/*        );*/}
        {/*      } catch (e) {*/}
        {/*        debugger;*/}
        {/*        alert("error:");*/}
        {/*        alert(JSON.stringify(e.message));*/}
        {/*      }*/}
        {/*    }*/}
        {/*  }*/}
        {/*>Login Entra</a><br/>*/}
        <a
          href={''}
          onClick={
            async () => {
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
        <h1>Welcome to Meteor!</h1>
        <Hello/>
        <Info/>
      </div>
    }
  </>
}
