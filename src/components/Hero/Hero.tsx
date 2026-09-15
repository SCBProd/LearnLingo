"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Hero.module.css";

const themes = [
  { color: "#f4c550", light: "#fbe9ba", macFilter: "none" },
  { color: "#9fbaae", light: "#cbded3", macFilter: "hue-rotate(95deg) saturate(0.45)" },
  { color: "#9fb7ce", light: "#bfd6ea", macFilter: "hue-rotate(165deg) saturate(0.55)" },
  { color: "#e0a39a", light: "#f2c0bd", macFilter: "hue-rotate(285deg) saturate(0.55)" },
  { color: "#f0aa8d", light: "#f4c8ba", macFilter: "hue-rotate(325deg) saturate(0.7)" },
] as const;

type Theme = (typeof themes)[number];

export function Hero() {
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const themeStyles = {
    "--theme-color": theme.color,
    "--theme-light": theme.light,
    "--mac-filter": theme.macFilter,
  } as React.CSSProperties;

  useEffect(() => {
    const timer = window.setTimeout(() => setTheme(themes[Math.floor(Math.random() * themes.length)]), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="container" aria-labelledby="hero-title">
      <div
        className={styles.hero}
        style={themeStyles}
      >
        <div className={styles.contentCard}>
          <h1 id="hero-title">
            Unlock your potential with the best <span>language</span> tutors.
          </h1>
          <h2>
            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency
            to new heights by connecting with highly qualified and experienced tutors.
          </h2>
          <Link href="/teachers" className={styles.startButton}>
  Get started
</Link>
        </div>

        <div className={styles.illustration} aria-hidden="true">
          <Image
            className={styles.tutorSticker}
            src="/images/tutor-sticker.png"
            alt=""
            width={350}
            height={350}
            priority
          />
          <Image
            className={styles.macbook}
            src="/images/yellow-macbook.svg"
            alt=""
            width={360}
            height={176}
            priority
          />
        </div>
      </div>

      <ul className={styles.statistics} style={themeStyles} aria-label="Platform statistics">
        <svg className={styles.statisticsOutline} viewBox="0 0 1312 116" preserveAspectRatio="none" aria-hidden="true">
          <rect x="1" y="1" width="1310" height="114" rx="29" />
        </svg>
        <li>
          <strong>32,000 +</strong>
          <span>experienced<br />tutors</span>
        </li>
        <li>
          <strong>300,000 +</strong>
          <span>5 star tutor<br />reviews</span>
        </li>
        <li>
          <strong>120 +</strong>
          <span>subjects<br />taught</span>
        </li>
        <li>
          <strong>200 +</strong>
          <span>tutor<br />nationalities</span>
        </li>
      </ul>
    </section>
  );
}
