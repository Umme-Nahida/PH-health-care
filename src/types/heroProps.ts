export interface HeroProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  heading?: {
    line1: string;
    line2: string;
  };
  description?: string[];
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  stats?: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  formCard?: {
    title: string;
    symptomLabel?: string;
    symptomPlaceholder?: string;
    specialtyLabel?: string;
    specialtyOptions?: string[];
    defaultSpecialty?: string;
    submitText?: string;
    footerText?: string;
    onSubmit?: (data: { symptoms: string; specialty: string }) => void;
  };
}