const query = function (selector) {
    return document.querySelector(selector)
}

document.form1.onsubmit = async function(e){
    e.preventDefault()

    const nameId = document.querySelector("input").value

    await fetch(`https://pokeapi.co/api/v2/pokemon/${nameId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        query("#name").innerHTML = data.name
        query("#id").innerHTML = "#" + data.id
        
        if(data.sprites.front_default === null){
            query("#pokemon").src = "https://svgsilh.com/svg/1574006.svg"
            query("#pokemon").style.padding = "20px"
        }else{
            query("#pokemon").src = data.sprites.front_default
            query("#pokemon").style.padding = "0"
        }

        const abilities = data.abilities
        query("#abilities").innerHTML = ""
        for(const ability of abilities){
            query("#abilities").innerHTML += "<p class='ability'>" + ability.ability.name + "</p>"
        }
    })
    .catch(e => {
        alert("Pokemon not found")
        query("#name").innerHTML = "Pokemon not found"
        query("#id").innerHTML = "#0"
        query("#pokemon").style.padding = "20px"
        query("#pokemon").src = "https://svgsilh.com/svg/1574006.svg"
        query("#abilities").innerHTML = ""
    })
}