import { defaultTrainingConfig } from "@/lib/config";

import { TrainingPresetPanel } from "./TrainingPresetPanel";

const HomeSection = () => {
  return (
    <section
      className="home-section flex min-h-[calc(100vh-48px)] flex-col items-center justify-center
        py-10"
    >
      <h1
        className="font-title mb-8 bg-linear-to-r from-blue-500 via-emerald-500 to-amber-500
          bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:text-5xl"
      >
        Guess the Output C++
      </h1>

      <p className="text-muted-foreground mb-8 max-w-xl text-justify text-sm sm:text-lg md:text-xl">
        Practice C++ the practical way: guess the output, spot errors, and build intuition for
        tricky language rules.
      </p>

      <TrainingPresetPanel defaultConfig={defaultTrainingConfig} />
    </section>
  );
};

export default HomeSection;
