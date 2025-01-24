import { useEffect, useState } from "react"

export type Product={
    id: number,
    name: string,
    price: number,
    category: string,
    image: string
}

const ProductCard = () => {
    const[products, setProducts] = useState<Product[]>([]);
    const[productName, setProductName] = useState<string>("");
    const[error, setError] = useState<string>("");
    const[selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const fetchProduct = async () =>{
        try {
            let url = '/products.json'
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error
            }
            const data = await res.json();
            setProducts(data.products)
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        fetchProduct()
    },[])
    const handleSearch = () => {
        if (Array.isArray(products)) {
            const productData = products.find(
                (data) => data.name.toLowerCase() === productName.toLowerCase()
            );
            if(productData){
                setSelectedProduct(productData);
                setError(" ");
            }
            else{
                setSelectedProduct(null);
                setError("No product found with the given name.");
            }

        }
        else {
            console.error('Products is not an array:', products);
        }
    }
    return(
    <div className="product-card">
    <div className="search-section">
      <input
        type="text"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    {selectedProduct ? (
        <div className="results-section">
            <div className='icon'>
            <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="product-image"
            />
            </div>
            <div className="product-info">
                <div className="product-details">
                    <h2>ID: {selectedProduct.id}</h2>
                    <p>Name:<label>{selectedProduct.name}</label></p>
                    <p>Price: <label>${selectedProduct.price}</label></p>
                    <p>Category:<label>{selectedProduct.category}</label></p>
                </div>

            </div>

        </div>
        ) : error ? (
      <p className="error">{error}</p>
        ) : (
      <p>Enter a product name to search for product data.</p>
    )}
  </div>
  )
}

export default ProductCard