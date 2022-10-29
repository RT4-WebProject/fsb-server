import { Double } from "typeorm";

export class CampaignDto {
    id: string;
    createdAt: Date;
    title: string;
    launchedBy: string;
    countries: string;
    activeNow: boolean;
    link: string;
    image: string;
    goal: number;
}