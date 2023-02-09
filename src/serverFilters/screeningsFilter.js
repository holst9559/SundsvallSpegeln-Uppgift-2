export default async function screeningsFilter(payload, end_time, items) {
  const endTime = parseInt(end_time);
  const item = parseInt(items);
  let data = payload.data;

  let screeningArray = [];
  let filteredArray = [];
  let shortArray = [];

  const todaysDate = Date.parse(new Date());

  //Setting the date for endTime
  const fiveDays = new Date();

  fiveDays.setDate(new Date().getDate() + endTime);
  fiveDays.setHours(0, 59, 59);

  const fiveDaysParse = Date.parse(fiveDays);

  for (let i = 0; i < data.length; i++) {
    screeningArray.push(data[i]);
  }

  filteredArray = screeningArray.filter((data) => {
    const fiveData = Date.parse(data.attributes.start_time);
    const dateResults = fiveData > todaysDate && fiveData <= fiveDaysParse;

    return dateResults;
  });

  for (let j = 0; j < filteredArray.length; j++) {
    if (shortArray.length < item) {
      shortArray.push(filteredArray[j]);
    } else {
      break;
    }
  }

  return shortArray;
}
