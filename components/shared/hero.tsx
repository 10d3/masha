import { BLUR_FADE_DELAY } from "@/lib/utils";
import { BlurFade } from "../ui/blur-fade";
import { ScreenWrapper } from "../ui/typography";

export const Hero = () => {
    return (
        <ScreenWrapper className="flex flex-col justify-center">
            <BlurFade delay={BLUR_FADE_DELAY} className="text-center text-7xl font-bold leading-snug">
                Portfolio.
            </BlurFade>
            <div className="flex flex-row justify-between">
                <BlurFade direction="right" delay={BLUR_FADE_DELAY} className="font-light">MarcKenley Antoine</BlurFade>
                <BlurFade direction="left" delay={BLUR_FADE_DELAY} className="font-bold">2026</BlurFade>
            </div>
        </ScreenWrapper>
    );
}