import { UnfoldVertical } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const useAuthRedirect = (url?: string) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (window !== undefined) {
      const isAuthenticated = window.localStorage.getItem("token");
      if (!isAuthenticated && !["/login", "/register"].includes(pathname)) {
        router.replace("/login");
      } else {
        {
          url ? router.push(url) : router.push("/dashboard");
        }
      }
    }
  }, [pathname, router, url]);
};

export default useAuthRedirect;
