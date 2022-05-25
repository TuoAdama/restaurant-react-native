import axios from 'axios'

const appurl = "http:///192.168.1.120:8000/api";

const getAllPlats = async () => {
    let url = appurl + "/plats";
    var data = await fetch(url).then(response => {
        console.log(response.status)
        return response.json();
    })
    return data.map(item => platFormat(item));
}

const getAllCategories = async () => {
    let url = appurl + "/categories";
    var data = await fetch(url).then(response => response.json())
    data.unshift({id:0, libelle:'Tout'});
    return data.map(item => ({ id: item.id, libelle: item.libelle }));
}


const platFormat = (item) => ({
    id: item.id,
    libelle: item.libelle,
    categorie: item.categorie.libelle,
    prix: item.prix,
    images: item.images.map(item => item.chemin),
});


export { getAllPlats, getAllCategories };