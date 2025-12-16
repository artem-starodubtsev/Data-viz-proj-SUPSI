import { useEffect, useRef, useState } from "react";
import PageSelector from "@/components/PageSelector";
import ReportSection from "@/components/ReportSection";

const sectionContent = [
  {
    title: "Europe",
    description:
      "Stability zone\n" +
      "Healthy diets are broadly affordable across Europe, with unaffordability around ~5%.\n\n" +
      "Key drivers\n" +
      "• CAP support and relatively short, resilient supply chains help stabilize prices for fresh foods.\n" +
      "• Strong local sourcing traditions support availability, but can keep premium products pricier.\n\n" +
      "What to watch\n" +
      "• Costs are rising in parts of South Europe as geopolitical instability disrupts markets.\n\n" +
      "Takeaway\n" +
      "Europe is largely stable and affordable, but the trend is uneven across sub-regions.",
  },
  {
    title: "Africa",
    description:
      "Affordability crisis\n" +
      "Even when the raw cost appears moderate, it is extremely high relative to local incomes. Africa faces the highest burden of unaffordability, with over 70% unable to afford a nutrient-adequate diet.\n\n" +
      "Key drivers\n" +
      "• Supply chain inefficiencies and conflict raise prices and reduce reliable access.\n" +
      "• Diets rely heavily on starchy staples; nutrient-dense foods (eggs, dairy, produce) are far more expensive than maize/cassava.\n\n" +
      "What to watch\n" +
      "• Shocks (conflict, drought, currency swings) quickly translate into higher prices for diverse foods.\n\n" +
      "Takeaway\n" +
      "The biggest barrier is not “cost” alone, but cost relative to income—diet diversity is priced out for most households.",
  },
  {
    title: "America",
    description:
      "Inflation hotspot\n" +
      "This region often records some of the highest average costs for a healthy diet.\n\n" +
      "Key drivers\n" +
      "• Caribbean economies are frequently import-dependent, pushing up prices for perishables.\n" +
      "• Mainland markets can face high food inflation, currency volatility, and export-oriented agriculture that keeps top-quality produce priced for export rather than local budgets.\n\n" +
      "What to watch\n" +
      "• Price spikes can arrive quickly through fuel/shipping costs and exchange-rate changes.\n\n" +
      "Takeaway\n" +
      "High costs are driven by inflation + trade structure, not a lack of agriculture.\n\n" +
      "Region note\n" +
      "In our visualizations, Latin America and the Caribbean are combined into this single “America” region.",
  },
  {
    title: "Asia",
    description:
      "Largest absolute impact\n" +
      "Asia has the largest absolute number of people unable to afford a healthy diet (approx. 1.35 billion).\n\n" +
      "Key drivers\n" +
      "• East Asia’s rapid growth increases demand (and prices) for protein and fresh produce.\n" +
      "• In South and Southeast Asia, staples can be cheap, while urbanization accelerates “food swamps” where processed foods are cheaper and more accessible than fresh alternatives.\n\n" +
      "What to watch\n" +
      "• Urban diets can shift faster than supply chains can adapt, widening nutrition gaps.\n\n" +
      "Takeaway\n" +
      "Asia is a region of extremes—affordability varies sharply by sub-region and by urban vs. rural access.",
  },
  {
    title: "Oceania",
    description:
      "Logistics split\n" +
      "Regional averages are strongly influenced by Australia and New Zealand—major food producers with relatively low costs.\n\n" +
      "Key drivers\n" +
      "• In many Pacific Island nations, imported processed foods are cheap and shelf-stable.\n" +
      "• Fresh produce is expensive to import and difficult to grow at scale due to climate vulnerability, increasing reliance on imports.\n\n" +
      "What to watch\n" +
      "• Climate shocks and shipping disruptions disproportionately raise the cost of fresh foods.\n\n" +
      "Takeaway\n" +
      "The region hides two realities: low-cost producers (AU/NZ) and high-cost islands facing strong nutrition constraints.",
  },
];

// Map React pages -> Dash regions
const pageToRegion = ["Europe", "Africa", "America", "Asia", "Oceania"];

const Index = () => {
  const [activePage, setActivePage] = useState(0);

  // Ref to the app2 (map) iframe
  const dashMapRef = useRef<HTMLIFrameElement | null>(null);

  const sendRegion = (pageIndex: number) => {
    const region = pageToRegion[pageIndex] ?? "World";
    dashMapRef.current?.contentWindow?.postMessage({ type: "SET_REGION", region }, "*");
  };

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
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-background to-background" />

          <div className="w-[min(1600px,96vw)] overflow-hidden rounded-3xl border bg-card shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[420px] md:min-h-[560px]">
                <img src="/food.png" alt="Report overview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
                    Global Nutrition • Overview
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center gap-5 p-10 md:p-14">
                <h2 className="font-display text-3xl font-semibold text-card-foreground">Introduction</h2>

                <div className="space-y-5 font-body text-lg leading-relaxed text-muted-foreground">
                  <p>
                    While food is a universal biological necessity, what ends up on our plates is heavily
                    dictated by two powerful external forces:{" "}
                    <span className="font-medium text-card-foreground">economic wealth</span> and{" "}
                    <span className="font-medium text-card-foreground">geography</span>. This project
                    investigates global nutrition trends with the aim to raise awareness on the topic.
                  </p>

                  <div className="space-y-3">
                    <p className="font-medium text-card-foreground">Key Themes</p>

                    <ul className="space-y-3">
                      <li className="rounded-xl border bg-muted/25 px-4 py-3">
                        <span className="font-medium text-card-foreground">The Economic Factor:</span>{" "}
                        We explore how a nation&apos;s GDP per capita influences calorie intake and food
                        sourcing. As nations move from low-income to high-income status, we often see a
                        shift from grain-based diets to those higher in fats, sugars, and animal proteins.
                      </li>

                      <li className="rounded-xl border bg-muted/25 px-4 py-3">
                        <span className="font-medium text-card-foreground">The Geographical Factor:</span>{" "}
                        Beyond money, we examine how location dictates availability. We look at how climate
                        and regional agriculture limit or expand dietary choices, and how globalization is
                        blurring these traditional geographical lines.
                      </li>

                      <li className="rounded-xl border bg-muted/25 px-4 py-3">
                        <span className="font-medium text-card-foreground">The Health Impact:</span>{" "}
                        Ultimately, this project aims to correlate these socio-economic inputs with health
                        outcomes, specifically looking at the rise of obesity versus the persistence of
                        undernutrition.
                      </li>
                    </ul>
                  </div>

                  <p className="pt-2">
                    <span className="font-medium text-card-foreground">Core Hypothesis:</span> can we state
                    that higher economic wealth correlates with increased caloric intake and BMI? Is this
                    relationship influenced by geographical culture and food availability?
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
              <div className="rounded-b-2xl border border-t-0 border-border bg-card px-10 py-6 font-body text-base leading-relaxed text-card-foreground shadow-card whitespace-pre-line">
                <div className="space-y-4 text-base">
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-semibold text-card-foreground">
                      Wealth vs. BMI (GDP per capita → mean BMI)
                    </h3>
                    <p className="text-muted-foreground">
                      This scatterplot is our primary investigation into the relationship between national
                      wealth and population health. It plots{" "}
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
                          <span className="font-medium text-card-foreground">Spread at high income:</span>{" "}
                          Among wealthier nations, BMI values vary widely rather than rising uniformly,
                          indicating that factors beyond income can strongly shape outcomes.
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>
                          <span className="font-medium text-card-foreground">Outliers:</span> Some countries
                          deviate from the broader pattern—high GDP with comparatively lower BMI (e.g.,
                          Switzerland) and very high BMI at high GDP (e.g., the United States).
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>
                          <span className="font-medium text-card-foreground">Regional clustering:</span>{" "}
                          Region-based colors form visible groupings, reflecting shared geography, food
                          systems, and development pathways that can place regions in different BMI “bands”
                          at similar income levels.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground">
                    <span className="font-medium text-card-foreground">Significance:</span> This view tests
                    whether economic growth alone predicts rising obesity, or whether the wide
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
            <div className="flex-1 grid grid-cols-2 gap-6">
              {/* Description */}
              <div className="flex flex-col justify-center space-y-4 p-4">
                <h2
                  className="font-display text-xl font-semibold text-card-foreground animate-slide-in"
                  key={`title-${activePage}`}
                >
                  {sectionContent[activePage].title}
                </h2>

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

              <p className="font-body text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                {`Across every region, obesity rises steadily from 2017 to 2022. The important feature is how “smooth” the lines are: there are no dramatic spikes or reversals, just a consistent upward drift. That kind of near-linear growth points to long-term, structural drivers—food environments, urban lifestyles, and gradual dietary change—rather than short, one-off events.

This time-series also helps interpret our earlier GDP vs BMI scatter. We saw a broad positive relationship between wealth and BMI, but also a wide spread among high-income countries. Here, even regions that already sit high on the BMI scale (especially America, and then Europe/Oceania) continue to climb, showing that wealth doesn’t automatically protect against obesity once a processed-food environment is established. Meanwhile, Asia and Africa trend upward too, reinforcing that obesity is not only a “rich-country” issue.

The affordability maps provide a second explanation for why the rise is so persistent. In high-income regions, healthy diets may be affordable, but ultra-processed foods can be even cheaper and more convenient—making the default choice calorie-dense. In lower-income regions where healthy diets are often unaffordable, the pathway is different: limited access to diverse, nutrient-rich foods can coexist with growing availability of low-cost processed calories. Taken together, these charts show a global pattern: baseline obesity levels differ by region, but the direction of change is consistently upward.`}
              </p>
            </div>
          </div>
        </ReportSection>

        {/* Conclusion */}
        <div className="flex justify-center px-6 animate-fade-in [animation-delay:400ms]">
          <div className="w-[min(1600px,96vw)] overflow-hidden rounded-2xl border bg-card shadow-card">
            <div className="p-10 md:p-14 min-h-[420px] md:min-h-[560px]">
              <h2 className="text-center font-display text-3xl font-semibold text-card-foreground">
                Conclusion
              </h2>

              <p className="mt-8 font-body text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {`Across our visualizations, one message stays consistent: nutrition outcomes are shaped by both wealth and place, but neither factor works alone.

The BMI vs GDP scatter shows a broad upward relationship—countries with higher GDP per capita tend to sit at higher average BMI. At the same time, the spread among wealthy countries is large, which tells us that economic growth does not automatically “lock in” a single health outcome. Culture, policy, and food environments can push countries above or below the typical pattern.

The affordability maps explain part of that variation. Some regions face an affordability crisis where nutrient-dense foods are priced out relative to income, limiting dietary diversity and reinforcing dependence on cheap staples. Other regions have generally affordable healthy diets, yet still struggle because ultra-processed foods remain cheaper and more convenient than fresh alternatives. In both cases, the food system—pricing, logistics, and what is easiest to access—strongly influences what people actually eat.

Finally, the obesity trend chart shows that these pressures are not temporary. Obesity rises steadily across every region from 2017 to 2022, suggesting slow, structural drivers rather than short-term shocks. Baseline levels differ by region, but the direction is consistently upward.

Overall, our hypothesis is only partially supported: higher wealth often correlates with higher BMI, but geography, affordability, and policy help determine how strong that relationship becomes. Understanding these interacting forces matters because it shifts the solution from individual choice to system design—making healthy diets not only possible, but realistically accessible.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
