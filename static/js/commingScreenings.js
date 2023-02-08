const container = document.getElementsByClassName('screenings');
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
    data.forEach(function render(index){
        console.log(index.attributes)
        const div = document.createElement('div')
        div.innerText = index.attributes.room + "\n" +  index.attributes.start_time;
        document.getElementById("screenings").appendChild(div);
      
          
    })
};
