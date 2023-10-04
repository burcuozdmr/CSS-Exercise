//Selection
const productList = document.getElementById("productList");
const filterBar = document.getElementById("filter");
//Event Listeners
productList.addEventListener("click", deleteElement);
filterBar.addEventListener("change", filterElement);

// REQUEST
axios
  .get("https://northwind.vercel.app/api/products")
  .then((response) => {
    const elements = response.data;
    elements.forEach((element) => {
      productList.innerHTML += `
    <tr>
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.unitPrice}</td>
      <td>${element.unitsInStock}</td>
      <td>
        <button type="button" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
    });
  })
  .catch((error) => console.log(error));

function deleteElement(e) {
  if (e.target.textContent === "Delete") {
    //UI
    e.target.parentElement.parentElement.remove();

    //API
    const recordId =
      e.target.parentElement.parentElement.firstElementChild.textContent;

    axios
      .delete(`https://northwind.vercel.app/api/products/${recordId}`)
      .then((response) => {
        console.log("Item successfully deleted.");
      })
      .catch((error) => {
        console.error("Error occured:", error);
      });
  }
}

function filterElement(e) {
  Array.from(productList.children).forEach((element) => {
    const price = Number(element.children[2].textContent);
    if (e.target.value === "1" && price > 20) {
      element.style.display = "none";
    }
    else if (e.target.value === "2" && price > 50) {
      element.style.display = "none";
    }
    else if (e.target.value === "3" && price > 100) {
      element.style.display = "none";
    }
    else if (e.target.value === "4" && price > 200) {
      element.style.display = "none";
    } 
    else {
      element.removeAttribute("style");
    }
  });
}
