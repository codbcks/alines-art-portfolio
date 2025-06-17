import Image from 'next/image';

const BioPage = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-5 py-10 sm:px-10 lg:flex-row lg:items-start lg:gap-12 lg:px-20">
      {/* Image on the left */}
      <Image
        src="/bio-photo.png" // <- replace with Cloudinary or hosted image URL
        alt="Aline cooking"
        width={1000} // ?
        height={1000} // ?
        className="mb-8 h-auto w-72 rounded lg:mb-0"
      />

      {/* Text on the right */}
      <div className="text-left">
        <h1 className="mb-4 text-3xl font-semibold">about me</h1>
        <p className="mb-4 leading-relaxed text-gray-900">
          Aline Yamaura is a New Zealand-based artist of Japanese descent, currently completing a
          Bachelor of Fine Arts at the University of Auckland. She navigates the complex space
          between two cultural identities, with her creative practice often questioning the
          boundaries between cultural appreciation and appropriation. Her work reflects a deep
          engagement with themes of heritage, memory, and spiritual connection, shaped by her
          upbringing and cultural background.
        </p>
        <p className="leading-relaxed text-gray-900">
          Aline draws on her personal history and lived experiences, using her practice as a means
          of self-reflection and discovery. She finds comfort in the familiarity of structured
          processes, shaped in part by her past work environments, which offer her a therapeutic
          sense of rhythm and repetition. Positioned within the cultural diversity of Aotearoa New
          Zealand, Aline values dialogue across identities, and her art becomes a site for exploring
          belonging, spiritual instinct, and the evolving nature of her cultural identity.
        </p>
      </div>
    </section>
  );
};

export default BioPage;
