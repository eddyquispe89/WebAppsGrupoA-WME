// URL 
const API_URL = "https://www.primer.pe/service/products.php";

// Obtener el formulario y lista de productos
const productForm = document.getElementById("product-form");
const productListContainer = document.getElementById("product-list");

// Función para renderizar la lista de productos
async function renderProductList() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    
    const products = await response.json();
    productListContainer.innerHTML = ""; // Limpiar el contenedor

    products.forEach((product) => {
      // Crear la tarjeta de producto
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mb-4";
      productCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">Precio: $${product.unitPrice}</p>
            <p class="card-text">Stock: ${product.unitsInStock}</p>
            <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            <button class="btn btn-success btn-sm increase-btn">Aumentar Stock</button>
          </div>
        </div>
      `;

      
      const deleteButton = productCard.querySelector(".delete-btn"); // Botón para eliminar producto
      deleteButton.addEventListener("click", () => {
        deleteProduct(product.productId);
      });

      
      const increaseButton = productCard.querySelector(".increase-btn"); // Botón para aumentar el stock
      increaseButton.addEventListener("click", () => {
        increaseStock(product.productId, product.unitsInStock);
      });

      productListContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    alert("Hubo un problema al cargar los productos. Revisa la consola para más detalles.");
  }
}

// Función para eliminar un producto (SOLO simulación)
async function deleteProduct(productId) {
  console.log(`Producto con ID ${productId} eliminado.`);
  renderProductList(); 
}

// Función para aumentar el stock de un producto ( SOLO simulación)
async function increaseStock(productId, currentStock) {
  const newStock = currentStock + 1;
  console.log(`Stock del producto con ID ${productId} actualizado a ${newStock}.`);
  renderProductList(); 
}

// Manejar el envío del formulario para registrar un nuevo producto
productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const productName = document.getElementById("productName").value;
  const unitPrice = document.getElementById("unitPrice").value;
  const unitsInStock = document.getElementById("unitsInStock").value;

  console.log("Producto registrado:", { productName, unitPrice, unitsInStock });

  productForm.reset(); 
  renderProductList(); 
});

// Cargar la lista de productos al iniciar la aplicación
renderProductList();
