import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import TimelineEventNode from '@/components/TimelineEventNode';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DraftingCompass } from 'lucide-react';

const PageNavigationMenu = () => (
  <NavigationMenu className="py-4 border-b">
    <NavigationMenuList className="container mx-auto flex justify-between items-center">
      <NavigationMenuItem>
        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
         <DraftingCompass className="mr-2 h-7 w-7" /> OS Archives
        </Link>
      </NavigationMenuItem>
      <div className="flex items-center space-x-2">
        <NavigationMenuItem>
          <Link to="/os/linux">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Linux</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/os/macos">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>macOS</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/os/ms-dos">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>MS-DOS</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/os/blackberry">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>BlackBerry</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/os/android">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Android</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/comparison">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Compare</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/timeline">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Timeline</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/resources">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Resources</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </div>
    </NavigationMenuList>
  </NavigationMenu>
);

const timelineEvents = [
  { date: "1969", title: "Unix Conception", description: "Ken Thompson, Dennis Ritchie, and others at Bell Labs begin work on Unix.", isMajorEvent: true },
  { date: "1981", title: "MS-DOS 1.0 Released", description: "Microsoft releases MS-DOS for the IBM PC, based on QDOS.", isMajorEvent: true },
  { date: "1983", title: "GNU Project Launched", description: "Richard Stallman announces the GNU Project to create a free Unix-like OS.", isMajorEvent: true },
  { date: "1984", title: "Macintosh OS (Classic) Released", description: "Apple launches the Macintosh with a groundbreaking GUI.", isMajorEvent: true },
  { date: "1984", title: "Research In Motion (RIM) Founded", description: "Mike Lazaridis and Douglas Fregin found RIM, the company behind BlackBerry.", isMajorEvent: false },
  { date: "1985", title: "Windows 1.0 Released", description: "Microsoft's first attempt at a graphical operating environment for MS-DOS.", isMajorEvent: false },
  { date: "1991", title: "Linux Kernel 0.01 Released", description: "Linus Torvalds announces the first version of the Linux kernel.", isMajorEvent: true },
  { date: "1995", title: "Windows 95 Released", description: "A major step for Microsoft, integrating MS-DOS more closely with a GUI.", isMajorEvent: true },
  { date: "1999", title: "First BlackBerry Pager (850) Released", description: "RIM launches the BlackBerry 850, a two-way pager that marks the beginning of the BlackBerry era.", isMajorEvent: true },
  { date: "2000", title: "Mac OS X Public Beta", description: "Apple releases a public beta of its NeXTSTEP-based OS, a radical departure from Classic Mac OS.", isMajorEvent: true },
  { date: "2001", title: "Mac OS X 10.0 (Cheetah) Released", description: "The first official release of Mac OS X.", isMajorEvent: false },
  { date: "2002", title: "First BlackBerry Smartphone", description: "RIM releases the BlackBerry 5810, its first device with integrated voice capabilities (though requiring a headset).", isMajorEvent: true },
  { date: "2003", title: "Android Inc. Founded", description: "Android Inc. was founded by Andy Rubin, Rich Miner, Nick Sears, and Chris White.", isMajorEvent: false },
  { date: "2005", title: "Google Acquires Android Inc.", description: "Google acquired Android Inc. to enter the mobile OS market.", isMajorEvent: true },
  { date: "2007", title: "iOS (originally iPhone OS) Introduced", description: "Based on Mac OS X, it revolutionized mobile operating systems. (Related)", isMajorEvent: true },
  { date: "2008", title: "Android 1.0 Released", description: "Google releases Android with the T-Mobile G1 (HTC Dream), a Linux-kernel-based mobile OS.", isMajorEvent: true },
  { date: "2013", title: "BlackBerry 10 OS Launched", description: "RIM (now BlackBerry) launches BlackBerry 10, a new QNX-based platform, with devices like the Z10 and Q10.", isMajorEvent: true },
  { date: "2016", title: "macOS Sierra Released", description: "Mac OS X is rebranded as macOS.", isMajorEvent: false },
  { date: "2016", title: "BlackBerry Exits Hardware Manufacturing", description: "BlackBerry announces it will cease internal hardware development and focus on software and licensing its brand.", isMajorEvent: true },
  { date: "2020", title: "Apple Silicon Transition", description: "Apple begins transitioning Macs from Intel processors to its own ARM-based chips, impacting macOS.", isMajorEvent: true },
];


const TimelinePage: React.FC = () => {
  console.log('TimelinePage loaded');
  // Sort events by date, ensuring numeric comparison for years
  const sortedTimelineEvents = [...timelineEvents].sort((a, b) => {
    const yearA = parseInt(a.date, 10);
    const yearB = parseInt(b.date, 10);
    return yearA - yearB;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageNavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>OS Development Timeline</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Operating System Timeline</h1>
          <p className="text-lg text-muted-foreground">
            Key milestones in the history of MS-DOS, Linux, macOS, BlackBerry OS, Android and related systems.
          </p>
        </header>

        <ScrollArea className="h-[70vh] p-1">
          <div className="relative pl-8 border-l-2 border-primary">
            {sortedTimelineEvents.map((event, index) => (
              <div key={index} className="mb-10 ml-4">
                <div className={`absolute w-4 h-4 ${event.isMajorEvent ? 'bg-primary scale-125' : 'bg-secondary'} rounded-full -left-[9px] border-2 border-background`}></div>
                <TimelineEventNode
                  date={event.date}
                  title={event.title}
                  description={event.description}
                  isMajorEvent={event.isMajorEvent}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-12" />

        <section className="py-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Reflections on History</h2>
          <Textarea 
            placeholder="What historical event do you find most significant? Share your thoughts..." 
            rows={4} 
            className="max-w-xl mx-auto"
          />
           {/* <Button className="mt-4 mx-auto block">Submit Reflection</Button> Functionality not implemented */}
        </section>
      </main>
      <footer className="text-center py-6 border-t text-muted-foreground">
        © {new Date().getFullYear()} OS Archives. All rights reserved.
      </footer>
    </div>
  );
};

export default TimelinePage;