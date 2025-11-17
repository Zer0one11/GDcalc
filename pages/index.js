// pages/index.js
import Head from 'next/head';
import SearchBar from '../components/SearchBar';
// Предполагаем, что вы создадите компонент для отображения результатов
// import ResultsDisplay from '../components/ResultsDisplay'; 
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция, которая будет вызывать API WolframAlpha
  const fetchResults = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Здесь мы вызываем наш серверный API-маршрут
      const response = await fetch(`/api/calculate?input=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Ошибка при получении данных от сервера.');
      }

      const data = await response.json();
      
      if (data.error) {
          setError(data.error);
      } else {
          setResults(data); // Сохраняем полученные поды
      }
      
    } catch (err) {
      console.error(err);
      setError('Не удалось выполнить запрос. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>GDcalc - Ваш продвинутый калькулятор</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start pt-16 px-4">
        
        {/* Заголовок */}
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-8">
          GDcalc
        </h1>
        
        {/* Строка Поиска */}
        <div className="w-full max-w-2xl">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onCalculate={fetchResults}
            loading={loading}
          />
        </div>

        {/* Секция для отображения Результатов */}
        <div className="w-full max-w-4xl mt-12">
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
            
            {/* * Здесь будет компонент ResultsDisplay, который будет принимать 'results'
            * и красиво отображать поды WolframAlpha. 
            */}
            {results && results.pods && (
                 <div className="space-y-6">
                    {/* Покажем простой вывод JSON для отладки */}
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Результаты</h2>
                    {/* {results.pods.map(pod => (<ResultPod key={pod.title} pod={pod} />))} */}
                    
                    {/* Временный вывод: */}
                    <pre className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg overflow-x-auto">
                        {JSON.stringify(results.pods, null, 2)}
                    </pre>
                 </div>
            )}

        </div>
      </main>
    </div>
  );
}
