import React, { useState, useRef, useEffect } from 'react';
import Header from '../Components/Header/Header';
import { IoCloseSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import styles from './Datapage.module.css';

const Datapage = () => {

  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(0);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [tableName, setTableName] = useState('');
  const [tablePersons, setTablePersons] = useState(1);
  const swipeRef = useRef(null);

  
  const itemTotal = 299 * quantity;
  const tax = Math.round(itemTotal * 0.05);
  const delivery = 30;
  const total = itemTotal + tax + delivery;


  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    setQuantity(isNaN(val) || val < 1 ? 1 : val);
  };
  const resetQuantity = () => setQuantity(1);

  // Add to cart function
  const addToCart = () => {
    setCartItems(prev => prev + quantity);
    resetQuantity();
    // In a real app, you would add to cart context/state
    alert(`${quantity} item(s) added to cart!`);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    setIsSwiping(true);
    setSwipeProgress(0);
    const startX = e.touches ? e.touches[0].clientX : e.clientX;
    swipeRef.current.startX = startX;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    
    const moveX = e.touches ? e.touches[0].clientX : e.clientX;
    const containerWidth = swipeRef.current.offsetWidth;
    const distance = moveX - swipeRef.current.startX;
    const progress = Math.min(100, Math.max(0, (distance / containerWidth) * 100));
    
    setSwipeProgress(progress);
  };

  const handleTouchEnd = () => {
    if (swipeProgress > 70) {
      addToCart();
    }
    setIsSwiping(false);
    setSwipeProgress(0);
  };

  // Add mouse event handlers for desktop
  useEffect(() => {
    const swipeElement = swipeRef.current;
    if (!swipeElement) return;

    swipeElement.addEventListener('mousedown', handleTouchStart);
    swipeElement.addEventListener('mousemove', handleTouchMove);
    swipeElement.addEventListener('mouseup', handleTouchEnd);
    swipeElement.addEventListener('mouseleave', handleTouchEnd);

    return () => {
      swipeElement.removeEventListener('mousedown', handleTouchStart);
      swipeElement.removeEventListener('mousemove', handleTouchMove);
      swipeElement.removeEventListener('mouseup', handleTouchEnd);
      swipeElement.removeEventListener('mouseleave', handleTouchEnd);
    };
  }, [isSwiping, swipeProgress]);

  return (
    <>
      <Header cartCount={cartItems} />
      <div className={styles.container}>
        {/* Cart Header */}
        <div className={styles.cartHeader}>
          <FaShoppingCart className={styles.cartIcon} />
          <span className={styles.cartCount}>{cartItems}</span>
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <img src='/pizza.png' alt='pizza' className={styles.image} />
          <p className={styles.description}>Delicious cheesy pizza with extra toppings and spicy sauce.</p>
        </div>

        {/* Title and Price */}
        <div className={styles.titlePrice}>
          <h1 className={styles.title}>Classic Margherita</h1>
          <h2 className={styles.price}>₹ {itemTotal}</h2>
        </div>

        {/* Quantity Counter */}
        <div className={styles.counter}>
          <button onClick={decrement}>-</button>
          <input 
            type='number' 
            min="1" 
            value={quantity} 
            onChange={handleChange} 
            className={styles.quantityInput}
          />
          <button onClick={increment}>+</button>
          <IoCloseSharp className={styles.closeIcon} onClick={resetQuantity} />
        </div>

        {/* Charges Section */}
        <div className={styles.charges}>
          <h3>Bill Details</h3>
          <ul>
            <li className={styles.billItem}>
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </li>
            <li className={styles.billItem}>
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </li>
            <li className={styles.billItem}>
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </li>
            <li className={`${styles.billItem} ${styles.total}`}>
              <span>Total</span>
              <span>₹{total}</span>
            </li>
          </ul>
        </div>

        {/* Table Details Section */}
        <div className={styles.details}>
          <h3>Table Details</h3>
          <div className={styles.inputGroup}>
            <label>Table Number</label>
            <input 
              type="text" 
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table number"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Number of Persons</label>
            <input 
              type="number" 
              min="1"
              value={tablePersons}
              onChange={(e) => setTablePersons(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.inputField}
            />
          </div>
        </div>

        {/* Swipe to Order */}
        <div 
          ref={swipeRef}
          className={styles.swipeContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.swipeProgress}
            style={{ width: `${swipeProgress}%` }}
          ></div>
          <div className={styles.swipeText}>
            {swipeProgress > 70 ? 'Release to Add to Cart' : '👉 Swipe to Add to Cart'}
          </div>
        </div>

        {/* Regular Add to Cart Button */}
        <button className={styles.addToCartButton} onClick={addToCart}>
          Add {quantity} to Cart - ₹{itemTotal}
        </button>
      </div>
    </>
  );
};

export default Datapage;