// pages/api/calculate.js
import fetch from 'node-fetch';

// Ключ берется из переменных окружения
const WOLFRAM_ALPHA_APPID = process.env.WOLFRAM_ALPHA_APPID;

export default async function handler(req, res) {
  const { input } = req.query;

  if (!input) {
    return res.status(400).json({ error: 'Параметр "input" обязателен.' });
  }

  if (!WOLFRAM_ALPHA_APPID) {
    // Эта проверка поможет вам, если вы забыли добавить ключ
    return res.status(500).json({ error: 'API-ключ WolframAlpha не установлен в окружении.' });
  }

  // Формируем URL для Full Results API
  const apiUrl = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(input)}&format=plaintext&output=json&appid=${WOLFRAM_ALPHA_APPID}`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error(`WolframAlpha API вернул статус ${response.status}`);
    }

    const data = await response.json();
    
    // Проверка, есть ли ошибка или пустой результат
    if (data.queryresult.error) {
        return res.status(200).json({ error: data.queryresult.error.msg });
    }
    
    if (!data.queryresult.pods || data.queryresult.numpods === 0) {
        return res.status(200).json({ error: 'Не удалось найти ответ на ваш запрос.' });
    }

    // Отправляем чистые результаты (поды) обратно на фронтенд
    res.status(200).json(data.queryresult);
    
  } catch (error) {
    console.error('Ошибка при обращении к WolframAlpha:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера при обработке запроса.' });
  }
}
