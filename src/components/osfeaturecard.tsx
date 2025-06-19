import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react'; // Example icon

interface OSFeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // Optional icon element
  details?: string[]; // Optional list of detail points
}

const OSFeatureCard: React.FC<OSFeatureCardProps> = ({ title, description, icon, details }) => {
  console.log("Rendering OSFeatureCard:", title);

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {icon ? <div className="text-muted-foreground p-1 rounded-full bg-secondary">{icon}</div> : <Info className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      {details && details.length > 0 && (
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}

export default OSFeatureCard;