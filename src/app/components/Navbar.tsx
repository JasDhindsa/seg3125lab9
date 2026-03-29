
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
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">TutorConnect</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder={t('search.placeholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  {t('search.filter_subject')}
                  <ChevronDown className="w-4 h-4" />
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
  <Button variant="ghost" className="gap-2">
    <User className="w-4 h-4" />
    {t('nav.dashboard')}
  </Button>
</Link>
</div>
        </div>
      </div>
    </nav>
  );
}
