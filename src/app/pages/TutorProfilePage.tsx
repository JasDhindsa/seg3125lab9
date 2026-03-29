import { useParams, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { tutors, reviews } from "../data/mockData";
import { Star, MapPin, BookOpen } from "lucide-react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function TutorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const tutor = tutors.find((t) => t.id === id);
  const tutorReviews = reviews[id || ""] || [];

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Tutor not found</h1>
          <Link to="/search">
            <Button className="mt-4">Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tutor Header */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex gap-6">
              <img
                src={tutor.photo}
                alt={tutor.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.name}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{tutor.rating}</span>
                  </div>
                  <span className="text-gray-500">({tutor.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary" className="bg-blue-50 text-blue-700">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900 mb-1">${tutor.pricePerHour}</div>
                <div className="text-gray-500 mb-4">per hour</div>
                <Link to={`/book/${tutor.id}`}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Book Session
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({tutorReviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutorReviews.map((review) => (
                    <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-900">{review.studentName}</div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-1">{review.comment}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                  {tutorReviews.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No reviews yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Availability */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {daysOfWeek.map((day) => (
                    <div key={day}>
                      <div className="text-sm font-semibold text-gray-900 mb-2">{day}</div>
                      <div className="flex flex-wrap gap-2">
                        {tutor.availability[day] && tutor.availability[day].length > 0 ? (
                          tutor.availability[day].map((time) => (
                            <Badge
                              key={time}
                              variant="outline"
                              className="border-blue-200 text-blue-700"
                            >
                              {time}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">Not available</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
