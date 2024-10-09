import { NextResponse } from "next/server";

export function middleware(req) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = Buffer.from(authValue, "base64")
      .toString()
      .split(":");

    // Проверка логина и пароля
    if (user === "dev" && password === "DevUser") {
      return NextResponse.next(); // Разрешаем продолжение запроса
    }
  }

  // Если аутентификация не пройдена, запрашиваем авторизацию
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Указываем, что middleware применяется ко всем маршрутам
export const config = {
  matcher: "/:path*", // Соответствует всем страницам и подстраницам
};
