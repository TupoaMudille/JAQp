import { apiHost } from "./apiIndex";
const answerBase = "/api/answer/"

export const AddAnswer = async (_token, _id) =>
{
    const formdata = new FormData();
    formdata.append("is_right", "false");
    formdata.append("question_id", _id);

    return apiHost.post(answerBase + "add", formdata, {
        headers: {
          Authorization: "Bearer " + _token, //the token is a variable which holds the token
        },
      });

}

export const GetAnswer = async (_id) =>
{
    return apiHost.get(answerBase+_id);
}

export const DeleteAnswer = async (_token, _id) =>
  {
    return apiHost.delete(answerBase+"remove/"+_id, {
      headers: {Authorization: 'Bearer '+ _token}
    })
  }