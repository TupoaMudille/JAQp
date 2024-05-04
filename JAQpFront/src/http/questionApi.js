import { apiHost } from "./apiIndex";
const questionBase = "/api/question/";

export const AddQuestion = async (_token, _id) => {
  const formdata = new FormData();
  formdata.append("quiz_id", _id);
  return apiHost.post(questionBase + "add", formdata, {
    headers: {
      Authorization: "Bearer " + _token, //the token is a variable which holds the token
    },
  });
};

export const DeleteQuestion = async (_token, _id) => {
  return apiHost.delete(questionBase + "remove/" + _id, {
    headers: { Authorization: "Bearer " + _token },
  });
};

export const GetQuestion = async (_id) => {
  return apiHost.get(questionBase + _id);
};

export const EditQuestionWOImage = async (_token, _id, _desc) => {
  return apiHost.put(
    questionBase + "change_wo_image/" + _id + "?description=" + _desc,
    null,
    {
      headers: { Authorization: "Bearer " + _token },
    }
  );
};
