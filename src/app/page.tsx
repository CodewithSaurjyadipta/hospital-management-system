import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Calendar, FileText, Pill } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SplitText from '@/components/split-text';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');
  const featureScheduleImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-schedule'
  );
  const featureRecordsImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-records'
  );
  const featurePrescriptionsImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-prescriptions'
  );

  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-accent" />,
      title: 'Easy Appointment Scheduling',
      description:
        'Find doctors and book your appointments online in just a few clicks. Manage your schedule with ease.',
      image: featureScheduleImage,
    },
    {
      icon: <FileText className="h-8 w-8 text-accent" />,
      title: 'Secure Medical Records',
      description:
        'Access your complete medical history, test results, and notes from your doctor, all in one secure place.',
      image: featureRecordsImage,
    },
    {
      icon: <Pill className="h-8 w-8 text-accent" />,
      title: 'Intelligent Prescription Management',
      description:
        'Receive digital prescriptions and get AI-powered safety checks for potential drug interactions.',
      image: featurePrescriptionsImage,
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover -z-10 brightness-50"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="container px-4 md:px-6 text-white text-center">
            <div className="flex flex-col items-center space-y-4">
              <SplitText
                tag="h1"
                text="Your Health, Connected and Cared For"
                className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline"
              />
              <p className="max-w-[700px] text-lg md:text-xl text-gray-200">
                MediCare provides a seamless platform for patients and doctors
                to manage healthcare efficiently and securely.
              </p>

              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/signup/patient">
                  <Button size="lg">
                    I'm a Patient <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup/doctor">
                  <Button size="lg" variant="secondary">
                    I'm a Doctor <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Core Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  A Better Healthcare Experience
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed with both patients and doctors in
                  mind, providing tools that streamline communication and care.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center"
                >
                  <CardHeader>
                    <div className="flex flex-col items-center gap-4">
                      {feature.icon}
                      <CardTitle className="font-headline">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feature.image && (
                      <Image
                        src={feature.image.imageUrl}
                        alt={feature.image.description}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover aspect-video"
                        data-ai-hint={feature.image.imageHint}
                      />
                    )}
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 MediCare. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
