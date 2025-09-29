// src/middleware.ts
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  // Если статус ответа 403, перенаправляем на кастомную страницу
  if (response.status === 403) {
    return new Response(null, {
      status: 302, // Редирект
      headers: {
        'Location': '/403', // Путь к нашей кастомной странице
      },
    });
  }

  return response;
};