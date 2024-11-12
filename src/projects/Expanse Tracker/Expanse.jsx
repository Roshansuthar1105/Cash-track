import React, { useState, useEffect } from 'react';
import './Expanse.css';
import ExpanseForm from './ExpanseForm';
import ExpanseList from './ExpanseList';

const Expanse = () => {
  const Expansekey = "ExpanseData";
  const [Expanse, setExpanse] = useState({ id: "", text: "", category: "", amount: 0 });
  const [allExpanse, setAllExpanse] = useState([]);
  const [amount, setAmount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // To track when local storage is loaded

  // Getting data from local storage on refresh
  useEffect(() => {
    const res = localStorage.getItem(Expansekey);
    const data = JSON.parse(res);
    if (data) {
      setAllExpanse(data);
    }
    setIsLoaded(true); // Mark as loaded after fetching from local storage
  }, []);

  // Recalculate the total amount whenever `allExpanse` changes
  useEffect(() => {
    if (isLoaded) {
      const sum = allExpanse.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0);
      setAmount(sum);

      // Only update localStorage after the data is loaded initially
      localStorage.setItem(Expansekey, JSON.stringify(allExpanse));
    }
  }, [allExpanse, isLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Expanse.text.trim() === "" || Expanse.category.trim() === "" || Expanse.amount === 0) return; // Simple validation

    // Set new expense with unique id
    setAllExpanse([...allExpanse, { ...Expanse, id: Date.now() }]);

    // Clear the form after submission
    setExpanse({ id: "", text: "", category: "", amount: 0 });
  };

  const handleDelete = (id) => {
    const filteredExpenses = allExpanse.filter((curr) => curr.id !== id);
    setAllExpanse(filteredExpenses);
  };

  const handleClearAll = () => {
    setAllExpanse([]);
    localStorage.removeItem(Expansekey); // Clear localStorage when clearing all
  };

  return (
    <div className="container">
      <h2>Cash <span>Track</span></h2>
      <ExpanseForm handleSubmit={handleSubmit} Expanse={Expanse} setExpanse={setExpanse} />
      <ul>
        {allExpanse.map((curr) => (
          <ExpanseList key={curr.id} curr={curr} handleDelete={handleDelete} />
        ))}
      </ul>
      <p>Total Amount: {amount}</p>
      <button onClick={handleClearAll}>Clear All</button>
    </div>
  );
};
export default Expanse;