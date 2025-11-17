// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultPod from '../components/ResultPod';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null); // Содержит объект queryresult от WA
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Вызываем наш серверный API-маршрут /api/calculate
      const response = await fetch(`/api/calculate?input=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Ошибка при получении данных от сервера.');
      }

      const data = await response.json();
      
      if (data.error) {
          setError(data.error); // Ошибка от нашего API-маршрута
      } else {
          setResults(data); // Сохраняем полученный объект queryresult
      }
      
    } catch (err) {
      console.error(err);
      setError('Не удалось выполнить запрос. Проверьте подключение или попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Устанавливаем базовый фон и шрифт
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>GDcalc - Ваш продвинутый калькулятор</title>
        <meta name="description" content="GDcalc powered by WolframAlpha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start pt-16 px-4 pb-16">
        
        {/* Заголовок */}
        <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-12 select-none tracking-tight">
          GDcalc
        </h1>
        
        {/* Строка Поиска */}
        <div className="w-full max-w-3xl">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onCalculate={fetchResults}
            loading={loading}
          />
        </div>

        {/* Секция для отображения Результатов */}
        <div className="w-full max-w-4xl mt-16">
            {loading && (
                <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                    Вычисляю... ⏳
                </p>
            )}

            {error && (
                <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900 dark:text-red-300 rounded" role="alert">
                    <p className="font-bold">Ошибка:</p>
                    <p>{error}</p>
                </div>
            )}
            
            {/* Отображение подов с помощью ResultPod */}
            {results && results.pods && (
                 <div className="space-y-6">
                    {/* Перебираем все поды и отображаем их */}
                    {results.pods.map(pod => (
                        <ResultPod key={pod.id} pod={pod} />
                    ))}
                 </div>
            )}
        </div>
      </main>
    </div>
  );
}
