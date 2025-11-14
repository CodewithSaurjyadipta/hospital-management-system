import { config } from 'dotenv';
config();

import '@/ai/flows/medication-interaction-check.ts';
import '@/ai/flows/appointment-scheduler-flow.ts';
import '@/ai/flows/speech-to-text-flow.ts';
