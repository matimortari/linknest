"use client";

import { bowlby, lato } from "@/src/lib/utils";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/profile");
    }
  }, [status]);

  return (
    <div className="min-h-screen lg:flex">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center p-10 lg:w-1/2 lg:justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image src="/logo.png" alt="LinkNest Logo" width={80} height={80} />
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="my-8 flex w-full flex-col items-center gap-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${bowlby.className}`}
          >
            Sign In
          </motion.h2>
          <p className={`${lato.className} text-muted-foreground`}>
            Sign in with Google or GitHub to continue.
          </p>
        </motion.header>

        <hr className="w-full" />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="my-8 flex w-full flex-col items-center gap-4"
        >
          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className="btn max-w-xs bg-[#db4437] text-[#ebe8e8]"
          >
            <Icon icon="simple-icons:google" width={20} height={20} />
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/profile" })}
            className="btn max-w-xs bg-[#333333] text-[#ebe8e8]"
          >
            <Icon icon="simple-icons:github" width={20} height={20} />
            Sign in with GitHub
          </button>
        </motion.section>
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative hidden lg:block lg:w-1/2"
      >
        <Image
          src="/login-image.png"
          alt="Sign In Visual"
          fill
          unoptimized={true}
          priority
          className="rounded-b-xl border-l object-cover"
        />
      </motion.section>
    </div>
  );
}
