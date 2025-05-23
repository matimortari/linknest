"use client";

import AppearanceForm from "@/src/app/(admin)/preferences/appearance-form";
import DeleteAccount from "@/src/app/(admin)/preferences/delete-account";
import Preview from "@/src/components/preview";
import { useGetPreferences } from "@/src/hooks/use-queries";
import useUserStore from "@/src/hooks/use-store";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Preferences() {
  const { data: session, status } = useSession();
  const { setUser } = useUserStore();
  const { data: preferences = {} } = useGetPreferences();

  const [selectedPreferences, setSelectedPreferences] = useState(preferences);

  useEffect(() => {
    if (status === "unauthenticated" || !session?.user) {
      redirect("/login");
    }

    setUser(session.user);
  }, [session, status, setUser]);

  useEffect(() => {
    setSelectedPreferences(preferences);
  }, [preferences]);

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <motion.main
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="card flex-1"
      >
        <header className="space-y-2">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Preferences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-caption text-muted-foreground"
          >
            Manage your profile.
          </motion.p>
        </header>

        <hr className="my-4" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col gap-4"
        >
          <section className="section-container">
            <AppearanceForm
              preferences={selectedPreferences}
              setPreferences={setSelectedPreferences}
            />
          </section>

          <section className="section-container border-danger-foreground">
            <DeleteAccount />
          </section>
        </motion.div>
      </motion.main>

      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-4/12"
      >
        <Preview preferences={selectedPreferences} />
      </motion.aside>
    </div>
  );
}
