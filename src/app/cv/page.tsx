const CVPage = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-left text-gray-900">
      {/* Education */}
      <h2 className="mb-4 text-3xl font-semibold">education</h2>
      <div className="mb-12 ml-4 space-y-1 text-gray-800">
        <p>University of Auckland</p>
        <p>Bachelor of Fine Arts</p>
        <p>2023-2025</p>
      </div>

      {/* Exhibitions */}
      <h2 className="mb-4 text-3xl font-semibold">exhibitions</h2>
      <ul className="ml-4 space-y-1 text-gray-800">
        <li>2025, Re-Directed, Depot Devonport, Auckland, New Zealand</li>
        <li>2025, Smooth Muscle, Projectspace, Auckland, New Zealand</li>
        <li>2025, Interwoven, Projectspace, Auckland, New Zealand</li>
        <li>2025, Seeing & Knowing, Projectspace, Auckland, New Zealand</li>
        <li>2024, Inhabiting the Inbetween, George Fraser Gallery, Auckland, New Zealand</li>
      </ul>
    </section>
  );
};

export default CVPage;
