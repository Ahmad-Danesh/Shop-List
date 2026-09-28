import { useState } from "react";

export default function App() {
    const [products, setProducts] = useState([]);

    function addProduct(newProduct) {
        setProducts((products) => [...products, newProduct]);
    }

    function deleteProduct(id) {
        setProducts((products) =>
            products.filter((product) => product.id !== id)
        );
    }

    const totalPrice = products.reduce(
        (total, product) => total + Number(product.price),
        0
    );

    const averagePrice =
        products.length > 0
            ? totalPrice / products.length
            : 0;

    return (
        <div className="app">
            <Header productCount={products.length} />

            <main className="main">
                <div className="welcome">
                    <div>
                        <span>SHOPPING PLANNER</span>
                        <h1>Build Your Shopping List</h1>
                        <p>
                            Add products, manage your list and
                            keep track of your budget.
                        </p>
                    </div>

                    <div className="welcome-icon">
                        🛒
                    </div>
                </div>

                <div className="dashboard">
                    <ProductForm onAddProduct={addProduct} />

                    <ShoppingSummary
                        products={products}
                        totalPrice={totalPrice}
                        averagePrice={averagePrice}
                    />
                </div>

                <ProductList
                    products={products}
                    onDeleteProduct={deleteProduct}
                />
            </main>
        </div>
    );
}

function Header({ productCount }) {
    return (
        <header className="header">
            <div className="logo">
                <div className="logo-icon">
                    S
                </div>

                <div>
                    <h2>ShopList</h2>
                    <p>Smart shopping made simple</p>
                </div>
            </div>

            <div className="header-cart">
                <span>MY LIST</span>
                <strong>{productCount}</strong>
                <div className="cart-icon">🛍️</div>
            </div>
        </header>
    );
}

function ProductForm({ onAddProduct }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    function handleAddProduct() {
        if (name.trim() === "" || price.trim() === "") {
            setError("Please enter the product and price.");
            return;
        }

        const newProduct = {
            id: Date.now(),
            name: name,
            price: price
        };

        onAddProduct(newProduct);

        setName("");
        setPrice("");
        setError("");
    }

    return (
        <section className="product-form">
            <div className="form-title">
                <div className="form-number">
                    01
                </div>

                <div>
                    <span>ADD PRODUCT</span>
                    <h2>New Shopping Item</h2>
                </div>
            </div>

            <div className="fields">
                <div className="field">
                    <label>Product Name</label>

                    <input
                        type="text"
                        placeholder="e.g. Headphones"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>

                <div className="field">
                    <label>Price</label>

                    <div className="price-input">
                        <span>AFN</span>

                        <input
                            type="number"
                            placeholder="0"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                        />
                    </div>
                </div>

                <button
                    className="add-product"
                    onClick={handleAddProduct}
                >
                    Add to List
                    <span>+</span>
                </button>
            </div>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}
        </section>
    );
}

function ShoppingSummary({
    products,
    totalPrice,
    averagePrice
}) {
    return (
        <section className="summary">
            <div className="summary-top">
                <div>
                    <span>YOUR BUDGET</span>
                    <h2>Shopping Summary</h2>
                </div>

                <div className="summary-bag">
                    🛍️
                </div>
            </div>

            <div className="total-box">
                <span>TOTAL COST</span>

                <strong>
                    {totalPrice.toLocaleString()}
                </strong>

                <small>AFN</small>
            </div>

            <div className="summary-stats">
                <div>
                    <span>PRODUCTS</span>
                    <strong>{products.length}</strong>
                </div>

                <div>
                    <span>AVERAGE</span>
                    <strong>
                        {averagePrice.toFixed(0)}
                    </strong>
                    <small>AFN</small>
                </div>
            </div>
        </section>
    );
}

function ProductList({
    products,
    onDeleteProduct
}) {
    return (
        <section className="product-list-section">
            <div className="list-title">
                <div>
                    <span>YOUR SHOPPING LIST</span>
                    <h2>Selected Products</h2>
                </div>

                <div className="product-count">
                    {products.length} ITEMS
                </div>
            </div>

            {products.length === 0 ? (
                <div className="empty">
                    <div className="empty-circle">
                        🛒
                    </div>

                    <h3>Your shopping list is empty</h3>

                    <p>
                        Add your first product to start
                        building your list.
                    </p>
                </div>
            ) : (
                <div className="products">
                    {products.map((product, index) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            index={index}
                            onDeleteProduct={
                                onDeleteProduct
                            }
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function ProductItem({
    product,
    index,
    onDeleteProduct
}) {
    let priceType = "";

    if (Number(product.price) >= 1000) {
        priceType = "💰 Expensive";
    } else {
        priceType = "🛍️ Affordable";
    }

    return (
        <div className="product-item">
            <div className="item-number">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="product-icon">
                🛍️
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <span>{priceType}</span>
            </div>

            <div className="product-price">
                <strong>
                    {Number(product.price).toLocaleString()}
                </strong>

                <small>AFN</small>
            </div>

            <button
                className="delete-product"
                onClick={() =>
                    onDeleteProduct(product.id)
                }
            >
                ×
            </button>
        </div>
    );
}