
import { Link } from "react-router";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";

export function TutorCard({ tutor }: { tutor: any }) {
  const { t } = useTranslation();
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <img
            src={tutor.photo}
            alt={tutor.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{tutor.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{tutor.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({tutor.reviewCount})</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tutor.subjects.map((subject: string) => (
                <Badge key={subject} variant="secondary" className="bg-blue-50 text-blue-700">
                  {t('subjects.' + subject, { defaultValue: subject })}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-900">${tutor.pricePerHour}</div>
              <div className="text-sm text-gray-500">/ hr</div>
            </div>
            <Link to={`/tutor/${tutor.id}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">{t('search.view_profile')}</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
