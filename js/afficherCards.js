window.onload = function () {
    fetch('http://localhost:8080/musicsSimple')
   .then(response => response.text())
   .then(text => {
        musics = JSON.parse(text)
        console.log(musics)
        //creeUnLecteurSpotify(1, musics.items[0])
        creeUnLecteurSpotify()
    })
}

creeUnLecteurSpotify = (id)=> {
    for(i=0; i< musics.items.length ; i++){ //musics.items.length
        const gridcontainer= document.getElementById("gridPrincipale")
        const gridElement = document.createElement("div");
        const playButton = document.createElement("div");
        const lecteur = document.createElement("iframe");
        const cacheurIframe =  document.createElement("div");
        const partieReponse =  document.createElement("div");
        gridcontainer.appendChild(gridElement)
        gridElement.appendChild(playButton)
        playButton.appendChild(lecteur)
        playButton.appendChild(cacheurIframe)
        gridElement.appendChild(partieReponse)
        generatePartieReponse(partieReponse, musics.items[i], i)
        cacheurIframe.setAttribute("class",'cacheurIframe');
        cacheurIframe.style.top = `${(Math.trunc(i / 5)) * 10 }vh`
        cacheurIframe.style.left = `${((i ) % 5) * 20}vw`
        lecteur.setAttribute("id",'embed-iframe');
        lecteur.setAttribute("class",'iframe');
        lecteur.setAttribute("src", `https://open.spotify.com/embed/track/${musics.items[i].id}`)
        lecteur.setAttribute("allow","autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture")
        lecteur.setAttribute("loading","lazy")
        gridElement.setAttribute("class",'elemGrid');
        gridElement.setAttribute("id",'elemGrid' + (i + 1));
        gridElement.style.gridColumn = (i + 1 ) % 5
        gridElement.style.gridRow = Math.trunc(i / 5) + 1 
        playButton.setAttribute("class",'playButton');
        playButton.setAttribute("id",'lecteur');
        playButton.setAttribute("onClick",'play()');
    }
}

generatePartieReponse = (partieReponse, music, i )=>{
    const reponses =  document.createElement("div");
    const cacheurReponses =  document.createElement("div");
    const auteurs =  document.createElement("div");
    const annee =  document.createElement("div");
    const titre =  document.createElement("div");
    const buttonShowReponses = document.createElement("button");

    auteurText = ""
    music.artists.forEach(element => {
         auteurText += element.name + "  "
    });
    buttonShowReponses.setAttribute("onClick", `afficherReponses(${i})`)
    buttonShowReponses.setAttribute("class", "bouttonShowResponse")
    buttonShowReponses.setAttribute("id", "buttonShowReponse_" + i)
    buttonShowReponses.innerHTML ="Reponse"
    auteurs.innerHTML = auteurText
    annee.innerHTML = music.album.release_date.substring(0,4)
    titre.innerHTML = music.name
    reponses.setAttribute("id", "responses_" + i)
    reponses.style.display = "none" 
    partieReponse.appendChild(reponses)
    partieReponse.appendChild(cacheurReponses)
    reponses.appendChild(auteurs);
    reponses.appendChild(annee);
    reponses.appendChild(titre);
    cacheurReponses.appendChild(buttonShowReponses);
}

afficherReponses= (i)=>{
    document.getElementById("responses_" + i).style.display = "block"
    document.getElementById("buttonShowReponse_" + i).style.display = "none"
}