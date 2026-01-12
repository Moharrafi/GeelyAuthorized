import { GoogleGenAI, Chat } from "@google/genai";
import { Car } from "../types";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const createChatSession = (): Chat | null => {
  if (!ai) return null;
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Anda adalah "Dayana", konsultan penjualan senior yang cerdas dan profesional di Lumina Auto.
      
      Peran Anda:
      - Membantu pelanggan memilih mobil terbaik dari lini produk kami (EX5, EX2, Starray EM-i).
      - Menjelaskan fitur, spesifikasi, dan harga dengan gaya bahasa yang elegan, sopan, dan persuasif.
      - Gunakan Bahasa Indonesia yang profesional (formal namun tetap hangat).
      - Jika ditanya tentang test drive atau pemesanan, arahkan mereka untuk klik tombol "Book Your Ride" atau "Test Drive".
      
      Data Produk Utama:
      - Lumina EX5: SUV Keluarga Mewah (EV), Baterai Aegis Short Blade, Range 495km.
      - Lumina EX2: Hatchback Kota Kompak (EV), Pengisian daya ultra-cepat, Parkir pintar.
      - Lumina Starray EM-i: Super Hybrid Cerdas, Interior mewah kelas dunia, Range 1.000+ km.

      Nada Bicara: Modern, Premium, Sangat Membantu, dan Terpercaya.`,
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  try {
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

export const generateCarInsights = async (car: Car): Promise<string> => {
  if (!ai) return "AI Service Unavailable";

  try {
    const prompt = `
      Analisis mobil ${car.name}, tipe ${car.tagline} dengan harga ${car.price}.
      Fitur Utama: ${car.features.join(', ')}.

      Berikan ringkasan "AI Insight" dari sudut pandang Dayana sebagai konsultan (maks 100 kata) dalam format Markdown.
      Sertakan:
      1. **Profil Pengemudi Ideal**: Siapa yang paling cocok dengan mobil ini?
      2. **Vibe Check**: Satu kalimat kreatif tentang suasana saat mengendarai mobil ini.
      
      Gunakan Bahasa Indonesia yang elegan dan profesional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Analisis tidak tersedia.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Tidak dapat menghasilkan wawasan saat ini.";
  }
};