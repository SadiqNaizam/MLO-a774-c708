import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, DraftingCompass, History, Info, Lightbulb } from 'lucide-react';

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

const Homepage: React.FC = () => {
  console.log('Homepage loaded');
  const navigate = useNavigate();

  const osData = [
    { name: "Linux", slug: "linux", description: "Explore the world of Linux, its distributions, kernel, and open-source philosophy.", icon: <Info className="h-10 w-10 text-blue-500" /> },
    { name: "macOS", slug: "macos", description: "Discover macOS, Apple's operating system known for its design and ecosystem.", icon: <Info className="h-10 w-10 text-gray-500" /> },
    { name: "MS-DOS", slug: "ms-dos", description: "Learn about MS-DOS, the foundational command-line OS that powered early PCs.", icon: <Info className="h-10 w-10 text-green-500" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageNavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center py-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to OS Archives</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your comprehensive guide to understanding MS-DOS, Linux, and macOS.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          {osData.map((os) => (
            <Card key={os.slug} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {os.icon}
                <CardTitle className="text-2xl">{os.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{os.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate(`/os/${os.slug}`)} className="w-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

        <Separator className="my-12" />

        <section className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <History className="h-8 w-8 text-indigo-600 mb-2" />
                    <CardTitle>Historical Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>Trace the evolution of these operating systems through key milestones.</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={() => navigate('/timeline')} className="w-full">View Timeline</Button>
                </CardFooter>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <Lightbulb className="h-8 w-8 text-amber-500 mb-2" />
                    <CardTitle>Compare Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>See a side-by-side comparison of MS-DOS, Linux, and macOS.</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={() => navigate('/comparison')} className="w-full">Compare OS</Button>
                </CardFooter>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <Info className="h-8 w-8 text-teal-500 mb-2" />
                    <CardTitle>External Resources</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>Find curated links for documentation, communities, and tools.</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={() => navigate('/resources')} className="w-full">Explore Resources</Button>
                </CardFooter>
            </Card>
        </section>
        
        <Separator className="my-12" />

        <section className="py-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Quick Note / Feedback</h2>
          <Textarea placeholder="Leave a quick note or suggestion about what you'd like to learn..." rows={4} className="max-w-xl mx-auto" />
          <div className="text-center mt-4">
            <Button>Submit Note</Button>
          </div>
        </section>
      </main>
      <footer className="text-center py-6 border-t text-muted-foreground">
        © {new Date().getFullYear()} OS Archives. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;