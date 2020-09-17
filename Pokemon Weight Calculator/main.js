const searchButton = document.getElementById("search_pokemon");
const inputField = document.getElementById("pokemon_name");
const tableBody = document.getElementById("table_body");
const totalWeight = document.getElementById("total_weight");
const errorMessage = document.getElementById("error_message");

const fetchPokemon = async id => {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    url += id;
    const result = await fetch(url).then(result => result.json()).then(data => data);
    return result;
}

const addPokemon = pokemon => {
    const tr = document.createElement('tr');
    const tableImage = document.createElement('td');
    const image = document.createElement('img');
    const name = document.createElement('td');
    const weight = document.createElement('td');
    const tableButton = document.createElement('td');
    const button = document.createElement('button');

    button.addEventListener('click', (e) => {
        e.target.closest('tr').remove();
        totalWeight.innerText = getTotalWeight();
    });

    button.innerText = 'X';
    tableButton.appendChild(button);

    image.setAttribute('src', pokemon.sprites.front_default);

    name.innerText = pokemon.name;
    weight.innerText = pokemon.weight;
    tableImage.style.maxWidth = '64px';
    tableImage.appendChild(image);

    weight.classList.add('pokemon_weight')

    tr.appendChild(tableImage);
    tr.appendChild(name);
    tr.appendChild(weight);
    tr.appendChild(tableButton);

    tableBody.appendChild(tr);
    totalWeight.innerText = getTotalWeight();
    errorMessage.style.color = 'white';
}

const getTotalWeight = _ => {
    const nodes = Array.from(document.querySelectorAll('.pokemon_weight'));
    const values = nodes.map(w => w.innerText);
    var total = 0;

    if(values.length > 0){
        total = values.reduce((t,v) => Number(t) + Number(v));
    }

    return parseFloat(total);

}

const pokemonNotFound = _ => {
    errorMessage.style.color = 'red';
}

searchButton.addEventListener('click', () => {
    if(inputField.value){
        fetchPokemon(inputField.value)
        .then(data => addPokemon(data))
        .catch(err => pokemonNotFound());
    }else{
        pokemonNotFound();
    }

    inputField.value = '';
})