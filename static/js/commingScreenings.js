const container = document.getElementById('screenings');
const path = window.location.pathname;

// path is /movie/{id} ex /movie/1
export async function specScreenings(){
    
    const screenings = await fetch('/api' + path +'/screenings');
    console.log('apidata');
    
    const data = await screenings.json();

    return data;
};

export default async function displayScreenings(){
    
    const data = await specScreenings();
    console.log('1');
    // place each item in the array in a <div> in the screenings <ul> 
    data.forEach(function render(index){
        const div = document.createElement('div')
        div.innerText = index.id +'---'+ index.attributes.room + "\n" +  index.attributes.start_time + "\n ";
        container.appendChild(div);
    })
};
