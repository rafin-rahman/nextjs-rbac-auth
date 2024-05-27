"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logoutAction from "@/app/logout/logoutAction";

export default function logout() {
  async function logoutUser() {
    await logoutAction({});
  }

  return (
    <div className={"container   flex flex-col justify-center min-h-screen  "}>
      <Button asChild variant={"outline"} className={"m-10 mx-96"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>
      <div className={"flex mx-auto flex-col text-center pt-20"}>
        <h1 className={"text-4xl mb-10 "}>Are you sure you want to logout?</h1>
        <Button
          variant={"destructive"}
          className={"m-10 mx-80"}
          onClick={() => {
            logoutUser();
          }}
        >
          Yes, log me out
        </Button>
        <Button asChild variant={"outline"}>
          <Link href={"/dashboard"}>Visit /Dashboard route</Link>
        </Button>
      </div>
    </div>
  );
}
