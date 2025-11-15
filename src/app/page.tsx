
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
<<<<<<< HEAD
import { ArrowRight, Calendar, FileText, Pill } from 'lucide-react';
=======
import { ArrowRight, Calendar, FileText, Pill, Heart, Shield, Clock, Stethoscope, Users, Zap } from 'lucide-react';
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
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
<<<<<<< HEAD
=======
  const featureTelemedicineImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-telemedicine'
  );
  const featureCareCoordinationImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-care-coordination'
  );
  const featureAnalyticsImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-analytics'
  );
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)

  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-accent" />,
<<<<<<< HEAD
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
=======
      title: 'Seamless Appointment Management',
      description:
        'Book, reschedule, or cancel appointments instantly. Real-time availability ensures you find the perfect time slot. Automated reminders keep you informed and reduce no-shows.',
      image: featureScheduleImage,
      benefits: ['24/7 Online Booking', 'Instant Confirmations', 'Smart Reminders'],
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: 'HIPAA-Compliant Medical Records',
      description:
        'Your health data is encrypted and securely stored. Access comprehensive medical history, lab results, imaging studies, and clinical notes anytime, anywhere. Complete transparency with full audit trails.',
      image: featureRecordsImage,
      benefits: ['End-to-End Encryption', 'Complete History', 'Instant Access'],
    },
    {
      icon: <Pill className="h-8 w-8 text-accent" />,
      title: 'AI-Powered Prescription Safety',
      description:
        'Advanced medication interaction detection prevents adverse drug reactions. Digital prescriptions with automated refill reminders. Track medication adherence and receive personalized health insights.',
      image: featurePrescriptionsImage,
      benefits: ['Drug Interaction Alerts', 'Digital Prescriptions', 'Adherence Tracking'],
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-accent" />,
      title: 'Virtual Consultations',
      description:
        'Connect with healthcare providers through secure video consultations. Ideal for follow-ups, medication reviews, and non-emergency consultations. Save time while maintaining quality care.',
      image: featureTelemedicineImage,
      benefits: ['Secure Video Calls', 'Flexible Scheduling', 'Quality Care'],
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: 'Integrated Care Coordination',
      description:
        'Seamless communication between patients, doctors, and specialists. Shared care plans ensure everyone stays informed. Collaborative approach to healthcare management.',
      image: featureCareCoordinationImage,
      benefits: ['Team Collaboration', 'Shared Care Plans', 'Better Outcomes'],
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: 'Intelligent Health Analytics',
      description:
        'AI-driven insights from your health data help identify trends and potential health risks. Personalized recommendations based on your medical history. Proactive health management.',
      image: featureAnalyticsImage,
      benefits: ['Health Insights', 'Risk Detection', 'Personalized Care'],
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
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
<<<<<<< HEAD
              <SplitText
                tag="h1"
                text="Your Health, Connected and Cared For"
=======
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                <span>Trusted by 1000+ healthcare providers</span>
              </div>
              <SplitText
                tag="h1"
                text="Empowering Healthcare Excellence"
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
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

<<<<<<< HEAD
        <section id="features" className="w-full py-12 md:py-24 lg: pl-20 py-32 ">
          <div className="container  flex flex-col items-center justify-center">
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
            <div className="mx-auto grid max-w-5xl items-start justify-items-center gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center max-w-sm"
                >
                  <CardHeader className="flex flex-col items-center">
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
=======
        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center w-full mb-12">
              <div className="space-y-3">
                <div className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
                  Why Choose MediCare
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
                  Comprehensive Healthcare Solutions
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
                  Experience healthcare reimagined. Our integrated platform connects patients and providers 
                  through innovative technology, ensuring better outcomes and improved care delivery.
                </p>
              </div>
            </div>
            <div className="w-full mx-auto grid max-w-7xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="flex flex-col items-start space-y-3 pb-4 relative z-10">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-xl leading-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col relative z-10">
                    {feature.image && (
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src={feature.image.imageUrl}
                          alt={feature.image.description}
                          width={600}
                          height={400}
                          className="rounded-lg object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={feature.image.imageHint}
                        />
                      </div>
                    )}
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                    {feature.benefits && (
                      <div className="pt-2 border-t space-y-2">
                        <p className="text-xs font-semibold text-foreground mb-2">Key Benefits:</p>
                        <ul className="space-y-1.5">
                          {feature.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
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
