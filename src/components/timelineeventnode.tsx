import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TimelineEventNodeProps {
  date: string;
  title: string;
  description: string;
  isMajorEvent?: boolean; // Optional flag to highlight major events
}

const TimelineEventNode: React.FC<TimelineEventNodeProps> = ({ date, title, description, isMajorEvent = false }) => {
  console.log("Rendering TimelineEventNode:", title);

  return (
    <Card className={`w-full ${isMajorEvent ? 'border-primary shadow-lg' : 'border-border'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className={`text-xl ${isMajorEvent ? 'text-primary' : ''}`}>{title}</CardTitle>
            <p className={`text-sm ${isMajorEvent ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>{date}</p>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default TimelineEventNode;