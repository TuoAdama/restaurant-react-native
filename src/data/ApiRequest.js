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
    data.unshift({ id: 0, libelle: 'Tout' });
    return data.map(item => ({ id: item.id, libelle: item.libelle }));
}


const platFormat = (item) => ({
    id: item.id,
    libelle: item.libelle,
    categorie: item.categorie.libelle,
    prix: item.prix,
    images: item.images.map(item => item.chemin),
});


const sendTokenToServer = async (token) => {

    fetch(appurl + "/notification/token/saveOrUpdate", {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            id: 1,
            token,
        })
    }).then(response => response.json())
        .then(response => console.log(response));
}

const getPersonnelCommands = async () => {

    var res = await fetch(appurl + "/commandes/1")
        .then(response => response.json())

    return res.map(item => formatCommande(item));
}

const storeCommande = (commandes) => {
    var data = {
        personnel_id: commandes.personnel.id ?? 1,
        table: commandes.table,
        plats: commandes.items
    };

    console.log(data);

    console.log('SEND DARA');

    fetch(appurl+"/commande/save", {
        method:'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

const formatCommande = (commande) => ({
    id: commande.commande_id,
    table:commande.commande.table_client.numero_table,
    status:commande.commande.etat.libelle,
    total:commande.quantite*commande.plat.prix,
    createdAt: commande.created_at,
});

const login = (email, password) => ({

});


export { getAllPlats, getAllCategories, sendTokenToServer, getPersonnelCommands, storeCommande };