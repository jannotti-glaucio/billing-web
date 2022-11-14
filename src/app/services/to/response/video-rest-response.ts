import { Result } from "../../../classes/result";
import { Video } from "app/classes/video";

export class VideoRestResponse{
    result: Result;
    videos: Video[];
}