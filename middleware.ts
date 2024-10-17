import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Исключаем запросы к /api и статическим файлам
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/static")
  ) {
    return NextResponse.next(); // Пропускаем запросы к API и статическим файлам
  }

  console.log("url.pathname", url.pathname);

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const decodedAuth = Buffer.from(authValue, "base64").toString();

    if (decodedAuth.includes(":")) {
      const [user, password] = decodedAuth.split(":");

      // Проверка логина и пароля
      if (
        user === process.env.NEXT_BASIC_AUTH_LOGIN &&
        process.env.NEXT_BASIC_AUTH_PASSWORD
      ) {
        return NextResponse.next(); // Успешно проходим
      }
    }
  }

  // Если аутентификация не пройдена
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Применяем middleware ко всем страницам
export const config = {
  matcher: "/:path*", // Все маршруты
};
