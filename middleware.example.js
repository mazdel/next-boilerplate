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

  if (isProtectedPath && !isNotProtectedPath) {
    let verifiedToken;
    const token = request.cookies.get("access_token")?.value;
    if (token) {
      verifiedToken = await AuthVerify(token).catch((err) => {
        console.error(err);
      });
    }
    if (pathname === globalConfig.defaultRedirectPath && verifiedToken)
      return NextResponse.redirect(
        new URL(verifiedToken.homePath, request.url),
      );

    if (!verifiedToken) {
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

    const response = NextResponse.next();
    response.cookies.set({
      name: "access_token",
      value: token,
      expires: moment.unix(verifiedToken.exp).toDate(),
    });
    return response;
  }

  return NextResponse.next();
}
