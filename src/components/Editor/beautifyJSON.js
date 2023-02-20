const beautifyJSON = (json) => {
  try {
    const beautifulJson = JSON.stringify(JSON.parse(json), null, 4);
    return beautifulJson;
  } catch (err) {
    throw err;
  }
};

export default beautifyJSON;
