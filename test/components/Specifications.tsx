
import React, { useState } from 'react';
import { CARS } from '../constants';
import { Car } from '../types';
import { Plus, Minus, Info, Check, X as XIcon } from 'lucide-react';

interface SpecCategory {
  title: string;
  specs: {
    label: string;
    pro: string | boolean;
    max: string | boolean;
  }[];
}

const Specifications: React.FC = () => {
  const [activeCar, setActiveCar] = useState<Car>(CARS[0]);
  const [openCategory, setOpenCategory] = useState<string | null>("NEW ENERGY");

  // Helper untuk mendapatkan data dimensi
  const getDimensionValues = () => {
    switch (activeCar.id) {
      case 'ex5': return { length: '4615', width: '1901', height: '1670', wheelbase: '2750' };
      case 'ex2': return { length: '4135', width: '1805', height: '1580', wheelbase: '2650' };
      case 'starray': return { length: '4740', width: '1905', height: '1685', wheelbase: '2755' };
      default: return { length: '0', width: '0', height: '0', wheelbase: '0' };
    }
  };

  const dims = getDimensionValues();

  // Data Spesifikasi Lengkap untuk Geely EX5
  const ex5TechnicalSpecs: SpecCategory[] = [
    {
      title: "NEW ENERGY",
      specs: [
        { label: "Drive Type", pro: "Front-Wheel Drive (FWD)", max: "Front-Wheel Drive (FWD)" },
        { label: "Electrical Motor Type", pro: "Permanent Magnetic Synchronous Machine", max: "Permanent Magnetic Synchronous Machine" },
        { label: "Electric Drive Type", pro: "11-in-1 Electrical Drive", max: "11-in-1 Electrical Drive" },
        { label: "Max. Net Power", pro: "160kW", max: "160kW" },
        { label: "Max. Net Torque", pro: "320 N.m", max: "320 N.m" },
        { label: "Max. Vehicle Speed", pro: "175 km/h", max: "175 km/h" },
        { label: "0-100km/h Acceleration", pro: "6.9 s", max: "7.1 s" },
        { label: "Battery Capacity", pro: "60.22 kWh", max: "60.22 kWh" },
        { label: "Battery Type", pro: "Lithium Iron Phosphate", max: "Lithium Iron Phosphate" },
        { label: "NEDC Combined Driving Range", pro: "495 km", max: "490 km" },
        { label: "Drive Mode", pro: "Eco/Normal/Sport", max: "Eco/Normal/Sport" },
        { label: "AC Slow Charging Time (10%-100% SOC)", pro: "6.1 h", max: "6.1 h" },
        { label: "DC Fast Charging Time (30%-80% SOC)", pro: "20 Min", max: "20 Min" },
        { label: "Remote Scheduled Charging", pro: true, max: true },
        { label: "Vehicle to Load (V2L) Power Supply", pro: true, max: true },
        { label: "Vehicle to Vehicle (V2V) Power Supply", pro: true, max: true },
      ]
    },
    {
      title: "CHASSIS",
      specs: [
        { label: "Suspension Type", pro: "F-MCPHERSON/R-MULTI-LINK", max: "F-MCPHERSON/R-MULTI-LINK" },
        { label: "Steering Type", pro: "Electric Power Steering (EPS)", max: "Electric Power Steering (EPS)" },
        { label: "Braking System", pro: "F-VENTILATED/R-SOLID", max: "F-VENTILATED/R-SOLID" },
        { label: "Braking Energy Recovery System", pro: true, max: true },
        { label: "Adjustable Energy Recovery System", pro: true, max: true },
        { label: "Electronic Parking Brake (EPB)", pro: true, max: true },
        { label: "Auto Hold", pro: true, max: true },
      ]
    },
    {
      title: "EXTERIOR",
      specs: [
        { label: "All LED Automatic Headlights", pro: true, max: true },
        { label: "LED Daytime Running Lights (DRL)", pro: true, max: true },
        { label: "All LED Through Tail Lights", pro: true, max: true },
        { label: "Intelligent High Beam Control (IHBC)", pro: false, max: true },
        { label: "Active Grille Shutters", pro: true, max: true },
        { label: "Roof Rack", pro: true, max: true },
        { label: "Panoramic Power Sunroof with Power Sunshade", pro: false, max: true },
        { label: "Electric Retractable Door Handles", pro: true, max: true },
        { label: "Rear Privacy Windows", pro: true, max: true },
        { label: "Power Tailgate", pro: false, max: true },
        { label: "Heated Power Side Folding Mirrors, Auto Folding", pro: true, max: true },
        { label: "Rain-sensing Frameless Wipers", pro: true, max: true },
      ]
    },
    {
      title: "INTERIOR",
      specs: [
        { label: "Faux Leather-Instrument Panel", pro: true, max: true },
        { label: "Microfiber Leather Multifunction Steering Wheel", pro: true, max: true },
        { label: "Auto Dimming Interior Rearview Mirror", pro: true, max: true },
        { label: "Front Sun Visors with Vanity Mirrors and Light", pro: false, max: true },
        { label: "256-Color Ambient Lightning", pro: false, max: true },
        { label: "Perforated PVC/Faux Leather Seats Surface", pro: true, max: true },
        { label: "6-Way Power Adjustable Driver's Seat", pro: true, max: true },
        { label: "4-Way Power Adjustable Front Passenger Seat", pro: true, max: true },
        { label: "Front Seat Ventilation", pro: true, max: true },
        { label: "Front Seat Memory Settings", pro: false, max: true },
        { label: "Front Seat Massage Function", pro: false, max: true },
        { label: "Passenger Seat with Leg Support", pro: true, max: true },
        { label: "Rear Seat Backrest with Dual Angle Adjustment", pro: true, max: true },
        { label: "Split-folding Rear Seat", pro: true, max: true },
        { label: "Rear Seat Central Armrest", pro: true, max: true },
      ]
    },
    {
      title: "ADAS",
      specs: [
        { label: "Cruise Control System (CCS)", pro: true, max: false },
        { label: "Automatic Emergency Brake (AEB)", pro: false, max: true },
        { label: "Adaptive Cruise Control (ACC)", pro: false, max: true },
        { label: "Intelligent Cruise Control (ICC)", pro: false, max: true },
        { label: "Rear Cross Traffic Alert (RCTA)", pro: false, max: true },
        { label: "Lane Keeping Assistant (LKA)", pro: false, max: true },
        { label: "Blind Spots Detection (BSD)", pro: false, max: true },
        { label: "Emergency Lane Keeping Assistant (ELKA)", pro: false, max: true },
        { label: "Door Open Warning (DOW)", pro: false, max: true },
      ]
    },
    {
      title: "INTELLIGENT CABIN",
      specs: [
        { label: "Keyless Entry & Passive Start", pro: true, max: true },
        { label: "W-HUD (Windshield Heads-UP Display)", pro: false, max: true },
        { label: "FLYME AUTO In-Vehicle Infotainment System", pro: true, max: true },
        { label: "15.4\" HD Touch-Screen", pro: true, max: true },
        { label: "10.2\" LCD Instrument Cluster", pro: true, max: true },
        { label: "Dual-Zone Voice Control", pro: true, max: true },
        { label: "6-Speaker Audio System", pro: true, max: false },
        { label: "16-Speaker FLYME SOUND Premium Audio System", pro: false, max: true },
        { label: "Wireless Charging", pro: true, max: true },
      ]
    },
    {
      title: "SAFETY",
      specs: [
        { label: "Electronic Stability Control (ESC)", pro: true, max: true },
        { label: "Antilock Brake System (ABS)", pro: true, max: true },
        { label: "Hill-Start Assist Control (HAC)", pro: true, max: true },
        { label: "Hill Descent Control (HDC)", pro: true, max: true },
        { label: "Two Front Airbags", pro: true, max: true },
        { label: "Front Row Side Curtain Airbags", pro: true, max: true },
        { label: "Side Impact Airbags", pro: true, max: true },
        { label: "Rear Occupant Detection System", pro: false, max: true },
        { label: "360° Topview Surround Parking Vision", pro: true, max: true },
        { label: "Pure Electric Low Speed Alert", pro: false, max: true },
      ]
    },
    {
      title: "WHEELS & COLORS",
      specs: [
        { label: "18\" Alloy Wheels", pro: true, max: true },
        { label: "Ext Color: Snow White", pro: true, max: true },
        { label: "Ext Color: Turquoise Green / Carbon Black", pro: true, max: true },
        { label: "Int Color: Dark Blue", pro: true, max: true },
        { label: "Int Color: Ivory White", pro: false, max: true },
      ]
    }
  ];

  // Data Spesifikasi Lengkap untuk Geely EX2
  const ex2TechnicalSpecs: SpecCategory[] = [
    {
      title: "DIMENSIONS EXTRA",
      specs: [
        { label: "Min. Turning Radius", pro: "4.95 m", max: "4.95 m" },
        { label: "Min. Ground Clearance", pro: "160.8 mm", max: "162 mm" },
        { label: "Seats", pro: "5", max: "5" },
        { label: "Trunk Capacity (Min. / Max.)", pro: "375/1320 L", max: "375/1320 L" },
      ]
    },
    {
      title: "NEW ENERGY",
      specs: [
        { label: "Drive Type", pro: "Rear-Wheel Drive (RWD)", max: "Rear-Wheel Drive (RWD)" },
        { label: "Electric Motor Type", pro: "Permanent Magnet Synchronous Motor", max: "Permanent Magnetic Synchronous Machine" },
        { label: "Electric Drive Type", pro: "11-in-1 Electrical Drive", max: "11-in-1 Electrical Drive" },
        { label: "Max. Power", pro: "85 kW", max: "85 kW" },
        { label: "Max. Torque", pro: "150 N.m", max: "150 N.m" },
        { label: "Max. Vehicle Speed", pro: "130 km/h", max: "130 km/h" },
        { label: "0-50km/h Acceleration", pro: "4.6 s", max: "4.6 s" },
        { label: "0-100km/h Acceleration", pro: "11.5 s", max: "11.5 s" },
        { label: "Battery Capacity", pro: "40.8 kWh", max: "40.8 kWh" },
        { label: "Battery Type", pro: "Lithium Iron Phosphate", max: "Lithium Iron Phosphate" },
        { label: "NEDC Combined Driving Range", pro: "395 km", max: "395 km" },
        { label: "NEDC Combined Energy Consumption", pro: "11.8 kWh/100km", max: "11.8 kWh/100km" },
        { label: "Drive Mode", pro: "Eco/Comfort/Sport", max: "Eco/Comfort/Sport" },
        { label: "AC Slow Charging Time (10%-100% SOC)", pro: "6.5 h", max: "6.5 h" },
        { label: "DC Fast Charging Time (30%-80% SOC)", pro: "25 min", max: "25 min" },
        { label: "MAX DC Charging Power", pro: "70 kW", max: "70 kW" },
        { label: "Remote Scheduled Charging", pro: false, max: true },
        { label: "V2L (Vehicle-to-Load) Power Supply", pro: true, max: true },
      ]
    },
    {
      title: "CHASSIS",
      specs: [
        { label: "Suspension Type", pro: "F-MacPherson/R-Multi-link", max: "F-MacPherson/R-Multi-link" },
        { label: "Steering Type", pro: "Electric Power Steering (EPS)", max: "Electric Power Steering (EPS)" },
        { label: "Braking System", pro: "F-Ventilated/R-Solid", max: "F-Ventilated/R-Solid" },
        { label: "Braking Energy Recovery System", pro: true, max: true },
        { label: "Adjustable Energy Recovery System", pro: true, max: true },
        { label: "Electronic Parking Brake (EPB)", pro: true, max: true },
        { label: "Auto Hold", pro: true, max: true },
      ]
    },
    {
      title: "EXTERIORS",
      specs: [
        { label: "70L Front trunk", pro: true, max: true },
        { label: "All LED Automatic Headlights", pro: true, max: true },
        { label: "LED Rear Lights", pro: true, max: true },
        { label: "Lead Turning Lights", pro: true, max: true },
        { label: "Follow Me Home Light", pro: true, max: true },
        { label: "Metal side skirts", pro: false, max: true },
        { label: "Semi-Concealed Exterior Door Handle", pro: true, max: true },
        { label: "Power Adjustable Exterior Mirrors", pro: true, max: true },
        { label: "Frameless Windshield Wiper", pro: true, max: true },
      ]
    },
    {
      title: "INTERIORS",
      specs: [
        { label: "Microfiber Leather Multifunction Steering Wheel", pro: true, max: true },
        { label: "2-Way Manual Steering Wheel Adjustment", pro: true, max: true },
        { label: "Front Seat Sun Visors with Mirrors", pro: true, max: true },
        { label: "One-Touch-Up/Down Four Windows with Clip Guard", pro: true, max: true },
        { label: "256-Color Urban Starlight Ambient Light", pro: "-", max: "No" },
        { label: "Perforated Leatherette Seats", pro: true, max: true },
        { label: "6-Way Manual Adjustable Driver's Seat", pro: true, max: false },
        { label: "6-Way Power Adjustable Driver's Seat", pro: false, max: true },
        { label: "Rear Seat Fold Down in a 4:6 Ratio", pro: true, max: true },
      ]
    },
    {
      title: "AIR CONDITIONING",
      specs: [
        { label: "Manual Air Conditioning", pro: true, max: true },
        { label: "Rear A/C Vent", pro: true, max: true },
        { label: "Unlock/Delayed Ventilation", pro: true, max: true },
        { label: "Remote Ventilation", pro: false, max: true },
      ]
    },
    {
      title: "ADAS",
      specs: [
        { label: "Adaptive Cruise Control (ACC)", pro: false, max: true },
        { label: "Automatic Emergency Breaking (AEB)", pro: false, max: true },
        { label: "Lane Departure Warning (LDW)", pro: false, max: true },
        { label: "Forward Collision Warning (FCW)", pro: false, max: true },
        { label: "Lanes Change Assist (LCA)", pro: false, max: true },
        { label: "Blind Spot Detection (BSD)", pro: false, max: true },
        { label: "Traffic Sign Recignition (TSR)", pro: false, max: true },
      ]
    },
    {
      title: "INTELLIGENT COCKPIT",
      specs: [
        { label: "Keyless Entry & Keyless Start", pro: true, max: true },
        { label: "FLYME AUTO In-Vehicle Infotainment System", pro: true, max: true },
        { label: "14.6\" HD Touch Screen", pro: true, max: true },
        { label: "8.8\" LCD Instrument Cluster", pro: true, max: true },
        { label: "Android Auto & Apple CarPlay (*)", pro: true, max: true },
        { label: "4G Network Connectivity", pro: false, max: true },
        { label: "Remote APP Vehicle Control (**)", pro: false, max: true },
        { label: "REAR USB Ports (Type-A x1)", pro: false, max: true },
        { label: "4-Speaker Audio System", pro: true, max: true },
      ]
    },
    {
      title: "SAFETY",
      specs: [
        { label: "Geely Traction Control System (G-TCS)", pro: true, max: true },
        { label: "Electronic Stability Control (ESC)", pro: true, max: true },
        { label: "Antilock Brake System (ABS)", pro: true, max: true },
        { label: "Hill-Start Assist Control (HAC)", pro: true, max: true },
        { label: "Driver/Co-driver Front Airbag", pro: true, max: true },
        { label: "Front Side Airbags", pro: true, max: true },
        { label: "Side Curtain Airbags", pro: false, max: true },
        { label: "Tire Pressure Monitoring System", pro: true, max: true },
        { label: "Low Speed Alert For EV Driving", pro: true, max: true },
      ]
    },
    {
      title: "WHEELS & TIRES",
      specs: [
        { label: "15\" Steel Wheel Rim", pro: true, max: false },
        { label: "16\" Aluminium Alloy Wheel Rim", pro: false, max: true },
      ]
    },
    {
      title: "BODY COLORS",
      specs: [
        { label: "Moon White / Star Silver / Comet Grey / Nebula Beige", pro: "Standard Color", max: "Standard Color" },
        { label: "Stellar Blue / Aurora Pink (*)", pro: "Honor Color", max: "Honor Color" },
      ]
    },
    {
      title: "INTERIOR COLORS",
      specs: [
        { label: "Dark Grey", pro: "Standard Color", max: "Standard Color" },
        { label: "Ivory White (*)", pro: "Honor Color", max: "Honor Color" },
      ]
    }
  ];

  // Data Spesifikasi Lengkap untuk Geely Starray EM-i
  const starrayTechnicalSpecs: SpecCategory[] = [
    {
      title: "DIMENSIONS EXTRA",
      specs: [
        { label: "Overhang Front/Rear", pro: "968/1017 mm", max: "968/1017 mm" },
        { label: "Min. Ground Clearance-Unladen/Laden", pro: "172/150 mm", max: "172/150 mm" },
        { label: "Number of Seats", pro: "5", max: "5" },
        { label: "Trunk Capacity (Seats Upright/Seats Folded)", pro: "528/2065 L", max: "528/2065 L" },
        { label: "Fuel Tank Capacity", pro: "51 L", max: "51 L" },
      ]
    },
    {
      title: "POWERTRAIN",
      specs: [
        { label: "Powertrain Type", pro: "Plug-in Hybrid", max: "Plug-in Hybrid" },
        { label: "Propulsion Type", pro: "FWD", max: "FWD" },
        { label: "Drive Modes", pro: "Pure/Hybrid/Power", max: "Pure/Hybrid/Power" },
        { label: "Engine", pro: "1.5L 4 Cylinder", max: "1.5L 4 Cylinder" },
        { label: "Engine Displacement", pro: "1,499 ml", max: "1,499 ml" },
        { label: "Max. Engine Power", pro: "73 kW", max: "73 kW" },
        { label: "Max. Engine Torque", pro: "125 Nm", max: "125 Nm" },
        { label: "Transmission", pro: "1DHT Automatic", max: "1DHT Automatic" },
        { label: "Electric Motor Type", pro: "Permanent Magnet Synchronous", max: "Permanent Magnet Synchronous" },
        { label: "Max. Electric Motor Power", pro: "160 Kw", max: "160 Kw" },
        { label: "Max. Electric Motor Torque", pro: "265 Nm", max: "265 Nm" },
        { label: "Battery Type", pro: "Lithium Iron Phosphate", max: "Lithium Iron Phosphate" },
        { label: "Battery Capacity", pro: "18.4 kWh", max: "18.4 kWh" },
        { label: "Max. DC Charging Power", pro: "30 kW", max: "30 kW" },
        { label: "DC Fast Charging Time (SOC 30%-80%)", pro: "<20 Min", max: "<20 Min" },
        { label: "Max. AC Charging Power", pro: "6.6 kW", max: "6.6 kW" },
        { label: "AC Charging Time (25%-100% SOC)", pro: "<3 h", max: "<3 h" },
      ]
    },
    {
      title: "PERFORMANCE",
      specs: [
        { label: "NEDC Range-Combined(*)", pro: "1000+ km", max: "1000+ km" },
        { label: "NEDC Electric Range-Combined(*)", pro: "105 km", max: "105 km" },
        { label: "NEDC Fuel Consumption-Full SOC Combined(*)", pro: "0.5 L/100km", max: "0.5 L/100km" },
        { label: "NEDC Fuel Consumption-Weighted Combined(*)", pro: "1.2 L/100km", max: "1.2 L/100km" },
        { label: "NEDC Fuel Consumption-Low SOC Combined(*)", pro: "4.3 L/100km", max: "4.3 L/100km" },
        { label: "Maximum Speed", pro: "170 km/h", max: "170 km/h" },
        { label: "Acceleration 0-100km/h", pro: "8.0 s", max: "8.0 s" },
      ]
    },
    {
      title: "CHASSIS",
      specs: [
        { label: "Suspension", pro: "F-MacPherson/R-Multi-link", max: "F-MacPherson/R-Multi-link" },
        { label: "Steering", pro: "Tilt & Telescopic", max: "Tilt & Telescopic" },
        { label: "Braking System", pro: "F-Ventilated/R-Solid", max: "F-Ventilated/R-Solid" },
      ]
    },
    {
      title: "EXTERIORS",
      specs: [
        { label: "All LED Tailights", pro: true, max: true },
        { label: "LED Run Through Leadlight", pro: true, max: true },
        { label: "All LED Automatic Headlights", pro: true, max: true },
        { label: "LED Daytime Running Light (DRL)", pro: true, max: true },
        { label: "LED Cornering Lights", pro: true, max: true },
        { label: "Roof Rack", pro: true, max: true },
        { label: "Panoramic Power Sunroof", pro: true, max: true },
        { label: "Power Tailgate", pro: true, max: true },
        { label: "Power Folding Exterior Mirrors", pro: true, max: true },
        { label: "Auto Frameless Wipers", pro: true, max: true },
      ]
    },
    {
      title: "INTERIORS",
      specs: [
        { label: "6-Way Power Adjustable Driver's Seat", pro: true, max: true },
        { label: "Ventilated Front Seats", pro: true, max: true },
        { label: "Driver's Seat With Memory Function", pro: true, max: true },
        { label: "256-Color Ambient Lights", pro: true, max: true },
        { label: "Leatherette Instrument Panel", pro: true, max: true },
        { label: "Microfiber Leather-Wrapped Multifunction Steering Wheel", pro: true, max: true },
        { label: "Split-Folding Rear Seat", pro: true, max: true },
        { label: "Rear Seat Central Armrest & Headrest", pro: true, max: true },
      ]
    },
    {
      title: "AIR CONDITIONING",
      specs: [
        { label: "Automatic Air Conditioning", pro: true, max: true },
        { label: "Rear A/C Vent", pro: true, max: true },
        { label: "Unlock/Delayed Ventilation", pro: true, max: true },
        { label: "Remote Ventilation", pro: true, max: true },
        { label: "N95 A/C Filter", pro: true, max: true },
      ]
    },
    {
      title: "ADVANCED DRIVING ASSISTANCE SYSTEM (ADAS)",
      specs: [
        { label: "Automatic Emergency Brake (AEB)", pro: true, max: true },
        { label: "Adaptive Cruise Control (ACC)", pro: true, max: true },
        { label: "Intelligent Cruise Control (ICC)", pro: true, max: true },
        { label: "Lane Keeping Assist (LKA)", pro: true, max: true },
        { label: "Emergency Lane Keeping Assist (ELKA)", pro: true, max: true },
        { label: "Traffic Sign Informations (TSI)", pro: true, max: true },
        { label: "Intelligent High Beam Control (IHBC)", pro: true, max: true },
        { label: "Rear Cross Traffic Alert (RCTA)", pro: true, max: true },
        { label: "Rear Cross Traffic Braking (RCTB)", pro: true, max: true },
        { label: "Blind Spot Detection (BSD)", pro: true, max: true },
      ]
    },
    {
      title: "INTELLIGENT CABIN",
      specs: [
        { label: "Keyless Entry & Keyless Start", pro: true, max: true },
        { label: "FLYME AUTO In-Vehicle Infotainment System", pro: true, max: true },
        { label: "15.4\" HD Central Screen", pro: true, max: true },
        { label: "10.2\" LCD Dash Display", pro: true, max: true },
        { label: "16-Speakers FLYME SOUND Audio system", pro: true, max: true },
        { label: "Wireless Charging", pro: true, max: true },
        { label: "Vehicle-to-Load (V2L) Power Supply", pro: true, max: true },
      ]
    },
    {
      title: "SAFETY",
      specs: [
        { label: "ESC Stability Control", pro: true, max: true },
        { label: "Antilock Brake System (ABS)", pro: true, max: true },
        { label: "6 Airbags (2 Front, 2 Front Side and 2 Side Curtain)", pro: true, max: true },
        { label: "540° Panoramic View with Transparent Chassis", pro: true, max: true },
        { label: "Adjustable Energy Regeneration System", pro: true, max: true },
      ]
    },
    {
      title: "WHEELS & TYRES",
      specs: [
        { label: "18\" Alloy Wheels", pro: true, max: true },
      ]
    },
    {
      title: "BODY COLORS",
      specs: [
        { label: "Snowy White / Marble Black / Twilight Gray / Pearl Silver", pro: "Standard Color", max: "Standard Color" },
        { label: "Supersonic Green / Bright Blue (***)", pro: "Honor Color", max: "Honor Color" },
      ]
    },
    {
      title: "INTERIOR COLORS",
      specs: [
        { label: "Night Black", pro: "Standard Color", max: "Standard Color" },
        { label: "Wall White(***)", pro: "Honor Color", max: "Honor Color" },
      ]
    }
  ];

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const renderValue = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <Check size={18} className="text-accent mx-auto" strokeWidth={3} />
      ) : (
        <div className="w-4 h-0.5 bg-slate-300 dark:bg-slate-700 mx-auto rounded-full"></div>
      );
    }
    // Handle string "-" as "No"
    if (val === '-') {
       return <div className="w-4 h-0.5 bg-slate-300 dark:bg-slate-700 mx-auto rounded-full"></div>;
    }
    // Handle string "No" specifically for checkmarks preference
    if (typeof val === 'string' && val.toLowerCase() === 'no') {
        return <div className="w-4 h-0.5 bg-slate-300 dark:bg-slate-700 mx-auto rounded-full"></div>;
    }
    // Handle string "Yes" specifically
    if (typeof val === 'string' && val.toLowerCase() === 'yes') {
        return <Check size={18} className="text-accent mx-auto" strokeWidth={3} />;
    }
    return <span className="font-bold text-slate-900 dark:text-white tabular-nums">{val}</span>;
  };

  return (
    <div className="bg-white dark:bg-slate-950 pt-32 pb-24 min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Model Switcher */}
        <div className="mb-20 flex justify-center">
           <div className="inline-flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm md:sticky md:top-24 relative z-30 backdrop-blur-md">
              {CARS.map((car) => (
                <button
                  key={car.id}
                  onClick={() => {
                    setActiveCar(car);
                    setOpenCategory(car.id === 'starray' ? "POWERTRAIN" : "NEW ENERGY");
                  }}
                  className={`px-4 md:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeCar.id === car.id 
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {car.name.replace('GEELY ', '')}
                </button>
              ))}
           </div>
        </div>

        {/* DIMENSIONS SECTION */}
        <section className="mb-24 animate-fade-in">
             <div className="flex items-center gap-3 mb-12">
                <h2 className="text-xl md:text-2xl font-black tracking-[0.3em] text-slate-900 dark:text-white uppercase">Dimensions</h2>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">(In Milimeters)</span>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-y-16 gap-x-8">
                   {[
                     { label: 'Length', value: dims.length },
                     { label: 'Width', value: dims.width },
                     { label: 'Height', value: dims.height },
                     { label: 'Wheelbase', value: dims.wheelbase },
                   ].map((dim, i) => (
                     <div key={i} className="space-y-2">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{dim.label}</div>
                        <div className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">
                          {dim.value}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="relative">
                   <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
                   <div className="relative z-10 p-8 border border-slate-100 dark:border-white/5 rounded-[3.5rem] bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden group">
                      <img 
                        src={activeCar.image} 
                        alt={`${activeCar.name} Technical Visual`} 
                        className="w-full h-auto opacity-90 rounded-[2.5rem] transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 pointer-events-none opacity-20">
                         <div className="absolute top-1/2 left-0 w-full h-px bg-slate-400 dark:bg-white"></div>
                         <div className="absolute top-0 left-1/4 w-px h-full bg-slate-400 dark:bg-white"></div>
                         <div className="absolute top-0 right-1/4 w-px h-full bg-slate-400 dark:bg-white"></div>
                         <div className="absolute bottom-10 left-10 w-20 h-px bg-accent"></div>
                         <div className="absolute bottom-10 left-10 h-20 w-px bg-accent"></div>
                      </div>
                   </div>
                </div>
             </div>
        </section>

        {/* ACCORDION SPECIFICATIONS SECTION */}
        <section className="border-t border-slate-200 dark:border-white/10">
           {(activeCar.id === 'ex5' ? ex5TechnicalSpecs : (activeCar.id === 'ex2' ? ex2TechnicalSpecs : starrayTechnicalSpecs)).map((category) => (
             <div key={category.title} className="border-b border-slate-200 dark:border-white/10">
                <button 
                  onClick={() => toggleCategory(category.title)}
                  className="w-full py-8 flex items-center justify-between text-left group transition-all"
                >
                   <h3 className={`text-sm md:text-lg font-black tracking-[0.3em] uppercase transition-colors ${
                     openCategory === category.title ? 'text-accent' : 'text-slate-900 dark:text-white group-hover:text-accent'
                   }`}>
                      {category.title}
                   </h3>
                   <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                     openCategory === category.title ? 'border-accent text-accent shadow-[0_0_10px_rgba(56,189,248,0.3)]' : 'border-slate-200 dark:border-white/10 text-slate-400'
                   }`}>
                      {openCategory === category.title ? <Minus size={16} /> : <Plus size={16} />}
                   </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openCategory === category.title ? 'max-h-[3000px] opacity-100 pb-12' : 'max-h-0 opacity-0'}`}>
                   <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                      {/* Sticky Table Header */}
                      <div className="grid grid-cols-10 md:grid-cols-12 px-4 md:px-10 py-4 md:py-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-[64px] md:top-[88px] z-10 transition-all">
                         <div className="col-span-4 md:col-span-6"></div>
                         <div className="col-span-3 text-center text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Pro</div>
                         <div className="col-span-3 text-center text-[10px] font-black text-accent uppercase tracking-widest">Max</div>
                      </div>
                      
                      {/* Table Rows */}
                      {category.specs.map((item, idx) => {
                        const isDiff = item.pro !== item.max;
                        return (
                          <div key={idx} className={`grid grid-cols-10 md:grid-cols-12 px-4 md:px-10 py-3 md:py-5 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors items-center ${
                            isDiff ? 'bg-accent/[0.03] dark:bg-accent/[0.05]' : 'bg-white dark:bg-transparent'
                          }`}>
                             {/* Label Column */}
                             <div className={`text-[11px] md:text-sm font-medium text-slate-600 dark:text-slate-300 pr-2 leading-tight ${isDiff ? 'col-span-4 md:col-span-6' : 'col-span-4 md:col-span-6'}`}>
                                {item.label}
                             </div>

                             {/* Values */}
                             {isDiff ? (
                                <>
                                  <div className="col-span-3 text-center text-[10px] md:text-sm tracking-tight opacity-70 grayscale">
                                      {renderValue(item.pro)}
                                  </div>
                                  <div className="col-span-3 text-center text-[10px] md:text-sm tracking-tight relative">
                                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-3 bg-accent/20 block"></div>
                                      {renderValue(item.max)}
                                  </div>
                                </>
                             ) : (
                                <div className="col-span-6 text-center text-[10px] md:text-sm tracking-tight font-bold text-slate-900 dark:text-white">
                                    {renderValue(item.pro)}
                                </div>
                             )}
                          </div>
                        );
                      })}
                   </div>
                </div>
             </div>
           ))}
        </section>

        {/* Disclaimer */}
        <div className="mt-20 pt-12 border-t border-slate-100 dark:border-white/5">
           <div className="flex items-start gap-4 text-slate-400 dark:text-white/20">
              <Info size={16} className="mt-1 shrink-0" />
              <p className="text-[10px] leading-relaxed italic max-w-4xl font-medium">
                 * All specifications and features shown are for reference only and may vary depending on the model variant and region. 
                 Geely Auto Indonesia reserves the right to make changes at any time without notice to prices, colors, materials, equipment, specifications and models.
                 Features marked with "Yes" are included as standard equipment in the respective trim level.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Specifications;
