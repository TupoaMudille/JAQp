import { apiHost } from "./apiIndex";
const userBase = "/api/auth/";

export const LoginUser = async (_user, _pass) => {
  const raw = {
    username: _user,
    password: _pass,
  };
  try {
    return await apiHost.post(userBase + "authenticate", raw);
  } catch (error) {
    return null;
  }
};

export const RegisterUser = async (_username, _password) => {
  let result = true;
  var data = { username: _username, password: _password };
  result = await apiHost.post(userBase + "register", data);
  if (result.status === 200) {
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
      Authorization: "Bearer " + _token,
    },
  });
};
