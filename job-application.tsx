"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Clock, Users, CheckCircle } from "lucide-react"

export default function JobApplication() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    availability: "",
    motivation: "",
    salesExperience: "",
    marketingChannels: [],
    expectedEarnings: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application submitted:", formData)
    alert("Application submitted successfully! We'll be in touch soon.")
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location (City, State)</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="e.g., Cincinnati, OH"
          required
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Experience & Availability</h3>
        <p className="text-gray-600">Help us understand your background</p>
      </div>

      <div>
        <Label htmlFor="experience">Previous Sales/Marketing Experience</Label>
        <Textarea
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange("experience", e.target.value)}
          placeholder="Describe your relevant experience..."
          rows={4}
        />
      </div>

      <div>
        <Label>Weekly Availability</Label>
        <RadioGroup value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="part-time" id="part-time" />
            <Label htmlFor="part-time">Part-time (10-20 hours/week)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full-time" id="full-time" />
            <Label htmlFor="full-time">Full-time (30+ hours/week)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flexible" id="flexible" />
            <Label htmlFor="flexible">Flexible schedule</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Expected Monthly Earnings Goal</Label>
        <RadioGroup
          value={formData.expectedEarnings}
          onValueChange={(value) => handleInputChange("expectedEarnings", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1000-2000" id="1000-2000" />
            <Label htmlFor="1000-2000">$1,000 - $2,000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2000-4000" id="2000-4000" />
            <Label htmlFor="2000-4000">$2,000 - $4,000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4000+" id="4000+" />
            <Label htmlFor="4000+">$4,000+</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Final Details</h3>
        <p className="text-gray-600">Tell us about your motivation and goals</p>
      </div>

      <div>
        <Label htmlFor="motivation">Why are you interested in this opportunity?</Label>
        <Textarea
          id="motivation"
          value={formData.motivation}
          onChange={(e) => handleInputChange("motivation", e.target.value)}
          placeholder="Share your motivation and goals..."
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="salesExperience">Do you have experience with online sales or social media marketing?</Label>
        <Textarea
          id="salesExperience"
          value={formData.salesExperience}
          onChange={(e) => handleInputChange("salesExperience", e.target.value)}
          placeholder="Describe any relevant experience..."
          rows={3}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• We'll review your application within 24-48 hours</li>
          <li>• If selected, you'll receive an email with onboarding details</li>
          <li>• Training and support will be provided</li>
          <li>• You can start earning immediately after onboarding</li>
        </ul>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-8 text-center border-b border-gray-200">
            <img src="/images/adm-logo.png" alt="Advanced Digital Marketing LLC" className="h-16 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Remote Sales Team</h1>
            <p className="text-lg text-gray-600 mb-4">Earn $1,000-$1,500+ weekly selling home services</p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Now Hiring • Remote • Commission-Based
            </Badge>
          </div>

          {/* Job highlights */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium">100% Remote</span>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium">$1,000-$1,500+/week</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Flexible Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium">Full Training</span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Application Form</CardTitle>
            <CardDescription>
              Step {currentStep} of {totalSteps}
            </CardDescription>
            {renderProgressBar()}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Commission-based pay with weekly payouts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete training and ongoing support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Marketing tools and resources provided</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Flexible work schedule</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>18+ years old with reliable internet</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Strong communication skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Self-motivated and goal-oriented</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Basic computer and social media skills</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
