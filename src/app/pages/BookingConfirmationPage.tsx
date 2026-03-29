import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CheckCircle2, Calendar, Download, ArrowLeft } from "lucide-react";

export function BookingConfirmationPage() {
  const handleAddToCalendar = () => {
    // Mock function - in real app would generate calendar file
    alert("Calendar event would be downloaded");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Your tutoring session has been successfully booked
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Session Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-semibold text-gray-900">#BK-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Tutor</span>
                <span className="font-semibold text-gray-900">Dr. Sarah Johnson</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Subject</span>
                <span className="font-semibold text-gray-900">Mathematics</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">Monday, March 12, 2026</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold text-gray-900">2:00 PM - 3:00 PM</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-gray-900">60 minutes</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-xl text-blue-600">$45.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>You will receive a confirmation email with meeting details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>The tutor will contact you 24 hours before the session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>You can reschedule or cancel up to 12 hours before the session</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleAddToCalendar}
          >
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </Button>
          <Link to="/dashboard" className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
