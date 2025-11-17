// components/SearchBar.js
import React from 'react';

export default function SearchBar({ query, setQuery, onCalculate, loading }) {
  
  // Обработка отправки формы (по нажатию Enter или кнопки)
  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 shadow-xl rounded-full p-1 bg-white dark:bg-gray-800">
      
      {/* Поле Ввода */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите ваш запрос (например, 'integral of x^2' или 'population of France')"
        className="flex-grow p-4 text-lg bg-transparent border-none focus:ring-0 rounded-full dark:text-gray-100 text-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
        disabled={loading}
      />
      
      {/* Кнопка Вычисления */}
      <button
        type="submit"
        className={`px-8 py-3 text-lg font-semibold rounded-full transition duration-150 ease-in-out 
          ${loading 
            ? 'bg-blue-300 dark:bg-blue-700 text-white cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-md'
          }`}
        disabled={loading}
      >
        {loading ? '...' : 'Вычислить'}
      </button>
    </form>
  );
}
