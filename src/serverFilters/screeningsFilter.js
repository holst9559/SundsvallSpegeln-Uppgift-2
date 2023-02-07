export async function screeningsFilter(res, end_time, items) {
  const content = await res.json();
  const endTime = end_time - 1;
  const item = items - 1;
  let data = content.data;
  let screeningArray = [];
  let filteredArray = [];
  let shortArray = [];

  const todaysDate = new Date().toISOString();
  const fiveDays = new Date();

  fiveDays.setDate(new Date().getDate() + endTime);

  const fiveDaysFilter = fiveDays.toISOString();

  const fiveDate = fiveDaysFilter.split("T")[0];

  for (let i = 0; i < data.length; i++) {
    screeningArray.push(data[i]);
  }

  filteredArray = screeningArray.filter((data) => {
    const fiveData = data.attributes.start_time.split("T")[0];
    return (
      data.attributes.start_time > todaysDate &&
      fiveData <= fiveDate
    );
  });

  for (let j = 0; j < filteredArray.length; j++) {
    if (shortArray.length <= item) {
      shortArray.push(filteredArray[j]);
    } else {
      break;
    }
  }
  return shortArray;
}
