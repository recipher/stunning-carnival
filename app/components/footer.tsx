import Contact from "./contact";

const socials = [
  { name: "facebook", url: "https://www.facebook.com/safeguardglobal" },
  { name: "twitter", url: "https://twitter.com/Safeguard_Globl" },
  {
    name: "youtube",
    url: "https://www.youtube.com/channel/UCMEKxtP84b0ILsuH4OW-XnQ",
  },
  { name: "linkedIn", url: "https://www.linkedin.com/company/safeguard-globl" },
];

export default function Footer() {
  return (
    <footer className="bg-white md:pl-64">
      <div className="mx-8 max-w-4xl py-12 md:flex md:items-center md:justify-between md:px-8 xl:pl-0">
        <div className="flex justify-center space-x-6 md:order-2">
          {socials.map((social) => (
            <Contact key={social.name} name={social.name} value={social.url} />
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Safeguard Global
          </p>
        </div>
      </div>
    </footer>
  );
}
