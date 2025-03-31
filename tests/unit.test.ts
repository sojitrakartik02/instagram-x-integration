import { summarizationService } from '../src/services/summarization.service';
import axios from 'axios';

jest.mock('axios');

describe('summarizationService', () => {
    it('should summarize the caption', async () => {
        const service = new summarizationService();
        const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
        const mockResponse = { choices: [{ text: 'Summarized caption.' }] };
        mockedAxiosPost.mockResolvedValue(mockResponse);

        const result = await service.summarizeCaption('This is a caption.');
        expect(result).toBe('Summarized caption.');
    });
});
