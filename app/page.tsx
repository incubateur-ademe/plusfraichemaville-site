import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h3>
        <Link href="/aide-decision/">Module d{"'"}aide à la décision</Link>
      </h3>
      <h3>
        <Link href="/fiche-technique/">Voir la liste des fiches techniques du CMS</Link>
      </h3>
    </main>
  );
}
