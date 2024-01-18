import { apiHost } from "./apiIndex";
const userBase = "users/"
export const LoginUser = async (_username, _password) =>
{
    try{
    const {data} = await apiHost.get(userBase+"login?password="+_password+"&username="+_username);
    return data;
    }
    catch(e)
    {
        console.log(e);
    }
}
export const RegisterUser = async (_username, _password) =>
{
    let result = true;
    await apiHost.post(userBase+"register?password="+_password+"&username="+_username).catch(function(error) {console.log(error); result = false});
    return result;
}

export default RegisterUser;
