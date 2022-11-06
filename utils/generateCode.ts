const characters = '0123456789';

export const generateCode = () => {
  let token = '';
  for (let i = 0; i < 4; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
  }

  return token;
};

