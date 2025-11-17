// components/ResultPod.js
import React from 'react';

// Утилита для форматирования текста (чтобы переводы строк из plaintext отображались)
const formatText = (text) => {
    // Заменяем символы новой строки на <br> для корректного отображения в HTML
    return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));
};

export default function ResultPod({ pod }) {
  
  // Проверяем наличие текста в поле 'plaintext'
  const podText = pod.subpods.map(subpod => subpod.plaintext).join('\n\n').trim();

  // Если нет текста, игнорируем под (например, пустые поды с графиками, которые мы не обрабатываем)
  if (!podText) {
    return null;
  }
  
  // Если у пода есть изображение, используем его (хотя Full Results API часто возвращает его)
  const imageUrl = pod.subpods.length > 0 && pod.subpods[0].img ? pod.subpods[0].img.src : null;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      
      {/* Заголовок Пода (например, 'Input interpretation' или 'Result') */}
      <h3 className="text-xl font-bold mb-3 pb-2 border-b border-blue-100 dark:border-blue-800 text-gray-900 dark:text-gray-100">
        {pod.title}
      </h3>
      
      <div className="flex flex-col md:flex-row md:space-x-6 items-start">
        
        {/* Отображение Текста (результата) */}
        <div className="flex-grow text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {formatText(podText)}
        </div>
        
        {/* Отображение Изображения (если есть) */}
        {imageUrl && (
            <div className="mt-4 md:mt-0 md:flex-shrink-0 max-w-full">
                {/* Alt текст для изображения берется из описания, если оно есть */}
                <img 
                    src={imageUrl} 
                    alt={pod.title} 
                    className="max-w-full h-auto rounded-lg shadow-md"
                />
            </div>
        )}
      </div>
    </div>
  );
}
