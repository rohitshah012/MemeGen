const MEME_API_URL = "https://api.imgflip.com/get_memes";

export async function getAllMemes() {
  const response = await fetch(MEME_API_URL);

  if (!response.ok) {
    throw new Error("Could not load meme templates. Please try again.");
  }

  const payload = await response.json();

  if (!payload.success || !payload.data?.memes) {
    throw new Error(payload.error_message || "The meme API returned an invalid response.");
  }

  return payload.data.memes;
}
