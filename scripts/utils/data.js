// Récuperation des données du fichier JSON
export async function getData() {
  const data = await fetch("./data/photographers.json").then((response) => {
    return response.json();
  });
  return data;
}

export async function getPhotographers() {
  const data = await getData();
  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographer: data.photographers,
  };
}
