"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, Briefcase, Shield, FileText, Clock } from "lucide-react"

export default function EmployeeOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    position: "",
    department: "",
    startDate: "",
    manager: "",
    taxWithholding: "",
    benefits: [],
    handbook: false,
    policies: false,
    safety: false,
  })

  const totalSteps = 4

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Employee onboarding completed:", formData)
    alert("Welcome to Advanced Digital Marketing! Your onboarding is complete.")
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
        <User className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p className="text-gray-600">Please provide your basic information</p>
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
          <Label htmlFor="email">Email Address</Label>
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
        <Label htmlFor="address">Home Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Street, City, State, ZIP"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
          <Input
            id="emergencyPhone"
            type="tel"
            value={formData.emergencyPhone}
            onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Briefcase className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Employment Details</h3>
        <p className="text-gray-600">Information about your role and responsibilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position">Position/Job Title</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select onValueChange={(value) => handleInputChange("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="admin">Administration</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="manager">Direct Manager</Label>
          <Input
            id="manager"
            value={formData.manager}
            onChange={(e) => handleInputChange("manager", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="taxWithholding">Tax Withholding Status</Label>
        <Select onValueChange={(value) => handleInputChange("taxWithholding", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Tax Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married Filing Jointly</SelectItem>
            <SelectItem value="married-separate">Married Filing Separately</SelectItem>
            <SelectItem value="head">Head of Household</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Benefits & Policies</h3>
        <p className="text-gray-600">Review and acknowledge company policies</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">Available Benefits</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Health Insurance (Medical, Dental, Vision)</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>401(k) Retirement Plan with Company Match</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Paid Time Off (PTO)</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Professional Development Opportunities</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Flexible Work Arrangements</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="handbook"
            checked={formData.handbook}
            onChange={(e) => handleInputChange("handbook", e.target.checked)}
            className="mt-1"
          />
          <Label htmlFor="handbook" className="text-sm">
            I have received and reviewed the Employee Handbook and understand the company policies and procedures.
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="policies"
            checked={formData.policies}
            onChange={(e) => handleInputChange("policies", e.target.checked)}
            className="mt-1"
          />
          <Label htmlFor="policies" className="text-sm">
            I acknowledge and agree to comply with all company policies including Code of Conduct, Anti-Harassment, and
            Confidentiality policies.
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="safety"
            checked={formData.safety}
            onChange={(e) => handleInputChange("safety", e.target.checked)}
            className="mt-1"
          />
          <Label htmlFor="safety" className="text-sm">
            I have completed the required safety training and understand workplace safety protocols.
          </Label>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="w-12 h-12 mx-auto text-green-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Final Review</h3>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {formData.emergencyContact} ({formData.emergencyPhone})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Position:</strong> {formData.position}
            </p>
            <p>
              <strong>Department:</strong> {formData.department}
            </p>
            <p>
              <strong>Start Date:</strong> {formData.startDate}
            </p>
            <p>
              <strong>Manager:</strong> {formData.manager}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-semibold text-green-900 mb-3">Welcome to Advanced Digital Marketing!</h4>
        <div className="space-y-2 text-sm text-green-800">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Your first day orientation is scheduled for {formData.startDate}</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>You'll receive your login credentials and equipment information via email</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>HR will contact you to schedule your benefits enrollment appointment</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Your direct manager will reach out to discuss your role and expectations</span>
          </div>
        </div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Onboarding</h1>
            <p className="text-lg text-gray-600 mb-1">Welcome to Advanced Digital Marketing LLC</p>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              New Employee Setup
            </Badge>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Onboarding Process</CardTitle>
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
              {currentStep === 4 && renderStep4()}

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
                  <Button
                    type="submit"
                    className="ml-auto bg-green-600 hover:bg-green-700"
                    disabled={!formData.handbook || !formData.policies || !formData.safety}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Onboarding
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
