"use client"
import Link from "next/link";
import { motion } from "motion/react";
import { Card } from "../ui/card"
import { H4, ScreenWrapper } from "../ui/typography"
import { IoIosSend } from "react-icons/io";
import { FaInstagram, FaDribbble, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import { IconProps } from "../layout/nav-bar";

const Icons = {
    dribbble: (props: IconProps) => (
        <svg viewBox="0 0 291.32 291.32" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill="#EA4C89"
                d="M145.66,0.001C65.21,0.001,0,65.22,0,145.661S65.21,291.32,145.66,291.32s145.66-65.219,145.66-145.66S226.109,0.001,145.66,0.001z M241.239,70.5c15.658,19.883,25.245,44.717,26,71.746c-32.682-5.726-60.867-5.899-85.22-2.039c-3.086-7.083-6.263-13.965-9.522-20.629C198.616,108.836,222.04,93.168,241.239,70.5z M224.479,53.094c-17.151,20.82-38.682,35.149-63.043,44.9c-15.595-28.895-31.635-52.975-44.453-70.554c9.204-2.249,18.79-3.45,28.668-3.45C175.72,23.98,203.231,34.968,224.479,53.094z M93.359,35.824c12.39,16.541,28.877,40.502,45,69.88c-34.175,9.386-72.402,11.917-111.093,12.026C35.805,81.534,60.512,51.528,93.359,35.824z M23.997,145.65l0.1-3.933h0.655c43.352,0,86.394-2.84,124.985-14.211c2.877,5.854,5.708,11.862,8.476,18.044c-50.771,14.885-82.425,48.295-104.119,80.085C35.377,204.252,23.997,176.258,23.997,145.65z M71.828,242.26c20.538-30.934,49.16-61.541,95.735-74.396c10.879,27.876,19.755,58.3,24.453,90.254c-14.293,5.936-29.942,9.213-46.347,9.213C117.911,267.331,92.312,257.982,71.828,242.26z M214.393,245.993c-4.98-29.196-13.137-57.044-22.96-82.862c21.285-2.704,45.755-2.048,74.122,3.168C259.884,199.271,240.93,227.758,214.393,245.993z"
            />
        </svg>
    ),

    instagram: (props: IconProps) => (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#ig_grad0)" />
            <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#ig_grad1)" />
            <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#ig_grad2)" />
            <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white" />
            <defs>
                <radialGradient id="ig_grad0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                    <stop stopColor="#B13589" />
                    <stop offset="0.79309" stopColor="#C62F94" />
                    <stop offset="1" stopColor="#8A3AC8" />
                </radialGradient>
                <radialGradient id="ig_grad1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                    <stop stopColor="#E0E8B7" />
                    <stop offset="0.444662" stopColor="#FB8A2E" />
                    <stop offset="0.71474" stopColor="#E2425C" />
                    <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="ig_grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                    <stop offset="0.156701" stopColor="#406ADC" />
                    <stop offset="0.467799" stopColor="#6A45BE" />
                    <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    ),

    linkedin: (props: IconProps) => (
        <svg viewBox="0 0 291.319 291.319" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill="#0E76A8"
                d="M145.659,0c80.45,0,145.66,65.219,145.66,145.66s-65.21,145.659-145.66,145.659S0,226.1,0,145.66S65.21,0,145.659,0z"
            />
            <path
                fill="#FFFFFF"
                d="M82.079,200.136h27.275v-90.91H82.079V200.136z M188.338,106.077c-13.237,0-25.081,4.834-33.483,15.504v-12.654H127.48v91.21h27.375v-49.324c0-10.424,9.55-20.593,21.512-20.593s14.912,10.169,14.912,20.338v49.57h27.275v-51.6C218.553,112.686,201.584,106.077,188.338,106.077z M95.589,100.141c7.538,0,13.656-6.118,13.656-13.656S103.127,72.83,95.589,72.83s-13.656,6.118-13.656,13.656S88.051,100.141,95.589,100.141z"
            />
        </svg>
    ),
}

export const Contact = () => {
    const contact = {
        email: "marckenleyantoine445@gmail.com",
        socials: [
            { name: "LinkedIn", url: " https://ht.linkedin.com/in/marckenley-antoine-60a43b400", icon: FaLinkedinIn },
            // { name: "X", url: "https://x.com/kryptoeden7", icon: FaXTwitter },
            { name: "Dribbble", url: "https://dribbble.com/marckenley-antoine", icon: FaDribbble },
            { name: "Instagram", url: "https://www.instagram.com/amk.brand.studio?igsh=Z2E2MXJuMGV1emZ0&utm_source=qr", icon: FaInstagram },
        ]
    }

    return (
        <ScreenWrapper className="flex flex-col gap-12 w-full min-h-auto">
            <BlurFade delay={BLUR_FADE_DELAY} inView>
                <Card className="flex flex-col sm:flex-row justify-between gap-4 bg-gray-100 dark:bg-card p-4 w-full min-w-full">
                    {/* Email */}
                    <BlurFade delay={BLUR_FADE_DELAY * 2} inView className="flex justify-center sm:justify-start items-center">
                        <H4 className="border-none font-medium">
                            <a href={`mailto:${contact.email}`}
                                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                <IoIosSend
                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    size={20}
                                />
                                <span className="transition-all duration-300 group-hover:underline underline-offset-4 text-sm sm:text-base">
                                    {contact.email}
                                </span>
                            </a>
                        </H4>
                    </BlurFade>

                    {/* Socials */}
                    <div className="flex flex-row gap-2 justify-center sm:justify-end items-center">
                        {contact.socials.map((social, i) => {
                            const Icon = Icons[social.name.toLowerCase() as keyof typeof Icons] || social.icon;
                            return (
                                <BlurFade key={social.name} delay={BLUR_FADE_DELAY * (3 + i)} inView>
                                    <motion.div
                                        initial={{
                                            rotate: i % 2 === 0 ? 2 : -2,
                                            y: i % 2 === 0 ? -4 : 4,
                                        }}
                                        whileHover={{
                                            rotate: 0,
                                            y: 0,
                                            scale: 1.1,
                                            transition: { duration: 0.3, ease: "easeOut" }
                                        }}
                                    >
                                        <Link
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-foreground transition-colors duration-300 block"
                                        >
                                            <Icon className="sm:w-10 sm:h-10" />
                                        </Link>
                                    </motion.div>
                                </BlurFade>
                            )
                        })}
                    </div>
                </Card>
            </BlurFade>
        </ScreenWrapper>
    )
}