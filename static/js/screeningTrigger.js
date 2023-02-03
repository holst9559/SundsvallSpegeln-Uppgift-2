async function screeningTrigger() {
    const res = await fetch("/api/upcoming-screenings?filters=short");
    const content = await res.json();
    const ul = document.querySelector(".screening-list");
    
    for (let i = 0; i < content.length; i++) {
        const li = document.createElement("li");
        const date = new Date(content[i].attributes.start_time);
        const dateString = date.toLocaleDateString() + " " + date.toLocaleTimeString("en-GB", { timeZone: "UTC" })
        
        li.innerText = content[i].attributes.movie.data.attributes.title;// + " - " + ;
        ul.append(li);

        const para = document.createElement("p");
        para.innerText = dateString;
        li.append(para);
    }

}