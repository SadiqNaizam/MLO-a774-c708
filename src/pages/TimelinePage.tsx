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
  { date: "1985", title: "Windows 1.0 Released", description: "Microsoft's first attempt at a graphical operating environment for MS-DOS.", isMajorEvent: false },
  { date: "1991", title: "Linux Kernel 0.01 Released", description: "Linus Torvalds announces the first version of the Linux kernel.", isMajorEvent: true },
  { date: "1995", title: "Windows 95 Released", description: "A major step for Microsoft, integrating MS-DOS more closely with a GUI.", isMajorEvent: true },
  { date: "2000", title: "Mac OS X Public Beta", description: "Apple releases a public beta of its NeXTSTEP-based OS, a radical departure from Classic Mac OS.", isMajorEvent: true },
  { date: "2001", title: "Mac OS X 10.0 (Cheetah) Released", description: "The first official release of Mac OS X.", isMajorEvent: false },
  { date: "2007", title: "iOS (originally iPhone OS) Introduced", description: "Based on Mac OS X, it revolutionized mobile operating systems. (Related)", isMajorEvent: false },
  { date: "2008", title: "Android 1.0 Released", description: "Google releases Android, a Linux-kernel-based mobile OS. (Related)", isMajorEvent: false },
  { date: "2016", title: "macOS Sierra Released", description: "Mac OS X is rebranded as macOS.", isMajorEvent: false },
  { date: "2020", title: "Apple Silicon Transition", description: "Apple begins transitioning Macs from Intel processors to its own ARM-based chips, impacting macOS.", isMajorEvent: true },
];


const TimelinePage: React.FC = () => {
  console.log('TimelinePage loaded');
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
            Key milestones in the history of MS-DOS, Linux, macOS, and related systems.
          </p>
        </header>

        <ScrollArea className="h-[70vh] p-1">
          <div className="relative pl-8 border-l-2 border-primary">
            {timelineEvents.map((event, index) => (
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
        </section>
      </main>
      <footer className="text-center py-6 border-t text-muted-foreground">
        © {new Date().getFullYear()} OS Archives. All rights reserved.
      </footer>
    </div>
  );
};

export default TimelinePage;