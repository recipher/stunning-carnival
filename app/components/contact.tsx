import { MailIcon, PhoneIcon } from "@heroicons/react/solid";

const FacebookIcon = (props: any) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const YouTubeIcon = (props: any) => (
  <svg
    fill="currentColor"
    viewBox="0 0 96.875 96.875"
    width="96.875px"
    height="96.875px"
    {...props}
  >
    <path
      d="M95.201,25.538c-1.186-5.152-5.4-8.953-10.473-9.52c-12.013-1.341-24.172-1.348-36.275-1.341
        c-12.105-0.007-24.266,0-36.279,1.341c-5.07,0.567-9.281,4.368-10.467,9.52C0.019,32.875,0,40.884,0,48.438
        C0,55.992,0,64,1.688,71.336c1.184,5.151,5.396,8.952,10.469,9.52c12.012,1.342,24.172,1.349,36.277,1.342
        c12.107,0.007,24.264,0,36.275-1.342c5.07-0.567,9.285-4.368,10.471-9.52c1.689-7.337,1.695-15.345,1.695-22.898
        C96.875,40.884,96.889,32.875,95.201,25.538z M35.936,63.474c0-10.716,0-21.32,0-32.037c10.267,5.357,20.466,10.678,30.798,16.068
        C56.434,52.847,46.23,58.136,35.936,63.474z"
    />
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedInIcon = (props: any) => (
  <svg fill="currentColor" viewBox="0 0 455 455" {...props}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M246.4,204.35v-0.665c-0.136,0.223-0.324,0.446-0.442,0.665H246.4z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0,0v455h455V0H0z M141.522,378.002H74.016V174.906h67.506V378.002z
        M107.769,147.186h-0.446C84.678,147.186,70,131.585,70,112.085c0-19.928,15.107-35.087,38.211-35.087
        c23.109,0,37.31,15.159,37.752,35.087C145.963,131.585,131.32,147.186,107.769,147.186z M385,378.002h-67.524V269.345
        c0-27.291-9.756-45.92-34.195-45.92c-18.664,0-29.755,12.543-34.641,24.693c-1.776,4.34-2.24,10.373-2.24,16.459v113.426h-67.537
        c0,0,0.905-184.043,0-203.096H246.4v28.779c8.973-13.807,24.986-33.547,60.856-33.547c44.437,0,77.744,29.02,77.744,91.398V378.002
        z"
      />
    </g>
  </svg>
);

export const Icons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  email: MailIcon,
  phone: PhoneIcon,
};

export default function Contact({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  //@ts-ignore
  const Icon = Icons[name.toLowerCase()];

  if (name === "email") value = `mailto:${value}`;
  if (name === "phone") value = `tel:${value}`;

  return (
    <a
      href={value}
      rel="noreferrer"
      target="_blank"
      className="text-gray-400 outline-none hover:text-gray-500"
    >
      <span className="sr-only">{name}</span>
      <Icon className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
