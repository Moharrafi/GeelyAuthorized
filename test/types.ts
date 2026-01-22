
export interface Car {
  id: string;
  name: string;
  tagline: string;
  price: string;
  category: 'SUV' | 'Sedan' | 'EV' | 'Sport';
  image: string;
  description: string;
  features: string[];
  specs: {
    acceleration: string;
    power: string;
    range?: string; // For EVs
    topSpeed: string;
    torque?: string;
    weight?: string;
    dragCoefficient?: string;
    braking?: string;
    dimensions?: {
      length: string;
      width: string;
      height: string;
      wheelbase: string;
    };
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HERO = 'hero',
  MODELS = 'models',
  TECHNOLOGY = 'technology',
  SERVICES = 'services',
  CONTACT = 'contact',
}
