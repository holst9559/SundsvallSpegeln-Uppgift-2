const container = document.getElementById("screenings");
const path = window.location.pathname;

// path is /movie/{id} ex /movie/1
export async function specScreenings() {
  const screenings = await fetch("/api" + path + "/screenings");
  const data = await screenings.json();

  return data;
}

export default async function displayScreenings() {
  const data = await specScreenings();

  // place each item in the array in a <div> in the screenings <ul>
  data.forEach(function render(index) {
    const div = document.createElement("div");
    div.innerText = index.attributes.room + "\n" + index.attributes.start_time;
    container.appendChild(div);
  });
}
