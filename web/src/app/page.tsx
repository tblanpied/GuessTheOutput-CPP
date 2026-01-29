export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1
        className="mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold
          text-transparent"
      >
        Guess the Output C++
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md text-center text-xl">
        Master C++ by predicting program outputs and understanding compiler behavior
      </p>
      <a
        href="/game"
        className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all
          duration-200 hover:bg-blue-700"
      >
        Start Playing
      </a>
    </main>
  );
}
