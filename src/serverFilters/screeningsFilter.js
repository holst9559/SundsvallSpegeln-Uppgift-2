export default async function screeningsFilter(res, end_time, items) {
  const content = await res.json();
  const endTime = parseInt(end_time);
  const item = parseInt(items);
  let data = content.data;

  let screeningArray = [];
  let filteredArray = [];
  let shortArray = [];

  const todaysDate = Date.parse(new Date());

  //Setting the date for endTime
  const fiveDays = new Date();
  fiveDays.setDate(new Date().getDate() + endTime);
  const fiveDaysParse = Date.parse(fiveDays);

  for (let i = 0; i < data.length; i++) {
    screeningArray.push(data[i]);
  }

  filteredArray = screeningArray.filter((data) => {
    const fiveData = Date.parse(data.attributes.start_time);
    return fiveData > todaysDate && fiveData <= fiveDaysParse;
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
