"use client"

import type React from "react"

import { useState } from "react"
import { HelpCircle, MessageSquare, Book, FileQuestion, Send, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I generate an offer for a talent?",
    answer:
      "Navigate to the 'Hire Talent' section, browse available talents, and click 'Generate Offer' on the talent profile. Fill in the required details including scope of work, salary, and work mode.",
  },
  {
    question: "How does the billing schedule work?",
    answer:
      "Billing schedules are automatically generated based on your contract terms. For fixed salary contracts, invoices are generated monthly. For hourly contracts, billing follows the frequency you specified.",
  },
  {
    question: "Can I make partial payments on invoices?",
    answer:
      "Yes, partial payments are supported. When paying an invoice, you can choose to pay a custom amount. Partial payments are applied to the oldest invoices first.",
  },
  {
    question: "How do I approve a contract?",
    answer:
      "Go to the Contracts section, find contracts with 'Pending Approval' status, review the terms, and click 'Approve Contract'. Once approved, the billing schedule will begin on the start date.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept major credit cards (Visa, Mastercard, American Express) and bank transfers. You can manage your payment methods in the Settings > Billing section.",
  },
  {
    question: "How do I update my company information?",
    answer:
      "Go to Settings > Company to update your company details including name, industry, address, and other information.",
  },
]

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-primary" />
          Help & Support
        </h1>
        <p className="text-muted-foreground mt-1">Get help with using Taskive or contact our support team</p>
      </div>

      {/* Quick Help */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Documentation</p>
              <p className="text-sm text-muted-foreground">Browse our guides</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Live Chat</p>
              <p className="text-sm text-muted-foreground">Chat with support</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileQuestion className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">FAQs</p>
              <p className="text-sm text-muted-foreground">Common questions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Support Ticket Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
            <CardDescription>Can't find what you're looking for? Send us a message.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Ticket Submitted!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Submit Another Ticket
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="contracts">Contracts</SelectItem>
                      <SelectItem value="offers">Offers</SelectItem>
                      <SelectItem value="talents">Talents</SelectItem>
                      <SelectItem value="account">Account & Settings</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="Brief description of your issue" required />
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Please describe your issue in detail..." className="min-h-[150px]" required />
                </div>

                <div className="space-y-2">
                  <Label>Attachments (optional)</Label>
                  <Input type="file" />
                  <p className="text-xs text-muted-foreground">Max file size: 10MB. Supported: PNG, JPG, PDF</p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
