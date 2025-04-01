import { xComService } from '../src/services/xCom.service';
import { TwitterApi } from 'twitter-api-v2';

jest.mock('twitter-api-v2');

describe('xComService', () => {
    let xcomService: xComService;

    beforeEach(() => {
        xcomService = new xComService();
    });

    it('should post tweet successfully', async () => {
        const summarizedTweet = "Today's at the beach was epic! Friends, sunshine, and positive vibes galore 😎☀️✨ #BeachDay #GoodVibes";

        const mockResponse = {
            data: {
                id: '1907139097119875496',
                text: summarizedTweet,
            },
        };

        xcomService.rwClient.v2.tweet = jest.fn().mockResolvedValue(mockResponse);

        const result = await xcomService.postTweet(summarizedTweet);

        expect(result.data.id).toBe('1907139097119875496');
        expect(result.data.text).toBe(summarizedTweet);
    });

    it('should throw an error if posting tweet fails', async () => {
        const summarizedTweet = "Some random text that will fail to post";

        xcomService.rwClient.v2.tweet = jest.fn().mockRejectedValue(new Error('Failed to post tweet'));

        await expect(xcomService.postTweet(summarizedTweet)).rejects.toThrow('Failed to post tweet.');
    });
});