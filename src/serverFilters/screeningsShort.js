export async function screeningsShortFilter(res) {
  const content = await res.json();
  let data = content.data;
  let screeningArray = [];
  let filteredArray = [];
  let shortArray = [];

  const todaysDate = new Date().toISOString();
  const fiveDays = new Date();

  fiveDays.setDate(new Date().getDate() + 4);
 
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
    if (shortArray.length <= 9) {
      shortArray.push(filteredArray[j]);
    } else {
      break;
    }
  }
  return shortArray;
}
