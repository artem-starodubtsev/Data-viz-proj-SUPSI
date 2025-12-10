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
        title: "Caribbean",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    },
    {
        title: "South America",
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
    },
    {
        title: "North America",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    },
    {
        title: "Central America",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    },
    {
        title: "Europe/Asia",
        description:
            "PUT\nSOME\nTEXT\nHERE!",
    }
];

// Map React pages -> Dash regions
// Adjust this to whatever logic you want.
const pageToRegion = [
    "Europe",
    "Africa",
    "Caribbean",
    "South America",
    "Asia",
    "Oceania",
    "North America",
    "Central America",
    "Europe/Asia"
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
                <div className="mx-auto max-w-[65%] animate-fade-in [animation-delay:100ms]">
                    <ReportSection>
                        <p className="font-body leading-relaxed text-card-foreground">
                            BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH
                            BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH
                            BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH
                            BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH
                            BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH
                            BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH
                        </p>
                    </ReportSection>
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
                    <div className="flex justify-center">
            <span
                className="rounded-b-lg border border-t-0 border-border bg-secondary px-6 py-2.5 font-body text-sm text-secondary-foreground shadow-soft">
              HERE WE CAN SEE BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH-BLAH
            </span>
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
            </div>
        </main>
    );
};

export default Index;
