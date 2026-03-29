
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Calendar, Clock, BookOpen, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function BookSessionPage() {
  const { t } = useTranslation();
  const { tutorId } = useParams<{ tutorId: string }>();
  const navigate = useNavigate();
  
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tutors");
        const found = response.data.data.find((t: any) => t.id === tutorId);
        if (found) {
          setTutor({
            ...found,
            subjects: found.subjects ? JSON.parse(found.subjects) : ["Mathematics"],
            availability: {
              Monday: ["09:00", "14:00"],
              Tuesday: ["10:00", "15:00"],
              Wednesday: ["11:00", "16:00"],
              Thursday: ["09:00", "13:00"],
              Friday: ["14:00", "17:00"]
            }
          });
        }
      } catch (error) {
        console.error("Error fetching tutor", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [tutorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
           <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Tutor not found</h1>
        </div>
      </div>
    );
  }

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1 && !selectedSubject) {
      newErrors.subject = "Please select a subject";
    }
    if (currentStep === 2 && !selectedDay) {
      newErrors.day = "Please select a day";
    }
    if (currentStep === 2 && !selectedTime) {
      newErrors.time = "Please select a time";
    }
    if (currentStep === 3 && !selectedDuration) {
      newErrors.duration = "Please select a session duration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
        setErrors({});
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleConfirm = async () => {
    if (validateStep(step)) {
      setBookingLoading(true);
      try {
        const payload = {
          tutorId: tutor.id,
          tutorName: tutor.name,
          tutorPhoto: tutor.photo,
          subject: selectedSubject,
          date: new Date().toISOString().split('T')[0],
          time: selectedTime,
          duration: parseInt(selectedDuration)
        };
        const response = await axios.post("http://localhost:5000/api/bookings", payload);
        const bookingId = response.data.data.id;
        navigate(`/confirmation/${bookingId}`);
      } catch (error) {
        console.error("Booking error", error);
        setErrors({ general: t('common.error') });
      } finally {
        setBookingLoading(false);
      }
    }
  };

  const calculateTotal = () => {
    if (!selectedDuration) return 0;
    const duration = parseInt(selectedDuration);
    return (tutor.pricePerHour * duration) / 60;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('booking.title')}</h1>
        <p className="text-gray-600 mb-8">with {tutor.name}</p>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-600">{t('booking.step1')}</span>
          <span className="text-xs text-gray-600">{t('booking.step2')}</span>
          <span className="text-xs text-gray-600">{t('booking.step3')}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && t('booking.step1')}
            {step === 2 && t('booking.step2')}
            {step === 3 && t('booking.step3')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div>
              <Label className="text-base mb-3 block">{t('booking.subject_prompt')}</Label>
              <RadioGroup value={selectedSubject} onValueChange={setSelectedSubject}>
                <div className="space-y-3">
                  {tutor.subjects.map((subject: string) => (
                    <div
                      key={subject}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedSubject === subject
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <RadioGroupItem value={subject} id={subject} />
                      <Label htmlFor={subject} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{t('subjects.' + subject, { defaultValue: subject })}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              {errors.subject && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{t('booking.error_select_subject')}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {t('booking.select_date')}
                </Label>
                <RadioGroup value={selectedDay} onValueChange={setSelectedDay}>
                  <div className="space-y-2">
                    {Object.keys(tutor.availability).map((day) => (
                      <div
                        key={day}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          selectedDay === day
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedDay(day)}
                      >
                        <RadioGroupItem value={day} id={day} />
                        <Label htmlFor={day} className="flex-1 cursor-pointer font-medium">
                          {t('days.' + day, { defaultValue: day })}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {errors.day && (
                  <Alert variant="destructive" className="mt-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.day}</AlertDescription>
                  </Alert>
                )}
              </div>

              {selectedDay && tutor.availability[selectedDay] && (
                <div>
                  <Label className="text-base mb-3 block flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {t('booking.select_time')}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {tutor.availability[selectedDay].map((time: string) => (
                      <Badge
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm ${
                          selectedTime === time
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Badge>
                    ))}
                  </div>
                  {errors.time && (
                    <Alert variant="destructive" className="mt-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.time}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">{t('booking.duration')}</Label>
                <RadioGroup value={selectedDuration} onValueChange={setSelectedDuration}>
                  <div className="space-y-3">
                    {["60", "90", "120"].map((duration) => (
                      <div
                        key={duration}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          selectedDuration === duration
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedDuration(duration)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={duration} id={`duration-${duration}`} />
                          <Label htmlFor={`duration-${duration}`} className="cursor-pointer">
                            <div className="font-medium">{duration} minutes</div>
                          </Label>
                        </div>
                        <div className="font-semibold text-gray-900">
                          ${((tutor.pricePerHour * parseInt(duration)) / 60).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {errors.duration && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.duration}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">{t('booking.summary')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">tutor:</span>
                    <span className="font-medium">{tutor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('search.filter_subject')}:</span>
                    <span className="font-medium">{t('subjects.' + selectedSubject, { defaultValue: selectedSubject })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">day:</span>
                    <span className="font-medium">{t('days.' + selectedDay, { defaultValue: selectedDay })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">duration:</span>
                    <span className="font-medium">{selectedDuration} minutes</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">{t('booking.total')}:</span>
                      <span className="font-bold text-lg text-blue-600">
                         ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1 || bookingLoading}
            >
              {t('common.back')}
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                {t('common.continue')}
              </Button>
            ) : (
              <Button 
                onClick={handleConfirm} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={bookingLoading}
              >
                {bookingLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {t('booking.confirm')}
              </Button>
            )}
          </div>
            {errors.general && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
