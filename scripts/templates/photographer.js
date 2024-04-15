function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/portrait/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const p = document.createElement("p");
    p.textContent = city + "," + country;

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;

    const priceElement = document.createElement("p");
    priceElement.textContent = price + "€ /jour";

    const url = document.createElement("a");
    // url.href = `./photographer.html?id=${id}`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);
    // article.appendChild(url);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
