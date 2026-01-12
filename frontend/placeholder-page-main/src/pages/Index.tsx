import {useEffect, useRef, useState, useCallback} from "react";
import heroImage from "@/assets/hero-food.jpg";
import bgIntroduction from "@/assets/bg-introduction.jpg";
import bgWealthBmi from "@/assets/bg-wealth-bmi.jpg";
import bgRegional from "@/assets/bg-regional.jpg";
import bgObesity from "@/assets/bg-obesity.jpg";
import bgConclusion from "@/assets/bg-conclusion.jpg";
import Slide from "@/components/Slide";
import SlideIndicator from "@/components/SlideIndicator";
import {
  DollarSign,
  Heart,
  MapPin,
  AlertTriangle,
  ChevronDown,
  Download,
} from "lucide-react";

const slideLabels = [
  "Title",
  "Introduction",
  "Wealth vs BMI",
  "Regional Overview",
  "Obesity Trend",
  "Conclusion",
];

const regionData = [
  {
    title: "Europe",
    subtitle: "Stability Zone",
    color: "hsl(210, 60%, 50%)",
    content: [
      "Healthy diets are broadly affordable across Europe, with unaffordability around ~5%.",
      "CAP support and relatively short, resilient supply chains help stabilize prices for fresh foods.",
      "Costs are rising in parts of Eastern Europe as geopolitical instability disrupts markets.",
    ],
  },
  {
    title: "Africa",
    subtitle: "Affordability Crisis",
    color: "hsl(0, 65%, 55%)",
    content: [
      "Over 70% are unable to afford a nutrient-adequate diet—the highest burden globally.",
      "Supply chain inefficiencies and conflict raise prices and reduce reliable access.",
      "Diets rely heavily on starchy staples; nutrient-dense foods are far more expensive.",
    ],
  },
  {
    title: "America",
    subtitle: "Inflation Hotspot",
    color: "hsl(180, 50%, 45%)",
    content: [
      "This region often records some of the highest average costs for a healthy diet.",
      "Caribbean economies are frequently import-dependent, pushing up prices for perishables.",
      "High costs are driven by inflation + trade structure, not a lack of agriculture.",
    ],
  },
  {
    title: "Asia",
    subtitle: "Largest Impact",
    color: "hsl(280, 50%, 55%)",
    content: [
      "Asia has the largest absolute number of people unable to afford a healthy diet (~1.35 billion).",
      "East Asia's rapid growth increases demand and prices for protein and fresh produce.",
      "Affordability varies sharply by sub-region and by urban vs. rural access.",
    ],
  },
  {
    title: "Oceania",
    subtitle: "Logistics Split",
    color: "hsl(35, 80%, 50%)",
    content: [
      "Regional averages are strongly influenced by Australia and New Zealand—major food producers.",
      "In Pacific Island nations, imported processed foods are cheap while fresh produce is expensive.",
      "Climate shocks and shipping disruptions disproportionately raise the cost of fresh foods.",
    ],
  },
];

const SlideBackground = ({image, className = ""}: { image: string; className?: string }) => (
  <>
    <div className={`absolute inset-0 ${className}`}>
      <img src={image} alt="" className="w-full h-full object-cover blur-sm scale-105"/>
    </div>
    <div className="absolute inset-0 bg-background/60"/>
  </>
);

const DownloadButton = () => (
  <button
    className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
    <Download className="w-3.5 h-3.5"/>
    <span>dataset</span>
  </button>
);

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeRegion, setActiveRegion] = useState(0);

  const dashMapRef = useRef<HTMLIFrameElement | null>(null);

  const sendRegion = useCallback((regionIndex: number) => {
    const region = regionData[regionIndex]?.title ?? "World";
    dashMapRef.current?.contentWindow?.postMessage({type: "SET_REGION", region}, "*");
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback((index: number) => {
    const slides = containerRef.current?.querySelectorAll(".snap-slide");
    if (slides && slides[index]) slides[index].scrollIntoView({behavior: "smooth"});
  }, []);

  useEffect(() => {
    sendRegion(activeRegion);
  }, [activeRegion, sendRegion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slides = container.querySelectorAll(".snap-slide");
      const scrollTop = container.scrollTop;
      const slideHeight = container.clientHeight;

      slides.forEach((slide, index) => {
        const slideTop = (slide as HTMLElement).offsetTop;
        if (Math.abs(scrollTop - slideTop) < slideHeight / 2) setCurrentSlide(index);
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data: any = event?.data;
      if (!data || typeof data !== "object") return;

      const type = data.type;
      const region = data.region;

      if ((type === "REGION_SELECTED" || type === "SET_REGION") && typeof region === "string") {
        const idx = regionData.findIndex((r) => r.title === region);
        if (idx >= 0) setActiveRegion((prev) => (prev === idx ? prev : idx));
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSlide(Math.min(currentSlide + 1, slideLabels.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSlide(Math.max(currentSlide - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, scrollToSlide]);

  return (
    <div ref={containerRef} className="snap-container">
      <SlideIndicator
        totalSlides={slideLabels.length}
        currentSlide={currentSlide}
        onSlideChange={scrollToSlide}
        labels={slideLabels}
      />

      {/* Slide 1: Title */}
      <Slide className="bg-gradient-to-br from-[hsl(145,50%,25%)] to-[hsl(180,40%,20%)]">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,10%)/80] via-transparent to-transparent"/>

        <div className="relative z-10 text-center px-6 max-w-7xl">
          <span className="inline-block font-body text-sm md:text-base tracking-widest uppercase text-primary-foreground/70 mb-6 animate-slide-up">
            A Visual Story of Global Nutrition
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight mb-8 animate-slide-up delay-100">
            Where you live determines what you eat
          </h1>

          <p className="font-body text-xl md:text-2xl text-primary-foreground/80 max-w-4xl mx-auto mb-12 animate-slide-up delay-200">
            Exploring how economic wealth and geography shape nutrition outcomes around the world
          </p>

          <button
            onClick={() => scrollToSlide(1)}
            className="animate-pulse-soft text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            aria-label="Scroll to next slide"
          >
            <ChevronDown className="w-12 h-12"/>
          </button>
        </div>
      </Slide>

      {/* Slide 2: Introduction */}
      <Slide className="bg-background">
        <SlideBackground image={bgIntroduction}/>
        <div className="relative z-10 container max-w-screen-2xl px-6 h-full min-h-0 flex flex-col justify-center py-[clamp(2rem,6vh,4rem)]">
          <div className="text-center mb-[clamp(1.5rem,4vh,2.5rem)] animate-slide-up">
            <h2 className="font-display text-5xl md:text-6xl font-semibold text-foreground mb-6">
              Introduction
            </h2>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-4xl mx-auto">
              While food is a universal biological necessity, what ends up on our plates is heavily
              dictated by two powerful external forces:{" "}
              <span className="font-medium text-foreground">economic wealth</span> and{" "}
              <span className="font-medium text-foreground">geography</span>. This project investigates
              global nutrition trends with the aim to raise awareness on the topic.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-slide-up delay-200">
            <button
              onClick={() => scrollToSlide(2)}
              className="bg-card/90 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-6 lg:p-10 text-center hover:scale-[1.02] transition-transform cursor-pointer text-left"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <DollarSign className="w-8 h-8 text-primary"/>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 text-center">
                The Economic Factor
              </h3>
              <p className="font-body text-muted-foreground text-center">
                As nations grow wealthier, diets shift from grain-based to those higher in fats,
                sugars, and animal proteins.
              </p>
            </button>

            <button
              onClick={() => scrollToSlide(3)}
              className="bg-card/90 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-6 lg:p-10 text-center hover:scale-[1.02] transition-transform cursor-pointer text-left"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-8 h-8 text-accent"/>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 text-center">
                The Geographical Factor
              </h3>
              <p className="font-body text-muted-foreground text-center">
                Climate and regional agriculture limit or expand dietary choices, while globalization
                blurs traditional lines.
              </p>
            </button>

            <button
              onClick={() => scrollToSlide(4)}
              className="bg-card/90 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-6 lg:p-10 text-center hover:scale-[1.02] transition-transform cursor-pointer text-left"
            >
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5">
                <Heart className="w-8 h-8 text-destructive"/>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 text-center">
                The Health Impact
              </h3>
              <p className="font-body text-muted-foreground text-center">
                Correlating socio-economic inputs with health outcomes—obesity vs. undernutrition.
              </p>
            </button>
          </div>
        </div>
      </Slide>

      {/* Slide 3: Wealth vs BMI */}
      <Slide className="bg-secondary/30">
        <SlideBackground image={bgWealthBmi}/>
        <div className="relative z-10 container max-w-screen-2xl px-6 h-full min-h-0 flex flex-col py-6">
          <div className="text-center mb-4">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 animate-slide-up">
              Wealth vs. BMI
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto animate-slide-up delay-100">
              GDP per capita plotted against mean BMI reveals the complex relationship between national
              wealth and population health.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1 min-h-0 lg:self-stretch bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-4 lg:p-8 animate-fade-in-scale delay-200 flex flex-col">
              <div className="relative flex-1 min-h-0 bg-muted/30 rounded-lg overflow-hidden aspect-[4/3] lg:aspect-[16/9] max-h-full">
                <iframe
                  src="http://127.0.0.1:8050/app1/"
                  className="h-full w-full"
                  allowFullScreen
                />
                <DownloadButton/>
              </div>
            </div>

            <div className="w-full lg:w-96 shrink-0 animate-slide-up delay-150 lg:self-start">
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-4 lg:p-8">
                <h3 className="font-display text-xl font-semibold text-foreground">Key insights</h3>

                <div className="mt-4 space-y-4">
                  {[
                    {title: "Overall Pattern", desc: "Lower GDP countries cluster at lower BMI values"},
                    {title: "High Income Spread", desc: "Wealthy nations show wide BMI variation"},
                    {title: "Outliers", desc: "Switzerland (low BMI) vs USA (high BMI)"},
                    {title: "Regional Clustering", desc: "Geography shapes BMI bands at similar incomes"},
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border">
                      <h4 className="font-body font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 4: Regional Overview */}
      <Slide className="bg-background">
        <SlideBackground image={bgRegional}/>
        <div className="relative z-10 container max-w-screen-2xl px-6 h-full min-h-0 flex flex-col py-6">
          <div className="text-center mb-4">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 animate-slide-up">
              Regional Overview
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto animate-slide-up delay-100">
              Each region faces unique challenges in diet affordability and nutrition access.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="order-1 lg:order-2 w-full lg:w-96 shrink-0 flex flex-col gap-4 lg:self-start">
              <div className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap">
                {regionData.map((region, index) => (
                  <button
                    key={region.title}
                    onClick={() => setActiveRegion(index)}
                    className={`px-4 py-3 rounded-lg font-body text-sm font-medium transition-all duration-300 text-left ${
                      activeRegion === index
                        ? "bg-card/95 shadow-soft border-2"
                        : "bg-muted/50 hover:bg-muted/70 border-2 border-transparent"
                    }`}
                    style={{borderColor: activeRegion === index ? region.color : "transparent"}}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{backgroundColor: region.color}} />
                      <span className="text-foreground">{region.title}</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* ✅ FIX: tight details card (no flex-1) */}
              <div
                key={activeRegion}
                className="p-6 lg:p-8 rounded-2xl bg-card/95 backdrop-blur-sm border border-border shadow-elevated animate-fade-in-scale w-full max-h-[55vh] overflow-auto"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1 h-12 rounded-full" style={{backgroundColor: regionData[activeRegion].color}} />
                  <div>
                    <span
                      className="inline-block text-xs font-body font-medium tracking-wider uppercase mb-1 px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${regionData[activeRegion].color}20`,
                        color: regionData[activeRegion].color,
                      }}
                    >
                      {regionData[activeRegion].subtitle}
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-card-foreground">
                      {regionData[activeRegion].title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {regionData[activeRegion].content.map((paragraph, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0"/>
                      <p className="font-body text-base leading-relaxed text-muted-foreground">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="order-2 lg:order-1 flex-1 min-h-0">
              <div className="h-full bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-4 lg:p-8 animate-fade-in-scale delay-200 flex flex-col min-h-0">
                <div className="relative flex-1 min-h-0 bg-muted/30 rounded-lg overflow-hidden">
                  <iframe
                    ref={dashMapRef}
                    src="http://127.0.0.1:8050/app2/"
                    className="h-full w-full"
                    allowFullScreen
                    onLoad={() => sendRegion(activeRegion)}
                  />
                  <DownloadButton/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 5: Obesity Trends */}
      <Slide className="bg-secondary/30">
        <SlideBackground image={bgObesity}/>
        <div className="relative z-10 container max-w-screen-2xl px-6 h-full flex flex-col py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="animate-slide-up">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
                Obesity Trend
              </h2>
              <span className="font-body text-lg text-muted-foreground">2017 – 2022</span>
            </div>
          </div>

          {/* ✅ tight sidebar behavior like Wealth vs BMI */}
          <div className="flex-1 flex gap-6 min-h-0 items-start">
            <div className="flex-1 self-stretch bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-4 lg:p-8 animate-slide-in-left flex flex-col">
              <div className="relative flex-1 bg-muted/30 rounded-lg overflow-hidden aspect-[4/3] lg:aspect-square max-h-full">
                <iframe
                  src="http://127.0.0.1:8050/app3/"
                  className="h-full w-full"
                  allowFullScreen
                />
                <DownloadButton/>
              </div>
            </div>

            <div className="w-96 shrink-0 animate-slide-up delay-100 self-start">
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-elevated p-6 lg:p-8">
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  Across every region, obesity rises steadily. The important feature is how{" "}
                  <span className="font-medium text-foreground">"smooth"</span> the lines are: no dramatic
                  spikes or reversals, just a consistent upward drift.
                </p>

                <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
                  That kind of near-linear growth points to long-term, structural drivers—food
                  environments, urban lifestyles, and gradual dietary change—rather than short, one-off
                  events.
                </p>

                <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5"/>
                    <p className="font-body text-sm text-muted-foreground">
                      Even regions with affordable healthy diets continue to climb, showing that wealth
                      doesn't automatically protect against obesity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 6: Conclusion */}
      <Slide className="bg-background">
        <SlideBackground image={bgConclusion}/>
        <div className="relative z-10 container max-w-screen-2xl px-6 h-full min-h-0 flex flex-col justify-center py-[clamp(1.5rem,4vh,3rem)]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 lg:space-y-8 animate-slide-up">
              <div>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6">
                  Conclusion
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full"/>
              </div>

              <div className="p-6 lg:p-10 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-accent/15 border border-primary/20">
                <p className="font-display text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  Understanding these interacting forces matters because it shifts the solution from{" "}
                  <span className="text-primary">individual choice</span> to{" "}
                  <span className="text-primary">system design</span>—making healthy diets not only
                  possible, but realistically accessible.
                </p>
              </div>
            </div>

            <div className="space-y-4 animate-slide-up delay-200">
              <div className="bg-card/90 backdrop-blur-sm rounded-xl border border-border shadow-soft p-6 lg:p-8">
                <div className="flex gap-4">
                  <div className="w-1 rounded-full bg-primary shrink-0"/>
                  <p className="font-body text-lg leading-relaxed text-muted-foreground">
                    Across our visualizations, one message stays consistent:{" "}
                    <span className="font-medium text-foreground">nutrition outcomes are shaped by both wealth and place</span>
                    , but neither factor works alone.
                  </p>
                </div>
              </div>

              <div className="bg-card/90 backdrop-blur-sm rounded-xl border border-border shadow-soft p-6 lg:p-8">
                <div className="flex gap-4">
                  <div className="w-1 rounded-full bg-accent shrink-0"/>
                  <p className="font-body text-lg leading-relaxed text-muted-foreground">
                    The BMI vs GDP scatter shows a broad upward relationship—countries with higher GDP
                    per capita tend to sit at higher average BMI. At the same time, the spread among
                    wealthy countries is large, which tells us that economic growth does not
                    automatically "lock in" a single health outcome.
                  </p>
                </div>
              </div>

              <div className="bg-card/90 backdrop-blur-sm rounded-xl border border-border shadow-soft p-6 lg:p-8">
                <div className="flex gap-4">
                  <div className="w-1 rounded-full bg-muted-foreground/40 shrink-0"/>
                  <p className="font-body text-lg leading-relaxed text-muted-foreground">
                    The affordability maps explain part of that variation. Some regions face an
                    affordability crisis where nutrient-dense foods are priced out relative to
                    income. Other regions have generally affordable healthy diets, yet still struggle
                    because ultra-processed foods remain cheaper and more convenient.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Index;
