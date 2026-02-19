'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './shop.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  imageUrl: string;
  bestForYou: string;
  colorOptions: string[];
  specifications: {
    image: string;
    processor: string;
    memory: string;
    os: string;
    battery: string;
    security: string[];
    display: string;
    connectivity: string;
    storage: string;
    handling: string;
    ports: string[];
  };
}

// Removed unused interfaces

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products?limit=100`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const result = await response.json();
        const activeProducts = result.products.filter((product: Product) => product.status === 'active');
        setProducts(activeProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    color: string;
    quantity: number;
  } | null>(null);
  const [showHelioWidget, setShowHelioWidget] = useState(false);

  const handleBuyNow = (product: Product, selectedColor: string = '', quantity: number = 1) => {
    // Store product details and show Helio widget
    setSelectedProduct({
      product,
      color: selectedColor,
      quantity
    });
    setShowHelioWidget(true);
  };

  const handlePaymentSuccess = async (paymentId: string, transactionHash: string) => {
    if (!selectedProduct) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      // Create pre-order
      const preOrderResponse = await fetch(`${apiUrl}/api/pre-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: {
            name: 'Helio Customer',
            email: 'helio@customer.com',
            phone: 'N/A'
          },
          productId: selectedProduct.product._id,
          selectedColor: selectedProduct.color,
          quantity: selectedProduct.quantity,
          notes: `Helio Payment\nPayment ID: ${paymentId}\nTransaction: ${transactionHash}`,
          paymentId: paymentId,
          transactionHash: transactionHash
        })
      });

      if (!preOrderResponse.ok) {
        throw new Error('Failed to create pre-order');
      }

      const preOrderResult = await preOrderResponse.json();

      // Show success message
      alert(`Order placed successfully!\n\nOrder ID: ${preOrderResult.preOrder._id}\n\nThank you for your purchase!`);

      // Reset state
      setShowHelioWidget(false);
      setSelectedProduct(null);

    } catch (error) {
      console.error('Order creation error:', error);
      alert('Order creation failed. Please contact support.');
    }
  };

  const handlePaymentCancel = () => {
    setShowHelioWidget(false);
    setSelectedProduct(null);
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder.png';
    return imageUrl.startsWith('http')
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${imageUrl}`;
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Pre-Order Your Console</h1>
        <p>One-click purchase with cryptocurrency</p>
      </header>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <h2>Error Loading Products</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-state">
              <p>No products available at the moment. Check back soon!</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onBuyNow={handleBuyNow}
                getImageUrl={getImageUrl}
              />
            ))
          )}
        </div>
      )}

      {/* Helio Payment Widget Modal */}
      {showHelioWidget && selectedProduct && (
        <HelioCheckoutWidget
          amount={(selectedProduct.product.price * selectedProduct.quantity).toFixed(2)}
          productName={selectedProduct.product.name}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  onBuyNow,
  getImageUrl
}: {
  product: Product;
  onBuyNow: (product: Product, color: string, quantity: number) => void;
  getImageUrl: (url: string) => string;
}) {
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0] || '');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Image
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          width={400}
          height={400}
          unoptimized
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        {product.bestForYou && (
          <p className="product-best-for">
            <strong>Best for:</strong> {product.bestForYou}
          </p>
        )}
        <p className="product-price">${product.price.toFixed(2)}</p>

        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="color-options">
            <label>Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="color-select"
            >
              {product.colorOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="quantity-selector">
          <label>Quantity:</label>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <button
          className="buy-now-btn"
          onClick={() => onBuyNow(product, selectedColor, quantity)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}



// Helio Checkout Widget Component
function HelioCheckoutWidget({
  amount,
  productName,
  onSuccess,
  onCancel
}: {
  amount: string;
  productName: string;
  onSuccess: (paymentId: string, transactionHash: string) => void;
  onCancel: () => void;
}) {
  const handleHelioMessage = React.useCallback((event: MessageEvent) => {
    // Helio sends payment completion messages
    if (event.data.type === "HELIO_PAYMENT_SUCCESS") {
      const paymentId = event.data.paymentId || "helio_" + Date.now();
      const transactionHash = event.data.transactionHash || "0x" + Math.random().toString(36).substr(2, 64);
      onSuccess(paymentId, transactionHash);
    } else if (event.data.type === "HELIO_PAYMENT_CANCELLED") {
      onCancel();
    }
  }, [onSuccess, onCancel]);

  useEffect(() => {
    // Load Helio script
    const script = document.createElement("script");
    script.src = "https://embed.hel.io/assets/index-v1.js";
    script.type = "module";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Helio checkout
      const container = document.getElementById("helioCheckoutContainer");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (container && (window as any).helioCheckout) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).helioCheckout(container, {
          paylinkId: "68e661fa1e38886f6fe232ea",
          theme: { themeMode: "dark" },
          primaryColor: "#FE5300",
          neutralColor: "#5A6578",
          amount: amount,
        });

        // Listen for payment events
        window.addEventListener("message", handleHelioMessage);
      }
    };

    return () => {
      // Cleanup
      window.removeEventListener("message", handleHelioMessage);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [amount, handleHelioMessage]);

  return (
    <div className="helio-modal-overlay" onClick={onCancel}>
      <div className="helio-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="helio-close-btn" onClick={onCancel}>
          ✕
        </button>

        <div className="helio-header">
          <h2>Complete Your Purchase</h2>
          <p className="helio-product-name">{productName}</p>
          <p className="helio-amount">${amount} USD</p>
        </div>

        <div id="helioCheckoutContainer" className="helio-container"></div>
      </div>
    </div>
  );
}
