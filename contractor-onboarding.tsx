"use client"

import type React from "react"

import { useState } from "react"
import {
  Upload,
  User,
  Briefcase,
  Camera,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContractorOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showContractorAgreement, setShowContractorAgreement] = useState(false)
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false)
  const [showIdExample, setShowIdExample] = useState(false)
  const [showBadgeExample, setShowBadgeExample] = useState(false)
  const [showCompensationAgreement, setShowCompensationAgreement] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: boolean }>({})
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({})

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    ssn: "",

    // Professional Setup
    preferredWorkSchedule: "",
    primaryWorkLocation: "",
    socialMediaPlatforms: [] as string[],
    marketingStrategy: "",
    targetMarkets: [] as string[],

    // Background Consent
    backgroundCheckConsent: false,

    // Required Documents - store URLs from Vercel Blob
    driverLicenseUrl: "",
    badgePhotoUrl: "",
    driverLicenseFileName: "",
    badgePhotoFileName: "",

    // Agreements
    contractorAgreement: false,
    codeOfConduct: false,
    compensationAgreement: false,
    signature: "",
  })

  const totalSteps = 5

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setFormData((prev) => ({
      ...prev,
      [field]: isChecked 
        ? [...(prev[field as keyof typeof prev] as string[]), value] 
        : (prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value),
    }))
  }

  const handleFileUpload = async (field: string, file: File | null) => {
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        [`${field}Url`]: "",
        [`${field}FileName`]: "",
      }))
      setUploadErrors((prev) => ({ ...prev, [field]: "" }))
      return
    }

    setUploadingFiles((prev) => ({ ...prev, [field]: true }))
    setUploadErrors((prev) => ({ ...prev, [field]: "" }))

    try {
      // Create FormData for file upload
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      // Add metadata
      const timestamp = Date.now()
      const fileName = `${field}_${timestamp}_${file.name}`
      uploadFormData.append("filename", fileName)

      // Upload to our API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.details || result.error || "Upload failed")
      }

      setFormData((prev) => ({
        ...prev,
        [`${field}Url`]: result.url,
        [`${field}FileName`]: file.name,
      }))

      setUploadingFiles((prev) => ({ ...prev, [field]: false }))
    } catch (error) {
      console.error("Error uploading file:", error)
      const errorMessage = error instanceof Error ? error.message : "Upload failed. Please try again."
      setUploadErrors((prev) => ({ ...prev, [field]: errorMessage }))
      setUploadingFiles((prev) => ({ ...prev, [field]: false }))
    }
  }

  const formatSSN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format as XXX-XX-XXXX
    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`
    }
  }

  const handleSSNChange = (value: string) => {
    const formatted = formatSSN(value)
    handleInputChange("ssn", formatted)
  }

  const isSignatureValid = () => {
    const expectedSignature = `${formData.firstName} ${formData.lastName}`.trim()
    return formData.signature.trim().toLowerCase() === expectedSignature.toLowerCase()
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      scrollToTop()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      scrollToTop()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate agent ID: AG + 5 random numbers
      const generateAgentId = () => {
        const randomNumbers = Math.floor(10000 + Math.random() * 90000) // Generates 5-digit number
        return `AG${randomNumbers}`
      }

      const agentId = generateAgentId()

      // Format timestamp with EST
      const now = new Date()
      const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }))
      const formattedTimestamp = estTime.toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      })

      // Prepare the data for submission
      const submissionData = {
        timestamp: formattedTimestamp,
        agentId: agentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        dateOfBirth: formData.dateOfBirth,
        ssn: formData.ssn,
        preferredWorkSchedule: formData.preferredWorkSchedule,
        socialMediaPlatforms: formData.socialMediaPlatforms,
        marketingStrategy: formData.marketingStrategy,
        targetMarkets: formData.targetMarkets,
        backgroundCheckConsent: formData.backgroundCheckConsent,
        // Send the Vercel Blob URLs
        driverLicenseUrl: formData.driverLicenseUrl,
        badgePhotoUrl: formData.badgePhotoUrl,
        driverLicenseFileName: formData.driverLicenseFileName,
        badgePhotoFileName: formData.badgePhotoFileName,
        contractorAgreement: formData.contractorAgreement,
        codeOfConduct: formData.codeOfConduct,
        compensationAgreement: formData.compensationAgreement,
        signature: formData.signature,
      }

      // Submit to Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwiNsIPMMIQciCNeVmT_aNXYuLg9s3Z_PY3muoS5g30UNQKAu_JeJCr7aggoPzgv3JC/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        },
      )

      console.log("Onboarding data submitted:", submissionData)
      setIsSubmitted(true)
      scrollToTop()
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your application. Please try again or contact support.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success page if form is submitted
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto text-green-600 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
            <p className="text-lg text-gray-600 mb-4">
              Thank you for completing your contractor onboarding application, <strong>{formData.firstName}</strong>!
            </p>
            <p className="text-gray-600 mb-6">
              We've received your information and will review it within 24-48 hours. You'll receive an email with your
              login credentials and next steps once approved.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Background verification will begin processing</li>
                <li>• You'll receive login credentials within 24-48 hours</li>
                <li>• Training materials will be provided</li>
                <li>• Your dedicated support team will contact you</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
      <div
        className="bg-blue-700 h-1 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600">Please provide your personal details for our records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
            First Name *
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-900">
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-900">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-900">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address" className="text-sm font-medium text-gray-900">
          Street Address *
        </Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className="mt-1"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="city" className="text-sm font-medium text-gray-900">
            City *
          </Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-sm font-medium text-gray-900">
            State *
          </Label>
          <Select onValueChange={(value) => handleInputChange("state", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OH">Ohio</SelectItem>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="PA">Pennsylvania</SelectItem>
              <SelectItem value="IL">Illinois</SelectItem>
              <SelectItem value="MI">Michigan</SelectItem>
              <SelectItem value="NC">North Carolina</SelectItem>
              <SelectItem value="GA">Georgia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="zipCode" className="text-sm font-medium text-gray-900">
            ZIP Code *
          </Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-900">
            Date of Birth *
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="ssn" className="text-sm font-medium text-gray-900">
            Social Security Number *
          </Label>
          <Input
            id="ssn"
            type="text"
            value={formData.ssn}
            onChange={(e) => handleSSNChange(e.target.value)}
            placeholder="XXX-XX-XXXX"
            className="mt-1"
            maxLength={11}
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Briefcase className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Work Preferences & Strategy</h3>
        <p className="text-gray-600">Help us understand your approach to building your sales business</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-900 mb-4 block">Weekly Time Commitment *</Label>
        <p className="text-sm text-gray-600 mb-4">How many hours per week can you dedicate to this opportunity?</p>
        <RadioGroup
          value={formData.preferredWorkSchedule}
          onValueChange={(value) => handleInputChange("preferredWorkSchedule", value)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-3 p-3 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="10-15" id="hours-10-15" />
            <Label htmlFor="hours-10-15" className="cursor-pointer">
              <div className="font-medium text-gray-900">10-15 hours per week</div>
              <div className="text-sm text-gray-600">Part-time, flexible schedule</div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="15-25" id="hours-15-25" />
            <Label htmlFor="hours-15-25" className="cursor-pointer">
              <div className="font-medium text-gray-900">15-25 hours per week</div>
              <div className="text-sm text-gray-600">Moderate commitment</div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="25-35" id="hours-25-35" />
            <Label htmlFor="hours-25-35" className="cursor-pointer">
              <div className="font-medium text-gray-900">25-35 hours per week</div>
              <div className="text-sm text-gray-600">Substantial commitment</div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="35+" id="hours-35-plus" />
            <Label htmlFor="hours-35-plus" className="cursor-pointer">
              <div className="font-medium text-gray-900">35+ hours per week</div>
              <div className="text-sm text-gray-600">Full-time commitment</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-900 mb-4 block">Primary Social Media Platforms *</Label>
        <p className="text-sm text-gray-600 mb-4">
          Select all platforms you're comfortable using for business development (check all that apply):
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { value: "facebook", label: "Facebook Groups & Marketplace" },
            { value: "instagram", label: "Instagram Stories & Posts" },
            { value: "tiktok", label: "TikTok Short Videos" },
            { value: "nextdoor", label: "Nextdoor Neighborhood" },
            { value: "linkedin", label: "LinkedIn Professional" },
            { value: "twitter", label: "Twitter/X Engagement" },
            { value: "youtube", label: "YouTube Content" },
            { value: "reddit", label: "Reddit Communities" },
            { value: "craigslist", label: "Craigslist Services" },
          ].map((platform) => (
            <div
              key={platform.value}
              className="flex items-center space-x-2 p-3 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300"
            >
              <Checkbox
                id={platform.value}
                checked={formData.socialMediaPlatforms.includes(platform.value)}
                onCheckedChange={(checked) => handleArrayChange("socialMediaPlatforms", platform.value, checked)}
              />
              <Label htmlFor={platform.value} className="text-sm cursor-pointer">
                {platform.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-900 mb-4 block">Marketing Strategy Approach *</Label>
        <RadioGroup
          value={formData.marketingStrategy}
          onValueChange={(value) => handleInputChange("marketingStrategy", value)}
          className="space-y-4"
        >
          <div className="flex items-start space-x-3 p-4 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="content-creator" id="strategy-content" className="mt-1" />
            <Label htmlFor="strategy-content" className="flex-1 cursor-pointer">
              <div className="font-medium text-gray-900">Content Creator</div>
              <div className="text-sm text-gray-600 mt-1">
                Create helpful videos, posts, and guides comparing internet/cable options in my area.
              </div>
            </Label>
          </div>
          <div className="flex items-start space-x-3 p-4 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="community-expert" id="strategy-community" className="mt-1" />
            <Label htmlFor="strategy-community" className="flex-1 cursor-pointer">
              <div className="font-medium text-gray-900">Community Expert</div>
              <div className="text-sm text-gray-600 mt-1">
                Focus on being the go-to person in local Facebook groups and neighborhood forums.
              </div>
            </Label>
          </div>
          <div className="flex items-start space-x-3 p-4 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="network-builder" id="strategy-network" className="mt-1" />
            <Label htmlFor="strategy-network" className="flex-1 cursor-pointer">
              <div className="font-medium text-gray-900">Network Builder</div>
              <div className="text-sm text-gray-600 mt-1">
                Leverage my existing network and build referral relationships with friends, family, and contacts.
              </div>
            </Label>
          </div>
          <div className="flex items-start space-x-3 p-4 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="marketplace-focused" id="strategy-marketplace" className="mt-1" />
            <Label htmlFor="strategy-marketplace" className="flex-1 cursor-pointer">
              <div className="font-medium text-gray-900">Marketplace Focused</div>
              <div className="text-sm text-gray-600 mt-1">
                Primarily use Facebook Marketplace, Craigslist, and other classified platforms to reach customers.
              </div>
            </Label>
          </div>
          <div className="flex items-start space-x-3 p-4 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300">
            <RadioGroupItem value="paid-advertising" id="strategy-paid-ads" className="mt-1" />
            <Label htmlFor="strategy-paid-ads" className="flex-1 cursor-pointer">
              <div className="font-medium text-gray-900">Paid Advertising</div>
              <div className="text-sm text-gray-600 mt-1">
                Use Facebook Ads, Google Ads, and other paid platforms to reach targeted customers actively searching
                for services.
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-900 mb-4 block">Target Markets *</Label>
        <p className="text-sm text-gray-600 mb-4">
          Which customer segments do you feel most comfortable serving? (check all that apply):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: "new-movers", label: "New Movers & Relocators" },
            { value: "young-professionals", label: "Young Professionals" },
            { value: "families", label: "Families with Children" },
            { value: "seniors", label: "Senior Citizens" },
            { value: "students", label: "College Students" },
            { value: "rural", label: "Rural/Suburban Areas" },
            { value: "urban", label: "Urban/City Dwellers" },
          ].map((market) => (
            <div
              key={market.value}
              className="flex items-center space-x-2 p-3 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300"
            >
              <Checkbox
                id={market.value}
                checked={formData.targetMarkets.includes(market.value)}
                onCheckedChange={(checked) => handleArrayChange("targetMarkets", market.value, checked)}
              />
              <Label htmlFor={market.value} className="text-sm cursor-pointer">
                {market.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Background Verification Consent</h3>
        <p className="text-gray-600">Authorization for background checks and verification processes</p>
      </div>

      <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Secure & Confidential Process</h4>
            <p className="text-sm text-blue-800">
              All background checks are conducted by certified third-party agencies and your information is handled with
              the highest level of security and confidentiality.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="backgroundCheckConsent"
              checked={formData.backgroundCheckConsent}
              onCheckedChange={(checked) => handleInputChange("backgroundCheckConsent", checked === true)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="backgroundCheckConsent" className="text-sm font-medium text-gray-900 cursor-pointer">
                Soft Background Check Authorization *
              </Label>
              <p className="text-sm text-gray-600 mt-2">
                I authorize Advanced Digital Marketing LLC to conduct a soft background check as part of the contractor
                verification process. This is a non-invasive check that includes basic criminal history verification at
                the county, state, and federal levels. This soft check will not affect my credit score or appear on my
                credit report.
              </p>
              <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-600">
                <strong>Soft check includes:</strong> Basic criminal history, sex offender registry, terrorist watch
                lists
                <br />
                <strong>Note:</strong> This will not impact your credit score or show up as an inquiry on your credit
                report
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Required Documents</h3>
        <p className="text-gray-600">Upload the necessary documents to complete your onboarding</p>
      </div>

      {/* Configuration Alert */}
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Note:</strong> File upload requires Vercel Blob storage to be configured. If you encounter upload
          errors, please contact support or try again later.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <Label htmlFor="driverLicense" className="cursor-pointer">
            <span className="text-lg font-medium text-gray-900 block mb-2">Driver's License / State Issued ID</span>
            <span className="text-sm text-blue-600 hover:text-blue-500 block mb-2">
              Click to upload or drag and drop
            </span>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </Label>
          <Input
            id="driverLicense"
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => handleFileUpload("driverLicense", e.target.files?.[0] || null)}
            className="hidden"
            required
          />

          {uploadingFiles.driverLicense && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                <p className="text-sm text-blue-700">Uploading...</p>
              </div>
            </div>
          )}

          {uploadErrors.driverLicense && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">❌ {uploadErrors.driverLicense}</p>
              <p className="text-xs text-red-600 mt-1">Please try again or contact support if the problem persists.</p>
            </div>
          )}

          {formData.driverLicenseUrl && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-sm text-green-800 font-medium mb-2">✓ {formData.driverLicenseFileName}</p>
              <p className="text-sm text-gray-600">File uploaded successfully</p>
              <a
                href={formData.driverLicenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View uploaded file
              </a>
            </div>
          )}

          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-blue-600 text-sm flex items-center mt-4"
            onClick={() => setShowIdExample(!showIdExample)}
          >
            {showIdExample ? (
              <>
                Hide Example <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                View Example <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>

          {showIdExample && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Example:</p>
              <img
                src="/images/id-example.png"
                alt="Example ID"
                className="mx-auto max-w-[150px] rounded border shadow-sm"
              />
            </div>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <Label htmlFor="badgePhoto" className="cursor-pointer">
            <span className="text-lg font-medium text-gray-900 block mb-2">Headshot for Badge</span>
            <span className="text-sm text-blue-600 hover:text-blue-500 block mb-2">
              Click to upload or drag and drop
            </span>
            <p className="text-xs text-gray-500">Selfie or casual photo is fine, PNG or JPG up to 5MB</p>
          </Label>
          <Input
            id="badgePhoto"
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => handleFileUpload("badgePhoto", e.target.files?.[0] || null)}
            className="hidden"
            required
          />

          {uploadingFiles.badgePhoto && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                <p className="text-sm text-blue-700">Uploading...</p>
              </div>
            </div>
          )}

          {uploadErrors.badgePhoto && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">❌ {uploadErrors.badgePhoto}</p>
              <p className="text-xs text-red-600 mt-1">Please try again or contact support if the problem persists.</p>
            </div>
          )}

          {formData.badgePhotoUrl && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-sm text-green-800 font-medium mb-2">✓ {formData.badgePhotoFileName}</p>
              <p className="text-sm text-gray-600">File uploaded successfully</p>
              <a
                href={formData.badgePhotoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View uploaded file
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Document Requirements</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• ID must be current and clearly readable</li>
          <li>• Headshot can be a selfie or casual photo - no need for professional photography</li>
          <li>• Photos should be front-facing and well-lit</li>
          <li>• Photos will be used for contractor identification and marketing materials</li>
          <li>• All documents are securely stored and used for verification purposes only</li>
        </ul>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Final Agreements</h3>
        <p className="text-gray-600">Review and accept the required agreements to complete your onboarding</p>
      </div>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="contractorAgreement"
              checked={formData.contractorAgreement}
              onCheckedChange={(checked) => handleInputChange("contractorAgreement", checked === true)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="contractorAgreement" className="text-sm font-medium text-gray-900 cursor-pointer">
                Independent Contractor Agreement *
              </Label>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                I understand and agree to the terms of the Independent Contractor Agreement, including my status as a
                1099 contractor, commission structure, and performance expectations.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowContractorAgreement(!showContractorAgreement)}
                className="mb-4"
              >
                {showContractorAgreement ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Hide Agreement
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    View Agreement
                  </>
                )}
              </Button>
              {showContractorAgreement && (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 text-sm max-h-96 overflow-y-auto">
                  <h4 className="font-semibold mb-3">Independent Contractor Agreement</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>1. Independent Contractor Status:</strong> You are an independent contractor, not an employee. You will receive 1099 tax documentation and are responsible for your own taxes.</p>
                    <p><strong>2. Commission Structure:</strong> Compensation is performance-based through commission sales. No hourly wage or salary is provided.</p>
                    <p><strong>3. Performance Expectations:</strong> Maintain professional standards, meet sales targets, and represent the company with integrity.</p>
                    <p><strong>4. Work Schedule:</strong> Flexible schedule based on your availability and client needs.</p>
                    <p><strong>5. Territory:</strong> Assigned marketing territory as discussed during onboarding.</p>
                    <p><strong>6. Termination:</strong> Either party may terminate this agreement with written notice.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="codeOfConduct"
              checked={formData.codeOfConduct}
              onCheckedChange={(checked) => handleInputChange("codeOfConduct", checked === true)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="codeOfConduct" className="text-sm font-medium text-gray-900 cursor-pointer">
                Agent Code of Conduct & Professional Standards *
              </Label>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                I agree to maintain professional standards, ethical business practices, and represent Advanced Digital
                Marketing LLC with integrity in all client interactions.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCodeOfConduct(!showCodeOfConduct)}
                className="mb-4"
              >
                {showCodeOfConduct ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Hide Code of Conduct
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    View Code of Conduct
                  </>
                )}
              </Button>
              {showCodeOfConduct && (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 text-sm max-h-96 overflow-y-auto">
                  <h4 className="font-semibold mb-3">Agent Code of Conduct & Professional Standards</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>1. Professional Conduct:</strong> Maintain the highest standards of professionalism in all client interactions and business communications.</p>
                    <p><strong>2. Ethical Practices:</strong> Conduct all business activities with honesty, integrity, and transparency.</p>
                    <p><strong>3. Client Relations:</strong> Treat all clients with respect, courtesy, and provide exceptional service quality.</p>
                    <p><strong>4. Company Representation:</strong> Represent Advanced Digital Marketing LLC positively and accurately in all interactions.</p>
                    <p><strong>5. Confidentiality:</strong> Maintain strict confidentiality of client information and company proprietary data.</p>
                    <p><strong>6. Compliance:</strong> Follow all applicable laws, regulations, and company policies.</p>
                    <p><strong>7. Continuous Improvement:</strong> Participate in training programs and maintain current industry knowledge.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="compensationAgreement"
              checked={formData.compensationAgreement}
              onCheckedChange={(checked) => handleInputChange("compensationAgreement", checked === true)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="compensationAgreement" className="text-sm font-medium text-gray-900 cursor-pointer">
                Agent Compensation Agreement *
              </Label>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                I understand and agree to the commission structure, payment terms, and bonus programs outlined in the
                Agent Compensation Agreement.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCompensationAgreement(!showCompensationAgreement)}
                className="mb-4"
              >
                {showCompensationAgreement ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Hide Compensation Agreement
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    View Compensation Agreement
                  </>
                )}
              </Button>
              {showCompensationAgreement && (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 text-sm max-h-96 overflow-y-auto">
                  <h4 className="font-semibold mb-3">Agent Compensation Agreement</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Weekly Earning Potential:</strong> $1,000-$1,500+ per week based on sales performance and commission structure.</p>
                    <p><strong>Commission Structure:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Basic Products (0-$299): 15% commission</li>
                      <li>• Premium Products ($300-$999): 20% commission</li>
                      <li>• Elite Products ($1000+): 25% commission</li>
                    </ul>
                    <p><strong>Bonus Programs:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Monthly Volume Bonus: Additional 5% for 50+ sales</li>
                      <li>• Value-Added Services: $25-$100 per attachment</li>
                      <li>• Performance Incentives: Quarterly bonuses for top performers</li>
                    </ul>
                    <p><strong>Payment Terms:</strong> Weekly direct deposit every Friday for the previous week's confirmed sales.</p>
                    <p><strong>Requirements:</strong> Minimum 20 hours per week, professional conduct, and adherence to company standards.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-100">
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-900 block mb-2">Digital Signature *</Label>
            <p className="text-sm text-gray-600 mb-3">
              By typing your full name below exactly as entered in your personal information, you are providing your
              digital signature and agreeing to all terms and conditions above.
            </p>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Expected signature: {formData.firstName} {formData.lastName}
            </p>
          </div>

          <Input
            id="signature"
            value={formData.signature}
            onChange={(e) => handleInputChange("signature", e.target.value)}
            className={`bg-white border-2 font-medium text-center text-lg ${
              formData.signature && !isSignatureValid()
                ? "border-red-400 focus:border-red-500"
                : "border-blue-300 focus:border-blue-500"
            }`}
            placeholder="Type your full name here"
            required
          />

          {formData.signature && !isSignatureValid() && (
            <p className="text-xs text-red-700 mt-2 text-center">
              Signature must match your first and last name exactly
            </p>
          )}

          {formData.signature && isSignatureValid() && (
            <p className="text-xs text-green-700 mt-2 text-center">✓ Signature verified</p>
          )}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Team!</h1>
            <p className="text-lg text-gray-600 mb-1">Contractor Onboarding - Remote Sales Agent</p>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              Independent Contractor • $1,000-$1,500+ Weekly
            </Badge>
          </div>
        </div>

        <Card className="shadow-sm border-0">
          <CardHeader className="bg-white border-b border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <CardTitle className="text-xl text-gray-900">Onboarding Process</CardTitle>
              <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            {renderProgressBar()}
          </CardHeader>

          <CardContent className="bg-white p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}

              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="px-6 bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="ml-auto px-6 bg-blue-700 hover:bg-blue-800">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.backgroundCheckConsent ||
                      !formData.driverLicenseUrl ||
                      !formData.badgePhotoUrl ||
                      !formData.contractorAgreement ||
                      !formData.codeOfConduct ||
                      !formData.compensationAgreement ||
                      !isSignatureValid()
                    }
                    className="ml-auto px-6 bg-green-700 hover:bg-green-800 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
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
