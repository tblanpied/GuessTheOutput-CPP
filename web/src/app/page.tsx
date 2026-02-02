import HomeSection from "@/components/sections/home/HomeSection";

export default function Home() {
  return (
    <div
      className="flex min-h-[calc(100vh-48px)] flex-col items-center justify-center overflow-x-clip
        px-4"
    >
      <HomeSection />
    </div>
  );
}
