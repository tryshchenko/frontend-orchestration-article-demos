export default function Home() {
  return (
    <div>
      <p>Native links are used to avoid caching confusion</p>
      <ul>
        <li>
          <a href="/combined">Combined</a>
        </li>
        <li>
          <a href="/orchestrated">Orchestrated</a>
        </li>
        <li>
          <a href="/orchestrated-batched">Orchestrated batched</a>
        </li>
      </ul>
    </div>
  );
}
