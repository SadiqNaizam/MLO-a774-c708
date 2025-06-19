import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OSFeatureCard from '@/components/OSFeatureCard';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Code, History, ListChecks, Terminal, Brain, AlertTriangle, DraftingCompass } from 'lucide-react';

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

// Mock data structure - in a real app, this would come from a backend or service
const osDetailsData: any = {
  "linux": {
    name: "Linux",
    history: [
      { title: "Early 90s: The Genesis", content: "Linus Torvalds started development on the Linux kernel as a hobby project." },
      { title: "Mid 90s: GNU Integration", content: "Combined with GNU Project components, Linux became a fully functional free operating system." },
      { title: "2000s-Present: Widespread Adoption", content: "Linux powers servers, embedded systems, Android, and is a popular desktop OS." }
    ],
    features: [
      { title: "Open Source", description: "Kernel and most software are free and open source.", icon: <Code />, details: ["Community-driven development", "Modifiable source code"] },
      { title: "Multi-User & Multitasking", description: "Supports multiple users and concurrent processes efficiently.", icon: <ListChecks />, details: ["Robust permission system", "Preemptive multitasking"] },
      { title: "Command Line Interface (CLI)", description: "Powerful CLI (Bash, Zsh, etc.) for system administration and automation.", icon: <Terminal />, details: ["Scripting capabilities", "Remote access via SSH"] },
      { title: "Portability", description: "Runs on a wide range of hardware, from supercomputers to embedded devices.", details: ["ARM, x86, PowerPC support"] },
    ],
    architecture: "Monolithic kernel with modular design. Supports various file systems (ext4, Btrfs, XFS).",
    versions: "Numerous distributions (e.g., Ubuntu, Fedora, Debian, Arch Linux) cater to different needs.",
    cliExample: "sudo apt update && sudo apt upgrade\nls -la /home\npwd",
    pros: ["Highly customizable", "Secure and stable", "Strong community support", "Free of cost"],
    cons: ["Steeper learning curve for some", "Software compatibility can be an issue for proprietary apps", "Hardware compatibility varies"]
  },
  "macos": {
    name: "macOS",
    history: [
        { title: "1984: Classic Mac OS", content: "Introduced with the first Macintosh, pioneering graphical user interfaces." },
        { title: "2001: Mac OS X", content: "Unix-based (Darwin), merging stability with ease of use. Major architectural shift." },
        { title: "2010s-Present: macOS Branding", content: "Annual releases, focus on ecosystem integration (iOS, iCloud)." }
    ],
    features: [
      { title: "User Interface (Aqua)", description: "Known for its polished and intuitive graphical user interface.", icon: <Brain />, details: ["Consistent design language", "Accessibility features"] },
      { title: "Unix-based Core (Darwin)", description: "Robust and secure foundation with a powerful command line.", icon: <Terminal />, details: ["POSIX compliant", "Access to Unix utilities"] },
      { title: "Ecosystem Integration", description: "Seamless integration with Apple hardware and services (iCloud, Handoff).", icon: <ListChecks />, details: ["AirDrop, Continuity Camera", "Apple Silicon optimization"] },
    ],
    architecture: "Hybrid kernel (XNU). Layered architecture including Core Foundation, Application Services, and Aqua.",
    versions: "Annual named releases (e.g., Monterey, Ventura, Sonoma).",
    cliExample: "ls -l /Applications\ntop\ncat /etc/hosts",
    pros: ["Excellent UI/UX", "Strong performance on Apple hardware", "Good for creative professionals", "Relatively secure"],
    cons: ["Expensive hardware", "Limited hardware customization", "More restrictive ecosystem than Linux/Windows"]
  },
  "ms-dos": {
    name: "MS-DOS",
    history: [
        { title: "1981: Acquisition & Release", content: "Microsoft acquired 86-DOS, rebranded it as MS-DOS, and licensed it to IBM for the first IBM PC." },
        { title: "1980s: Dominance", content: "Became the dominant operating system for IBM PC compatibles." },
        { title: "1990s: Windows Era", content: "Gradually superseded by graphical environments like Windows 3.x and then Windows 95." }
    ],
    features: [
      { title: "Command-Line Interface", description: "Primarily a text-based interface using commands like DIR, COPY, DEL.", icon: <Terminal />, details: ["Batch file scripting (.BAT)", "Simple program execution"] },
      { title: "Single-Tasking", description: "Could only run one program at a time effectively.", icon: <AlertTriangle />, details: ["No memory protection between processes"] },
      { title: "File System (FAT)", description: "Used FAT12/FAT16 file systems with limitations on file/partition sizes.", icon: <ListChecks />, details: ["8.3 filename convention"] },
    ],
    architecture: "16-bit operating system. Real mode execution. Direct hardware access by programs was common.",
    versions: "Versions 1.0 through 6.22 were major releases. Later integrated into early Windows versions.",
    cliExample: "DIR C:\\DOS\nCOPY A:\\CONFIG.SYS C:\\\nFORMAT A: /S",
    pros: ["Simple and lightweight", "Low resource requirements", "Direct hardware control possible"],
    cons: ["No multitasking/multiuser", "Limited memory management (640KB barrier)", "No built-in networking (required third-party software)", "Prone to crashes"]
  }
};


const OSDetailPage: React.FC = () => {
  const { osName } = useParams<{ osName: string }>();
  const [osData, setOsData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`OSDetailPage loaded for: ${osName}`);
    if (osName && osDetailsData[osName.toLowerCase()]) {
      setOsData(osDetailsData[osName.toLowerCase()]);
    } else {
      // Handle OS not found, perhaps redirect to a 404 page or show a message
      console.error(`OS data not found for: ${osName}`);
      navigate('/not-found'); // Assuming a NotFound page exists
    }
  }, [osName, navigate]);

  if (!osData) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageNavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Loading OS details...</p>
        </main>
      </div>
    );
  }

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
              <BreadcrumbPage>{osData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{osData.name}</h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive overview of {osData.name}.
          </p>
        </header>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="cli">CLI/GUI</TabsTrigger>
            <TabsTrigger value="pros_cons">Pros & Cons</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader><CardTitle>Historical Milestones</CardTitle></CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <Accordion type="single" collapsible className="w-full">
                    {osData.history.map((item: any, index: number) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader><CardTitle>Core Features</CardTitle></CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {osData.features.map((feature: any, index: number) => (
                      <OSFeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        details={feature.details}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture">
             <Card>
              <CardHeader><CardTitle>System Architecture & Versions</CardTitle></CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4 space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Architecture Overview</h3>
                        <p className="text-muted-foreground">{osData.architecture}</p>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Key Versions / Distributions</h3>
                        <p className="text-muted-foreground">{osData.versions}</p>
                    </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cli">
            <Card>
                <CardHeader><CardTitle>Command-Line Interface (CLI) / GUI Insights</CardTitle></CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px] pr-4 space-y-4">
                        <p className="text-muted-foreground mb-2">Example CLI commands or GUI highlights:</p>
                        <Textarea
                            readOnly
                            value={osData.cliExample || "No CLI examples available for this OS."}
                            className="font-mono bg-gray-900 text-green-400 text-sm p-4 rounded-md h-60"
                            rows={10}
                        />
                        {osName === 'macos' && <img src="https://developer.apple.com/design/human-interface-guidelines/images/foundations-macos-windows_2x.png" alt="macOS GUI example" className="mt-4 rounded shadow-md"/> }
                        {osName === 'linux' && <img src="https://assets.ubuntu.com/v1/4c056885-lightdm.png" alt="Linux GUI example (Ubuntu)" className="mt-4 rounded shadow-md"/> }
                    </ScrollArea>
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pros_cons">
            <Card>
                <CardHeader><CardTitle>Pros & Cons</CardTitle></CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-xl text-green-600 mb-2">Pros</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {osData.pros.map((pro: string, index: number) => <li key={`pro-${index}`}>{pro}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl text-red-600 mb-2">Cons</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {osData.cons.map((con: string, index: number) => <li key={`con-${index}`}>{con}</li>)}
                                </ul>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Separator className="my-8" />
        <div className="text-center">
            <Textarea placeholder={`Any specific notes or questions about ${osData.name}?`} className="max-w-lg mx-auto" />
            <Button className="mt-4">Submit Note</Button>
        </div>
      </main>
      <footer className="text-center py-6 border-t text-muted-foreground">
        © {new Date().getFullYear()} OS Archives. All rights reserved.
      </footer>
    </div>
  );
};

export default OSDetailPage;