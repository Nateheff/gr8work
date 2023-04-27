export const AJAX = async function (url, options) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
