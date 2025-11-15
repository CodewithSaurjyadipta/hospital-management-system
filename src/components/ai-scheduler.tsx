"use client";

<<<<<<< HEAD
import { useState, useRef, useTransition } from "react";
import { useFormState } from "react-dom";
import { ReactMic } from "react-mic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Bot, Loader2, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAiSchedulerResponse, transcribeAudio } from "@/lib/actions";
import { Textarea } from "./ui/textarea";
=======
import { useState, useRef, useTransition, useEffect, useActionState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Bot, Loader2, Send, CheckCircle2, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAiSchedulerResponse, transcribeAudio } from "@/lib/actions";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)

export function AiScheduler() {
    const [isRecording, setIsRecording] = useState(false);
    const [userQuery, setUserQuery] = useState("");
<<<<<<< HEAD
    const [aiResponse, setAiResponse] = useState("");
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    
    const [schedulerState, scheduleAction] = useFormState(getAiSchedulerResponse, {
=======
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [ReactMicComponent, setReactMicComponent] = useState<React.ComponentType<any> | null>(null);
    const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setIsClient(true);
        import("react-mic").then((mod) => {
            setReactMicComponent(() => mod.ReactMic);
        }).catch((err) => {
            console.error("Failed to load react-mic:", err);
        });
        
        // Check microphone permission
        if (typeof navigator !== 'undefined' && navigator.permissions) {
            navigator.permissions.query({ name: 'microphone' as PermissionName }).then((result) => {
                setMicPermission(result.state);
                result.onchange = () => {
                    setMicPermission(result.state);
                };
            }).catch(() => {
                // Fallback if permissions API is not supported
                setMicPermission('prompt');
            });
        } else {
            setMicPermission('prompt');
        }
    }, []);
    
    const [schedulerState, scheduleAction] = useActionState(getAiSchedulerResponse, {
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
        response: "",
        isBooked: false,
        error: false,
    });
    
<<<<<<< HEAD
    const handleToggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
        } else {
            setUserQuery("");
            setAiResponse("");
=======
    useEffect(() => {
        if (schedulerState) {
            if (schedulerState.error) {
                // Handle error
                setConversation(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage?.role === 'assistant' && lastMessage?.content === schedulerState.response) {
                        return prev; // Already added
                    }
                    return [...prev, {
                        role: 'assistant',
                        content: schedulerState.response || "An error occurred. Please try again.",
                        timestamp: new Date()
                    }];
                });
                setIsThinking(false);
            } else if (schedulerState.response && schedulerState.response.trim()) {
                // Check if this response is already in conversation to avoid duplicates
                setConversation(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage?.role === 'assistant' && lastMessage?.content === schedulerState.response) {
                        return prev; // Already added
                    }
                    return [...prev, {
                        role: 'assistant',
                        content: schedulerState.response,
                        timestamp: new Date()
                    }];
                });
                setIsThinking(false);
            }
        }
    }, [schedulerState]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);
    
    const requestMicrophonePermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Stop the stream immediately, we just needed permission
            stream.getTracks().forEach(track => track.stop());
            setMicPermission('granted');
            return true;
        } catch (error: any) {
            console.error("Microphone permission denied:", error);
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                setMicPermission('denied');
                setConversation(prev => [...prev, {
                    role: 'assistant',
                    content: "Microphone permission was denied. Please enable microphone access in your browser settings and try again. You can also type your request instead.",
                    timestamp: new Date()
                }]);
            } else {
                setConversation(prev => [...prev, {
                    role: 'assistant',
                    content: "Unable to access microphone. Please check your browser settings or use the text input instead.",
                    timestamp: new Date()
                }]);
            }
            return false;
        }
    };

    const handleToggleRecording = async () => {
        if (isRecording) {
            setIsRecording(false);
        } else {
            // Check if we have permission
            if (micPermission === 'denied') {
                setConversation(prev => [...prev, {
                    role: 'assistant',
                    content: "Microphone access is denied. Please enable it in your browser settings (usually in the address bar) or use the text input below.",
                    timestamp: new Date()
                }]);
                return;
            }
            
            // Request permission if needed
            if (micPermission !== 'granted') {
                const granted = await requestMicrophonePermission();
                if (!granted) {
                    return;
                }
            }
            
            setUserQuery("");
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
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
<<<<<<< HEAD
                setUserQuery(result.text);
                submitQuery(result.text);
            } else {
                setAiResponse(result.error || "Sorry, I couldn't understand that. Please try again.");
=======
                const transcribedText = result.text;
                setUserQuery(transcribedText);
                setConversation(prev => [...prev, {
                    role: 'user',
                    content: transcribedText,
                    timestamp: new Date()
                }]);
                submitQuery(transcribedText);
            } else {
                setConversation(prev => [...prev, {
                    role: 'assistant',
                    content: result.error || "Sorry, I couldn't understand that. Please try again.",
                    timestamp: new Date()
                }]);
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
            }
        };
    };

    const submitQuery = (query: string) => {
<<<<<<< HEAD
=======
        if (!query.trim()) return;
        
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
        setIsThinking(true);
        const formData = new FormData();
        formData.append('query', query);
        
<<<<<<< HEAD
        startTransition(async () => {
            const result = await getAiSchedulerResponse(schedulerState, formData);
            if(result.error) {
                setAiResponse(result.response);
            } else {
                setAiResponse(result.response);
            }
            setIsThinking(false);
=======
        startTransition(() => {
            scheduleAction(formData);
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
        });
    }

    const handleTextSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userQuery.trim()) {
<<<<<<< HEAD
            setAiResponse("");
            submitQuery(userQuery);
=======
            setConversation(prev => [...prev, {
                role: 'user',
                content: userQuery,
                timestamp: new Date()
            }]);
            submitQuery(userQuery);
            setUserQuery("");
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
        }
    }

    const [isPending, startTransition] = useTransition();
    const isLoading = isPending || isTranscribing || isThinking;

    return (
<<<<<<< HEAD
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
=======
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-headline flex items-center gap-2">
                    <Bot className="h-8 w-8 text-primary" />
                    AI Appointment Scheduler
                </CardTitle>
                <CardDescription>
                    Simply speak or type your request. I'll help you find a doctor and book an appointment.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Conversation History */}
                {conversation.length > 0 && (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 bg-muted/30 rounded-lg border">
                        {conversation.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-primary" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-background border'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                                {msg.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex gap-3 justify-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <div className="bg-background border rounded-lg p-3">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Success Message */}
                {schedulerState?.isBooked && (
                    <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800 dark:text-green-200">Appointment Booked!</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-300">
                            Your appointment has been successfully scheduled. You'll receive a confirmation shortly.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error Message */}
                {schedulerState?.error && !isPending && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{schedulerState.response}</AlertDescription>
                    </Alert>
                )}

                {/* Input Section */}
                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-muted/30 rounded-lg">
                        {isClient && ReactMicComponent ? (
                            <ReactMicComponent
                                record={isRecording}
                                className="sound-wave w-full h-20"
                                onStop={onStop}
                                strokeColor="hsl(var(--primary))"
                                backgroundColor="hsl(var(--background))"
                                mimeType="audio/webm"
                            />
                        ) : (
                            <div className="w-full h-20 bg-muted rounded-lg flex items-center justify-center">
                                <p className="text-sm text-muted-foreground">Loading microphone...</p>
                            </div>
                        )}
                        <Button
                            size="icon"
                            className={`h-20 w-20 rounded-full transition-all duration-300 ${
                                isRecording 
                                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                    : micPermission === 'denied'
                                    ? 'bg-muted hover:bg-muted cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary/90'
                            }`}
                            onClick={handleToggleRecording}
                            disabled={isLoading || micPermission === 'denied'}
                            title={micPermission === 'denied' ? 'Microphone access denied. Please enable it in browser settings.' : ''}
                        >
                            {isLoading ? (
                                <Loader2 className="h-10 w-10 animate-spin" />
                            ) : (
                                <Mic className={`h-10 w-10 ${micPermission === 'denied' ? 'opacity-50' : ''}`} />
                            )}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                            {isRecording 
                                ? "🎤 Listening... Tap to stop" 
                                : isLoading 
                                    ? (isTranscribing ? "📝 Transcribing your voice..." : "🤔 Processing your request...")
                                    : micPermission === 'denied'
                                    ? "⚠️ Microphone access denied. Please enable it in browser settings or use text input."
                                    : micPermission === 'checking'
                                    ? "Checking microphone access..."
                                    : "Tap the microphone to speak your request"
                            }
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground">OR</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <form onSubmit={handleTextSubmit} className="flex gap-2">
                        <Textarea 
                            placeholder="Type your request... e.g., 'I need to see a cardiologist tomorrow' or 'Book me with Dr. Carter next Monday at 2 PM'"
                            value={userQuery}
                            onChange={(e) => setUserQuery(e.target.value)}
                            rows={3}
                            disabled={isLoading}
                            className="resize-none"
                        />
                        <Button 
                            type="submit" 
                            size="icon" 
                            disabled={isLoading || !userQuery.trim()}
                            className="self-end"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </form>
                </div>

                {/* Quick Examples */}
                {conversation.length === 0 && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Try saying:</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Show me available doctors",
                                "I need a cardiologist",
                                "Book appointment tomorrow",
                                "Is Dr. Carter available?"
                            ].map((example, idx) => (
                                <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-primary/10"
                                    onClick={() => {
                                        const exampleText = example;
                                        setConversation(prev => [...prev, {
                                            role: 'user',
                                            content: exampleText,
                                            timestamp: new Date()
                                        }]);
                                        submitQuery(exampleText);
                                    }}
                                >
                                    {example}
                                </Badge>
                            ))}
                        </div>
>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
