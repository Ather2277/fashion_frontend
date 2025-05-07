import axios from 'axios';

interface GenerateOutfitParams {
  style_idea: string;
  gender: string;
  ethnicity: string;
  age: string;
  skin_color: string;
  season: string;
  accessories: string;
  occasion: string;
  style: string;
  creativity: number;
  category: string;
}

interface GenerateOutfitResponse {
  outfit_description: string;
  image_url: string;
}

// Using the deployed API link directly
const API_URL = 'http://localhost:8000/generate-outfit/';

export const generateOutfit = async (
  params: GenerateOutfitParams
): Promise<GenerateOutfitResponse> => {
  try {
    const response = await axios.post(API_URL, params);

    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid response format from API');
    }

    if (!response.data.outfit_description || !response.data.image_url) {
      throw new Error('Missing required fields in API response');
    }

    return response.data;
  } catch (error) {
    console.error('Error generating outfit:', error);

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Could not connect to the API server. Please ensure the server is running.');
      }

      if (error.response) {
        throw new Error(
          `API error: ${error.response.status} - ${error.response.data?.message || 'Unknown API error'}`
        );
      } else if (error.request) {
        throw new Error('No response received from API server. Please check your network connection.');
      }
    }

    throw error;
  }
};
