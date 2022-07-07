const btn = document.querySelector(".btn");
const container = document.querySelector(".container");

function getCatimg(callback) {
  const request = new XMLHttpRequest();

  request.open("GET", "https://api.thecatapi.com/v1/images/search");
  request.send();

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      let data = JSON.parse(request.responseText);
      let catUrl = data[0].url.toString();
      callback(undefined, catUrl);
    } else if (request.readyState === 4) {
      callback("could not fetch data", undefined);
    }
  });
}

btn.addEventListener("click", (event) => {
  getCatimg((err, url) => {
    if (err) {
      console.log(err);
    } else {
      let arrContainer = Array.from(event.target.parentElement.children);
      arrContainer.forEach((element) => {
        if (element.classList.contains("cats")) {
          element.remove();
        }
      });
      let catDiv = document.createElement("div");
      let catImg = document.createElement("img");
      catDiv.className = "cats";
      catImg.className = "cat-gen-img";
      catImg.setAttribute("src", url);
      catDiv.appendChild(catImg);
      container.appendChild(catDiv);
    }
  });
});
