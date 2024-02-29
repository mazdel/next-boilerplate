import { NextResponse } from "next/server";
import globalConfig from "@/configs/global";
import { AuthVerify } from "@/libs/Auth";
import moment from "moment/moment";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const isProtectedPath = globalConfig.protectedPath.some((path) =>
    pathname.startsWith(path),
  );
  const isNotProtectedPath = globalConfig.unProtectedPath.some((path) =>
    pathname.startsWith(path),
  );

  try {
    const token = request.cookies.get("access_token")?.value;

    if (!token) throw { status: 401, message: "Token Required" };

    const verifiedToken = await AuthVerify(token).catch((err) => {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
    });

    if (!verifiedToken) {
      throw { status: 401, message: "Authentication Required" };
    }

    if (pathname === globalConfig.defaultRedirectPath) {
      return NextResponse.redirect(
        new URL(verifiedToken.homePath, request.url),
      );
    }

    const response = NextResponse.next();
    response.cookies.set({
      name: "access_token",
      value: token,
      expires: moment.unix(verifiedToken.exp).toDate(),
    });
    return response;

  } catch (e) {
    
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    if (isProtectedPath && !isNotProtectedPath) {
      if (pathname.includes("/api")) {
        return NextResponse.json(
          { message: "Authentication Required" },
          { status: 401 },
        );
      }
      return NextResponse.redirect(
        new URL(globalConfig.defaultRedirectPath, request.url),
      );
    }
    return NextResponse.next();
  }
}
