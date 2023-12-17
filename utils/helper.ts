export const updateUrlWithObjectQueries = (
  object: Record<string, any>,
  url: string
) => {
  const urlSearchParams = new URLSearchParams(url.split("?")[1]);
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];

      if (value !== undefined && value !== null && value !== "") {
        urlSearchParams.set(key, value);
      } else urlSearchParams.delete(key);
    }
  }
  const updatedUrl = `${url.split("?")[0]}?${urlSearchParams.toString()}`;
  return updatedUrl;
};
