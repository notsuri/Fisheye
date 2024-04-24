//Mettre le code JavaScript lié à la page photographer.html
let url = new URL(window.location.href);
let searchParams = url.searchParams;
let id = searchParams.get("id");
console.log(id);

async function getPhotographerById(id) {
  const reponse = await fetch("../data/photographers.json");
  const data = await reponse.json();
  return data.photographers.find((photographer) => photographer.id == id);
}
getPhotographerById(id).then((photographer) => {});
