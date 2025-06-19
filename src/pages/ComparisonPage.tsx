import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";
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

const comparisonData = [
  { feature: "Primary Use Case", msDos: "Early PCs, command-line tasks", linux: "Servers, embedded, desktop, cloud", macOS: "Desktop, creative professionals", android: "Smartphones, tablets, TVs, wearables" },
  { feature: "Kernel Type", msDos: "Monolithic (simple)", linux: "Monolithic (modular)", macOS: "Hybrid (XNU)", android: "Linux (modified monolithic)" },
  { feature: "License", msDos: "Proprietary", linux: "Open Source (GPL)", macOS: "Proprietary (Darwin core is open)", android: "Open Source (AOSP - Apache/GPL), GMS is proprietary" },
  { feature: "Multitasking", msDos: "No (single-tasking)", linux: "Yes (preemptive)", macOS: "Yes (preemptive)", android: "Yes (managed lifecycle)" },
  { feature: "Multi-User", msDos: "No", linux: "Yes", macOS: "Yes", android: "Yes (on most devices/profiles)" },
  { feature: "GUI", msDos: "Primarily CLI (Windows shell later)", linux: "Various (GNOME, KDE, XFCE, etc.)", macOS: "Aqua (proprietary)", android: "Material Design (stock), various OEM skins" },
  { feature: "Command Line", msDos: "COMMAND.COM", linux: "Bash, Zsh, etc.", macOS: "Terminal (Bash/Zsh)", android: "ADB shell (via developer tools)" },
  { feature: "Package Management", msDos: "N/A (manual install)", linux: "APT, YUM, Pacman, etc.", macOS: "App Store, Homebrew", android: "Google Play Store, F-Droid, manual (APK)" },
  { feature: "Security Model", msDos: "Minimal", linux: "Robust (permissions, SELinux)", macOS: "Robust (permissions, Gatekeeper)", android: "Permissions, sandboxing, verified boot, Play Protect" },
  { feature: "Hardware Support", msDos: "Limited (legacy IBM PC)", linux: "Very Broad", macOS: "Apple Hardware Only", android: "Extremely Broad (various manufacturers)" },
  { feature: "Cost", msDos: "Bundled (historical)", linux: "Free (most distributions)", macOS: "Bundled with Apple hardware", android: "Free (AOSP), GMS licensing for manufacturers" },
  { feature: "Customizability", msDos: "Low", linux: "Very High", macOS: "Moderate", android: "Very High (AOSP), Moderate to High (OEMs)" },
];

const ComparisonPage: React.FC = () => {
  console.log('ComparisonPage loaded');
  const [filter, setFilter] = useState<string>("all");

  const filteredData = comparisonData.filter(item => {
    if (filter === "all") return true;
    return item.feature.toLowerCase().includes(filter.toLowerCase()) ||
           (item.msDos && item.msDos.toLowerCase().includes(filter.toLowerCase())) ||
           (item.linux && item.linux.toLowerCase().includes(filter.toLowerCase())) ||
           (item.macOS && item.macOS.toLowerCase().includes(filter.toLowerCase())) ||
           (item.android && item.android.toLowerCase().includes(filter.toLowerCase()));
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
              <BreadcrumbPage>OS Comparison</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Operating System Comparison</h1>
          <p className="text-lg text-muted-foreground">
            A side-by-side look at MS-DOS, Linux, macOS, and Android.
          </p>
        </header>
        
        <div className="mb-6">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Filter by keyword..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter Criteria</SelectLabel>
                <SelectItem value="all">All Features</SelectItem>
                <SelectItem value="kernel">Kernel</SelectItem>
                <SelectItem value="gui">GUI</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="license">License</SelectItem>
                <SelectItem value="open source">Open Source</SelectItem>
                <SelectItem value="proprietary">Proprietary</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[600px] border rounded-md">
          <Table>
            <TableCaption>Feature comparison of MS-DOS, Linux, macOS, and Android.</TableCaption>
            <TableHeader className="sticky top-0 bg-slate-100 z-10">
              <TableRow>
                <TableHead className="w-[200px] min-w-[200px]">Feature</TableHead>
                <TableHead>MS-DOS</TableHead>
                <TableHead>Linux</TableHead>
                <TableHead>macOS</TableHead>
                <TableHead>Android</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  <TableCell>{row.msDos}</TableCell>
                  <TableCell>{row.linux}</TableCell>
                  <TableCell>{row.macOS}</TableCell>
                  <TableCell>{row.android}</TableCell>
                </TableRow>
              ))}\
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No features match your filter criteria.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <Separator className="my-12" />

        <section className="py-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Comparison Notes</h2>
          <Textarea 
            placeholder="Add your personal notes or observations about the OS comparison..." 
            rows={4} 
            className="max-w-xl mx-auto" 
          />
           {/* <Button className="mt-4 mx-auto block">Save Notes</Button> Functionality not implemented */}
        </section>
      </main>
      <footer className="text-center py-6 border-t text-muted-foreground">
        © {new Date().getFullYear()} OS Archives. All rights reserved.
      </footer>
    </div>
  );
};

export default ComparisonPage;