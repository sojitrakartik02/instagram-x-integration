import { summarizationService } from '../src/services/summarization.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('summarizationService', () => {
    let summarizeService: summarizationService;

    beforeEach(() => {
        summarizeService = new summarizationService();
    });

    it('should summarize Instagram caption into a tweet', async () => {
        const instagramCaption = 'Had an amazing day at the beach with friends, sunshine, laughter, and great vibes! 🌊☀️ #BeachDay #GoodVibes';

        const mockResponse = {
            data: {
                generations: [
                    {
                        text: "Today's at the beach was epic! Friends, sunshine, and positive vibes galore 😎☀️✨ #BeachDay #GoodVibes",
                    },
                ],
            },
        };

        mockedAxios.post.mockResolvedValue(mockResponse);

        const result = await summarizeService.summarizeCaption(instagramCaption);

        expect(result).toBe("Today's at the beach was epic! Friends, sunshine, and positive vibes galore 😎☀️✨ #BeachDay #GoodVibes");
    });

    it('should throw an error if Cohere API fails', async () => {
        const instagramCaption = 'Some random caption text';

        mockedAxios.post.mockRejectedValue(new Error('API call failed'));

        await expect(summarizeService.summarizeCaption(instagramCaption)).rejects.toThrow('Failed to summarize caption.');
    });
});