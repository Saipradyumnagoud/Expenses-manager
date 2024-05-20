import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Auth from './components/Auth';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchExpenses();
    }
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchExpenses();
  };

  return (
    <div>
      <Header />
      {isAuthenticated ? (
        <div>
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} />
        </div>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
