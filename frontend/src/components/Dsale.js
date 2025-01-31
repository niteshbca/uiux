import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Dsale() {
  const location = useLocation();
  const { godown } = location.state; // Access godown data from the state
  const [item, setItem] = useState('');
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryItems, setDeliveryItems] = useState([]);

  useEffect(() => {
    // Fetch delivery items from the database
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/deliveryItems`)
      .then((response) => {
        setDeliveryItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching delivery items:', error);
      });
  }, []);

  const handleAddItem = () => {
    if (!item.trim() || !userName.trim() || !mobileNumber.trim()) {
      return alert('Please fill out all fields.');
    }

    // Check if name exists in deliveryItems
    const matchingItem = deliveryItems.find(
      (deliveryItem) => deliveryItem.name.trim().toLowerCase() === item.trim().toLowerCase()
    );

    if (!matchingItem) {
      return alert('Item name does not exist in delivery items.');
    }

    // Add item to the sale collection
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/sales`, {
        name: item,
        userName,
        mobileNumber,
        godown: godown.name,
      })
      .then(() => {
        alert('Item added successfully.');
        setItem('');
        setUserName('');
        setMobileNumber('');
        // Remove item from deliveryItems
        axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}/api/deliveryItems/${matchingItem._id}`)
          .then(() => {
            setDeliveryItems((prev) => prev.filter((i) => i._id !== matchingItem._id));
          })
          .catch((error) => {
            console.error('Error deleting item from delivery items:', error);
          });
      })
      .catch((error) => {
        console.error('Error adding item to sale:', error);
      });
  };

  return (
    <div style={styles.container}>
       <style>{globalStyles}</style>
      <div style={styles.godownDetails}>
        <h2 style={{color:'white', fontSize:'34px'}}>{godown.name}</h2>
        <p style={{color:'white', fontSize:'34px'}}>{godown.address}</p>
        <input
          type="text"
          placeholder="Enter item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          style={styles.input}
        />
        <br />
        <button onClick={handleAddItem} style={styles.button}>
          Add Item
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '190px',
    textAlign: 'center',
    background: 'linear-gradient(-45deg, #fcb900, #9900ef, #ff6900, #00ff07)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 12s ease infinite',
  },
  godownDetails: {
    padding: '20px',
    
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(98, 20, 244, 0.1)',
    display: 'inline-block',
    backgroundColor: 'rgba(218, 216, 224, 0.6)',
    transition: 'transform 0.3s ease-in-out',
    animation: 'moveDiv 5s infinite alternate',
  },
  godownDetailsHover: {
    transform: 'translateY(-10px)',
  },
  input: {
    padding: '10px',
    width: '80%',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '18px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'rgba(218, 216, 224, 0.8)',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize:'20px',
  },
};

// Add keyframes for background and div animation in CSS

const globalStyles = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 100%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 0%; }
  100% { background-position: 0% 50%; }
}
`;

// Inject the animation styles into the document head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
document.head.appendChild(styleSheet);

export default Dsale;
