/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req, res) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (req.cookies.get("uid_user") === undefined) {
      return NextResponse.redirect(new URL("/masuk", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/inventaris-tugas")) {
    if (req.cookies.get("uid_user") === undefined) {
      return NextResponse.redirect(new URL("/masuk", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/tugas-hari-ini")) {
    if (req.cookies.get("uid_user") === undefined) {
      return NextResponse.redirect(new URL("/masuk", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/laporan")) {
    if (req.cookies.get("uid_user") === undefined) {
      return NextResponse.redirect(new URL("/masuk", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/akun")) {
    if (req.cookies.get("uid_user") === undefined) {
      return NextResponse.redirect(new URL("/masuk", req.url));
    }
  }
}
