import axios from "axios";
import { Logger } from "../utils/logger";
import { Service } from 'typedi'


@Service()
export class summarizationService {

    public async summarizeCaption(caption: string): Promise<string> {
        try {
            const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", {
                prompt: `Summarize this caption for a tweet: "${caption}"`,
                max_tokens: 280,
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            });

            return response.data.choices[0].text.trim();
        } catch (error: any) {
            Logger.error("Error summarizing caption: ", error);
            throw new Error("Failed to summarize caption.");
        }
    };

}