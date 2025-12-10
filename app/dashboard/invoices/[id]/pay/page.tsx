"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Building2, Loader2, CheckCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

// Mock invoice data
const invoice = {
  id: "INV-2024-003",
  talent: "Sarah Chen",
  contractId: "CON-2024-001",
  period: "December 2024",
  amount: 5200,
  dueDate: "Dec 31, 2024",
}

export default function PayInvoicePage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [partialAmount, setPartialAmount] = useState("")

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="max-w-lg mx-auto py-12">
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-muted-foreground">
              Your payment of ${invoice.amount.toLocaleString()} for {invoice.id} has been processed.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/dashboard/invoices">Back to Invoices</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/invoices">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </Link>
      </Button>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Pay Invoice</h1>
        <p className="text-muted-foreground mt-1">Complete payment for {invoice.id}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Payment Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select how you want to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Credit / Debit Card</p>
                        <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or American Express</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cardholder Name</Label>
                  <Input placeholder="Name on card" />
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "bank" && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Transfer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Name</span>
                    <span className="font-medium">Taskive Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number</span>
                    <span className="font-mono font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Routing Number</span>
                    <span className="font-mono font-medium">021000021</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reference</span>
                    <span className="font-mono font-medium">{invoice.id}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please use the reference number when making the transfer. Payments are typically processed within 2-3
                  business days.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Partial Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Amount</CardTitle>
              <CardDescription>You can make a partial payment if needed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="full">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Pay full amount (${invoice.amount.toLocaleString()})</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="partial" id="partial" />
                  <Label htmlFor="partial">Pay partial amount</Label>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <Label>Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={partialAmount}
                    onChange={(e) => setPartialAmount(e.target.value)}
                    max={invoice.amount}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Partial payments will be applied to the oldest invoices first.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice</span>
                  <span className="font-medium">{invoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Talent</span>
                  <span className="font-medium">{invoice.talent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period</span>
                  <span className="font-medium">{invoice.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">{invoice.dueDate}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${invoice.amount.toLocaleString()}</span>
              </div>

              <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay ${invoice.amount.toLocaleString()}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secured by Stripe</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
