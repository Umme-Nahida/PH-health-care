import { Hero } from "@/components/modules/Home/Hero";
import Specialities from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import { Button } from "@/components/ui/button";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>PH-Healthcare</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Main content goes here  */}

        <Hero/>
        <Specialities/>
        <TopRatedDoctors/>
        <Steps/>
        <Testimonials/>
      </main>
    </>
  );
}
