import { connect } from "react-redux";
import initialize from "../utils/initialize";
import Layout from "../components/Layout";
import axios from "axios";
import { get } from "../utils/localstorage";
import actions from "../redux/actions";
import React, { useEffect, useState } from "react";

const Me = (props) => {
  const [user, setUser] = useState(0);
  const title = "Stranger"; //user ? user.username : 'Stranger'

  useEffect(() => {
    if (props.authentication?.user) {
      setUser(props.authentication.user);
    } else {
      var token = JSON.parse(get("token"));
      var user = JSON.parse(get("user"));
      // console.log('userd',JSON.parse(user))
      var jsonObj = {
        access_token: token,
        user: user,
      };
      // actions.reauthenticate(jsonObj)
      //store.dispatch(actions.reauthenticate(jsonObj));
      props.reauthenticate(jsonObj);
      setUser(user);
    }
  }, []);

  return (
    <>
      {(user && (
        <div>
          <h2>User: {user.name}</h2>
          <h3>DATA:</h3>
          <ul>
            <li>ID: {user.id}</li>
            <li>Name: {user.name}</li>
            {/* <li>Gender: {user.gender === 'rather_not_to_say' ? <span className="badge badge-secondary">
                            rather not to say
                        </span> : user.gender}</li> */}
            <li>Email: {user.email}</li>
            {/* <li>Birth Date: {user.birth_date || <span className="badge badge-secondary">
                            Empty
                        </span>}</li> */}
            <li>Phone Number: {user.phone}</li>
            <li>Type: {user.type}</li>
          </ul>
        </div>
      )) || (
        <div>
          <h2>Stranger</h2>
          <h4>You are not authenticated :c</h4>
        </div>
      )}
    </>
  );
};

// Me.getInitialProps = async (ctx) => {
//     console.log('kkk',jsonObj)
//     initialize(ctx);
//     // const token = ctx.store.getState().authentication.token;
//     // if (token) {
//     //     const response = await axios.get(`${API}/user/me`, {
//     //         headers: {
//     //             Authorization: token
//     //         }
//     //     });
//     //     const user = await response.data.user;
//     //     return { user };
//     // }
//     var token= get('token');
//     var user = get('user')
//     var jsonObj = {
//         token:token,
//         user:user
//     }
//     console.log('kkk',jsonObj)
//     ctx.store.dispatch(actions.reauthenticate(jsonObj));
// };

Me.getInitialProps = function (ctx) {
  debugger;
  initialize(ctx);
};
export default connect((state) => state, actions)(Me);
