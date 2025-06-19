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
import { Code, History, ListChecks, Terminal, Brain, AlertTriangle, DraftingCompass, Smartphone, LayoutGrid, Share2, Mail, MessageSquare, Shield, Type } from 'lucide-react';

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
  },
  "android": {
    name: "Android",
    history: [
      { title: "2003: Android Inc. Founded", content: "Founded by Andy Rubin, Rich Miner, Nick Sears, and Chris White." },
      { title: "2005: Google Acquires Android Inc.", content: "Google acquired Android Inc., marking its entry into the mobile OS space." },
      { title: "2007: Open Handset Alliance Formed", content: "A consortium of companies to develop open standards for mobile devices, with Android as its flagship." },
      { title: "2008: Android 1.0 Released", content: "The first commercial version of Android was released with the HTC Dream (T-Mobile G1)." },
      { title: "Present: Dominant Mobile OS", content: "Android has become the most widely used mobile operating system globally, powering billions of devices." }
    ],
    features: [
      { title: "Linux Kernel Based", description: "Built on a modified Linux kernel, providing core system services and hardware abstraction.", icon: <Code />, details: ["Open Source (AOSP)", "Hardware Abstraction Layer (HAL)"] },
      { title: "App Ecosystem", description: "Vast number of applications available via Google Play Store and other app stores/sideloading.", icon: <LayoutGrid />, details: ["APK package format", "Rich application framework"] },
      { title: "Customizable User Interface", description: "Highly customizable UI through launchers, widgets, and OEM skins (e.g., Samsung One UI, Pixel Experience).", icon: <Smartphone />, details: ["Material Design guidelines", "Extensive theming capabilities"] },
      { title: "Intent System", description: "Powerful inter-process communication mechanism facilitating app integration and task delegation.", icon: <Share2 />, details: ["Explicit and Implicit Intents", "Enables seamless user experience across apps"] },
    ],
    architecture: "Layered architecture: Linux Kernel, Hardware Abstraction Layer (HAL), Android Runtime (ART) & Native Libraries, Java API Framework, System Apps.",
    versions: "Annual dessert-themed releases (e.g., Pie, Quince Tart (Android 10), Red Velvet Cake (11), Snow Cone (12), Tiramisu (13), Upside Down Cake (14)). Also features various OEM-specific versions.",
    cliExample: "adb devices\nadb shell pm list packages -f\nadb logcat *:W\nadb install app_name.apk",
    pros: ["Open Source (AOSP provides flexibility)", "Large and diverse app ecosystem", "Highly customizable by users and OEMs", "Wide range of hardware choices from various manufacturers", "Strong developer community and tools"],
    cons: ["OS fragmentation due to slow/inconsistent updates from OEMs", "Security concerns can be higher on non-Google devices or with sideloaded apps", "Google's increasing control over core Android services (GMS)", "Performance can vary significantly across devices and OEM skins", "Background process management can be aggressive on some OEM versions"]
  },
  "blackberry": {
    name: "BlackBerry OS",
    history: [
      { title: "Late 90s: RIM and Pagers", content: "Research In Motion (RIM) develops early two-way pagers, laying groundwork for BlackBerry." },
      { title: "1999-2000s: Rise of BlackBerry", content: "Launch of first BlackBerry devices, famed for push email, BBM, and security features, becoming an enterprise staple." },
      { title: "2013: BlackBerry 10", content: "A modern QNX-based OS launched to compete with iOS and Android, with features like BlackBerry Hub and Flow UI." },
      { title: "Mid 2010s: Shift in Strategy", content: "Facing declining market share, BlackBerry shifts focus from its own OS to software, security services, and eventually licensing its brand for Android devices." }
    ],
    features: [
      { title: "Push Email & Enterprise Focus", description: "Legendary for real-time email delivery and strong enterprise server integration.", icon: <Mail />, details: ["BlackBerry Enterprise Server (BES)", "Secure and reliable messaging"] },
      { title: "BlackBerry Messenger (BBM)", description: "Iconic instant messaging service, initially exclusive to BlackBerry devices.", icon: <MessageSquare />, details: ["PIN-based messaging", "Group chats and status updates"] },
      { title: "Security Features", description: "Renowned for robust security, encryption, and device management capabilities.", icon: <Shield />, details: ["Hardware-level security", "End-to-end encryption for messages"] },
      { title: "Physical Keyboard", description: "Many iconic BlackBerry models featured a full QWERTY physical keyboard.", icon: <Type />, details: ["Tactile typing experience", "Keyboard shortcuts"] },
      { title: "BlackBerry Hub (BB10)", description: "Unified inbox for all messages, notifications, and social media updates in BlackBerry 10.", icon: <ListChecks />, details: ["Peek and Flow navigation gestures"] },
    ],
    architecture: "Early versions (1-7) were proprietary. BlackBerry 10 is based on the QNX Neutrino microkernel RTOS, designed for reliability and real-time performance.",
    versions: "BlackBerry OS (versions 1-7.1), BlackBerry 10 (versions 10.0-10.3.3). Later BlackBerry-branded phones run Android.",
    cliExample: "BlackBerry OS was primarily GUI-driven. Developer tools (e.g., for BB10 using Momentics IDE) offered command-line options for building and deploying apps, but not a general-purpose user shell like Unix systems.",
    pros: ["Historically strong security", "Excellent push email capabilities", "Iconic physical keyboards on many models", "BBM was a very popular IM service", "BlackBerry 10 had an innovative UI (Hub, Flow)"],
    cons: ["App ecosystem significantly lagged behind iOS/Android", "Fell behind in touch interface innovation (pre-BB10)", "Transition to BB10 came too late to regain significant market share", "Eventual discontinuation of OS and hardware development by BlackBerry Ltd."]
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
      console.error(`OS data not found for: ${osName}`);
      navigate('/not-found'); 
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

  // Determine number of columns for TabsList based on number of tabs
  const tabCount = 5; // History, Features, Architecture, CLI/GUI, Pros & Cons
  const tabsListColsClass = `grid-cols-${tabCount > 4 ? Math.ceil(tabCount / 2) : tabCount} md:grid-cols-${tabCount}`;


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
          <TabsList className={`grid w-full ${tabsListColsClass} mb-6`}>
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
                        <p className="text-muted-foreground whitespace-pre-line">{osData.architecture}</p>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Key Versions / Distributions</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{osData.versions}</p>
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
                            className="font-mono bg-gray-900 text-green-400 text-sm p-4 rounded-md h-60 whitespace-pre-line"
                            rows={10}
                        />
                        {osName === 'macos' && <img src="https://developer.apple.com/design/human-interface-guidelines/images/foundations-macos-windows_2x.png" alt="macOS GUI example" className="mt-4 rounded shadow-md max-h-60 object-contain"/> }
                        {osName === 'linux' && <img src="https://assets.ubuntu.com/v1/4c056885-lightdm.png" alt="Linux GUI example (Ubuntu)" className="mt-4 rounded shadow-md max-h-60 object-contain"/> }
                        {osName === 'android' && <p className="text-muted-foreground mt-4">Android GUI is highly variable (Pixel UI, Samsung OneUI, etc.). A generic Material Design example could be shown here.</p>}
                        {osName === 'blackberry' && <p className="text-muted-foreground mt-4">BlackBerry OS featured a distinctive UI, evolving from trackwheel/trackball navigation to the touch-based Flow UI in BlackBerry 10. Screenshot could show BB10 Hub.</p>}
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
            {/* <Button className="mt-4">Submit Note</Button>  Functionality for this button not implemented */}
        </div>
      </main>
      <footer className="text-center py-6 border-t text-muted-foreground">
        © {new Date().getFullYear()} OS Archives. All rights reserved.
      </footer>
    </div>
  );
};

export default OSDetailPage;