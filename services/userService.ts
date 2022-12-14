import Axios from "../core/axios";

export const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('photo', file);

  const { data } = await Axios({
    method: 'POST',
    url: '/upload',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

export const sendConfirmationCode = (id, email) => {
  Axios({ method: "POST", url: '/auth/code', data: { id, email } });
};

export const verifyConfirmationCode = async ({ id, code }) => Axios({
    method: "POST", url: '/auth/verify-code', data: { id, code },
  });
