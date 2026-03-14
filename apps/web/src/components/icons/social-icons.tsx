import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

export type SocialIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

function Svg({ title, children, ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function FacebookIcon(props: SocialIconProps) {
  const { className, ...rest } = props;
  return (
    <Svg
      title={props.title ?? "Facebook"}
      className={cn("text-[#1877F2]", className)}
      {...rest}
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.023 4.388 11.022 10.125 11.927v-8.44H7.078v-3.487h3.047V9.415c0-3.025 1.792-4.698 4.533-4.698 1.312 0 2.686.236 2.686.236v2.97h-1.512c-1.492 0-1.956.93-1.956 1.887v2.263h3.328l-.532 3.487h-2.796V24C19.612 23.095 24 18.096 24 12.073Z" />
    </Svg>
  );
}

export function XIcon(props: SocialIconProps) {
  const { className, ...rest } = props;
  return (
    <Svg
      title={props.title ?? "X"}
      className={cn("text-black", className)}
      {...rest}
    >
      <path d="M18.244 2H21.5l-7.15 8.17L22.5 22h-6.44l-5.04-6.58L5.26 22H2l7.66-8.76L1.5 2h6.6l4.56 5.93L18.244 2Zm-1.13 18h1.8L6.98 3.92H5.05L17.114 20Z" />
    </Svg>
  );
}

export function InstagramIcon(props: SocialIconProps) {
  const { className, ...rest } = props;
  return (
    <Svg
      title={props.title ?? "Instagram"}
      className={cn("text-[#E1306C]", className)}
      {...rest}
    >
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.25 6.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    </Svg>
  );
}

export function LinkedInIcon(props: SocialIconProps) {
  const { className, ...rest } = props;
  return (
    <Svg
      title={props.title ?? "LinkedIn"}
      className={cn("text-[#0A66C2]", className)}
      {...rest}
    >
      <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0ZM7.114 20.452H3.56V9h3.554v11.452ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065ZM20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288Z" />
    </Svg>
  );
}

export function TikTokIcon(props: SocialIconProps) {
  const { className, ...rest } = props;
  return (
    <Svg
      title={props.title ?? "TikTok"}
      className={cn("text-black", className)}
      {...rest}
    >
      <path d="M21.743 8.135a6.49 6.49 0 0 1-3.771-1.206 6.57 6.57 0 0 1-2.442-3.298A6.46 6.46 0 0 1 15.26 1H11.6v13.7a3.06 3.06 0 0 1-1.872 2.814 3.1 3.1 0 0 1-1.19.24 3.06 3.06 0 1 1 0-6.12c.29 0 .57.04.84.115V8.01a6.78 6.78 0 0 0-1.06-.083 6.73 6.73 0 1 0 6.743 6.73V8.33a10.2 10.2 0 0 0 6.682 2.49V8.135Z" />
    </Svg>
  );
}

export function YouTubeIcon(props: SocialIconProps) {
  const { className, ...rest } = props;
  return (
    <Svg
      title={props.title ?? "YouTube"}
      className={cn("text-[#FF0000]", className)}
      {...rest}
    >
      <path d="M23.498 6.186a3.02 3.02 0 0 0-2.125-2.14C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.373.5A3.02 3.02 0 0 0 .502 6.186 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .502 5.814 3.02 3.02 0 0 0 2.125 2.14c1.868.5 9.373.5 9.373.5s7.505 0 9.373-.5a3.02 3.02 0 0 0 2.125-2.14A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </Svg>
  );
}

export function WhatsAppIcon(props: SocialIconProps) {
  const { className, ...rest } = props;
  return (
    <Svg
      title={props.title ?? "WhatsApp"}
      className={cn("text-[#25D366]", className)}
      {...rest}
    >
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12 .004C5.373.004.004 5.373.004 12c0 2.115.552 4.182 1.6 6.013L0 24l6.165-1.584A11.94 11.94 0 0 0 12 23.996C18.627 23.996 23.996 18.627 23.996 12a11.88 11.88 0 0 0-3.476-8.52ZM12 21.86a9.86 9.86 0 0 1-5.03-1.37l-.36-.215-3.655.94.975-3.56-.235-.366A9.83 9.83 0 0 1 2.14 12C2.14 6.55 6.55 2.14 12 2.14S21.86 6.55 21.86 12 17.45 21.86 12 21.86Zm5.72-7.33c-.31-.155-1.84-.91-2.13-1.01-.29-.105-.5-.155-.71.155-.21.31-.82 1.01-1.01 1.22-.185.21-.37.235-.68.08-.31-.155-1.31-.485-2.5-1.545-.925-.825-1.55-1.845-1.735-2.155-.185-.31-.02-.48.14-.635.145-.145.31-.37.465-.555.155-.185.21-.31.31-.515.105-.21.055-.39-.025-.545-.08-.155-.71-1.705-.975-2.335-.255-.61-.515-.525-.71-.535l-.605-.01c-.21 0-.545.08-.83.39-.285.31-1.09 1.065-1.09 2.595s1.115 3.01 1.27 3.22c.155.21 2.195 3.35 5.315 4.695.74.32 1.32.51 1.77.655.745.235 1.425.2 1.96.12.6-.09 1.84-.75 2.1-1.475.26-.725.26-1.345.185-1.475-.075-.13-.285-.21-.595-.365Z" />
    </Svg>
  );
}
