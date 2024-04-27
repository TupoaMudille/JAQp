import { apiHost } from "./apiIndex";
const quizBase = "/api/quiz/"

export const GetOwnedByMe = async (_token) =>
{
    return apiHost.get(quizBase+"get_owned", {
        headers: {
          Authorization: 'Bearer ' + _token //the token is a variable which holds the token
        }
       })
}