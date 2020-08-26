let ul = document.querySelector('ul');
let button = document.querySelector('button');
let input = document.querySelector('input');

window.addEventListener('load', () => {
    registerSW();
})

async function minhaPromise(user) {
    const data = await axios.get(`https://api.github.com/users/${user}`)
    .then(response => response.data)
    .catch(error => {
        console.log(error);
        return 404
    });

    console.log(data);
    if(data !== 404) {
        let li = document.createElement('li');
        let text = document.createTextNode(data.name)
        li.appendChild(text);
        ul.appendChild(li);
    
        let img = document.createElement('img')
        img.setAttribute('src', data.avatar_url);
        img.setAttribute('width', '60vw');
        console.log(img);
        ul.appendChild(img);
    
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(`Quantidade de repositórios públicos: ${data.public_repos}
            Seguidores: ${data.followers}   |   Seguindo: ${data.following}`));
        ul.appendChild(p);
    }
    else{
        window.alert("Usuário não foi encontrado")
    }


    input.value = '';
    //container.innerHTML = '';
    //data.map((data) => {
        //let title = document.createElement('p')
        //let text = document.createTextNode(data.name);
        //title.appendChild(text);
        //container.appendChild(title);
        //console.log(data)
    //})
}

async function registerSW() {
    if('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch(e) {
            console.log('SW registration failed');
        }
    }
}




button.onclick = () => minhaPromise(input.value)

