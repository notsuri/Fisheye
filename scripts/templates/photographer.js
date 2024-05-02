function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/portrait/${portrait}`;

  const article = document.createElement("article");
  article.className = "card";

  // Lien vers le portefolio
  const link = document.createElement("a");
  link.href = `./photographer.html?id=${id}`;

  //Photo
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", name);
  img.className = "card-img";

  //Nom
  const h2 = document.createElement("h2");
  h2.textContent = name;
  h2.className = "card-title";
  link.appendChild(img);
  link.appendChild(h2);

  //Ville et Pays
  const countryElement = document.createElement("p");
  countryElement.textContent = city + ", " + country;
  countryElement.className = "country_photographer";

  //Situation Pro
  const taglineElement = document.createElement("p");
  taglineElement.textContent = tagline;
  taglineElement.className = "tagline";

  //Prix
  const priceElement = document.createElement("p");
  priceElement.textContent = price + "€ /jour";
  priceElement.className = "price";

  //Rattachement au parent
  article.appendChild(link);
  article.appendChild(countryElement);
  article.appendChild(taglineElement);
  article.appendChild(priceElement);
  return article;
}
