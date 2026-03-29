
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BookOpen, Calculator, Atom, Code, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const popularSubjects = [
  { name: "Mathematics", icon: Calculator, color: "bg-blue-100 text-blue-600" },
  { name: "Physics", icon: Atom, color: "bg-purple-100 text-purple-600" },
  { name: "Computer Science", icon: Code, color: "bg-green-100 text-green-600" },
  { name: "Chemistry", icon: Atom, color: "bg-red-100 text-red-600" },
  { name: "Economics", icon: TrendingUp, color: "bg-yellow-100 text-yellow-600" },
  { name: "English Literature", icon: BookOpen, color: "bg-pink-100 text-pink-600" },
];

export function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <Link to="/search">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              {t('home.find_tutor')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Popular Subjects */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('search.filter_subject')}</h2>
          <p className="text-lg text-gray-600">{t('home.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularSubjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Link key={subject.name} to={`/search?subject=${encodeURIComponent(subject.name)}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-lg ${subject.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{t(`subjects.${subject.name}`, { defaultValue: subject.name })}</h3>
                        <p className="text-sm text-gray-500">{t('search.view_profile')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('home.how_it_works')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <p className="text-gray-600">{t('home.steps.search')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <p className="text-gray-600">{t('home.steps.book')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <p className="text-gray-600">{t('home.steps.learn')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
