import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaPlane } from "react-icons/fa";

interface TripPreferencesData {
  departureDate: string;
  returnDate: string;
  duration: string;
  flexibility: string;
  departureAirport: string;
}

interface TripPreferencesStepProps {
  data: TripPreferencesData;
  onChange: (data: Partial<TripPreferencesData>) => void;
}

export const TripPreferencesStep = ({ data, onChange }: TripPreferencesStepProps) => {
  const { t, isRTL } = useLanguage();

  const durations = [
    { value: "5", label: "5 Days / 4 Nights" },
    { value: "7", label: "7 Days / 6 Nights (Recommended)" },
    { value: "10", label: "10 Days / 9 Nights" },
    { value: "14", label: "14 Days / 13 Nights" },
    { value: "custom", label: "Custom Duration" }
  ];

  const flexibilityOptions = [
    { value: "flexible", label: "Flexible (±3 days) - May result in better prices" },
    { value: "somewhat", label: "Somewhat flexible (±1 day)" },
    { value: "fixed", label: "Fixed dates only" }
  ];

  const airports = [
    { value: "jfk", label: "New York (JFK)" },
    { value: "lax", label: "Los Angeles (LAX)" },
    { value: "ord", label: "Chicago (ORD)" },
    { value: "dfw", label: "Dallas (DFW)" },
    { value: "mia", label: "Miami (MIA)" },
    { value: "lhr", label: "London Heathrow (LHR)" },
    { value: "cdg", label: "Paris (CDG)" },
    { value: "fra", label: "Frankfurt (FRA)" },
    { value: "ist", label: "Istanbul (IST)" },
    { value: "dxb", label: "Dubai (DXB)" },
    { value: "cai", label: "Cairo (CAI)" },
    { value: "khi", label: "Karachi (KHI)" },
    { value: "dac", label: "Dhaka (DAC)" },
    { value: "del", label: "Delhi (DEL)" },
    { value: "cgk", label: "Jakarta (CGK)" },
    { value: "kul", label: "Kuala Lumpur (KUL)" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="space-y-8 fade-in-up">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-islamic-green/20">
          <FaCalendarAlt className="w-8 h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-3xl font-bold mb-4 bg-gradient-islamic bg-clip-text text-transparent ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {t('form.step3.title')}
        </h3>
        <p className={`text-lg text-muted-foreground leading-relaxed ${
          isRTL ? 'font-amiri' : 'font-inter'
        }`}>
          {t('form.step3.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative group">
          <Input
            id="departureDate"
            type="date"
            value={data.departureDate}
            onChange={(e) => onChange({ departureDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
            required
          />
          <Label htmlFor="departureDate" className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground ${
            isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
          }`}>
            {t('form.step3.departureDate')} *
          </Label>
        </div>

        <div className="relative group">
          <Input
            id="returnDate"
            type="date"
            value={data.returnDate}
            onChange={(e) => onChange({ returnDate: e.target.value })}
            min={data.departureDate || new Date().toISOString().split('T')[0]}
            className="h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
            required
          />
          <Label htmlFor="returnDate" className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground ${
            isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
          }`}>
            {t('form.step3.returnDate')} *
          </Label>
        </div>
      </div>

      <Card className="p-6 bg-background/50 backdrop-blur-sm border-muted-foreground/20">
        <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <FaClock className="w-5 h-5 text-primary mr-2" />
          <h4 className={`font-semibold text-lg ${isRTL ? 'font-amiri' : 'font-inter'}`}>
            {t('form.step3.duration')}
          </h4>
        </div>
        <RadioGroup
          value={data.duration}
          onValueChange={(value) => onChange({ duration: value })}
          className="grid md:grid-cols-2 gap-4"
        >
          {durations.map((duration) => (
            <div key={duration.value} className="flex items-center space-x-2">
              <RadioGroupItem value={duration.value} id={duration.value} />
              <Label htmlFor={duration.value} className={isRTL ? 'font-amiri' : 'font-inter'}>
                {duration.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <Card className="p-6 bg-background/50 backdrop-blur-sm border-muted-foreground/20">
        <h4 className={`font-semibold text-lg mb-4 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
          {t('form.step3.flexibility')}
        </h4>
        <RadioGroup
          value={data.flexibility}
          onValueChange={(value) => onChange({ flexibility: value })}
          className="space-y-3"
        >
          {flexibilityOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className={isRTL ? 'font-amiri' : 'font-inter'}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <div className="relative group">
        <div className="absolute top-3 left-3 flex items-center pointer-events-none z-10">
          <FaPlane className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Select value={data.departureAirport} onValueChange={(value) => onChange({ departureAirport: value })}>
          <SelectTrigger className="pl-10 h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm">
            <SelectValue placeholder={t('form.step3.departureAirport')} />
          </SelectTrigger>
          <SelectContent>
            {airports.map((airport) => (
              <SelectItem key={airport.value} value={airport.value}>
                {airport.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground ${
          isRTL ? 'right-8 font-amiri' : 'left-8 font-inter'
        }`}>
          {t('form.step3.departureAirport')} *
        </Label>
      </div>

      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-islamic-green/10 via-islamic-gold/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-8 h-8 bg-gradient-islamic rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-islamic-green-dark mb-2 ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {isRTL ? 'نصيحة' : 'Tip'}
              </h4>
              <p className={`text-sm leading-relaxed text-muted-foreground ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {t('form.step3.tip')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};