import { apiHost } from "./apiIndex";
const userBase = "users/"
export const LoginUser = async (_username, _password) =>
{
    const {data} = await apiHost.get(userBase+"login?password="+_password+"&username="+_username);
    return data;
}
export const RegisterUser = async (_username, _password) =>
{
    const {data} = await apiHost.post(userBase+"register?password="+_password+"&username="+_username);
    return data;
}
