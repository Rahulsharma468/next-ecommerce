// "use client";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathName = usePathname();

//   const isFullScreen =
//     pathName.includes("reset-password") || pathName.includes("forgot-password");
//   const isSignIn = pathName.includes("Login");
//   const isTwoFa = pathName.includes("two-fa");

//   return isFullScreen ? (
//     // <div className="bg-auth-hero bg-no-repeat bg-center bg-lightgray min-w-full min-h-screen bg-cover">
//     <div className="bg-theme flex flex-col min-w-full min-h-screen items-center">
//       <div className="w-full flex justify-center items-center py-6">
//         <Image
//           src="/lifenetwork-logo-primary.svg"
//           alt="logo"
//           width={227}
//           height={100}
//         />
//       </div>
//       <div
//         className={`flex flex-col mt-2 justify-center w-full items-center h-[70vh]`}
//       >
//         {children}
//       </div>
//       <div className="absolute bottom-0 flex flex-col align-bottom sm:flex-row w-full items-center justify-center gap-1 pb-3">
//         <span className="text-white">Don&apos;t have an account?</span>
//         <Link href="/Register" className="font-semibold text-yellowTheme">
//           Create one.
//         </Link>
//       </div>
//     </div>
//   ) : isTwoFa ? (
//     <div className="bg-white text-black flex justify-between p-6">
//       <div className="flex-auto">
//         <Image src="/logo.png" alt="logo" width={100} height={40} />
//         <div className="flex flex-col justify-center h-fit items-center">
//           {children}
//         </div>
//       </div>

//       <div className="relative w-[60vw] h-[95vh] hidden lg:block">
//         <Image
//           fill
//           style={{
//             objectFit: "cover",
//           }}
//           src="/side-img.png"
//           className="rounded-[40px] w-full"
//           alt="side image"
//         />
//         <Image
//           src="/lifenetwork-image-logo.svg"
//           alt="logo"
//           width={100}
//           height={99}
//           className="lg:absolute bottom-5 right-5 logo"
//         />
//       </div>
//     </div>
//   ) : isSignIn ? (
//     <div className="bg-white text-black flex justify-between p-6">
//       <div className="flex-auto">
//         <Image src="/logo.png" alt="logo" width={100} height={40} />
//         <div className="flex flex-col justify-center h-fit items-center">
//           {children}
//         </div>
//       </div>

//       <div className="relative w-[60vw] h-[95vh] hidden lg:block">
//         <Image
//           fill
//           style={{
//             objectFit: "cover",
//           }}
//           src="/sign_in.png"
//           className="rounded-[40px] w-full"
//           alt="side image"
//         />
//         <Image
//           src="/lifenetwork-image-logo.svg"
//           alt="logo"
//           width={100}
//           height={99}
//           className="lg:absolute bottom-5 right-5 logo"
//         />
//       </div>
//     </div>
//   ) : (
//     <div className="bg-white text-black flex justify-between p-6">
//       <div className="flex-auto">
//         <Image src="/logo.png" alt="logo" width={100} height={40} />
//         <div className="flex flex-col justify-center h-fit items-center">
//           {children}
//         </div>
//       </div>

//       <div className="relative w-[60vw] h-[95vh] hidden lg:block">
//         <Image
//           fill
//           style={{
//             objectFit: "cover",
//           }}
//           src="/sign_up.jpg"
//           className="rounded-[40px] w-full"
//           alt="side image"
//         />
//       </div>
//       <Image
//         src="/lifenetwork-image-logo.svg"
//         alt="logo"
//         width={100}
//         height={99}
//         className="lg:absolute bottom-10 right-20 logo"
//       />
//     </div>
//   );
// }

"use client";

import { ReactNode } from "react";

interface ModulesLayoutProps {
  children: ReactNode;
}

export default function ModulesLayout({
  children, // will be a page or nested layout
}: ModulesLayoutProps) {
  return <div>{children}</div>;
}
