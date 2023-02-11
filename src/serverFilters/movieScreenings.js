export default async function movieScreenings(payload, query) {
  let data = payload.data;
  const filteredArray = [];

  data.forEach((i) => {
    if (i.attributes.movie.data.id == query) {
      filteredArray.push(i);
    }
  });

  return filteredArray;
}
