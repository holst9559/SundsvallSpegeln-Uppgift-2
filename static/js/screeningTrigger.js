screeningTrigger();
async function screeningTrigger() {
  const res = await fetch("/api/upcoming-screenings?end_time=5&items=10");
  const content = await res.json();
  const ul = document.querySelector(".screening-list");

  for (let i = 0; i < content.length; i++) {
    const li = document.createElement("li");
    const tag = document.createElement("a");
    const date = new Date(content[i].attributes.start_time);
    const dateString =
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString("en-GB", { timeZone: "UTC" });

    tag.innerText = content[i].attributes.movie.data.attributes.title;
    tag.setAttribute("href", "/movies/" + content[i].attributes.movie.data.id);
    ul.append(li);
    li.append(tag);

    const para = document.createElement("p");
    para.innerText = dateString;
    li.append(para);
  }
}
