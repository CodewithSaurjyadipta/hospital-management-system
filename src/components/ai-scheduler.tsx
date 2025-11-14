"use client";

import { useState, useRef, useTransition } from "react";
import { useFormState } from "react-dom";
import { ReactMic } from "react-mic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Bot, Loader2, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAiSchedulerResponse, transcribeAudio } from "@/lib/actions";
import { Textarea } from "./ui/textarea";

export function AiScheduler() {
    const [isRecording, setIsRecording] = useState(false);
    const [userQuery, setUserQuery] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    
    const [schedulerState, scheduleAction] = useFormState(getAiSchedulerResponse, {
        response: "",
        isBooked: false,
        error: false,
    });
    
    const handleToggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
        } else {
            setUserQuery("");
            setAiResponse("");
            setIsRecording(true);
        }
    };
    
    const onStop = async (recordedBlob: { blob: Blob, blobURL: string }) => {
        setIsTranscribing(true);
        const reader = new FileReader();
        reader.readAsDataURL(recordedBlob.blob);
        reader.onloadend = async () => {
            const base64Audio = reader.result as string;
            const formData = new FormData();
            formData.append('audio', base64Audio);
            const result = await transcribeAudio(null, formData);
            setIsTranscribing(false);
            if (result.text) {
                setUserQuery(result.text);
                submitQuery(result.text);
            } else {
                setAiResponse(result.error || "Sorry, I couldn't understand that. Please try again.");
            }
        };
    };

    const submitQuery = (query: string) => {
        setIsThinking(true);
        const formData = new FormData();
        formData.append('query', query);
        
        startTransition(async () => {
            const result = await getAiSchedulerResponse(schedulerState, formData);
            if(result.error) {
                setAiResponse(result.response);
            } else {
                setAiResponse(result.response);
            }
            setIsThinking(false);
        });
    }

    const handleTextSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userQuery.trim()) {
            setAiResponse("");
            submitQuery(userQuery);
        }
    }

    const [isPending, startTransition] = useTransition();
    const isLoading = isPending || isTranscribing || isThinking;

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-headline flex items-center gap-2">
                    <Bot className="h-8 w-8" />
                    AI Appointment Scheduler
                </CardTitle>
                <CardDescription>
                    Use your voice or type to check for availability and book appointments.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center gap-4">
                     <ReactMic
                        record={isRecording}
                        className="sound-wave w-full h-20"
                        onStop={onStop}
                        strokeColor="hsl(var(--primary))"
                        backgroundColor="hsl(var(--background))"
                        mimeType="audio/webm"
                    />
                    <Button
                        size="icon"
                        className={`h-24 w-24 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'}`}
                        onClick={handleToggleRecording}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-10 w-10 animate-spin" /> : <Mic className="h-10 w-10" />}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        {isRecording ? "Listening... (Tap to stop)" : (isLoading ? (isTranscribing ? "Transcribing..." : "Thinking...") : "Tap the microphone to start")}
                    </p>
                </div>

                <form onSubmit={handleTextSubmit} className="flex gap-2">
                    <Textarea 
                        placeholder="Or type your request here... e.g., 'Is Dr. Carter free tomorrow at 10 AM?'"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        rows={2}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !userQuery.trim()}>
                        <Send />
                    </Button>
                </form>

                {schedulerState?.error && !isPending && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{aiResponse}</AlertDescription>
                    </Alert>
                )}

                {aiResponse && !schedulerState?.error && (
                     <div className={`p-4 rounded-lg ${schedulerState?.isBooked ? 'bg-green-100 dark:bg-green-900/50 border border-green-500' : 'bg-primary/10'}`}>
                        <p className="font-semibold">AI Assistant:</p>
                        <p>{aiResponse}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
