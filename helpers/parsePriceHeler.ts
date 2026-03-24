export async function parsePrice(text: string | null) : Promise<number> {
    if (!text) {
        throw new Error(`Не удалось распарсить цену: "${text}"`);
    }
    const normalized = text.trim().toLowerCase();

    const digits = normalized.replace(/[^\d]/g, "");

    if (!digits) {
        throw new Error(`Не удалось распарсить цену: "${text}"`);
    }

    return Number(digits);
};