"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const transactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  return (
    <transactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </transactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(transactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};