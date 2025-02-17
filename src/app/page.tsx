"use client";
export default function Home() {
  return (
    <div className="flex flex-col justify-end md:justify-between items-center min-h-screen">
      <div className="p-8 flex flex-col gap-6 h-full items-center">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-4xl">Guess the song</h1>
          <h2 className="text-xl font-sans text-center">
            Login with your Spotify Account and play with your Playlists!
          </h2>
        </div>
        <button
          className="p-2 hover:scale-110 transition-transform w-full max-w-[400px] bg-[#1ED760] duration-300 ease-out text-black font-bold rounded-full"
          onClick={() => (window.location.href = "/api/auth/login")}
        >
          login
        </button>
      </div>
      <footer className="w-full py-8 bg-black text-white">
        <div className="flex justify-center space-x-8">
          <a
            href="https://www.linkedin.com/in/ericksoumes/"
            target="_blank"
            className="hover:text-[#1ED760] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ericksoumes"
            target="_blank"
            className="hover:text-[#1ED760] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://ericksousa.dev.br/"
            target="_blank"
            className="hover:text-[#1ED760] transition-colors"
          >
            Website
          </a>
        </div>
        <div className="mt-4 text-center text-sm font-sans">
          <p>© 2025 Erick Sousa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
