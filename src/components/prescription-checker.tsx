'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';

import { checkMedicationInteraction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface PrescriptionCheckerProps {
  patientId: string;
  medicationHistory: string[];
}

const formSchema = z.object({
  newMedication: z.string().min(2, {
    message: "Medication name must be at least 2 characters.",
  }),
});

export function PrescriptionChecker({ patientId, medicationHistory }: PrescriptionCheckerProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(checkMedicationInteraction, {
    message: '',
    hasInteraction: null,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newMedication: "",
    },
  });

  useEffect(() => {
    if (state.message === 'Interaction check complete.') {
      // Don't show a toast for successful checks, the UI will update
      form.reset();
      formRef.current?.reset();
    } else if (state.error) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescription Safety Check</CardTitle>
        <CardDescription>Check for interactions before prescribing.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            action={formAction}
            className="space-y-4"
          >
            <input type="hidden" name="medicationHistory" value={JSON.stringify(medicationHistory)} />
            <FormField
              control={form.control}
              name="newMedication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Medication</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Warfarin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Check for Interactions
            </Button>
          </form>
        </Form>
        {state.hasInteraction !== null && state.message && (
          <div className="mt-4">
            {state.hasInteraction ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Potential Interaction Detected!</AlertTitle>
                <AlertDescription>{state.interactionDetails}</AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-green-500 text-green-700 dark:border-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-600" />
                <AlertTitle>No Harmful Interactions Found</AlertTitle>
                <AlertDescription>{state.interactionDetails || 'The new medication appears safe with the current history.'}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
