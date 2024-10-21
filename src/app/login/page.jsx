import React from "react";

import LoginForm from "./ui/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
 
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
