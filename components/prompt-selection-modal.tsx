'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Bot, Edit3 } from 'lucide-react'

interface PromptSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (prompt: string, isAuto: boolean) => void
    autoPrompt: string
    dataAgentResponse: string
}

export function PromptSelectionModal({
    isOpen,
    onClose,
    onSubmit,
    autoPrompt,
    dataAgentResponse
}: PromptSelectionModalProps) {
    const [isManualMode, setIsManualMode] = useState(false)
    const [manualPrompt, setManualPrompt] = useState('')
    const manualPromptRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if (manualPromptRef.current) {
            const textarea = manualPromptRef.current
            textarea.style.height = 'auto'
            const nextHeight = Math.min(Math.max(textarea.scrollHeight, 120), 220)
            textarea.style.height = `${nextHeight}px`
        }
    }, [manualPrompt, isManualMode])

    const handleSubmit = () => {
        if (isManualMode) {
            onSubmit(manualPrompt, false)
        } else {
            onSubmit(autoPrompt, true)
        }
        onClose()
        setManualPrompt('')
        setIsManualMode(false)
    }

    const handleCancel = () => {
        onClose()
        setManualPrompt('')
        setIsManualMode(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-3xl border border-white/10 bg-slate-950/95 p-0 shadow-[0_20px_60px_rgba(34,211,238,0.22)]">
                <div className="relative px-6 py-8 text-slate-200">
                    <div className="pointer-events-none absolute -top-24 right-0 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 left-4 h-48 w-48 rounded-full bg-emerald-500/20 blur-[120px]" />

                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-white">
                            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                                <Bot className="h-5 w-5" />
                            </span>
                            <span>Intent Agent Prompt Selection</span>
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-400">
                            Choose how you want to proceed with the Intent Agent analysis
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-300">Data Agent Response:</Label>
                            <div className="max-h-40 overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-4">
                                <pre className="whitespace-pre-wrap text-sm text-slate-300">
                                    {dataAgentResponse}
                                </pre>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-semibold text-slate-300">Select Prompt Type:</Label>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div
                                    className={`cursor-pointer rounded-2xl border p-5 transition-all ${!isManualMode
                                        ? 'border-primary/60 bg-primary/10 shadow-[0_8px_30px_rgba(34,211,238,0.15)]'
                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                    onClick={() => setIsManualMode(false)}
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                                            <Bot className="h-5 w-5" />
                                        </span>
                                        <span className="text-base font-semibold">Auto Prompt</span>
                                    </div>
                                    <p className="mb-3 text-sm text-slate-300">
                                        Use automatically generated prompt based on the data analysis
                                    </p>
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                                        <strong className="text-slate-200">Generated Prompt:</strong>
                                        <div className="mt-2 text-slate-300">
                                            {autoPrompt}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`cursor-pointer rounded-2xl border p-5 transition-all ${isManualMode
                                        ? 'border-primary/60 bg-primary/10 shadow-[0_8px_30px_rgba(34,211,238,0.15)]'
                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                    onClick={() => setIsManualMode(true)}
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-slate-200">
                                            <Edit3 className="h-5 w-5" />
                                        </span>
                                        <span className="text-base font-semibold">Manual Prompt</span>
                                    </div>
                                    <p className="text-sm text-slate-300">
                                        Write your own custom prompt for the Intent Agent analysis
                                    </p>
                                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                                        {isManualMode ? (
                                            <Textarea
                                                ref={manualPromptRef}
                                                id="manual-prompt"
                                                placeholder="Enter your custom prompt..."
                                                value={manualPrompt}
                                                onChange={(e) => setManualPrompt(e.target.value)}
                                                className="min-h-[120px] max-h-[220px] w-full resize-none overflow-y-auto rounded-lg border-none bg-transparent text-sm text-slate-200 focus-visible:ring-0"
                                            />
                                        ) : (
                                            <p className="min-h-[120px] text-sm text-slate-400">
                                                Add tailored instructions for the Intent Agent here when Manual Prompt is selected.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
                            <Button variant="outline" onClick={handleCancel} className="border-white/20 bg-white/5 text-slate-200 hover:bg-white/10">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isManualMode && !manualPrompt.trim()}
                                className="flex items-center gap-2 bg-primary text-slate-900 shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:bg-primary/80"
                            >
                                <Bot className="h-4 w-4" />
                                Proceed with Intent Analysis
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}