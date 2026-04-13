function buscarpokemon(nombreInput) {
    const nombre = nombreInput.toLowerCase();
    const resultadoDiv = document.getElementById("resultado");
    if (!nombre) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(response => {
        if (!response.ok) throw new Error("Pokemon no encontrado/no registrado");
        return response.json();
    })
    .then(data => {
        return fetch(data.species.url)
        .then(res => res.json())
        .then(species => {
            const esLegendario = species.is_legendary;
            const imgUrl = data.sprites.other['official-artwork'].front_default;
            const tipos = data.types.map(t => t.type.name).join(', ');
            const hp = data.stats.find(s => s.stat.name === 'hp').base_stat;
            const ataque = data.stats.find(s => s.stat.name === 'attack').base_stat;

            resultadoDiv.innerHTML = `
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${imgUrl}" 
                        style="width: 150px; ${esLegendario ? 'filter: drop-shadow(0 0 10px gold);' : ''}">
                <p><strong>Tipo:</strong> ${tipos}</p>
                <p><strong>Salud:</strong> ${hp} | <strong>Ataque:</strong> ${ataque}</p>
                <p style="font-weight: bold; color: ${esLegendario ? 'gold' : 'white'};">
                    ${esLegendario ? '⭐ LEGENDARIO ⭐' : 'Normal'}
                </p>
            `;
        });
    })
    .catch(error => {
        resultadoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}