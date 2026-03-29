
import { Link, useNavigate } from "react-router";
import { Search, ChevronDown, User, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { subjects } from "../data/mockData";

export function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search");
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center h-10">
          <div className="w-[180px] shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900 leading-none">TutorConnect</span>
            </Link>
          </div>

          <div className="flex-1 px-4">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder={t('search.placeholder')}
                  className="w-full h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </form>
          </div>

          <div className="w-[420px] shrink-0 flex items-center justify-end gap-2">
            <div className="w-[70px] shrink-0 flex justify-end">
              <LanguageToggle />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-[140px] h-10 px-3 whitespace-nowrap text-xs bg-gray-50/50 hover:bg-gray-100 shrink-0 justify-between">
                  <span className="truncate">{t('search.filter_subject')}</span>
                  <ChevronDown className="w-4 h-4 ml-1 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {subjects.map((subject) => (
                  <DropdownMenuItem
                    key={subject}
                    onClick={() => navigate(`/search?subject=${encodeURIComponent(subject)}`)}
                  >
                    {t('subjects.' + subject, { defaultValue: subject })}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/dashboard">
              <Button variant="ghost" className="w-[190px] h-10 px-3 whitespace-nowrap text-xs bg-gray-50/50 hover:bg-gray-100 shrink-0 justify-start">
                <User className="w-4 h-4 mr-2 shrink-0 text-blue-600" />
                <span className="truncate">{t('nav.dashboard')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
