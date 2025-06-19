import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import ResourceLinkCard from '@/components/ResourceLinkCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Search, DraftingCompass } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const allResources = [
  { title: "The Linux Kernel Archives", description: "Official source for the Linux kernel.", linkUrl: "https://www.kernel.org/", category: "Linux" },
  { title: "Ubuntu Official Documentation", description: "Guides, tutorials, and release notes for Ubuntu Linux.", linkUrl: "https://help.ubuntu.com/", category: "Linux" },
  { title: "ArchWiki", description: "Comprehensive community-maintained wiki for Arch Linux.", linkUrl: "https://wiki.archlinux.org/", category: "Linux" },
  { title: "DistroWatch", description: "Information and news about Linux distributions.", linkUrl: "https://distrowatch.com/", category: "Linux" },
  { title: "Apple Developer - macOS", description: "Official macOS development resources from Apple.", linkUrl: "https://developer.apple.com/macos/", category: "macOS" },
  { title: "MacRumors Forums", description: "Popular community forum for Apple products, including macOS.", linkUrl: "https://forums.macrumors.com/", category: "macOS" },
  { title: "Inside Macintosh (Vintage)", description: "Historical documentation for Classic Mac OS.", linkUrl: "http://vintagemacmuseum.com/docs/insidemac/", category: "macOS" },
  { title: "PCjs Machines (MS-DOS Emulation)", description: "Emulate MS-DOS and other vintage systems in your browser.", linkUrl: "https://www.pcjs.org/", category: "MS-DOS" },
  { title: "MS-DOS Commands Reference", description: "A quick reference for common MS-DOS commands.", linkUrl: "https://www.computerhope.com/msdos.htm", category: "MS-DOS" },
  { title: "Android Developers Official Site", description: "Official documentation, tools, and guides for Android development.", linkUrl: "https://developer.android.com/", category: "Android" },
  { title: "XDA Developers Forums", description: "Largest Android community for news, reviews, and custom ROM development.", linkUrl: "https://xdaforums.com/", category: "Android" },
  { title: "AOSP - Android Open Source Project", description: "Source code and information about the Android Open Source Project.", linkUrl: "https://source.android.com/", category: "Android" },
  { title: "CrackBerry Forums", description: "The definitive community for BlackBerry users and enthusiasts.", linkUrl: "https://crackberry.com/", category: "BlackBerry" },
  { title: "BlackBerry Developer (Archived)", description: "Archived developer resources for BlackBerry OS and BlackBerry 10.", linkUrl: "https://web.archive.org/web/20201112020821/https://developer.blackberry.com/develop/", category: "BlackBerry" },
  { title: "OSDev Wiki", description: "A wiki for operating system development.", linkUrl: "https://wiki.osdev.org/", category: "General OS" },
];


const ResourcesPage: React.FC = () => {
  console.log('ResourcesPage loaded');
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = allResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (resource.category && resource.category.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

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
              <BreadcrumbPage>External Resources</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Curated Resources</h1>
          <p className="text-lg text-muted-foreground">
            Explore links to documentation, communities, and tools for various operating systems.
          </p>
        </header>

        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources by title, description, or category..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[65vh] p-1">
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <ResourceLinkCard
                  key={index}
                  title={resource.title}
                  description={resource.description}
                  linkUrl={resource.linkUrl}
                  category={resource.category}
                  linkText="Visit Site"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10">No resources found matching your search criteria.</p>
          )}
        </ScrollArea>
        
        <Separator className="my-12" />

        <section className="py-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Suggest a Resource</h2>
          <Textarea 
            placeholder="Know a great resource we missed? Paste a link or description here..." 
            rows={4} 
            className="max-w-xl mx-auto"
          />
          <div className="text-center mt-4">
            {/* <Button>Submit Suggestion</Button> Functionality not implemented */}
          </div>
        </section>
      </main>
      <footer className="text-center py-6 border-t text-muted-foreground">
        © {new Date().getFullYear()} OS Archives. All rights reserved.
      </footer>
    </div>
  );
};

export default ResourcesPage;