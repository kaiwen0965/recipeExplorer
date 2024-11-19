import Link from "next/link";

import classes from "./page.module.css";
import ImageSlideshow from "@/components/images/image-slideshow";

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>Cook, Share, Inspire</h1>
            <p>
              Explore diverse recipes, share meals, and connect with foodies
              worldwide.
            </p>
          </div>
          <div className={classes.cta}>
            <Link href="/meals/share">Share meals now!</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
                <section className={classes.section}>
          <h2>Why us?</h2>
          <p>
            Recipe Explorer is a platform for food enthusiasts to showcase their
            favorite dishes. Explore new recipes, share your own, and connect
            with a community that loves food as much as you do.
          </p>
        </section>
      </main>
    </>
  );
}
