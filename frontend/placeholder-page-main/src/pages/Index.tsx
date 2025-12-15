import { useEffect, useRef, useState } from "react";
import PageSelector from "@/components/PageSelector";
import ReportSection from "@/components/ReportSection";

const sectionContent = [
  {
    title: "Europe",
    description:
      "Stability zone:\nHealthy diets are broadly affordable across Europe, with unaffordability around ~5%.\n\n" +
      "Key drivers:\nThe European Common Agricultural Policy (CAP) and relatively short, resilient supply chains help stabilize prices for fresh foods. However, costs have risen in parts of Eastern Europe due to geopolitical instability, and strong regional food traditions (local sourcing, geographical indications) can keep premium products pricier than in some other high-income regions.",
  },
  {
    title: "Africa",
    description:
      "Affordability crisis:\nEven when the raw cost appears moderate, it is extremely high relative to local incomes. Africa faces the highest burden of unaffordability, with over 70% of the population unable to afford a nutrient-adequate diet.\n\n" +
      "Key drivers:\nHigh costs are reinforced by supply chain inefficiencies, conflict in key regions, and reliance on starchy staples. Nutrient-dense foods (eggs, dairy, fresh produce) are often significantly more expensive than calorie-dense staples (maize, cassava), creating a major barrier to dietary diversity.",
  },
  {
    title: "America",
    description:
      "Inflation hotspot:\nThis region consistently records among the highest average costs for a healthy diet.\n\n" +
      "Key drivers:\nSmall, import-dependent Caribbean economies face elevated prices for perishables due to shipping and storage constraints. On the mainland, high food price inflation, currency volatility, and export-oriented agriculture can keep local fruit and vegetable prices surprisingly high despite strong agricultural output.\n\n"
  },
  {
    title: "Asia",
    description:
      "Largest absolute impact:\nAsia has the largest absolute number of people unable to afford a healthy diet (approx. 1.35 billion).\n\n" +
      "Key drivers:\nThe continent is a study in contrasts. Rapid growth in parts of East Asia has increased demand (and prices) for protein and fresh produce. In South and Southeast Asia, staples can be relatively cheap, but rapid urbanization can create “food swamps” where processed foods are cheaper and more accessible than fresh alternatives.",
  },
  {
    title: "Oceania",
    description:
      "Logistics split:\nRegional averages are heavily influenced by Australia and New Zealand—major food producers with comparatively low costs.\n\n" +
      "Key drivers:\nMany Pacific Island nations face the opposite reality: imported processed foods are cheap and shelf-stable, while fresh produce is expensive to import or difficult to grow at scale due to climate vulnerability. This contributes to a “double burden” of malnutrition alongside some of the world’s highest obesity rates.",
  },
];

// Map React pages -> Dash regions
// Adjust this to whatever logic you want.
const pageToRegion = ["Europe", "Africa", "America", "Asia", "Oceania"];

const Index = () => {
  const [activePage, setActivePage] = useState(0);

  // Ref to the app2 (map) iframe
  const dashMapRef = useRef<HTMLIFrameElement | null>(null);

  const sendRegion = (pageIndex: number) => {
    const region = pageToRegion[pageIndex] ?? "World";

    dashMapRef.current?.contentWindow?.postMessage(
      { type: "SET_REGION", region },
      "*" // dev only. In prod, replace with "http://your-dash-origin"
    );
  };

  // Send on page change
  useEffect(() => {
    sendRegion(activePage);
  }, [activePage]);

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-[80%] space-y-8">
        {/* Title */}
        <header className="text-center animate-fade-in">
          <div className="inline-block rounded-md border border-border bg-card px-6 py-3 shadow-soft">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Where you live determines what you eat: a visual story of global diets
            </h1>
          </div>
        </header>

        {/* Long Description */}
        <section className="relative flex justify-center px-6 py-10 md:py-14">
          {/* subtle background flair */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-background to-background" />

          <div className="w-[min(1600px,96vw)] overflow-hidden rounded-3xl border bg-card shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[420px] md:min-h-[560px]">
                <img
                  src="/food.png"
                  alt="Report overview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
                    Global Nutrition • Overview
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center gap-5 p-10 md:p-14">
                <h2 className="font-display text-3xl font-semibold text-card-foreground">
                  Introduction
                </h2>

                <div className="space-y-5 font-body text-lg leading-relaxed text-muted-foreground">
                  <p>
                    While food is a universal biological necessity, what ends up on our plates is
                    heavily dictated by two powerful external forces:{" "}
                    <span className="font-medium text-card-foreground">economic wealth</span> and{" "}
                    <span className="font-medium text-card-foreground">geography</span>. This project
                    investigates global nutrition trends with the aim to raise awareness on the topic.
                  </p>

                  <div className="space-y-3">
                    <p className="font-medium text-card-foreground">Key Themes</p>

                    <ul className="space-y-3">
                      <li className="rounded-xl border bg-muted/25 px-4 py-3">
                        <span className="font-medium text-card-foreground">
                          The Economic Factor:
                        </span>{" "}
                        We explore how a nation&apos;s GDP per capita influences calorie intake and
                        food sourcing. As nations move from low-income to high-income status, we often
                        see a shift from grain-based diets to those higher in fats, sugars, and animal
                        proteins.
                      </li>

                      <li className="rounded-xl border bg-muted/25 px-4 py-3">
                        <span className="font-medium text-card-foreground">
                          The Geographical Factor:
                        </span>{" "}
                        Beyond money, we examine how location dictates availability. We look at how
                        climate and regional agriculture limit or expand dietary choices, and how
                        globalization is blurring these traditional geographical lines.
                      </li>

                      <li className="rounded-xl border bg-muted/25 px-4 py-3">
                        <span className="font-medium text-card-foreground">
                          The Health Impact:
                        </span>{" "}
                        Ultimately, this project aims to correlate these socio-economic inputs with
                        health outcomes, specifically looking at the rise of obesity versus the
                        persistence of undernutrition.
                      </li>
                    </ul>
                  </div>

                  {/* Core Hypothesis (no special section card) */}
                  <p className="pt-2">
                    <span className="font-medium text-card-foreground">Core Hypothesis:</span> can we
                    state that higher economic wealth correlates with increased caloric intake and BMI?
                    Is this relationship influenced by geographical culture and food availability?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Embed with attached caption - 2:1 ratio (horizontal) */}
        <div className="animate-fade-in [animation-delay:200ms]">
          <ReportSection className="p-4 rounded-b-none">
            <div className="aspect-[2/1]">
              <iframe
                src="http://127.0.0.1:8050/app1/"
                className="h-full w-full rounded-lg"
                allowFullScreen
              />
            </div>
          </ReportSection>

          <div className="flex justify-center px-6">
            <div className="w-[92vw] md:w-[60vw]">
              {/* ✅ caption font size increased here */}
              <div className="rounded-b-2xl border border-t-0 border-border bg-card px-10 py-6 font-body text-base leading-relaxed text-card-foreground shadow-card whitespace-pre-line">
                <div className="space-y-4 text-base">
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-semibold text-card-foreground">
                      Wealth vs. BMI (GDP per capita → mean BMI)
                    </h3>
                    <p className="text-muted-foreground">
                      This scatterplot is our primary investigation into the relationship between
                      national wealth and population health. It plots{" "}
                      <span className="font-medium text-card-foreground">GDP per capita</span> (X-axis,
                      logarithmic scale) against{" "}
                      <span className="font-medium text-card-foreground">mean BMI</span> (Y-axis). Each
                      point represents a country;{" "}
                      <span className="font-medium text-card-foreground">color</span> indicates region,
                      and <span className="font-medium text-card-foreground">bubble size</span> reflects
                      population.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                    <p className="mb-2 font-medium text-card-foreground">What to look for</p>

                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>
                          <span className="font-medium text-card-foreground">Overall pattern:</span>{" "}
                          Countries with lower GDP per capita tend to cluster at lower BMI values, while
                          many higher-income countries appear at higher BMI, suggesting a broad positive
                          relationship.
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>
                          <span className="font-medium text-card-foreground">
                            Spread at high income:
                          </span>{" "}
                          Among wealthier nations, BMI values vary widely rather than rising uniformly,
                          indicating that factors beyond income can strongly shape outcomes.
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>
                          <span className="font-medium text-card-foreground">Outliers:</span> Some
                          countries deviate from the broader pattern—high GDP with comparatively lower
                          BMI (e.g., Switzerland) and very high BMI at high GDP (e.g., the United States).
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>
                          <span className="font-medium text-card-foreground">
                            Regional clustering:
                          </span>{" "}
                          Region-based colors form visible groupings, reflecting shared geography, food
                          systems, and development pathways that can place regions in different BMI
                          “bands” at similar income levels.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground">
                    <span className="font-medium text-card-foreground">Significance:</span> This view
                    tests whether economic growth alone predicts rising obesity, or whether the wide
                    variation—especially among high-income countries—highlights the importance of
                    geography, culture, and public health policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Section - 2:1 ratio (horizontal) */}
        <ReportSection className="animate-fade-in [animation-delay:300ms] p-4">
          <div className="aspect-[2/1] flex gap-4">
            {/* Text + Embed Grid - 1:1 split */}
            <div className="flex-1 grid grid-cols-2 gap-6">
              {/* Description */}
              <div className="flex flex-col justify-center space-y-4 p-4">
                <h2
                  className="font-display text-xl font-semibold text-card-foreground animate-slide-in"
                  key={`title-${activePage}`}
                >
                  {sectionContent[activePage].title}
                </h2>

                {/* ✅ map-section font size increased here */}
                <p
                  className="font-body text-base leading-relaxed text-muted-foreground whitespace-pre-line animate-slide-in [animation-delay:50ms]"
                  key={`desc-${activePage}`}
                >
                  {sectionContent[activePage].description}
                </p>
              </div>

              {/* Secondary Embed - app2 map */}
              <div className="h-full">
                <iframe
                  ref={dashMapRef}
                  src="http://127.0.0.1:8050/app2/"
                  className="h-full w-full rounded-lg"
                  allowFullScreen
                  onLoad={() => sendRegion(activePage)}
                />
              </div>
            </div>

            {/* Page Selector */}
            <div className="flex items-center pl-4 border-l border-border">
              <PageSelector
                pages={sectionContent.length}
                activePage={activePage}
                onPageChange={setActivePage}
              />
            </div>
          </div>
        </ReportSection>

        {/* App 3 — Line chart section (no paging) */}
        <ReportSection className="animate-fade-in [animation-delay:400ms] p-4">
          <div className="aspect-[2/1] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: app3 iframe */}
            <div className="h-full">
              <iframe
                src="http://127.0.0.1:8050/app3/"
                className="h-full w-full rounded-lg"
                allowFullScreen
              />
            </div>

            {/* Right: text */}
            <div className="flex flex-col justify-center space-y-4 p-4">
              <h2 className="font-display text-xl font-semibold text-card-foreground">
                Obesity — Regional Trend (2017–2022)
              </h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                Write your explanation here…{"\n\n"}
                Example points to mention:
                {"\n"}• which region increases/decreases the most
                {"\n"}• any notable spikes/drops
                {"\n"}• what the trend suggests over 2017–2022
              </p>
            </div>
          </div>
        </ReportSection>

        {/* Conclusion (title top + centered horizontally, single text block) */}
        <div className="flex justify-center px-6 animate-fade-in [animation-delay:400ms]">
          <div className="w-[min(1600px,96vw)] overflow-hidden rounded-2xl border bg-card shadow-card">
            <div className="p-10 md:p-14 min-h-[420px] md:min-h-[560px]">
              <h2 className="text-center font-display text-3xl font-semibold text-card-foreground">
                Conclusion
              </h2>

              <p className="mt-8 font-body text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                Write your conclusion here…
                {"\n\n"}
                Summarize the key patterns you found across the visualizations, highlight the most
                important takeaways, and end with a short statement about why the results matter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
