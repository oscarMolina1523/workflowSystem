export const generateId = (length: number = 16): string => {
  const hexChars = "abcdef0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    result += hexChars[randomIndex];
  }

  return result;
};