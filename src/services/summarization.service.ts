import axios from "axios";
import { Service } from 'typedi'


@Service()
export class summarizationService {

    public async summarizeCaption(caption: string): Promise<string> {
        try {
            const response = await axios.post(
                "https://api.cohere.ai/v1/generate",
                {
                    model: "command",
                    prompt: `Summarize for Twitter: ${caption}`,
                    max_tokens: 50
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Response from Cohere:", response.data);

            return response.data.generations[0].text.trim();
        } catch (error: any) {
            console.error("Error summarizing caption: ", error.response?.data || error.message);
            throw new Error("Failed to summarize caption.");
        }
    }


}
