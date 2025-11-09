'use client'

import React, { useState } from 'react'
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
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        Intent Agent Prompt Selection
                    </DialogTitle>
                    <DialogDescription>
                        Choose how you want to proceed with the Intent Agent analysis
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Data Agent Response Display */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Data Agent Response:</Label>
                        <div className="bg-muted/50 p-4 rounded-lg border max-h-40 overflow-y-auto">
                            <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                                {dataAgentResponse}
                            </pre>
                        </div>
                    </div>

                    {/* Prompt Selection Options */}
                    <div className="space-y-4">
                        <Label className="text-sm font-semibold">Select Prompt Type:</Label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Auto Prompt Option */}
                            <div
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${!isManualMode
                                        ? 'border-primary bg-primary/5'
                                        : 'border-muted-foreground/20 hover:border-muted-foreground/40'
                                    }`}
                                onClick={() => setIsManualMode(false)}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Bot className="h-4 w-4" />
                                    <span className="font-medium">Auto Prompt</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Use automatically generated prompt based on the data analysis
                                </p>
                                <div className="bg-muted/30 p-3 rounded text-xs">
                                    <strong>Generated Prompt:</strong>
                                    <div className="mt-1 text-muted-foreground">
                                        {autoPrompt}
                                    </div>
                                </div>
                            </div>

                            {/* Manual Prompt Option */}
                            <div
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${isManualMode
                                        ? 'border-primary bg-primary/5'
                                        : 'border-muted-foreground/20 hover:border-muted-foreground/40'
                                    }`}
                                onClick={() => setIsManualMode(true)}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Edit3 className="h-4 w-4" />
                                    <span className="font-medium">Manual Prompt</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Write your own custom prompt for the Intent Agent analysis
                                </p>
                            </div>
                        </div>

                        {/* Manual Prompt Input */}
                        {isManualMode && (
                            <div className="space-y-2">
                                <Label htmlFor="manual-prompt">Custom Prompt:</Label>
                                <Textarea
                                    id="manual-prompt"
                                    placeholder="Enter your custom prompt for the Intent Agent analysis..."
                                    value={manualPrompt}
                                    onChange={(e) => setManualPrompt(e.target.value)}
                                    className="min-h-32"
                                />
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isManualMode && !manualPrompt.trim()}
                            className="flex items-center gap-2"
                        >
                            <Bot className="h-4 w-4" />
                            Proceed with Intent Analysis
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}