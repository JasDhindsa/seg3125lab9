
import { useState, useMemo } from "react";
import { HelpCircle, MessageCircle, Phone, Mail, Search as SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "./ui/accordion";
import { Input } from "./ui/input";
import { toast } from "sonner";

export function HelpSection() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");

    const faqs = t('help.faqs', { returnObjects: true }) as Array<{q: string, a: string}>;

    const filteredFaqs = useMemo(() => {
        if (!Array.isArray(faqs)) return [];
        return faqs.filter(faq =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, faqs]);

    const handleSupportAction = (action: string) => {
        toast.success(`Starting ${action}...`, {
            description: "Our team will be with you shortly.",
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        size="lg"
                        className="h-14 w-14 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 hover:scale-110 transition-all duration-300 p-0 overflow-hidden group"
                    >
                        <HelpCircle className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 mr-4 mb-4 border-none shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5">
                    <div className="bg-blue-600 p-6 text-white text-center relative">
                        <h3 className="text-xl font-bold mb-1">{t('help.title')}</h3>
                        <p className="text-blue-100 text-sm">{t('help.subtitle')}</p>
                    </div>

                    <div className="p-4 bg-gray-50 border-b">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder={t('help.search')}
                                className="pl-9 h-9 bg-white border-gray-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <ScrollArea className="max-h-[350px]">
                        <div className="p-4 space-y-6 bg-white">
                            {/* FAQ Section */}
                            <section>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                    {searchQuery ? "Search Results" : t('help.popular')}
                                </h4>

                                {filteredFaqs.length > 0 ? (
                                    <Accordion type="single" collapsible className="w-full">
                                        {filteredFaqs.map((faq, i) => (
                                            <AccordionItem key={i} value={`item-${i}`} className="border-gray-100">
                                                <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-blue-600 text-left py-3">
                                                    {faq.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-xs text-gray-500 leading-relaxed">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <p className="text-sm text-gray-500 py-4 text-center">No results found for "{searchQuery}"</p>
                                )}
                            </section>

                            <hr className="border-gray-100" />

                            {/* Contact Section */}
                            <section>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('help.contact')}</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="justify-start gap-2 h-10 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
                                        onClick={() => handleSupportAction("Live Chat")}
                                    >
                                        <MessageCircle className="w-4 h-4 text-blue-600" />
                                        Live Chat
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="justify-start gap-2 h-10 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
                                        onClick={() => handleSupportAction("Email Support")}
                                    >
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        Email Support
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="justify-start gap-2 h-10 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
                                        onClick={() => handleSupportAction("Phone Support")}
                                    >
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        Call Us
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
}
