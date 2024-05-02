async function getPhotographers() {
  const reponse = await fetch("../data/photographers.json");
  const data = await reponse.json();
  return {
    photographers: data.photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    photographersSection.appendChild(photographerModel);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
