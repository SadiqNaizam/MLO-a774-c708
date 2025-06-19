import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

interface ResourceLinkCardProps {
  title: string;
  description: string;
  linkUrl: string;
  linkText?: string; // Optional custom text for the link button
  category?: string; // Optional category badge
}

const ResourceLinkCard: React.FC<ResourceLinkCardProps> = ({ title, description, linkUrl, linkText = "Visit Resource", category }) => {
  console.log("Rendering ResourceLinkCard:", title);

  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {category && <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{category}</p>}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkText}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ResourceLinkCard;