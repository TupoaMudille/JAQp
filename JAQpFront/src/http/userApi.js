import { apiHost } from "./apiIndex";
const userBase = "/api/auth/";
// export const LoginUser = async (_username, _password) => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     username: _username,
//     password: _password,
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   var res = await fetch(
//     "http://localhost:8080/api/auth/authenticate",
//     requestOptions
//   );

//   if (res.status != 200) {
//     res = null;
//     return res;
//   }
//   res = await res.json();
//   return res;
// };

export const LoginUser = async (_user, _pass) => {
  const raw = {
    username: _user,
    password: _pass,
  };
  return await apiHost.post(userBase + "authenticate", raw);
};

export const RegisterUser = async (_username, _password) => {
  let result = true;
  var data = { username: _username, password: _password };
  result = await apiHost.post(userBase + "register", data);
  if (result.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const GetUserGeneral = async (_id) => {
  var re = await apiHost.get("/api/users/" + _id);
  return re;
};

export const SetUserGeneral = async (
  _token,
  _id,
  _firstName,
  _secondName,
  _lastName,
  _birdthDate
) => {
  const raw = {
    firstName: _firstName,
    lastName: _lastName,
    secondName: _secondName,
    birthdate: _birdthDate,
  };

  let config = {
    headers: {
      Authorization: "Bearer " + _token,
    },
  };

  console.log(raw);

  return await apiHost.post("/api/users/" + _id + "/setting/general", raw, {
    headers: {
      Authorization: "Bearer " + _token, //the token is a variable which holds the token
    },
  });
};
