
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Calendar, Clock, BookOpen, X, Edit, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export function StudentDashboard() {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelSessionId, setCancelSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        setSessions(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");
  const pastSessions = sessions.filter((s) => s.status === "completed");
  const totalHours = pastSessions.reduce((acc, s) => acc + (s.duration || 60) / 60, 0);

  const handleCancelSession = async () => {
    if (cancelSessionId) {
      try {
        await axios.patch(`http://localhost:5000/api/bookings/${cancelSessionId}`, { status: 'cancelled' });
        setSessions((prev) =>
          prev.map((s) =>
            s.id === cancelSessionId ? { ...s, status: "cancelled" } : s
          )
        );
      } catch (error) {
        console.error("Error cancelling session", error);
      } finally {
        setCancelSessionId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('nav.dashboard')}</h1>
        <p className="text-gray-600 mb-8">{t('dashboard.subtitle')}</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t('dashboard.upcoming')}</p>
                      <p className="text-3xl font-bold text-gray-900">{upcomingSessions.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t('dashboard.completed')}</p>
                      <p className="text-3xl font-bold text-gray-900">{pastSessions.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t('dashboard.total_hours')}</p>
                      <p className="text-3xl font-bold text-gray-900">{totalHours.toFixed(1)}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList>
                <TabsTrigger value="upcoming">{t('dashboard.upcoming')}</TabsTrigger>
                <TabsTrigger value="past">{t('dashboard.completed')}</TabsTrigger>
                <TabsTrigger value="progress">{t('dashboard.progress')}</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard.upcoming')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500">{t('dashboard.no_bookings')}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                          >
                            <img
                              src={session.tutorPhoto}
                              alt={session.tutorName}
                              className="w-16 h-16 rounded-full object-cover shadow-sm bg-gray-200"
                              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/64")}
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{session.tutorName}</h3>
                              <p className="text-sm text-gray-600 mb-2">{t('subjects.' + session.subject, { defaultValue: session.subject })}</p>
                              <div className="flex gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {session.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {session.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setCancelSessionId(session.id)}
                              >
                                <X className="w-4 h-4" />
                                {t('common.cancel')}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="past">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard.completed')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pastSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500">{t('dashboard.no_bookings')}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pastSessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center gap-4 p-4 border rounded-lg"
                          >
                            <img
                              src={session.tutorPhoto}
                              alt={session.tutorName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{session.tutorName}</h3>
                              <p className="text-sm text-gray-600 mb-2">{t('subjects.' + session.subject, { defaultValue: session.subject })}</p>
                              <div className="flex gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {session.date}
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-green-50 text-green-700">
                              Completed
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard.learning_progress')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{t('subjects.Mathematics')}</span>
                        <span className="text-sm text-gray-600">{t('dashboard.hours_count', { count: 8 })}</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      <AlertDialog open={!!cancelSessionId} onOpenChange={() => setCancelSessionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dashboard.cancel_title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('dashboard.cancel_desc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('dashboard.keep_session')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSession}
              className="bg-red-600 hover:bg-red-700"
            >
              {t('dashboard.confirm_cancel')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
