import { HeartPulse, Brain, Bone, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const specialists = [
  {
    name: 'Cardiology',
    icon: HeartPulse,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    name: 'Neurology',
    icon: Brain,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Orthopedic',
    icon: Bone,
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  {
    name: 'Pediatric',
    icon: Baby,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  }
];

const Specialities = () => {
  return (
    <section className="py-24 mt-24 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Specialist</h2>
            <p className="text-muted-foreground max-w-md mt-2">
              Access to medical experts across all major specialities.
            </p>
          </div>
          <a href="#" className="text-primary font-semibold hover:underline mt-4 sm:mt-0">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((specialist) => (
            <Card
              key={specialist.name}
              className={cn(
                'text-center transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground',
              )}
            >
              <CardContent className="p-6">
                 <div
                  className={cn(
                    'w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4',
                  )}
                >
                  <specialist.icon
                    className={cn(specialist.iconColor)}
                    size={32}
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  {specialist.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialities;