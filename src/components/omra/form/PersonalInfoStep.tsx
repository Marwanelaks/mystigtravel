import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaUser, FaEnvelope, FaPhone, FaPassport, FaFlag } from "react-icons/fa";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onChange: (data: Partial<PersonalInfoData>) => void;
}

export const PersonalInfoStep = ({ data, onChange }: PersonalInfoStepProps) => {
  const { t, isRTL } = useLanguage();

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "sa", label: "Saudi Arabia" },
    { value: "eg", label: "Egypt" },
    { value: "ma", label: "Morocco" },
    { value: "pk", label: "Pakistan" },
    { value: "bd", label: "Bangladesh" },
    { value: "in", label: "India" },
    { value: "id", label: "Indonesia" },
    { value: "my", label: "Malaysia" },
    { value: "tr", label: "Turkey" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="space-y-8 fade-in-up">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-islamic-green/20">
          <FaUser className="w-8 h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-3xl font-bold mb-4 bg-gradient-islamic bg-clip-text text-transparent ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {t('form.step1.title')}
        </h3>
        <p className={`text-lg text-muted-foreground leading-relaxed ${
          isRTL ? 'font-amiri' : 'font-inter'
        }`}>
          {t('form.step1.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <FaUser className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder={t('form.step1.firstName')}
            className={`pl-10 h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
              isRTL ? 'text-right pr-10 pl-3' : ''
            }`}
            required
          />
          <Label 
            htmlFor="firstName" 
            className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
              isRTL ? 'right-3 font-amiri' : 'left-8 font-inter'
            }`}
          >
            {t('form.step1.firstName')} *
          </Label>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <FaUser className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder={t('form.step1.lastName')}
            className={`pl-10 h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
              isRTL ? 'text-right pr-10 pl-3' : ''
            }`}
            required
          />
          <Label 
            htmlFor="lastName" 
            className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
              isRTL ? 'right-3 font-amiri' : 'left-8 font-inter'
            }`}
          >
            {t('form.step1.lastName')} *
          </Label>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <FaEnvelope className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder={t('form.step1.email')}
            className={`pl-10 h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
              isRTL ? 'text-right pr-10 pl-3' : ''
            }`}
            required
          />
          <Label 
            htmlFor="email" 
            className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
              isRTL ? 'right-3 font-amiri' : 'left-8 font-inter'
            }`}
          >
            {t('form.step1.email')} *
          </Label>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <FaPhone className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder={t('form.step1.phone')}
            className={`pl-10 h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
              isRTL ? 'text-right pr-10 pl-3' : ''
            }`}
            required
          />
          <Label 
            htmlFor="phone" 
            className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
              isRTL ? 'right-3 font-amiri' : 'left-8 font-inter'
            }`}
          >
            {t('form.step1.phone')} *
          </Label>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <FaPassport className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="passportNumber"
            value={data.passportNumber}
            onChange={(e) => onChange({ passportNumber: e.target.value })}
            placeholder={t('form.step1.passportNumber')}
            className={`pl-10 h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
              isRTL ? 'text-right pr-10 pl-3' : ''
            }`}
            required
          />
          <Label 
            htmlFor="passportNumber" 
            className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
              isRTL ? 'right-3 font-amiri' : 'left-8 font-inter'
            }`}
          >
            {t('form.step1.passportNumber')} *
          </Label>
        </div>

        <div className="relative group">
          <Input
            id="passportExpiry"
            type="date"
            value={data.passportExpiry}
            onChange={(e) => onChange({ passportExpiry: e.target.value })}
            className={`h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
              isRTL ? 'text-right' : ''
            }`}
            required
          />
          <Label 
            htmlFor="passportExpiry" 
            className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
              isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
            }`}
          >
            {t('form.step1.passportExpiry')} *
          </Label>
        </div>

        <div className="relative group md:col-span-2">
          <div className="absolute top-3 left-3 flex items-center pointer-events-none z-10">
            <FaFlag className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Select value={data.nationality} onValueChange={(value) => onChange({ nationality: value })}>
            <SelectTrigger className={`pl-10 h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
              isRTL ? 'text-right pr-10 pl-3' : ''
            }`}>
              <SelectValue placeholder={t('form.step1.nationality')} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label 
            htmlFor="nationality" 
            className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
              isRTL ? 'right-3 font-amiri' : 'left-8 font-inter'
            }`}
          >
            {t('form.step1.nationality')} *
          </Label>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-islamic-green/10 via-islamic-gold/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gradient-islamic rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-islamic-green-dark mb-2 ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {isRTL ? 'ملاحظة هامة' : 'Important Note'}
              </h4>
              <p className={`text-sm leading-relaxed text-muted-foreground ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {t('form.step1.note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};