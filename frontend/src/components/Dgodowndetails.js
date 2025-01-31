import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Dgodowndetails() {
  const location = useLocation();
  const { godown } = location.state; // Access godown data from the state
  const [item, setItem] = useState('');
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    // Fetch items from the database for the current godown
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/items/${godown._id}`)
      .then((response) => {
        setAddedItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, [godown]);

  const handleAddItem = () => {
    if (!item.trim()) return alert('Please enter an item.');

    // Save the item to the database
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/items`, {
        godownId: godown._id,
        name: item,
      })
      .then((response) => {
        setAddedItems([...addedItems, response.data]); // Update items in state
        setItem(''); // Clear input field
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  const styles = {
    container: {
      margin: 0,
      padding: '50px 20px',
      fontFamily: "'Poppins', sans-serif",
      textAlign: 'center',
      background: 'linear-gradient(-45deg, #fcb900, #9900ef, #ff6900, #00ff07)',
      backgroundSize: '400% 400%',
      animation: 'gradientAnimation 12s ease infinite',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    godownDetails: {
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '15px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(218, 216, 224, 0.6)',
      animation: 'cardBounce 2s infinite ease-in-out',
      width: '100%',
      maxWidth: '600px',
    },
    title: {
      fontSize: '2.6rem',
      color: 'white',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1.8rem',
      color: 'white',
      marginBottom: '25px',
    },
    input: {
      padding: '12px',
      width: '90%',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '20px',
      fontSize: '1rem',
    },
    button: {
      padding: '12px 30px',
      backgroundColor: 'rgba(218, 216, 224, 0.8)',
      color: '#fff',
      border: 'none',
      borderRadius: '30px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(247, 244, 239, 0.4)',
    },
    buttonHover: {
      background: 'linear-gradient(218, 216, 224, 0.8)',
      transform: 'translateY(-3px) scale(1.1)',
      boxShadow: '0 8px 20px rgba(235, 232, 228, 0.6)',
    },
    itemList: {
      listStyleType: 'none',
      padding: 0,
      marginTop: '20px',
    },
    listItem: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '30px',
      marginBottom: '10px',
      background: '#f9f9f9',
      color: '#333',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    },
  };
  const globalStyles = `
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    25% { background-position: 50% 100%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 0%; }
    100% { background-position: 0% 50%; }
  }
  `;

  return (
    <div style={styles.container}>
       <style>{globalStyles}</style>
      <div style={styles.godownDetails}>
        <h2 style={styles.title}>{godown.name}</h2>
        <p style={styles.subtitle}>{godown.address}</p>
        <input
          type="text"
          placeholder="Enter item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleAddItem}
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.background =
              'linear-gradient(218, 216, 224, 0.8)';
            e.target.style.transform = 'translateY(-3px) scale(1.1)';
            e.target.style.boxShadow =
              '0 8px 20px rgba(220, 218, 216, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              'linear-gradient(218, 216, 224, 0.83)';
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow =
              '0 5px 15px rgba(213, 210, 205, 0.4)';
          }}
        >
          Scan Item
        </button>
        <h3 style={{color:'white', fontSize:'24px'}}>Added Items:</h3>
        <ul style={styles.itemList}>
          {addedItems.map((item) => (
            <li key={item._id} style={styles.listItem}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dgodowndetails;
