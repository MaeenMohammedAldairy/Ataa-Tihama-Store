
import { GoogleGenAI, Modality } from "@google/genai";

const getClient = () => {
  // Always initialize with named parameters and process.env.API_KEY directly
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * الحصول على استشارة زراعية نصية
 */
export const getAgriculturalAdvice = async (query: string): Promise<string> => {
  try {
    const ai = getClient();
    const systemInstruction = `
      أنت "المرشد الزراعي الذكي" لمنصة "عطاء تهامة" في اليمن.
      تخصصك: الزراعة في تهامة (المانجو، الموز، الحبوب، الخضروات).
      لهجتك: يمنية تهامية مهذبة وواضحة.
      مهمتك: حل مشاكل المزارعين، تشخيص الآفات، وتقديم مواعيد الزراعة.
      إذا سأل عن الأسعار، اطلب منه مراجعة "سوق المنصة".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "عذراً، حاول مرة أخرى.";
  } catch (error) {
    console.error("AI Error:", error);
    return "حدث خطأ في الاتصال بالمرشد الذكي.";
  }
};

/**
 * تحويل النص إلى كلام إرشادي للمزارعين
 */
export const speakAdvice = async (text: string) => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `اقرأ النصائح التالية بلهجة هادئة وواضحة للمزارع: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // اختيار صوت دافئ
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), audioContext, 24000, 1);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
};

// وظائف مساعدة لفك تشفير الصوت
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
