import React from "react";
import styles from "./layout.module.css";
import HomePageGroupButtons from "@/components/HomePageGroupButtons";
export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.buttonGroupWrapper}>
      <HomePageGroupButtons />
      {children}
    </div>
  );
}
