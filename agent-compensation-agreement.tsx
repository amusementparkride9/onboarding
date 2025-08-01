"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Award, Calendar } from "lucide-react"

export default function AgentCompensationAgreement() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-8 text-center border-b border-gray-200">
            <img src="/images/adm-logo.png" alt="Advanced Digital Marketing LLC" className="h-16 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Compensation Agreement</h1>
            <p className="text-lg text-gray-600 mb-1">Your Complete Guide to Earning $1,000-$1,500+ Weekly</p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Commission Structure • Performance Bonuses
            </Badge>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-600" />
              Compensation Overview
            </CardTitle>
            <CardDescription>
              Your compensation is designed to reward both quality and quantity. The more you sell and the higher-value
              products you focus on, the more you earn.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Weekly Sales Commission</h4>
                <p className="text-sm text-blue-800">Based on product value tiers and your weekly sales volume</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Monthly Bonuses</h4>
                <p className="text-sm text-green-800">Additional rewards for value-added service attachments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Matrix */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              Commission Payout Matrix
            </CardTitle>
            <CardDescription>
              Your commission per sale depends on the product's value tier and your weekly sales volume. Higher volume
              unlocks better rates for ALL sales that week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Product Tier</th>
                    <th className="border border-gray-300 p-3 text-center">
                      Entry Rate
                      <br />
                      <span className="text-xs">(1-4 Sales/Wk)</span>
                    </th>
                    <th className="border border-gray-300 p-3 text-center">
                      Pro Rate
                      <br />
                      <span className="text-xs">(5-8 Sales/Wk)</span>
                    </th>
                    <th className="border border-gray-300 p-3 text-center">
                      Elite Rate
                      <br />
                      <span className="text-xs">(9+ Sales/Wk)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">PLATINUM</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-green-600">$130</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-green-600">$155</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-green-600">$180</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">GOLD</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-blue-600">$100</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-blue-600">$125</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-blue-600">$150</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">SILVER</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-purple-600">$80</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-purple-600">$95</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-purple-600">$110</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">BRONZE</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-orange-600">$35</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-orange-600">$45</td>
                    <td className="border border-gray-300 p-3 text-center font-semibold text-orange-600">$60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Earning Examples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-6 h-6 mr-2 text-purple-600" />
              Earning Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Pro Week Example ($690)</h4>
                <p className="text-sm text-blue-800">
                  6 sales: 1 Platinum ($155) + 2 Gold ($250) + 3 Silver ($285) = $690
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Elite Week Example ($1,250)</h4>
                <p className="text-sm text-green-800">
                  9 sales: 2 Platinum ($360) + 3 Gold ($450) + 4 Silver ($440) = $1,250
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Tiers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Product Value Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-yellow-700">PLATINUM TIER (Highest Value)</h4>
                <p className="text-sm text-gray-600">
                  Brightspeed Fiber 2G, Frontier Fiber 5G/2G, Kinetic Fiber Gig (1G+), Metronet 2G/3G/5G, Optimum 5 Gbps
                </p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-blue-700">GOLD TIER (High Value)</h4>
                <p className="text-sm text-gray-600">
                  Brightspeed Fiber &gt;600M-1G, EarthLink HyperLink 100M+, Frontier Fiber 1G, Metronet 1G, Optimum 2
                  Gbps
                </p>
              </div>
              <div className="border-l-4 border-purple-400 pl-4">
                <h4 className="font-semibold text-purple-700">SILVER TIER (Standard Value)</h4>
                <p className="text-sm text-gray-600">
                  Brightspeed Fiber ≤300M, DIRECTV All Packages, EarthLink WHI, Frontier Fiber 500M, Kinetic Fiber
                  500M-1G, Metronet 500MB, Optimum 1 Gbps, Spectrum 1G/Premier, Xfinity Gigabit/Ultra/Fast
                </p>
              </div>
              <div className="border-l-4 border-orange-400 pl-4">
                <h4 className="font-semibold text-orange-700">BRONZE TIER (Base Value)</h4>
                <p className="text-sm text-gray-600">
                  Altafiber Fioptics, Frontier Fiber &lt;500M, Kinetic Internet &lt;500M, Optimum 500 Mbps, Spectrum
                  Advantage, Xfinity Connect/Essentials
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-green-600" />
              Payment Schedule & Important Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Weekly Commissions</h4>
                  <p className="text-sm text-green-800">Paid every Friday for the previous week's sales</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Monthly VAS Bonuses</h4>
                  <p className="text-sm text-blue-800">Paid on the 15th of the following month</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Sales count toward weekly totals once service is installed and activated</li>
                  <li>• Chargebacks may apply if customers cancel within 90 days</li>
                  <li>• 30 days written notice for material changes to commission structure</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <DollarSign className="w-4 h-4 mr-2" />
            Accept Compensation Agreement
          </Button>
        </div>
      </div>
    </div>
  )
}
