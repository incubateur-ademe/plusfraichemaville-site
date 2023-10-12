import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Page d accueil</h1>
      <h3>
        <Link href="/aide-decision/">Module d{"'"}aide à la décision</Link>
      </h3>
      <h3>
        <Link href="/fiches-techniques/">Voir la liste des fiches techniques du CMS</Link>
      </h3>
    </main>
  );
}
