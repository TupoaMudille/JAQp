import { apiHost } from "./apiIndex";
const userBase = "/api/auth/"
export const LoginUser = async (_username, _password) =>
{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "username": _username,
    "password": _password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    var res = await fetch("http://localhost:8080/api/auth/authenticate", requestOptions)

    if (res.status != 200) {
        res = null
        return res
    }
    res = await res.json()
    return res;
}


export const RegisterUser = async (_username, _password) =>
{
    let result = true;
    var data = {username: _username, password: _password}
    result = await apiHost.post(userBase+"register", data);
    if (result.status == 200)
    {
        return true
    }
    else
    {
        return false
    }
    
}


