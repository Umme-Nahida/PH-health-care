import { Search, ClipboardList, CalendarCheck, ShieldCheck, FileText, Video, CreditCard, HeartPulse } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  { icon: Search, title: 'Search Doctor', description: 'Find your doctor easily with a minimum of effort.' },
  { icon: ClipboardList, title: 'Check Doctor Profile', description: 'Get to know your doctor better.' },
  { icon: CalendarCheck, title: 'Schedule Appointment', description: 'Choose the time and date that suits you.' },
  { icon: ShieldCheck, title: 'Get Your Solution', description: 'Our doctors are here to help you.' },
  { icon: FileText, title: 'Electronic prescription', description: 'Get your prescription instantly.' },
  { icon: Video, title: 'Instant video consultation', description: 'Consult with your doctor from anywhere.' },
  { icon: CreditCard, title: 'Easy payment options', description: 'Pay with ease using various methods.' },
  { icon: HeartPulse, title: 'Health recovery', description: 'Start your journey to better health.' },
];

const StepCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
    const bgColors = [
        'bg-blue-50', 'bg-pink-50', 'bg-green-50', 'bg-yellow-50',
        'bg-pink-50', 'bg-blue-50', 'bg-yellow-50', 'bg-green-50'
    ];
    const textColors = [
        'text-blue-500', 'text-pink-500', 'text-green-500', 'text-yellow-500',
        'text-pink-500', 'text-blue-500', 'text-yellow-500', 'text-green-500'
    ];

    return (
        <Card className={`${bgColors[index % 8]}`}>
            <CardContent className="p-4">
                 <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${textColors[index % 8]} bg-white shadow-sm`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">{title}</h3>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


const Steps = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Easy Steps to Get Your Solution</h2>
          <p className="text-muted-foreground mt-4">
            We provide advanced technologies and high-quality surgery facilities right here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {steps.map((step, index) => (
                <StepCard key={index} {...step} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;