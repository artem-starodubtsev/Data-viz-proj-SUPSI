import {useEffect, useRef, useState} from "react";
import PageSelector from "@/components/PageSelector";
import ReportSection from "@/components/ReportSection";

const sectionContent = [
    {
        title: "Europe",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    },
    {
        title: "Africa",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    },
    {
        title: "America",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    },
    {
        title: "Asia",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    },
    {
        title: "Oceania",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    }
];

// Map React pages -> Dash regions
// Adjust this to whatever logic you want.
const pageToRegion = [
    "Europe",
    "Africa",
    "America",
    "Asia",
    "Oceania"
];

const Index = () => {
    const [activePage, setActivePage] = useState(0);

    // Ref to the app2 (map) iframe
    const dashMapRef = useRef<HTMLIFrameElement | null>(null);

    const sendRegion = (pageIndex: number) => {
        const region = pageToRegion[pageIndex] ?? "World";

        dashMapRef.current?.contentWindow?.postMessage(
            {type: "SET_REGION", region},
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
                            Report Title
                        </h1>
                    </div>
                </header>

                {/* Long Description */}
                <div className="flex justify-center px-6">
                    {/* 100% bigger overall: wider container */}
                    <div className="w-[min(1600px,96vw)] overflow-hidden rounded-2xl border bg-card shadow-card">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* bigger/taller image, same 50/50 split */}
                            <div className="relative min-h-[420px] md:min-h-[560px]">
                                <img
                                    src="/food.png"
                                    alt="Report overview"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* more space, but KEEP text sizes */}
                            <div className="flex flex-col justify-center gap-4 p-10 md:p-14">
                                <h2 className="font-display text-3xl font-semibold text-card-foreground">
                                    Overview
                                </h2>

                                <p className="font-body text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                                    Your longer description goes here...
                                    {"\n\n"}
                                    Second paragraph here...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


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
                            <div
                                className="rounded-b-2xl border border-t-0 border-border bg-card px-10 py-5 font-body text-sm text-card-foreground shadow-card whitespace-pre-line">
                                HERE WE CAN SEE
                                {"\n\n"}
                                BLAH-BLAH-BLAH...
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
                                <p
                                    className="font-body text-sm leading-relaxed text-muted-foreground animate-slide-in [animation-delay:50ms]"
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
                                Summarize the key patterns you found across the visualizations, highlight the
                                most important takeaways, and end with a short statement about why the results
                                matter.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    );
};

export default Index;
