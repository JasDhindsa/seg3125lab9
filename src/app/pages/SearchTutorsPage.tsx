
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { TutorCard } from "../components/TutorCard";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { subjects } from "../data/mockData";
import { Star, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export function SearchTutorsPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";
  const searchQuery = searchParams.get("q") || "";

  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    initialSubject ? [initialSubject] : []
  );
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tutors");
        const data = response.data.data.map((t: any) => ({
          ...t,
          subjects: t.subjects ? JSON.parse(t.subjects) : ["Mathematics"]
        }));
        setTutors(data);
      } catch (error) {
        console.error("Error fetching tutors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Subject filter
      if (selectedSubjects.length > 0) {
        if (!tutor.subjects.some((s: string) => selectedSubjects.includes(s))) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !tutor.name.toLowerCase().includes(query) &&
          !tutor.subjects.some((s: string) => s.toLowerCase().includes(query))
        ) {
          return false;
        }
      }

      // Price filter
      if (tutor.pricePerHour < priceRange[0] || tutor.pricePerHour > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (tutor.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [tutors, selectedSubjects, priceRange, minRating, searchQuery]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {searchQuery ? `${t('search.title')} - "${searchQuery}"` : t('search.title')}
        </h1>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('search.filters')}</h2>

              {/* Subject Filter */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                  {t('search.filter_subject')}
                </Label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center gap-2">
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => toggleSubject(subject)}
                      />
                      <label
                        htmlFor={subject}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {t('subjects.' + subject, { defaultValue: subject })}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                  {t('search.filter_price')}
                </Label>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                  {t('search.filter_rating')}
                </Label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 0].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={() => setMinRating(rating)}
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm text-gray-700 cursor-pointer flex items-center gap-1"
                      >
                        {rating > 0 ? (
                          <>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {rating}+
                          </>
                        ) : (
                          t('common.all')
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tutors List */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <span className="ml-3 text-lg text-gray-600">{t('common.loading')}</span>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  {filteredTutors.length} {t('search.results_found')}
                </div>
                <div className="space-y-4">
                  {filteredTutors.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ))}
                  {filteredTutors.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border">
                      <p className="text-gray-500">{t('search.no_results')}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
