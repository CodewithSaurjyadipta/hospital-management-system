"use client";

import { useState, useRef, useTransition, useEffect } from "react";
import { useFormState } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Bot, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAiSchedulerResponse } from "@/lib/actions";

export function AiScheduler() {
    const [isRecording, setIsRecording] = useState(false);
    const [userQuery, setUserQuery] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();

    const [state, formAction] = useFormState(getAiSchedulerResponse, {
        response: "",
        isBooked: false,
    });
    
    useEffect(() => {
        if(state?.response) {
            setAiResponse(state.response);
        }
        if(state?.error) {
            setAiResponse(state.response);
        }
    }, [state]);


    const handleToggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            // Simulate voice input for now
            setTimeout(() => {
                const simulatedQuery = "Is there a slot at 10 AM for Dr. Emily Carter tomorrow?";
                setUserQuery(simulatedQuery);
                
                const formData = new FormData();
                formData.append('query', simulatedQuery);
                
                startTransition(() => {
                   formAction(formData);
                });

            }, 1000);
        }
    };
    

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-headline flex items-center gap-2">
                    <Bot className="h-8 w-8" />
                    AI Appointment Scheduler
                </CardTitle>
                <CardDescription>
                    Use your voice to check for availability and book appointments.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center gap-4">
                    <Button
                        size="icon"
                        className={`h-24 w-24 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'}`}
                        onClick={handleToggleRecording}
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="h-10 w-10 animate-spin" /> : <Mic className="h-10 w-10" />}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        {isRecording ? "Listening..." : "Tap the microphone to start"}
                    </p>
                </div>

                {state?.error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.response}</AlertDescription>
                    </Alert>
                )}

                {userQuery && (
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="font-semibold">You said:</p>
                        <p>"{userQuery}"</p>
                    </div>
                )}

                {aiResponse && (
                     <div className={`p-4 rounded-lg ${state?.isBooked ? 'bg-green-100 dark:bg-green-900/50 border border-green-500' : 'bg-primary/10'}`}>
                        <p className="font-semibold">AI Assistant:</p>
                        <p>{aiResponse}</p>
                    </div>
                )}

                 <form ref={formRef} action={formAction} className="hidden">
                    <input type="hidden" name="query" value={userQuery} />
                </form>

            </CardContent>
        </Card>
    );
}