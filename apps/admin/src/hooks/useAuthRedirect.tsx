import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = (url?: string) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated && !["/login", "/signup"].includes(pathname)) {
      router.replace("/login");
    } else {
      {
        url ? router.push(url) : router.push("/dashboard");
      }
    }
  }, [pathname, router]);
};

export default useAuthRedirect;
