import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import cardioDoc from '../../../assets/images/doctor-cardiologist.jpg';
import neurolDoc from '../../../assets/images/doctor-neurologist.jpg';
import orthoDoc from '../../../assets/images/doctor-orthopedic.jpg';

const doctors = [
  {
    name: 'Dr. Cameron Williamson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 23,
    image: cardioDoc,
  },
  {
    name: 'Dr. Leslie Alexander',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 45,
    image: neurolDoc,       
  },
  {
    name: 'Dr. Robert Fox',
    specialty: 'Orthopedic',
    rating: 4.9,
    reviews: 32,
    image: orthoDoc,
  },
];

const DoctorCard = ({ doctor }: { doctor: typeof doctors[0] }) => {
    return (
        <Card className="text-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-blue-50/50 items-center p-6">
                <Image 
                    src={doctor.image} 
                    alt={doctor.name} 
                    width={96} 
                    height={96}
                    className="rounded-full border-4 border-white shadow-md"
                />
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="text-lg">{doctor.name}</CardTitle>
                <p className="text-primary font-medium mt-1">{doctor.specialty}</p>
                <div className="flex items-center justify-center my-3 text-sm">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="ml-2 text-foreground font-semibold">{doctor.rating}</span>
                    <span className="ml-2 text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
            </CardContent>
             <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                <Button variant="outline">View Profile</Button>
                <Button>Book Now</Button>
            </CardFooter>
        </Card>
    )
}

const TopRatedDoctors = () => {
  return (
    <section className="bg-blue-50/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Our Top Rated Doctor</h2>
          <p className="text-muted-foreground mt-4">
            Access to medical experts from various specialities, ready to provide you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {doctors.map(doctor => <DoctorCard key={doctor.name} doctor={doctor} />)}
        </div>
        
        <div className="text-center mt-12">
            <Button size="lg">View All Doctors</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;