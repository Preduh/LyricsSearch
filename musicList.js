const content = document.getElementsByClassName('content')[0]

const getSongs = async () => {
    const response = await fetch(`https://genius.p.rapidapi.com/search?q=${getTerm()}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a232cad14bmshc70d2f2b1da7190p168ae5jsn4360b3d3529f",
            "x-rapidapi-host": "genius.p.rapidapi.com"
        }})
    const data = await response.json()

    content.innerHTML = ''
    data.response.hits.map(async song => {
        let nowSongTitle = song.result.full_title.replaceAll('by', '-').split('-')
        content.innerHTML += `<div>${nowSongTitle[1]} - ${nowSongTitle[0]}
            <button data-artist="${nowSongTitle[1]}" data-title="${nowSongTitle[0]}">Lyrics</button>
        </div>`
    })
}

content.addEventListener('click', async event => {
    const clickedElement = event.target
    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist')
        const title = clickedElement.getAttribute('data-title')
        const lyricsResponse = await fetch(`https://api.lyrics.ovh/v1/${artist.toLowerCase().replace('/', '-')}/${title.toLowerCase().replace('/', '-')}`)
        const lyricsData = await lyricsResponse.json()
        content.innerHTML = `
            <h1>${title} - <small>${artist}</small></h1>
            <p>${lyricsData.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')}</p>
        `
    }
})

const getTerm = () => {
    const term = document.getElementById('searchBar').value
    return term
}

const btnSearch = document.getElementById('btn-search')
btnSearch.addEventListener('click', getSongs)